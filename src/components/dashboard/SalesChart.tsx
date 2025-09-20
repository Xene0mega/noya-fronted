import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";

// Données de vente simulées (7 derniers jours)
const salesData = [
  { period: "Lun", ventes: 1200, objectif: 1000 },
  { period: "Mar", ventes: 950,  objectif: 1000 },
  { period: "Mer", ventes: 1400, objectif: 1000 },
  { period: "Jeu", ventes: 1100, objectif: 1000 },
  { period: "Ven", ventes: 1600, objectif: 1000 },
  { period: "Sam", ventes: 1850, objectif: 1000 },
  { period: "Dim", ventes: 800,  objectif: 1000 },
];

export function SalesChart() {
  const maxValue = Math.max(...salesData.map(d => Math.max(d.ventes, d.objectif)));
  const totalVentes = salesData.reduce((sum, d) => sum + d.ventes, 0);
  const totalObjectif = salesData.reduce((sum, d) => sum + d.objectif, 0);
  const performance = ((totalVentes / totalObjectif) * 100).toFixed(1);

  return (
    <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span className="text-primary">Évolution des Ventes</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-success/10 text-success border-success/20">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{performance}%
            </Badge>
            <Button variant="outline" size="sm" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              7j
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{totalVentes.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Ventes</p>
            </div>
            <div className="text-center">
              {/* Objectif en bleu fort */}
              <p className="text-2xl font-bold text-blue-600">{totalObjectif.toLocaleString()}</p>
              <p className="text-xs text-blue-600 font-medium">Objectif</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{performance}%</p>
              <p className="text-xs text-muted-foreground">Performance</p>
            </div>
          </div>

          {/* Graphique barre (simplifié) */}
          <div className="space-y-3">
            {salesData.map((data, index) => (
              <div key={data.period} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{data.period}</span>
                  <span className="text-muted-foreground">{data.ventes}</span>
                </div>

                <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                  {/* Objectif en bleu clair */}
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-600/30 rounded-full"
                    style={{ width: `${(data.objectif / maxValue) * 100}%` }}
                  />
                  {/* Ventes */}
                  <div
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                      data.ventes >= data.objectif ? "bg-gradient-success" : "bg-gradient-primary"
                    }`}
                    style={{
                      width: `${(data.ventes / maxValue) * 100}%`,
                      animationDelay: `${index * 100}ms`,
                    }}
                  />
                  {/* Marqueur objectif en bleu fort */}
                  <div
                    className="absolute top-0 h-full w-0.5 bg-blue-600"
                    style={{ left: `${(data.objectif / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Légende */}
          <div className="flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gradient-primary rounded" />
              <span>Ventes</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded" />
              <span className="text-blue-600">Objectif</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
