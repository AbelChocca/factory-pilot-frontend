"use client";

import { useState } from "react";
import { RotateCcw, Settings } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";

import { useAIConversationStore } from "@/src/stores/ai-conversation-store";

export function AIConversationSettings() {
  const [open, setOpen] = useState(false);

  const conversationId = useAIConversationStore(
    (state) => state.conversationId,
  );

  const resetConversation = useAIConversationStore(
    (state) => state.resetConversation,
  );

  const createdAt = useAIConversationStore((state) => state.createdAt);

  const lastActivityAt = useAIConversationStore(
    (state) => state.lastActivityAt,
  );

  const hasConversation = Boolean(conversationId);

  const handleReset = () => {
    resetConversation();
    setOpen(false);
  };

  const formatDate = (value: string | null) => {
    if (!value) {
      return "—";
    }

    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          />
        }
      >
        <Settings className="size-4" />
        <span>Settings</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>

          <DialogDescription>
            Manage your FactoryPilot conversation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium">AI Conversation</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Your current FactoryPilot conversation.
            </p>
          </div>

          {hasConversation ? (
            <div className="space-y-4 rounded-lg border p-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Created
                </p>

                <p className="mt-1 text-sm">{formatDate(createdAt)}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Last activity
                </p>

                <p className="mt-1 text-sm">{formatDate(lastActivityAt)}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-4">
              <p className="text-sm font-medium">No active conversation</p>

              <p className="mt-1 text-sm text-muted-foreground">
                A new conversation will be created when you send your next
                message.
              </p>
            </div>
          )}

          <div className="border-t pt-5">
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
                <RotateCcw className="size-4" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium">Reset conversation</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Clear the current FactoryPilot conversation and start a new
                  one.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={!hasConversation}
            onClick={handleReset}
          >
            <RotateCcw className="size-4" />
            Reset conversation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
