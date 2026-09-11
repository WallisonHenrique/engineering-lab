# 📄 RFC 001: Fluxo de Carrinho de Compras

* **Status:** Aprovado
* **Data:** 06-09-2026
* **Autores:** Wallison Henrique
* **Escopo:** cart-web-vite

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
├── Clique no Botão "Adicionar" ──> Adiciona Item no Estado Global [Carrinho] e muda Texto para "Ver Carrinho"
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
* **Context API para Estado do Carrinho:** Optei por Context API por ser uma solução mais simples e atender as necessidades atuais, conforme exemplifico abaixo.
  *  Somente o componente `ProductDetails` que usará o método `getItem` re-renderizar desnecessariamente quando o valor de `items` do `CartStateContextValue` for alterado.
* **Composição de UI (Compound Components):** Utilizada em `<CartItem>` e `<AddProductActions>` para permitir o reuso do mesmo componente no (`MiniCart`) e na rota principal (`/carrinho`).
  
## 3. Especificação Técnica & Contratos

### Estrutura & Componentes

* Header
  * Menu
    * Início (/produtos)
    * Carrinho (/carrinho)
   
  * MiniCart-Btn
    * useCart (Consumir totalItems do Context API)
   
  * MiniCart (Feature)
    * useProduct (Busca/carrega o ProductType com base no id na constante CART)
    * useCart (Consumir items, totalPrice, updateItem e removeItem do Context Cart)
    * Title
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
  * Title
  * ProductCard (Envolvido por Link e UL)
    * ProductCard.Image
    * ProductCard.Title
    * ProductCard.Price

* ProductDetail (Página)
  * useCart (Consumir getCartItem do Contexto Cart)
  * Title
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
  * useCart (Consumir items, totalPrice, updateItem e removeItem do Context Cart)
  * Title
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
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ProductImageProps extends BaseComponentProps {
  src: string;
  alt: string;
}

export interface AddProductQuantityProps extends BaseComponentProps {
  value: number;
  min?: number; // default 1
  max?: number; // default 99
  onChange: (value: number) => void;
}

export interface ProductDetailsProps {
  id: string;
}

export interface ProductModel {
  id: string;
  image: string;
  title: string;
  price: number;
}

export interface UseProductDetailsProps {
  id: string;
}

export type UseProductDetailsResult = ProductModel | null;

export interface CartItemModel extends ProductModel {
  quantity: number;
}

export type CartAction =
  | { type: "ADD_ITEM", item: CartItemModel }
  | { type: "CHANGE_QUANTITY", item: { id: string, quantity: number } }
  | { type: "REMOVE_ITEM", item: { id: string } };

export interface CartState {
  items: CartItemModel[];
}

export interface CartStateContextValue extends CartState {
  totalItems: number;
  totalPrice: number;
}

export interface CartDispatchContextValue {
  dispatch: React.Dispatch<CartAction>;
}

export interface UseCartStateResult extends CartStateContextValue {
  getItem: (id: string) => CartItemModel | undefined;
}
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
* Context API: Risco de impacto no desempenho do `ProductDetails`.

### Alternativas Descartadas

* React Router: Perdeu espaço para outras ferramentas mais modernas que garantem a tipagem das rotas.
