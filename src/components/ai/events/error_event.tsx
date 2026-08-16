import { ErrorEvent } from "@/src/types/ai";
import { AlertCircle } from "lucide-react";

interface AIErrorEventProps {
  event: ErrorEvent;
}

export function AIErrorEvent({ event }: AIErrorEventProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-destructive/10">
        <AlertCircle className="size-4 text-destructive" />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">
          Something went wrong
        </p>

        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {event.message}
        </p>
      </div>
    </div>
  );
}
