# 📄 RFC 001: Fluxo de Carrinho de Compras

* **Status: Implementada.** O fluxo base foi concluído. A evolução do projeto segue na [RFC 002](./rfc-002-modular-monolith.md).
* **Data:** 06-09-2026

---

## 1. Problema & Contexto

### O Problema
Fornecer uma **estrutura mínima de carrinho de compras** não autenticado para **experimentar diferentes estratégias de gerenciamento de estado e seus tradeoffs**.

### Escopo (In / Out)
* **In-Scope (O que entra):**
  * Mini Carrinho
  * Listagem de Produtos
  * Detalhes do Produto
  * Carrinho de Compras
* **Out-of-Scope (O que NÃO entra nesta etapa):**
  * Localização
  * Busca de Produtos
  * Lista de Produtos Paginada
  * Cadastro e Login do Usuário
  * Checkout
  * Cadastro de Endereço
  * Formas de Pagamento
  * Taxas de Entrega e Serviço
  * Integração com APIs Backend
  * Perfil do Usuário
---

## 2. Solução Proposta

### Wireframe & Design
<img width="743" height="476" alt="image" src="https://github.com/user-attachments/assets/ed8efdee-30ce-45b5-b686-b02ae853d09a" />

### Fluxo & Regras de Negócio
```text
[0. Header] (Layout Principal)
├── Clique no link do Início (Menu) ──> Navega para [1. Lista de Produtos]
├── Clique no link do Carrinho (Menu) ──> Navega para [4. Carrinho]
└── Passe o mouse no Ícone do Carrinho ──> Abre [3. Mini Carrinho]

[1. Lista de Produtos] (/produtos)
└── Clique no Card do Produto ──> Navega para [2. Detalhes do Produto]

[2. Detalhes do Produto] (/produtos/:id)
├── Clique no Botão "Adicionar" ──> Adiciona Item no Estado Global [Carrinho] e muda Seletor [- 1 +] e Botão "Adicionar" para "Preço Total" e Botão "Ver Carrinho"
├── Clique no Botão "Ver Carrinho" ──> Navega para [4. Carrinho]
└── Clique no Seletor [- 1 +] ──> Atualiza quantidade no Estado Local [Produto]

[3. Mini Carrinho] (Hover / Overlay)
├── Mova o mouse para fora ──> Fecha Drawer
├── Clique em "Ver Carrinho" ──> Navega para [4. Carrinho]
├── Clique no Seletor [- 1 +] ──> Atualiza Estado Global [Cart]
└── Clique no "-" quando valor "1" no Seletor [- 1 +] ──> Remove Item do Estado Global [Cart]

[4. Carrinho] (/carrinho)
├── Clique no Seletor [- 1 +] ──> Atualiza Estado Global [Cart]
└── Clique no "-" quando valor "1" no Seletor [- 1 +] ──> Remove Item do Estado Global [Cart]
```
### Decisões Técnicas & Justificativas
* **TanStack Router em vez de React Router:** Adotado para ganhar familiaridade com a ferramenta, validar a DX de rotas tipadas (type-safe routes) e o carregamento de dados integrado.
* **Context API para o Estado do Carrinho:** Optei pela Context API por ser uma solução nativa, simples e suficiente para as necessidades atuais. Mapeei as re-renderizações entre os consumidores do estado — por exemplo, alterações em `items` realizadas pelo `MiniCart` podem re-renderizar `Header`, `ProductDetail` e `Cart`, enquanto alterações realizadas pelo `Cart` podem re-renderizar `Header` e `MiniCart`. Esse comportamento é esperado, mas pode ser evitado com soluções que suportem seletores. Neste momento, o impacto não justifica essa complexidade. **Como otimização pontual**, `React.memo` poderá ser aplicado aos componentes `Item` caso seja identificado impacto relevante de performance.
* **Composição de UI (Compound Components):** Utilizada em `<CartItem>` e `<AddProductActions>` para permitir o reuso do mesmo componente no (`MiniCart`) e na rota principal (`/carrinho`). Também, avaliar impacto no desempenho durante o desenvolvimento.
  
## 3. Especificação Técnica & Contratos

### Estrutura & Componentes

