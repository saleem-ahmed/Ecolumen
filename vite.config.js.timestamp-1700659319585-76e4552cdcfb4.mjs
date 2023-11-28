// vite.config.js
import { defineConfig } from "file:///F:/gis-frontend/node_modules/vite/dist/node/index.js";
import react from "file:///F:/gis-frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()]
});
export {
  vite_config_default as default
};

