import { Skeleton } from "@/src/components/ui/skeleton";

export function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-32" />

        <Skeleton className="mt-2 h-4 w-72" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>

      <DashboardCardSkeleton className="min-h-[360px]" />

      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardCardSkeleton className="min-h-[420px]" />
        <DashboardCardSkeleton className="min-h-[420px]" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardCardSkeleton className="min-h-[420px]" />
        <DashboardCardSkeleton className="min-h-[420px]" />
      </div>
    </div>
  );
}

interface DashboardCardSkeletonProps {
  className?: string;
}

function DashboardCardSkeleton({ className }: DashboardCardSkeletonProps) {
  return (
    <div className={`rounded-xl border bg-card p-6 ${className ?? ""}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-64" />
        </div>

        <Skeleton className="size-5 rounded-md" />
      </div>

      <div className="mt-6 space-y-5">
        <Skeleton className="h-10 w-28" />

        <Skeleton className="h-2 w-full" />

        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
