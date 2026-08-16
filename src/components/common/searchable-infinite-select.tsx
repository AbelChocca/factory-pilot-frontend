"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import { cn } from "@/src/lib/utils";

export interface SearchableInfiniteSelectOption {
  value: string;
  label: string;
  description?: string;
}

interface SearchableInfiniteSelectProps {
  value?: string;
  onValueChange: (value: string) => void;

  options: SearchableInfiniteSelectOption[];

  search: string;
  onSearch: (search: string) => void;

  onLoadMore: () => void;
  hasMore: boolean;

  isLoading?: boolean;
  isFetchingNextPage?: boolean;

  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;

  disabled?: boolean;
  className?: string;
}

export function SearchableInfiniteSelect({
  value,
  onValueChange,
  options,
  search,
  onSearch,
  onLoadMore,
  hasMore,
  isLoading = false,
  isFetchingNextPage = false,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  className,
}: SearchableInfiniteSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const listRef = useRef<HTMLDivElement>(null);

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const element = event.currentTarget;

    const isNearBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight < 80;

    if (isNearBottom && hasMore && !isFetchingNextPage && !isLoading) {
      onLoadMore();
    }
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    const element = listRef.current;

    if (!element) {
      return;
    }

    const isNotScrollable = element.scrollHeight <= element.clientHeight;

    if (isNotScrollable && hasMore && !isFetchingNextPage && !isLoading) {
      onLoadMore();
    }
  }, [
    open,
    options.length,
    hasMore,
    isFetchingNextPage,
    isLoading,
    onLoadMore,
  ]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        role="combobox"
        aria-expanded={open}
        disabled={disabled}
        className={cn(
          "inline-flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm font-normal shadow-xs outline-none",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          !selectedOption && "text-muted-foreground",
          className,
        )}
      >
        <span className="truncate">{selectedOption?.label ?? placeholder}</span>

        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
      </PopoverTrigger>

      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={onSearch}
          />

          <CommandList
            ref={listRef}
            onScroll={handleScroll}
            className="max-h-60 overflow-y-auto"
          >
            {!isLoading && options.length === 0 && (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            )}

            {isLoading && options.length === 0 && (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Loading...
              </div>
            )}

            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  onValueChange(option.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 size-4",
                    value === option.value ? "opacity-100" : "opacity-0",
                  )}
                />

                <div className="min-w-0">
                  <p className="truncate">{option.label}</p>

                  {option.description && (
                    <p className="truncate text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  )}
                </div>
              </CommandItem>
            ))}

            {isFetchingNextPage && (
              <div className="flex items-center justify-center gap-2 py-3 text-xs text-muted-foreground">
                <Loader2 className="size-3.5 animate-spin" />
                Loading more...
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
