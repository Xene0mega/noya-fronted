// src/components/Protected.tsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { restoreSession, fetchMe } from "@/lib/auth";

/**
 * Protected wrapper:
 * - restoreSession() configure axios si token dans localStorage
 * - optionnellement appelle fetchMe() pour valider le token et recharger le user
 * - affiche un loader pendant la vérification
 */
export default function Protected({
  children,
  requireFetch = true, // si true on appelle /auth/me pour valider le token
}: {
  children: JSX.Element;
  requireFetch?: boolean;
}) {
  const [status, setStatus] = useState<"checking" | "ok" | "unauth">("checking");
  const location = useLocation();

  useEffect(() => {
    // 1) restore token from localStorage into axios headers
    restoreSession();

    // 2) if we want, hit /auth/me to validate token & refresh local user
    if (requireFetch) {
      (async () => {
        try {
          const u = await fetchMe();
          if (u) setStatus("ok");
          else setStatus("unauth");
        } catch {
          setStatus("unauth");
        }
      })();
    } else {
      // quick check: existance d'un token (fallback)
      const token = localStorage.getItem("token") ?? localStorage.getItem("noya_token");
      setStatus(token ? "ok" : "unauth");
    }
  }, [requireFetch]);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* loader simple */}
        <div>Vérification de la session…</div>
      </div>
    );
  }

  if (status === "unauth") {
    // redirect to login and keep current path in state so we can redirect back after login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
