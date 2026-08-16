import { Button } from "@base-ui/react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface DashboardOverviewErrorProps {
  onRetry: () => void;
}

export function DashboardOverviewError({
  onRetry,
}: DashboardOverviewErrorProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="size-6 text-destructive" />
        </div>

        <h2 className="mt-4 text-lg font-semibold">Unable to load dashboard</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          We couldnt retrieve the latest operational data. Please try again.
        </p>

        <Button
          className="mx-auto mt-4 flex items-center justify-center gap-2"
          onClick={onRetry}
        >
          <RefreshCw className="size-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}
