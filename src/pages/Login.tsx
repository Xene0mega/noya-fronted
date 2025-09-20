// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import noyaLogo from "@/assets/noya-logo.png";
import { login as authLogin } from "@/lib/auth";

const Login = () => {
  const nav = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await authLogin(email, password); // ← VRAI login (token + user + expires_at)
      try {
        localStorage.setItem("noya_user", JSON.stringify(user)); // utile pour l’UI (UserMenu)
      }  catch (_) {
  // On ignore les erreurs de stockage (ex: quota plein, mode privé…)
}
      toast({ title: "Connexion réussie", description: "Bienvenue dans le système NOYA" });
      nav("/", { replace: true }); // ← redirection dashboard
    } catch (err: unknown) {
      let message = "Erreur de connexion";
      if (typeof err === "object" && err !== null) {
        const maybe = err as {
          response?: { data?: { message?: string; errors?: Record<string, string[]> } };
          message?: string;
        };
        if (maybe.response?.data?.message) message = maybe.response.data.message;
        else if (maybe.response?.data?.errors) {
          message = Object.values(maybe.response.data.errors).flat().join(" ");
        } else if (maybe.message) message = maybe.message;
      } else if (typeof err === "string") {
        message = err;
      }
      toast({ title: "Connexion refusée", description: message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={noyaLogo} alt="NOYA" className="h-12 w-12" />
            <h1 className="text-3xl font-bold text-primary">NOYA</h1>
          </div>
          <p className="text-lg text-muted-foreground">Système de Distribution</p>
        </div>

        <Card className="shadow-lg border-border/50">
          <CardHeader className="space-y-1 text-center pb-4">
            <h2 className="text-2xl font-bold text-primary">Connexion</h2>
            <p className="text-muted-foreground">Accédez à votre espace de gestion</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre-email@noya.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                  autoComplete="current-password"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="rounded border-border" />
                  Se souvenir de moi
                </label>
                <a href="#" className="text-primary hover:text-primary/80 font-medium">
                  Mot de passe oublié ?
                </a>
              </div>

              <Button type="submit" className="w-full h-11 text-base font-medium" disabled={isLoading}>
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <a href="#" className="text-primary hover:text-primary/80 font-medium">
                Contactez votre administrateur
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} NOYA. Tous droits réservés.
        </div>
      </div>
    </div>
  );
};

export default Login;
