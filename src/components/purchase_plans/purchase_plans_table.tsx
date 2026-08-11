"use client";

import { usePurchasePlans } from "@/src/hooks/purchase-plans";
import { GetPurchasePlansParams } from "@/src/lib/api/purchase-plans";
import { PurchasePlan } from "@/src/types/aliases";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { DataPagination } from "@/src/components/common/data-pagination";
import { useState } from "react";
import { PurchasePlanDetailDrawer } from "./purchase-plan-detail-drawer";

interface PurchasePlansTableProps {
  filters: GetPurchasePlansParams;
  onFiltersChange: (filters: GetPurchasePlansParams) => void;
}

function StatusBadge({ status }: { status: PurchasePlan["status"] }) {
  const isApproved = status === "approved";

  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span
        className={`size-1.5 rounded-full ${
          isApproved ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />

      {isApproved ? "Approved" : "Draft"}
    </span>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function PurchasePlansTable({
  filters,
  onFiltersChange,
}: PurchasePlansTableProps) {
  const { data, isPending, isError, error } = usePurchasePlans(filters);

  const [selectedPurchasePlanId, setSelectedPurchasePlanId] = useState<
    string | null
  >(null);

  if (isPending) {
    return (
      <div className="rounded-lg border">
        <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
          Loading purchase plans...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border px-4 py-6">
        <p className="text-sm font-medium">Failed to load purchase plans</p>

        <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Purchase Plan</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.items.map((purchasePlan) => (
                <TableRow
                  key={purchasePlan.id}
                  onClick={() => {
                    setSelectedPurchasePlanId(purchasePlan.id);
                  }}
                >
                  <TableCell>
                    <span
                      className="font-mono text-xs text-muted-foreground"
                      title={purchasePlan.id}
                    >
                      {purchasePlan.id}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="font-medium">
                      ${purchasePlan.total_estimated_cost}
                    </span>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(purchasePlan.created_at)}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={purchasePlan.status} />
                  </TableCell>
                </TableRow>
              ))}

              {data.items.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No purchase plans found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <DataPagination
            currentPage={data.current_page}
            totalPages={data.total_pages}
            onPageChange={(page) => {
              onFiltersChange({
                ...filters,
                page,
              });
            }}
          />
        </div>
      </div>
      <PurchasePlanDetailDrawer
        open={Boolean(selectedPurchasePlanId)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPurchasePlanId(null);
          }
        }}
        purchasePlanId={selectedPurchasePlanId}
      />
    </>
  );
}
