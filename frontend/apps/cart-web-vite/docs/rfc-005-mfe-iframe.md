# RFC 002: Transição para Monorepo sem Ferramenta

* **Status: Implementada.**
* **Data:** 30-09-2026

---

### 1. Objetivo / Problema
* Refatorar a aplicação atual `cart-web-vite` de um Monorepo com Turborepo para Micro frontend no `mini-cart`.
* **Objetivo:** Permitir deploys independentes do `mini-cart` e integrar ao app-shell em tempo de execução via iframe.

### 2. Solução Proposta (Arquitetura e Contratos)
* **Estratégia de composição:**
  Inserir a aplicação `mini-cart`, disponibilizada em uma porta diferente, no dropdown de mini carrinho no `Header` via iframe.

* **Estratégia de comunicação:** Por ser servido em outra porta e dentro de um iframe vou utilizar postMessage para comunicação entre `app-shell` e `mini-cart`.

* **Sincronização dos dados:** Nesse momento, não foi implementado sincronização de dados entre as apps e para garantir o acesso aos dados desde o primeiro momento o `mini-cart` é renderizado junto com a `app-shell`. Para controle de visibilidade `open/close` é utilizado a propriedade `display: none` do CSS. 

### 3. Decisões e Aprendizados
* **Segurança:** Foi implementado verificação da origem do remetente, vericação dos tipos das mensagens e origem alvo para garantir que os agentes envolvidos na troca são autorizados e evitar sequestro de iframe.

* **Sincronização:** É necessário implementar sincronização para quando a aplicação dentro do iframe depende de dados que foram adicionados e modificados quando a app não estava renderizada na tela. Uma solução alternativa mas pouca performática é manter o iframe renderizado e escondido usando propriedades CSS.

* **Dificuldade de isolamento dos módulos:** Quando um módulo/app faz parte da interface de componentes globais exige que os demais módulos/apps precisem importá-lo caso use a estratégia de composição de micro frontends baseada em roteamento de proxy no servidor. Por exemplo, o minicarrinho no header.

* **Divisão vertical com iframe:** É possível substituir uma rota completa inserindo um iframe em toda a página ao invés de usar roteamento via proxy. Uma boa alternativa é utilizar a `app-shel` como uma ponte de comunicação entre diferentes mfes e usar um slot no conteúdo da página para adicionar o iframe naquela áreas específica ao invés de em toda a rota.

* **Comunicação entre apps:** Evite ao máximo a comunicação entre diferentes apps/módulos porque aumenta a complexidade e chances de bugs em sistemas distribuídos.