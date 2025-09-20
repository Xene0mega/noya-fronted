import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { PrecommandTable } from "@/components/dashboard/PrecommandTable";
import { POSMap } from "@/components/dashboard/POSMap";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import logo from "@/assets/noya-logo.png";

export default function Index() {
  return (
    <AppLayout>
      {/* conteneur central : aucune largeur > écran en mobile */}
      <div className="mx-auto w-full max-w-[860px] sm:max-w-3xl md:max-w-5xl space-y-6 sm:space-y-8">
        {/* Header de page */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="NOYA" className="h-9 w-9 sm:h-12 sm:w-12" />
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-primary tracking-tight">
              Dashboard NOYA
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground">
              Vue d’ensemble de votre chaîne de distribution
            </p>
          </div>
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Sections — toutes s’empilent en mobile */}
        <div className="space-y-6 sm:space-y-8">
          <PrecommandTable />

          <SalesChart />

          <POSMap />

          <RecentActivity />
        </div>
      </div>
    </AppLayout>
  );
}
