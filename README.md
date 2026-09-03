# Engineering Lab

> Laboratório prático focado na validação de arquiteturas de alta escala (desempenho, observabilidade e tolerância a falhas) para **E-commerce & Fintechs**.

## Arquitetura do Repositório
Monorepo leve (**Workspaces + Docker Compose**) projetado para isolar cenários complexos em PoCs independentes:
* **Isolamento Total:** Cada pasta resolve um problema técnico sem acoplamento.
* **Infra Centralizada:** Serviços de apoio (bancos, APIs, caches) sobem via Docker.
* **Execução Direta:** Setup e testes isolados em 1 comando.

## 🚀 Provas de Conceito (PoCs)

| Módulo / PoC | Escopo & Domínio | Documentação Interna |
| :--- | :--- | :--- |
| **`cart`** | Fluxo para carrinho de compras. | `Em andamento` |