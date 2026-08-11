"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { useSuppliers } from "@/src/hooks/suppliers";
import { GetSuppliersParams } from "@/src/lib/api/suppliers";
import { Status } from "@/src/types/aliases";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { Button } from "@/src/components/ui/button";
import { DataPagination } from "@/src/components/common/data-pagination";
import { SupplierDetailDrawer } from "./supplier-detail-drawer";

const statusLabels: Record<Status, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`size-1.5 rounded-full ${
          status === "ACTIVE" ? "bg-emerald-500" : "bg-muted-foreground"
        }`}
      />

      {statusLabels[status]}
    </span>
  );
}

interface SuppliersTableProps {
  filters: GetSuppliersParams;
  onFiltersChange: (filters: GetSuppliersParams) => void;
}

export function SuppliersTable({
  filters,
  onFiltersChange,
}: SuppliersTableProps) {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(
    null,
  );

  const { data, isPending, isError, error } = useSuppliers(filters);

  if (isPending) {
    return <div>Loading suppliers...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>Failed to load suppliers</p>
        <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Lead Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.items.map((supplier) => (
                <TableRow
                  key={supplier.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    setSelectedSupplierId(supplier.id);
                  }}
                >
                  {/* Supplier */}
                  <TableCell>
                    <p className="font-medium">{supplier.name}</p>
                  </TableCell>

                  {/* Contact */}
                  <TableCell>
                    <div className="space-y-0.5">
                      {supplier.email ? (
                        <p className="text-sm">{supplier.email}</p>
                      ) : null}

                      {supplier.phone ? (
                        <p className="text-xs text-muted-foreground">
                          {supplier.phone}
                        </p>
                      ) : null}

                      {!supplier.email && !supplier.phone && (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </div>
                  </TableCell>

                  {/* Lead Time */}
                  <TableCell>
                    <span className="font-medium">
                      {supplier.lead_time_days}
                    </span>{" "}
                    <span className="text-xs text-muted-foreground">
                      {supplier.lead_time_days === 1 ? "day" : "days"}
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <StatusBadge status={supplier.status} />
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Actions for ${supplier.name}`}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {data.items.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No suppliers found.
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

      <SupplierDetailDrawer
        open={Boolean(selectedSupplierId)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedSupplierId(null);
          }
        }}
        supplierId={selectedSupplierId}
      />
    </>
  );
}
