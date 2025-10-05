import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Temporary diagnostics endpoint. REMOVE after troubleshooting.
// Does NOT leak the secret value; only reports presence and length.
export async function GET(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  const keysPresent = Object.keys(process.env).filter(k => k.startsWith('GEMINI'));
  const masked = apiKey ? apiKey.slice(0, 4) + '***' + apiKey.slice(-4) : null;
  return new Response(JSON.stringify({
    geminiKeyPresent: Boolean(apiKey),
    geminiKeyLength: apiKey?.length || 0,
    geminiKeyMasked: masked,
    envKeysStartingWithGemini: keysPresent,
    hint: 'If geminiKeyPresent=false on Amplify, the variable GEMINI_API_KEY is not injected. Double-check Amplify > App settings > Environment variables for the main branch and redeploy.'
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
