import { NextRequest } from "next/server";
import { loadGeminiConfig } from "@/lib/secrets";

// Gemini (Google AI Studio) simple integration using REST fetch.
// Environment variables required:
//   NEXT_PUBLIC_GEMINI_MODEL (optional, defaults to gemini-1.5-flash-002 or user specified)
//   GEMINI_API_KEY (server-side secret; DO NOT expose to client)
//   GEMINI_SYSTEM_PROMPT (optional system prompt injection)
// NOTE: This is a minimal stateless implementation (no streaming) to keep footprint small.
// For streaming, you'd use the streaming endpoint and a ReadableStream wrapper.

interface GeminiContentPart { text: string }
interface GeminiContent { role: string; parts: GeminiContentPart[] }

// Use nodejs runtime for broader compatibility on hosting platforms (e.g., AWS Amplify) and
// reliable access to environment variables. Edge was previously used for lower latency, but
// missing env vars on edge often caused 500s in some deployments.
export const runtime = 'nodejs';

// Optional: ensure this route is always dynamic (never statically optimized)
export const dynamic = 'force-dynamic';

interface ApiErrorBody {
  error: string;
  code: string;
  details?: any;
  upstreamStatus?: number;
}

function jsonResponse(body: any, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(req: NextRequest) {
  try {
    const { apiKey, model: secretModel, systemPrompt: secretSystem, source, errors } = await loadGeminiConfig();
    if (!apiKey) {
      console.error('[chat] GEMINI_API_KEY not found in config', {
        source,
        errors,
        nodeEnv: process.env.NODE_ENV,
        awsExecutionEnv: process.env.AWS_EXECUTION_ENV,
      });
      return jsonResponse(<ApiErrorBody>{
        error: 'Missing Gemini API key',
        code: 'API_KEY_NOT_FOUND',
        details: {
          source,
          errors,
          hint: 'Ensure the Gemini secret exists in AWS Secrets Manager (or provide GEMINI_API_KEY/NEXT_PUBLIC_GEMINI_MODEL env vars for local fallback).'
        }
      }, 500);
    }
    const model = secretModel || process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-1.5-flash-002';
    const systemPrompt = secretSystem;

    const body = await req.json().catch(() => ({}));
    const rawMsg = (body.message ?? '').toString();
    const userMessage: string = rawMsg.slice(0, 4000);
    if (!userMessage.trim()) {
      return jsonResponse(<ApiErrorBody>{ error: 'Message is required', code: 'EMPTY_MESSAGE' }, 400);
    }

    // Build initial request with systemInstruction (preferred method)
    const primaryContents: GeminiContent[] = [
      { role: 'user', parts: [{ text: userMessage }] }
    ];

    const requestBody: any = { contents: primaryContents };
    if (systemPrompt) {
      requestBody.systemInstruction = { parts: [{ text: systemPrompt }] };
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`;

    // Basic timeout wrapper (Abort after 25s)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    let geminiRes: Response;
    try {
      geminiRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
    } catch (err: any) {
      clearTimeout(timeout);
      const aborted = err?.name === 'AbortError';
      console.error('[chat] upstream fetch failed', { aborted, message: err?.message });
      return jsonResponse(<ApiErrorBody>{ error: 'Upstream request failed', code: aborted ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_FETCH_ERROR', details: aborted ? 'Timed out after 25s' : err?.message }, 502);
    }
    clearTimeout(timeout);

    // Fallback: if systemInstruction not recognized (older model variant) retry by injecting as first pseudo-message
    if (!geminiRes.ok) {
      const errTxt = await geminiRes.text();
      if (geminiRes.status === 400 && systemPrompt && /systemInstruction/i.test(errTxt)) {
        // Retry fallback strategy
        const fallbackContents: GeminiContent[] = [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'user', parts: [{ text: userMessage }] }
        ];
        const fallbackRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: fallbackContents })
        });
        if (!fallbackRes.ok) {
          const fbErrTxt = await fallbackRes.text();
            console.error('[chat] upstream fallback failed', { status: fallbackRes.status, body: fbErrTxt.slice(0,500) });
            return jsonResponse(<ApiErrorBody>{ error: 'Upstream model error (fallback)', code: 'UPSTREAM_FALLBACK_ERROR', upstreamStatus: fallbackRes.status, details: fbErrTxt.slice(0, 500) }, 502);
        }
        geminiRes = fallbackRes; // proceed below with success path
      } else {
        console.error('[chat] upstream error', { status: geminiRes.status, body: errTxt.slice(0,500) });
        return jsonResponse(<ApiErrorBody>{ error: 'Upstream model error', code: 'UPSTREAM_ERROR', upstreamStatus: geminiRes.status, details: errTxt.slice(0, 500) }, 502);
      }
    }

    const data = await geminiRes.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join('\n') || '(no content)';

    return jsonResponse({ reply, usedSystemPrompt: Boolean(systemPrompt) });
  } catch (e: any) {
    console.error('[chat] unhandled server error', e);
    return jsonResponse(<ApiErrorBody>{ error: 'Unhandled server error', code: 'UNCAUGHT', details: e?.message }, 500);
  }
}
