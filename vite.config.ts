import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// `base` must match the GitHub Pages path. Set VITE_BASE in CI for the repo
// name (e.g. "/djtanaka/"). For local dev or a custom domain, defaults to "/".
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
});
