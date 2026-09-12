function eyePlate(count=3){if(!state.horror)return coveredHorror('眼部恐怖画面');return `<div class="eye-plate" aria-label="器物图册中的异常眼部影像">${Array.from({length:count},(_,i)=>`<div class="eye-row eye-${i}" style="--row:${i*50}%;--delay:${i*2.3}s"><div class="eye-open"><div class="iris-mask"><img class="watching-iris" src="./assets/iris.png" alt="" draggable="false"></div></div></div>`).join('')}<span class="plate-index">器物留影 / 原编号 00—02</span></div><p class="help-note">恐怖图像可在设置中隐藏；关闭动态效果后停止眨眼和视线跟随。</p>`;}
function coveredHorror(label){return `<div class="image-covered"><strong>已隐藏${label}</strong><p>正文、线索与结局均可正常继续。可在设置中恢复。</p></div>`;}
function pastedEyes(count=48){return `<div class="pasted-eyes" aria-hidden="true">${Array.from({length:count},(_,i)=>`<i class="pasted-eye" style="--eye-row:${i%3*50}%;--eye-tilt:${[0,-7,4,0,8,-3][i%6]}deg;--eye-delay:${-(i%7)*2.1}s"><b><img src="./assets/iris.png" alt="" draggable="false"></b></i>`).join('')}</div>`;}
const fragmentText={effigy:['像不必睁眼。','灯下的人会替它看。','原来的名字不要写在这里。','这页已经有人答过“在”。'],chant:['借来的名字，什么时候归还。','这一行没有人教过我。','我停下来以后，','纸上还多了一声“在”。']};
function damagedText(text,seed=0){const noise='□▓囗祀▥归灯在';return [...text].map((c,i)=>(i+seed)%4===0?c:noise[(i*3+seed)%noise.length]).join('');}
function glyphFringe(){return '<div class="glyph-fringe" aria-hidden="true"><span>囗□　归灯▥归灯　姓▓名□　祀囗在　□□　归灯　</span><span>在在□在　▓▓无名　囗祀▥　已□答　归灯归灯　</span></div>';}
function marginalia(kind){return `<section class="damaged-fragment" data-fragment="${kind}" data-deciphered="false" aria-label="留页边缘的损坏字迹"><div class="fragment-heading"><span>页边残字 / 重复压印</span><button data-decipher-fragment aria-expanded="false">辨认残字</button></div><div class="fragment-scraps" aria-hidden="true">${fragmentText[kind].map((line,i)=>`<p data-fragment-line="${i}">${damagedText(line,i)}</p>`).join('')}</div><p class="fragment-reading" aria-live="polite" hidden></p><span class="fragment-footnote">照片下面还有字。墨迹重叠了几遍。</span></section>`;}
let fragmentTimer=null;
function setupFragments(){clearInterval(fragmentTimer);if(!state.motion||!state.horror||!document.querySelector('[data-fragment]'))return;let tick=0;fragmentTimer=setInterval(()=>{if(!state.motion||!state.horror||document.hidden||document.querySelector('dialog[open]'))return;tick++;document.querySelectorAll('[data-fragment][data-deciphered="false"]').forEach(box=>{const i=tick%4,line=box.querySelector(`[data-fragment-line="${i}"]`);line.textContent=damagedText(fragmentText[box.dataset.fragment][i],tick);});},9000);}
function effigyPlate(){return `<section class="horror-exhibit effigy-exhibit" data-effigy-side="front" aria-label="守灯像器物留影与背页"><div class="exhibit-bar"><span>陈列像 A / 器物组留影</span><span>原名位：空</span></div><div class="effigy-collage">${pastedEyes(36)}${glyphFringe()}<img class="effigy-photo" src="./assets/lamp-effigy-v1.png" alt="六只木手围着胸口空名牌槽的旧金色守灯像，四周贴满黑白眼睛"><span class="effigy-strip strip-left" aria-hidden="true">不问旧姓　不认旧人</span><span class="effigy-strip strip-right" aria-hidden="true">有目无名　有名无声</span><div class="effigy-reverse"><span>背 页 压 字</span><strong>像没有睁眼。<br>是纸上的眼睛<br>在替它看。</strong><p>原名位不可空置。<br>若未收到名牌，<br>先填答应的人。</p></div><span class="effigy-number">A—017 / 不得裁去页边</span></div>${marginalia('effigy')}<p class="exhibit-caption" data-effigy-note aria-live="polite">名牌槽是空的。四周的眼睛有相同的剪口，像是从同一张纸上反复剪下来。</p><div class="exhibit-controls"><span>留影 / 附背页</span><button data-effigy-flip>翻到背页</button></div></section>`;}
const corridorFrames=[
  {time:'20:07:12',note:'走廊里没有人。最里面的门开着。'},
  {time:'20:07:13',note:'红灯亮了一点。墙上的门牌仍看不清。'},
  {time:'20:07:13',note:'仍然是同一秒。门和墙上的裂痕却换到了另一边。'},
  {time:'20:07:12',note:'时码退回去了。走廊恢复原样，红光却暗了下去。'}
];
function corridorPlate(){return `<section class="horror-exhibit corridor-exhibit" data-corridor-frame="0" aria-label="北院走廊监控留帧"><div class="exhibit-bar"><span>北院 / 二楼东廊</span><span>本地留帧 · 04 张</span></div><div class="cctv-image"><img src="./assets/north-corridor-v1.png" alt="北院夜间的空走廊，尽头透出暗红色的光"><div class="cctv-scan" aria-hidden="true"></div><span class="cctv-label">CAM 02 · 2028 / 06 / 14</span><time class="cctv-time">20:07:12</time><span class="cctv-file">FRAME 01 / 04</span></div><p class="exhibit-caption" aria-live="polite">${corridorFrames[0].note}</p><div class="exhibit-controls"><button data-corridor-step="-1" disabled>上一帧</button><span data-corridor-index>01 / 04</span><button data-corridor-step="1">下一帧 →</button></div></section>`;}
function rollcallPlate(){return `<section class="horror-exhibit rollcall-exhibit" data-rollcall-step="0" aria-label="晚间点名页"><div class="exhibit-bar"><span>二十点 / 点名留页</span><span>原件有覆盖痕迹</span></div><div class="rollcall-paper"><div class="ritual-header"><span>静 修 院 内 用</span><strong>到　院　名　录</strong><small>不得答原名　不得代答　不得回头</small></div><div class="rollcall-entry"><span class="roll-number">018</span><span class="roll-name" data-roll-name>许知遥</span><span class="roll-status" data-roll-status>未应答</span></div><div class="rollcall-entry forbidden-entry"><span class="roll-number">000</span><span class="roll-name">何宁</span><span class="roll-status" data-ning-status>空位</span></div><div class="rollcall-entry newcomer-entry"><span class="roll-number">—</span><span class="roll-name">读到这里的人</span><span class="roll-status">等你回答</span></div><div class="rollcall-stamp" aria-hidden="true">本 页 无 此 人</div><p class="rollcall-hand" data-roll-note aria-live="polite">底下有另一个名字。擦掉上面的墨，应该还能看见。</p></div><div class="exhibit-controls"><span data-roll-progress>覆盖层 01 / 04</span><button data-rollcall-next>揭开下一层</button></div></section>`;}

