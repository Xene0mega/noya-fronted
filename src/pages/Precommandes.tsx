import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react";

const precommandes = [
  { id: "PC001", acteur: "Grossiste Nord", type: "Grossiste", produit: "Marlboro Rouge", quantite: 50, statut: "En attente", date: "2024-01-15" },
  { id: "PC002", acteur: "Sous-grossiste Centre", type: "Sous-grossiste", produit: "Marlboro Gold", quantite: 30, statut: "Validée", date: "2024-01-14" },
  { id: "PC003", acteur: "POS Cocody", type: "POS", produit: "Marlboro Rouge", quantite: 20, statut: "En attente", date: "2024-01-13" },
  { id: "PC004", acteur: "POS Adjamé", type: "POS", produit: "Marlboro Gold", quantite: 100, statut: "Partiellement validée", date: "2024-01-12" },
];

function TypeBadge({ type }: { type: string }) {
  const t = type.replace(/-/g, "_").toLowerCase();
  if (t === "grossiste" || t === "distributeur") return <Badge className="bg-primary text-primary-foreground">{type}</Badge>;
  if (t === "sous_grossiste") return <Badge className="bg-warning text-warning-foreground">{type}</Badge>;
  if (t === "pos") return <Badge className="bg-success text-success-foreground">{type}</Badge>;
  return <Badge variant="secondary">{type}</Badge>;
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "En attente":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
    case "Validée":
      return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Validée</Badge>;
    case "Refusée":
      return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Refusée</Badge>;
    case "Partiellement validée":
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Partielle</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function Precommandes() {
  return (
    <AppLayout>
      {/* règles: paysage 6" + desktop centré, sans toucher au Layout */}
      <style>{`
        /* ---- Mobile paysage (~6") ---- */
        @media (orientation: landscape) and (max-width: 920px) {
          .ls-page {
            max-width: 92vw !important;
            margin-left: auto; margin-right: auto;
            display: flex; flex-direction: column; align-items: center;
          }
             .ls-header {
      text-align: left !important;
      margin-left: -270px !important;
      padding-left: 0 !important;
    }

    
          .ls-card { width: 100%; max-width: 100vw !important; }
          .ls-tablewrap {
            margin-left: -12px !important; margin-right: -12px !important;
            padding-left: 12px !important; padding-right: 12px !important;
          }
          .ls-tablewrap > * { max-width: 100% !important; }
        }

        /* ---- Desktop : largeur contenue et centrée (comme Rapports/Index) ---- */
        @media (min-width: 1024px) {
          .desk-wrap {
            max-width: min(1100px, 72vw);  /* largeur douce ~ Rapports */
            margin-left: auto; margin-right: auto;
          }
          .desk-tablewrap { margin-left: 0 !important; margin-right: 0 !important; padding-left: 0 !important; padding-right: 0 !important; }
        }
      `}</style>

      {/* container principal : suit AppLayout -> ajoute nos classes utilitaires */}
      <div className="space-y-6 ls-page desk-wrap">
        {/* Titre */}
        <div className="ls-header">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Précommandes</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Gestion des précommandes de la chaîne de distribution</p>
        </div>

        {/* Carte centrée */}
        <Card className="w-full mx-auto ls-card">
          <CardHeader className="pb-3">
            <CardTitle>Liste des Précommandes</CardTitle>
            <CardDescription>Précommandes reçues et leur statut de traitement</CardDescription>
          </CardHeader>

          <CardContent>
            {/* Cartes mobiles (portrait) */}
            <div className="grid gap-3 sm:hidden">
              {precommandes.map((p) => (
                <div key={p.id} className="rounded-lg border p-3 bg-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-base">{p.id}</div>
                      <div className="text-sm text-muted-foreground">{p.acteur}</div>
                    </div>
                    <TypeBadge type={p.type} />
                  </div>

                  <div className="mt-2 text-sm">
                    <div className="flex justify-between"><span>Produit</span><span className="font-medium">{p.produit}</span></div>
                    <div className="flex justify-between"><span>Quantité</span><span className="font-semibold">{p.quantite}</span></div>
                    <div className="flex justify-between"><span>Date</span><span>{p.date}</span></div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <StatusBadge status={p.statut} />
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" title="Voir"><Eye className="h-4 w-4" /></Button>
                      {p.statut === "En attente" && (
                        <>
                          <Button variant="ghost" size="sm" className="text-green-600" title="Valider"><CheckCircle className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" className="text-red-600" title="Refuser"><XCircle className="h-4 w-4" /></Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table ≥ sm : scroll horizontal propre (mobile paysage) + centrage desktop */}
            <div className="hidden sm:block overflow-x-auto ls-tablewrap desk-tablewrap">
              <Table className="min-w-[860px] whitespace-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[10%]">Code</TableHead>
                    <TableHead className="w-[20%]">Acteur</TableHead>
                    <TableHead className="w-[12%]">Type</TableHead>
                    <TableHead className="w-[18%]">Produit</TableHead>
                    <TableHead className="w-[10%]">Quantité</TableHead>
                    <TableHead className="w-[14%]">Statut</TableHead>
                    <TableHead className="w-[10%]">Date</TableHead>
                    <TableHead className="w-[6%] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {precommandes.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.id}</TableCell>
                      <TableCell className="max-w-[260px] truncate" title={p.acteur}>{p.acteur}</TableCell>
                      <TableCell><TypeBadge type={p.type} /></TableCell>
                      <TableCell className="max-w-[260px] truncate" title={p.produit}>{p.produit}</TableCell>
                      <TableCell>{p.quantite}</TableCell>
                      <TableCell><StatusBadge status={p.statut} /></TableCell>
                      <TableCell>{p.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="Voir"><Eye className="h-4 w-4" /></Button>
                          {p.statut === "En attente" && (
                            <>
                              <Button variant="ghost" size="icon" className="text-green-600" title="Valider"><CheckCircle className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="text-red-600" title="Refuser"><XCircle className="h-4 w-4" /></Button>
                            </>
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
