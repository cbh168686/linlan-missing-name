/* Local story extension. All searches and communications remain fictional. */
ARCHIVE.push(
 {id:'radio-index',title:'广播站 · 剪报索引信号',date:'2018-06-16',gate:'mirror',category:'mirror',source:'周栩旧硬盘 · 信号练习转存',keys:['广播','索引','短码'],summary:'一段只包含两个字母的索引信号，旁边保留了广播社团的对照表。',body:'广播站用字母索引整理剪报；短码对应同一套留存文件。'},
 {id:'torn-leaf',title:'DT · 传习页残片',date:'2018-06-16',gate:'mirror',category:'mirror',source:'广播站剪报袋 · DT',keys:['DT','传习页','残片'],summary:'同一张传习页被分开留在四份私人材料里。保存残片后可在这里复原。',body:'纸袋上写着 DT。转存记录提到节目单、借阅单、旧帖附件和梁老师邮件里的四片残纸；复原后可按页上的原句检索。'},
 {id:'night-leaf',title:'归灯前七夜 · 未删节夹页',date:'2018-06-14',gate:'mirror',category:'mirror',source:'DT 剪报袋夹层 · 旧传习页扫描',keys:['有名者来','无名者留','有名者来无名者留','归灯前七夜'],summary:'原名不得应答。点名未毕，不得离席。',body:`<figure class="ceremony-image"><button type="button" class="ceremony-photo" data-idol-zoom aria-label="放大会场留影"><span class="idol-scene" data-idol-scene><img src="./assets/ceremony-mosaic-review-v1.png" alt="模糊的空礼堂留影：红色竖幅、鲜花、空椅子；中央供奉画是一尊旧金色的虚构多手坐像，脸部打有马赛克，胸口留着空名牌槽。竖幅写着有名者来、无名者留。"><span class="idol-eye" aria-hidden="true"><span class="idol-socket"><span class="idol-pupil"></span></span></span></span></button><figcaption>旧剪报袋中的会场留影 · 舞台已经布置完毕</figcaption></figure><div class="ritual-sheet"><small>同灯理事会 / 带班室留存 / 第七页</small><h2>有名者来，无名者留</h2><p>入席先面向守灯像。灯籍置于像前，原名牌收入胸前空槽。带班人代宣，余人同声答“在”。</p><p>来时称原名，入座改灯名。原名叫三遍，不得应。灯名叫一遍，众人代应。</p><div class="erasure-rows" aria-label="逐行撤去原名的点名表"><p><span>许知遥</span><b>听潮</b></p><p><span>沈嘉宁</span><b>白露</b></p><p><span>程砚秋</span><b>初灯</b></p></div><blockquote>有人问起旧名，答：这里从来没有这个人。</blockquote><div class="group-repetition"><p><small>听潮</small>我什么时候能回家？</p><p><small>值班员</small>这里就是家。不要在问。</p><p><small>丁组</small>这里就是家。不要在问。</p><p><small>丙组</small>这里就是家。不要在问。</p><p><small>〔空白〕</small>这里就是家。不要在问。</p><p class="roll-count">点名 36 位 / 具名 35 位 / 已应 36 位</p></div><p class="lamp-note">纸袋边注：三处方框内的字没有被重印。按从上到下的顺序读，可以找到梁老师留下的那一联。</p><div class="print-noise">冂亻留忄诵冫圭丷〔<b>复</b>〕亻归无旧口名<br>丶彳从忄勿乂丨禸〔<b>写</b>〕冖丬返忄辶之<br>冫无名忄为丨留廾〔<b>联</b>〕氵人亻不必返</div><button data-local="reading-lamp">打开扫描阅读灯</button><button data-action="phone" data-phone-who="files">在手机文件中查看这一页</button><p class="poster-retained">阅读记录已保留，无需另存即可继续检索。四张残纸仍需在各自附件处保存。</p><details><summary>展开资料员保留的页边批注</summary><p>梁惠，2018.06.18：知遥的书里为什么会夹着这个？背面“留名册转灯籍”的字，与更正申请复写联上的压痕一致。我把两张纸分开封存，不能只留正面。</p><p>袁诚用的是“个人信息更正”；这页教人怎么在被问起时统一回答。两份东西说的是同一件事。</p></details></div><p>这份夹页来自私人留存，不在学校公开档案里。游戏中的名单异常不会删除你的进度。</p><a class="button-link" href="#search?scope=private">按辨认出的词检索留存资料 →</a>`},
 {id:'arrival-cover',title:'家属开放日 · 参观确认单',date:'2028-06-15',gate:'board',category:'board',source:'同灯联络处 · 对外转发',keys:['参观','南院','开放日','确认单'],summary:'比接收通知晚一天发出的参观安排，写的是另一批人。',body:'<p>发送对象：项目参与者家属。6 月 17 日 20:30，于明心研学营南院接待处签到。</p><p>本单仅用于家属参观，不含寄宿学员接收及接送车辆调度。车辆事项请联系当日接收员。</p><p>联络员转发语：你们看，最新的通知就是这个，南院是对外开放的。那些旧东西不要再传了。</p>'}
);

