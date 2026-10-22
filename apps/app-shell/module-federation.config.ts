import { createModuleFederationConfig } from "@module-federation/vite";

export default createModuleFederationConfig({
  name: "app-shell",
  manifest: true,
  remotes: {
    catalog: {
      type: "module",
      name: "catalog",
      entry: "http://localhost:4175/remoteEntry.js",
    },
    checkout: {
      type: "module",
      name: "checkout",
      entry: "http://localhost:4174/carrinho/remoteEntry.js",
    },
  },
  shared: {
    react: { singleton: true, eager: true },
    "react/": { singleton: true, eager: true },
    "react-dom": { singleton: true, eager: true },
    "@tanstack/react-router": { singleton: true, eager: true },
    "@cart-web-vite/shared/hooks/use-cart": { singleton: true, eager: true },
  },
});
