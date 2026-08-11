"use client";

import { MoreHorizontal } from "lucide-react";

import { useProducts } from "@/src/hooks/products";
import { GetProductsParams } from "@/src/lib/api/products";
import { AvailabilityStatus } from "@/src/types/aliases";

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
import { availabilityLabels } from "@/src/lib/constants";

function AvailabilityBadge({ status }: { status: AvailabilityStatus }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
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

interface ProductsTableProps {
  filters: GetProductsParams;
  onFiltersChange: (filters: GetProductsParams) => void;
}

export function ProductsTable({
  filters,
  onFiltersChange,
}: ProductsTableProps) {
  const { data, isPending, isError, error } = useProducts(filters);

  if (isPending) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
        <p className="text-sm font-medium text-destructive">
          Failed to load products
        </p>

        <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Minimum</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.items.map((product) => (
              <TableRow key={product.id}>
                {/* Product */}
                <TableCell>
                  <div>
                    <p className="font-medium">{product.name}</p>

                    {product.description && (
                      <p className="mt-0.5 max-w-sm truncate text-xs text-muted-foreground">
                        {product.description}
                      </p>
                    )}
                  </div>
                </TableCell>

                {/* SKU */}
                <TableCell className="font-mono text-xs">
                  {product.sku}
                </TableCell>

                {/* Stock */}
                <TableCell>
                  <span className="font-medium">{product.stock}</span>
                </TableCell>

                {/* Minimum */}
                <TableCell>
                  <span className="font-medium">{product.minimum_stock}</span>
                </TableCell>

                {/* Availability */}
                <TableCell>
                  <AvailabilityBadge status={product.availability_status} />
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Actions for ${product.name}`}
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
                  No products found.
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
  );
}
