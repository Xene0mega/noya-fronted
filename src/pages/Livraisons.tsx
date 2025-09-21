import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Truck, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const livraisons = [
  { id: "LIV001", precommande: "PC002", acteur: "Sous-grossiste Centre", produit: "Marlboro Gold", quantite: 30, statut: "Livrée", dateLivraison: "2024-01-15", livreur: "Jean Kouassi" },
  { id: "LIV002", precommande: "PC001", acteur: "Grossiste Nord", produit: "Marlboro Rouge", quantite: 50, statut: "En cours", dateLivraison: "2024-01-16", livreur: "Paul Diabaté" },
  { id: "LIV003", precommande: "PC004", acteur: "POS Adjamé", produit: "Marlboro Gold", quantite: 10, statut: "Programmée", dateLivraison: "2024-01-17", livreur: "Marie Koné" },
  { id: "LIV004", precommande: "PC005", acteur: "POS Plateau", produit: "Marlboro Rouge", quantite: 25, statut: "Retard", dateLivraison: "2024-01-14", livreur: "David Yao" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Livrée":
      return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle2 className="w-3 h-3 mr-1" />Livrée</Badge>;
    case "En cours":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Truck className="w-3 h-3 mr-1" />En cours</Badge>;
    case "Programmée":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Programmée</Badge>;
    case "Retard":
      return <Badge variant="secondary" className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />Retard</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Livraisons() {
  return (
    <AppLayout>
      {/* RÈGLES MOBILE PAYSAGE (inchangées) + AJOUT DESKTOP */}
      <style>{`
        /* Mobile paysage (≈6") */
        @media (orientation: landscape) and (max-width: 920px) {
          .ls-page {
            max-width: 92vw !important;
            margin-left: auto; margin-right: auto;
            display: flex; flex-direction: column; align-items: center;
          }
                    .ls-header {
      text-align: left !important;
      margin-left: -440px !important;
      padding-left: 0 !important;
    }
          .ls-card { width: 100%; max-width: 100vw !important; }
          .ls-tablewrap {
            margin-left: -12px !important; margin-right: -12px !important;
            padding-left: 12px !important; padding-right: 12px !important;
          }
          .ls-tablewrap > * { max-width: 100% !important; }
        }

        /* Desktop : centre et borne la largeur */
        @media (min-width: 1024px) {
          .dx-page {
            max-width:min(1100px, 72vw); /* même esprit que Rapports/Stocks */
            margin-left: auto; margin-right: auto;
          }
          .dx-card {
            max-width: 1100px;
            margin-left: auto; margin-right: auto;
          }
        }
      `}</style>

      {/* Wrapper : mobile (ls-*) + desktop (dx-*) */}
      <div className="space-y-6 ls-page dx-page">
        {/* Titre */}
        <div className="ls-header">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Livraisons</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Suivi des livraisons et logistique</p>
        </div>

        {/* Carte centrée */}
        <Card className="w-full mx-auto dx-card">
          <CardHeader>
            <CardTitle>Suivi des Livraisons</CardTitle>
            <CardDescription>État des livraisons en cours et historique</CardDescription>
          </CardHeader>

          <CardContent>
            {/* Cartes (mobile portrait) */}
            <div className="grid gap-3 sm:hidden">
              {livraisons.map((l) => (
                <div key={l.id} className="rounded-lg border p-3 bg-card">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{l.id}</div>
                    {getStatusBadge(l.statut)}
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span className="text-foreground/80">Précommande</span>
                      <span>{l.precommande}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">Destinataire</span>
                      <span className="truncate max-w-[55%] text-right">{l.acteur}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">Produit</span>
                      <span className="truncate max-w-[55%] text-right">{l.produit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">Quantité</span>
                      <span>{l.quantite}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">Livreur</span>
                      <span className="truncate max-w-[55%] text-right">{l.livreur}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">Date prévue</span>
                      <span>{l.dateLivraison}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Voir le détail">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {l.statut === "En cours" && (
                      <Button variant="ghost" size="icon" className="text-green-600" title="Marquer livrée">
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Tableau (≥ sm) : scroll horizontal propre et centré sur desktop */}
            <div className="hidden sm:block overflow-x-auto">
              <Table className="min-w-[900px] lg:min-w-[1000px] xl:min-w-[1100px] whitespace-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[9%]">Code Livraison</TableHead>
                    <TableHead className="w-[9%]">Précommande</TableHead>
                    <TableHead className="w-[17%]">Destinataire</TableHead>
                    <TableHead className="w-[15%]">Produit</TableHead>
                    <TableHead className="w-[7%]">Quantité</TableHead>
                    <TableHead className="w-[13%]">Livreur</TableHead>
                    <TableHead className="w-[12%]">Date Prévue</TableHead>
                    <TableHead className="w-[10%]">Statut</TableHead>
                    <TableHead className="w-[8%] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {livraisons.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="font-medium">{l.id}</TableCell>
                      <TableCell>{l.precommande}</TableCell>
                      <TableCell className="max-w-[260px] truncate" title={l.acteur}>{l.acteur}</TableCell>
                      <TableCell className="max-w-[260px] truncate" title={l.produit}>{l.produit}</TableCell>
                      <TableCell>{l.quantite}</TableCell>
                      <TableCell className="max-w-[240px] truncate" title={l.livreur}>{l.livreur}</TableCell>
                      <TableCell>{l.dateLivraison}</TableCell>
                      <TableCell>{getStatusBadge(l.statut)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="Voir le détail">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {l.statut === "En cours" && (
                            <Button variant="ghost" size="icon" className="text-green-600" title="Marquer livrée">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
