/* The selected B photograph, with a scoped eye effect and a normal image preview. */
let ceremonyCleanup=()=>{},closeCeremonyPhoto=()=>{};
function clearCeremony(){closeCeremonyPhoto();ceremonyCleanup();ceremonyCleanup=()=>{};}
function setupCeremony(){
 clearCeremony();
 const scenes=[...document.querySelectorAll('[data-idol-scene]')];
 if(!scenes.length||!state.horror)return;
 const controller=new AbortController(),timers=new Set(),active=new Set(scenes);
 let viewer=null,frame=0,pointer=null;
 const wake=scene=>{
  if(scene.dataset.idolWatching)return;
  scene.dataset.idolWatching='true';
  if(!state.motion){scene.classList.add('idol-still');return;}
  const t=setTimeout(()=>{timers.delete(t);if(scene.isConnected)scene.classList.add('idol-awake');},3500);
  timers.add(t);
 };
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){wake(e.target.matches('[data-idol-scene]')?e.target:e.target.querySelector('[data-idol-scene]'));observer.unobserve(e.target);}}),{threshold:.15});
 scenes.forEach(scene=>{scene.classList.remove('idol-awake','idol-still');delete scene.dataset.idolWatching;observer.observe(scene.closest('[data-idol-viewport]')||scene);});
 const close=(restoreFocus=false)=>{
  if(!viewer)return;
  const previous=viewer,trigger=previous.trigger;
  viewer=null;active.delete(previous.scene);previous.dialog.close();previous.dialog.remove();
  if(restoreFocus&&trigger.isConnected)trigger.focus();
 };
 closeCeremonyPhoto=()=>close();
 document.addEventListener('click',e=>{
  const trigger=e.target.closest('[data-idol-zoom]');
  if(!trigger||viewer)return;
  const source=trigger.querySelector('[data-idol-scene]');if(!source)return;
  const box=document.createElement('dialog');box.className='ceremony-photo-viewer';box.setAttribute('aria-label','会场留影 · 图片预览');
  box.innerHTML='<header><span>会场留影 / 局部放大</span><button type="button" aria-label="关闭图片预览">关闭 ×</button></header><div class="idol-detail-crop"></div><p>旧剪报袋中的会场留影</p>';
  const scene=source.cloneNode(true);scene.querySelector('img').alt='同一张会场照片的供像局部：脸部马赛克，胸口留有空名牌槽。';
  delete scene.dataset.idolWatching;
  box.querySelector('.idol-detail-crop').append(scene);document.body.append(box);
  viewer={dialog:box,scene,trigger};active.add(scene);
  box.querySelector('button').addEventListener('click',()=>close(true),{signal:controller.signal});
  box.addEventListener('cancel',e=>{e.preventDefault();close(true);},{signal:controller.signal});
  box.addEventListener('click',e=>{if(e.target===box)close(true);},{signal:controller.signal});
  box.showModal();if(!source.classList.contains('idol-awake'))wake(scene);
 },{signal:controller.signal});
 document.addEventListener('pointermove',e=>{
  if(!state.motion||document.hidden)return;
  pointer={x:e.clientX,y:e.clientY};if(frame)return;
  frame=requestAnimationFrame(()=>{frame=0;active.forEach(scene=>{
   if(!scene.classList.contains('idol-awake')||(viewer&&scene!==viewer.scene))return;
   const eye=scene.querySelector('.idol-eye'),r=eye.getBoundingClientRect();
   if(!r.width||r.bottom<0||r.top>innerHeight)return;
   const dx=Math.max(-1,Math.min(1,(pointer.x-r.x-r.width/2)/(innerWidth*.35))),dy=Math.max(-1,Math.min(1,(pointer.y-r.y-r.height/2)/(innerHeight*.35)));
   eye.style.setProperty('--eye-x',dx*r.width*.2+'px');eye.style.setProperty('--eye-y',dy*r.height*.16+'px');
  });});
 },{passive:true,signal:controller.signal});
 ceremonyCleanup=()=>{controller.abort();observer.disconnect();timers.forEach(clearTimeout);cancelAnimationFrame(frame);};
}
window.addEventListener('pagehide',clearCeremony);
