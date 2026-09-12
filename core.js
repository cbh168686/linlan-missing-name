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
  if(!s.vault||!s.caseRead.voice)return '先读完知遥的求助。';
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
