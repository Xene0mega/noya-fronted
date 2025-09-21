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
      {/* Règles ciblées: paysage <= 920px (6") + boost du titre */}
      <style>{`
        @media (orientation: landscape) and (max-width: 920px) {
          /* le conteneur principal ne dépasse jamais l'écran */
          .ls-max { max-width: 93vw !important; }

          /* padding global plus compact */
          .ls-wrap { padding-left: 8px !important; padding-right: 8px !important; }

          /* header compact */
          .ls-header { gap: 8px !important; }

          /* titre plus grand */
          .ls-title {
            font-size: clamp(20px, 5vw, 24px) !important;
            line-height: 1.25 !important;
          }

          /* sous-titre plus lisible */
          .ls-subtitle {
            font-size: clamp(14px, 2vw, 16px) !important;
          }

          /* pile des sections plus compacte */
          .ls-stack { row-gap: 12px !important; }

          /* sections */
          .ls-section {
            max-width: 100vw !important;
            width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          .ls-section * {
            max-width: 100% !important;
          }

          /* logo réduit */
          .ls-logo { height: 32px !important; width: 32px !important; }

          /* forcer wrap si besoin */
          .ls-section .force-wrap {
            white-space: normal !important;
            overflow-wrap: anywhere !important;
            word-break: break-word !important;
          }
        }

        /* Desktop / portrait: titre boosté aussi */
        @media (min-width: 921px) {
          .ls-title {
            font-size: clamp(28px, 3.5vw, 36px) !important;
          }
          .ls-subtitle {
            font-size: clamp(16px, 2vw, 20px) !important;
          }
        }
      `}</style>

      {/* conteneur principal */}
      <div className="mx-auto w-full max-w-[860px] sm:max-w-3xl md:max-w-5xl space-y-6 sm:space-y-8 ls-max ls-wrap">
        {/* Header */}
        <div className="flex items-center gap-3 ls-header">
          <img src={logo} alt="NOYA" className="h-9 w-9 sm:h-12 sm:w-12 ls-logo" />
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-primary tracking-tight ls-title">
              Dashboard NOYA
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground font-medium ls-subtitle">
              Vue d’ensemble de votre chaîne de distribution
            </p>
          </div>
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Sections */}
        <div className="space-y-6 sm:space-y-8 ls-stack">
          <section className="ls-section">
            <PrecommandTable />
          </section>

          <section className="ls-section">
            <SalesChart />
          </section>

          <section className="ls-section">
            <POSMap />
          </section>

          <section className="ls-section">
            <RecentActivity />
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