function prologuePage(){return `<section class="prologue scroll-prologue"><section class="opening-hero" aria-labelledby="opening-title"><div class="opening-grain" aria-hidden="true"></div><div class="opening-layout"><div class="prologue-copy"><span class="eyebrow opening-reveal">一份校友调查记录 · 2028</span><h1 id="opening-title" class="opening-reveal">缺名册</h1><div class="opening-rule" aria-hidden="true"></div><p class="opening-line opening-reveal">你还记得，<br>我们班原来有多少人吗？</p><p class="opening-context opening-reveal">校庆征集旧照片。一个重新打开的纸箱。<br>故事从一本借出去的旧书开始。</p><p class="opening-date opening-reveal">2028 年 6 月 15 日 · 09:18<br>老同学周栩发来一条微信。</p><div class="opening-mobile-message" aria-hidden="true"><span>微信 · 周栩</span><p>在吗？</p></div></div><div class="desk-phone opening-phone" aria-hidden="true"><div class="desk-clock">09:18</div><p>6 月 15 日　星期四</p><div class="desk-notification"><b>微信</b><strong>周栩</strong><span>在吗？</span></div><div class="desk-bar"></div></div></div><button class="opening-scroll" data-local="intro-scroll"><span>向下阅读游玩提示</span><span aria-hidden="true">↓</span></button><span class="opening-build">公开试玩版 · v0.9.5</span></section><section class="opening-consent" id="opening-consent" aria-labelledby="opening-notice" tabindex="-1"><div class="opening-notice-copy"><span class="eyebrow">开始之前</span><h2 id="opening-notice">游玩提示</h2><p>你与周栩于 2018 年从临澜实验中学高三（七）班毕业。如今是 2028 年，你们已经离校十年。这次校庆让老同学重新联系，调查从他的微信开始。</p><p>本作人物、学校与组织均属虚构，包含邪教、失踪、心理控制、怪异眼部图像与暗红画面。有光敏性癫痫或对相关内容敏感的玩家请勿游玩；感到不适请立即停止。</p><p>无高频闪烁。索引录音页会播放短音，可随时停止；其他页面没有突然音效。</p></div><div class="opening-begin"><button class="primary" data-local="${state.started?'continue-game':'start'}">${state.started?'继续游戏':'已阅读，开始调查'}<span aria-hidden="true"> →</span></button>${state.started?'<button class="opening-restart" data-action="restart">重新开始</button>':''}<p class="help-note">${state.started?'已保存上次进度。可继续，也可从头开始。':'进度自动保存在当前浏览器，可随时重新开始。'}<br>故事中的消息不会发送给真实联系人。</p></div></section></section>`;}

