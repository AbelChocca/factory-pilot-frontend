"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PanelRightClose, PanelRightOpen, Send, Square } from "lucide-react";

import { useAIChat } from "@/src/hooks/use-ai-chat";
import { AIMessageActions } from "./ai-message-actions";
import { AIEventRenderer } from "./ai-event-renderer";
import { useAIConversationStore } from "@/src/stores/ai-conversation-store";
import { AIAgentStatus } from "@/src/types/ai";

const MIN_WIDTH = 320;
const MAX_WIDTH = 600;
const DEFAULT_WIDTH = 380;

const AGENT_STATUS_IMAGE: Record<AIAgentStatus, string> = {
  [AIAgentStatus.THINKING]: "/assets/thinking_castor.png",
  [AIAgentStatus.ANALYZING]: "/assets/entushiast_castor.png",
  [AIAgentStatus.COMPLETED]: "/assets/happy_castor.png",
  [AIAgentStatus.ERROR]: "/assets/alert_castor.png",
};

const agentStatusRing = {
  thinking: "ring-amber-500/20",
  analyzing: "ring-blue-500/20",
  completed: "ring-emerald-500/20",
  error: "ring-red-500/20",
};

function getAgentImage(status?: AIAgentStatus): string {
  if (!status) {
    return "/assets/thinking_castor.png";
  }

  return AGENT_STATUS_IMAGE[status];
}

export function AICopilot() {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);

  const isOpen = useAIConversationStore((state) => state.isOpen);

  const closeCopilot = useAIConversationStore((state) => state.closeCopilot);

  const openCopilot = useAIConversationStore((state) => state.openCopilot);

  const input = useAIConversationStore((state) => state.input);

  const setInput = useAIConversationStore((state) => state.setInput);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const streamingMessageRef = useRef<HTMLDivElement>(null);

  const { messages, isStreaming, error, sendMessage, stop } = useAIChat();

  const handleSubmit = async () => {
    const message = input.trim();

    if (!message || isStreaming) {
      return;
    }

    setInput("");

    await sendMessage(message);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
  };

  useEffect(() => {
    resizeTextarea();
  }, [input]);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    streamingMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [isStreaming]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleResizeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsResizing(true);

    const startX = event.clientX;
    const startWidth = width;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const delta = startX - moveEvent.clientX;

      const nextWidth = Math.min(
        MAX_WIDTH,
        Math.max(MIN_WIDTH, startWidth + delta),
      );

      setWidth(nextWidth);
    };

    const handlePointerUp = () => {
      setIsResizing(false);

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => openCopilot()}
        className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Open FactoryPilot"
      >
        <PanelRightOpen className="size-4" />
      </button>
    );
  }

  return (
    <aside
      data-cinematic="copilot-panel"
      className={`relative flex min-h-0 shrink-0 flex-col border-l bg-background ${
        isResizing ? "select-none" : ""
      }`}
      style={{
        width,
      }}
    >
      {/* Resize handle */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize AI Copilot"
        onPointerDown={handleResizeStart}
        className="group absolute inset-y-0 -left-1 z-20 w-2 cursor-col-resize"
      >
        <div
          className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-colors ${
            isResizing ? "bg-primary" : "bg-transparent group-hover:bg-border"
          }`}
        />
      </div>

      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold">FactoryPilot</p>

          <p className="text-xs text-muted-foreground">AI Copilot</p>
        </div>

        <button
          type="button"
          onClick={() => closeCopilot()}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close FactoryPilot"
        >
          <PanelRightClose className="size-4" />
        </button>
      </div>

      {/* Messages */}
      <div
        data-cinematic="copilot-response"
        className="flex-1 space-y-4 overflow-y-auto p-4 "
      >
        {messages.length === 0 && (
          <div className="flex gap-2.5">
            <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
              <Image
                src="/assets/castor_profile.png"
                alt="FactoryPilot"
                width={28}
                height={28}
                className="size-full object-cover"
              />
            </div>

            <div className="max-w-[85%] rounded-xl bg-muted/60 px-3.5 py-3 text-sm leading-6">
              <p>Good morning! I&apos;m FactoryPilot.</p>

              <p className="mt-2 text-muted-foreground">
                I can help you analyze inventory, production risks, materials
                and suppliers.
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <div key={message.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
                  {message.content}
                </div>
              </div>
            );
          }

          const isStreamingMessage =
            isStreaming && message.id === messages[messages.length - 1]?.id;

          return (
            <div
              key={message.id}
              ref={isStreamingMessage ? streamingMessageRef : undefined}
              className="flex gap-2.5"
            >
              {/* Agent avatar */}
              <div
                className={`flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ${
                  agentStatusRing[message.agentStatus!]
                }`}
              >
                <Image
                  src={getAgentImage(message.agentStatus)}
                  alt="FactoryPilot"
                  width={28}
                  height={28}
                  className="size-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                {/* Assistant content */}
                {message.content ? (
                  <div className="max-w-[90%] text-sm leading-6">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2.5 last:mb-0">{children}</p>
                        ),

                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),

                        ul: ({ children }) => (
                          <ul className="mb-2.5 ml-4 list-disc space-y-1">
                            {children}
                          </ul>
                        ),

                        ol: ({ children }) => (
                          <ol className="mb-2.5 ml-4 list-decimal space-y-1">
                            {children}
                          </ol>
                        ),

                        li: ({ children }) => <li>{children}</li>,

                        code: ({ children }) => (
                          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  isStreaming && (
                    <div className="flex h-7 items-center gap-1">
                      <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground" />
                      <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:150ms]" />
                      <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:300ms]" />
                    </div>
                  )
                )}

                {/* Tool executions */}
                <AnimatePresence mode="popLayout">
                  {message.toolExecutions.map((execution) => (
                    <motion.div
                      key={execution.callId}
                      layout
                      initial={{
                        opacity: 0,
                        y: 8,
                        scale: 0.98,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -4,
                        scale: 0.98,
                      }}
                      transition={{
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      className="mt-3"
                    >
                      <AIEventRenderer execution={execution} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {message.content && (
                  <AIMessageActions content={message.content} />
                )}
              </div>
            </div>
          );
        })}

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t p-3">
        <div className="flex items-center gap-2 rounded-lg border bg-background p-2">
          <textarea
            ref={textareaRef}
            value={input}
            data-cinematic="copilot-input"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            placeholder="Ask FactoryPilot..."
            rows={1}
            className={`max-h-32 min-h-8 flex-1 resize-none overflow-y-auto bg-transparent px-2 py-1 text-sm outline-none`}
          />

          {isStreaming ? (
            <button
              type="button"
              onClick={stop}
              className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-foreground transition-colors hover:bg-muted/80"
              aria-label="Stop generating"
            >
              <Square className="size-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              data-cinematic="copilot-send"
              disabled={!input.trim()}
              className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="size-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
