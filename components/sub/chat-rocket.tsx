"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  streaming?: boolean;
}

// Simple ID helper
const uid = () => Math.random().toString(36).slice(2);

export const ChatRocket = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: uid(),
    role: "bot",
    content: "Hi cadet! I'm your space terminal. Ask me anything while we wire real engines...",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const streamingRef = useRef(false);

  // Auto scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Typewriter streaming effect for the last streaming bot message
  const streamBotMessage = useCallback((fullText: string) => {
    streamingRef.current = true;
    const id = uid();
    setMessages(prev => [...prev, { id, role: "bot", content: "", streaming: true }]);
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setMessages(prev => prev.map(m => m.id === id ? { ...m, content: fullText.slice(0, i) } : m));
      if (i >= fullText.length) {
        clearInterval(interval);
        streamingRef.current = false;
        setMessages(prev => prev.map(m => m.id === id ? { ...m, streaming: false } : m));
      }
    }, 25);
  }, []);

  const fakeResponse = useCallback((prompt: string) => {
    // Placeholder logic: echo back with small variation
    const reply = `Echo telemetry: ${prompt.slice(0, 120)}${prompt.length > 120 ? "..." : ""}`;
    streamBotMessage(reply);
  }, [streamBotMessage]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading || streamingRef.current) return;
    const userText = input.trim();
    setInput("");
    const userMsg: ChatMessage = { id: uid(), role: "user", content: userText };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Try backend (will fail silently if not available yet)
    try {
      const externalUrl = process.env.NEXT_PUBLIC_CHAT_API_URL?.trim();
      const apiUrl = externalUrl || "/api/chat"; // fallback to internal Gemini route
      if (apiUrl) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(apiUrl, {
          method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userText }),
            signal: controller.signal,
        });
        clearTimeout(timeout);
        if (res.ok) {
          const data = await res.json().catch(() => ({} as any));
          const answer = data?.reply || data?.message || JSON.stringify(data).slice(0, 400);
          streamBotMessage(answer || "(Empty response received)");
        } else {
          // Show concise status code to user only once
          streamBotMessage(`(backend ${res.status} – falling back to echo)`);
          fakeResponse(userText);
        }
      } else {
        // No API configured -> immediate local echo fallback
        fakeResponse(userText);
      }
    } catch {
      // Backend not ready – fall back
      fakeResponse(userText);
    } finally {
      setLoading(false);
    }
  }, [input, loading, fakeResponse, streamBotMessage]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open]);

  return (
    <>
      {/* Floating Rocket Trigger */}
      <motion.button
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen(o => !o)}
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="chat-rocket-trigger group fixed z-[120] bottom-8 right-8 w-16 h-16 rounded-full overflow-visible focus:outline-none"
        style={{
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative flex flex-col items-center justify-start" style={{ width: 56, height: 64 }}>
            {/* Ambient glow (behind) */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "radial-gradient(circle at 50% 55%,rgba(230,238,255,0.85),rgba(200,215,235,0.35) 45%,transparent 72%)",
                filter: "blur(14px)",
              }}
            />
            {/* Hull + window wrapper */}
            <div className="relative flex flex-col items-center" style={{ width: 30, height: 52 }}>
              <div
                className="w-full h-full"
                style={{
                  background: "linear-gradient(165deg,#ffffff 0%,#f6f8fa 35%,#e6eaf0 70%,#d3d9e1 100%)",
                  clipPath: "polygon(50% 0%, 94% 30%, 86% 100%, 14% 100%, 6% 30%)",
                  boxShadow: "0 0 8px rgba(255,255,255,0.6), inset 0 0 8px rgba(255,255,255,0.4)",
                }}
              />
              {/* Window absolutely centered via flex parent */}
              <motion.div
                className="absolute rounded-full rocket-window"
                style={{
                  top: 12, // fixed px to avoid percentage rounding shifts
                  width: 18,
                  height: 18,
                  left: '50%',
                  transform: 'translateX(-50%)', // only horizontal translation
                  transformOrigin: 'center center',
                  background: "radial-gradient(circle at 42% 38%, #fffce5 0%, #ffe790 45%, #ffc845 68%, rgba(255,200,69,0.25) 78%, transparent 82%)",
                  boxShadow: "0 0 8px 2px rgba(255,215,130,0.65), 0 0 14px -2px rgba(255,205,95,0.5)",
                  filter: "saturate(1.08) brightness(1.03)",
                  willChange: 'opacity',
                  pointerEvents: 'none',
                }}
                animate={{ opacity: [0.65, 1, 0.65] }}
                transition={{ duration: 3.4, repeat: Infinity }}
              />
            </div>
            {/* Fins row */}
            <div className="relative w-full flex justify-between px-[2px]" style={{ height: 28, marginTop: -14 }}>
              <div
                style={{
                  width: 22,
                  height: 26,
                  background: "linear-gradient(150deg,#eef1f5,#d8dde3)",
                  clipPath: "polygon(100% 0%, 100% 100%, 0% 70%, 0% 30%)",
                  boxShadow: "0 0 5px rgba(255,255,255,0.55), inset 0 0 5px rgba(255,255,255,0.35)",
                }}
              />
              <div
                style={{
                  width: 22,
                  height: 26,
                  background: "linear-gradient(210deg,#eef1f5,#d8dde3)",
                  clipPath: "polygon(0% 0%, 0% 100%, 100% 70%, 100% 30%)",
                  boxShadow: "0 0 5px rgba(255,255,255,0.55), inset 0 0 5px rgba(255,255,255,0.35)",
                }}
              />
            </div>
            {/* Flame (single plume only — removed small inner flame) */}
            <motion.div
              className="relative origin-top pointer-events-none"
              style={{
                marginTop: -4,
                width: 26,
                height: 38,
                filter: "saturate(1.18)",
              }}
              animate={{ scaleY: [0.92, 1.18, 0.92], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="absolute left-1/2 top-0"
                style={{
                  width: 26,
                  height: 38,
                  transform: 'translateX(-50%)',
                  clipPath: 'polygon(50% 0%, 64% 10%, 74% 26%, 80% 44%, 80% 62%, 72% 80%, 58% 92%, 50% 100%, 42% 92%, 28% 80%, 20% 62%, 20% 44%, 26% 26%, 36% 10%)',
                  background: 'radial-gradient(circle at 50% 32%, rgba(255,255,210,0.95) 0%, rgba(255,230,130,0.9) 14%, rgba(255,195,70,0.85) 30%, rgba(255,145,45,0.78) 50%, rgba(255,100,30,0.62) 66%, rgba(255,60,20,0.4) 78%, rgba(200,40,15,0.18) 88%, rgba(255,20,0,0) 100%)',
                  boxShadow: '0 0 18px 4px rgba(255,140,40,0.5), 0 0 34px -4px rgba(255,90,30,0.45)',
                  filter: 'blur(.65px)',
                }}
              />
            </motion.div>
          </div>
        </div>
        <span className="sr-only">Space Chat Rocket</span>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="fixed z-[130] bottom-28 right-8 w-[360px] max-w-[92vw] h-[480px] flex flex-col rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_8px_28px_-4px_rgba(0,0,0,0.7)] chat-terminal-bg border border-[#1e2b3f]/70 overflow-hidden"
          >
            {/* Header */}
            <div className="chat-terminal-header flex items-center justify-between px-4 py-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs tracking-wide font-medium text-[#8fb8ff]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#4A90E2] animate-pulse" />
                SPACE TERMINAL
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#6d7a94] hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-[13px] font-mono leading-relaxed tracking-tight chat-scrollbar">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={m.role === "user" ? "text-[#ffc26b]" : "text-[#9fd7ff]"}
                >
                  <span className="opacity-60 mr-1 select-none">
                    {m.role === "user" ? ">" : "#"}
                  </span>
                  {m.content}
                  {m.streaming && (
                    <motion.span
                      className="inline-block w-2 h-4 align-middle ml-1 bg-[#9fd7ff]"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                    />
                  )}
                </div>
              ))}
              {loading && (
                <div className="text-[#60708c] text-xs flex items-center gap-2">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="inline-block w-2 h-2 rounded-full bg-[#4A90E2]"
                  />
                  contacting backend engines...
                </div>
              )}
              <div ref={endRef} />
            </div>
            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="p-3 border-t border-white/10 chat-terminal-input"
            >
              <div className="flex items-center gap-2">
                <input
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#5f6b80] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]"
                  placeholder="Transmit message..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading || streamingRef.current}
                  className="px-3 py-2 rounded-lg bg-gradient-to-tr from-[#173153] via-[#1d3d68] to-[#274f80] border border-white/10 text-[#9fd7ff] hover:from-[#224671] hover:to-[#2f649b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-sm"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatRocket;
