import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", ".next-app/**", "node_modules/**", "tools/**", "test-results/**"]),
  {
    rules: {
      "no-undef": "error",
      // The migrated GSAP scenes intentionally use imperative refs and effect-based initialization.
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "react-hooks/purity": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/static-components": "off",
      "react-hooks/incompatible-library": "off",
      "@next/next/no-img-element": "off",
    },
  },
]);
