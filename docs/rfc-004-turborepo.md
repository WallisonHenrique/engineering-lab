# RFC 004: Transição para Turborepo

* **Status: Implementada.** O fluxo base foi concluído. A evolução do projeto segue na [RFC 005](./rfc-005-mfe-iframe.md).
* **Data:** 28-09-2026

---

### 1. Objetivo / Problema
* Refatorar a aplicação atual `cart-web-vite` de um Monorepo Sem Ferramentas para o Turborepo.
* **Objetivo:** Adicionar o turborepo para aproveitamento de cache das tarefas de ciclo de vida da aplicação. Também, visualizar o gráfico de dependências e adicionar limites aos pacotes.

### 2. Solução Proposta (Arquitetura e Contratos)
* **Estratégia de Pastas:**
  É a mesma estrutura do Monorepo Sem Ferramentas mas adiciona tags aos módulos e pacotes compartilhados para retornar com as definições de limites de arquitetura.
  ```text
  apps/
  ├── checkout/
  ├── catalog/
  └── app-shell/

  packages/
  ├── shared/
  ├── tooling/
  └── ui/
  ```

### 3. Decisões e Aprendizados
* **Gerenciamento de tarefas** O Turborepo permite definir regras para controlar a ordem de execução de tarefas. Um bom exemplo de quando fazer isso é para garantir que os pacotes de dependências sejam compilados primeiro antes dos pacotes que os consomem.