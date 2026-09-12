/* Scripted fictional conversations. No network, generated replies, or real messages. */
(function(root){
'use strict';
const read=(s,id)=>s.visited.includes(id), answered=(s,id)=>!!s.chat.answers[id], sent=(s,id)=>!!s.chat.evidence[id];
const people=[
{id:'zhou',name:'周栩',avatar:'栩',note:'2018 届七班 · 老同学',available:s=>s.started},
{id:'clerk',name:'折页',avatar:'折',note:'周栩介绍的资料员',available:s=>s.mirror&&answered(s,'zhou-source')},
{id:'shen',name:'沈嘉宁',avatar:'沈',note:'曾使用网名“白露”',available:s=>s.vault&&read(s,'bailu-now')},
{id:'liaison',name:'同灯 · 校友联络',avatar:'灯',note:'经旧校友群联系你',available:s=>s.board&&read(s,'bait')}
];
const episodes=[
{id:'zhou-start',who:'zhou',when:s=>s.started,label:'6 月 15 日 · 上午',lines:['邮件收到了吗？我现在也开着学校网站。','我先把旧电脑接上电。你看看校友核对通知，别被网页上那个“核定人数”带过去。'],choices:[['remember','我记得知遥。先核对原来的记录。',['那就先别在班群里争。找到同一个班、同一年、说的是同一种人数的记录，我们再一起看。']],['uncertain','十年过去了，会不会真的记错了？',['我也这样想过。我翻了三遍纪念册，越翻越不敢肯定。所以才找你一起查。']]],links:[['doc/reunion','校友信息核对通知']]},
{id:'zhou-count',who:'zhou',when:s=>read(s,'printing'),label:'你找到印制结算单后',lines:['你说看到一份数量不同的记录？发过来，我对一下。','要学生实际发放的那份。老师用册和重装的册子不能算进去。'],evidence:{prompt:'发送能核对当年人数的材料',accept:['printing'],ok:['七班，学生用册三十六，教师另算。和现在网页上差一个。','所以这不是你我都记性不好。有人把“现在联系得到的人”，改成了“当年存在过的人”。'],wrong:'这份材料还不能核对当年实际发了多少学生用册。再找一下印制结算记录。'}},
{id:'zhou-package',who:'zhou',when:s=>s.mirror,label:'留存包已打开',lines:['硬盘读出来了。先看节目单，再看知遥的借阅单。','你看到的是我留下的工作副本。不是突然黑进学校后台。'],choices:[['regret','你当年为什么没有继续追问？',['问过。我去找过他奶奶，也把纸箱和记录交给了当时接待失踪反映的人。','可那时只知道他上了一辆车。联络员不断转来“本人报平安”的文字，没有住址，也不让通话。我们拿不出他被关在哪里的证据。','这不是一个让我安心的解释。我也有过觉得“他不想联系我们”的时候。现在想起来，最难受的就是这句。']],['tape','那盘磁带后来在哪里？',['1998 年的校史磁带后来随他的包进了北院，柜里的旧转录还在。我留存了节目单。','如果后面看到 2018 年接收时的录音，那是另外一份，别把两盘的时间混了。']]],links:[['doc/programme','毕业晚会节目单'],['doc/loan','借阅单背面的字']]},
{id:'zhou-source',who:'zhou',when:s=>s.mirror&&read(s,'carbon'),label:'读完梁老师的复写联后',lines:['2020 年收到梁老师的信后，我重新补交过材料。但这张复写联能证明有人改表，不能告诉我们知遥现在在哪。','今年有个在同灯整理账目的资料员找到了我。对方看过同一份单子，说还有最近的值班记录。','我没把你拉进任何群。你愿意的话，我把这个临时联系人介绍给你，我们分头核对。'],choices:[['connect','接进来吧。我先核对来源。',['好。联系人叫“折页”。别问对方家庭信息，先问能核实的材料。']],['cautious','先保留联系人，我不急着相信。',['对。保留联系方式不等于相信。你可以对照旧单据，再决定要不要继续谈。']]]},
{id:'clerk-intro',who:'clerk',when:s=>true,label:'临时会话',lines:['周栩给我介绍过你。叫我折页就好。','我今年负责整理他们的历史账目，导出了工作台副本。袁诚不知道副本给了谁。','先核对一件事：你们保存的那张更正申请，背面压到了什么字？把那张材料给我看。'],evidence:{prompt:'从已读材料里选出复写联',accept:['carbon'],ok:['“留名册转灯籍。旧号停止使用。”我的原件背面也有这行压字。页角有资料组的章。','两边能对上。我把当下材料的目录给你接进去了。旧账号线索在节目单和梁老师的谈话记录里。','需要的资料已在副本里，之后我下线也不会让你丢失文件。'],wrong:'这不是我们要核对的复写联。我需要看同一张单据，不能仅凭你知道一个名字就相信来源。'},links:[['doc/carbon','个人信息更正申请 · 复写联']]},
{id:'clerk-door',who:'clerk',when:s=>sent(s,'clerk-intro'),label:'来源核对完成',lines:['他们称这里是“安静的地方”。我第一天来也这么以为。','后来我发现门禁的申请有“领取”，没有“归还”。表上每个人都在里面，却没有谁能自己决定出去。'],choices:[['help','你现在能安全离开吗？',['我在外面，今天没有值班。原件的保全位置也交代给了另一位可信的人。','我会配合调查，但不会回去替你拍新照片。手里的东西够我们继续核对了。']],['why','为什么选现在联系周栩？',['以前做的是捐助流水。六月换柜，我第一次翻到灯籍和那张求助纸条，又看到了今年的接送安排。','我从2018年的询问记录找到周栩，不是随便挑一个网友。陈予安还有两天才出发，来得及。']]],links:[['board','打开工作台副本']]},
{id:'zhou-now',who:'zhou',when:s=>read(s,'current-list'),label:'看见今年的名单后',lines:['陈予安。我刚才把那三个字念了好几遍。','知遥消失的时候也是十八岁。可这个孩子还没有去，我们不能在记录里提前把他写成“失踪者”。'],choices:[['warn','先把旧版行程也保存，再找最新的。',['好，我核对学校开放时间。你看理事会修订过什么。只知道一个“东堤”还不够。']],['rush','我想直接到那边看看。',['等一下。南院对外开放，他们完全可以带你看一圈，然后说什么都没有。','先弄清楚到底是哪一处入口，什么时候有人进去。我们需要能让别人查证的东西。']]],links:[['doc/arrival','接送安排修订版']]},
{id:'clerk-route',who:'clerk',when:s=>s.board&&read(s,'arrival')&&sent(s,'clerk-intro'),label:'修订行程核对',lines:['有两份通知。旧的一份是给参观家属看的，新的才发给北院接收员。','你准备交出去的，是哪份？把原文件发过来，别只复述时间。'],evidence:{prompt:'发送这次接送实际执行的安排',accept:['arrival'],ok:['对，6 月 14 日修订，21:10，东堤北院。我们手上是同一个版本。','你可以把旧通知放在旁边作为对照，但不要把两份的地点和时间拼成第三份。'],wrong:'它能帮助比较，但不是执行接收的修订通知。请发“接送安排修订版”。'}},
{id:'shen-start',who:'shen',when:s=>true,label:'本人同意加入的会话',lines:['周栩已经收到我的信。我是沈嘉宁。','你可以问我记得的事。但请不要把我的住址和家人转给不认识的人。'],choices:[['respect','好。你不想回答的可以跳过。',['谢谢。我以前说“不”的时候，总有人接一句“你怎么这么不懂感恩”。','你这样回复，我才觉得自己真的已经出来了。']],['name','白露，能说一下许知遥的情况吗？',['请叫我沈嘉宁。“白露”是他们给我的称呼。','我知道你在对照资料，但我们现在是在说话。'],['我记住了，沈嘉宁。']]]},
{id:'shen-proof',who:'shen',when:s=>answered(s,'shen-start'),label:'关于知遥的消息',lines:['我只能证明自己经历过的。知遥现在想不想留下，必须看他自己的话。','你找到近期材料了吗？请发给我。'],evidence:{prompt:'发送包含许知遥本人近期意愿的记录',accept:['dutylog'],ok:['“请把这句话原样交出去，不要只告诉别人我活着。”','我会把我的凭证交出去。你们也把他这句话留着。他想离开，就不能用别人写的“他很好”替代。'],wrong:'这份材料没有知遥最近、本人表达的意愿。联络员的邀请也不能代替他回答。请核对最近的值班簿和附上的纸条。'}},
{id:'shen-memory',who:'shen',when:s=>sent(s,'shen-proof'),label:'她接着发来两条消息',lines:['以前夜里点名，每个人都要朝墙上的灯架看。灯架中间不是灯，是一个凹进去的眼窝。','有天所有人都说它闭着。我看了整夜，回去在镜子里才发现，自己一直没有眨眼。'],choices:[['listen','那时候你一定很难熬。',['我不确定自己当时看到什么。睡得太少，也没人愿意和我核对。','但门是锁着的，电话打不出去。这些我确定。']],['image','资料里的眼睛图片，也和灯架有关？',['资料员说是旧器物图册。我没有再打开。','你可以关掉画面继续读。我不需要你再经历一遍，才相信我。']]],links:[['doc/eye-catalogue','器物图册 · 请勿修正眼部']]},
{id:'liaison-start',who:'liaison',when:s=>true,label:'陌生联系人请求',lines:['你好，我们从旧校友群看到了你和周栩的询问。','我们愿意安排你和许知遥见面。转发的文档缺少语境，当面谈会快一些。'],choices:[['verify','请让许知遥本人和我说话。',['他现在不适合使用通讯设备。你应该尊重他的平静。','我们能提供见面机会，希望你也表现出诚意。']],['origin','你怎么知道是我在查？',['旧群里不是只有你认识的同学。','放心，我们不知道你打开了哪份资料。你也不必知道谁还在群里。']]],links:[['doc/bait','对方发送的见面说明']]},
{id:'liaison-pressure',who:'liaison',when:s=>answered(s,'liaison-start'),label:'对方继续发来消息',lines:['周栩不适合一起来。他对过去有自己的理解。','六月十七日，独自前来，手机交给接待员。你见到人，误会就结束了。'],choices:[['decline','我拒绝独行。会把材料交给外部核查。',['你把不完整的东西传出去，最后伤害的是知遥。','你再想一想。邀请暂时保留。']],['consider','我先查看具体条件，不代表答应。',['条件写在登记页。请你自己做决定。']]],links:[['invitation','查看接引条件与赴约选择']]},
{id:'zhou-finish',who:'zhou',when:s=>s.caseSolved,label:'事实与证据已核对',lines:['原名、今年的人、地点时间，都已经和材料对上了。','折页保全的原件和沈嘉宁自己的凭证，也会分别交给调查者。','现在不用再证明你敢不敢进去。我们把知遥的名字和他想离开的那句话一起交出去。'],links:[['case','回到调查整理，决定是否移交']]}
];
function available(s){return people.filter(p=>p.available(s));}
function feed(s,who){if(!available(s).some(p=>p.id===who))return [];return episodes.filter(e=>e.who===who&&e.when(s));}
function signature(s,e){return e.id+(answered(s,e.id)?':reply':'')+(sent(s,e.id)?':file':'');}
function unread(s,who){return feed(s,who).filter(e=>!(s.chat.seen[who]||[]).includes(signature(s,e))).length;}
function markRead(s,who){s.chat.seen[who]=feed(s,who).map(e=>signature(s,e));}
function reply(s,who,id,value){const e=feed(s,who).find(e=>e.id===id),c=e?.choices?.find(c=>c[0]===value);if(!c||answered(s,id))return false;s.chat.answers[id]=value;return true;}
function send(s,who,id,file){const e=feed(s,who).find(e=>e.id===id);if(!e?.evidence||sent(s,id))return '当前没有等待核对的材料。';if(!read(s,file))return '请先打开并阅读这份材料。';if(!e.evidence.accept.includes(file))return e.evidence.wrong;s.chat.evidence[id]=file;return null;}
function restore(raw){const out={answers:{},evidence:{},seen:{}};if(!raw)return out;for(const e of episodes){if(e.choices?.some(c=>c[0]===raw.answers?.[e.id]))out.answers[e.id]=raw.answers[e.id];if(e.evidence?.accept.includes(raw.evidence?.[e.id]))out.evidence[e.id]=raw.evidence[e.id];}for(const p of people)out.seen[p.id]=Array.isArray(raw.seen?.[p.id])?raw.seen[p.id].filter(x=>typeof x==='string'&&x.length<80).slice(0,80):[];return out;}
const api={people,episodes,available,feed,unread,markRead,reply,send,restore};root.ChatStory=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
