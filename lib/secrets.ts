import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

export type GeminiConfig = {
  apiKey?: string;
  model?: string;
  systemPrompt?: string;
};

export type GeminiConfigMeta = {
  source: {
    secretJson?: boolean;
    secretPlain?: boolean;
    env?: boolean;
  };
  errors: Array<{ secret: string; message: string }>;
};

export type GeminiConfigResult = GeminiConfig & GeminiConfigMeta;

const DEFAULT_REGION = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-east-1";
const SECRET_NAME_JSON = process.env.SECRET_NAME_GEMINI_JSON || "amplify/gemini/config";
const SECRET_NAME_API = process.env.SECRET_NAME_GEMINI_API_KEY || "amplify/gemini/apiKey";

// Simple in-memory cache (per server process)
let cache: { value: GeminiConfigResult; expiresAt: number } | null = null;
const TTL_MS = 5 * 60 * 1000; // 5 minutes

function getClient(region = DEFAULT_REGION) {
  return new SecretsManagerClient({ region });
}

async function getSecretString(secretId: string, errors: GeminiConfigMeta["errors"]): Promise<string | null> {
  try {
    const client = getClient();
    const res = await client.send(
      new GetSecretValueCommand({
        SecretId: secretId,
        VersionStage: "AWSCURRENT",
      })
    );
    return res.SecretString ?? null;
  } catch (err: any) {
    const errorCode = err?.name || err?.code || 'Unknown';
    const message = err?.message || "Unknown error";
    errors.push({ secret: secretId, message: `${errorCode}: ${message}` });
    // Log in all environments to help debug Amplify runtime issues
    console.warn(`[secrets] Could not read ${secretId}: ${errorCode} - ${message}`);
    return null;
  }
}

function fromJsonOrPlain(s: string | null): GeminiConfig {
  if (!s) return {};
  try {
    const obj = JSON.parse(s);
    return {
      apiKey: obj.GEMINI_API_KEY || obj.apiKey,
      model: obj.NEXT_PUBLIC_GEMINI_MODEL || obj.model,
      systemPrompt: obj.GEMINI_SYSTEM_PROMPT || obj.systemPrompt,
    };
  } catch {
    // treat as plain API key
    return { apiKey: s };
  }
}

function normalizeSystemPrompt(raw?: string | null): string | undefined {
  if (!raw) return undefined;
  let trimmed = raw.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    trimmed = trimmed.slice(1, -1).trim();
  }
  return trimmed.length > 0 ? trimmed : undefined;
}

export async function loadGeminiConfig(): Promise<GeminiConfigResult> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) return cache.value;

  const errors: GeminiConfigMeta["errors"] = [];
  const source: GeminiConfigMeta["source"] = {};

  let secretJson: GeminiConfig = {};
  let secretPlain: GeminiConfig = {};

  // Always attempt Secrets Manager unless explicitly disabled
  // This ensures it works in Amplify's Lambda runtime where AWS env detection may vary
  const skipSecrets = process.env.SKIP_SECRETS_MANAGER === "true";
  
  if (!skipSecrets) {
    console.log('[secrets] Attempting to load from AWS Secrets Manager...');
    console.log('[secrets] Region:', DEFAULT_REGION);
    console.log('[secrets] Secret names:', { json: SECRET_NAME_JSON, api: SECRET_NAME_API });
    
    secretJson = fromJsonOrPlain(await getSecretString(SECRET_NAME_JSON, errors));
    if (secretJson.apiKey || secretJson.model || secretJson.systemPrompt) {
      source.secretJson = true;
      console.log('[secrets] Successfully loaded from JSON secret');
    }
    
    secretPlain = fromJsonOrPlain(await getSecretString(SECRET_NAME_API, errors));
    if (secretPlain.apiKey || secretPlain.model || secretPlain.systemPrompt) {
      source.secretPlain = true;
      console.log('[secrets] Successfully loaded from plain API key secret');
    }
    
    if (errors.length > 0) {
      console.warn('[secrets] Errors encountered:', JSON.stringify(errors, null, 2));
    }
  } else {
    console.log('[secrets] Secrets Manager disabled via SKIP_SECRETS_MANAGER=true');
  }

  const envApiKey = process.env.GEMINI_API_KEY;
  const envModel = process.env.NEXT_PUBLIC_GEMINI_MODEL;
  const envPrompt = normalizeSystemPrompt(process.env.GEMINI_SYSTEM_PROMPT);
  if (envApiKey || envModel || envPrompt) {
    source.env = true;
    console.log('[secrets] Found environment variables');
  }

  const merged: GeminiConfigResult = {
    apiKey: secretJson.apiKey || secretPlain.apiKey || envApiKey,
    model: secretJson.model || secretPlain.model || envModel,
    systemPrompt: secretJson.systemPrompt || secretPlain.systemPrompt || envPrompt,
    source,
    errors,
  };

  console.log('[secrets] Final config sources:', source);
  console.log('[secrets] Config status:', {
    hasApiKey: !!merged.apiKey,
    hasModel: !!merged.model,
    hasSystemPrompt: !!merged.systemPrompt,
  });

  cache = { value: merged, expiresAt: now + TTL_MS };
  return merged;
}
