import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, MapPin, Phone, Users } from "lucide-react";

type Merchant = {
  id: number;
  name: string;
  type: "distributeur" | "grossiste" | "sous_grossiste" | "pos" | string;
  tel?: string;
  address?: string;
  is_active?: boolean;
};

export default function Acteurs() {
  const [rows, setRows] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("/merchants")
      .then((r) => setRows(r.data.data))
      .finally(() => setLoading(false));
  }, []);

  const typeBadge = (t: string) => {
    const map: Record<string, string> = {
      grossiste: "bg-primary text-primary-foreground",
      sous_grossiste: "bg-warning text-warning-foreground",
      pos: "bg-success text-success-foreground",
      distributeur: "bg-secondary text-secondary-foreground",
    };
    const klass = map[t] ?? "bg-muted";
    return <Badge className={klass}>{t}</Badge>;
  };

  const statutBadge = (on?: boolean) =>
    on ? (
      <Badge className="bg-success text-success-foreground">Actif</Badge>
    ) : (
      <Badge variant="secondary">Inactif</Badge>
    );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Gestion des Acteurs</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Gérez vos grossistes, sous-grossistes et points de vente
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nouvel Acteur
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle>Liste des Acteurs</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-8 w-full sm:w-64" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              "Chargement…"
            ) : (
              <>
                {/* Vue cartes mobile */}
                <div className="grid gap-3 sm:hidden">
                  {rows.map((m) => (
                    <div key={m.id} className="rounded-lg border p-3 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{m.name}</div>
                        {typeBadge(m.type)}
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {m.tel ?? "—"}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {m.address ?? "—"}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        {statutBadge(m.is_active)}
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => (window.location.href = `/merchants/${m.id}`)}
                          >
                            <Users className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Table ≥ sm */}
                <div className="hidden sm:block overflow-x-auto -mx-4 sm:mx-0">
                  <Table className="min-w-[820px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead className="hidden md:table-cell">Localisation</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell className="font-medium">{m.name}</TableCell>
                          <TableCell>{typeBadge(m.type)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              {m.tel ?? "—"}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {m.address ?? "—"}
                            </div>
                          </TableCell>
                          <TableCell>{statutBadge(m.is_active)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => (window.location.href = `/merchants/${m.id}`)}
                              >
                                <Users className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
