function chatBadge(){const count=ChatStory.available(state).reduce((n,p)=>n+ChatStory.unread(state,p.id),0),badge=document.querySelector('#chat-badge');if(badge){badge.hidden=!count;badge.textContent=count>9?'9+':count;badge.parentElement.setAttribute('aria-label',`消息，${count} 段未读对话`);}syncPhoneBadge(count);}
function chatsPage(id){if(!state.started)return '<section class="panel"><h1>个人消息</h1><p>先读周栩发来的邮件。</p><button data-action="mail">打开旧邮件</button></section>';const people=ChatStory.available(state),who=people.some(p=>p.id===id)?id:people[0].id,person=people.find(p=>p.id===who);const feed=ChatStory.feed(state,who),firstNew=feed.find(e=>!(state.chat.seen[who]||[]).includes(e.id+(state.chat.answers[e.id]?':reply':'')+(state.chat.evidence[e.id]?':file':'')))?.id;if(id)ChatStory.markRead(state,who);return `<section class="messenger"><aside class="contacts"><div class="messenger-label">微信 <small>联系人</small></div>${people.map(p=>`<a href="#chat/${p.id}" class="contact ${p.id===who?'selected':''}"><span class="avatar ${p.id}">${p.avatar}</span><span><strong>${p.name}</strong><small>${p.note}</small></span>${ChatStory.unread(state,p.id)?'<i class="unread-dot" aria-label="有新消息"></i>':''}</a>`).join('')}${state.ending==='bad'?'<button class="contact lost-contact" data-phone-lost><span class="avatar deleted-avatar">◯</span><span><strong>用户已注销</strong><small>周栩留下的一份聊天记录</small></span></button>':''}<p class="chat-local">游戏内通信 · 所有联系人均为虚构</p></aside><div class="conversation"><header><button class="phone-back" data-phone-list aria-label="返回微信列表">‹</button><span class="avatar ${who}">${person.avatar}</span><div><h1>${person.name}</h1><small>${person.note}</small></div><button class="phone-minimize" data-phone-close aria-label="收起手机">⌄</button></header><div class="chat-log" id="chat-log" role="log" aria-label="聊天记录">${feed.map(e=>{const answer=e.choices?.find(c=>c[0]===state.chat.answers[e.id]),file=state.chat.evidence[e.id];return `<section class="chat-episode" id="chat-${e.id}" ${e.id===firstNew?'data-chat-new':''}><p class="chat-time">${e.label}</p>${e.system?`<p class="chat-time">${esc(e.system)}</p>`:''}${e.expired?`<div class="expired-attachment"><strong>${esc(e.expired.name)}</strong><span>文件已过期或已被清理</span><small>${esc(e.expired.note)}</small></div>`:''}${e.lines.map(line=>`<p class="bubble incoming">${esc(line)}</p>`).join('')}${answer?`<p class="bubble outgoing">${esc(answer[1])}</p>${answer[2].map(line=>`<p class="bubble incoming">${esc(line)}</p>`).join('')}${(answer[3]||[]).map(line=>`<p class="bubble outgoing">${esc(line)}</p>`).join('')}`:e.choices?`<div class="chat-choices" aria-label="选择回复">${e.choices.map(c=>`<button data-chat-reply="${e.id}" data-who="${who}" data-value="${c[0]}">${esc(c[1])}</button>`).join('')}</div>`:''}${e.evidence?(file?`<p class="bubble outgoing">已发送材料：<a href="#doc/${file}">${esc(doc(file).title)}</a></p>${e.evidence.ok.map(line=>`<p class="bubble incoming">${esc(line)}</p>`).join('')}`:evidenceAction(e,who)):''}${(e.links||[]).map(([u,t])=>`<a class="chat-attachment" href="#${u}"><span>附件 / 链接</span>${t}<b>↗</b></a>`).join('')}</section>`;}).join('')}<p class="chat-wait">${feed.some(e=>(e.choices&&!state.chat.answers[e.id])||(e.evidence&&!state.chat.evidence[e.id]))?'可以回复，或发送对方提到的附件。':'暂时没有新消息。继续调查，找到新的材料后再回来。'}</p></div><footer class="chat-footer"><a href="#search${state.mirror?'?scope=private':''}">查找资料</a><button data-action="journal">调查笔记</button><span>阅读线索后会收到新消息</span></footer></div></section>`;}
document.addEventListener('click',e=>{const b=e.target.closest('[data-chat-reply]');if(!b)return;const scroll=document.querySelector('#chat-log')?.scrollTop||0;if(ChatStory.reply(state,b.dataset.who,b.dataset.chatReply,b.dataset.value)){save();refreshPhone();const log=document.querySelector('#chat-log');if(log)log.scrollTop=scroll;}});

function positionNewChat(){const log=document.querySelector('#chat-log'),first=document.querySelector('[data-chat-new]');if(log&&first)log.scrollTop+=first.getBoundingClientRect().top-log.getBoundingClientRect().top;}

