(()=>{
const flow=window.ClientFlow;if(!flow)return;
const id=window.SCREEN_ID,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const money=n=>Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function syncAmounts(){if(id===0&&typeof addedComandasTotal!=='undefined'){flow.state.linkedTotal=Math.max(0,addedComandasTotal);flow.save()}const value=flow.total()+(flow.state.linkedTotal||0);const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode()){if(node.parentElement?.closest('script,style'))continue;node.nodeValue=node.nodeValue.replace(/R\$\s*68,00|R\$\s*64,60/g,money(value)).replace(/-\s*R\$\s*3,40/g,money(0))}['subtotalDisplay','totalDisplay'].forEach(key=>{const e=document.getElementById(key);if(e)e.textContent=money(value)});if($('#descontoDisplay'))$('#descontoDisplay').textContent=money(0);$$('span,p,div').filter(e=>!e.children.length&&/Desconto Fidelidade.*5%/.test(e.textContent)).forEach(e=>e.textContent=e.textContent.replace(/\s*\(5%\)/,''));$$('span').filter(e=>!e.children.length&&/^\d+\s+[Ii]tens?\s+[Ss]elecionados$/.test(e.textContent.trim())).forEach(e=>e.textContent=flow.count()+' Itens Selecionados')}
if([0,25].includes(id)){
 flow.state.linkedTotal=0;flow.save();
 const list=$('#orderItemsList');if(list)list.innerHTML=flow.state.cart.map(p=>`<div><div class="flex justify-between items-baseline font-body-sm text-body-sm"><span class="font-semibold text-primary">${p.qty}x ${esc(p.name)}</span><span class="dotted-leader"></span><span class="font-bold text-primary tabular-nums">${money(p.price*p.qty)}</span></div>${p.details?`<p class="text-[12px] text-on-surface-variant pl-4 italic">${esc(p.details)}</p>`:''}</div>`).join('');
 if($('#itemsCountBadge'))$('#itemsCountBadge').textContent=flow.count()+' itens';
 if(id===0){if(typeof baseTotal!=='undefined')baseTotal=flow.total();if(typeof totalItems!=='undefined')totalItems=flow.count();if(typeof addedComandasTotal!=='undefined')addedComandasTotal=0;$('#comanda-card-1')?.remove();$('#summary-cmd-1')?.remove();if(typeof selectDeliveryMode==='function')selectDeliveryMode(flow.state.receive||'balcao')}
 if(id===25){if($('#visitorNameInput'))$('#visitorNameInput').value=flow.state.visitor?.name||'';if($('#visitorPhoneInput'))$('#visitorPhoneInput').value=flow.state.visitor?.phone||'';['btn-method-card'].forEach(key=>{const e=document.getElementById(key);if(e){e.disabled=true;e.setAttribute('aria-disabled','true')}})}
}

if([0,25].includes(id)){
 const mesa=$('#optionMesaCard'),balcao=$('#optionBalcaoCard');
 const field=document.createElement('div');field.className='checkout-table-field';field.innerHTML='<label for="deliveryTableInput">Número da mesa</label><input id="deliveryTableInput" type="text" inputmode="numeric" maxlength="6" placeholder="Ex.: 4" autocomplete="off"><p>Informe a mesa onde você está para receber o pedido.</p>';
 mesa?.parentElement.after(field);$('#deliveryTableInput').value=flow.state.table||'';
 if(mesa){const label=[...mesa.querySelectorAll('span')].find(e=>/Mesa 04/.test(e.textContent));if(label){label.id='delivery-table-summary';label.textContent=flow.state.table?'Mesa '+flow.state.table:'Informe o número da mesa'}}
 function updateDelivery(){const mode=typeof currentDeliveryMode!=='undefined'?currentDeliveryMode:flow.state.receive||'balcao';field.hidden=mode!=='mesa';$('#deliveryTableInput').required=mode==='mesa';flow.state.receive=mode;if(mode!=='mesa')delete flow.state.table;flow.save()}
 const native=window.selectDeliveryMode;window.selectDeliveryMode=mode=>{if(native)native(mode);else{flow.state.receive=mode;[mesa,balcao].forEach((card,index)=>{card?.classList.toggle('checkout-delivery-selected',(index===0?'mesa':'balcao')===mode)});}document.querySelectorAll('[name="delivery_mode"]').forEach(e=>e.checked=e.value===mode);updateDelivery()};
 $('#deliveryTableInput').oninput=e=>{e.target.value=e.target.value.replace(/[^0-9]/g,'');flow.state.table=e.target.value;const summary=$('#delivery-table-summary');if(summary)summary.textContent=e.target.value?'Mesa '+e.target.value:'Informe o número da mesa';flow.save()};
 if(!native){mesa?.addEventListener('click',()=>window.selectDeliveryMode('mesa'));balcao?.addEventListener('click',()=>window.selectDeliveryMode('balcao'))}window.selectDeliveryMode(flow.state.receive||'balcao');
}
if(id===25){
 const container=$('#visitorNameInput')?.closest('section');
 if(container){const title=container.querySelector('h3');if(title)title.textContent='Deseja se identificar para receber o pedido?';const subtitle=title?.parentElement.querySelector('p');if(subtitle)subtitle.textContent='Se sim, preencha os dados abaixo. Se não, use a comanda automática disponível no resumo do pedido.';}
 for(const [key,label]of [['visitorNameInput','Nome (opcional)'],['visitorPhoneInput','WhatsApp (opcional)']]){const input=document.getElementById(key);if(input)input.required=false;const heading=document.querySelector('label[for="'+key+'"]');if(heading)heading.textContent=label;}
 flow.state.pendingComanda||=String(1000+flow.state.orders.length+1);flow.save();const comanda=flow.state.pendingComanda;
 const copy=$('#copyComandaBtn');if(copy){const box=copy.parentElement;const label=[...box.querySelectorAll('span')].find(e=>!e.children.length&&/^#123$/.test(e.textContent.trim()));if(label){label.textContent='#'+comanda;label.id='automatic-comanda-number'}copy.removeAttribute('onclick');copy.innerHTML='<span class="material-symbols-outlined text-[14px]">content_copy</span><span>Copiar #'+esc(comanda)+'</span>';copy.onclick=async()=>{try{if(!navigator.clipboard)throw Error('clipboard');await navigator.clipboard.writeText(comanda);flow.toast('Comanda copiada: #'+comanda)}catch{flow.toast('Sua comanda é #'+comanda)}}}
}
if([26,39].includes(id))$$('main > div').filter(e=>!e.classList.contains('fixed')).forEach(e=>e.classList.add('client-native-payment-scroll'));
const action=$('#btnVerifyPayment,#btn-submit-payment')?.closest('.fixed');if(action)action.classList.add('sim-actionbar');
function beginPayment(kind){if(!flow.state.cart.length){flow.toast('Adicione produtos à sacola antes de pagar.');return}if(!flow.state.user&&kind!=='Caixa')kind='PIX';if([0,25].includes(id)){const mode=typeof currentDeliveryMode!=='undefined'?currentDeliveryMode:flow.state.receive;if(mode==='mesa'){const table=$('#deliveryTableInput')?.value.trim();if(!table||!/^\d+$/.test(table)||Number(table)<1){flow.toast('Informe o número da mesa para receber o pedido.');$('#deliveryTableInput')?.focus();return}flow.state.table=table}else delete flow.state.table;flow.state.receive=mode}
 if(id===25){const name=$('#visitorNameInput')?.value.trim(),phone=$('#visitorPhoneInput')?.value.trim();if(phone&&![10,11].includes(phone.replace(/\D/g,'').length)){flow.toast('Confira o WhatsApp informado ou deixe o campo vazio.');$('#visitorPhoneInput')?.focus();return}flow.state.visitor={comanda:flow.state.pendingComanda,...(name?{name}:{}),...(phone?{phone}:{})}}
 flow.state.payment=kind;if(id===0&&typeof addedComandasTotal!=='undefined')flow.state.linkedTotal=Math.max(0,addedComandasTotal);if(typeof currentDeliveryMode!=='undefined')flow.state.receive=currentDeliveryMode;flow.save();if(kind==='Caixa')flow.finishOrder('Aguardando pagamento no caixa');else flow.go(kind==='PIX'?(flow.state.user?29:20):kind==='Débito'?39:26)}
document.addEventListener('click',e=>{
 const b=e.target.closest('button,a');if(!b||b.closest('.client-app-header,.client-bottom-nav,.sim-toolbar'))return;
 const clone=b.cloneNode(true);clone.querySelectorAll('.material-symbols-outlined,svg').forEach(n=>n.remove());const text=b.dataset.mobileActionOriginal??clone.textContent.replace(/\s+/g,' ').trim();
 const stop=()=>{e.preventDefault();e.stopImmediatePropagation()};
 if([0,25].includes(id)){
  if(/Finalizar Pagamento com PIX|pagamento PIX/i.test(text)){stop();beginPayment('PIX');return}
  if(/Finalizar Pagamento no Débito/i.test(text)){stop();beginPayment('Débito');return}
  if(/Finalizar no Crédito ou VR/i.test(text)){stop();beginPayment('Crédito / VR');return}
  if(/Finalizar Pedido no Caixa/i.test(text)){stop();beginPayment('Caixa');return}
 }
 if(/Ir para Acompanhamento do Pedido/i.test(text)){stop();if([20,29].includes(id))flow.state.payment='PIX';else flow.state.payment=id===39?'Débito':'Crédito / VR';flow.save();flow.finishOrder();return}
 if(/Cancelar e escolher outra forma/i.test(text)){stop();flow.go(flow.checkout());return}
},true);
if(id===25){const old=$('#btn-method-cash'),cash=document.createElement('button');cash.type='button';cash.id='btn-method-cash';cash.className='visitor-cash-choice';cash.innerHTML='<span class="material-symbols-outlined">payments</span><strong>Dinheiro no caixa</strong><small>Pagar presencialmente</small>';old?.replaceWith(cash);const panel=document.createElement('div');panel.id='visitor-cash-panel';panel.hidden=true;panel.innerHTML='<p>Seu pedido ficará aguardando o recebimento em dinheiro no Caixa.</p><button type="button" class="sim-btn">Enviar pedido para pagar no caixa</button>';$('#paymentSectionWrapper')?.append(panel);cash.onclick=()=>{panel.hidden=false;if($('#paymentDynamicPanel'))$('#paymentDynamicPanel').hidden=true;cash.setAttribute('aria-pressed','true')};panel.querySelector('button').onclick=()=>beginPayment('Caixa');$('#btn-method-pix')?.addEventListener('click',()=>{panel.hidden=true;if($('#paymentDynamicPanel'))$('#paymentDynamicPanel').hidden=false;cash.setAttribute('aria-pressed','false')})}
// Keep the native feedback controls and processing animations, refreshing only transaction data.
document.addEventListener('click',()=>queueMicrotask(()=>{syncAmounts();flow.refreshLayout()}));
if(id===25){const p=document.createElement('p');p.className='visitor-data-notice';p.textContent='Seus dados de visitante ficam apenas nesta aba da simulação e são apagados ao encerrar o acompanhamento, fechar a aba ou após 30 minutos sem atividade.';document.querySelector('main')?.prepend(p)}
syncAmounts();flow.refreshLayout();
if(!flow.state.cart.length){const pay=$('#btnVerifyPayment,#btn-submit-payment');if(pay)pay.disabled=true}
})();
