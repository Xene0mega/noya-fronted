import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Eye, Filter } from "lucide-react";

const posData = [
  { id: "POS001", nom: "Supermarché Centre", quartier: "Plateau",  commune: "Abidjan", statut: "Actif",   derniereCommande: "2024-01-16", distance: "2.3 km" },
  { id: "POS002", nom: "Boutique Adjamé",    quartier: "Adjamé",   commune: "Abidjan", statut: "Actif",   derniereCommande: "2024-01-15", distance: "5.7 km" },
  { id: "POS003", nom: "Épicerie Cocody",    quartier: "Cocody",   commune: "Abidjan", statut: "Inactif", derniereCommande: "2024-01-10", distance: "8.1 km" },
  { id: "POS004", nom: "Market Yopougon",    quartier: "Yopougon", commune: "Abidjan", statut: "Actif",   derniereCommande: "2024-01-16", distance: "12.4 km" },
];

const getStatusBadge = (statut: string) =>
  statut === "Actif" ? (
    <Badge className="bg-success/10 text-success border-success/20 text-xs">
      <div className="w-2 h-2 bg-success rounded-full mr-1" />
      Actif
    </Badge>
  ) : (
    <Badge variant="secondary" className="text-xs">
      <div className="w-2 h-2 bg-muted-foreground rounded-full mr-1" />
      Inactif
    </Badge>
  );

export function POSMap() {
  return (
    <Card className="w-full shadow-elegant hover:shadow-glow transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-primary">Points de Vente</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Filter className="h-3 w-3 mr-1" />
              Filtrer
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Navigation className="h-3 w-3 mr-1" />
              Carte
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Placeholder carte */}
        <div className="h-48 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center mb-6">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2 text-primary/40" />
            <p className="text-sm">Carte interactive des POS</p>
            <p className="text-xs">(Intégration Google Maps à venir)</p>
          </div>
        </div>

        {/* Liste POS */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground mb-3">POS à proximité</h4>
          {posData.map((pos) => (
            <div
              key={pos.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-medium text-sm">{pos.nom}</h5>
                  {getStatusBadge(pos.statut)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {pos.quartier}, {pos.commune} • {pos.distance}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Dernière commande: {pos.derniereCommande}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
