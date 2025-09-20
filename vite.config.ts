import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // URL de l’API (Laravel)
  const target =
    env.VITE_BACKEND_URL || env.VITE_API_URL || "http://192.168.16.103:8000";

  return {
    server: {
      host: "0.0.0.0",        // accessible depuis le réseau local
      port: 8080,
      strictPort: true,
      proxy: {
        "/api":     { target, changeOrigin: true },
        "/sanctum": { target, changeOrigin: true }, // utile si Sanctum/CSRF
      },
    },
    plugins: [react()],
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
  };
});
