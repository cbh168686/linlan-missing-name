/* Four physical fragments, each retained with the document that carried it. */
const SCRAPS=[
 {source:'loan',name:'借阅单夹纸',file:'scrap-loan-scan.svg',note:'周栩：这片是知遥交借阅单扫描件时一起给我的。他说别和节目单旁的那片放在一起。边上有一截相同的红圈。',trail:'他还指过旧站务帖的本地附件，说那一页也要留下。',next:'forum'},
 {source:'forum',name:'旧帖附件残角',file:'scrap-forum-scan.svg',note:'本地附件补存于 2018 年 6 月 16 日，未上传到论坛。知遥在保存下来的帖子旁夹了这一角纸；周栩后来连同附件一起扫描。',trail:'附件便笺：还有一角交给梁老师了。不要让他们把东西都收走。',next:'letter-liang'},
 {source:'programme',name:'节目单旁的残纸',file:'scrap-programme-scan.svg',note:'周栩当日补记：知遥把一角旧纸压在节目单下面，说如果有人来问，不要交出去。我把它和故障记录一起留了底。',trail:'知遥说，他交来的借阅单背面还夹着同样的纸。',next:'loan'},
 {source:'letter-liang',name:'梁惠保留的纸角',file:'scrap-liang-scan.svg',note:'梁惠的附件说明：这片纸是知遥在 6 月 17 日交给我的，一直夹在签到册里。他说原件分开了放。我没有把它交给来取材料的人。',trail:'周栩：加上节目单、借阅单和旧帖旁的几片，圆纹应该能接起来。先留好各自的来源。',next:'programme'}
];
for(const item of SCRAPS){const source=ARCHIVE.find(d=>d.id===item.source);source.keys.push(item.name,'残纸','纸片');}
function scrapImage(source,alt=''){
 const n=GameCore.scrapSources.indexOf(source);
 return `<span class="scrap-scan" style="--scrap-x:${-(n%2)*100}%;--scrap-y:${-Math.floor(n/2)*100}%"><img src="./assets/transmission-leaf-scan-v1.png" alt="${esc(alt)}" draggable="false"></span>`;
}
function scrapAttachment(source){
 const item=SCRAPS.find(x=>x.source===source);if(!item)return '';
 const owned=GameCore.hasScrap(state,source);
 return `<section class="scrap-attachment" aria-label="${esc(item.name)}"><header>随附扫描件 · ${esc(item.name)}</header><p>${esc(item.note)}</p>${scrapImage(source,item.name+"：旧纸上的部分红圈与残缺文字")}<p>${esc(item.trail)}</p><div class="scrap-actions"><button data-local="collect-scrap" data-source="${source}" ${owned?'disabled':''}>${owned?'已保存到手机文件':'保存这张纸片到手机'}</button>${owned?`<a href="#scrap/${source}">查看保存的纸片</a>`:''}<a href="#doc/${item.next}">查看相关留存材料 →</a><a href="#doc/torn-leaf">打开残页拼接 →</a></div><p class="scrap-save-status" role="status">${owned?`纸片已保存 · 共 ${state.investigation.collected.length}/4 张`:'仅打开材料不会保存纸片。'}</p></section>`;
}
function savedScrapsList(){
 const items=SCRAPS.filter(x=>GameCore.hasScrap(state,x.source));if(!items.length)return '';
 return `<section class="phone-scraps"><h2>保存的纸片 <small>${items.length}/4</small></h2>${items.map(x=>`<a href="#scrap/${x.source}" class="phone-file">${scrapImage(x.source)}<span><strong>${esc(x.name)}</strong><small>来源：${esc(doc(x.source).title)}</small></span><b>›</b></a>`).join('')}<a class="scrap-assemble-link" href="#doc/torn-leaf">打开残页拼接副本 →</a></section>`;
}
function scrapPage(source){
 const item=SCRAPS.find(x=>x.source===source);if(!item)return missing();
 if(!state.mirror)return gate('mirror');
 if(!GameCore.hasScrap(state,source))return archiveShell('扫描件未保存',`<div class="archive-lock"><h2>手机里还没有这张纸片</h2><p>请先到原始材料里保存附件。</p><a href="#doc/${source}">打开${esc(doc(source).title)} →</a></div>`,{folder:'mirror'});
 return archiveShell(item.name,`<article class="saved-scrap-preview">${scrapImage(source,item.name+"：保留下来的单张纸片")}<p>${esc(item.note)}</p><div class="scrap-actions"><a href="./assets/${item.file}" download="${esc(item.name)}.svg">下载这张纸片</a><a href="#doc/${source}">回到来源材料</a><a href="#doc/torn-leaf">打开残页拼接 →</a></div></article>`,{folder:'mirror',mode:'preview',aside:`<h2>保存的扫描件</h2><p>来源：${esc(doc(source).title)}</p><p>原件形成日期：${doc(source).date}</p><p>已收集 ${state.investigation.collected.length}/4 张。调整拼接位置不会删除已保存的纸片。</p>`});
}
