import { createModuleFederationConfig } from '@module-federation/vite';

export default createModuleFederationConfig({
  name: 'checkout',
  manifest: true,
  filename: 'remoteEntry.js',
  exposes: {
    './CartScreen': './src/features/CartScreen.tsx',
  },
  shared: {
    react: { singleton: true, import: false, eager: true },
    'react/': { singleton: true, import: false, eager: true },
    'react-dom': { singleton: true, import: false, eager: true },
    '@tanstack/react-router': { singleton: true, import: false, eager: true },
    '@cart-web-vite/shared/hooks/use-cart': { singleton: true, import: false, eager: true }
  },
});