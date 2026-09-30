# RFC 002: Transição para Monorepo sem Ferramenta

* **Status: Implementada.** O fluxo base foi concluído. A evolução do projeto segue na [RFC 004](./rfc-004-turborepo.md).
* **Data:** 27-09-2026

---

### 1. Objetivo / Problema
* Refatorar a aplicação atual `cart-web-vite` de um Monolito Modular para um Monorepo Sem Ferramenta.
* **Objetivo:** Separar os módulos em `apps/` e partes reaproveitáveis em `packages/` permitindo que cada pacote defina suas próprias dependências e as aplicações possam ser executadas/desenvolvidas independentemente uma das outras em um único repositório, também escala melhor ao permitir adicionar novos pacotes sem está fisicamente amarrados por padrão.

### 2. Solução Proposta (Arquitetura e Contratos)
* **Estratégia de Pastas:**
  Dentro de `apps/`, os módulos serão convertidos e aplicações individuais e dentro de `packages/` o código reaproveitável:
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

* **Gerenciamento:**
  * O workspace organiza múltiplos pacotes em um único repositório com dependências compartilhadas via links simbólicos no pnpm, evitando duplicação de depedências e forçando cada pacote a declarar explicitamente suas dependências em `package.json`.

### 3. Decisões e Aprendizados
* **Compartilhamento de Provider e Rotas:** Optei por compartilhar as rotas e os provider de carrinho para facilitar rodar aplicações de modo independente. Porém, para garantir a coesão em uma refatoração futura unificaria tudo no mesmo pacote de checkout e as demais aplicações consumiriam diretamente dele.

* **Compartilhamento de tipos:** Os tipos de domínio podem ser compartilhados com toda a aplicação para que ambos os pacotes tenham um contrato explícito e unificado.