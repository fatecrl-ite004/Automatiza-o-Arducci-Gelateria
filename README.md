# Arducci Gelateria e Açaiteria - Automação e Gestão

Este repositório contém o código-fonte do Sistema Integrado de Automação e Gestão para a Arducci Gelateria e Açaiteria, desenvolvido como Trabalho de Conclusão de Curso (TCC).

O projeto busca resolver problemas de filas e otimizar o atendimento através de um sistema de autoatendimento via QR Code nas mesas, além de fornecer um painel gerencial robusto para os administradores. O público-alvo inclui os clientes da gelateria, os funcionários de balcão e a administração da loja.

**Status:** 🚧 Em fase de Engenharia de Requisitos, Modelagem de Banco de Dados e Prototipação. O desenvolvimento do código será iniciado em breve.

# Funcionalidades

- Autoatendimento (Clientes): Acesso ao cardápio digital via QR Code, personalização de produtos, carrinho de compras e pagamento integrado via PIX.

- Gestão de Fila (Funcionários): Acompanhamento de pedidos em tempo real e atualização de status (Ex: Em preparo, Pronto).

- Painel Gerencial (Administradores): Operações CRUD de produtos, registro de movimentação de estoque, aprovação de cancelamentos e dashboards com relatórios de vendas.

- Segurança: Autenticação e controle de acesso por níveis de privilégio utilizando tokens JWT.

# Tecnologias utilizadas

O sistema é dividido em uma arquitetura de API RESTful (Back-end) e uma Single Page Application (Front-end).

* Front-end: React.js, Tailwind CSS (Design responsivo e Componentização).

* Back-end: Java SE (LTS), Spring Boot (Controllers, Services, Repositories), Spring Security (Autenticação JWT).

* Banco de Dados: (A definir o SGBD, utilizando JPA/Hibernate).

* Prototipação & Design: Figma.

* Integrações: API de Gateway de Pagamentos para geração de QR Code e webhooks do PIX.

# Pré-requisitos

Para rodar este projeto futuramente, será necessário ter as seguintes ferramentas instaladas:

* Git

* Node.js (Versão 18+ recomendada) e npm (ou pnpm/Yarn) para o Front-end.

* Java JDK (Versão 17 ou 21) para o Back-end.

# Instalação e configuração

(Instruções detalhadas serão adicionadas assim que a base de código for inicializada).

## 1. Obter o código-fonte

```
git clone URL_DO_SEU_REPOSITORIO
cd arducci-gelateria
```

## 2. Instalar as dependências (Front-end)

```
cd frontend
npm install
```

## 3. Configurar o ambiente

Será necessário configurar as variáveis de ambiente (como credenciais do Banco de Dados e chaves da API de pagamento) no arquivo application.properties (Back-end) e .env (Front-end). (Exemplos serão disponibilizados na fase de codificação).

# Execução em ambiente de desenvolvimento

Nota: Os comandos abaixo refletem a estrutura planejada e estarão ativos na fase de desenvolvimento.

## Para iniciar a API (Back-end):
Utilize a sua IDE de preferência (como IntelliJ IDEA ou Eclipse) para rodar o projeto Spring Boot, ou execute via terminal:

```
cd backend
./mvnw spring-boot:run
```

## Para iniciar a Interface (Front-end):

```
cd frontend
npm run dev
```

