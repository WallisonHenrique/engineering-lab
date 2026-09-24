# RFC 002: Transição para Monólito Modular

* **Status: Em análise.**
* **Data:** 23-09-2026

---

### 1. Objetivo / Problema
* Refatorar a aplicação atual `cart-web-vite` de um monito base para um Monólito Modular.
* **Objetivo:** Isolar as lógicas de domínio centrais (Carrinho e Produtos) dentro do próprio projeto. Isso vai evitar **"Big Ball of Mud"** componentes altamente acoplados, dependências confusas e entrelaçadas e preparar o terreno para a futura migração para Monorepo/Micro-frontend.

### 2. Solução Proposta (Arquitetura e Contratos)
* **Estratégia de Pastas:**
  Dentro de `src/`, o código será organizado estritamente por módulos de domínio entre as pastas /shared e /modules, e não por funções técnicas (componentes/hooks):
  ```text
  src/
  ├── modules/
  │   ├── checkout/
  │   │   ├── components/  # UI compartilhada entre Carrinho e Mini Carrinho (CartTotalPrice, QuantityControl)
  │   │   ├── features/    # Telas e páginas (MiniCart, Cart)
  │   │   ├── hooks/       # Lógica de estado (useCart, useCartTotalItems, useCartTotalPrice, useCartDispatch)
  │   │   └── types/       # Interfaces centrais do Carrinho (CartItemModel, CartState, CartAction)
  │   └── catalog/
  │       ├── features/    # Telas e páginas (ProductList, ProductDetail)
  │       ├── api/         # Requisições a API Backend (/products, /products/:id)
  │       └── types/       # Interfaces centrais de Produto (ProductModel)
  ├── shared/              # Componentes visuais e helpers genéricos/reutilizáveis (ProductCard, toCurrency)
  ├── mock/                # Simular dados de requisição (data.ts, services.ts)
  ├── styles/              # Estilos globais (global.css)
  ├── routes/              # Rotas (carrinho, produto.$id, index)
  ├── contexts/            # Contextos globais (CartContext)
  └── types/               # Tipos globais (BaseComponentProps)
  ```

* **Regras de Acoplamento:**
  * Componentes dentro de `modules/products/` não podem importar diretamente arquivos internos de `modules/checkout/` sem passar por uma interface pública limpa.

### 3. Decisões e Aprendizados (Preencher durante ou após a implementação)