function markInvestigationRead(id){if(!state.visited.includes(id)){state.visited.push(id);save();}}
function investigationPage(id){return id==='radio'?radioPage():id==='tiles'?tilePage():missing();}
const MORSE={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..'};
function radioPage(){
 if(!state.mirror)return gate('mirror');markInvestigationRead('radio-index');
 return `<section class="panel puzzle-room"><span class="eyebrow">周栩的旧硬盘 / 广播站剪报袋</span><h1>一个没有念出声的索引</h1><p>周栩：这是广播社团的信号练习。知遥负责剪报，用两个字母标文件袋，又把索引敲进练习录音里。我按原来的短码重新合成了一遍，背景噪声去掉了。</p><div class="radio-deck" data-radio><span>索引练习 03 · 单声道</span><div class="tape-display" aria-hidden="true"><i></i><span>03 / 留存录音</span><i></i></div><p id="signal-status" role="status">准备播放索引录音…</p><button data-local="audio" id="play-signal">▶ 收听 / 重播</button><button data-local="audio-stop">停止</button><p>进入这一页会播放一次，不循环。听完后，用长短音对照下方的字母表。浏览器若未允许自动播放，点“收听”即可。</p></div><details class="signal-transcript"><summary>无法听音？查看同一段录音的文字记录</summary><p>这是听音的替代方式；先尝试收听，再按需展开。</p><div class="wave-bars" aria-label="信号为长短短，间隔，长"><i class="long"></i><i></i><i></i><b>/</b><i class="long"></i></div></details><details class="morse-reference"><summary>展开广播社团的摩斯对照表</summary><p>· 表示短音，— 表示长音；斜线隔开两个字母。这次只有字母，没有数字。</p><div>${Object.entries(MORSE).map(([k,v])=>`<span><b>${k}</b> ${v.replaceAll('-','—').replaceAll('.','·')}</span>`).join('')}</div></details>${state.investigation.morse?'<div class="verified-box"><h2>DT</h2><p>周栩：对，是文件袋的索引。试试在留存资料里检索这两个字母。</p><a class="button-link" href="#search?scope=private">打开留存资料检索 →</a></div>':'<form id="signal-form"><label for="signal-answer">信号对应哪两个字母？</label><div class="search-row"><input id="signal-answer" name="answer" maxlength="12" autocomplete="off" placeholder="两个字母"><button class="primary">核对索引</button></div><p id="signal-error" class="error" role="status"></p></form>'}<a href="#mirror">← 返回留存包</a></section>`;
}
let selectedTile=null,activeRecording=null,signalRun=0,radioPageActive=false;
function signalStatus(text){const label=document.querySelector('#signal-status');if(label)label.textContent=text;}
function stopSignal(){signalRun++;if(activeRecording){activeRecording.pause();try{activeRecording.currentTime=0;}catch{}}signalStatus('已停止。');}
async function playSignal(){
 const audio=document.querySelector('#signal-audio');if(!audio)return;
 stopSignal();activeRecording=audio;const run=signalRun;signalStatus('准备播放…');
 try{await audio.play();if(run!==signalRun){audio.pause();return;}signalStatus('正在播放…');}catch{if(run===signalRun)signalStatus('点击播放器的播放键收听。');}
}
function setupRadioAudio(){
 const audio=document.querySelector('#signal-audio');
 if(!audio){if(radioPageActive)stopSignal();radioPageActive=false;activeRecording=null;return;}
 if(radioPageActive&&activeRecording===audio)return;const newlyOpened=!radioPageActive;if(activeRecording!==audio)stopSignal();activeRecording=audio;radioPageActive=true;
 audio.addEventListener('ended',()=>signalStatus('播放结束，可以重新收听。'));
 audio.addEventListener('play',()=>signalStatus('正在播放…'));
 audio.addEventListener('pause',()=>{if(!audio.ended)signalStatus('已暂停。');});
 audio.addEventListener('error',()=>signalStatus('录音加载失败，可重试或查看文字转录。'));
 if(newlyOpened)playSignal();else signalStatus('点击播放器可重新收听。');
}
function tileButton(n,slot){const item=SCRAPS[n];return `<button class="tile" data-tile="${n}" ${slot===undefined?'':`data-slot="${slot}"`} draggable="true" aria-label="${esc(item.name)}${slot===undefined?'':`，位于第 ${slot+1} 格`}" aria-pressed="${selectedTile===n}">${scrapImage(item.source)}<span class="sr-only">${esc(item.name)}</span></button>`;}
// The view is provided by archive-web.js, sharing the same file-preview interface.
function localHints(){
 let h;if(!state.prologueDone)h=['先拿起手机，回复周栩。','跟随旧书、纸条和旧聊天逐步核对。聊到新名单时，周栩会发来学校官网的链接。','点开周栩发来的校友信息核对通知。'];
 else if(state.mirror&&!state.board&&!state.investigation.morse)h=['周栩的广播索引对应一个剪报袋。','长短短是一个字母，斜线后只有一个长音。','摩斯信号是 D、T。核对后，在个人留存资料里搜 DT。'];
 else if(state.mirror&&!state.board&&state.investigation.collected.length<4)h=['四片纸分开留在旧材料里。打开后，还要点附件下面的保存按钮。','沿着每份附件旁的便笺找下一处；手机“文件”会保留已经保存的纸片和来源。','节目单留底、借阅单背面、旧站务帖的本地附件、梁惠的邮件，各有一片。保存四片后去 DT 拼接页。'];
 else if(state.mirror&&!state.board&&!GameCore.tilesComplete(state))h=['已保存的四片纸可以拼回同一张传习页。','装订线在左，圆纹要闭合，文字按上下两行读。','左上是借阅单夹纸，右上是旧帖残角，左下是节目单残纸，右下是梁惠保留的纸角。拼好后按纸上的句子检索。'];
 else if(state.mirror&&!state.board&&!state.visited.includes('night-leaf'))h=['拼出的用语对应另一份私人夹页。','请用个人留存资料检索，不是学校公开搜索。','搜索“无名者留”，打开归灯前七夜夹页；再读梁老师邮件里的复写联，与折页核对。'];
 else if(state.vault&&!state.caseSolved)h=['改表记录、近期消息的真伪和接收行程需要分别核实，去手机里看谁在等材料。','周栩需要执行记录；沈嘉宁需要带原始日期与封存附页的值班簿；折页需要接收车辆通知。点击聊天输入栏旁的＋，从已读附件选择。','给周栩发“资料处置单”，给沈嘉宁发“被重抄的那一页”，给折页发“接送安排修订版”。没读过的原件可在档案柜或本段“原始材料”里打开。'];
 if(!h)return false;modal(`<h2 id="dialog-title">这一段需要一点提示？</h2>${h.map((x,i)=>`<details><summary>${i+1} 级 · ${['方向','具体提示','答案（剧透）'][i]}</summary><p>${x}</p></details>`).join('')}`);return true;
}
document.addEventListener('submit',e=>{if(e.target.id!=='signal-form')return;e.preventDefault();const err=GameCore.decode(state,new FormData(e.target).get('answer'));if(err){document.querySelector('#signal-error').textContent=err;return;}save();render();});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-local]');if(b){const a=b.dataset.local;
 if(a==='intro-scroll'){document.querySelector('#opening-consent')?.scrollIntoView({behavior:state.motion?'smooth':'auto',block:'start'});}
 if(a==='start'){entryVisible=false;state.started=true;state.startedAt??=Date.now();save();render();openPhone('zhou');}
 if(a==='continue-game')continueGame();
 if(a==='reading-lamp')document.querySelector('.print-noise')?.classList.toggle('reading-lamp');
 if(a==='audio')playSignal().catch(()=>toast('声音未能播放，可以使用波形对照。'));
 if(a==='audio-stop')stopSignal();
 if(a==='tile-reset'){state.investigation.tiles=Array(4).fill(null);selectedTile=null;save();render();}
 if(a==='collect-scrap'){const err=GameCore.collectScrap(state,b.dataset.source);if(err)return toast(err);save();refreshPhone();b.disabled=true;b.textContent='已保存到手机文件';b.closest('.scrap-attachment').querySelector('.scrap-save-status').textContent=`纸片已保存 · 共 ${state.investigation.collected.length}/4 张`;toast('纸片已保存到手机的文件中，来源也一起保留。');}
 if(a==='tile-check'){const count=state.investigation.tiles.filter((n,i)=>n===i).length;document.querySelector('#tile-feedback').textContent=`有 ${count} 块纸纹吻合。看圆纹能否连成一个完整的圆，文字有没有被截断。`;}
 }
 const t=e.target.closest('[data-tile], [data-slot]');if(!t)return;
 if(selectedTile!==null&&t.dataset.slot!==undefined){const err=GameCore.placeTile(state,selectedTile,+t.dataset.slot);if(err)return toast(err);selectedTile=null;save();const y=window.scrollY;render();window.scrollTo(0,y);}
 else if(t.dataset.tile!==undefined){selectedTile=+t.dataset.tile;document.querySelectorAll('[data-tile]').forEach(el=>el.setAttribute('aria-pressed',String(+el.dataset.tile===selectedTile)));document.querySelector('#tile-feedback').textContent='纸片已选中，再点要放入的位置。';}
});
document.addEventListener('dragstart',e=>{const t=e.target.closest('[data-tile]');if(t){selectedTile=+t.dataset.tile;e.dataTransfer.setData('text/plain',t.dataset.tile);}});
document.addEventListener('dragover',e=>{if(e.target.closest('[data-slot]'))e.preventDefault();});
document.addEventListener('drop',e=>{const t=e.target.closest('[data-slot]');if(!t)return;e.preventDefault();if(selectedTile===null)return;const err=GameCore.placeTile(state,selectedTile,+t.dataset.slot);if(err)return toast(err);selectedTile=null;save();const y=window.scrollY;render();window.scrollTo(0,y);});
window.addEventListener('hashchange',()=>{radioPageActive=false;stopSignal();});window.addEventListener('pagehide',stopSignal);
