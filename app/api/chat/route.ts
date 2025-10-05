import { NextRequest } from "next/server";

// Gemini (Google AI Studio) simple integration using REST fetch.
// Environment variables required:
//   NEXT_PUBLIC_GEMINI_MODEL (optional, defaults to gemini-1.5-flash-002 or user specified)
//   GEMINI_API_KEY (server-side secret; DO NOT expose to client)
//   GEMINI_SYSTEM_PROMPT (optional system prompt injection)
// NOTE: This is a minimal stateless implementation (no streaming) to keep footprint small.
// For streaming, you'd use the streaming endpoint and a ReadableStream wrapper.

interface GeminiContentPart { text: string }
interface GeminiContent { role: string; parts: GeminiContentPart[] }

export const runtime = 'edge'; // low-latency; switch to 'nodejs' if using unsupported APIs

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Server missing GEMINI_API_KEY' }), { status: 500 });
    }

    const model = process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-1.5-flash-002';
    // Clean & normalize system prompt (strip wrapping quotes if present)
    let rawSystem = process.env.GEMINI_SYSTEM_PROMPT;
    if (rawSystem) rawSystem = rawSystem.trim();
    if (rawSystem && rawSystem.startsWith('"') && rawSystem.endsWith('"')) {
      rawSystem = rawSystem.slice(1, -1).trim();
    }
    const systemPrompt = rawSystem && rawSystem.length > 0 ? rawSystem : undefined;

    const body = await req.json().catch(() => ({}));
    const userMessage: string = (body.message || '').toString().slice(0, 4000);
    if (!userMessage) {
      return new Response(JSON.stringify({ error: 'Empty message' }), { status: 400 });
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

    let geminiRes = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    // Fallback: if systemInstruction not recognized (older model variant) retry by injecting as first pseudo-message
    if (!geminiRes.ok && geminiRes.status === 400 && systemPrompt) {
      const errTxt = await geminiRes.text();
      if (/systemInstruction/i.test(errTxt)) {
        const fallbackContents: GeminiContent[] = [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'user', parts: [{ text: userMessage }] }
        ];
        geminiRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: fallbackContents })
        });
      } else {
        // reuse error text below if other issue
        return new Response(JSON.stringify({ error: 'Gemini error', status: geminiRes.status, body: errTxt.slice(0, 500) }), { status: 502 });
      }
    }

    if (!geminiRes.ok) {
      const errTxt = await geminiRes.text();
      return new Response(JSON.stringify({ error: 'Gemini error', status: geminiRes.status, body: errTxt.slice(0, 500) }), { status: 502 });
    }

    const data = await geminiRes.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join('\n') || '(no content)';

    return new Response(JSON.stringify({ reply, usedSystemPrompt: Boolean(systemPrompt) }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'Unhandled server error', message: e?.message }), { status: 500 });
  }
}