function evidenceAction(e,who){
 const id=e.evidence.accept[0],d=doc(id),ready=state.visited.includes(id);
 return `<div class="chat-evidence"><p>${ready?'材料已经在你的阅读记录里，可以直接发给对方。':'先读对方提到的材料，再回来发送。'}</p><a class="chat-attachment" href="#doc/${id}"><span>${ready?'已读附件':'查看附件'}</span>${d.title}<b>↗</b></a>${ready?`<button class="primary" data-chat-send="${e.id}" data-who="${who}" data-file="${id}">发送这份材料</button>`:''}<p class="error" role="alert"></p></div>`;
}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-chat-send]');if(!b)return;
 const err=ChatStory.send(state,b.dataset.who,b.dataset.chatSend,b.dataset.file);
 if(err){b.closest('.chat-evidence').querySelector('.error').textContent=err;return;}
 const y=document.querySelector('#chat-log')?.scrollTop||0;save();refreshPhone();
 const log=document.querySelector('#chat-log');if(log)log.scrollTop=y;
});

let phoneWho='',phoneLastCount=0,phoneNoticeTimer=null,phonePriorFocus=null;
function phoneElement(){return document.querySelector('#phone-dialog');}
function openPhone(who){
 if(!state.started){mail();return;}
 phoneWho=who??phoneWho;
 const phone=phoneElement();phonePriorFocus=document.activeElement;
 if(!phone.open)phone.showModal();
 document.querySelector('#phone-notice').hidden=true;
 refreshPhone();
}
function refreshPhone(){
 const phone=phoneElement();if(!phone?.open)return;
 if(phoneWho==='lost-account'&&state.ending==='bad'){
  phone.classList.remove('phone-contacts');
  document.querySelector('#phone-content').innerHTML=lostPhoneConversation();
 }else{
  if(phoneWho&&!ChatStory.available(state).some(p=>p.id===phoneWho))phoneWho='';
  phone.classList.toggle('phone-contacts',!phoneWho);
  document.querySelector('#phone-content').innerHTML=chatsPage(phoneWho);
  if(phoneWho)positionNewChat();
 }
 save();
}
function syncPhoneBadge(count){
 const launcher=document.querySelector('#phone-launch'),badge=document.querySelector('#phone-badge');
 if(!launcher||!badge)return;
 launcher.hidden=!state.started;badge.hidden=!count;badge.textContent=count>9?'9+':count;
 launcher.setAttribute('aria-label',`打开游戏手机，${count} 段未读消息`);
 const notice=document.querySelector('#phone-notice');
 if(count>phoneLastCount&&state.started&&!state.ending&&!phoneElement()?.open&&!document.querySelector('#dialog')?.open){
  const person=ChatStory.available(state).find(p=>ChatStory.unread(state,p.id));
  if(person){notice.dataset.phoneWho=person.id;notice.innerHTML=`<span class="notice-app">微信</span><strong>${esc(person.name)}</strong><span>发来了一条新消息</span>`;notice.hidden=false;clearTimeout(phoneNoticeTimer);phoneNoticeTimer=setTimeout(()=>notice.hidden=true,5500);}
 }
 phoneLastCount=count;
}
function lostPhoneConversation(){return `<div class="lost-phone-view"><header><button class="phone-back" data-phone-list aria-label="返回微信列表">‹</button><h1>用户已注销</h1><button class="phone-minimize" data-phone-close aria-label="收起手机">⌄</button></header><div class="lost-phone-log"><p class="chat-time">周栩后来保存的会话 · 你的旧账号</p><p class="chat-time">6 月 18 日 08:12 · 当时昵称：你</p><div class="lost-message"><span class="avatar deleted-avatar">◯</span><p class="bubble incoming">别查了，都是误会。我想安静一阵。</p></div><p class="bubble outgoing">这真的是你发的吗？让我听一下你的声音。</p><p class="chat-time">没有收到回复</p><p class="chat-time account-deleted">该账号已注销</p><p class="lost-phone-note">头像消失了。那句话还在。<br>你记得很清楚，手机交出去以后，<br>你再也没有碰过它。</p></div><footer class="disabled-compose">用户已注销，无法发送消息</footer></div>`;}

document.addEventListener('click',e=>{
 const link=e.target.closest('a[href^="#chat"]');
 if(link){e.preventDefault();openPhone(link.getAttribute('href').split('/')[1]||'');return;}
 if(e.target.closest('[data-phone-close]')){phoneElement().close();return;}
 if(e.target.closest('[data-phone-list]')){openPhone('');return;}
 if(e.target.closest('[data-phone-lost]')){openPhone('lost-account');return;}
 const file=e.target.closest('#phone-dialog a[href^="#"]');
 if(file)phoneElement().close();
});
document.addEventListener('DOMContentLoaded',()=>{
 phoneElement().addEventListener('close',()=>{if(phonePriorFocus?.isConnected)phonePriorFocus.focus();});
});
