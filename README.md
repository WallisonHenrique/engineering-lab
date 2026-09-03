# Engineering Lab

## 1. Escopo & Desafios Técnicos
Laboratório prático focado no estudo, implementação e validação de arquiteturas de alta escala para os setores de **E-commerce e Fintechs**. 

O objetivo é exercitar decisões em cenários de **alta disponibilidade, alta performance e alta disponibilidade**, cobrindo tópicos como monorepo, micro frontends, estratégias de renderização, segurança, observabilidade, estratégias de cache, ci/cd, cloud, consistência de dados, resiliência e análise crítica de trade-offs.

## 2. Estrutura do Repositório & PoCs
O repositório utiliza uma estrutura de **Monorepo leve (PNPM Workspaces + Docker Compose)** desenhada para isolar cada desafio técnico em Provas de Conceito (PoCs) independentes.

* **Isolamento de Problemas:** Cada pasta em `/frontend` e `/backend` resolve um contexto de problema, sem poluir a solução com código de suporte.
* **Agilidade no Desenvolvimento:** Infraestrutura centralizada via Docker Compose (APIs de apoio, bancos) para execução unificada.
* **Facilidade para Avaliação:** Permite rodar e auditar cada hipótese técnica de forma independente com comandos diretos, sem necessidade de rotinas complexas de setup.

## 3. Índice de PoCs & Execução

| Módulo / PoC | Problema / Desafio Validado | Abordagem & Trade-offs | Comando |
| :--- | :--- | :--- | :--- |
| **`[Em desenvolvimento]`** | Estrutura inicial do repositório e ambiente de apoio. | PNPM Workspaces + Docker Compose | `make setup` |

### Execução Rápida
```bash
make setup      # Sobe a infraestrutura de apoio (Docker) e dependências
make dev-cart   # Executa a PoC selecionada no frontend e backend
