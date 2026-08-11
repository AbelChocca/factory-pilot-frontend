"use client";

import { useCallback, useRef, useState } from "react";

import type {
  AIAssistantMessage,
  AIStreamEvent,
  AIUserMessage,
} from "@/src/types/ai";

import { streamAIChat } from "@/src/lib/api/ai";
import { useAIConversationStore } from "@/src/stores/ai-conversation-store";

export function useAIChat() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const messages = useAIConversationStore((state) => state.messages);

  const conversationId = useAIConversationStore(
    (state) => state.conversationId,
  );

  const addMessage = useAIConversationStore((state) => state.addMessage);

  const startConversation = useAIConversationStore(
    (state) => state.startConversation,
  );

  const appendAssistantContent = useAIConversationStore(
    (state) => state.appendAssistantContent,
  );

  const addAssistantEvent = useAIConversationStore(
    (state) => state.addAssistantEvent,
  );

  const updateLastActivity = useAIConversationStore(
    (state) => state.updateLastActivity,
  );

  const handleStreamEvent = useCallback(
    (event: AIStreamEvent, assistantMessageId: string) => {
      switch (event.type) {
        case "message_start":
          startConversation(event.conversation_id);
          break;

        case "message_delta":
          appendAssistantContent(assistantMessageId, event.delta);
          break;

        case "tool_event":
          addAssistantEvent(assistantMessageId, event.event);
          break;

        case "error":
          setError(event.message);
          break;

        case "message_end":
          updateLastActivity();
          break;
      }
    },
    [
      startConversation,
      appendAssistantContent,
      addAssistantEvent,
      updateLastActivity,
    ],
  );

  const sendMessage = useCallback(
    async (content: string) => {
      const message = content.trim();

      if (!message || isStreaming) {
        return;
      }

      setError(null);

      const userMessage: AIUserMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
      };

      const assistantMessageId = crypto.randomUUID();

      const assistantMessage: AIAssistantMessage = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        events: [],
      };

      addMessage(userMessage);
      addMessage(assistantMessage);

      const controller = new AbortController();

      abortControllerRef.current = controller;
      setIsStreaming(true);

      try {
        await streamAIChat(
          {
            message,
            conversation_id: conversationId,
          },
          (event) => {
            handleStreamEvent(event, assistantMessageId);
          },
          controller.signal,
        );
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong with FactoryPilot.",
        );
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [conversationId, isStreaming, addMessage, handleStreamEvent],
  );

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return {
    messages,
    conversationId,
    isStreaming,
    error,
    sendMessage,
    stop,
  };
}
