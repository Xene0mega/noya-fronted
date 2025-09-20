import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/lib/api";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type MerchantUserRow = {
  id: number;
  name: string;
  email: string;
  role_id: number;
  is_active: boolean;
};

const ROLE_LABELS: Record<number, string> = {
  1: "Admin",
  2: "Manager",
  3: "Vendeur",
};

export default function MerchantUsers() {
  const { id } = useParams<{ id: string }>();
  const merchantId = Number(id);

  const [rows, setRows] = useState<MerchantUserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!merchantId) return;
    setLoading(true);
    setError(null);
    api
      .get<MerchantUserRow[]>(`/merchants/${merchantId}/users`)
      .then((r) => setRows(r.data))
      .catch((err) => setError(err?.response?.data?.message ?? err.message))
      .finally(() => setLoading(false));
  }, [merchantId]);

  return (
    <AppLayout>
      <Card>
        <CardHeader>
          <CardTitle>Utilisateurs du Marchand #{merchantId || "—"}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <div>Chargement…</div>}
          {error && <div className="text-red-600">Erreur : {error}</div>}

          {!loading && !error && (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <Table className="min-w-[720px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <Badge>{ROLE_LABELS[u.role_id] ?? `Rôle #${u.role_id}`}</Badge>
                      </TableCell>
                      <TableCell>
                        {u.is_active ? (
                          <Badge className="bg-success text-success-foreground">Actif</Badge>
                        ) : (
                          <Badge variant="secondary">Inactif</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}
