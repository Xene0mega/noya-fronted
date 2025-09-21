import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, MapPin, Phone } from "lucide-react";
import { useMemo, useState } from "react";

type Acteur = {
  id: number;
  nom: string;
  type: "Grossiste" | "Sous-Grossiste" | "POS" | string;
  telephone: string;
  quartier: string;
  commune: string;
  statut: "Actif" | "Inactif" | string;
};

const acteurs: Acteur[] = [
  { id: 1, nom: "Grossiste Delta", type: "Grossiste", telephone: "+33 1 23 45 67 89", quartier: "Centre-ville", commune: "Paris 1er", statut: "Actif" },
  { id: 2, nom: "Sous-Grossiste Alpha", type: "Sous-Grossiste", telephone: "+33 1 98 76 54 32", quartier: "Belleville", commune: "Paris 20ème", statut: "Actif" },
  { id: 3, nom: "POS Beta Shop", type: "POS", telephone: "+33 1 11 22 33 44", quartier: "Marais", commune: "Paris 4ème", statut: "Inactif" },
  { id: 4, nom: "Grossiste Gamma", type: "Grossiste", telephone: "+33 1 55 66 77 88", quartier: "La Défense", commune: "Courbevoie", statut: "Actif" },
];

const getTypeBadge = (t: string) => {
  switch (t) {
    case "Grossiste":
      return <Badge className="bg-primary text-primary-foreground shrink-0">{t}</Badge>;
    case "Sous-Grossiste":
      return <Badge className="bg-warning text-warning-foreground shrink-0">{t}</Badge>;
    case "POS":
      return <Badge className="bg-success text-success-foreground shrink-0">{t}</Badge>;
    default:
      return <Badge className="shrink-0">{t}</Badge>;
  }
};

const getStatutBadge = (s: string) =>
  s === "Actif" ? (
    <Badge className="bg-success text-success-foreground shrink-0">{s}</Badge>
  ) : (
    <Badge variant="secondary" className="shrink-0">{s}</Badge>
  );

// … imports identiques

export default function Acteurs() {
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    if (!q.trim()) return acteurs;
    const k = q.toLowerCase();
    return acteurs.filter(
      (a) =>
        a.nom.toLowerCase().includes(k) ||
        a.type.toLowerCase().includes(k) ||
        a.telephone.toLowerCase().includes(k) ||
        a.quartier.toLowerCase().includes(k) ||
        a.commune.toLowerCase().includes(k) ||
        a.statut.toLowerCase().includes(k)
    );
  }, [q]);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Gestion des Acteurs</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Gérez vos grossistes, sous-grossistes et points de vente
            </p>
          </div>
          <Button className="w-full sm:w-auto shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel Acteur
          </Button>
        </div>

        <Card className="w-full">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle>Liste des Acteurs</CardTitle>
              {/* un peu plus étroit pour éviter toute poussée en paysage */}
              <div className="relative w-full sm:w-[260px] md:w-[320px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Rechercher…"
                  className="pl-8 w-full"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* --- CARTES jusqu'à md (portrait & paysage mobiles) --- */}
            <div className="grid gap-3 md:hidden">
              {rows.map((a) => (
                <div key={a.id} className="rounded-lg border p-3 bg-card">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium min-w-0 truncate" title={a.nom}>
                      {a.nom}
                    </div>
                    {getTypeBadge(a.type)}
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span className="truncate">{a.telephone}</span>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">
                        {a.quartier} • {a.commune}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    {getStatutBadge(a.statut)}
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="sm" title="Éditer">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Voir sur la carte">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- TABLEAU à partir de md uniquement --- */}
            <div className="hidden md:block overflow-x-auto">
              <div className="inline-block min-w-[860px] align-top">
                <Table className="w-full whitespace-nowrap">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Localisation</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium max-w-[260px] truncate" title={a.nom}>
                          {a.nom}
                        </TableCell>
                        <TableCell>{getTypeBadge(a.type)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            {a.telephone}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[280px] truncate" title={`${a.quartier} • ${a.commune}`}>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div className="min-w-0">
                              <div className="text-sm truncate">{a.quartier}</div>
                              <div className="text-xs text-muted-foreground truncate">{a.commune}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatutBadge(a.statut)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" title="Éditer">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Voir sur la carte">
                              <MapPin className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

