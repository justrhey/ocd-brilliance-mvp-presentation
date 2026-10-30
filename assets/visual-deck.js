(()=>{'use strict';
 const data=JSON.parse(document.getElementById('workflow-data').textContent);
 const tabs=[...document.querySelectorAll('[role="tab"]')];
 const selectGroup=(n,focus=false)=>{tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===n));tab.tabIndex=i===n?0:-1;document.getElementById('group-'+i).hidden=i!==n});if(focus)tabs[n].focus()};
 tabs.forEach((tab,n)=>{tab.addEventListener('click',()=>selectGroup(n));tab.addEventListener('keydown',e=>{const step={ArrowRight:1,ArrowLeft:-1}[e.key];if(step){e.preventDefault();e.stopPropagation();selectGroup((n+step+tabs.length)%tabs.length,true)}})});
 const dialog=document.getElementById('workflow-dialog'),body=document.getElementById('dialog-body');
 let origin;
 const text=(tag,content)=>{const element=document.createElement(tag);element.textContent=content;body.append(element);return element};
 document.querySelectorAll('[data-item]').forEach(a=>a.addEventListener('click',e=>{
  const item=data.find(i=>i.number===Number(a.dataset.item));if(!item)return;
  e.preventDefault();origin=a;body.replaceChildren();text('span',`ITEM ${String(item.number).padStart(2,'0')} / ${item.phase}`).className='dialog-phase';text('h2',item.title);
  for(const [label,value]of[['Systems',item.systems],['Current manual work',item.problem],['Proposed coordination',item.selection==='L'?'Native/manual initially. '+item.proposed_automation:item.proposed_automation],['Human responsibility',item.manual_boundary],['Acceptance',item.acceptance],['Before activation',item.remaining_work_or_gate]]){text('h3',label);text('p',value)}
  const link=text('a','Open the complete register entry');link.href=`register.html#workflow-${item.number}`;dialog.showModal();
 }));
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>origin?.focus());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
 const canvases=[...document.querySelectorAll('.node-canvas')];
 const drawWires=()=>canvases.forEach(canvas=>{
  const bounds={width:canvas.clientWidth,height:canvas.clientHeight};if(!bounds.width)return;
  const svg=canvas.querySelector('.workflow-wires');
  svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
  svg.querySelectorAll('path').forEach(path=>{
   const from=canvas.querySelector(`[data-step="${path.dataset.from}"]`),to=canvas.querySelector(`[data-step="${path.dataset.to}"]`);
   const rect=n=>({left:n.offsetLeft,top:n.offsetTop-n.offsetHeight/2,width:n.offsetWidth,height:n.offsetHeight,right:n.offsetLeft+n.offsetWidth,bottom:n.offsetTop+n.offsetHeight/2});const a=rect(from),b=rect(to);
   if(path.dataset.to==='review'){
    const x=a.left+a.width/2,y=a.bottom,end=b.top;
    path.setAttribute('d',`M ${x} ${y} V ${end}`);
   }else if(path.dataset.to==='skip'){
    const x=a.left+a.width/2,y=a.bottom,endX=b.right,endY=b.top+b.height/2;
    path.setAttribute('d',`M ${x} ${y} V ${endY} H ${endX}`);
   }else{
    const x=a.right,y=a.top+a.height/2,endX=b.left,endY=b.top+b.height/2;
    path.setAttribute('d',`M ${x} ${y} H ${(x+endX)/2} V ${endY} H ${endX}`);
   }
  });
 });
 const drawMaps=()=>{
  for(const [selector,links] of [
   ['.systems-visual',[['.s1','.n8n-hub'],['.s2','.n8n-hub'],['.s3','.n8n-hub'],['.n8n-hub','.t1'],['.n8n-hub','.t2'],['.n8n-hub','.t3']]],
   ['.maintenance-visual',[['.r1>.icon','.r2>.icon'],['.r2>.icon','.r3>.icon']]]
  ]){
   const scene=document.querySelector(selector),svg=scene.querySelector('.wires'),r=scene.getBoundingClientRect();if(!r.width||!r.height)continue;
   svg.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`);svg.setAttribute('preserveAspectRatio','none');svg.replaceChildren();
   for(const [from,to] of links){
    const a=scene.querySelector(from).getBoundingClientRect(),b=scene.querySelector(to).getBoundingClientRect(),x=a.right-r.left,y=a.top+a.height/2-r.top,endX=b.left-r.left,endY=b.top+b.height/2-r.top;
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',`M ${x} ${y} C ${(x+endX)/2} ${y}, ${(x+endX)/2} ${endY}, ${endX} ${endY}`);svg.append(path);
   }
  }
 };
 const drawAll=()=>{drawWires();drawMaps()};
 new ResizeObserver(drawAll).observe(document.getElementById('deck'));
 new MutationObserver(drawAll).observe(document.getElementById('deck'),{subtree:true,attributes:true,attributeFilter:['class']});
 document.fonts.ready.then(drawAll);window.addEventListener('resize',drawAll);window.addEventListener('beforeprint',drawAll);
 const walk=document.getElementById('walkthrough'),sample=document.getElementById('sample-record');
 const stage=document.querySelector('.canvas-slide');let step=-1;
 const scenarios={
  due:{path:['trigger','source','rule','draft','review'],steps:[
   ['Daily check','The agreed daily schedule starts a check. No email has been sent.','Started'],
   ['Read the source','Fictional record DOC-021 has a verified expiry 14 days from the sample check date.','14 days left'],
   ['Apply the rule','14 days falls within the illustrative 30-day reminder window. The TRUE branch continues.','TRUE · due soon'],
   ['Prepare a draft','Outlook creates a reminder draft for the permitted recipient. Draft creation does not send it.','Draft prepared'],
   ['Office takes over','Staff verify the recipient and evidence, then decide whether to send. Renewal remains open until replacement evidence is checked.','Staff review']]},
  valid:{path:['trigger','source','rule','skip'],steps:[
   ['Daily check','The agreed daily schedule starts a check. No email has been sent.','Started'],
   ['Read the source','Fictional record DOC-022 has a verified expiry 120 days from the sample check date.','120 days left'],
   ['Apply the rule','120 days is outside the illustrative 30-day reminder window. The FALSE branch continues.','FALSE · not due'],
   ['No reminder needed','No reminder draft is prepared for this record. It remains available for the next scheduled check.','No draft']]},
  missing:{path:['trigger','source','review'],steps:[
   ['Daily check','The agreed daily schedule starts a check. No email has been sent.','Started'],
   ['Source check fails','Fictional record DOC-023 has no expiry date. Do not treat it as valid or calculate a reminder from an invented date.','Missing expiry'],
   ['Ask the office to verify','Stop the reminder path and assign the missing date for office review. Production needs this validation and exception route before the IF check.','Manual exception']]}
 };
 const render=()=>{
  stage.querySelectorAll('.flow-node').forEach(n=>{n.classList.remove('walk-active','walk-done');n.removeAttribute('aria-current')});
  stage.querySelectorAll('.workflow-wires path').forEach(p=>p.classList.remove('wire-active','wire-done'));
  stage.classList.toggle('manual-exception',sample.value==='missing'&&step>=1);
  const scenario=scenarios[sample.value];
  if(step<0){walk.textContent='Run sample';document.getElementById('result-step').textContent='READY TO WALK THROUGH';document.getElementById('result-title').textContent='Follow one renewal.';document.getElementById('result-copy').textContent='Choose a sample and run each step. See what n8n prepares and where the office takes over.';document.getElementById('result-outcome').textContent='Sample only';return}
  scenario.path.forEach((key,i)=>{
   if(i>step)return;const node=stage.querySelector(`[data-step="${key}"]`);node.classList.add(i===step?'walk-active':'walk-done');if(i===step)node.setAttribute('aria-current','step');
   if(i){const path=stage.querySelector(`path[data-from="${scenario.path[i-1]}"][data-to="${key}"]`);path?.classList.add(i===step?'wire-active':'wire-done')}
  });
  const [title,copy,outcome]=scenario.steps[step];
  document.getElementById('result-step').textContent=`SAMPLE ${String(step+1).padStart(2,'0')} / ${scenario.path.length}`;
  document.getElementById('result-title').textContent=title;document.getElementById('result-copy').textContent=copy;document.getElementById('result-outcome').textContent=outcome;
  walk.textContent=step===scenario.path.length-1?'Run again':`Next step · ${step+2} / ${scenario.path.length}`;
 };
 sample.addEventListener('change',()=>{step=-1;render()});
 walk.addEventListener('click',()=>{step=(step+1)%scenarios[sample.value].path.length;render();const current=stage.querySelector('.walk-active');if(matchMedia('(max-width:800px)').matches&&current)current.scrollIntoView({block:'nearest',inline:'center',behavior:'instant'})});
 drawAll();
})();
