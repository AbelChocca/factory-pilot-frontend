import Image from "next/image";
import { Bell, Search } from "lucide-react";

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      {/* Brand */}
      <div className="flex items-center">
        <Image
          src="/assets/northwood_logo.png"
          alt="NorthWood Manufacturing"
          width={160}
          height={40}
          priority
          className="h-9 w-auto object-contain"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Search"
        >
          <Search className="size-4" />
        </button>

        <button
          type="button"
          className="relative flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-4" />

          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
        </button>

        <div
          className="ml-2 flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium"
          aria-label="User profile"
        >
          FP
        </div>
      </div>
    </header>
  );
}
