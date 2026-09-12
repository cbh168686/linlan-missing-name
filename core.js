(function(root){
'use strict';
const clean=v=>String(v??'').normalize('NFKC').toLowerCase().replace(/[\s:：·，,。._\-/]/g,'');
const required=['printing','carbon','yuan-order','ledger','dutylog','bailu-now','finance','arrival'];
const chapterIds=['name','voice','arrival'];
function fresh(){return {version:2,caseDraft:{},caseRead:{},readingPuzzles:{note:[],route:false},reviewStep:0,chat:{answers:{},evidence:{},seen:{}},horror:true,started:false,mirror:false,board:false,vault:false,caseSolved:false,visited:[],bookmarks:[],notes:'',endings:[],ending:null,motion:!root.matchMedia?.('(prefers-reduced-motion: reduce)').matches,startedAt:null,updatedAt:null};}
function restore(raw,ids){
  let s=fresh();if(!raw||raw.version!==2)return s;
  for(const k of ['started','mirror','board','vault','caseSolved','motion','horror'])if(typeof raw[k]==='boolean')s[k]=raw[k];
  s.chat=root.ChatStory?root.ChatStory.restore(raw.chat):s.chat;
  s.board=s.mirror&&s.board;s.vault=s.board&&s.vault;
  for(const k of ['visited','bookmarks'])s[k]=[...new Set(Array.isArray(raw[k])?raw[k].filter(x=>ids.includes(x)):[])];
  s.notes=typeof raw.notes==='string'?raw.notes.slice(0,30000):'';
  s.endings=[...new Set(Array.isArray(raw.endings)?raw.endings.filter(x=>['good','bad','neutral'].includes(x)):[])];
  s.ending=s.endings.includes(raw.ending)?raw.ending:null;
  // Completed v0.9.3 investigations stay complete after the form is retired.
  const legacyComplete=s.vault&&s.caseSolved&&!Object.hasOwn(raw,'caseRead');
  if(s.vault){s.readingPuzzles.route=legacyComplete||raw.readingPuzzles?.route===true;const order=raw.readingPuzzles?.note;s.readingPuzzles.note=legacyComplete?[0,1,2]:Array.isArray(order)?[0,1,2].filter((x,i)=>order.slice(0,i+1).every((v,n)=>v===n)&&order.length>i):[];}
  if(s.vault)for(const id of chapterIds){if((legacyComplete||raw.caseRead?.[id]===true)&&(id!=='voice'||s.readingPuzzles.note.length===3)&&(id!=='arrival'||s.readingPuzzles.route))s.caseRead[id]=true;else break;}
  s.caseSolved=s.vault&&chapterIds.every(id=>s.caseRead[id]);
  const highest=Math.min(chapterIds.filter(id=>s.caseRead[id]).length,2);
  s.reviewStep=Number.isInteger(raw.reviewStep)?Math.max(0,Math.min(raw.reviewStep,highest)):0;
  s.startedAt=Number.isFinite(raw.startedAt)?raw.startedAt:null;
  return s;
}
function canRead(s,d){return !!d&&(!d.gate||s[d.gate]===true);}
function unlock(s,gate,input={}){
  if(gate==='mirror'){if(clean(input.password)!=='1840')return '口令不匹配。请核对广播正式停播的时刻，使用四位数字。';s.mirror=true;return null;}
  if(gate==='board'){
    if(!s.mirror)return '请先打开周栩的留存包。';
    if(s.chat.evidence['clerk-intro']!=='carbon')return '请先请周栩介绍折页，再在会话里发送复写联核对来源。';
    s.board=true;return null;
  }
  if(gate==='vault'){if(!s.board)return '请先打开理事工作台副本。';if(clean(input.password)!=='842')return '顺序不匹配。请对照三次停灯的方位，依次取对应数字。';s.vault=true;return null;}
  return '未知资料来源。';
}
function readChapter(s,id){
  if(!s.vault)return '请先打开历史档案柜。';
  const n=chapterIds.indexOf(id);if(n<0)return '没有这段整理记录。';
  if(chapterIds.slice(0,n).some(k=>!s.caseRead[k]))return '请先读完前一段经过。';
  if(id==='voice'&&s.readingPuzzles.note.length!==3)return '先把纸条的三段拼起来。';
  if(id==='arrival'&&!s.readingPuzzles.route)return '先对照两份通知，留下实际执行的那一份。';
  s.caseRead[id]=true;s.caseSolved=chapterIds.every(k=>s.caseRead[k]);return null;
}
function pieceNote(s,piece){
  if(!s.vault||!s.caseRead.name)return '先读完关于原名的那一段。';
  const next=s.readingPuzzles.note.length;if(next===3)return null;
  if(piece!==next)return ['先找到他说明自己是谁的那一片。','名字之后，接上他想不想留下的那一片。','最后是他对收到纸条的人的提醒。'][next];
  s.readingPuzzles.note.push(piece);return null;
}
function chooseNotice(s,notice){
  if(!s.vault||!s.caseRead.voice)return '先读完知遥最后一夜的核对。';
  if(notice!=='revised')return '看通知的形成日期。另一张注明它替代了 6 月 10 日的安排，旧版不能继续执行。';
  s.readingPuzzles.route=true;return null;
}
function finish(s,type){
  if(!['good','bad','neutral'].includes(type))return '未知结局。';
  if(type==='good'&&(!s.vault||!s.caseSolved||chapterIds.some(id=>!s.caseRead[id])))return '请先和周栩读完三段整理，再决定移交。';
  if(type==='bad'&&(!s.board||!s.visited.includes('bait')))return '尚未收到接引邀请。';
  s.ending=type;if(!s.endings.includes(type))s.endings.push(type);return null;
}
const api={fresh,restore,canRead,unlock,readChapter,pieceNote,chooseNotice,finish,clean,required,chapterIds};root.GameCore=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

// Local v0.9.5: conclusions require independently selected source documents.
(function(root){
const g=root.GameCore,base={...g};
const scrapSources=['loan','forum','programme','letter-liang'];
const inquiry=()=>({scrapVersion:1,morse:false,collected:[],tiles:Array(4).fill(null)});
g.scrapSources=Object.freeze(scrapSources);
g.fresh=()=>({...base.fresh(),revision:95,prologueDone:false,investigation:inquiry(),phone:{delivered:[],order:[],failures:[],offlineAttempt:false,openedContacts:[],readingReturn:null},legacyComplete:false});
g.restore=(raw,ids)=>{
 const s=base.restore(raw,ids),modern=raw?.revision===95;
 s.revision=95;s.prologueDone=modern?raw.prologueDone===true:!!s.started;
 s.investigation=inquiry();s.phone={delivered:[],order:[],failures:[],offlineAttempt:modern&&raw.phone?.offlineAttempt===true};
 s.legacyComplete=modern?raw.legacyComplete===true:!!s.caseSolved;
 if(modern){
  s.investigation.morse=s.mirror&&raw.investigation?.morse===true;
  if(s.mirror&&raw.investigation?.scrapVersion===1){
   const owned=raw.investigation.collected;
   s.investigation.collected=Array.isArray(owned)?[...new Set(owned.filter(x=>Number.isInteger(x)&&x>=0&&x<4))]:[];
   const used=new Set();
   if(s.investigation.morse)s.investigation.tiles=Array.from({length:4},(_,i)=>{const x=raw.investigation.tiles?.[i];if(s.investigation.collected.includes(x)&&!used.has(x)){used.add(x);return x;}return null;});
  }else if(s.mirror&&(s.board||(raw.investigation?.tiles?.length===6&&raw.investigation.tiles.every((v,i)=>v===i)))){
   // A completed six-piece puzzle keeps its earned progress; unfinished layouts start the four-source hunt.
   s.investigation={scrapVersion:1,morse:true,collected:[0,1,2,3],tiles:[0,1,2,3]};
  }
  s.phone.openedContacts=Array.isArray(raw.phone?.openedContacts)?[...new Set(raw.phone.openedContacts.filter(id=>root.ChatStory.people.some(p=>p.id===id)))]:[];
 const pending=raw.phone?.readingReturn;s.phone.readingReturn=pending&&ids.includes(pending.file)&&root.ChatStory.episodes.some(e=>e.id===pending.episode&&e.who===pending.who&&e.evidence)?{who:pending.who,episode:pending.episode,file:pending.file}:null;
 s.phone.failures=Array.isArray(raw.phone?.failures)?raw.phone.failures.filter(x=>x&&root.ChatStory.episodes.some(e=>e.id===x.id&&e.who===x.who)&&ids.includes(x.file)&&typeof x.text==='string'&&x.text.length<600).slice(-25).map(x=>({id:x.id,who:x.who,file:x.file,text:x.text})):[];
  for(const k of ['delivered','order'])s.phone[k]=Array.isArray(raw.phone?.[k])?[...new Set(raw.phone[k].filter(x=>typeof x==='string'&&x.length<100))].slice(-1200):[];
 }else if(s.board){s.investigation={scrapVersion:1,morse:true,collected:[0,1,2,3],tiles:[0,1,2,3]};}
 return s;
};
g.hasScrap=(s,source)=>s.investigation.collected.includes(scrapSources.indexOf(source));
g.collectScrap=(s,source)=>{
 const piece=scrapSources.indexOf(source);
 if(piece<0||!s.mirror||!s.visited.includes(source))return '先打开这张纸片所在的原始材料。';
 if(!s.investigation.collected.includes(piece))s.investigation.collected.push(piece);
 return null;
};
g.tilesComplete=s=>s.investigation.morse&&s.investigation.tiles.length===4&&scrapSources.every((_,i)=>s.investigation.collected.includes(i)&&s.investigation.tiles[i]===i);
g.decode=(s,value)=>{if(!s.mirror)return '先打开周栩的留存包。';if(g.clean(value)!=='dt')return '还不匹配。斜线是两个字母之间的间隔，每组要完整对照。';s.investigation.morse=true;return null;};
g.placeTile=(s,piece,slot)=>{
 if(!s.mirror||!s.investigation.morse)return '先从广播索引读出两个字母。';
 if(!Number.isInteger(piece)||piece<0||piece>3||!Number.isInteger(slot)||slot<0||slot>3)return '请选择一张纸片和一个位置。';
 if(!s.investigation.collected.includes(piece))return '这张纸片还没保存到手机。请先回到它的来源材料。';
 const a=s.investigation.tiles,from=a.indexOf(piece),other=a[slot];
 if(from>=0)a[from]=other;a[slot]=piece;return null;
};
g.unlock=(s,gate,input={})=>{
 if(gate==='board'&&!s.legacyComplete&&(!g.tilesComplete(s)||!s.visited.includes('night-leaf')))return '先复原广播索引对应的残页，用页上的诵读用语检索留存资料，打开归灯夹页后再回来。';
 return base.unlock(s,gate,input);
};
g.verified=(s,id)=>s.legacyComplete||({name:s.chat.evidence['verify-erasure']==='yuan-order',voice:s.chat.evidence['shen-proof']==='dutylog',arrival:s.chat.evidence['clerk-route']==='arrival'})[id]===true;
g.readChapter=(s,id)=>{
 if(!g.verified(s,id))return {name:'先和周栩核实谁执行了撤名。',voice:'先把含原始页和封存附页的值班簿发给沈嘉宁，核对最后留言的日期与当夜交接。',arrival:'先向折页确认实际接收陈予安的车辆安排。'}[id]||'没有这一段记录。';
 if(id==='voice')s.readingPuzzles.note=[0,1,2];
 if(id==='arrival')s.readingPuzzles.route=true;
 return base.readChapter(s,id);
};
g.finish=(s,type)=>{
 if(type==='good'&&!g.chapterIds.every(id=>g.verified(s,id)))return '三件事还没有都核实：谁改了记录、知遥的献祭与冒名记录、实际接收安排。回到手机继续询问。';
 return base.finish(s,type);
};
if(typeof module!=='undefined'&&module.exports)module.exports=g;
})(typeof window!=='undefined'?window:globalThis);
