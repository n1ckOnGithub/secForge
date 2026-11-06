import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), tanstackStart(), react()],
});
