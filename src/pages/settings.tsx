// src/pages/Settings.tsx
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function Settings() {
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingSecurity, setSavingSecurity] = useState(false);
  const [savingNotif, setSavingNotif] = useState(false);
  const [savingApp, setSavingApp] = useState(false);

  const onSave = async (fn: () => Promise<void> | void, setBusy: (v: boolean) => void) => {
    if (savingProfile || savingSecurity || savingNotif || savingApp) return;
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Titre & sous-titre */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Paramètres</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Gérez votre profil, sécurité, notifications et préférences d’affichage
          </p>
        </div>

        {/* Layout global */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Colonne gauche */}
          <div className="space-y-4 sm:space-y-6">
            {/* Profil */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Profil</CardTitle>
                <CardDescription>Informations de base affichées dans l’application</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSave(async () => {/* call API */}, setSavingProfile);
                  }}
                >
                  {/* Avatar + actions */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                      <AvatarImage src={""} alt="Avatar" />
                      <AvatarFallback className="bg-slate-800 text-white">ME</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" className="h-9">
                        Changer
                      </Button>
                      <Button type="button" variant="ghost" className="h-9">
                        Retirer
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" placeholder="Jean" className="w-full" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" placeholder="Dupont" className="w-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5 min-w-0">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="exemple@domaine.com" className="w-full" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" type="tel" placeholder="+225 07 00 00 00" className="w-full" />
                    </div>
                  </div>

                  {/* À propos */}
                  <div className="space-y-1.5">
                    <Label htmlFor="bio">À propos</Label>
                    <Textarea id="bio" placeholder="Courte description…" className="w-full" />
                  </div>

                  {/* Rôle (placé juste après À propos) */}
                  <div className="space-y-1.5">
                    <Label>Rôle</Label>
                    <Select defaultValue="manager">
                      <SelectTrigger className="w-full sm:w-60">
                        <SelectValue placeholder="Choisir un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrateur</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="user">Opérateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bouton Enregistrer (après Rôle) */}
                  <div className="flex w-full sm:justify-end">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={savingProfile}
                    >
                      {savingProfile ? "Enregistrement…" : "Enregistrer"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>Protégez l’accès à votre compte</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSave(async () => {/* call API */}, setSavingSecurity);
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                      <Input id="currentPassword" type="password" className="w-full" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <Input id="newPassword" type="password" className="w-full" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input id="confirmPassword" type="password" className="w-full" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-between">
                    <div className="flex items-center gap-3">
                      <Switch id="2fa" />
                      <Label htmlFor="2fa">Activer la double authentification</Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={savingSecurity}
                    >
                      {savingSecurity ? "Mise à jour…" : "Mettre à jour"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Colonne droite */}
          <div className="space-y-4 sm:space-y-6">
            {/* Notifications */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Choisissez ce que vous souhaitez recevoir</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSave(async () => {/* call API */}, setSavingNotif);
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium leading-tight">Alertes livraisons</p>
                        <p className="text-sm text-muted-foreground truncate">
                          Statuts (programmée, en cours, livrée, retard)
                        </p>
                      </div>
                      <Switch id="notif-delivery" />
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium leading-tight">Rapports</p>
                        <p className="text-sm text-muted-foreground truncate">
                          Disponibilité de nouveaux rapports
                        </p>
                      </div>
                      <Switch id="notif-reports" />
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium leading-tight">Stocks</p>
                        <p className="text-sm text-muted-foreground truncate">
                          Seuil bas / ruptures
                        </p>
                      </div>
                      <Switch id="notif-stock" />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={savingNotif}
                  >
                    {savingNotif ? "Enregistrement…" : "Enregistrer"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Affichage & Système (Langue + Thème) */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Affichage & Système</CardTitle>
                <CardDescription>Personnalisez votre expérience</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSave(async () => {/* call API */}, setSavingApp);
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <Label>Thème</Label>
                      <Select defaultValue="system">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisir un thème" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Clair</SelectItem>
                          <SelectItem value="dark">Sombre</SelectItem>
                          <SelectItem value="system">Système</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label>Langue</Label>
                      <Select defaultValue="fr">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisir la langue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={savingApp}
                  >
                    {savingApp ? "Application…" : "Appliquer"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Danger zone */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Zone sensible</CardTitle>
                <CardDescription>Actions irréversibles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-md border p-3 sm:p-4">
                  <p className="font-medium">Désactiver mon compte</p>
                  <p className="text-sm text-muted-foreground">
                    Votre accès sera suspendu jusqu’à réactivation par un administrateur.
                  </p>
                  <Button variant="destructive" className="mt-3 w-full sm:w-auto">
                    Désactiver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
