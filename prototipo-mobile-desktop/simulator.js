(() => {
'use strict';
if(window.self!==window.top)document.documentElement.classList.add('inside-device');
const editing=window.ARDUCCI_MOBILE_EDITOR===true;
const id=window.SCREEN_ID, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function announceFlow(){if(window.parent!==window)window.parent.postMessage({type:'arducci-flow',flow:id===21?'home':'customer'},location.origin)}
announceFlow();window.addEventListener('pageshow',announceFlow);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>Number(n||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const parse=s=>Number((String(s).match(/R\$\s*([\d.,]+)/)||[])[1]?.replace(/\./g,'').replace(',','.')||0);
const CUSTOMER_KEY='arducci-demo-v1',VISITOR_KEY='arducci-visitor-demo-v2',GUEST_MARKER='arducci-guest-storage-v2',VISITOR_TTL=30*60*1000;
const defaults=()=>({cart:[],user:null,orders:[],note:'',receive:'balcao',payment:'PIX'});
const parseStorage=(storage,key)=>{try{return JSON.parse(storage.getItem(key))}catch{return null}};
let customerState=parseStorage(localStorage,CUSTOMER_KEY)||{},guestState=parseStorage(sessionStorage,VISITOR_KEY),guestExpired=false,guestEnded=false;
if(!editing&&guestState&&guestState.expiresAt<=Date.now()){sessionStorage.removeItem(VISITOR_KEY);guestState=null;guestExpired=true}
if(!editing&&!guestState&&!guestExpired&&!customerState.user&&customerState.mode==='visitor'&&!localStorage.getItem(GUEST_MARKER)){
 guestState={...defaults(),...customerState,user:null,mode:'visitor',expiresAt:Date.now()+VISITOR_TTL};sessionStorage.setItem(VISITOR_KEY,JSON.stringify(guestState));localStorage.setItem(GUEST_MARKER,'1');customerState={...defaults(),mode:'visitor'};localStorage.setItem(CUSTOMER_KEY,JSON.stringify(customerState));
}
let state={...defaults(),...(customerState.user?customerState:guestState||(!customerState.user&&customerState.mode==='visitor'?{mode:'visitor'}:customerState))};
if(editing){const guest=[1,2,7,8,9,20,22,24,25,30,32,33,34,37,38].includes(id),item={key:'preview',name:'Gelato artesanal',price:24,qty:1,details:'Exemplo de produto'};state={...defaults(),mode:guest?'visitor':'client',user:guest?null:{name:'Cliente Arducci',isNew:[5,36,40].includes(id)},cart:[item],orders:[{number:1001,comanda:'1001',items:[item],total:24,payment:'PIX',paymentStatus:'paid',step:0,receive:'balcao',created:'mobile-preview'}]}}
if(state.user&&/^(Cliente (Demo|Teste)|Lucas Arducci)$/i.test(state.user.name||''))state.user.name='Cliente Arducci';
function save(){if(editing||guestEnded)return;if(!state.user&&state.mode==='visitor'){state.expiresAt=Date.now()+VISITOR_TTL;sessionStorage.setItem(VISITOR_KEY,JSON.stringify(state));localStorage.setItem(GUEST_MARKER,'1')}else{delete state.expiresAt;localStorage.setItem(CUSTOMER_KEY,JSON.stringify(state))}}
function endVisitorSession(){if(editing)return;guestEnded=true;sessionStorage.removeItem(VISITOR_KEY);sessionStorage.removeItem('arducci-theme-preview');const persistent=parseStorage(localStorage,CUSTOMER_KEY)||defaults();persistent.mode=null;localStorage.setItem(CUSTOMER_KEY,JSON.stringify(persistent));state={...defaults(),mode:null};go(21)}
const modePairs=[[6,34],[35,7],[15,37],[14,22],[11,38],[18,30],[12,2],[27,1],[41,8],[31,32],[28,9],[19,33],[0,25],[29,20],[10,24]];
const loggedOnly=[5,13,16,36,40];
function routeForMode(n){if(editing)return n;const pair=modePairs.find(p=>p.includes(n));if(pair)return pair[state.user?0:1];if(!state.user&&loggedOnly.includes(n))return 17;if(!state.user&&[26,39].includes(n))return 25;return n}
const home=()=>state.user?6:34,cart=()=>state.user?19:33,checkout=()=>state.user?0:25,orders=()=>state.user?10:24;
const navigate=url=>editing?undefined:window.ArducciNavigate?window.ArducciNavigate(url):(location.href=url);
const go=n=>navigate((n===21?'admin-0.html':`tela-${routeForMode(n)}.html`)+'?v=20261108-layout-41');
if(!editing&&guestExpired&&![17,4,3,23,21].includes(id)){endVisitorSession();return}
const canonicalId=routeForMode(id);
if(canonicalId!==id){location.replace(`tela-${canonicalId}.html?v=20261108-layout-41`);return}
if(!state.user){if(!['PIX','Caixa','Dinheiro'].includes(state.payment))state.payment='PIX';if(modePairs.some(p=>p[1]===id))state.mode='visitor'}else state.mode='client';
save();
function logout(){if(!state.user){endVisitorSession();return}state.user=null;state.mode=null;state.payment='PIX';save();go(21)}
const total=()=>state.cart.reduce((a,b)=>a+b.price*b.qty,0), count=()=>state.cart.reduce((a,b)=>a+b.qty,0);
const clean=e=>{if(e.dataset.mobileActionOriginal!==undefined)return e.dataset.mobileActionOriginal;const c=e.cloneNode(true);c.querySelectorAll('.material-symbols-outlined,svg,.sim-count').forEach(x=>x.remove());return c.textContent.replace(/\s+/g,' ').trim()};
let toastTimer;function toast(t){$('#sim-toast')?.remove();const e=document.createElement('div');e.id='sim-toast';e.setAttribute('role','status');e.textContent=t;document.body.append(e);clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.remove(),3200)}
function modal(title,body,buttons=[]){$('.sim-modal')?.remove();const e=document.createElement('div');e.className='sim-modal';e.innerHTML=`<section class="sim-dialog" role="dialog" aria-modal="true" aria-label="${esc(title)}"><button data-close style="float:right;padding:6px" aria-label="Fechar">✕</button><h2>${esc(title)}</h2>${body}<div id="sim-dialog-actions"></div></section>`;document.body.append(e);e.querySelector('[data-close]').onclick=()=>e.remove();e.onclick=x=>{if(x.target===e)e.remove()};for(const [text,fn,secondary]of buttons){const b=document.createElement('button');b.className='sim-btn'+(secondary?' secondary':'');b.textContent=text;b.onclick=()=>{if(fn?.()!==false)e.remove()};e.querySelector('#sim-dialog-actions').append(b)}e.querySelector('button').focus()}
function badge(){const n=count();$$('[id*="badge"],[id="bag-count"],[id="nav-bag-count"],[id="headerCartBadgeCount"]').filter(e=>!/counter|flavor|gelato|items|loyalty/.test(e.id)&&/cart|bag|Cart/.test(e.id)).forEach(e=>{e.textContent=n;e.style.display=n?'':'none'});$$('nav a').filter(e=>/Sacola|Carrinho/.test(clean(e))).forEach(e=>{e.querySelector('.sim-count')?.remove();if(n){const b=document.createElement('span');b.className='sim-count';b.textContent=n;e.append(b)}})}
const toolbar=document.createElement('div');toolbar.className='sim-toolbar';toolbar.innerHTML='<span>PROTÓTIPO · Sem cobranças reais</span><div><button id="sim-home">Site</button><button id="sim-screens">Telas</button><button id="sim-restart">Reiniciar</button></div>';document.body.append(toolbar);
$('#sim-home').onclick=()=>{navigate('admin-0.html')};
$('#sim-screens').onclick=async()=>{const labels=await fetch('screens.json').then(r=>r.json());modal('Explore o protótipo','<p>Acesse qualquer tela do Stitch ou percorra o fluxo pelo cardápio.</p><div class="sim-map">'+labels.map((l,i)=>({l,i})).filter(({i})=>routeForMode(i)===i).map(({l,i})=>`<button data-screen="${i}">${String(i+1).padStart(2,'0')} · ${esc(l)}</button>`).join('')+'</div>');$$('[data-screen]').forEach(e=>e.onclick=()=>go(+e.dataset.screen))};
$('#sim-restart').onclick=()=>modal('Reiniciar simulação?','<p>Isso limpa a sacola, o cliente de demonstração e os pedidos deste navegador.</p>',[['Reiniciar',()=>{localStorage.removeItem(CUSTOMER_KEY);sessionStorage.removeItem(VISITOR_KEY);go(21)}],['Continuar simulando',null,true]]);
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('.sim-modal')?.remove()});
// Capture only navigation and submission; keep Stitch's customization handlers intact.
document.addEventListener('click',e=>{
 const category=e.target.closest('[data-catalog-route]');if(category){e.preventDefault();e.stopImmediatePropagation();go(+category.dataset.catalogRoute);return}
 const el=e.target.closest('button,a,[role="button"],nav div[title]');if(!el||el.closest('.sim-toolbar,.sim-modal,.sim-main'))return;
 if(el.hasAttribute('data-client-profile-disabled')||el.dataset.clientNav==='profile'&&!state.user){e.preventDefault();e.stopImmediatePropagation();return}
 if(el.dataset.clientNav){e.preventDefault();e.stopImmediatePropagation();go(({home:home(),cart:cart(),orders:orders(),profile:state.user?13:17,checkout:checkout(),login:17})[el.dataset.clientNav]);return}
 if(el.hasAttribute('data-client-logout')){e.preventDefault();e.stopImmediatePropagation();logout();return}
 const t=clean(el), aria=el.getAttribute('aria-label')||'', icons=[...el.querySelectorAll('.material-symbols-outlined')].map(e=>e.textContent.trim()).join(' '), href=el.getAttribute('href')||'';
 let dest=null;
 if(el.closest('nav')&&/^(Início|Sacola|Carrinho|Pedidos|Perfil)$/.test(t.replace(/\d+/g,'').trim())){const name=t.replace(/\d+/g,'').trim();if(name==='Perfil'&&!state.user){e.preventDefault();e.stopImmediatePropagation();return}dest={Início:home(),Sacola:cart(),Carrinho:cart(),Pedidos:orders(),Perfil:state.user?13:17}[name]}
 else if(/#(inicio|home|cardapio)$/.test(href))dest=home();
 else if(/#(carrinho|sacola|cart)$/.test(href)||/Carrinho de compras|Abrir (sacola|carrinho)/i.test(aria))dest=cart();
 else if(/shopping_bag|shopping_cart/.test(icons)&&!t.replace(/\d+/g,'').trim())dest=cart();
 else if(/#pedidos$/.test(href))dest=orders();
 else if(/#perfil$/.test(href))dest=state.user?13:17;
 else if(/#login$/.test(href)||/Entrar na conta/i.test(aria)||/^Entrar$/.test(t))dest=17;
 else if(/#cadastro$/.test(href)||/Registre-se|Criar (minha )?conta|faça seu cadastro/i.test(t))dest=4;
 else if(/Esqueceu sua senha/i.test(t))dest=3;
 else if(/Voltar.*Login/i.test(t))dest=17;
 else if(/Pedir Online sem Cadastro/i.test(t)){state={...defaults(),...(parseStorage(sessionStorage,VISITOR_KEY)||{}),user:null,mode:'visitor',payment:'PIX'};save();dest=34}
 else if(/Ir para o Cardápio|Fazer depois/i.test(t))dest=home();
 else if(/Claro, vamos agora/i.test(t)){sessionStorage.removeItem('arducci-theme-preview');dest=36}
 else if(/Ir para (a )?(Sacola|Carrinho)|Ver (Sacola|Carrinho)/i.test(t))dest=cart();
 else if(/Continuar Comprando|Explorar Cardápio|Adicionar mais itens/i.test(t))dest=home();
 else if(/arrow_back/.test(icons)||/Voltar/.test(aria))dest=[17,4,3,23].includes(id)?(id===17?21:17):[0,25].includes(id)?cart():home();
 else if(/logout/.test(icons)||/Sair da conta/i.test(aria)||/^Sair$/i.test(t)){e.preventDefault();e.stopImmediatePropagation();logout();return}
 if(dest!==null){e.preventDefault();e.stopImmediatePropagation();go(dest);return}
 if(/Adicionar à Sacola|Adicionado!|Adicionar ao Carrinho/.test(t)&&productIds.includes(id)){e.preventDefault();e.stopImmediatePropagation();addProduct();return}
 if(id===21){e.preventDefault();e.stopImmediatePropagation();if(/administrador/i.test(t)){navigate('admin-3.html');return}if(/ONLINE|PRODUTOS/.test(t))go(17);else if(/INÍCIO/.test(t))go(21);else if(/SOBRE/.test(t))modal('Arducci Gelateria','<p>Gelatos artesanais e açaí premium. Explore os sabores no cardápio digital.</p>',[['Explorar cardápio',()=>go(34)]]);else if(/CONTATO|administrador/i.test(t))modal('Protótipo do app de pedidos','<p>Esta simulação contempla o fluxo do cliente. Para experimentar, acesse o cardápio.</p>',[['Acessar cardápio',()=>go(34)]]);return}
 if([17,4,3,23].includes(id)&&/Entrar na Conta|Finalizar Cadastro|Enviar Código|Salvar Nova Senha/.test(t)){e.preventDefault();e.stopImmediatePropagation();authenticate();return}
 if(/Abrir WhatsApp|Enviar Chamado/.test(t)){e.preventDefault();e.stopImmediatePropagation();toast('Atendimento simulado. Nenhuma mensagem foi enviada.');return}
 if(/Termos de Uso|Política de Privacidade/.test(t)){e.preventDefault();e.stopImmediatePropagation();modal('Ambiente de demonstração','<p>Use somente dados fictícios. A simulação mantém a sacola e os pedidos neste navegador.</p>');return}
},true);
document.addEventListener('submit',e=>{if(e.target.closest('.sim-modal'))return;e.preventDefault();e.stopImmediatePropagation();if([17,4,3,23].includes(id))authenticate()},true);
function authenticate(){if(editing)return;if(id===3){modal('Código de demonstração','<p>Nenhuma mensagem foi enviada. Use o código <strong>123456</strong> na próxima tela.</p>',[['Criar nova senha',()=>go(23)]]);return}if(!state.user&&state.mode==='visitor'){state.orders=(parseStorage(localStorage,CUSTOMER_KEY)?.orders||[]);delete state.visitor;sessionStorage.removeItem(VISITOR_KEY)}state.user={name:id===4?($('input[type=text]')?.value.trim()||'Novo Cliente'):'Cliente Arducci',phone:id===4?($('input[type=tel]')?.value.trim()||''):'',isNew:id===4};state.mode='client';save();go(id===4?40:6)}
if([17,4,3,23].includes(id)){const form=$('form')||$('main');if(form){const p=document.createElement('div');p.innerHTML='<p class="sim-help">Use dados fictícios. Login e cadastro são demonstrativos; nenhuma conta real será criada.</p>';form.prepend(p)}$$('input[type=password]').forEach(e=>e.autocomplete='off')}
if([6,34].includes(id)){document.body.dataset.screenHome='true';$$('main article').forEach((e,i)=>{const targets=state.user?[35,15,14,11,18,12,27,41,31,28]:[7,37,22,38,30,2,1,8,32,9];e.dataset.catalogRoute=targets[i];e.setAttribute('role','link');e.tabIndex=0;e.onclick=null;e.onkeydown=ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();go(targets[i])}}})}
const productIds=[1,2,8,9,11,12,14,15,18,22,27,28,30,31,32,37,38,41], listIds=[2,9,11,12,18,28,30,38];
let listProducts=[];
function initLists(){$$('button').filter(b=>/Adicionado!/.test(clean(b))).forEach(b=>{b.innerHTML='<span class="material-symbols-outlined">shopping_bag</span><span>Adicionar à Sacola</span>'});listProducts=$$('[id^="qty-"]').map(q=>{const card=q.closest('article')||q.closest('[id^="card-"]');if(!card)return null;return {el:q,card,key:q.id.slice(4),name:card.querySelector('h3,h4')?.textContent.trim()||'Produto',price:parse(card.textContent),image:card.querySelector('img')?.src,qty:0}}).filter(Boolean);for(const p of listProducts){p.el.textContent='0';p.card.querySelectorAll('button').forEach(b=>{const delta=/Aumentar|Adicionar/i.test(b.getAttribute('aria-label')||'')||b.querySelector('.material-symbols-outlined')?.textContent.trim()==='add'?1:-1;b.removeAttribute('onclick');b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();p.qty=Math.max(0,p.qty+delta);p.el.textContent=p.qty;listSummary()},true)});p.card.removeAttribute('onclick')}
 listSummary();
}
function listSummary(){const n=listProducts.reduce((a,p)=>a+p.qty,0),v=listProducts.reduce((a,p)=>a+p.qty*p.price,0);['cart-summary-text','summary-items-count'].forEach(k=>{const e=document.getElementById(k);if(e)e.textContent=`${n} ${[9,28].includes(id)?'bebida(s)':'produto(s)'} selecionado(s)`});const a=$('aside.fixed');if(a){const labels=[...a.querySelectorAll('span,p')].filter(e=>e.children.length===0&&/R\$/.test(e.textContent));labels.forEach(e=>e.textContent=money(v))}['cart-summary-price','summary-total-price'].forEach(k=>{const e=document.getElementById(k);if(e)e.textContent=money(v)});badge()}
if(listIds.includes(id))initLists();
 if(productIds.includes(id))$$('button').filter(e=>/Adicionar à Sacola/.test(clean(e))).forEach(e=>{const p=e.closest('.fixed');if(p&&!p.matches('nav'))p.classList.add('sim-actionbar')});
function productInfo(){if(window.getGelatoProduct)return window.getGelatoProduct();let name=({1:'Petit Gateau',27:'Petit Gateau',8:'Banana Split',41:'Banana Split Especial',31:'Milk Shake Especial 500ml',32:'Milk Shake Especial 500ml',14:'Cascão',22:'Cascão',15:'Açaí',37:'Açaí'})[id],price=0,details='';
 if([14,22].includes(id)){if(typeof selectedFlavors!=='undefined'&&selectedFlavors.length===0)return null;name=$('#footer-base-label')?.textContent||name;price=parse($('#footer-price')?.textContent);details=$('#footer-flavor-names')?.textContent||''}
 else if([15,37].includes(id)){const selection=window.getAcaiSelection?.();if(!selection)return null;return {...selection,qty:1}}
 else if([1,27].includes(id)){if(typeof selectedGelatos!=='undefined'&&!selectedGelatos.length)return null;price=parse($('#summary-price')?.textContent);details=$('#summary-details')?.textContent||'';if(typeof selectedExtras!=='undefined'&&selectedExtras.length)details+=' · '+selectedExtras.map(e=>e.name).join(', ')}
 else {price=parse($('#summary-total-price')?.textContent||$('#summary-price')?.textContent||$('#total-price')?.textContent);details=$('#summary-flavors-line')?.textContent||$('#summary-details')?.textContent||$('#summary-flavors')?.textContent||'';if(!price){const fixed=$$('aside.fixed,footer.fixed').find(e=>/R\$/.test(e.textContent));price=parse(fixed?.textContent)}if(!details&&typeof window.selectedFlavors!=='undefined')details=window.selectedFlavors.join(' + ')}
 if(id===8){if(typeof selectedGelatos!=='undefined'&&!selectedGelatos.length)return null;details+=(typeof selectedSauce!=='undefined'?' · '+selectedSauce:'');details+=' · '+$$('input[type=checkbox]:checked').map(e=>e.closest('label')?.textContent.trim().replace(/\s+/g,' ')).filter(Boolean).join(', ')}
 if(id===41){if(typeof getTotalBolas==='function'&&getTotalBolas()!==3){toast('Selecione exatamente 3 bolas de gelato.');return null}price=Number($('#preco-total').textContent.replace(',','.'));details=$$('[id^=count-]').filter(e=>+e.textContent>0).map(e=>{const line=e.closest('.flex.items-center.justify-between');return e.textContent+'× '+(line?.querySelector('h4,h3,p')?.textContent||e.id.slice(6))}).join(', ');details+=' · '+$$('input:checked').map(e=>e.closest('label')?.textContent.trim().replace(/\s+/g,' ')).filter(Boolean).join(', ')}
 return {name:name?.trim(),price:price||([8,41].includes(id)?42:[31,32].includes(id)?32:0),details:details.trim(),qty:1}}
function addProduct(){let items;if(listIds.includes(id))items=listProducts.filter(p=>p.qty>0).map(p=>({name:p.name,price:p.price,qty:p.qty,details:'',image:p.image}));else{const p=productInfo();if(!p)return toast('Selecione pelo menos um sabor de gelato.');items=[p]}if(!items.length||items.some(e=>!e.price))return toast('Selecione ao menos um produto.');for(const p of items){if(!p.image)p.image=document.querySelector('.client-product-photo')?.src;const found=state.cart.find(x=>x.name===p.name&&x.details===p.details&&x.price===p.price);if(found)found.qty+=p.qty;else state.cart.push({...p,key:crypto.randomUUID()})}save();badge();modal('Adicionado à sacola',`<p>${items.map(p=>`${p.qty}× ${esc(p.name)} · ${money(p.price*p.qty)}`).join('<br>')}</p><p><strong>Total da sacola: ${money(total())}</strong></p>`,[['Ir para a sacola',()=>go(cart())],['Continuar comprando',()=>go(home()),true]])}
// Consistent, stateful transaction screens keep the original frame and visual tokens.
function mount(title,subtitle){$$('.fixed').filter(e=>!e.matches('nav')&&!e.querySelector('nav')&&!e.closest('nav')&&!e.classList.contains('sim-toolbar')&&!e.querySelector('main')).forEach(e=>e.remove());const main=$('main');if(!main)return null;main.className='sim-main';main.innerHTML=`<span class="sim-pill">ARDUCCI · ${state.user?'CLIENTE':'VISITANTE'}</span><h1>${esc(title)}</h1><p>${esc(subtitle)}</p>`;$$('header h1').forEach(e=>e.textContent=title);return main}
const btn=(text,action,secondary=false)=>{const b=document.createElement('button');b.className='sim-btn'+(secondary?' secondary':'');b.textContent=text;b.onclick=action;return b};
function rows(items){return items.map(p=>`<div class="sim-line"><div><strong>${p.qty}× ${esc(p.name)}</strong>${p.details?`<small>${esc(p.details)}</small>`:''}</div><strong style="white-space:nowrap">${money(p.price*p.qty)}</strong></div>`).join('')}
function renderCart(){state.linkedTotal=0;save();const m=mount('Minha Sacola','Revise seus sabores antes de finalizar o pedido.');if(!m)return;if(!state.cart.length){m.innerHTML+='<div class="sim-card" style="text-align:center;padding:40px 16px"><span class="material-symbols-outlined" style="font-size:48px;color:#80756e">shopping_bag</span><h2>Sua sacola está vazia</h2><p>Escolha seu gelato ou sobremesa favorita.</p></div>';m.append(btn('Explorar cardápio',()=>go(home())));return}
 for(const p of state.cart){const e=document.createElement('section');e.className='sim-card';e.innerHTML=`<div class="sim-line"><strong>${esc(p.name)}</strong><strong>${money(p.price*p.qty)}</strong></div><p>${esc(p.details)}</p><div class="sim-line"><small>${money(p.price)} por unidade</small><div class="sim-quantity"><button aria-label="Diminuir ${esc(p.name)}">−</button><span>${p.qty}</span><button aria-label="Aumentar ${esc(p.name)}">+</button></div></div><button data-remove style="font-size:11px;color:#ba1a1a">Remover item</button>`;e.querySelector('.sim-quantity button').onclick=()=>{p.qty--;state.cart=state.cart.filter(x=>x.qty>0);save();renderCart();badge()};e.querySelectorAll('.sim-quantity button')[1].onclick=()=>{p.qty++;save();renderCart();badge()};e.querySelector('[data-remove]').onclick=()=>{state.cart=state.cart.filter(x=>x.key!==p.key);save();renderCart();badge()};m.append(e)}
 m.append(btn('+ Adicionar mais itens ao pedido',()=>go(home()),true));const note=document.createElement('label');note.innerHTML=`<strong>Observações para o Gelatiere</strong><textarea rows="3" placeholder="Alguma preferência?">${esc(state.note)}</textarea>`;note.querySelector('textarea').oninput=e=>{state.note=e.target.value;save()};m.append(note);m.insertAdjacentHTML('beforeend',`<section class="sim-card"><h2>Resumo da conta</h2><div class="sim-line"><span>Subtotal · ${count()} item(s)</span><strong>${money(total())}</strong></div><div class="sim-line"><span>Serviço e embalagem</span><span style="color:#246c30">Grátis</span></div><div class="sim-line sim-total"><span>Total</span><span>${money(total())}</span></div></section>`);m.append(btn('Finalizar pagamento →',()=>go(checkout())))}
// Original bag layout is connected by native-cart.js.
// Checkout uses the original supplied screens and native payment controls.
function finishOrder(status='Recebido'){if(editing)return;if(!state.user&&!['Caixa','Dinheiro'].includes(state.payment))state.payment='PIX';if(!state.cart.length)return toast('Adicione produtos à sacola antes de pagar.');const order={customerMode:state.user?'client':'visitor',number:1000+state.orders.length+1,comanda:state.pendingComanda||String(1000+state.orders.length+1),items:[...structuredClone(state.cart),...(state.linkedTotal>0?[{name:'Comandas vinculadas',qty:1,price:state.linkedTotal,details:'Comandas da loja vinculadas no checkout'}]:[])],total:total()+(state.linkedTotal||0),note:state.note,receive:state.receive,table:state.receive==='mesa'?state.table:undefined,identification:state.user?{name:state.user.name,phone:state.user.phone||''}:structuredClone(state.visitor||{}),payment:state.payment,paymentStatus:state.payment==='Caixa'?'pending':'paid',origin:'cardapio-digital',status,step:0,created:new Date().toISOString()};state.orders.unshift(order);delete state.pendingComanda;state.cart=[];state.note='';state.linkedTotal=0;save();go(orders())}
// Payment layouts and feedback states are provided by the original HTML.

function storedOrder(reference){if(editing)return {latest:state,order:state.orders.find(o=>o.number===reference.number&&o.created===reference.created)};let latest;try{latest=parseStorage(state.user?localStorage:sessionStorage,state.user?CUSTOMER_KEY:VISITOR_KEY)}catch{}if(!state.user&&(!latest||latest.expiresAt<=Date.now()))return null;const order=Array.isArray(latest?.orders)?latest.orders.find(o=>o.number===reference.number&&o.created===reference.created):null;if(!order)return null;return {latest,order}}
function updateExistingOrder(reference,change){const current=storedOrder(reference);if(!current){toast('Este pedido não está mais disponível.');return false}change(current.order);state=current.latest;save();return true}
// Order tracking uses the official supplied screens and their native controls.
// Profile and welcome data are demonstrations; never persist passwords.
if([5,13,16,36,40].includes(id)){$$('input').forEach(e=>{if(e.type==='email')e.value='cliente@exemplo.com';if(e.type==='tel')e.value='(11) 99999-0000'});$$('button').filter(e=>/Salvar/.test(clean(e))).forEach(e=>e.addEventListener('click',ev=>{ev.preventDefault();ev.stopImmediatePropagation();toast('Preferências salvas nesta demonstração.')},true))}
// The active session defines both the routes and the shared mobile navigation.
const appPages=[...modePairs.flat(),5,13,16,36,40,26,39];
function renderClientChrome(){if(!appPages.includes(id))return;
 document.body.classList.add('client-page');
 // Remove only the repeated native status/identity rows; keep every screen's own title bar.
 $$('span').filter(e=>e.textContent.trim()==='9:41').forEach(e=>{let row=e;while(row.parentElement&&row.parentElement!==document.body&&!row.parentElement.matches('main')&&row.parentElement.textContent.trim().length<140&&!row.parentElement.querySelector('img,button,a'))row=row.parentElement;row.remove()});
 $$('span,div').filter(e=>!e.children.length&&/^bem[\s-]*vindo[!:]?$/i.test(e.textContent.trim())).forEach(e=>{let row=e.parentElement;while(row&&row!==document.body&&!row.matches('main')){if(row.querySelector('button,a')&&[...row.querySelectorAll('.material-symbols-outlined')].some(icon=>icon.textContent.trim()==='shopping_bag')){let parent=row.parentElement;while(parent&&parent!==document.body&&!parent.matches('main')){parent.classList.add('client-native-chrome');parent=parent.parentElement}row.remove();break}row=row.parentElement}});
 $$('header').forEach(e=>{if(!e.textContent.trim()&&!e.querySelector('img,button'))e.remove();else e.classList.add('client-native-chrome')});
 $$('main').forEach(main=>{main.classList.add('client-content');let parent=main.parentElement;while(parent&&parent!==document.body){parent.classList.add('client-layout-wrapper');parent=parent.parentElement}});
 const identityName='Cliente Arducci';
 const header=document.createElement('header');header.className='client-app-header';document.body.prepend(header);
 header.innerHTML=`<div class="client-header-row"><div class="client-identity">${state.user?([5,36,40].includes(id)||state.user.isNew?'<span class="client-avatar client-avatar-empty" role="img" aria-label="Foto ainda não cadastrada"></span>':`<img class="client-avatar" src="assets/customer-avatar.jpg" alt="Foto de perfil de ${esc(state.user.name)}" width="44" height="44">`):'<span class="client-guest-avatar material-symbols-outlined">person</span>'}<div>${id===40?'':'<span class="client-eyebrow">BEM-VINDO!</span>'}<strong>${esc(state.user?identityName:'Visitante')}</strong>${!state.user?'<small>PIX ou dinheiro no caixa</small>':''}</div></div><div class="client-header-actions"><button type="button" data-client-nav="cart" aria-label="Abrir sacola" class="client-icon-button"><span class="material-symbols-outlined">shopping_bag</span><span id="header-cart-badge" class="client-header-count">${count()}</span></button>${state.user?'<button type="button" data-client-logout aria-label="Sair da conta" class="client-icon-button"><span class="material-symbols-outlined">logout</span></button>':'<button type="button" data-client-nav="login" class="client-login-button">Entrar</button>'}</div></div>`;
 const status=document.createElement('div');status.className='client-status-bar';status.innerHTML='<span>9:41</span><div><span class="material-symbols-outlined">signal_cellular_alt</span><span class="material-symbols-outlined">wifi</span><span class="material-symbols-outlined">battery_full</span></div>';header.prepend(status);
 $$('nav').filter(n=>n.classList.contains('fixed')||/Início/.test(n.textContent)&&/Sacola|Carrinho/.test(n.textContent)).forEach(n=>n.remove());
 const nav=document.createElement('nav');nav.className='client-bottom-nav';nav.setAttribute('aria-label',state.user?'Navegação do cliente':'Navegação do visitante');
 const active=[19,33,0,25,20,29,26,39].includes(id)?'cart':[10,24].includes(id)?'orders':[5,13,16,36].includes(id)?'profile':'home';
 nav.innerHTML=[['home','storefront','Início',home()],['cart','shopping_bag','Sacola',cart()],['orders','receipt_long','Pedidos',orders()],['profile','person','Perfil',state.user?13:17]].map(([key,icon,label,dest])=>key==='profile'&&!state.user?`<button type="button" class="client-nav-disabled" data-client-profile-disabled disabled aria-disabled="true" aria-label="Perfil indisponível para visitantes"><span class="material-symbols-outlined">${icon}</span><span>${label}</span></button>`:`<a data-client-nav="${key}" href="tela-${dest}.html" ${active===key?'aria-current="page"':''}><span class="material-symbols-outlined">${icon}</span><span>${label}</span></a>`).join('');document.body.append(nav);
 document.documentElement.dataset.clientMode=state.user?'client':'visitor';badge();refreshClientLayout();
}
function refreshClientLayout(){const bar=$('.sim-actionbar');document.body.style.setProperty('--client-action-height',bar?Math.max(64,bar.getBoundingClientRect().height||84)+'px':'0px');}

const screenTitles={35:'Self-Service de Gelatos',7:'Self-Service de Gelatos',15:'Açaí Artesanal',37:'Açaí Artesanal',14:'Cascão & Casquinha',22:'Cascão & Casquinha',11:'Picolés Artesanais',38:'Picolés Artesanais',18:'Paletas Recheadas',30:'Paletas Recheadas',12:'Potes de Viagem',2:'Potes de Viagem',27:'Petit Gateau',1:'Petit Gateau',41:'Banana Split',8:'Banana Split',31:'Milk Shake',32:'Milk Shake',28:'Bebidas',9:'Bebidas',0:'Finalizar Pedido',25:'Finalizar Pedido',20:'Pagamento no PIX',29:'Pagamento no PIX',26:'Pagamento no Crédito ou VR',39:'Pagamento no Débito'};
function standardizePageTitle(){if(!screenTitles[id])return;
 const back=$$('button,a').find(e=>!e.closest('.client-app-header,.client-bottom-nav,.sim-toolbar')&&([...e.querySelectorAll('.material-symbols-outlined')].some(icon=>/^(arrow_back|chevron_left)$/.test(icon.textContent.trim()))||/Voltar/i.test(e.getAttribute('aria-label')||'')));
 let row=back?.parentElement;
 if(row&&!row.querySelector('h1')&&row.parentElement&&!row.parentElement.matches('main,body')&&!row.parentElement.querySelector('img')&&row.parentElement.textContent.trim().length<300&&row.parentElement.querySelector('h1'))row=row.parentElement;
 if(!row||row.matches('main,body')){row=document.createElement('div');$('main')?.prepend(row)}
 row.className='client-product-titlebar';row.removeAttribute('style');const destination=[0,25].includes(id)?'cart':[20,29,26,39].includes(id)?'checkout':'home';
 row.innerHTML=`<button type="button" class="client-icon-button client-back-button" data-client-nav="${destination}" aria-label="Voltar"><span class="material-symbols-outlined">arrow_back</span></button><h1>${esc(screenTitles[id])}</h1><button type="button" class="client-icon-button" data-client-nav="cart" aria-label="Ver pedido na sacola"><span class="material-symbols-outlined">shopping_bag</span></button>`;
}
function setupProfileTheme(){const key='arducci-theme-preview';if(![5,13,16,36].includes(id)){sessionStorage.removeItem(key);return}
 document.body.classList.add('client-profile-page');document.body.classList.toggle('client-profile-dark',[5,16].includes(id));
 let pending;try{pending=JSON.parse(sessionStorage.getItem(key))}catch{sessionStorage.removeItem(key)}
 document.addEventListener('change',event=>{if(event.target.id!=='toggleDarkMode')return;event.stopImmediatePropagation();const target=[5,36].includes(id)?(event.target.checked?5:36):(event.target.checked?16:13);if(target===id)return;sessionStorage.setItem(key,JSON.stringify({from:id,to:target}));go(target)},true);
 if(pending&&pending.to===id&&[5,13,16,36].includes(pending.from)){
  const dark=[5,16].includes(id),toggle=$('#toggleDarkMode');if(toggle)toggle.disabled=true;
  const preview=document.createElement('section');preview.className='client-theme-preview';preview.setAttribute('role','region');preview.setAttribute('aria-label','Confirmação da aparência de demonstração');
  preview.innerHTML=`<strong>Prévia do modo ${dark?'escuro':'claro'}</strong><p>Esta é uma demonstração. Deseja manter esta aparência?</p><div><button type="button" data-theme-keep>Manter</button><button type="button" data-theme-cancel>Cancelar</button></div>`;document.body.append(preview);
  preview.querySelector('[data-theme-keep]').onclick=()=>{sessionStorage.removeItem(key);if(toggle)toggle.disabled=false;preview.remove()};
  preview.querySelector('[data-theme-cancel]').onclick=()=>{sessionStorage.removeItem(key);go(pending.from)};
 }else if(pending)sessionStorage.removeItem(key);
 if([13,16].includes(id))$$('main input[type=email]').forEach(e=>e.value='cliente.arducci@email.com');
}


renderClientChrome();
standardizePageTitle();if(!editing)setupProfileTheme();
window.ClientFlow={get state(){return state},total,count,save,go,cart,checkout,orders,finishOrder,toast,refreshLayout:refreshClientLayout,getOrder:reference=>storedOrder(reference)?.order,updateOrder:updateExistingOrder,endVisitorSession};
// Guard image loading failures without changing source artwork when available.
const fallback='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220"><rect width="300" height="220" fill="#eae6df"/><text x="150" y="105" text-anchor="middle" font-size="46">🍨</text><text x="150" y="150" text-anchor="middle" fill="#6e5a4d" font-family="serif" font-size="20">Arducci Gelateria</text></svg>');$$('img').forEach(e=>{e.addEventListener('error',()=>{e.src=fallback},{once:true});if(e.complete&&!e.naturalWidth)e.src=fallback});
badge();
if(!state.user&&state.mode==='visitor'){
 let lastTouch=0;const touch=()=>{if(Date.now()-lastTouch>10000){lastTouch=Date.now();save()}};document.addEventListener('pointerdown',touch,{passive:true});document.addEventListener('keydown',touch);
 setInterval(()=>{const active=parseStorage(sessionStorage,VISITOR_KEY);if(!active||active.expiresAt<=Date.now())endVisitorSession()},30000);
}
})();
