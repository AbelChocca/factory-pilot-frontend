"use client";

import { useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

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
import { Textarea } from "@/src/components/ui/textarea";

import type { CreateProductRequest } from "@/src/lib/api/products";
import { useCreateProduct } from "@/src/hooks/products";

interface CreateProductDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CreateProductFormValues = {
  name: string;
  description: string;
  initial_stock: string;
  initial_minimum_stock: string;
};

export function CreateProductDrawer({
  open,
  onOpenChange,
}: CreateProductDrawerProps) {
  const { mutateAsync, isPending, isError } = useCreateProduct();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    defaultValues: {
      name: "",
      description: "",
      initial_stock: "",
      initial_minimum_stock: "",
    },
  });

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

  const onSubmit = async (values: CreateProductFormValues) => {
    const payload: CreateProductRequest = {
      name: values.name.trim(),
      description: values.description.trim() || undefined,
      initial_stock: values.initial_stock,
      initial_minimum_stock: values.initial_minimum_stock,
    };

    try {
      await mutateAsync(payload);

      resetForm();
      onOpenChange(false);
    } catch {
      // Mutation error is displayed below.
    }
  };

  return (
    <Drawer swipeDirection="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerHeader>
            <DrawerTitle>Create product</DrawerTitle>

            <DrawerDescription>
              Add a new product and define its initial inventory levels.
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
                placeholder="e.g. Executive Office Desk"
                {...register("name", {
                  required: "Product name is required.",
                  maxLength: {
                    value: 150,
                    message: "Product name must not exceed 150 characters.",
                  },
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
                placeholder="Describe this product..."
                className="min-h-20 resize-none"
                {...register("description")}
              />
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
                {/* Initial stock */}
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
                      validate: (value) =>
                        Number(value) >= 0 || "Stock cannot be negative.",
                    })}
                  />

                  {errors.initial_stock && (
                    <p className="text-xs text-destructive">
                      {errors.initial_stock.message}
                    </p>
                  )}
                </div>

                {/* Minimum stock */}
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
                      validate: (value) =>
                        Number(value) >= 0 ||
                        "Minimum stock cannot be negative.",
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
                Unable to create the product. Please try again.
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
                  Create product
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
