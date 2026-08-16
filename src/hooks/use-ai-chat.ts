"use client";

import { useCallback, useRef, useState } from "react";

import {
  AIAssistantMessage,
  AIStreamEvent,
  AIUserMessage,
} from "@/src/types/ai";

import { streamAIChat } from "@/src/lib/api/ai";
import { useAIConversationStore } from "@/src/stores/ai-conversation-store";
import { useCinematicStore } from "../stores/cinematic-store";

export function useAIChat() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const messages = useAIConversationStore((state) => state.messages);

  const conversationId = useAIConversationStore(
    (state) => state.conversationId,
  );

  const setPurchasePlanId = useCinematicStore(
    (state) => state.setPurchasePlanId,
  );

  const cinematicStep = useCinematicStore((state) => state.stepIndex);

  const setAnalysisStatus = useCinematicStore(
    (state) => state.setAnalysisStatus,
  );

  const updateAssistantAgentStatus = useAIConversationStore(
    (state) => state.updateAssistantAgentStatus,
  );

  const removeTransientToolExecutions = useAIConversationStore(
    (state) => state.removeTransientToolExecutions,
  );

  const addMessage = useAIConversationStore((state) => state.addMessage);

  const startConversation = useAIConversationStore(
    (state) => state.startConversation,
  );

  const appendAssistantContent = useAIConversationStore(
    (state) => state.appendAssistantContent,
  );

  const addAssistantToolStart = useAIConversationStore(
    (state) => state.addAssistantToolStart,
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

        case "tool_start":
          addAssistantToolStart(
            assistantMessageId,
            event.tool_name,
            event.call_id,
          );

          if (cinematicStep === 5) {
            setAnalysisStatus("tool");
          }
          break;

        case "tool_event":
          addAssistantEvent(assistantMessageId, event.call_id, event.event);

          if (event.event.type === "purchase_plan_approved") {
            setPurchasePlanId(event.event.purchase_plan_id);
          }

          if (cinematicStep === 5) {
            setAnalysisStatus("event");
          }
          break;

        case "error":
          setError(event.message);
          break;

        case "message_end":
          updateAssistantAgentStatus(assistantMessageId, event.status);
          removeTransientToolExecutions(assistantMessageId);
          updateLastActivity();

          if (cinematicStep === 5) {
            setAnalysisStatus("completed");
          }
          break;
      }
    },
    [
      startConversation,
      appendAssistantContent,
      addAssistantToolStart,
      addAssistantEvent,
      updateAssistantAgentStatus,
      removeTransientToolExecutions,
      updateLastActivity,
      setAnalysisStatus,
      setPurchasePlanId,
      cinematicStep,
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
        toolExecutions: [],
      };

      addMessage(userMessage);
      addMessage(assistantMessage);

      const controller = new AbortController();

      abortControllerRef.current = controller;

      setIsStreaming(true);

      if (cinematicStep === 5) {
        setAnalysisStatus("analyzing");
      }

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
          if (cinematicStep === 5) {
            setAnalysisStatus("idle");
          }

          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong with FactoryPilot.",
        );

        if (cinematicStep === 5) {
          setAnalysisStatus("idle");
        }
      } finally {
        setIsStreaming(false);

        abortControllerRef.current = null;
      }
    },
    [
      conversationId,
      isStreaming,
      cinematicStep,
      addMessage,
      handleStreamEvent,
      setAnalysisStatus,
    ],
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
