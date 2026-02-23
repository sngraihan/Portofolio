"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Bot, X, Send, Loader2, Sparkles, Cat } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What are Raihan's main skills? 🛠️",
  "Tell me about his projects 🚀",
  "Is he available for hire? 💼",
  "How can I contact him? 📬",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! 👋 I'm Korona Salim, Raihan's cat 😸 assistant. Ask me anything about his skills, projects, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);

      // Add empty assistant message to stream into
      const assistantMsg: Message = { role: "assistant", content: "" };
      setMessages([...newMessages, assistantMsg]);

      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) throw new Error("API error");

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: accumulated,
            };
            return updated;
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content:
              "Sorry, something went wrong miau 😿... Please try again or email Raihan directly at raihanasng@gmail.com 🙏",
          };
          return updated;
        });
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading],
  );

  const handleOpen = () => {
    setIsOpen(true);
    setHasOpened(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    abortRef.current?.abort();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        aria-label="Open AI chat assistant"
        className={`fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center
                    rounded-full transition-all duration-300 cursor-pointer
                    shadow-[0_0_24px_rgba(0,212,255,0.35)]
                    ${
                      isOpen
                        ? "bg-background border border-primary/40 rotate-0 scale-100"
                        : "bg-primary hover:scale-110 hover:shadow-[0_0_36px_rgba(0,212,255,0.5)]"
                    }`}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-primary transition-all duration-200" />
        ) : (
          <Cat className="h-6 w-6 text-primary-foreground" />
        )}

        {/* Pulse ring when closed and not opened before */}
        {!hasOpened && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-primary" />
          </span>
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-[99] w-[min(380px,calc(100vw-48px))]
                    transition-all duration-300 origin-bottom-right
                    ${
                      isOpen
                        ? "scale-100 opacity-100 pointer-events-auto"
                        : "scale-90 opacity-0 pointer-events-none"
                    }`}
      >
        <div
          className="flex flex-col overflow-hidden rounded-2xl border border-primary/20
                      bg-background/80 backdrop-blur-xl
                      shadow-[0_0_60px_rgba(0,212,255,0.12),0_20px_60px_rgba(0,0,0,0.5)]"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="relative flex items-center gap-3 border-b border-primary/10 px-4 py-3">
            {/* Top glow line */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                          border border-primary/30 bg-primary/10
                          shadow-[0_0_12px_rgba(0,212,255,0.25)]"
            >
              <Cat className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Korona Salim</p>
              <p className="text-xs text-primary">Raihan's Cat AI</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 px-4 py-4 hide-scrollbar">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed
                    ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary/60 text-foreground rounded-bl-sm border border-border/50"
                    }
                    ${!msg.content && msg.role === "assistant" ? "min-w-[60px]" : ""}
                  `}
                >
                  {msg.content ? (
                    msg.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none 
                                      prose-p:leading-relaxed prose-p:my-1 
                                      prose-ul:my-1 prose-li:my-0.5 
                                      prose-a:text-primary prose-strong:text-primary">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                    )
                  ) : (
                    <span className="flex items-center gap-1 h-5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Suggested questions (only on first message) */}
            {messages.length === 1 && (
              <div className="flex flex-col gap-2 pt-1">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-xl border border-border/60 bg-secondary/30 px-3.5 py-2
                               text-left text-xs text-muted-foreground transition-all duration-200
                               hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-primary/10 px-3 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Ask anything about Raihan…"
              className="flex-1 rounded-xl border border-border/60 bg-secondary/30 px-3.5 py-2.5
                         text-sm outline-none placeholder:text-muted-foreground/50
                         focus:border-primary/60 transition-colors
                         disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                         bg-primary transition-all duration-200
                         hover:bg-primary/90 hover:shadow-[0_0_16px_rgba(0,212,255,0.4)]
                         disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
              ) : (
                <Send className="h-4 w-4 text-primary-foreground" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
