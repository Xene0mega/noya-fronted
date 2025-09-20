import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Truck, CheckCircle2, Clock, AlertCircle } from "lucide-react"

const livraisons = [
  {
    id: "LIV001",
    precommande: "PC002",
    acteur: "Sous-grossiste Centre",
    produit: "Marlboro Gold",
    quantite: 30,
    statut: "Livrée",
    dateLivraison: "2024-01-15",
    livreur: "Jean Kouassi"
  },
  {
    id: "LIV002",
    precommande: "PC001",
    acteur: "Grossiste Nord",
    produit: "Marlboro Rouge", 
    quantite: 50,
    statut: "En cours",
    dateLivraison: "2024-01-16",
    livreur: "Paul Diabaté"
  },
  {
    id: "LIV003",
    precommande: "PC004",
    acteur: "POS Adjamé",
    produit: "Marlboro Gold",
    quantite: 10,
    statut: "Programmée",
    dateLivraison: "2024-01-17",
    livreur: "Marie Koné"
  },
  {
    id: "LIV004",
    precommande: "PC005",
    acteur: "POS Plateau",
    produit: "Marlboro Rouge",
    quantite: 25,
    statut: "Retard",
    dateLivraison: "2024-01-14",
    livreur: "David Yao"
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Livrée":
      return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle2 className="w-3 h-3 mr-1" />Livrée</Badge>
    case "En cours":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Truck className="w-3 h-3 mr-1" />En cours</Badge>
    case "Programmée":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Programmée</Badge>
    case "Retard":
      return <Badge variant="secondary" className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />Retard</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function Livraisons() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Livraisons</h1>
          <p className="text-muted-foreground">Suivi des livraisons et logistique</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Suivi des Livraisons</CardTitle>
            <CardDescription>
              État des livraisons en cours et historique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code Livraison</TableHead>
                  <TableHead>Précommande</TableHead>
                  <TableHead>Destinataire</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Livreur</TableHead>
                  <TableHead>Date Prévue</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {livraisons.map((livraison) => (
                  <TableRow key={livraison.id}>
                    <TableCell className="font-medium">{livraison.id}</TableCell>
                    <TableCell>{livraison.precommande}</TableCell>
                    <TableCell>{livraison.acteur}</TableCell>
                    <TableCell>{livraison.produit}</TableCell>
                    <TableCell>{livraison.quantite}</TableCell>
                    <TableCell>{livraison.livreur}</TableCell>
                    <TableCell>{livraison.dateLivraison}</TableCell>
                    <TableCell>{getStatusBadge(livraison.statut)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {livraison.statut === "En cours" && (
                          <Button variant="ghost" size="icon" className="text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}