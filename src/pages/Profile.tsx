// src/pages/Profile.tsx
import { useEffect, useMemo, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Building2, Calendar, Edit3, Save, X } from "lucide-react";
import { fetchMe } from "@/lib/auth";
// import { api } from "@/lib/api"; // à décommenter si tu branches un PATCH /me

type UiUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  role?: string;
  department?: string;
  bio?: string;
  status?: "active" | "inactive";
};

// forme potentielle renvoyée par ton API
type ApiUser = {
  id: number;
  name?: string;
  email: string;
  status?: "active" | "inactive";
  role_id?: number | null;

  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  company?: string;
  merchant_name?: string;
  role_name?: string;
  department?: string;
  bio?: string;
};

function computeRole(u: ApiUser): string {
  if (u.role_name && u.role_name.trim() !== "") return u.role_name;
  if (u.role_id) return "Admin";
  return "";
}

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UiUser>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    role: "",
    department: "",
    bio: "",
    status: "active",
  });

  // Charger user local + rafraîchir via /auth/me
  useEffect(() => {
    try {
      const raw = localStorage.getItem("noya_user");
      if (raw) {
        const u = JSON.parse(raw) as ApiUser;
        const first = u.first_name ?? u.name?.split(" ")[0] ?? "";
        const last =
          u.last_name ?? (u.name ? u.name.split(" ").slice(1).join(" ") : "") ?? "";
        setFormData({
          firstName: first,
          lastName: last,
          email: u.email ?? "",
          phone: u.phone ?? "",
          address: u.address ?? "",
          company: u.company ?? u.merchant_name ?? "",
          role: computeRole(u),
          department: u.department ?? "",
          bio: u.bio ?? "",
          status: u.status ?? "active",
        });
      }
    } catch (err) {
  if (import.meta.env.DEV) console.warn("Impossible de stocker noya_user", err);
}

    fetchMe()
      .then((u) => {
        if (!u) return;
        const au = u as unknown as ApiUser;

        const first = au.first_name ?? au.name?.split(" ")[0] ?? "";
        const last =
          au.last_name ?? (au.name ? au.name.split(" ").slice(1).join(" ") : "") ?? "";

        const next: UiUser = {
          firstName: first,
          lastName: last,
          email: au.email ?? "",
          phone: au.phone ?? "",
          address: au.address ?? "",
          company: au.company ?? au.merchant_name ?? "",
          role: computeRole(au),
          department: au.department ?? "",
          bio: au.bio ?? "",
          status: au.status ?? "active",
        };
        setFormData(next);
      })
      .catch(() => {});
  }, []);

  const initials = useMemo(() => {
    const a = formData.firstName?.[0] ?? "";
    const b = formData.lastName?.[0] ?? "";
    return (a + b || formData.email?.[0] || "?").toUpperCase();
  }, [formData.firstName, formData.lastName, formData.email]);

  const handleInputChange = (field: keyof UiUser, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      // Exemple si tu as un endpoint:
      // await api.patch("/me", { ... });

      // Mise à jour locale (UI)
      const raw = localStorage.getItem("noya_user");
      if (raw) {
        const u = JSON.parse(raw) as ApiUser;
        const updated = {
          ...u,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          department: formData.department,
          bio: formData.bio,
        };
        localStorage.setItem("noya_user", JSON.stringify(updated));
      }

      toast({ title: "Profil mis à jour", description: "Vos informations ont été sauvegardées." });
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible d’enregistrer pour l’instant.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Mon Profil</h1>
            <p className="text-muted-foreground">Gérez vos informations personnelles</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Sauvegarder
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit3 className="mr-2 h-4 w-4" />
                Modifier
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Résumé */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={undefined} />
                  <AvatarFallback className="text-lg bg-slate-800 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-xl font-semibold">
                    {formData.firstName} {formData.lastName}
                  </h3>
                  <p className="text-muted-foreground">{formData.role || "Utilisateur"}</p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {formData.company ? <Badge variant="secondary">{formData.company}</Badge> : null}
                  <Badge className={formData.status === "active" ? "bg-emerald-600 text-white" : ""}>
                    {formData.status === "active" ? "Actif" : "Inactif"}
                  </Badge>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Membre depuis 2024</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations de Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nom</Label>
                  {isEditing ? (
                    <Input id="firstName" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} />
                  ) : (
                    <p className="py-2 text-foreground">{formData.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName"></Label>
                  {isEditing ? (
                    <Input id="lastName" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} />
                  ) : (
                    <p className="py-2 text-foreground">{formData.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </Label>
                {isEditing ? (
                  <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                ) : (
                  <p className="py-2 text-foreground">{formData.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Téléphone
                </Label>
                {isEditing ? (
                  <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                ) : (
                  <p className="py-2 text-foreground">{formData.phone || "—"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Adresse
                </Label>
                {isEditing ? (
                  <Input id="address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} />
                ) : (
                  <p className="py-2 text-foreground">{formData.address || "—"}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informations Professionnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  {isEditing ? (
                    <Input id="company" value={formData.company} onChange={(e) => handleInputChange("company", e.target.value)} />
                  ) : (
                    <p className="py-2 text-foreground">{formData.company || "—"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  {isEditing ? (
                    <Input id="role" value={formData.role} onChange={(e) => handleInputChange("role", e.target.value)} />
                  ) : (
                    <p className="py-2 text-foreground">{formData.role || "—"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Département</Label>
                  {isEditing ? (
                    <Input id="department" value={formData.department} onChange={(e) => handleInputChange("department", e.target.value)} />
                  ) : (
                    <p className="py-2 text-foreground">{formData.department || "—"}</p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="bio">Biographie</Label>
                {isEditing ? (
                  <Textarea id="bio" value={formData.bio} onChange={(e) => handleInputChange("bio", e.target.value)} rows={4} />
                ) : (
                  <p className="py-2 text-foreground">{formData.bio || "—"}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
