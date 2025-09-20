// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
// ...
import Profile from "./pages/Profile"; 
import Index from "./pages/Index";
import Acteurs from "./pages/Acteurs";
import Precommandes from "./pages/Precommandes";
import Livraisons from "./pages/Livraisons";
import Stocks from "./pages/Stocks";
import Rapports from "./pages/Rapports";
import Settings from "./pages/settings";
import NotFound from "./pages/NotFound";
import Login from "@/pages/Login";

const queryClient = new QueryClient();

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const isAuthed = !!localStorage.getItem("token");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* public */}
          <Route
            path="/login"
            element={isAuthed ? <Navigate to="/" replace /> : <Login />}
          />

          {/* privées */}
          <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
           <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} /> {/* ⬅️ NEW */}

           <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
          <Route path="/acteurs" element={<RequireAuth><Acteurs /></RequireAuth>} />
          <Route path="/precommandes" element={<RequireAuth><Precommandes /></RequireAuth>} />
          <Route path="/livraisons" element={<RequireAuth><Livraisons /></RequireAuth>} />
          <Route path="/stocks" element={<RequireAuth><Stocks /></RequireAuth>} />
          <Route path="/rapports" element={<RequireAuth><Rapports /></RequireAuth>} />

          {/* fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
