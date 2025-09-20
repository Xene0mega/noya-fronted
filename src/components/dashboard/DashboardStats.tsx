// src/components/dashboard/DashboardStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Truck,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";

type Stat = {
  title: string;
  value: string;
  unit?: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
};

const stats: Stat[] = [
  { title: "Ventes du Jour", value: "2,450", unit: "cartouches", change: "+12%", trend: "up", icon: BarChart3, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  { title: "Ventes Semaine", value: "16,890", unit: "cartouches", change: "+8%", trend: "up", icon: ShoppingCart, color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
  { title: "Ventes du Mois", value: "72,450", unit: "cartouches", change: "+15%", trend: "up", icon: DollarSign, color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  { title: "Livraisons Actives", value: "94.2", unit: "%", change: "-2%", trend: "down", icon: Truck, color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  { title: "Points de Vente", value: "342", change: "+5", trend: "up", icon: Users, color: "text-indigo-600", bgColor: "bg-indigo-50", borderColor: "border-indigo-200" },
  { title: "Commandes en Attente", value: "23", change: "-8%", trend: "down", icon: Package, color: "text-amber-600", bgColor: "bg-amber-50", borderColor: "border-amber-200" },
];

export function DashboardStats() {
  return (
    <div
      className="
        grid md:gap-7 gap-6
        [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]
      "
    >
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className={`h-full relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${stat.borderColor} border-l-4`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </div>
            <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="space-y-1">
              <div className="text-3xl font-bold tracking-tight text-foreground">
                {stat.value}
                {stat.unit ? (
                  <span className="text-base font-medium text-muted-foreground ml-1">
                    {stat.unit}
                  </span>
                ) : null}
              </div>
              <div className="flex items-center space-x-2">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <p
                  className={`text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </p>
                <span className="text-sm text-muted-foreground">
                  par rapport au mois dernier
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
