import { AppShell } from "@/components/AppShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="portfolio" className="font-body min-h-screen">
      <AppShell>{children}</AppShell>
    </div>
  );
}
