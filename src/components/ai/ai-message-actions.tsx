"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface AIMessageActionsProps {
  content: string;
}

export function AIMessageActions({ content }: AIMessageActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;

    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="mt-1 flex items-center gap-1">
      <button
        type="button"
        onClick={handleCopy}
        className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Copy response"
      >
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}
