# RFC 006: Transição para Micro Frontend via Proxy

* **Status: Implementada.** O fluxo base foi concluído. A evolução do projeto segue na [RFC 007](./rfc-007-mfe-module-federation.md).
* **Data:** 01-10-2026

---

### 1. Objetivo / Problema
* Refatorar a aplicação atual `cart-web-vite` de um Micro frontend horizontal com iframe para Micro frontend vertical com roteamento via Server Proxy no `cart`.
* **Objetivo:** Permitir deploys independentes do `cart` e integrar ao app-shell via Proxy Reverso atuando como o orquestrador.

### 2. Solução Proposta (Arquitetura e Contratos)
* **Estratégia de composição:**
  A aplicação `cart` vai ser servida em uma porta e unificada com a `app-shell` via Proxy na mesma porta.

* **Estratégia de comunicação e sincronização:** Se comunica com o `mini-cart` via postMessage e seus dados são sincronizados através do localStorage.

### 3. Decisões e Aprendizados
* **Iframe inicializado cedo de mais:** Utilizei uma função `get` ao invés de passar a referência do iframe no `window` para garantir que ao gerenciar os itens do carrinho o iframe já estivesse carregado.

* **Envs, proxy em dev e build:** Permitir testar a aplicação tanto em desenvolvimento e validar como o build se comporta.

* **Main Layout, Header e Menu compartilhados:** Para permitir o compartilhamento com `/carrinho` e centralização do controle dos componentes reutilizados na `app-shell` e `cart`.