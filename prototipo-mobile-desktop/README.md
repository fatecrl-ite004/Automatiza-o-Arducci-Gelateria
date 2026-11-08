# Arducci · Protótipo mobile de pedidos

Protótipo interativo com 42 telas do cliente e 15 telas do site/administração exportadas do Stitch. Inclui seletor de dispositivos mobile (390 × 844), tablet (820 × 1080) e desktop (100% da área disponível da janela). HTML, CSS e JavaScript, sem dependências de instalação ou etapa de build.

## Colocar no GitHub

1. Extraia o ZIP.
2. Crie um repositório no seu GitHub.
3. Clique em **Add file → Upload files** e envie o conteúdo da pasta extraída, incluindo `index.html`, as telas, os arquivos JavaScript/CSS e a pasta `styles/`.
4. Confirme com **Commit changes**.

Você também pode publicar pelo terminal, dentro da pasta extraída:

```bash
git init
git add .
git commit -m "Adiciona protótipo Arducci"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

## Publicar no GitHub Pages

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch **main**, pasta **/(root)**, e clique em **Save**.
4. Aguarde o GitHub gerar o link.

Os caminhos desta versão são relativos e funcionam no endereço de projeto do GitHub Pages. Coloque `index.html` na raiz do repositório, sem uma pasta extra acima dele. O Pages pode exigir um repositório público, conforme seu plano do GitHub.

## Rodar no computador

Na pasta extraída, execute:

```bash
python -m http.server 8000
```

Abra http://localhost:8000. No Windows, se necessário, use `py -m http.server 8000`.
Use um servidor HTTP para a navegação e o seletor de telas funcionarem corretamente.

## Arquivos principais

- `index.html`, `preview.css`, `preview.js`: apresentação sem barras fixas; Esc abre os controles de fluxo e tamanho; desktop ocupa a janela inteira; mantém a tela atual até a próxima estar pronta, com transição curta e respeito à preferência de reduzir movimento.
- `navigation.js`: navegação compartilhada, pré-carregamento das próximas telas e recursos estáticos, com fallback para navegação normal fora do simulador.
- `admin-0.html`: início compartilhado do site.
- `admin-1.html` a `admin-14.html`: dashboard, login, estoque, KDS, PDV e demais módulos administrativos.
- `admin-header.js`, `styles/admin-header.css`: cabeçalho do Dashboard compartilhado pelas telas administrativas, com status da loja, notificações, configurações, perfil e saída.
- `admin.js`, `admin.css`, `admin-screens.json`: integração e adaptação responsiva do administrador, menu lateral compartilhado em ordem fixa, hambúrguer mobile e confirmação para encerrar sessão.
- `tela-21.html`: apresentação inicial do app.
- `tela-0.html` a `tela-41.html`: telas do protótipo.
- `simulator.js`: navegação por modo (cliente logado ou visitante), cabeçalho/menu compartilhados, sacola, pagamentos e pedidos.
- `control-panel.js`: caixas 7 e 8 do Painel de Controle, documentos e editor visual das 42 telas mobile, com prévia isolada, textos/imagens, ordem/visibilidade de blocos e importação/exportação da configuração.
- `documents.js`: comprovantes e prévias fiscais demonstrativas, configurações do emissor e histórico de recibos do Caixa nesta sessão. Não emite NF-e/NFC-e nem comprova transações bancárias.
- `mobile-customization.js`: aplica personalizações salvas no navegador às telas reais; mantém a prévia sem gravar ou alterar pedidos. Alterações visuais não substituem regras de preço, autenticação ou pagamento.
- `cashier.js`, `vendor/qrcode.js`: etapas de PIX de demonstração e CPF para nota fiscal, escolha de Máquina 1/2/3 para cartões, recebimento em dinheiro e comanda digital pendente com dados preenchidos. QR não realiza cobrança PIX real; não há emissão fiscal ou integração com máquinas.
- `native-payment.js`: liga os controles das telas originais de checkout, PIX, débito e crédito/VR à sacola e ao acompanhamento. Nome e WhatsApp são opcionais para visitantes. Cada pedido recebe uma comanda automática no resumo, usada na identificação quando o visitante não preenche dados pessoais. Cliente e visitante informam o número da mesa ao escolher entrega à mesa.
- `mobile-products.js`, `gelato-flavors.json`: escolha de sabores com imagem e nome, limites por produto e padronização das imagens e botões.
- `order-cancellation.js`: cancelamento com motivo apenas no status Pendente, para cliente e visitante; após o preparo orienta atendimento no caixa e não simula estorno automático.
- `native-cart.js`: conecta as sacolas originais aos produtos, quantidades, observações e pagamento.
- `acai.js`: seleção de tigela, tamanho, barca, base e extras do açaí.
- `assets/customer-avatar.jpg`: foto local usada no cliente de demonstração.
- `assets/material-symbols-outlined.ttf`: fonte local dos ícones do cliente, com licença incluída na pasta `assets`.
- `simulator.css`: ajustes de layout e componentes da simulação.
- `screens.json`: nomes das telas no seletor.
- `styles/`: CSS compilado das telas originais, pronto para uso.

## Como testar

A apresentação abre sem barras fixas. Pressione **Esc** para abrir os controles e escolher **Início**, **Cliente**, **Administrador**, **Mobile**, **Tablet** ou **Desktop**. No login administrativo, selecione **Administrador** ou **Funcionários** e clique em **Entrar no Sistema**. No site, **Peça aqui já** abre o login do cliente.

Você pode abrir diretamente `?device=desktop`, `?device=mobile` ou `?device=tablet` depois do endereço do seu GitHub Pages. Exemplo: `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/?device=desktop`.

No login administrativo, o perfil Funcionário abre o Dashboard com o cabeçalho Funcionário Arducci. Caixa, Clientes, Funcionários, Financeiro, Painel de controle e Relatórios ficam bloqueados, com cadeado. O Administrador mantém o acesso completo. Essas permissões são parte da simulação no navegador, sem autenticação de servidor.

O cliente logado usa as telas com foto e botão Sair. O visitante deve escolher **Continuar como visitante** ou **Pedir Online sem Cadastro** e pode pagar por PIX ou enviar o pedido para recebimento em dinheiro no Caixa. O botão **Peça Já** abre o login. Para clientes logados, o menu **Perfil** abre o perfil Cliente Arducci; no modo visitante, esse item fica desativado, sem navegação; o perfil Novo Cliente é acessado no fluxo de cadastro. Nas configurações do perfil, a opção **Modo Escuro** abre uma prévia nas telas existentes com os botões **Manter** e **Cancelar**. Cancelar restaura a aparência anterior; Manter confirma somente a simulação atual, sem gravar preferência global de conta. O cadastro usa o nome de exemplo **Cliente Arducci** e a tela de confirmação não exibe foto. O menu **Início** mantém o catálogo do modo ativo; **Sair** encerra a sessão e volta ao site inicial.

No fluxo do cliente, entre como visitante ou cliente de demonstração, escolha produtos, personalize, revise a sacola e simule o pagamento. Na tela de pedidos, avance o preparo até a entrega. No Painel de Controle, a caixa **Sistema do cliente · Mobile** permite explorar e personalizar as 42 telas em uma prévia isolada. No Acompanhamento de Pedidos (KDS), os pedidos simulados do cliente aparecem e podem avançar até a entrega no mesmo navegador.

## Limites da demonstração

Login, cadastro e pagamentos são fictícios. Não há backend, autenticação real, integração bancária nem envio de mensagens. Os dados do cliente cadastrado ficam em `localStorage`. Visitantes usam apenas `sessionStorage` nesta aba: dados, pedido e mensagens são apagados ao encerrar o acompanhamento, fechar a aba ou após 30 minutos sem atividade. A sessão administrativa de demonstração fica em `sessionStorage`. No acompanhamento do visitante, avaliação e chat de demonstração ficam dentro do pedido e exigem um pedido existente. As mensagens ficam somente no navegador. Os dados ilustrativos dos módulos administrativos não são registros reais; os controles nativos das telas permanecem demonstrativos. As mudanças de status dos pedidos feitos pelo cliente são compartilhadas no mesmo navegador. O código não armazena senhas.

Imagens e fontes do protótipo original usam URLs externas e precisam de internet. Os arquivos de código e estilos estão incluídos. O login privado do ChatGPT pertence à hospedagem Sites e não acompanha esta exportação; a visibilidade no GitHub Pages depende das configurações do GitHub.

Os fluxos foram verificados por testes de interação no DOM; a revisão visual em navegador permanece pendente.
