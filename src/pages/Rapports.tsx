import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, FileText, BarChart3, TrendingUp, Users, Package } from "lucide-react";

const rapports = [
  { nom: "Rapport Mensuel des Ventes", description: "Synthèse des ventes par acteur et produit", periode: "Janvier 2024", type: "Ventes", statut: "Disponible", taille: "2.3 MB" },
  { nom: "Analyse des Stocks", description: "État des stocks et mouvements par zone", periode: "Semaine 3 - Janvier 2024", type: "Stocks", statut: "En cours", taille: "1.8 MB" },
  { nom: "Performance des Livraisons", description: "Taux de livraison et délais moyens", periode: "Décembre 2023", type: "Livraisons", statut: "Disponible", taille: "1.2 MB" },
  { nom: "Rapport Acteurs", description: "Liste complète des acteurs et performances", periode: "Q4 2023", type: "Acteurs", statut: "Disponible", taille: "956 KB" },
];

const statistiques = [
  { titre: "Ventes Totales", valeur: "125,430", unite: "unités", evolution: "+12%", icon: TrendingUp, couleur: "text-green-600" },
  { titre: "Acteurs Actifs", valeur: "347", unite: "acteurs", evolution: "+5%", icon: Users, couleur: "text-blue-600" },
  { titre: "Taux de Livraison", valeur: "94.2", unite: "%", evolution: "+2.1%", icon: Package, couleur: "text-purple-600" },
];

const getStatusBadge = (status: string) =>
  status === "Disponible"
    ? <Badge variant="secondary" className="bg-green-100 text-green-800">Disponible</Badge>
    : status === "En cours"
    ? <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En cours</Badge>
    : <Badge variant="outline">{status}</Badge>;

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Ventes":     return <BarChart3 className="w-4 h-4 text-green-600" />;
    case "Stocks":     return <Package className="w-4 h-4 text-blue-600" />;
    case "Livraisons": return <Calendar className="w-4 h-4 text-purple-600" />;
    case "Acteurs":    return <Users className="w-4 h-4 text-orange-600" />;
    default:           return <FileText className="w-4 h-4" />;
  }
};

export default function Rapports() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Titre de la page */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Rapports</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Génération et consultation des rapports d'activité
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {statistiques.map((stat, i) => (
            <Card key={i} className="w-full shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.titre}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-xl sm:text-2xl font-bold">{stat.valeur}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{stat.unite}</p>
                    </div>
                    <p className={`text-xs ${stat.couleur}`}>{stat.evolution} vs mois précédent</p>
                  </div>
                  <stat.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${stat.couleur}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Liste des rapports */}
        <Card>
          <CardHeader>
            <CardTitle>Rapports Disponibles</CardTitle>
            <CardDescription>Historique des rapports générés et téléchargements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rapports.map((r, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 border rounded-lg"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    {getTypeIcon(r.type)}
                    <div className="min-w-0">
                      <h4 className="font-medium truncate">{r.nom}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{r.description}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px] sm:text-xs">{r.periode}</Badge>
                        <span className="text-[10px] sm:text-xs text-muted-foreground">{r.taille}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {getStatusBadge(r.statut)}
                    {r.statut === "Disponible" && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>Générer de nouveaux rapports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
              <Button variant="outline" className="w-full justify-start h-auto p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium">Rapport de Ventes</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Générer le rapport mensuel</p>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium">Analyse des Stocks</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">État actuel des stocks</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
