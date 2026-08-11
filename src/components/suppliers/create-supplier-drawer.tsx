"use client";

import { useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

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

import { CreateSupplierRequest } from "@/src/lib/api/suppliers";
import { useCreateSupplier } from "@/src/hooks/suppliers";

interface CreateSupplierDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CreateSupplierFormValues = {
  name: string;
  email: string;
  phone: string;
  lead_time_days: string;
};

export function CreateSupplierDrawer({
  open,
  onOpenChange,
}: CreateSupplierDrawerProps) {
  const { mutateAsync, isPending, isError } = useCreateSupplier();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<CreateSupplierFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      lead_time_days: "",
    },
  });

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

  const onSubmit = async (values: CreateSupplierFormValues) => {
    const payload: CreateSupplierRequest = {
      name: values.name.trim(),
      email: values.email.trim() || undefined,
      phone: values.phone.trim() || undefined,
      lead_time_days: Number(values.lead_time_days),
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
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col"
        >
          <DrawerHeader>
            <DrawerTitle>Create supplier</DrawerTitle>

            <DrawerDescription>
              Add a supplier and define their expected lead time.
            </DrawerDescription>
          </DrawerHeader>

          <div className="mx-auto w-full max-w-2xl flex-1 space-y-5 overflow-y-auto px-4 pb-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="supplier-name">
                Name <span className="text-destructive">*</span>
              </Label>

              <Input
                id="supplier-name"
                placeholder="e.g. Maderera Andina"
                {...register("name", {
                  required: "Supplier name is required.",
                  maxLength: {
                    value: 150,
                    message: "Supplier name cannot exceed 150 characters.",
                  },
                })}
              />

              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="supplier-email">Email</Label>

              <Input
                id="supplier-email"
                type="email"
                placeholder="supplier@example.com"
                {...register("email", {
                  maxLength: {
                    value: 255,
                    message: "Email cannot exceed 255 characters.",
                  },
                })}
              />

              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="supplier-phone">Phone</Label>

              <Input
                id="supplier-phone"
                type="tel"
                placeholder="+51 999 999 999"
                {...register("phone", {
                  maxLength: {
                    value: 30,
                    message: "Phone cannot exceed 30 characters.",
                  },
                })}
              />

              {errors.phone && (
                <p className="text-xs text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Lead time */}
            <div className="space-y-2">
              <Label htmlFor="supplier-lead-time">
                Lead time <span className="text-destructive">*</span>
              </Label>

              <div className="relative">
                <Input
                  id="supplier-lead-time"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="5"
                  className="pr-16"
                  {...register("lead_time_days", {
                    required: "Lead time is required.",
                    min: {
                      value: 0,
                      message: "Lead time cannot be negative.",
                    },
                    validate: (value) =>
                      Number.isInteger(Number(value)) ||
                      "Lead time must be a whole number.",
                  })}
                />

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  days
                </span>
              </div>

              {errors.lead_time_days && (
                <p className="text-xs text-destructive">
                  {errors.lead_time_days.message}
                </p>
              )}

              <p className="text-xs text-muted-foreground">
                Expected number of days from order to delivery.
              </p>
            </div>

            {/* Error */}
            {isError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
                Unable to create the supplier. Please try again.
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
                  Create supplier
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
