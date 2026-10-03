import { createModuleFederationConfig } from '@module-federation/vite';

export default createModuleFederationConfig({
  name: 'productList',
  manifest: true,
  filename: 'remoteEntry.js',
  exposes: {
    './ProductListScreen': './src/features/ProductListScreen.tsx',
  },
  shared: {
    react: { singleton: true },
    'react/': { singleton: true },
    'react-dom': { singleton: true },
    '@tanstack/react-router': { singleton: true },
    '@cart-web-vite/shared/hooks/use-cart': { singleton: true }
  },
  dts: {
    // Aponta para o tsconfig real do app para herdar o JSX e os tipos do Vite automaticamente
    tsConfigPath: './tsconfig.app.json'
  }
});