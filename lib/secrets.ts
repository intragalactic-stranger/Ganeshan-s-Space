import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

export type GeminiConfig = {
  apiKey?: string;
  model?: string;
  systemPrompt?: string;
};

const DEFAULT_REGION = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-east-1";
const SECRET_NAME_JSON = process.env.SECRET_NAME_GEMINI_JSON || "amplify/gemini/config";
const SECRET_NAME_API = process.env.SECRET_NAME_GEMINI_API_KEY || "amplify/gemini/apiKey";

// Simple in-memory cache (per server process)
let cache: { value: GeminiConfig; expiresAt: number } | null = null;
const TTL_MS = 5 * 60 * 1000; // 5 minutes

function getClient(region = DEFAULT_REGION) {
  return new SecretsManagerClient({ region });
}

async function getSecretString(secretId: string): Promise<string | null> {
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
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[secrets] Could not read ${secretId}: ${err?.name || err?.code || err?.message}`);
    }
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

export async function loadGeminiConfig(): Promise<GeminiConfig> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) return cache.value;

  // Detect if running in Amplify/AWS environment (has AWS_EXECUTION_ENV or AWS_LAMBDA_FUNCTION_NAME)
  const isAWS = !!(process.env.AWS_EXECUTION_ENV || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.CODEBUILD_BUILD_ID);
  
  // Skip AWS Secrets Manager only in local dev (not AWS and not production)
  const skipAWS = !isAWS && process.env.NODE_ENV !== "production";

  let jsonCfg: GeminiConfig = {};
  let apiOnly: GeminiConfig = {};

  if (!skipAWS) {
    // Try to fetch from Secrets Manager
    jsonCfg = fromJsonOrPlain(await getSecretString(SECRET_NAME_JSON));
    apiOnly = fromJsonOrPlain(await getSecretString(SECRET_NAME_API));
  }

  // Fallback to environment variables for local/dev
  let rawSystem = process.env.GEMINI_SYSTEM_PROMPT;
  if (rawSystem) rawSystem = rawSystem.trim();
  if (rawSystem && rawSystem.startsWith('"') && rawSystem.endsWith('"')) {
    rawSystem = rawSystem.slice(1, -1).trim();
  }

  const merged: GeminiConfig = {
    apiKey: jsonCfg.apiKey || apiOnly.apiKey || process.env.GEMINI_API_KEY,
    model: jsonCfg.model || process.env.NEXT_PUBLIC_GEMINI_MODEL || undefined,
    systemPrompt: jsonCfg.systemPrompt || (rawSystem && rawSystem.length > 0 ? rawSystem : undefined),
  };

  cache = { value: merged, expiresAt: now + TTL_MS };
  return merged;
}