const ritualLines=[
 ['借一人的旧名','留一盏未灭的灯','活人向后一步','亡者便向前一步'],
 ['灯前无旧姓','灯后无来人','你替谁守着','谁替你应门'],
 ['第一遍，屋内的人答在','第二遍，屋外的人答在','第三遍，不要数声音','第四遍——'],
 ['你还没有往下读','下一行已经写好了','在。','在。 在。 在。']
];
function chantPlate(){return `<section class="horror-exhibit chant-exhibit" data-chant-step="0" aria-label="归灯诵读页"><div class="exhibit-bar"><span>守灯会 · 归灯前七夜</span><button class="ritual-cover-button" data-ritual-open>展开封面</button></div><div class="chant-paper">${glyphFringe()}<div class="chant-echo" aria-hidden="true">借名　留灯　候归<br>借名　留灯　候归<br>借名　留灯　候归</div><span class="chant-counter">第 一 遍</span><div class="chant-lines" aria-live="polite">${ritualLines[0].map(t=>`<p>${t}</p>`).join('')}</div><div class="chant-answer" aria-hidden="true">在</div></div>${marginalia('chant')}<div class="exhibit-controls"><span data-chant-note>末尾须停一次</span><button data-chant-next>往下读</button></div></section>`;}
const nameSearchShown=new Set();
let nameRevealTimer=null;
function showNameAnomaly(){
 if(!state.horror||!state.motion||document.querySelector('dialog[open]'))return;
 nameSearchShown.add('name');
 let screen=document.querySelector('.name-interruption');
 if(!screen){screen=document.createElement('dialog');screen.className='ritual-interruption name-interruption';screen.setAttribute('aria-label','旧名录检索异常');document.body.append(screen);screen.addEventListener('close',()=>clearTimeout(nameRevealTimer));}
 screen.innerHTML=`${pastedEyes(70)}${glyphFringe()}<button class="ritual-exit" data-name-close autofocus>关闭窗口 ×</button><div class="name-panel"><span class="name-receipt">旧名录 / 索引回执　000</span><p class="name-missing">未找到此人</p><div class="name-search-reveal" data-name-reveal hidden><p class="name-command">不要再叫<br>他的名字</p><p class="name-noise" aria-hidden="true">许□▓遥　囗□▥　归灯在在在<br>姓▓名□　已更正　□□□</p><p class="name-echo">你每叫一遍，<br>就有一双眼睛替他答应。</p></div><p class="name-status">查询记录：已更正。<br>请以现存名册为准。</p><button class="ritual-return" data-name-close>返回检索</button></div>`;
 screen.querySelectorAll('[data-name-close]').forEach(b=>b.onclick=()=>screen.close());screen.showModal();
 clearTimeout(nameRevealTimer);nameRevealTimer=setTimeout(()=>{if(screen.open){screen.querySelector('[data-name-reveal]').hidden=false;screen.classList.add('name-revealed');}},1300);
}
const ritualShown=new Set(),corruptionShown=new Set();
let corruptionTimer=null,restoreCorruption=null;
function clearDread(){clearTimeout(corruptionTimer);clearInterval(fragmentTimer);if(restoreCorruption)restoreCorruption();clearTimeout(nameRevealTimer);document.querySelectorAll('.ritual-interruption').forEach(el=>el.close());}
function showRitualCover(){
 if(!state.horror)return;
 let screen=document.querySelector('.ritual-interruption');
 if(!screen){screen=document.createElement('dialog');screen.className='ritual-interruption';screen.setAttribute('aria-label','封存附件的异常封面');document.body.append(screen);}
 screen.innerHTML=`${pastedEyes()}${glyphFringe()}<div class="ritual-rim" aria-hidden="true">借名 留灯 候归　借名 留灯 候归　借名 留灯 候归</div><button class="ritual-exit" data-ritual-close>关闭封面 ×</button><div class="ritual-center"><span>归 灯 前 七 夜 / 封 存</span><p class="ritual-command">不 要<br>读 出 原 名</p><p class="ritual-whisper">你读过一遍，灯下便留一遍。<br>你少念一个字，就有人替你念完。</p><button data-ritual-close class="ritual-return">返回文件</button></div><div class="ritual-bottom">灯前无旧姓　灯后无来人　灯前无旧姓　灯后无来人</div>`;
 screen.querySelectorAll('[data-ritual-close]').forEach(b=>b.onclick=()=>screen.close());screen.showModal();
}
function corruptIndex(){
 if(!state.horror||!state.motion||!document.querySelector('#search-form'))return;
 const records=[],walker=document.createTreeWalker(main,NodeFilter.SHOW_TEXT),glyphs='魙巟▓□祀囗黯祟屮▥归灯';let node;
 while(node=walker.nextNode()){if(!node.textContent.trim()||node.parentElement.closest('button,input,select,textarea,label,script,[aria-live="assertive"]'))continue;records.push([node,node.textContent]);node.textContent=[...node.textContent].map((c,i)=>/\s/.test(c)?c:glyphs[(c.charCodeAt(0)+i*7)%glyphs.length]).join('');}
 document.body.classList.add('index-corrupted');
 const notice=document.createElement('div');notice.className='index-recovery';notice.innerHTML='<div><small>索引异常 / 字段重复</small><strong>这个名字不在这里。这个名字不在这里。</strong></div><button>重读索引</button>';document.body.append(notice);
 const restore=()=>{records.forEach(([n,t])=>{if(n.isConnected)n.textContent=t;});document.body.classList.remove('index-corrupted');notice.remove();document.removeEventListener('keydown',escape);restoreCorruption=null;};
 const escape=e=>{if(e.key==='Escape')restore();};restoreCorruption=restore;notice.querySelector('button').onclick=restore;document.addEventListener('keydown',escape);
}
function scheduleDread(){
 const hash=location.hash;
 if(hash.startsWith('#search')&&state.horror&&state.motion&&!nameSearchShown.has('name')){const p=new URLSearchParams(hash.split('?')[1]||'');if(p.get('scope')!=='private'&&/知遥/.test(p.get('q')||'')){corruptionTimer=setTimeout(()=>{if(location.hash===hash)showNameAnomaly();},450);return;}}

 if(state.horror&&state.motion&&(document.querySelector('[data-sealed-trigger]')||document.querySelector('[data-horror-scene="chant"]'))&&!ritualShown.has('chant')){ritualShown.add('chant');corruptionTimer=setTimeout(()=>{if(location.hash===hash)showRitualCover();},450);return;}
 if(!state.horror||!state.motion||!hash.startsWith('#search'))return;
 const params=new URLSearchParams(hash.split('?')[1]||''),query=params.get('q')||'';
 if(params.get('scope')==='private'&&state.mirror&&/守灯|归灯|借名|点名|何宁/.test(query)&&!corruptionShown.has('first-index')){corruptionShown.add('first-index');corruptionTimer=setTimeout(()=>{if(location.hash===hash)corruptIndex();},650);}
}

