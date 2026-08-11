"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "../ui/button";
import { CreateMaterialDrawer } from "./create-material-drawer";

export function MaterialsPageHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Materials</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage materials, inventory levels and availability.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="size-4" />
          Add Material
        </Button>
      </div>

      <CreateMaterialDrawer
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </>
  );
}
