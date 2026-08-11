"use client";

import { useMaterials } from "@/src/hooks/materials";
import { AvailabilityStatus } from "@/src/types/aliases";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { GetMaterialsParams } from "@/src/lib/api/materials";
import { DataPagination } from "../common/data-pagination";

const availabilityLabels: Record<AvailabilityStatus, string> = {
  AVAILABLE: "Available",
  LOW_STOCK: "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
};

function AvailabilityBadge({ status }: { status: AvailabilityStatus }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium">
      <span
        className={`size-1.5 rounded-full ${
          status === "AVAILABLE"
            ? "bg-emerald-500"
            : status === "LOW_STOCK"
              ? "bg-amber-500"
              : "bg-red-500"
        }`}
      />

      {availabilityLabels[status]}
    </span>
  );
}

interface MaterialsTableProps {
  filters: GetMaterialsParams;
  onFiltersChange: (filters: GetMaterialsParams) => void;
}

export function MaterialsTable({
  filters,
  onFiltersChange,
}: MaterialsTableProps) {
  const { data, isPending, isError, error } = useMaterials(filters);

  if (isPending) {
    return (
      <div className="rounded-lg border">
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          Loading materials...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border p-6">
        <p className="text-sm font-medium">Failed to load materials</p>

        <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Material</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Minimum</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.items.map((material) => (
            <TableRow key={material.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{material.name}</p>

                  {material.description && (
                    <p className="mt-0.5 max-w-sm truncate text-xs text-muted-foreground">
                      {material.description}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell className="font-mono text-xs">
                {material.sku}
              </TableCell>

              <TableCell>
                <span className="font-medium">{material.stock}</span>{" "}
                <span className="text-xs text-muted-foreground">
                  {material.unit}
                </span>
              </TableCell>

              <TableCell>
                <span className="font-medium">{material.minimum_stock}</span>{" "}
                <span className="text-xs text-muted-foreground">
                  {material.unit}
                </span>
              </TableCell>

              <TableCell>
                <AvailabilityBadge status={material.availability_status} />
              </TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Actions for ${material.name}`}
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {data.items.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-sm text-muted-foreground"
              >
                No materials found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
  );
}
