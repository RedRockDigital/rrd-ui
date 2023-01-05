import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "rrd-ui",
            formats: ["es", "umd"],
            fileName: (format) => `rrd-ui.${format}.js`,
        },
    },
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
