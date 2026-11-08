
# Requisitos Funcionais

## Sistema de Gestão Integrada de Gelaterias

Os requisitos funcionais definem as funcionalidades que o sistema deverá oferecer aos usuários, contemplando os processos de atendimento ao cliente, gerenciamento de pedidos, operações internas e administração.

### 1. Módulo do Cliente

| ID | Requisito funcional | Descrição |
|---|---|---|
| RF001 | Cadastrar cliente | O sistema deve permitir que o cliente realize seu cadastro, informando seus dados pessoais e de contato. |
| RF002 | Acessar o sistema | O sistema deve permitir que o cliente acesse sua conta utilizando suas credenciais ou realize um pedido como visitante. |
| RF003 | Consultar cardápio | O sistema deve permitir que o cliente consulte os produtos disponíveis, organizados por categorias e conforme sua disponibilidade. |
| RF004 | Personalizar produto | O sistema deve permitir que o cliente selecione sabores, complementos e outras opções disponíveis para o produto. |
| RF005 | Gerenciar cesta | O sistema deve permitir que o cliente adicione, remova e altere a quantidade dos produtos selecionados. |
| RF006 | Finalizar pedido | O sistema deve permitir que o cliente revise e confirme os produtos selecionados e o valor total do pedido. |
| RF007 | Selecionar forma de pagamento | O sistema deve permitir que o cliente selecione a forma de pagamento do pedido, entre PIX, cartão ou dinheiro, e informe o local de consumo e observações. |
| RF008 | Gerar comanda | O sistema deve gerar uma comanda para pedidos com pagamento em cartão ou dinheiro e orientar o cliente a dirigir-se ao caixa para finalizar o pedido. |
| RF009 | Cancelar pedido | O sistema deve permitir que o cliente cancele o pedido enquanto ele não tiver sido pago ou iniciado. |
| RF010 | Solicitar cancelamento de pedido | Para pedidos já pagos ou em preparação, o sistema deve informar ao cliente que solicite o cancelamento ao caixa. |

### 2. Módulo Operacional — Funcionário

| ID | Requisito funcional | Descrição |
|---|---|---|
| RF011 | Acessar área operacional | O sistema deve permitir que o funcionário acesse o sistema informando suas credenciais de login. |
| RF012 | Acompanhar fila de pedidos | O sistema deve exibir um painel em tempo real para que o funcionário visualize os pedidos recebidos, organizados por ordem de chegada e status. |
| RF013 | Atualizar status do pedido | O sistema deve permitir que o funcionário atualize o andamento do pedido (Pendente, Em preparo, Pronto, Finalizado) para que o cliente acompanhe. |
| RF014 | Processar pagamentos físicos | O sistema deve permitir que o funcionário confirme o recebimento de pagamentos realizados diretamente no caixa para pedidos presenciais. |
| RF015 | Atualizar disponibilidade de balcão | O sistema deve permitir que o funcionário atualize de forma ágil se um produto esgotou no salão, refletindo essa indisponibilidade no cardápio do cliente. |

### 3. Módulo Administrativo

| ID | Requisito funcional | Descrição |
|---|---|---|
| RF016 | Gerenciar usuários e permissões | O sistema deve permitir que o administrador cadastre, edite, inative e defina os níveis de acesso de todos os colaboradores. |
| RF017 | Gerenciar cardápio e precificação | O sistema deve permitir que o administrador realize o cadastro de novos produtos, edite descrições e atualize preços. |
| RF018 | Registrar movimentação de estoque | O sistema deve permitir que o administrador registre entradas de fornecedores e saídas manuais, como perdas e ajustes, no estoque. |
| RF019 | Configurar alertas de estoque | O sistema deve permitir que o administrador defina o nível de estoque mínimo para cada insumo e exiba alertas quando a reposição for necessária. |
| RF020 | Autorizar cancelamentos | O sistema deve permitir que o administrador avalie e autorize solicitações de cancelamento de pedidos já iniciados ou pagos, registrando o motivo. |
| RF021 | Consultar relatórios e faturamento | O sistema deve permitir que o administrador gere relatórios de produtos mais vendidos e movimentações. |

---

## Rastreabilidade dos requisitos

Os requisitos funcionais servirão de referência para:

- Diagramas de casos de uso;
- Fluxogramas dos processos;
- Diagramas de arquitetura;
- Modelagem do banco de dados;
- Desenvolvimento e validação das funcionalidades;
- Testes do sistema.

---

**Fonte:** Elaborado pelos autores com auxílio de inteligência artificial (2026).
