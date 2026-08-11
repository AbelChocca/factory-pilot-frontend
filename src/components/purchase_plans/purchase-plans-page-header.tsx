"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { CreatePurchasePlanDrawer } from "./create-purchase-plan-drawer";

export function PurchasePlansPageHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Purchase Plans
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Plan and manage material purchases from suppliers.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="size-4" />
          Create Purchase Plan
        </Button>
      </div>

      <CreatePurchasePlanDrawer
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </>
  );
}
