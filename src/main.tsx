// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { restoreSession, fetchMe } from "@/lib/auth";
import "./index.css";

async function bootstrap() {
  // 1) Restaure le token & reprogramme l’auto-logout si on avait EXP_KEY
  restoreSession();

  // 2) Essayez de rafraîchir le profil (optionnel, pratique pour l’UI)
  try {
    await fetchMe();
  } catch {
    // ignore
  }

  // 3) Monte l’app
  const container = document.getElementById("root");
  if (!container) throw new Error("Root element introuvable");

  createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

bootstrap();
