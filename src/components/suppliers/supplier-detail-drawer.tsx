"use client";

import { Building2, Package } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/src/components/ui/drawer";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { useSupplier } from "@/src/hooks/suppliers";

import { Status } from "@/src/types/aliases";
import { useSupplierMaterials } from "@/src/hooks/supplier-materials";
import { materialTypeLabels } from "../materials/materials-constants";
import { unitLabels } from "@/src/lib/constants";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface SupplierDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplierId: string | null;
}

const statusLabels: Record<Status, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant={status === "ACTIVE" ? "default" : "secondary"}>
      {statusLabels[status]}
    </Badge>
  );
}

export function SupplierDetailDrawer({
  open,
  onOpenChange,
  supplierId,
}: SupplierDetailDrawerProps) {
  const supplierQuery = useSupplier(supplierId ?? "");

  const materialsQuery = useSupplierMaterials(supplierId ?? "");

  const supplier = supplierQuery.data;
  const materials = materialsQuery.data ?? [];

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent
        className="
          !mx-auto
          !w-[95vw]
          !max-w-[1100px]
          min-h-full
        "
      >
        <div className="overflow-y-auto">
          <DrawerHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <DrawerTitle>{supplier?.name ?? "Supplier"}</DrawerTitle>

                <DrawerDescription>
                  Supplier information and supplied materials.
                </DrawerDescription>
              </div>

              {supplier && <StatusBadge status={supplier.status} />}
            </div>
          </DrawerHeader>

          <div className="space-y-6 px-6 pb-6">
            {/* Loading supplier */}
            {supplierQuery.isPending && (
              <div className="rounded-lg border p-6">
                <p className="text-sm text-muted-foreground">
                  Loading supplier details...
                </p>
              </div>
            )}

            {/* Supplier error */}
            {supplierQuery.isError && (
              <div className="rounded-lg border border-destructive/30 p-6">
                <p className="text-sm font-medium">Failed to load supplier</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {supplierQuery.error.message}
                </p>
              </div>
            )}

            {supplier && (
              <>
                {/* Supplier information */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4 text-muted-foreground" />

                    <h3 className="text-sm font-semibold">
                      Supplier information
                    </h3>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <InfoCard label="Supplier" value={supplier.name} />

                    <InfoCard
                      label="Lead time"
                      value={`${supplier.lead_time_days} ${
                        supplier.lead_time_days === 1 ? "day" : "days"
                      }`}
                    />

                    <InfoCard label="Email" value={supplier.email ?? "—"} />

                    <InfoCard label="Phone" value={supplier.phone ?? "—"} />
                  </div>
                </section>

                <Separator />

                {/* Materials */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="size-4 text-muted-foreground" />

                      <div>
                        <h3 className="text-sm font-semibold">
                          Supplied materials
                        </h3>

                        <p className="text-xs text-muted-foreground">
                          Materials available from this supplier.
                        </p>
                      </div>
                    </div>

                    {!materialsQuery.isPending && (
                      <span className="text-sm text-muted-foreground">
                        {materials.length}{" "}
                        {materials.length === 1 ? "material" : "materials"}
                      </span>
                    )}
                  </div>

                  {materialsQuery.isPending && (
                    <div className="rounded-lg border p-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        Loading materials...
                      </p>
                    </div>
                  )}

                  {materialsQuery.isError && (
                    <div className="rounded-lg border border-destructive/30 p-6">
                      <p className="text-sm font-medium">
                        Failed to load supplier materials
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {materialsQuery.error.message}
                      </p>
                    </div>
                  )}

                  {!materialsQuery.isPending && !materialsQuery.isError && (
                    <div className="overflow-hidden rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Material</TableHead>

                            <TableHead>Type</TableHead>

                            <TableHead>Unit</TableHead>

                            <TableHead>Supplier SKU</TableHead>

                            <TableHead>Unit Price</TableHead>

                            <TableHead>Preferred</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {materials.map((material) => (
                            <TableRow key={material.material_id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">
                                    {material.material_name}
                                  </p>

                                  <p className="text-xs text-muted-foreground">
                                    {material.material_sku}
                                  </p>
                                </div>
                              </TableCell>

                              <TableCell>
                                {materialTypeLabels[material.material_type]}
                              </TableCell>

                              <TableCell>
                                {unitLabels[material.unit_type]}
                              </TableCell>

                              <TableCell>
                                {material.supplier_sku ?? "—"}
                              </TableCell>

                              <TableCell>
                                {material.unit_price
                                  ? material.unit_price
                                  : "—"}
                              </TableCell>

                              <TableCell>
                                {material.preferred ? (
                                  <Badge>Preferred</Badge>
                                ) : (
                                  <span className="text-sm text-muted-foreground">
                                    —
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}

                          {materials.length === 0 && (
                            <TableRow>
                              <TableCell
                                colSpan={6}
                                className="h-28 text-center text-sm text-muted-foreground"
                              >
                                This supplier has no materials assigned.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface InfoCardProps {
  label: string;
  value: string;
}

function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="rounded-lg border bg-muted/20 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 truncate text-sm font-medium">{value}</p>
    </div>
  );
}
