import { createModuleFederationConfig } from '@module-federation/vite';

export default createModuleFederationConfig({
  name: 'host_app',
  manifest: true,
  remotes: {
    productList: {
      type: 'module',
      name: 'productList',
      entry: 'http://localhost:4175/remoteEntry.js',
    },
  },
  shared: {
    react: { singleton: true },
    'react/': { singleton: true },
    'react-dom': { singleton: true },
    '@tanstack/react-router': { singleton: true },
    '@cart-web-vite/shared/hooks/use-cart': { singleton: true }
  },
});