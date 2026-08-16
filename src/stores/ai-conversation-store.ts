"use client";

import { create } from "zustand";

import type {
  AIAgentStatus,
  AIChatMessage,
  AIEvent,
  AIToolExecution,
} from "@/src/types/ai";

interface AIConversationState {
  conversationId: string | null;
  createdAt: string | null;
  lastActivityAt: string | null;

  messages: AIChatMessage[];

  isOpen: boolean;
  input: string;

  startConversation: (conversationId: string) => void;

  addMessage: (message: AIChatMessage) => void;

  appendAssistantContent: (messageId: string, delta: string) => void;

  removeTransientToolExecutions: (messageId: string) => void;

  addAssistantToolStart: (
    messageId: string,
    toolName: string,
    callId: string,
  ) => void;

  addAssistantEvent: (
    messageId: string,
    callId: string,
    event: AIEvent,
  ) => void;

  updateAssistantAgentStatus: (
    messageId: string,
    status: AIAgentStatus,
  ) => void;

  updateLastActivity: () => void;

  openCopilot: (prompt?: string) => void;
  closeCopilot: () => void;

  setInput: (input: string) => void;

  resetConversation: () => void;

  clearMessages: () => void;
}

export const useAIConversationStore = create<AIConversationState>((set) => ({
  conversationId: null,
  createdAt: null,
  lastActivityAt: null,

  messages: [],

  isOpen: false,
  input: "",

  startConversation: (conversationId) =>
    set((state) => {
      const isNewConversation = state.conversationId !== conversationId;

      if (isNewConversation) {
        const now = new Date().toISOString();

        return {
          conversationId,
          createdAt: now,
          lastActivityAt: now,
        };
      }

      return {
        conversationId,
        lastActivityAt: new Date().toISOString(),
      };
    }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  appendAssistantContent: (messageId, delta) =>
    set((state) => ({
      messages: state.messages.map((message) => {
        if (message.id !== messageId || message.role !== "assistant") {
          return message;
        }

        return {
          ...message,
          content: message.content + delta,
        };
      }),
    })),

  updateAssistantAgentStatus: (messageId: string, status: AIAgentStatus) => {
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageId && message.role === "assistant"
          ? {
              ...message,
              agentStatus: status,
            }
          : message,
      ),
    }));
  },

  addAssistantToolStart: (messageId, toolName, callId) =>
    set((state) => ({
      messages: state.messages.map((message) => {
        if (message.id !== messageId || message.role !== "assistant") {
          return message;
        }

        const toolExecution: AIToolExecution = {
          callId,
          toolName,
        };

        return {
          ...message,
          toolExecutions: [...message.toolExecutions, toolExecution],
        };
      }),
    })),

  removeTransientToolExecutions: (messageId) =>
    set((state) => ({
      messages: state.messages.map((message) => {
        if (message.id !== messageId || message.role !== "assistant") {
          return message;
        }

        return {
          ...message,
          toolExecutions: message.toolExecutions.filter(
            ({ event }) => event !== undefined,
          ),
        };
      }),
    })),

  addAssistantEvent: (messageId, callId, event) =>
    set((state) => ({
      messages: state.messages.map((message) => {
        if (message.id !== messageId || message.role !== "assistant") {
          return message;
        }

        return {
          ...message,
          toolExecutions: message.toolExecutions.map((toolExecution) => {
            if (toolExecution.callId !== callId) {
              return toolExecution;
            }

            return {
              ...toolExecution,
              event,
            };
          }),
        };
      }),
    })),

  updateLastActivity: () =>
    set({
      lastActivityAt: new Date().toISOString(),
    }),

  openCopilot: (prompt) =>
    set({
      isOpen: true,
      input: prompt ?? "",
    }),

  closeCopilot: () =>
    set({
      isOpen: false,
    }),

  setInput: (input) =>
    set({
      input,
    }),

  resetConversation: () =>
    set({
      conversationId: null,
      createdAt: null,
      lastActivityAt: null,
      messages: [],
      input: "",
    }),

  clearMessages: () =>
    set({
      messages: [],
    }),
}));
