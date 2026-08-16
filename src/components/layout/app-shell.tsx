"use client";

import { AICopilot } from "../ai/ai-copilot";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <AppHeader />

      <div className="flex min-h-0 flex-1">
        <AppSidebar />

        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>

        <AICopilot />
      </div>
    </div>
  );
}
