"use client";

import { useEffect } from "react";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/src/components/ui/drawer";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";

import type { MaterialType, UnitType } from "@/src/types/aliases";

import { CreateMaterialRequest } from "@/src/lib/api/materials";
import { useForm, useWatch } from "react-hook-form";
import { useCreateMaterial } from "@/src/hooks/materials";
import { materialTypeLabels, materialTypes } from "./materials-constants";
import { unitLabels, unitTypes } from "@/src/lib/constants";

interface CreateMaterialDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CreateMaterialFormValues = {
  name: string;
  description: string;
  material_type: MaterialType | "";
  unit_type: UnitType | "";
  initial_stock: string;
  initial_minimum_stock: string;
};

export function CreateMaterialDrawer({
  open,
  onOpenChange,
}: CreateMaterialDrawerProps) {
  const { mutateAsync, isPending, isError } = useCreateMaterial();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset: resetForm,
    formState: { errors },
  } = useForm<CreateMaterialFormValues>({
    defaultValues: {
      name: "",
      description: "",
      material_type: "",
      unit_type: "",
      initial_stock: "",
      initial_minimum_stock: "",
    },
  });

  const materialType = useWatch({
    control,
    name: "material_type",
  });

  const unitType = useWatch({
    control,
    name: "unit_type",
  });

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

  const onSubmit = async (values: CreateMaterialFormValues) => {
    if (!values.material_type || !values.unit_type) {
      return;
    }

    const payload: CreateMaterialRequest = {
      name: values.name.trim(),
      description: values.description.trim() || undefined,
      material_type: values.material_type,
      unit_type: values.unit_type,
      initial_stock: values.initial_stock,
      initial_minimum_stock: values.initial_minimum_stock,
    };

    try {
      await mutateAsync(payload);

      resetForm();
      onOpenChange(false);
    } catch {
      // The mutation error is displayed below.
    }
  };

  return (
    <Drawer swipeDirection="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerHeader>
            <DrawerTitle>Create material</DrawerTitle>

            <DrawerDescription>
              Add a new material and define its initial inventory levels.
            </DrawerDescription>
          </DrawerHeader>

          <div className="mx-auto w-full max-w-2xl space-y-5 overflow-y-auto px-4 pb-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>

              <Input
                id="name"
                placeholder="e.g. Premium Solid Oak Wood"
                {...register("name", {
                  required: "Material name is required.",
                })}
              />

              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                placeholder="Describe this material..."
                className="min-h-20 resize-none"
                {...register("description")}
              />
            </div>

            {/* Type + Unit */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>
                  Material type <span className="text-destructive">*</span>
                </Label>

                <Select
                  value={materialType}
                  onValueChange={(value) =>
                    setValue("material_type", value as MaterialType, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select material type" />
                  </SelectTrigger>

                  <SelectContent>
                    {materialTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {materialTypeLabels[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {!materialType && (
                  <p className="text-xs text-muted-foreground">
                    Choose how this material is classified.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  Unit type <span className="text-destructive">*</span>
                </Label>

                <Select
                  value={unitType}
                  onValueChange={(value) =>
                    setValue("unit_type", value as UnitType, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit type" />
                  </SelectTrigger>

                  <SelectContent>
                    {unitTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {unitLabels[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {!unitType && (
                  <p className="text-xs text-muted-foreground">
                    Determines how stock quantities are measured.
                  </p>
                )}
              </div>
            </div>

            {/* Initial inventory */}
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium">Initial inventory</h3>

                <p className="text-xs text-muted-foreground">
                  Set the starting stock and minimum stock level.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="initial_stock">
                    Initial stock <span className="text-destructive">*</span>
                  </Label>

                  <Input
                    id="initial_stock"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="0"
                    {...register("initial_stock", {
                      required: "Initial stock is required.",
                    })}
                  />

                  {errors.initial_stock && (
                    <p className="text-xs text-destructive">
                      {errors.initial_stock.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initial_minimum_stock">
                    Minimum stock <span className="text-destructive">*</span>
                  </Label>

                  <Input
                    id="initial_minimum_stock"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="0"
                    {...register("initial_minimum_stock", {
                      required: "Minimum stock is required.",
                    })}
                  />

                  {errors.initial_minimum_stock && (
                    <p className="text-xs text-destructive">
                      {errors.initial_minimum_stock.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {isError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
                Unable to create the material. Please try again.
              </div>
            )}
          </div>

          <DrawerFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  Create material
                </>
              )}
            </Button>

            <DrawerClose>Cancel</DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
