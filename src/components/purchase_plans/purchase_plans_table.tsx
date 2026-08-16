"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { usePurchasePlans } from "@/src/hooks/purchase-plans";
import { GetPurchasePlansParams } from "@/src/lib/api/purchase-plans";
import { PurchasePlan } from "@/src/types/aliases";

import { DataPagination } from "@/src/components/common/data-pagination";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { PurchasePlanDetailDrawer } from "./purchase-plan-detail-drawer";
import { useCinematicStore } from "@/src/stores/cinematic-store";

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

  const cinematicInputValue = useCinematicStore(
    (state) => state.cinematicInputValue,
  );

  const setCinematicInputValue = useCinematicStore(
    (state) => state.setCinematicInputValue,
  );

  const cinematicPurchasePlanId = useCinematicStore(
    (state) => state.purchasePlanId,
  );

  const [selectedPurchasePlanId, setSelectedPurchasePlanId] = useState<
    string | null
  >(null);

  const search = cinematicInputValue ?? "";

  const handleSearchSubmit = () => {
    const value = search.trim();

    onFiltersChange({
      ...filters,
      search: value || undefined,
      page: 1,
    });
  };

  return (
    <>
      <div className="space-y-4">
        {/* Search */}
        <div className="flex items-end gap-3">
          <div className="min-w-[240px] flex-1">
            <label
              htmlFor="purchase-plan-search"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              Search
            </label>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="purchase-plan-search"
                value={search}
                placeholder="Search purchase plans..."
                className="pl-9 pr-20"
                data-cinematic="purchase-plans-search"
                onChange={(event) => {
                  setCinematicInputValue(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearchSubmit();
                  }
                }}
              />

              <button
                type="button"
                onClick={handleSearchSubmit}
                disabled={!search.trim()}
                data-cinematic="purchase-plans-search-submit"
                className="absolute right-1 top-1/2 flex h-7 -translate-y-1/2 items-center gap-1 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
              >
                <Search className="size-3.5" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        {isPending ? (
          <div className="rounded-lg border">
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              Loading purchase plans...
            </div>
          </div>
        ) : isError ? (
          <div className="rounded-lg border px-4 py-6">
            <p className="text-sm font-medium">Failed to load purchase plans</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {error.message}
            </p>
          </div>
        ) : (
          <>
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
                      data-cinematic={
                        purchasePlan.id === cinematicPurchasePlanId
                          ? "created-purchase-plan"
                          : undefined
                      }
                      className="cursor-pointer"
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
          </>
        )}
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