* Header
  * HeaderLeft
    * Menu
      * Início (/produtos)
      * Carrinho (/carrinho)
  * HeaderRight
    * MiniCart-Btn
      * useCart (Consumir totalItems do Context API)
   
  * MiniCart (Feature)
    * useCart (Consumir items, totalPrice, updateItem e removeItem do Context Cart)
    * useCartDispatch(Consumir addItem, removeItem e changeQuantity de Context art)
    * MiniCart.Items
      * MiniCart.Item
        * ProductCard
          * ProductCard.Image
          * ProductCard.Title
          * ProductCard.Price
          * QuantityControl
    * MiniCart.Summary
      * ViewTotalPrice
	    * TotalPrice
	    * ViewCartBtn
        
* ProductList (Página)
  * useProducts()
  * useCart()
  * useCartDispatch(Consumir addItem, removeItem e changeQuantity de Context art)
  * ProductCard (Envolvido por Link e UL)
    * ProductCard.Image
    * ProductCard.Title
    * ProductCard.Price

* ProductDetail (Página)
  * useCart (Consumir getCartItem do Contexto Cart)
  * useProduct()
  * useCartTotalPrice()
  * useCartDispatch(Consumir addItem de Context art)
  * ProductDetail.Item
    * ProductCard
	  * ProductCard.Image
	  * ProductCard.Title
	  * ProductCard.Price
  * ProductDetail.Summary
  	* AddToCart
      * QuantityControl
      * AddToCartBtn
        * TotalPrice
	* ViewTotalPrice
      * TotalPrice
      * ViewCartBtn
   
* Cart (Página)
  * useCart (Consumir items do Context Cart)
  * useCartDispatch(Consumir addItem, removeItem e changeQuantity de Context art)
  * Cart.Items
    * Cart.Item
      * ProductCard
        * ProductCard.Image
	    * ProductCard.Title
	    * ProductCard.Price
	    * QuantityControl
    * Cart.Summary
      * ViewTotalPrice
        * TotalPrice

### Contratos de Props, Interfaces de Estado ou Payloads da API

```typescript
// Components UI

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface NumberFieldProps {
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
}

// Components

export interface ProductCardImageProps {
  src: string;
  alt: string;
}

// Product

export interface ProductModel {
  id: string;
  image: string;
  name: string;
  price: number;
}

// Screen

export interface ProductDetailScreenProps {
  id: string;
}

// Cart State

export interface CartItemModel extends ProductModel {
  quantity: number;
} 

export interface CartState { // UseCartResult
  byId: Record<string, CartItemModel>
  allIds: string[]
}

type CartAction =
  | { type: "ADD_ITEM", payload: CartItemModel }
  | { type: "REMOVE_ITEM", id: string }
  | { type: "CHANGE_QUANTITY", id: string, quantity: number }

export interface CartDispatchContext {
  dispatch: React.Dispatch<CartAction>
}

// Cart Hooks

export type UseCartTotalPriceResult = number;
export type useCartTotalItems = number;
```

## 4. Riscos & Negativos (Trade-offs)

### Débitos Técnicos / Limitações
O foco dessa PoC é reproduzir o fluxo mínimo do carrinho e seu gerenciamento de dados. Por isso, os itens abaixos foram deixados de fora nesse momento.

* Consumo de API Backend
* Pipeline (CI/CD) & Deploy
* Testes Automatizados
* Segurança (XSS e CSP)
* Acessibilidade e Usabilidade

### Pontos de Atenção

* TankStack Router: Aumento da complexidade de implementação devido a ser uma ferramenta nova para mim.
* Context API: Risco de impacto no desempenho nos componente `Header`, `MiniCart`, `ProductDetails` e `Cart` devido as re-renderizações dos consumidores decorrentes de alterações em `items`.

### Alternativas Descartadas

* React Router: Perdeu espaço para outras ferramentas mais modernas que garantem a tipagem das rotas.

## 5. Adendo de Implementação (Changelog)
* **Quantidade de itens no carrinho**: A média de unidades no carrinho varia de [1,4 (Eletrônicos) a 7,3 (Beleza) em 2024](https://www.shopify.com/blog/basket-size). Por isso, fiz a simulação com até 7 itens diferentes.
* **Uso de React.memo**: Em alguns casos, como no componente `ProductDetail`, usar ou não o `memo` apresentou o mesmo desempenho. Usar `memo` no Carrinho ou no Mini Carrinho melhorou o tempo de renderização entre 1,5ms a 2ms mas sem impacto significativo no desempenho que justificasse sua implementação.
* **Decisão final:** Utilizei técnicas para otimizar o desempenho do Context API como separar contextos, separar o componente consumidor em Wrapper e memoizado simulando situações extremas como em um carrinho de compras de supermercado que podem ter de 60 a 80 itens por vez e ecommerces que na página de listagem o produto interage com o estado do carrinho.