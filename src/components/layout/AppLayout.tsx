import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { ping } from "@/lib/auth";
import UserMenu from "@/components/layout/UserMenu";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  useHeartbeat();

  return (
    <SidebarProvider>
      {/* coupe tout débordement horizontal */}
      <div className="min-h-screen flex w-full overflow-x-hidden">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header sticky */}
          <header
            className="
              sticky top-0 z-50
              h-16 flex items-center justify-between
              px-3 sm:px-6 border-b border-border
              bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60
            "
          >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
  <SidebarTrigger />

  {/* 3 variantes du titre selon la largeur */}
  <h1 className="hidden md:block font-semibold leading-tight tracking-tight text-[clamp(1rem,1.6vw,1.125rem)] text-foreground truncate max-w-[48vw]">
    Système de Distribution NOYA
  </h1>
  <h1 className="hidden sm:block md:hidden font-semibold leading-tight tracking-tight text-base text-foreground">
    Système NOYA
  </h1>
  <h1 className="sm:hidden font-semibold leading-tight tracking-tight text-sm text-foreground">
    NOYA
  </h1>
</div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-destructive rounded-full" />
              </Button>
              <UserMenu />
            </div>
          </header>

          {/* Main centré */}
          <main className="flex-1 bg-background">
            <div className="mx-auto w-full max-w-screen-xl px-3 sm:px-6 md:px-8 py-4 sm:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export function useHeartbeat() {
  useEffect(() => {
    const id = setInterval(() => {
      ping().catch(() => {});
    }, 120000);
    return () => clearInterval(id);
  }, []);
}
