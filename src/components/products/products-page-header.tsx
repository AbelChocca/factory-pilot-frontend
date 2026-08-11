"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { CreateProductDrawer } from "./create-product-drawer";

export function ProductsPageHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage products, inventory levels and availability.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>

      <CreateProductDrawer open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </>
  );
}
