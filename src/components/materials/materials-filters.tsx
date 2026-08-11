"use client";

import { GetMaterialsParams } from "@/src/lib/api/materials";
import { AvailabilityStatus, UnitType } from "@/src/types/aliases";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  availabilityLabels,
  availabilityStatuses,
  unitLabels,
  unitTypes,
} from "@/src/lib/constants";

interface MaterialsFiltersProps {
  filters: GetMaterialsParams;
  onFiltersChange: (filters: GetMaterialsParams) => void;
}

export function MaterialsFilters({
  filters,
  onFiltersChange,
}: MaterialsFiltersProps) {
  const [search, setSearch] = useState(filters.query ?? "");

  function updateFilters(updates: Partial<GetMaterialsParams>) {
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
    Boolean(filters.query) ||
    Boolean(filters.unit_type) ||
    Boolean(filters.availability_status);

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="min-w-[240px] flex-1">
        <label
          htmlFor="material-search"
          className="mb-1.5 block text-xs font-medium text-muted-foreground"
        >
          Search
        </label>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="material-search"
            value={search}
            placeholder="Search materials..."
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

      <div className="w-[160px]">
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Unit Type
        </label>

        <Select
          value={filters.unit_type ?? "all"}
          onValueChange={(value) =>
            updateFilters({
              unit_type: value === "all" ? undefined : (value as UnitType),
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All units" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All units</SelectItem>

            {unitTypes.map((unit) => (
              <SelectItem key={unit} value={unit}>
                {unitLabels[unit]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
