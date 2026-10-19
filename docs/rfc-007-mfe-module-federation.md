# RFC 007: Transição para Micro Frontend via Module Federation

* **Status: Implementada.** O fluxo base foi concluído. A evolução do projeto segue na [RFC 008](./rfc-008-poc-ci-cd.md).
* **Data:** 03-10-2026

---

### 1. Objetivo / Problema
* Implantar a aplicação no bucket da AWS S3 com rotinas automatizadas.
* **Objetivo:** Usar CI/CD com GitHub Actions, workflows, jobs e actions para publicar a aplicação no bucket da AWS S3 ao enviar o código para a branch `main`. Link com descrição: [Acessar aplicação publicada](https://d110jenfqnqifl.cloudfront.net/).

### 2. Solução Proposta (Arquitetura e Contratos)
* **PoC:**
  Objetivo é o fluxo mínimo funcional e automatizado usando secrets da AWS. Foi publicado somente a app-shell para validar o fluxo de CI/CD.

* **CloudFront:** A aplicação é servida via CDN para evitar acessar diretamente o bucket e reduzir a latência de rede para o usuário.

### 3. Decisões e Aprendizados
* **Escolher actions do Github:** Para encontrar actions basta utilizar o site Marketplace do Github e para escolher as ações corretamente deve tratá-las como dependências de terceiros tomando os devidos cuidados.

* **Cache:** Utilizar cache para pula a etapa de instalação quando não há mudançã no package.lock.

* **Versões estáticas:** Para evitar instalações indevidas que causem bugs no lock file utilizar versões estáticas e específicas.