function setupEyes(){
  const eyes=document.querySelectorAll('[data-eye-plate]'),scenes=document.querySelectorAll('[data-horror-scene]');
  document.body.classList.toggle('uncanny-catalogue',state.horror&&((eyes.length+scenes.length)>0||!!document.querySelector('.ending[data-ending="bad"]')));
  document.querySelector('.cult-eye-wall')?.remove();
  const collage=state.horror&&!!document.querySelector('[data-horror-scene="chant"],[data-horror-scene="effigy"]');
  document.body.classList.toggle('cult-collage',collage);
  if(collage){const wall=document.createElement('div');wall.className='cult-eye-wall';wall.setAttribute('aria-hidden','true');wall.innerHTML=pastedEyes(96);document.body.prepend(wall);}
  eyes.forEach(el=>el.innerHTML=eyePlate());
  scenes.forEach(el=>{const kind=el.dataset.horrorScene;el.innerHTML=!state.horror?coveredHorror('恐怖场景'):kind==='corridor'?corridorPlate():kind==='rollcall'?rollcallPlate():kind==='chant'?chantPlate():kind==='effigy'?effigyPlate():'';});
  setupFragments();
}
let eyeFrame=0,lastPointer=null;
document.addEventListener('pointermove',e=>{if(!state.motion||!state.horror||document.hidden||dialog.open)return;lastPointer={x:e.clientX,y:e.clientY};if(eyeFrame)return;eyeFrame=requestAnimationFrame(()=>{eyeFrame=0;document.querySelectorAll('.eye-row').forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const x=Math.max(-1,Math.min(1,(lastPointer.x-r.x-r.width/2)/(r.width*.65))),y=Math.max(-1,Math.min(1,(lastPointer.y-r.y-r.height/2)/250));el.style.setProperty('--look-x',`${x*20}%`);el.style.setProperty('--look-y',`${y*12}%`);});});},{passive:true});
document.addEventListener('click',e=>{
  const decipher=e.target.closest('[data-decipher-fragment]');
  if(decipher){const box=decipher.closest('[data-fragment]'),open=box.dataset.deciphered!=='true',reading=box.querySelector('.fragment-reading');box.dataset.deciphered=String(open);box.querySelector('.fragment-scraps').hidden=open;reading.hidden=!open;reading.innerText=open?fragmentText[box.dataset.fragment].join('\n'):'';decipher.setAttribute('aria-expanded',String(open));decipher.textContent=open?'合上附签':'辨认残字';}
  const effigy=e.target.closest('[data-effigy-flip]');
  if(effigy){const box=effigy.closest('.effigy-exhibit'),back=box.dataset.effigySide==='front';box.dataset.effigySide=back?'back':'front';effigy.textContent=back?'翻回留影':'翻到背页';box.querySelector('[data-effigy-note]').textContent=back?'背面没有登记造像的名字，只规定了谁来填那个空位。':'名牌槽是空的。四周的眼睛有相同的剪口，像是从同一张纸上反复剪下来。';}
  if(e.target.closest('[data-ritual-open]'))showRitualCover();
  const chant=e.target.closest('[data-chant-next]');
  if(chant){const box=chant.closest('.chant-exhibit'),n=(+box.dataset.chantStep+1)%4;box.dataset.chantStep=n;box.querySelector('.chant-counter').textContent=['第 一 遍','第 二 遍','第 三 遍','第 四 遍'][n];box.querySelector('.chant-lines').innerHTML=ritualLines[n].map(t=>`<p>${t}</p>`).join('');box.querySelector('[data-chant-note]').textContent=['末尾须停一次','屋外还没有人答应','最后一行没有写完','是谁替你念完了'][n];chant.textContent=n===3?'合上，重新读':'往下读';}
  const frame=e.target.closest('[data-corridor-step]');
  if(frame){const box=frame.closest('.corridor-exhibit'),n=Math.max(0,Math.min(3,+box.dataset.corridorFrame+ +frame.dataset.corridorStep)),f=corridorFrames[n];box.dataset.corridorFrame=n;box.querySelector('.cctv-time').textContent=f.time;box.querySelector('.cctv-file').textContent=`FRAME 0${n+1} / 04`;box.querySelector('.exhibit-caption').textContent=f.note;box.querySelector('[data-corridor-index]').textContent=`0${n+1} / 04`;box.querySelector('[data-corridor-step="-1"]').disabled=n===0;box.querySelector('[data-corridor-step="1"]').disabled=n===3;}
  const roll=e.target.closest('[data-rollcall-next]');
  if(roll){const box=roll.closest('.rollcall-exhibit'),n=(+box.dataset.rollcallStep+1)%4;box.dataset.rollcallStep=n;box.querySelector('[data-roll-name]').textContent=n?'听潮':'许知遥';box.querySelector('[data-roll-status]').textContent=n?'在':'未应答';box.querySelector('[data-ning-status]').textContent=n>=2?'在':'空位';box.querySelector('[data-roll-note]').textContent=['底下有另一个名字。擦掉上面的墨，应该还能看见。','被盖掉的不是“听潮”，是“许知遥”。原名旁边没有应答栏。','何宁的名字旁边也写着“在”。他在三十年前就已经去世了。','背面只有这一句：既然看见了，就别假装没有听见点名。'][n];box.querySelector('[data-roll-progress]').textContent=`覆盖层 0${n+1} / 04`;roll.textContent=n===3?'重新查看':'揭开下一层';}
});
