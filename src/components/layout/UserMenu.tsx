import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMe, logout, ping } from "@/lib/auth";
import type { AuthUser } from "@/lib/auth";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Settings, User as UserIcon } from "lucide-react";

const USER_KEY = "noya_user";

const ROLE_LABEL: Record<number, string> = {
  1: "Admin",
  2: "Manager",
  3: "Opérateur",
};

function initialsFrom(user: AuthUser): string {
  const base = user.name || user.email || "";
  const parts = base.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return base.slice(0, 2).toUpperCase();
}

export default function UserMenu() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const role = useMemo(() => {
    if (!user?.role_id) return undefined;
    return ROLE_LABEL[user.role_id] ?? `Rôle ${user.role_id}`;
  }, [user?.role_id]);

  useEffect(() => {
    fetchMe()
      .then((u) => {
        if (u) {
          setUser(u);
          localStorage.setItem(USER_KEY, JSON.stringify(u));
        }
      })
      .catch(() => {});
    const id = window.setInterval(() => ping().catch(() => {}), 60_000 * 5);
    return () => window.clearInterval(id);
  }, []);

  const onLogout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await logout();
    } finally {
      setBusy(false);
      navigate("/login", { replace: true });
    }
  };

  if (!user) return null;

  const initials = initialsFrom(user);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground hidden sm:inline">Mon Compte</span>

      {role && (
        <Badge className="bg-slate-900 text-white hover:bg-slate-900/90 rounded-full px-3">
          {role}
        </Badge>
      )}

      {user.status === "active" ? (
        <Badge className="bg-emerald-600 text-white hover:bg-emerald-600/90 rounded-full px-3">
          Actif
        </Badge>
      ) : (
        <Badge className="bg-rose-600 text-white hover:bg-rose-600/90 rounded-full px-3">
          Inactif
        </Badge>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 px-2 gap-2">
            <div className="relative">
              <Avatar className="h-9 w-9 ring-2 ring-primary/10">
                <AvatarImage src={undefined} alt={user.name} />
                <AvatarFallback className="bg-slate-800 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel className="space-y-1">
            <div className="text-sm font-medium leading-none">
              {user.name || user.email}
            </div>
            <div className="text-xs text-muted-foreground truncate">{user.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              navigate("/profile"); // ⬅️ go to Profile
            }}
            className="cursor-pointer"
          >
            <UserIcon className="mr-2 h-4 w-4" />
            Profil
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              navigate("/settings");
            }}
            className="cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              onLogout();
            }}
            className="text-red-600 focus:text-red-600 cursor-pointer"
            disabled={busy}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {busy ? "Déconnexion…" : "Se déconnecter"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}  