"use client";

import { useMemo, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/src/components/ui/drawer";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import {
  CreatePurchasePlanRequest,
  PurchasePlanItemRequest,
} from "@/src/lib/api/purchase-plans";

import { useCreatePurchasePlan } from "@/src/hooks/purchase-plans";
import { useInfiniteMaterials } from "@/src/hooks/materials";
import { useInfiniteSuppliers } from "@/src/hooks/suppliers";
import { SearchableInfiniteSelect } from "../common/searchable-infinite-select";

interface CreatePurchasePlanDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePurchasePlanDrawer({
  open,
  onOpenChange,
}: CreatePurchasePlanDrawerProps) {
  const { mutateAsync, isPending, isError } = useCreatePurchasePlan();

  const [materialSearch, setMaterialSearch] = useState("");

  const [supplierSearch, setSupplierSearch] = useState("");

  const materialsQuery = useInfiniteMaterials(materialSearch);

  const suppliersQuery = useInfiniteSuppliers(supplierSearch);

  const [items, setItems] = useState<PurchasePlanItemRequest[]>([]);

  const materialOptions = useMemo(
    () =>
      materialsQuery.data?.pages.flatMap((page) =>
        page.items.map((material) => ({
          value: material.id,
          label: material.name,
          description: material.sku,
        })),
      ) ?? [],
    [materialsQuery.data],
  );

  const supplierOptions = useMemo(
    () =>
      suppliersQuery.data?.pages.flatMap((page) =>
        page.items.map((supplier) => ({
          value: supplier.id,
          label: supplier.name,
          description: supplier.email ?? undefined,
        })),
      ) ?? [],
    [suppliersQuery.data],
  );

  function addItem() {
    setItems((current) => [
      ...current,
      {
        material_id: "",
        supplier_id: "",
        quantity: "",
      },
    ]);
  }

  function removeItem(index: number) {
    setItems((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function updateItem(
    index: number,
    updates: Partial<PurchasePlanItemRequest>,
  ) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              ...updates,
            }
          : item,
      ),
    );
  }

  function resetForm() {
    setItems([]);
  }

  async function handleSubmit() {
    if (items.length === 0) {
      return;
    }

    const hasInvalidItems = items.some(
      (item) =>
        !item.material_id ||
        !item.supplier_id ||
        !item.quantity ||
        Number(item.quantity) <= 0,
    );

    if (hasInvalidItems) {
      return;
    }

    const payload: CreatePurchasePlanRequest = {
      items,
    };

    try {
      await mutateAsync(payload);

      resetForm();
      onOpenChange(false);
    } catch {
      // Mutation error is displayed below.
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="h-full max-h-none">
        <div className="mx-auto flex h-full w-full max-w-2xl flex-col">
          <DrawerHeader>
            <DrawerTitle>Create purchase plan</DrawerTitle>

            <DrawerDescription>
              Select the materials and suppliers you want to purchase from.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Purchase items</h3>

                  <p className="text-xs text-muted-foreground">
                    Add the materials that should be included in this purchase
                    plan.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addItem}
                >
                  <Plus className="size-4" />
                  Add item
                </Button>
              </div>

              {items.length === 0 && (
                <div className="rounded-lg border border-dashed px-4 py-10 text-center">
                  <p className="text-sm font-medium">No items added</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Add a material to start building the purchase plan.
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={addItem}
                  >
                    <Plus className="size-4" />
                    Add first item
                  </Button>
                </div>
              )}

              {items.map((item, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium">Item {index + 1}</p>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeItem(index)}
                      aria-label={`Remove item ${index + 1}`}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Material */}
                    <SearchableInfiniteSelect
                      value={item.material_id}
                      onValueChange={(value) =>
                        updateItem(index, {
                          material_id: value,
                        })
                      }
                      options={materialOptions}
                      search={materialSearch}
                      onSearch={setMaterialSearch}
                      onLoadMore={() => materialsQuery.fetchNextPage()}
                      hasMore={Boolean(materialsQuery.hasNextPage)}
                      isLoading={materialsQuery.isLoading}
                      isFetchingNextPage={materialsQuery.isFetchingNextPage}
                      placeholder="Select material"
                      searchPlaceholder="Search materials..."
                      emptyMessage="No materials found."
                    />

                    {/* Supplier */}
                    <SearchableInfiniteSelect
                      value={item.supplier_id}
                      onValueChange={(value) =>
                        updateItem(index, {
                          supplier_id: value,
                        })
                      }
                      options={supplierOptions}
                      search={supplierSearch}
                      onSearch={setSupplierSearch}
                      onLoadMore={() => suppliersQuery.fetchNextPage()}
                      hasMore={Boolean(suppliersQuery.hasNextPage)}
                      isLoading={suppliersQuery.isLoading}
                      isFetchingNextPage={suppliersQuery.isFetchingNextPage}
                      placeholder="Select supplier"
                      searchPlaceholder="Search suppliers..."
                      emptyMessage="No suppliers found."
                    />

                    {/* Quantity */}
                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${index}`}>
                        Quantity <span className="text-destructive">*</span>
                      </Label>

                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        min="0"
                        step="any"
                        placeholder="e.g. 100"
                        value={item.quantity}
                        onChange={(event) =>
                          updateItem(index, {
                            quantity: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              {isError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
                  Unable to create the purchase plan. Please verify the items
                  and try again.
                </div>
              )}
            </div>
          </div>

          <DrawerFooter>
            <Button
              type="button"
              disabled={isPending || items.length === 0}
              onClick={handleSubmit}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  Create purchase plan
                </>
              )}
            </Button>

            <DrawerClose>Cancel</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
