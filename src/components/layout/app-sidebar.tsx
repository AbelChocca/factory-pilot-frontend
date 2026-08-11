import Link from "next/link";
import {
  Armchair,
  Factory,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { AIConversationSettings } from "../settings/ai-conversation-settings";

const navigation = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        name: "Products",
        href: "/products",
        icon: Armchair,
      },
      {
        name: "Materials",
        href: "/materials",
        icon: Package,
      },
      {
        name: "Production",
        href: "/production",
        icon: Factory,
      },
    ],
  },
  {
    label: "Supply Chain",
    items: [
      {
        name: "Suppliers",
        href: "/suppliers",
        icon: Truck,
      },
      {
        name: "Purchase Plans",
        href: "/purchase-plans",
        icon: ShoppingCart,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <aside className="flex w-60 flex-col border-r bg-background">
      <nav className="flex-1 space-y-6 p-3">
        {navigation.map((section) => (
          <div key={section.label}>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {section.label}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="size-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t p-4">
        <AIConversationSettings />
      </div>

      <div className="border-t p-4">
        <p className="text-xs font-medium text-muted-foreground">Powered by</p>

        <p className="mt-1 text-sm font-semibold">FactoryPilot AI</p>
      </div>
    </aside>
  );
}
