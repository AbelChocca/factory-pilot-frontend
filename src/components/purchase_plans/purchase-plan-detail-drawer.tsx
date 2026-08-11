"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/src/components/ui/drawer";

import { Loader2 } from "lucide-react";
import { usePurchasePlanDetails } from "@/src/hooks/purchase-plans";

interface PurchasePlanDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchasePlanId: string | null;
}

export function PurchasePlanDetailDrawer({
  open,
  onOpenChange,
  purchasePlanId,
}: PurchasePlanDetailDrawerProps) {
  const { plan, items, isPending, isError, error } =
    usePurchasePlanDetails(purchasePlanId);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="w-full max-w-4xl min-h-full">
        <div className="mx-auto w-full max-w-6xl overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Purchase Plan</DrawerTitle>

            <DrawerDescription>
              View purchase plan details and items.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-6 px-6 pb-8">
            {isPending && (
              <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
                <Loader2 className="mr-2 size-4 animate-spin" />
                Loading purchase plan...
              </div>
            )}

            {isError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                Failed to load purchase plan.
                <p className="mt-1 text-xs">{error?.message}</p>
              </div>
            )}

            {plan && !isPending && (
              <>
                {/* Plan information */}
                <div className="rounded-xl border bg-card">
                  <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Plan ID
                      </p>

                      <p className="mt-1 truncate font-mono text-xs">
                        {plan.id}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Status
                      </p>

                      <p className="mt-1 text-sm font-medium">{plan.status}</p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Total amount
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {plan.total_estimated_cost}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Created at
                      </p>

                      <p className="mt-1 text-sm">
                        {new Date(plan.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold">Purchase Items</h3>

                    <p className="text-xs text-muted-foreground">
                      Materials and suppliers included in this plan.
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-xl border">
                    <div className="divide-y">
                      {items.map((item) => (
                        <div
                          key={`${item.material_id}-${item.supplier_id}`}
                          className="grid gap-4 p-4 sm:grid-cols-[1fr_1fr_auto_auto]"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {item.material_name}
                            </p>

                            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                              {item.material_id}
                            </p>
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm">
                              {item.supplier_name}
                            </p>

                            <p className="mt-0.5 text-xs text-muted-foreground">
                              Supplier
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">
                              {item.quantity}{" "}
                              <span className="text-xs font-normal text-muted-foreground">
                                {item.unit_type}
                              </span>
                            </p>

                            <p className="mt-0.5 text-xs text-muted-foreground">
                              Quantity
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              {item.estimated_cost}
                            </p>

                            <p className="mt-0.5 text-xs text-muted-foreground">
                              Estimated cost
                            </p>
                          </div>
                        </div>
                      ))}

                      {items.length === 0 && (
                        <div className="py-12 text-center text-sm text-muted-foreground">
                          This purchase plan has no items.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
