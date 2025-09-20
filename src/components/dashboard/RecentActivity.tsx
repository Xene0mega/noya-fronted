import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Package, Truck, UserPlus, CheckCircle2, Clock } from "lucide-react";

type Activity = {
  id: number;
  type: "commande" | "livraison" | "validation" | "nouveau" | "attente";
  user: string;
  action: string;
  details: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string; // classe bg-*
};

const activities: Activity[] = [
  {
    id: 1,
    type: "commande",
    user: "Grossiste Nord",
    action: "Nouvelle précommande PC006",
    details: "50 unités Marlboro Rouge",
    time: "Il y a 5 min",
    icon: Package,
    color: "bg-primary",
  },
  {
    id: 2,
    type: "livraison",
    user: "Jean Kouassi",
    action: "Livraison terminée LIV003",
    details: "Livré à POS Adjamé",
    time: "Il y a 15 min",
    icon: CheckCircle2,
    color: "bg-success",
  },
  {
    id: 3,
    type: "validation",
    user: "Admin NOYA",
    action: "Précommande validée PC005",
    details: "Grossiste Sud - 75 unités",
    time: "Il y a 32 min",
    icon: CheckCircle2,
    color: "bg-success",
  },
  {
    id: 4,
    type: "nouveau",
    user: "Système",
    action: "Nouveau POS enregistré",
    details: "Market Yopougon - Yopougon",
    time: "Il y a 1h",
    icon: UserPlus,
    color: "bg-primary",
  },
  {
    id: 5,
    type: "livraison",
    user: "Paul Diabaté",
    action: "Livraison en cours LIV004",
    details: "Vers Sous-grossiste Centre",
    time: "Il y a 2h",
    icon: Truck,
    color: "bg-warning",
  },
  {
    id: 6,
    type: "attente",
    user: "POS Plateau",
    action: "Commande en attente PC007",
    details: "15 unités Marlboro Gold",
    time: "Il y a 3h",
    icon: Clock,
    color: "bg-muted",
  },
];

export function RecentActivity() {
  return (
    <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <span className="text-primary">Activité Récente</span>
          <Badge variant="secondary" className="ml-auto text-xs">
            {activities.length} activités
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            const initials = activity.user
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            const dot =
              activity.type === "commande"
                ? "bg-primary"
                : activity.type === "livraison" || activity.type === "validation"
                ? "bg-success"
                : activity.type === "nouveau"
                ? "bg-primary"
                : "bg-muted-foreground";

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className={`p-2 rounded-full ${activity.color} shadow-sm`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>

                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-muted">{initials}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium truncate">{activity.user}</p>
                  </div>

                  <p className="text-sm text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.details}</p>
                  <p className="text-xs text-muted-foreground font-medium">{activity.time}</p>
                </div>

                <div className="flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full ${dot}`} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
