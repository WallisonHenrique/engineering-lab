# RFC 007: Transição para Micro Frontend via Module Federation

* **Status: Implementada.**
* **Data:** 03-10-2026

---

### 1. Objetivo / Problema
* Refatorar `ProductList` da aplicação `cart-web-vite` para Micro Frontend usando Module Federation.
* **Objetivo:** Permitir compartilhamento de código do `ProducList` em tempo de execução.

### 2. Solução Proposta (Arquitetura e Contratos)
* **Estratégia de composição:**
  O `ProductList` é servido em outra porta e composto na app-shell via Module Federation, ou seja `ProductList` é remote e `app-shell` é o host.

* **Estratégia de comunicação:** A comunicação permanece via Context API entre `app-shell` e `produc-list`.

### 3. Decisões e Aprendizados
* **Única instância:** Para que o `ProductList` tenha acesso ao Contexto criado na `app-shell` é necessário definir as dependências do React e `use-cart-hook` como singleton (única instância).

* **App-shell fornece dependência:** Como a `app-shell` fornece as mesmas dependências que o `product-list` precisa não é necessário importar novamente no remote.