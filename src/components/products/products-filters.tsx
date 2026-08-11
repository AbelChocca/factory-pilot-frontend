"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { GetProductsParams } from "@/src/lib/api/products";
import { AvailabilityStatus } from "@/src/types/aliases";
import { availabilityLabels, availabilityStatuses } from "@/src/lib/constants";

interface ProductsFiltersProps {
  filters: GetProductsParams;
  onFiltersChange: (filters: GetProductsParams) => void;
}

export function ProductsFilters({
  filters,
  onFiltersChange,
}: ProductsFiltersProps) {
  const [search, setSearch] = useState(filters.query ?? "");

  function updateFilters(updates: Partial<GetProductsParams>) {
    onFiltersChange({
      ...filters,
      ...updates,
      page: 1,
    });
  }

  function handleSearchSubmit() {
    updateFilters({
      query: search.trim() || undefined,
    });
  }

  function clearFilters() {
    setSearch("");

    onFiltersChange({
      page: 1,
      limit: filters.limit,
    });
  }

  const hasFilters =
    Boolean(filters.query) || Boolean(filters.availability_status);

  return (
    <div className="flex flex-wrap items-end gap-3">
      {/* Search */}
      <div className="min-w-[240px] flex-1">
        <label
          htmlFor="product-search"
          className="mb-1.5 block text-xs font-medium text-muted-foreground"
        >
          Search
        </label>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="product-search"
            value={search}
            placeholder="Search products..."
            className="pl-9"
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />
        </div>
      </div>

      {/* Availability */}
      <div className="w-[170px]">
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Availability
        </label>

        <Select
          value={filters.availability_status ?? "all"}
          onValueChange={(value) =>
            updateFilters({
              availability_status:
                value === "all" ? undefined : (value as AvailabilityStatus),
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>

            {availabilityStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {availabilityLabels[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="mb-0.5"
          onClick={clearFilters}
        >
          <X className="size-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
