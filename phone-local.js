/* Fictional phone. No account login, remote messages or AI-generated responses. */
let phoneWho='',phoneNoticeTimer=null,phonePriorFocus=null,phoneLastCount=0;
let deliveryTimer=null,phoneDrawer='',replyDraft=null,focusedEpisode='',phoneSearch='',phoneJump='';
const avatar=(who)=>`<span class="avatar ${who}" aria-hidden="true">${({zhou:'',clerk:'折',shen:'',liaison:'灯',self:'',deleted:'○'})[who]??''}</span>`;
const phoneElement=()=>document.querySelector('#phone-dialog');
// Reception follows the fictional location, never the player's real connection.
function phoneHasService(s=state){return s.ending!=='bad';}
function phoneStatusMarkup(){return `<span class="phone-reception">${phoneHasService()?'<span class="cellular-bars" aria-hidden="true"><span></span><span></span><span></span><span></span></span><span class="phone-network-label">5G</span>':'<span class="phone-network-label no-service">无服务</span>'}</span><b class="battery" aria-hidden="true"></b>`;}
function updatePhoneStatus(){const clock=document.querySelector('.phone-status>span:first-child');if(clock)clock.textContent=phoneHasService()?'09:18':'20:17';const indicators=document.querySelector('.phone-indicators');if(!indicators)return;indicators.innerHTML=phoneStatusMarkup();indicators.setAttribute('aria-label',phoneHasService()?'5G，信号满格，电量 82%':'无服务，电量 82%');phoneElement().classList.toggle('phone-no-service',!phoneHasService());}
function offlineComposer(){return `<div class="phone-compose-wrap"><div class="phone-offline-notice">当前无服务，无法发送消息</div>${phoneWho==='zhou'?`<p class="offline-draft-date">6 月 17 日 20:17 · 未送达的消息</p><div class="offline-send-preview">${state.phone.offlineAttempt?'<span class="send-failed-mark" aria-hidden="true">!</span>':''}<p>周栩，我到北院了。你能收到吗？</p></div><div class="offline-send-actions"><span role="status">${state.phone.offlineAttempt?'发送失败 · 网络连接不可用':'消息尚未发送'}</span><button data-offline-send>${state.phone.offlineAttempt?'重试':'发送'}</button></div>`:'<p class="offline-history-note">已保存的聊天记录仍可查看。</p>'}</div>`;}
const fileCandidates={
 'zhou-count':['printing','reunion','programme'],
 'clerk-intro':['carbon','letter-liang','printing'],
 'verify-erasure':['yuan-order','carbon','ledger','printing'],
 'shen-proof':['dutylog','bailu-now','bait'],
 'clerk-route':['arrival','arrival-cover','current-list']
};
function newPhoneContacts(){return phoneHasService()?ChatStory.available(state).filter(p=>p.id!=='zhou'&&p.id!==phoneWho&&!(state.phone.openedContacts||[]).includes(p.id)):[];}
function phoneContactAlerts(){return newPhoneContacts().map(p=>`<button class="phone-contact-alert" data-open-contact="${p.id}">${avatar(p.id)}<span><strong>新的联系人 · ${esc(p.name)}</strong><small>点此打开会话</small></span><b aria-hidden="true">›</b></button>`).join('');}
function refreshContactAlerts(){document.querySelectorAll('[data-phone-contact-alerts]').forEach(el=>el.innerHTML=phoneContactAlerts());}
function verificationReturn(){const id=GameCore.chapterIds[state.reviewStep],who={name:'zhou',voice:'shen',arrival:'clerk'}[id];if(!state.vault||!phoneHasService()||phoneWho!==who||!GameCore.verified(state,id))return '';return `<div class="phone-review-return"><strong>这件事已核实</strong><span>结果已附进《核对往来》，回去接着看。</span><button data-return-review>返回《核对往来》继续</button></div>`;}
function attachmentReturnBar(){const r=state.phone.readingReturn;if(!r||!phoneHasService()||location.hash.split('?')[0]!=='#doc/'+r.file||!state.visited.includes(r.file)||state.chat.evidence[r.episode])return '';const p=ChatStory.people.find(p=>p.id===r.who);return `<div class="attachment-return-bar"><span>来自与${esc(p.name)}的附件选择</span><button data-return-attachment>读完了，返回${esc(p.name)}的附件列表</button></div>`;}
function orderedFeed(who){
 const feed=ChatStory.feed(state,who);
 for(const e of feed)if(!state.phone.order.includes(e.id))state.phone.order.push(e.id);
 return feed.sort((a,b)=>state.phone.order.indexOf(a.id)-state.phone.order.indexOf(b.id));
}
function pendingEpisode(who){
 const feed=orderedFeed(who),waiting=e=>(e.choices&&!state.chat.answers[e.id])||(e.evidence&&!state.chat.evidence[e.id]);
 return feed.find(e=>e.id===focusedEpisode&&waiting(e))||feed.find(e=>e.evidence&&!state.chat.evidence[e.id])||feed.slice().reverse().find(waiting);
}
function chatBadge(){
 const count=phoneHasService()?ChatStory.available(state).reduce((n,p)=>n+ChatStory.unread(state,p.id),0):0,badge=document.querySelector('#chat-badge');
 if(badge){badge.hidden=!count;badge.textContent=count>9?'9+':count;badge.parentElement.setAttribute('aria-label',`微信，${count} 段未读消息`);}syncPhoneBadge(count);
}
function syncPhoneBadge(count){
 refreshContactAlerts();
 const launcher=document.querySelector('#phone-launch'),badge=document.querySelector('#phone-badge'),notice=document.querySelector('#phone-notice');
 if(!launcher)return;launcher.hidden=!state.started;badge.hidden=!count;badge.textContent=count>9?'9+':count;
 if(count>phoneLastCount&&state.started&&state.prologueDone&&!state.ending&&!phoneElement().open&&!dialog.open){
  const fresh=newPhoneContacts(),p=fresh[0]||ChatStory.available(state).find(p=>ChatStory.unread(state,p.id));if(p){notice.dataset.phoneWho=p.id;notice.innerHTML=`<span class="notice-app">微信</span><strong>${esc(p.name)}</strong><span>${fresh.includes(p)?'新的联系人 · 点击查看':'发来了一条新消息'}</span>`;notice.hidden=false;clearTimeout(phoneNoticeTimer);phoneNoticeTimer=setTimeout(()=>notice.hidden=true,6000);}
 }phoneLastCount=count;
}
function phoneHeader(title,back='list'){return `<header class="phone-toolbar"><button data-phone-nav="${back}" aria-label="${back==='list'?'返回会话列表':'返回'}">‹</button><h1 data-phone-title="${esc(title)}" aria-live="polite" aria-atomic="true">${esc(title)}</h1>${ChatStory.people.some(p=>p.id===phoneWho)?'<button data-phone-more aria-label="聊天信息">•••</button>':'<button data-phone-close aria-label="收起手机">⌄</button>'}</header>`;}
function openPhone(who){
 if(!state.started){state.started=true;state.startedAt??=Date.now();}
 phoneWho=who??phoneWho;phoneDrawer='';replyDraft=null;focusedEpisode='';phoneSearch='';
 const phone=phoneElement();if(!phone.open){phonePriorFocus=document.activeElement;phone.showModal();}
 document.querySelector('#phone-notice').hidden=true;refreshPhone();
}
function phoneHome(){return `<div class="phone-wallpaper"><div class="phone-date"><strong>${phoneHasService()?'09:18':'20:17'}</strong><span>${phoneHasService()?'6 月 15 日 星期四':'6 月 17 日 星期六'}</span></div><div class="home-apps"><button data-phone-nav="list"><i class="wechat-icon">●<small>●</small></i>微信</button><button data-phone-nav="files"><i class="files-icon">▰</i>文件</button><button data-phone-nav="photos"><i class="photos-icon">✿</i>相册</button></div><p>游戏手机 · 2028 年</p></div>`;}
function searchableEpisode(e){
 const answer=e.choices?.find(c=>c[0]===state.chat.answers[e.id]),file=state.chat.evidence[e.id];
 return [...e.lines,...(answer?[answer[1],...answer[2],...(answer[3]||[])]:[]),...(file?[doc(file)?.title||file,...e.evidence.ok]:[]),...(state.phone.failures||[]).filter(x=>x.id===e.id).map(x=>x.text)];
}
function contactList(mode='list'){
 const people=ChatStory.available(state);
 return `<div class="phone-list-view"><header class="phone-toolbar"><h1>${mode==='contacts'?'通讯录':'微信'}</h1><button data-phone-nav="home-screen" aria-label="返回主屏幕">⌂</button></header><form id="phone-search-form" class="phone-search"><label class="sr-only" for="phone-query">搜索联系人或聊天记录</label><input id="phone-query" name="query" type="search" autocomplete="off" autocorrect="off" spellcheck="false" results="0" value="${esc(phoneSearch)}" placeholder="搜索联系人或聊天记录"><button>搜索</button></form><div class="phone-list-scroll">${people.map(p=>{
 const feed=orderedFeed(p.id),last=feed.at(-1),count=ChatStory.unread(state,p.id);
 const match=phoneSearch?feed.filter(e=>searchableEpisode(e).some(t=>t.includes(phoneSearch))):[];
 if(phoneSearch&&!p.name.includes(phoneSearch)&&!match.length)return '';
 return `<button class="contact" data-open-contact="${p.id}">${avatar(p.id)}<span><strong>${esc(p.name)}</strong><small>${esc(mode==='contacts'?p.note:last?.lines.at(-1)||p.note)}</small></span><time>09:${String(18+Math.max(0,state.phone.order.indexOf(last?.id))).padStart(2,'0')}</time>${count?`<i class="contact-badge">${count}</i>`:''}</button>${match.map(e=>`<button class="message-result" data-open-contact="${p.id}" data-message-jump="${e.id}">${esc(searchableEpisode(e).find(x=>x.includes(phoneSearch))||'回复中包含此关键词')}<small>查看聊天上下文 →</small></button>`).join('')}`;
 }).join('')}${state.ending==='bad'?'<button class="contact" data-open-contact="lost-account">'+avatar('deleted')+'<span><strong>用户已注销</strong><small>周栩留下的一份聊天记录</small></span></button>':''}${phoneSearch?'<button class="message-result" data-clear-phone-search>清除搜索</button>':''}<p class="chat-local">所有会话均为游戏剧情</p></div><nav class="wechat-tabs"><button data-phone-nav="list" class="${mode==='list'?'current':''}">▣<span>微信</span></button><button data-phone-nav="contacts" class="${mode==='contacts'?'current':''}">▤<span>通讯录</span></button><button data-phone-nav="profile">○<span>我</span></button></nav></div>`;
}
function filesPage(){const files=state.visited.map(doc).filter(Boolean);return `<div class="phone-list-view">${phoneHeader('文件','home-screen')}<div class="phone-list-scroll file-library"><p class="help-note">${phoneHasService()?'已打开的材料会留下访问记录；纸片附件需在原处主动保存。':'无服务 · 仅显示已缓存的材料和保存的纸片。'}</p>${phoneHasService()?'<a class="phone-file cloud-phone-entry" href="#mirror"><i aria-hidden="true">☁</i><span><strong>栖云盘</strong><small>周栩分享的广播站旧资料</small></span><b>›</b></a>':''}${savedScrapsList()}${files.slice().reverse().map(d=>`<a href="#doc/${d.id}" class="phone-file"><i>▤</i><span><strong>${esc(d.title)}</strong><small>${esc(d.source)} · ${d.date}</small></span><b>›</b></a>`).join('')||'<p class="empty">暂时没有文件。周栩会在微信里发来链接。</p>'}</div></div>`;}
function photosPage(){return `<div class="phone-list-view">${phoneHeader('相册','home-screen')}<div class="phone-list-scroll"><p class="photo-date">校园旧照 · 周栩转发</p><div class="phone-photo-grid">${['campus-gate.jpg','campus-library-v1.jpg','sports-field-v1.jpg'].map((name,i)=>`<button data-phone-photo="${name}" aria-label="查看校园照片 ${i+1}"><img src="./assets/${name}" alt="校园旧照 ${i+1}"></button>`).join('')}</div><p class="chat-local">这些是日常校园照片。</p></div></div>`;}
function messageHtml(key,text,who,out=false){
 const shown=state.phone.delivered.includes(key)||out;if(out&&!state.phone.delivered.includes(key))state.phone.delivered.push(key);
 return `<div class="message-row ${out?'message-out':'message-in'}" data-message-key="${key}" ${shown?'':'hidden'}>${avatar(out?'self':who)}<p class="bubble ${out?'outgoing':'incoming'}">${esc(text)}</p></div>`;
}
function phoneRecap(){
 if(!state.prologueDone)return '';
 let title,text;
 if(!state.mirror){title='先核对当年的记录';text='周栩记得七班有三十六人，官网却写三十五人。先确认两份材料统计的是不是同一批学生。周栩的备份以毕业当晚广播停播时刻为口令。';}
 else if(!state.board){title='找到同灯传习页的来处';text='学校公开记录和周栩的私人留存分开检索。广播索引对应一个剪报袋；复原残页上的用语，可以找到夹页，再与梁老师留下的复写联核对。';}
 else if(!state.vault){title='从旧事查到今年';text='折页提供了工作台副本。陈予安是今年收到邀请的学生，还没有失踪。更早的原件在档案柜里，柜码需要对照灯位和三次停灯记录。';}
 else{const items=GameCore.chapterIds.map(id=>({name:'谁下令改表',voice:'最后留言与当夜交接',arrival:'实际接收行程'})[id]+'：'+(GameCore.verified(state,id)?'已核实':'待核实'));title='分别核实三件事';text=items.join('；')+'。原件可从手机文件或调查整理中回看，不必记住全部姓名和日期。';}
 return `<details class="phone-recap"><summary>上次聊到 · ${title}</summary><p>${text}</p><dl><dt>周栩</dt><dd>和你同班，保存了广播站旧文件。</dd>${state.visited.includes('loan')||state.visited.includes('carbon')||state.board?'<dt>许知遥</dt><dd>'+(GameCore.verified(state,'voice')?'十年前被献祭的同学。后来的报平安是旧话重用，正在为他追查真相。':'你们一直联系不到的同学。学校名单里少了他的名字。')+'</dd>':''}${state.board?'<dt>折页</dt><dd>整理同灯内部账目的资料员，通过周栩与你联系。</dd><dt>陈予安</dt><dd>今年的新候选，两天后才出发。</dd>':''}${state.vault?'<dt>沈嘉宁</dt><dd>曾从北院离开，档案里的称呼是“白露”。</dd>':''}</dl></details>`;
}
function episodeHtml(e,who){
 const answer=e.choices?.find(c=>c[0]===state.chat.answers[e.id]),file=state.chat.evidence[e.id];
 const failures=(state.phone.failures||[]).filter(x=>x.id===e.id);
 const attempts=failures.map((x,i)=>messageHtml(`${e.id}:attempt:${i}`,`${doc(x.file)?.title||x.file}\n[发送核对]`,who,true)+messageHtml(`${e.id}:feedback:${i}`,x.text,who)).join('');
 const messages=e.lines.map((line,i)=>messageHtml(`${e.id}:line:${i}`,line,who)).join('')+(answer?messageHtml(`${e.id}:answer`,answer[1],who,true)+answer[2].map((line,i)=>messageHtml(`${e.id}:reply:${i}`,line,who)).join('')+(answer[3]||[]).map((line,i)=>messageHtml(`${e.id}:ack:${i}`,line,who,true)).join(''):'')+attempts+(file?messageHtml(`${e.id}:file`,`${doc(file)?.title||file}\n[已发送文件]`,who,true)+e.evidence.ok.map((line,i)=>messageHtml(`${e.id}:ok:${i}`,line,who)).join(''):'');
 return `<section class="chat-episode" id="chat-${e.id}"><p class="chat-time">${esc(e.label)}</p>${e.system?`<p class="chat-time">${esc(e.system)}</p>`:''}${e.expired?`<div class="expired-attachment"><strong>${esc(e.expired.name)}</strong><span>文件已过期或已被清理</span><small>${esc(e.expired.note)}</small></div>`:''}${messages}<div class="episode-actions" data-episode-actions="${e.id}">${(e.links||[]).map(([u,t])=>`<a class="chat-attachment" href="#${u}"><span>${['mirror','board','vault'].includes(u)||u.startsWith('doc/')&&doc(u.slice(4))?.gate?'栖云盘 · 文件分享':u.startsWith('doc/')?'临澜实验中学 · 网页':'分享链接'}</span><strong>${esc(t)}</strong><b>↗</b></a>`).join('')}${phoneHasService()&&((e.choices&&!answer)||(e.evidence&&!file))?`<button class="reply-to-message" data-focus-episode="${e.id}">${e.evidence?'选择附件回复这条':'回复这条消息'} ↙</button>`:''}</div></section>`;
}
function chatsPage(who){
 const person=ChatStory.available(state).find(p=>p.id===who);if(!person)return contactList();
 const feed=orderedFeed(who);return `<div class="conversation">${phoneHeader(person.name)}${phoneRecap()}<div class="chat-log" id="chat-log" data-person="${who}" role="log" aria-label="与${esc(person.name)}的聊天记录">${feed.map(e=>episodeHtml(e,who)).join('')}<div id="chat-feedback" role="status"></div></div><div id="phone-compose"></div></div>`;
}
function composerHtml(){
 if(!phoneHasService())return offlineComposer();
 const e=pendingEpisode(phoneWho),inFlight=document.querySelector('#chat-log [data-message-key][hidden]');
 const choices=phoneDrawer==='reply'&&e?.choices&&!inFlight;
 const files=phoneDrawer==='files'&&!inFlight;
 const ids=e?.evidence?(fileCandidates[e.id]||e.evidence.accept).filter(id=>allowed(doc(id))):state.visited.slice(-8).reverse();
 return `<div class="phone-compose-wrap">${verificationReturn()}${inFlight?'<div class="delivery-control"><button data-deliver-all>直接显示</button></div>':''}${choices?`<div class="compose-sheet"><header>选择要说的话<button data-close-sheet aria-label="关闭回复选项">×</button></header>${e.choices.map(c=>`<button data-select-reply="${c[0]}" data-episode="${e.id}">${esc(c[1])}</button>`).join('')}</div>`:''}${files?`<div class="compose-sheet attachment-sheet"><header>${e?.evidence?'发一份材料给对方':'最近打开的文件'}<button data-close-sheet aria-label="关闭附件列表">×</button></header><p>${esc(e?.evidence?.prompt||'点开文件可重新阅读。')}</p>${ids.map(id=>{const d=doc(id),read=state.visited.includes(id);return `<div class="file-choice"><a href="#doc/${id}" ${e?.evidence?`data-read-for="${e.id}" data-read-who="${phoneWho}" data-read-file="${id}"`:""}><strong>${esc(d.title)}</strong><small>${d.date} · ${read?'已读 · 点击重看':'未读 · 点击预览 →'}</small></a>${e?.evidence&&read?`<button data-chat-send="${e.id}" data-who="${phoneWho}" data-file="${id}" aria-label="发送${esc(d.title)}">发送</button>`:''}</div>`;}).join('')||'<p>还没有可发送的文件。</p>'}</div>`:''}<div class="compose-bar"><button class="compose-round" data-show-files aria-label="选择文件附件" ${inFlight?'disabled':''}>＋</button><button class="compose-input" data-show-replies ${inFlight?'disabled':''}>${replyDraft?esc(replyDraft.text):e?.choices?'选择回复…':e?.evidence?'点 ＋ 选择材料':'暂时没有待回复的消息'}</button>${replyDraft?'<button class="wechat-send" data-send-draft>发送</button>':'<button class="compose-round" data-phone-nav="files" aria-label="查看文件">▤</button>'}</div></div>`;
}
function refreshTypingHeader(){const title=document.querySelector('#phone-content .conversation [data-phone-title]');if(!title)return;const typing=phoneHasService()&&!!document.querySelector('#chat-log [data-message-key][hidden]');title.textContent=typing?'对方正在输入…':title.dataset.phoneTitle;}
function refreshComposer(){const el=document.querySelector('#phone-compose');if(el)el.innerHTML=composerHtml();refreshTypingHeader();}
function revealActions(){document.querySelectorAll('[data-episode-actions]').forEach(el=>el.hidden=!!el.closest('.chat-episode').querySelector('[data-message-key][hidden]'));}
function startDelivery(){
 if(!phoneHasService()){clearTimeout(deliveryTimer);revealActions();refreshComposer();return;}
 clearTimeout(deliveryTimer);revealActions();const log=document.querySelector('#chat-log');if(!log)return;
 const pending=[...log.querySelectorAll('[data-message-key][hidden]')];
 const show=(el)=>{const nearBottom=log.scrollHeight-log.scrollTop-log.clientHeight<100;el.hidden=false;state.phone.delivered.push(el.dataset.messageKey);if(nearBottom)log.scrollTop=log.scrollHeight;revealActions();save();};
 if(!state.motion){pending.forEach(show);ChatStory.markRead(state,phoneWho);save();refreshComposer();return;}
 function step(){if(!phoneElement().open)return;const el=log.querySelector('[data-message-key][hidden]');if(!el){ChatStory.markRead(state,phoneWho);save();refreshComposer();return;}show(el);if(log.querySelector('[data-message-key][hidden]'))deliveryTimer=setTimeout(step,900);else{ChatStory.markRead(state,phoneWho);save();refreshComposer();}}
 if(pending.length)deliveryTimer=setTimeout(step,600);else{ChatStory.markRead(state,phoneWho);save();}refreshComposer();
}
function positionNewChat(){}
function refreshPhone(){
 updatePhoneStatus();
 const phone=phoneElement();if(!phone?.open)return;clearTimeout(deliveryTimer);
 if(ChatStory.available(state).some(p=>p.id===phoneWho)){state.phone.openedContacts??=[];if(!state.phone.openedContacts.includes(phoneWho))state.phone.openedContacts.push(phoneWho);}
 const old=document.querySelector('#chat-log'),same=old?.dataset.person===phoneWho,y=same?old.scrollTop:undefined,wasEnd=same&&old.scrollHeight-old.scrollTop-old.clientHeight<100;
 phone.classList.remove('phone-contacts');
 const content=document.querySelector('#phone-content');
 if(phoneWho==='home-screen')content.innerHTML=phoneHome();
 else if(phoneWho==='files')content.innerHTML=filesPage();
 else if(phoneWho==='photos')content.innerHTML=photosPage();
 else if(phoneWho==='profile')content.innerHTML=`<div class="phone-list-view">${phoneHeader('我')}<div class="phone-profile">${avatar('self')}<h2>你</h2><p>临澜实验中学<br>2018 届七班校友</p><p class="help-note">这是剧情中的身份，不读取你的真实微信资料。</p><button data-phone-nav="files">查看已打开的文件</button></div></div>`;
 else if(phoneWho==='lost-account'&&state.ending==='bad')content.innerHTML=lostPhoneConversation();
 else if(phoneWho===''||phoneWho==='list'||phoneWho==='contacts')content.innerHTML=contactList(phoneWho==='contacts'?'contacts':'list');
 else{content.innerHTML=chatsPage(phoneWho);const log=document.querySelector('#chat-log');if(log){if(y!==undefined)log.scrollTop=wasEnd?log.scrollHeight:y;else{const first=log.querySelector('[data-message-key][hidden]');if(first){first.closest('.chat-episode')?.scrollIntoView({block:'start'});}else log.scrollTop=log.scrollHeight;}if(phoneJump){document.getElementById('chat-'+phoneJump)?.scrollIntoView({block:'start'});phoneJump='';}startDelivery();}}
 content.querySelector('.phone-toolbar')?.insertAdjacentHTML('afterend','<div data-phone-contact-alerts>'+phoneContactAlerts()+'</div>');
 save();
}
function lostPhoneConversation(){return `<div class="lost-phone-view">${phoneHeader('用户已注销')}<div class="lost-phone-log"><p class="chat-time">周栩后来保存的会话 · 你的旧账号</p><p class="chat-time">6 月 18 日 08:12 · 当时昵称：你</p><div class="message-row message-in">${avatar('deleted')}<p class="bubble incoming">别查了，都是误会。我想安静一阵。</p></div><div class="message-row message-out">${avatar('zhou')}<p class="bubble outgoing">这真的是你发的吗？让我听一下你的声音。</p></div><p class="chat-time">没有收到回复</p><p class="chat-time account-deleted">该账号已注销</p><p class="lost-phone-note">头像消失了。那句话还在。<br>你记得很清楚，手机交出去以后，<br>你再也没有碰过它。</p></div><footer class="disabled-compose">用户已注销，无法发送消息</footer></div>`;}
document.addEventListener('click',e=>{
 const b=e.target.closest('button'),link=e.target.closest('a[href^="#"]');
 if(link?.getAttribute('href').startsWith('#chat')){e.preventDefault();openPhone(link.getAttribute('href').split('/')[1]||'');return;}
 if(link?.closest('#phone-dialog')){e.preventDefault();const route=link.getAttribute('href').slice(1);if(link.dataset.readFor){state.phone.readingReturn={who:link.dataset.readWho,episode:link.dataset.readFor,file:link.dataset.readFile};save();}if(!phoneHasService()&&!((route.startsWith('doc/')&&state.visited.includes(route.slice(4)))||(route.startsWith('scrap/')&&GameCore.hasScrap(state,route.slice(6))))){toast('无服务，无法打开新的分享文件。');return;}if(!state.prologueDone){if(!state.chat.answers['opening-2'])return;state.prologueDone=true;save();}phoneElement().close();go(route);render();return;}
 if(!b)return;
 if(b.hasAttribute('data-return-review')){if(!verificationReturn())return;phoneElement().close();go('case');render();return;}
 if(b.hasAttribute('data-return-attachment')){const r=state.phone.readingReturn;if(!r||!attachmentReturnBar())return;state.phone.readingReturn=null;openPhone(r.who);focusedEpisode=r.episode;phoneDrawer='files';refreshComposer();save();return;}
 if(b.hasAttribute('data-offline-send')){if(!phoneHasService()){state.phone.offlineAttempt=true;save();refreshComposer();}return;}
 if(!phoneHasService()&&(b.hasAttribute('data-send-draft')||b.dataset.chatSend||b.hasAttribute('data-deliver-all'))){toast('无服务，消息未发送。');return;}
 if(b.hasAttribute('data-phone-lost')){openPhone('lost-account');return;}
 if(b.hasAttribute('data-phone-close')){phoneElement().close();return;}
 if(b.hasAttribute('data-phone-home')){phoneWho='home-screen';refreshPhone();return;}
 if(b.dataset.phoneNav!==undefined){phoneWho=b.dataset.phoneNav;phoneDrawer='';phoneSearch='';replyDraft=null;focusedEpisode='';refreshPhone();return;}
 if(b.dataset.openContact){phoneJump=b.dataset.messageJump||'';openPhone(b.dataset.openContact);return;}
 if(b.hasAttribute('data-clear-phone-search')){phoneSearch='';refreshPhone();return;}
 if(b.hasAttribute('data-phone-more')){const p=ChatStory.people.find(p=>p.id===phoneWho);if(p){phoneDrawer='';document.querySelector('#phone-compose').innerHTML=`<div class="compose-sheet"><header>聊天信息<button data-close-sheet>×</button></header><p>${esc(p.name)} · ${esc(p.note)}</p><button data-phone-nav="list">搜索历史消息</button><button data-phone-nav="files">查看保留的附件</button></div>`;}return;}
 if(b.hasAttribute('data-deliver-all')){clearTimeout(deliveryTimer);document.querySelectorAll('#chat-log [data-message-key][hidden]').forEach(el=>{el.hidden=false;state.phone.delivered.push(el.dataset.messageKey);});revealActions();ChatStory.markRead(state,phoneWho);save();refreshComposer();return;}
 if(b.hasAttribute('data-close-sheet')){phoneDrawer='';refreshComposer();return;}
 if(b.dataset.focusEpisode){focusedEpisode=b.dataset.focusEpisode;replyDraft=null;phoneDrawer=pendingEpisode(phoneWho)?.evidence?'files':'reply';refreshComposer();return;}
 if(b.hasAttribute('data-show-files')){phoneDrawer=phoneDrawer==='files'?'':'files';refreshComposer();return;}
 if(b.hasAttribute('data-show-replies')){if(pendingEpisode(phoneWho)?.evidence)phoneDrawer='files';else phoneDrawer=phoneDrawer==='reply'?'':'reply';refreshComposer();return;}
 if(b.dataset.selectReply){const episode=ChatStory.feed(state,phoneWho).find(x=>x.id===b.dataset.episode),c=episode?.choices?.find(x=>x[0]===b.dataset.selectReply);if(c){replyDraft={episode:episode.id,value:c[0],text:c[1]};phoneDrawer='';refreshComposer();}return;}
 if(b.hasAttribute('data-send-draft')&&replyDraft){const sent=ChatStory.reply(state,phoneWho,replyDraft.episode,replyDraft.value);if(sent){replyDraft=null;focusedEpisode='';save();refreshPhone();const log=document.querySelector('#chat-log');if(log)log.scrollTop=log.scrollHeight;}return;}
 if(b.dataset.chatSend){const err=ChatStory.send(state,b.dataset.who,b.dataset.chatSend,b.dataset.file);if(err){state.phone.failures??=[];state.phone.failures.push({who:b.dataset.who,id:b.dataset.chatSend,file:b.dataset.file,text:err});state.phone.failures=state.phone.failures.slice(-25);phoneDrawer='';save();refreshPhone();document.getElementById('chat-'+b.dataset.chatSend)?.scrollIntoView({block:'end'});return;}phoneDrawer='';focusedEpisode='';save();refreshPhone();document.querySelector('#chat-log').scrollTop=document.querySelector('#chat-log').scrollHeight;return;}
 if(b.dataset.phonePhoto){document.querySelector('#phone-content').innerHTML=`<div class="phone-list-view">${phoneHeader('校园旧照','photos')}<div class="phone-image-view"><img src="./assets/${b.dataset.phonePhoto}" alt="校园旧照"></div></div>`;}
});
document.addEventListener('submit',e=>{if(e.target.id==='phone-search-form'){e.preventDefault();phoneSearch=String(new FormData(e.target).get('query')||'').trim();refreshPhone();}});
document.addEventListener('DOMContentLoaded',()=>phoneElement().addEventListener('close',()=>{clearTimeout(deliveryTimer);if(phoneHasService()){document.querySelectorAll('#chat-log [data-message-key][hidden]').forEach(el=>{if(!state.phone.delivered.includes(el.dataset.messageKey))state.phone.delivered.push(el.dataset.messageKey);});save();}phoneDrawer='';if(state.prologueDone&&location.hash.startsWith('#case')){const y=window.scrollY;render();window.scrollTo(0,y);}if(phonePriorFocus?.isConnected)phonePriorFocus.focus();}));
