# RFC 002: Transição para Monólito Modular

* **Status: Em análise.**
* **Data:** 23-09-2026

---

### 1. Objetivo / Problema
* Refatorar a aplicação atual `cart-web-vite` de um monito base para um Monólito Modular.
* **Objetivo:** Isolar as lógicas de domínio centrais (Carrinho e Produtos) dentro do próprio projeto através de organização de pastas e definição de regras de limites. Isso vai evitar **"Big Ball of Mud"** componentes altamente acoplados, dependências confusas e entrelaçadas e preparar o terreno para a futura migração para Monorepo/Micro-frontend.

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
  * Os `modules/` podem importar recursos do `shared/` mas o inverso não é permitido, respeitando a hierarquia das camadas que somente as de cima dependem das de baixo. O `shared/` pode importar recursos internos e os `modules/` só podem importar de si mesmo, bloqueado para os demais. Há uma exceção entre os `modules` para permitir importação de `types/` já que podem ser validados em tempo de build e permite independência dos módulos. Também a `app-shell/` pode importar de `modules/` e consome as rotas a partir de uma interface pública.

### 3. Decisões e Aprendizados
* **Dependency Cruiser:** Foi implementada a lib para definir regras de dependências entre `modules/` e camadas da aplicação. Sua escolha é motivada por ser amplamente utilizada, constatemente atualizada e agnóstica: permitindo usar o *OXlint* ao invés do ESlint. Além disso, permite rastrear dependências circulares e identificar se os recursos são realmente compartilhados.

* **Rotas acopladas aos módulos:** Para garantir independência e evitar sobrecarga de responsabilidade sobre o `app-shell/` as rotas foram exportadas atráves de interace pública dos seus respectivos módulos e o **shell** consome e adicionar o layout na `sharedRootRoute` compartilhada.