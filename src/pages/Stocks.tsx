import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Package, TrendingUp, TrendingDown } from "lucide-react";

const stocks = [
  { acteur: "NOYA Entrepôt", type: "Distributeur", marlboroRouge: 1500, marlboroGold: 1200, seuil: 500, dernierMouvement: "Entrée +200" },
  { acteur: "Grossiste Nord", type: "Grossiste", marlboroRouge: 300, marlboroGold: 250, seuil: 100, dernierMouvement: "Sortie -50" },
  { acteur: "Sous-grossiste Centre", type: "Sous-grossiste", marlboroRouge: 80, marlboroGold: 45, seuil: 50, dernierMouvement: "Sortie -30" },
  { acteur: "POS Cocody", type: "POS", marlboroRouge: 15, marlboroGold: 8, seuil: 20, dernierMouvement: "Entrée +10" },
  { acteur: "POS Adjamé", type: "POS", marlboroRouge: 25, marlboroGold: 18, seuil: 15, dernierMouvement: "Sortie -5" },
];

const getStockStatus = (stock: number, seuil: number) => {
  if (stock < seuil * 0.5) return { status: "Critique", color: "bg-red-500", textColor: "text-red-700" };
  if (stock < seuil) return { status: "Faible", color: "bg-yellow-500", textColor: "text-yellow-700" };
  return { status: "Normal", color: "bg-green-500", textColor: "text-green-700" };
};

const getMovementIcon = (mouvement: string) => {
  if (mouvement.includes("Entrée")) return <TrendingUp className="w-4 h-4 text-green-600" />;
  return <TrendingDown className="w-4 h-4 text-red-600" />;
};

export default function Stocks() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Stocks</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Gestion et suivi des stocks par acteur</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stocks.map((stock, index) => {
            const marlboroRougeStatus = getStockStatus(stock.marlboroRouge, stock.seuil);
            const marlboroGoldStatus = getStockStatus(stock.marlboroGold, stock.seuil);

            return (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{stock.acteur}</CardTitle>
                    <Badge variant="outline">{stock.type}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    {getMovementIcon(stock.dernierMouvement)}
                    {stock.dernierMouvement}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Marlboro Rouge */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium">Marlboro Rouge</span>
                      </div>
                      <span className="text-sm font-bold">{stock.marlboroRouge}</span>
                    </div>
                    <Progress value={(stock.marlboroRouge / (stock.seuil * 3)) * 100} className="h-2" />
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="secondary" className={`${marlboroRougeStatus.textColor} bg-opacity-20`}>
                        {marlboroRougeStatus.status}
                      </Badge>
                      <span className="text-muted-foreground">Seuil: {stock.seuil}</span>
                    </div>
                    {stock.marlboroRouge < stock.seuil && (
                      <div className="flex items-center gap-1 text-xs text-yellow-600">
                        <AlertTriangle className="w-3 h-3" />
                        Stock faible
                      </div>
                    )}
                  </div>

                  {/* Marlboro Gold */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium">Marlboro Gold</span>
                      </div>
                      <span className="text-sm font-bold">{stock.marlboroGold}</span>
                    </div>
                    <Progress value={(stock.marlboroGold / (stock.seuil * 3)) * 100} className="h-2" />
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="secondary" className={`${marlboroGoldStatus.textColor} bg-opacity-20`}>
                        {marlboroGoldStatus.status}
                      </Badge>
                      <span className="text-muted-foreground">Seuil: {stock.seuil}</span>
                    </div>
                    {stock.marlboroGold < stock.seuil && (
                      <div className="flex items-center gap-1 text-xs text-yellow-600">
                        <AlertTriangle className="w-3 h-3" />
                        Stock faible
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
