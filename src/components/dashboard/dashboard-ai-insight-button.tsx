import { Sparkles } from "lucide-react";

import { useAIConversationStore } from "@/src/stores/ai-conversation-store";
import { Button } from "@base-ui/react";

interface DashboardAIInsightButtonProps {
  prompt: string;
  "data-cinematic"?: string;
}

export function DashboardAIInsightButton({
  prompt,
  "data-cinematic": dataCinematic,
}: DashboardAIInsightButtonProps) {
  const openCopilot = useAIConversationStore((state) => state.openCopilot);

  return (
    <Button
      data-cinematic={dataCinematic}
      className="gap-1.5 text-xs"
      onClick={() => openCopilot(prompt)}
    >
      <Sparkles className="size-3.5" />
      Ask Copilot
    </Button>
  );
}
