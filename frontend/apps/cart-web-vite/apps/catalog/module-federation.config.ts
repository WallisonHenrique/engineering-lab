import { createModuleFederationConfig } from '@module-federation/vite';

export default createModuleFederationConfig({
  name: 'productList',
  manifest: true,
  filename: 'remoteEntry.js',
  exposes: {
    './ProductListScreen': './src/features/ProductListScreen.tsx',
  },
  shared: {
    react: { singleton: true, import: false },
    'react/': { singleton: true, import: false },
    'react-dom': { singleton: true, import: false },
    '@tanstack/react-router': { singleton: true, import: false },
    '@cart-web-vite/shared/hooks/use-cart': { singleton: true, import: false }
  },
});