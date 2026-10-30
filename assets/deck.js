(() => {
 'use strict';
 const slides=[...document.querySelectorAll('.slide')];
 const menu=document.getElementById('slide-menu');
 const overview=document.getElementById('overview');
 const prev=document.getElementById('prev');
 const next=document.getElementById('next');
 let current=0;
 document.documentElement.classList.add('js');
 const closeMenu=()=>{menu.hidden=true;overview.setAttribute('aria-expanded','false')};
 const show=(index,focus=false)=>{
  current=Math.max(0,Math.min(slides.length-1,index));
  slides.forEach((s,n)=>{s.classList.toggle('active',n===current);s.setAttribute('aria-hidden',String(n!==current))});
  document.getElementById('counter').textContent=`${String(current+1).padStart(2,'0')} / ${slides.length}`;
  document.getElementById('chapter-label').textContent=slides[current].dataset.title;
  document.querySelector('.deck-progress span').style.width=`${(current+1)/slides.length*100}%`;
  prev.disabled=current===0;next.disabled=current===slides.length-1;
  closeMenu();
  history.replaceState(null,'','#'+slides[current].id);
  window.scrollTo(0,0);
  if(focus){const h=slides[current].querySelector('h1');h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}
 };
 const fromHash=()=>{const match=/^#slide-(\d+)$/.exec(location.hash);return match?Number(match[1])-1:0};
 prev.addEventListener('click',()=>show(current-1,true));
 next.addEventListener('click',()=>show(current+1,true));
 overview.addEventListener('click',()=>{menu.hidden=!menu.hidden;overview.setAttribute('aria-expanded',String(!menu.hidden));if(!menu.hidden)menu.querySelector('a').focus()});
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#slide-"]');if(!a)return;e.preventDefault();show(Number(a.hash.split('-').at(-1))-1,true)});
 window.addEventListener('hashchange',()=>show(fromHash(),true));
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!menu.hidden){closeMenu();overview.focus();return}
  if(document.querySelector('dialog[open]')||e.target.closest('input,textarea,select,[contenteditable],[role=tab]')||e.metaKey||e.altKey||e.ctrlKey||!menu.hidden)return;
  const step={ArrowRight:1,PageDown:1,ArrowLeft:-1,PageUp:-1}[e.key];
  if(step){e.preventDefault();show(current+step,true)}
  else if(e.key==='Home'||e.key==='End'){e.preventDefault();show(e.key==='Home'?0:slides.length-1,true)}
 });
 document.getElementById('print').addEventListener('click',()=>window.print());
 const fullscreen=document.getElementById('fullscreen');
 fullscreen.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.body.requestFullscreen()}catch{fullscreen.textContent='Use browser full screen'}});
 document.addEventListener('fullscreenchange',()=>{fullscreen.textContent=document.fullscreenElement?'Exit full screen':'Full screen'});
 window.addEventListener('beforeprint',()=>slides.forEach(s=>s.removeAttribute('aria-hidden')));
 window.addEventListener('afterprint',()=>slides.forEach((s,n)=>s.setAttribute('aria-hidden',String(n!==current))));
 show(fromHash());
})();
