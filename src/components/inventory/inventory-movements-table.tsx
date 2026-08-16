"use client";

import { ArrowRight, CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";

import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { DataPagination } from "../common/data-pagination";
import { GetInventoryMovementsParams } from "@/src/lib/api/inventory-movements-api";
import {
  InventoryMovementType,
  InventoryOwnerType,
} from "@/src/types/inventry-types";
import { useInventoryMovements } from "@/src/hooks/inventory";
import { Button } from "../ui/button";

interface InventoryMovementsTableProps {
  filters: GetInventoryMovementsParams;
  onFiltersChange: (filters: GetInventoryMovementsParams) => void;
  ownerType?: InventoryOwnerType;
  ownerId?: string;
}

function MovementBadge({ type }: { type: InventoryMovementType }) {
  const config: Record<
    InventoryMovementType,
    {
      label: string;
      className: string;
    }
  > = {
    IN: {
      label: "Stock In",
      className: "bg-emerald-50 text-emerald-700",
    },
    OUT: {
      label: "Stock Out",
      className: "bg-red-50 text-red-700",
    },
    ADJUSTMENT: {
      label: "Adjustment",
      className: "bg-amber-50 text-amber-700",
    },
  };

  const { label, className } = config[type];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${className}`}
    >
      <span
        className={`size-1.5 rounded-full ${
          type === "IN"
            ? "bg-emerald-500"
            : type === "OUT"
              ? "bg-red-500"
              : "bg-amber-500"
        }`}
      />

      {label}
    </span>
  );
}

export function InventoryMovementsTable({
  filters,
  onFiltersChange,
  ownerType,
  ownerId,
}: InventoryMovementsTableProps) {
  const queryFilters: GetInventoryMovementsParams = {
    ...filters,
    ...(ownerType
      ? {
          owner_type: ownerType,
        }
      : {}),
    ...(ownerId
      ? {
          owner_id: ownerId,
        }
      : {}),
  };

  const { data, isPending, isError, error } =
    useInventoryMovements(queryFilters);

  const handleFilterChange = (
    changes: Partial<GetInventoryMovementsParams>,
  ) => {
    onFiltersChange({
      ...filters,
      ...changes,
      page: 1,
    });
  };

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Loading inventory movements...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center">
        <p className="text-sm font-medium">
          Failed to load inventory movements
        </p>

        <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-end gap-3">
        {/* Search */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Search
          </label>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search movements..."
              value={filters.query ?? ""}
              onChange={(event) =>
                handleFilterChange({
                  query: event.target.value || undefined,
                })
              }
              className="pl-9"
            />
          </div>
        </div>

        {/* Movement Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Movement Type
          </label>

          <Select
            value={filters.movement_type ?? "ALL"}
            onValueChange={(value) =>
              handleFilterChange({
                movement_type:
                  value === "ALL"
                    ? undefined
                    : (value as InventoryMovementType),
              })
            }
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Movement type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All movements</SelectItem>

              <SelectItem value="IN">Stock In</SelectItem>

              <SelectItem value="OUT">Stock Out</SelectItem>

              <SelectItem value="ADJUSTMENT">Adjustment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Date Range
          </label>

          <Popover>
            <PopoverTrigger
              className="w-65 justify-start text-left font-normal"
              render={<Button variant="outline" />}
            >
              <CalendarIcon className="mr-2 size-4" />

              {filters.created_from || filters.created_to ? (
                <>
                  {filters.created_from
                    ? format(new Date(filters.created_from), "dd/MM/yyyy")
                    : "Start"}{" "}
                  -{" "}
                  {filters.created_to
                    ? format(new Date(filters.created_to), "dd/MM/yyyy")
                    : "End"}
                </>
              ) : (
                <span className="text-muted-foreground">Select date range</span>
              )}
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{
                  from: filters.created_from
                    ? new Date(filters.created_from)
                    : undefined,
                  to: filters.created_to
                    ? new Date(filters.created_to)
                    : undefined,
                }}
                onSelect={(range) => {
                  handleFilterChange({
                    created_from: range?.from
                      ? range.from.toISOString()
                      : undefined,
                    created_to: range?.to ? range.to.toISOString() : undefined,
                  });
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.items.map((movement) => (
              <TableRow key={movement.id}>
                <TableCell>
                  <MovementBadge type={movement.movement_type} />
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">{movement.owner_name}</p>

                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                      {movement.owner_code}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span className="font-medium">
                        {movement.previous_quantity}
                      </span>

                      <ArrowRight className="size-3.5 text-muted-foreground" />

                      <span className="font-medium">
                        {movement.new_quantity}
                      </span>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {movement.quantity} {movement.unit_type}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="max-w-xs">
                  {movement.reason ? (
                    <span
                      className="block truncate text-sm"
                      title={movement.reason}
                    >
                      {movement.reason}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </TableCell>

                <TableCell className="w-44 whitespace-nowrap text-sm text-muted-foreground">
                  {new Date(movement.created_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}

            {data.items.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No inventory movements found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
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
