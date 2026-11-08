(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let mode='boat',format='complete';
const money=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
function activeArea(){return mode==='bowl'?$('#section-bowl'):format==='complete'?$('#config-boat-complete'):$('#config-boat-custom')}
function selection(){const area=activeArea(),extras=[...area.querySelectorAll('input[type=checkbox]:checked')].map(e=>({name:e.dataset.name||e.closest('label')?.querySelector('.font-title-sm')?.textContent.trim()||'Complemento',price:Number(e.dataset.price||0)}));let name,price,details;
 if(mode==='bowl'){const input=$('#section-bowl input[name=bowl_base]:checked');name=input?.closest('label')?.querySelector('p')?.textContent.trim()||'Açaí com Cupuaçu - 300g';price=Number(input?.value||24);details='Tigela · '+name}
 else if(format==='complete'){name='Barca Completa (Pronta da Casa)';price=42;details='Barca completa de açaí com acompanhamentos da casa'}
 else{const base=$('#config-boat-custom input[name=boat_custom_base]:checked')?.value||'Açaí Puro';name='Barca de Açaí para Montar (800g)';price=38;details='Base: '+base+' · 800g'}
 price+=extras.reduce((a,e)=>a+e.price,0);if(extras.length)details+=' · Extras: '+extras.map(e=>e.name+' ('+money(e.price)+')').join(', ');
 return {name,price,details}}
function draw(){for(const value of ['bowl','boat']){const selected=mode===value;$('#section-'+value).classList.toggle('hidden',!selected);$('#section-'+value).hidden=!selected;$('#btn-mode-'+value).classList.remove('border-2','border-primary-container');$('#btn-mode-'+value).classList.toggle('acai-selected',selected);$('#btn-mode-'+value).setAttribute('aria-pressed',String(selected));$('#badge-mode-'+value)?.classList.toggle('hidden',!selected)}
 for(const value of ['complete','custom']){const selected=format===value;$('#config-boat-'+value).classList.toggle('hidden',!selected);$('#config-boat-'+value).hidden=!selected;$('#card-boat-'+value).classList.remove('border-2','border-primary-container');$('#card-boat-'+value).classList.toggle('acai-selected',selected);$('#card-boat-'+value).setAttribute('aria-pressed',String(selected));const dot=$('#card-boat-'+value+' .radio-dot-format');if(dot){dot.style.background=selected?'#3b2b20':'transparent';dot.style.borderColor=selected?'#3b2b20':'#d2c4bc';dot.innerHTML=selected?'<span class="material-symbols-outlined" style="font-size:12px;color:white">check</span>':''}}
 $$('.bowl-base-card').forEach(card=>{const checked=card.querySelector('input').checked;card.classList.toggle('acai-selected',checked);card.classList.remove('border-2','border-primary-container');const dot=card.querySelector('.radio-dot');if(dot)dot.innerHTML=checked?'<span class="material-symbols-outlined" style="font-size:12px">check</span>':''});
 $$('.boat-custom-base-label').forEach(card=>{const checked=card.querySelector('input').checked;card.classList.remove('border-2','border-primary-container');card.classList.toggle('acai-selected',checked);const dot=card.querySelector('div');if(dot){dot.style.background=checked?'#3b2b20':'transparent';dot.style.borderColor=checked?'#3b2b20':'#d2c4bc';dot.innerHTML=checked?'<span class="material-symbols-outlined" style="font-size:10px;color:white">check</span>':''}});
 const result=selection();$('#footer-item-summary').textContent=result.name;$('#footer-total-display').textContent='Total: '+money(result.price)}
window.selectMode=value=>{mode=value;draw()};window.selectBoatFormat=value=>{format=value;draw()};
window.updateBowlBase=(price)=>{const input=$(`#section-bowl input[value="${Number(price).toFixed(2)}"]`);if(input)input.checked=true;draw()};
window.selectBoatCustomBase=(name,card)=>{const input=card.querySelector('input');if(input)input.checked=true;draw()};
window.toggleCompleteExtra=draw;window.toggleCustomExtra=draw;window.toggleBoatIncludedItem=draw;window.getAcaiSelection=selection;
$$('#section-bowl input,#section-boat input').forEach(e=>e.addEventListener('change',draw));
$$('#card-boat-complete,#card-boat-custom').forEach(card=>{card.setAttribute('role','button');card.tabIndex=0;card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click()}})});
draw();
})();
