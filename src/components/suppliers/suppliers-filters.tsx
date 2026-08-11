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

import { GetSuppliersParams } from "@/src/lib/api/suppliers";

import { Status } from "@/src/types/aliases";

const statusLabels: Record<Status, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

const statuses: Status[] = ["ACTIVE", "INACTIVE"];

interface SuppliersFiltersProps {
  filters: GetSuppliersParams;
  onFiltersChange: (filters: GetSuppliersParams) => void;
}

export function SuppliersFilters({
  filters,
  onFiltersChange,
}: SuppliersFiltersProps) {
  const [search, setSearch] = useState(filters.query ?? "");

  function updateFilters(updates: Partial<GetSuppliersParams>) {
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

  const hasFilters = Boolean(filters.query) || Boolean(filters.status);

  return (
    <div className="flex flex-wrap items-end gap-3">
      {/* Search */}
      <div className="min-w-[240px] flex-1">
        <label
          htmlFor="supplier-search"
          className="mb-1.5 block text-xs font-medium text-muted-foreground"
        >
          Search
        </label>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="supplier-search"
            value={search}
            placeholder="Search suppliers..."
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

      {/* Status */}
      <div className="w-[160px]">
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Status
        </label>

        <Select
          value={filters.status ?? "all"}
          onValueChange={(value) =>
            updateFilters({
              status: value === "all" ? undefined : (value as Status),
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>

            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {statusLabels[status]}
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
