import { AppShell } from "@/src/components/layout/app-shell";
import { CinematicProvider } from "@/src/providers/cinematic-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <CinematicProvider>{children}</CinematicProvider>
    </AppShell>
  );
}
