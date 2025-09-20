import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle, ShoppingCart } from "lucide-react";

const rows = [
  { id: "PRE-001", acteur: "Grossiste Delta", produit: "Marlboro Rouge", qte: 50, statut: "En attente", date: "2024-09-15" },
  { id: "PRE-002", acteur: "Sous-Grossiste Alpha", produit: "Marlboro Gold", qte: 30, statut: "Validée", date: "2024-09-15" },
  { id: "PRE-003", acteur: "POS Beta Shop", produit: "Marlboro Rouge", qte: 20, statut: "En attente", date: "2024-09-14" },
  { id: "PRE-004", acteur: "Grossiste Gamma", produit: "Marlboro Gold", qte: 100, statut: "Partielle", date: "2024-09-14" },
];

function Status({ s }: { s: string }) {
  if (s === "Validée") return <Badge className="bg-green-600 text-white">Validée</Badge>;
  if (s === "En attente") return <Badge variant="secondary">En attente</Badge>;
  if (s === "Partielle") return <Badge className="bg-amber-500 text-white">Partielle</Badge>;
  return <Badge variant="outline">{s}</Badge>;
}

export function PrecommandTable() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" /> Précommandes en Attente
        </CardTitle>
        <CardDescription>Liste des précommandes nécessitant une validation</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Cartes mobiles : aucune largeur fixe → pas de scroll horizontal */}
        <div className="grid gap-3 sm:hidden">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border p-3 bg-white">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-foreground">{r.id}</div>
                <Status s={r.statut} />
              </div>
              <div className="mt-1 text-sm text-foreground">{r.acteur}</div>
              <div className="text-sm text-muted-foreground">{r.produit} • Qté {r.qte}</div>
              <div className="text-xs text-muted-foreground mt-1">{r.date}</div>

              <div className="mt-2 flex items-center gap-1">
                <Button size="icon" variant="ghost" aria-label="Voir">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-green-600" aria-label="Valider">
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-red-600" aria-label="Refuser">
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Table ≥ sm */}
        <div className="hidden sm:block overflow-x-auto -mx-4 sm:mx-0">
          <Table className="min-w-[880px]">
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Acteur</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-semibold">{r.id}</TableCell>
                  <TableCell>{r.acteur}</TableCell>
                  <TableCell>{r.produit}</TableCell>
                  <TableCell>{r.qte}</TableCell>
                  <TableCell><Status s={r.statut} /></TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="text-green-600"><CheckCircle className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="text-red-600"><XCircle className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
