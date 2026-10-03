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
    react: { singleton: true, eager: true, },
    'react/': { singleton: true, eager: true, },
    'react-dom': { singleton: true, eager: true, },
    '@tanstack/react-router': { singleton: true, eager: true, },
    '@cart-web-vite/shared/hooks/use-cart': { singleton: true }
  },
});