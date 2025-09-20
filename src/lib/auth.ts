// src/lib/auth.ts
import { api, setToken } from "./api";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role_id?: number | null;
  status?: "active" | "inactive";
  last_seen_at?: string | null;
};

const TOKEN_KEY = "noya_token";
const USER_KEY  = "noya_user";
const EXP_KEY   = "noya_token_exp"; // date ISO d’expiration renvoyée par l’API

// Timer module-scope (pas d'any)
let logoutTimer: number | undefined;

/** Persiste le token (localStorage + header axios) */
function saveToken(token: string) {
  setToken(token); // écrit aussi dans localStorage côté api.ts
}

/** Purge le token (localStorage + header axios) */
function clearToken() {
  setToken(null);
  // on nettoie aussi notre timer si présent
  if (logoutTimer !== undefined) {
    window.clearTimeout(logoutTimer);
    logoutTimer = undefined;
  }
}

/** Reprogramme un auto-logout quand on connaît l’expiration ISO du token */
function scheduleAutoLogout(expiresAtISO: string) {
  const ms = new Date(expiresAtISO).getTime() - Date.now();
  // petite marge pour éviter les courses
  const delay = Math.max(0, ms - 2000);

  if (logoutTimer !== undefined) window.clearTimeout(logoutTimer);
  logoutTimer = window.setTimeout(async () => {
    await logout();
    // on force une navigation "propre"
    window.location.replace("/login");
  }, delay);
}

/** Restaure la session après un F5 (token + timer) */
export function restoreSession(): void {
  const t = localStorage.getItem(TOKEN_KEY);
  if (t) setToken(t);

  const exp = localStorage.getItem(EXP_KEY);
  if (exp) scheduleAutoLogout(exp);
}

/** LOGIN: attend { token, user, expires_at } côté backend */
export async function login(
  email: string,
  password: string
): Promise<AuthUser> {
  const { data } = await api.post(
    "/auth/login",
    { email, password },
    { headers: { Authorization: "" } } // pour éviter un vieux Bearer
  );

  const token: string = data?.token ?? data?.access_token;
  const user: AuthUser = data?.user ?? data;
  if (!token) throw new Error("Token manquant dans la réponse du serveur.");

  // 1) token
  saveToken(token);

  // 2) user
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  // 3) expiration (si renvoyée par l'API)
  if (data?.expires_at) {
    localStorage.setItem(EXP_KEY, data.expires_at as string);
    scheduleAutoLogout(data.expires_at as string);
  } else {
    // si ton API ne renvoie pas expires_at, garde juste le token;
    // l’interceptor 401 fera la redirection quand il expirera côté serveur.
    localStorage.removeItem(EXP_KEY);
  }

  return user;
}

/** Récupère le profil (et le met en cache local) ; si 401 → purge locale */
export async function fetchMe(): Promise<AuthUser | null> {
  try {
    const r = await api.get("/auth/me");
    const user: AuthUser = r.data?.user ?? r.data;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  } catch {
    clearToken();
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXP_KEY);
    return null;
  }
}

/** Ping « léger » pour garder l’UI informée (la 401 est gérée par l’interceptor) */
export async function ping(): Promise<boolean> {
  try {
    await api.get("/health");
    return true;
  } catch {
    return false;
  }
}

/** LOGOUT: révoque côté API puis purge tout le local */
export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    // on ignore une éventuelle erreur serveur
  } finally {
    clearToken();
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXP_KEY);
  }
}

/** Lecture locale du user (utile pour pré-afficher le nom dans l’UI) */
export function getLocalUser(): AuthUser | null {
  try {
    const s = localStorage.getItem(USER_KEY);
    return s ? (JSON.parse(s) as AuthUser) : null;
  } catch {
    return null;
  }
}
