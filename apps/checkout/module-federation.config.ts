import { createModuleFederationConfig } from "@module-federation/vite";

export default createModuleFederationConfig({
  name: "checkout",
  manifest: true,
  filename: "remoteEntry.js",
  exposes: {
    "./CartScreen": "./src/features/CartScreen.tsx",
    "./MiniCart": "./src/features/MiniCart.tsx",
  },
  shared: {
    react: { singleton: true, import: false },
    "react/": { singleton: true, import: false },
    "react-dom": { singleton: true, import: false },
    "@tanstack/react-router": { singleton: true, import: false },
    "@cart-web-vite/shared/hooks/use-cart": {
      singleton: true,
      import: false,
    },
  },
});
