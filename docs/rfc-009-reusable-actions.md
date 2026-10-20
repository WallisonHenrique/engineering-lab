# RFC 009: Adicionar ação reutilizável do Github Actions

* **Status: Implementada.**
* **Data:** 19-10-2026

---

### 1. Objetivo / Problema
* Melhor organização do workflow de deploy.
* **Objetivo:** Validar como reaproveitar ações e melhorar a legibilidade do workflow de deploy.

### 2. Solução Proposta (Arquitetura e Contratos)
* **Ação de build:**
  São ações agrupadas que estão compostas no mesmo arquivo e são chamadas de um arquivo separado do workflow principal.

### 3. Decisões e Aprendizados
* **Inputs:** Funcionam como argumentos passados para as ações permitindo personalização para cada necessidade e também aceitam valores padrão.