Acesse no navegador o endereço padrão (geralmente http://localhost:5173/).

# Build para produção

(Processo de build e deploy será documentado nas fases finais do projeto).

## Exemplo esperado para o front-end:

```
cd frontend
npm run build
```

Os arquivos otimizados serão gerados no diretório dist/.

# Aplicação publicada

Ambiente: Atualmente o projeto encontra-se apenas em ambiente local / planejamento. A publicação (deploy) em nuvem será realizada na etapa final do TCC.

# Estrutura do projeto

Estrutura planejada do repositório (Monorepo):
```
arducci-gelateria/
├── backend/                API RESTful (Java / Spring Boot)
│   ├── src/main/java/      Controladores, Serviços, Repositórios e Entidades
│   └── pom.xml             Dependências do Maven
├── frontend/               Interface Web SPA (React.js)
│   ├── src/                Componentes, Páginas, Serviços de API e Estilos (Tailwind)
│   ├── package.json        Dependências do npm
│   └── vite.config.js      Configuração do empacotador
└── README.md               Documentação do projeto
```

# Equipe

| Integrante        | Responsabilidade |
|------------------ | ---------------- |
| Sabrina Clemente |Engenharia de Software e camada de Negócio |
| Luciara Pereira  |Estruturação do Banco de Dados (MER/DER)  |
| Vivian Gomes     |Documentação e camada de presentação |

## Wiki do projeto

Acesse a documentação, a organização das pastas e os links para testar o sistema:

[📚 Abrir a Wiki do projeto](https://github.com/fatecrl-ite004/Automatiza-o-Arducci-Gelateria/wiki)


# Documentação adicional

Os artefatos de engenharia de software elaborados (Diagrama de Casos de Uso, Fluxos de Eventos) e as definições teóricas do TCC estão no nosso [ link do drive ](https://docs.google.com/document/d/1JJkD4QNlmHOATKFr68zNRPv7tgpQ52T5e4_wEQ5-4X0/edit?usp=drivesdk)

### Levantamento de Requisitos

- [Requisitos Funcionais — RF001 a RF021](docs/requisitos/requisitos-funcionais.md)

- [Requisitos Não Funcionais — RNF01 a RNF08](docs/requisitos/requisitos-nao-funcionais.md)

# Casos de uso do TCC

Conteúdo original enviado pela equipe, preservado sem substituir pelas regras posteriores.

1. [Realizar Pedido — Cliente](tabelas/tabela-01.md)
2. [Cancelar Pedido — Cliente](tabelas/tabela-02.md)
3. [Acompanhar Fila e Atualizar Status — Funcionário](tabelas/tabela-03.md)
4. [Processar Pagamento Físico — Funcionário](tabelas/tabela-04.md)
5. [Registrar Movimentação de Estoque — Administrador](tabelas/tabela-05.md)
6. [Autorizar Cancelamentos — Administrador](tabelas/tabela-06.md)

# Modelagem

A equipe enviou uma figura pronta de modelo de dados. Sua referência é preservada em [ Documento Oficial do TCC ](https://docs.google.com/document/d/1JJkD4QNlmHOATKFr68zNRPv7tgpQ52T5e4_wEQ5-4X0/edit?usp=drivesdk)

- [Regras atualizadas e pontos para conciliação](regras-atualizadas.md)
- [Modelo conceitual complementar — proposta](modelo-conceitual-proposto.md)

## Mapeamento das telas

- [Matriz de requisitos e telas](docs/rastreabilidade/mapeamento-telas-requisitos.md)
- [Mapas do Cliente Arducci e do Visitante](docs/rastreabilidade/mapas-cliente-e-visitante.md)

# Arquitetura

- [Arquitetura atual do protótipo](atual.md)
- [Arquitetura prevista para o sistema — proposta](proposta.md)

# Diagramas de fluxos

Cenários do protótipo e propostas explicitadas em cada página.

1. [Jornada de compra — Cliente Arducci](01-jornada-compra-cliente/README.md)
2. [Jornada de compra — Visitante](02-jornada-compra-visitante/README.md)
3. [Acompanhamento de pedido](03-acompanhamento-pedido/README.md)
4. [Cancelamento e avaliação após entrega](04-cancelamento-pedido/README.md)
5. [Processamento de comanda sem dados pessoais](05-comanda-sem-identificacao/README.md)
6. [Mapa de mesas e atendimento](06-mapa-de-mesas/README.md)
7. [Gestão de estoque — insumos e produtos](07-estoque-insumos-produtos/README.md)
8. [Gestão de estoque — gelatos](08-estoque-gelatos/README.md)
=======
- [Requisitos Não Funcionais — RNF01 a RNF08](docs/requisitos/requisitos-nao-funcionais.md)

