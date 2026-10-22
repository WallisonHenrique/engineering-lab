# RFC 010: Pipeline Enterprise de CI/CD Segura e Econômica

- **Status: Implementada.**
- **Data:** 22-10-2026

---

### 1. Objetivo / Problema

- Atualmente, a pipeline no GitHub Actions possui vulnerabilidades de segurança (chaves estáticas expostas, ações sem versão fixa) e alto custo operacional devido a builds duplicados rodando em paralelo e falta de cache na instalação de pacotes.
- **Objetivo:**
  - Implementar o princípio de menor privilégio na infraestrutura de CI/CD.
  - Reduzir o custo financeiro com minutos gastos no GitHub Actions.
  - Garantir estabilidade proibindo commits diretos na branch `main`.

### 2. Solução Proposta (Arquitetura e Contratos)

- **Autenticação via OIDC:** Substituição de chaves de longa duração da AWS por tokens temporários via OpenID Connect.
- **Ações Pinadas por SHA:** Bloqueio das actions por hash fixo (ex: uses: actions/checkout@3df4...) para evitar ataques de supply chain.
- **Governança:** Bloqueio de commits diretos na main. Código só entra via Pull Request após validação com sucesso dos testes da pipeline.
- **Gerenciamento de Concorrência:** Uso de concurrency com cancel-in-progress: true para cancelar builds velhos automaticamente ao subir um novo commit e na main aguardar finalização do deploy para iniciar o próximo.
- **Cache de Dependências:** • Cache de node_modules para reduzir tempo de execução.

### 3. Decisões e Aprendizados

- **Mudança no fluxo de trabalho:** Não poderão mais commitar direto na branch principal, exigindo abertura de PR obrigatoriamente.
- **Manutenção:** Sempre que uma GitHub Action precisar ser atualizada, terá que atualizar manualmente o hash SHA no código da pipeline.
