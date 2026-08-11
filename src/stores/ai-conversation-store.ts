"use client";

import { create } from "zustand";

import type { AIChatMessage, AIEvent } from "@/src/types/ai";

interface AIConversationState {
  conversationId: string | null;
  createdAt: string | null;
  lastActivityAt: string | null;

  messages: AIChatMessage[];

  startConversation: (conversationId: string) => void;

  addMessage: (message: AIChatMessage) => void;

  appendAssistantContent: (messageId: string, delta: string) => void;

  addAssistantEvent: (messageId: string, event: AIEvent) => void;

  updateLastActivity: () => void;

  resetConversation: () => void;

  clearMessages: () => void;
}

export const useAIConversationStore = create<AIConversationState>((set) => ({
  conversationId: null,
  createdAt: null,
  lastActivityAt: null,

  messages: [],

  startConversation: (conversationId) =>
    set((state) => {
      const isNewConversation = state.conversationId !== conversationId;

      if (isNewConversation) {
        return {
          conversationId,
          createdAt: new Date().toISOString(),
          lastActivityAt: new Date().toISOString(),
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

  addAssistantEvent: (messageId, event) =>
    set((state) => ({
      messages: state.messages.map((message) => {
        if (message.id !== messageId || message.role !== "assistant") {
          return message;
        }

        return {
          ...message,
          events: [...message.events, event],
        };
      }),
    })),

  updateLastActivity: () =>
    set({
      lastActivityAt: new Date().toISOString(),
    }),

  resetConversation: () =>
    set({
      conversationId: null,
      createdAt: null,
      lastActivityAt: null,
      messages: [],
    }),

  clearMessages: () =>
    set({
      messages: [],
    }),
}));
