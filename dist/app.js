
"use strict";
paths.wild='<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 0 1 6 1c0 2-3 3-3 5m0 3v.2"/>';
paths.contract='<path d="M5 2h11l3 3v17H5zm3 6h8m-8 4h8m-8 5 3-1 3 1"/>';
LABELS.contract="合同";
BATTLES.wild="万能（终局配对）";
const $=s=>document.querySelector(s);
const main=$("#main"), dialog=$("#dialog");
const ranks=["first","second","third"], rankNames=["第一名","第二名","第三名"];
const PLAYER_NAMES=["红色玩家","蓝色玩家","绿色玩家","黄色玩家"], COLORS=["#ab4736","#47748f","#667647","#bc8d2f"];
const official="https://dwd-web.s3.us-west-2.amazonaws.com/pdfs/DUNE_IMPERIUM_UPRISING_Main_Rulebook_23-10-12.pdf";
const uid=()=>crypto.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2);
function loadState(){
  const blank={custom:[],numbers:[1,2,3],game:null,history:[],packs:["base"],players:4};
  try{return {...blank,...JSON.parse(localStorage.getItem("arrakis-table-v1")||"{}")}}catch{return blank}
}
let state=loadState(),page="",draft=null,toastTimer;
function persist(){
 try{localStorage.setItem("arrakis-table-v1",JSON.stringify(state));return true}
 catch{toast("浏览器未能写入存储。本次更改仅在当前页面有效。");return false}
}
function toast(message){
 const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),4200)
}
function packOf(card){return card.pack||"base"}
function packName(id){return id==="base"?"起义初始牌包":id==="myth"?"沙海异闻":"自定义牌包 "+id.slice(2)}
function allCards(){return [...BASE_CARDS,...EXPANSION_CARDS,...state.custom]}
function modal(title,html){
 $("#dialog-content").innerHTML=`<div class="modal-head"><h2 id="modal-title">${esc(title)}</h2><button class="close" data-action="close" aria-label="关闭">${icon("close")}</button></div>${html}`;
 dialog.setAttribute("aria-labelledby","modal-title");if(!dialog.open)dialog.showModal();dialog.scrollTop=0
}
function openRules(){modal("战斗规则手册",`
 <details open><summary>组牌与揭示</summary><div class="rule-list"><p>将所选牌包按等级混合洗牌，依次抽取 I 级 1 张、II 级 5 张、III 级 4 张。每轮只揭示一张。标准对局达到终局条件时，可在结算后提前结束。</p><p>每支部队提供 2 战力，每条沙虫提供 3 战力。有单位参战时，每把剑提供 1 战力。持续轮流打出战斗阴谋牌，直到所有参战玩家连续跳过。</p></div></details>
 <details><summary>名次、平局与三人局</summary><div class="rule-list"><p>战力须大于零才能领奖。三人局通常只发前两档。并列第一各领第二档，无人拿走冲突牌；四人局恰有两人并列第一时，其余玩家可争第三档。并列第二各领第三档，后续名次无奖。并列第三无奖。</p><p>奖励完成后，唯一胜者获得本牌。两枚相同的正面战斗图标（含目标牌）必须翻面并获得 1 胜利点。万能图标留待终局配对。请在桌面记录分数和已经配对的图标。</p></div></details>
 <details><summary>沙虫、护盾墙与合同</summary><div class="rule-list"><p>有至少一条沙虫参战，实际所得奖励翻倍一次。控制权和战斗图标除外。付费奖励须再次支付完整费用才能再领一次。结算后部队回供应区，沙虫回公共供应区。</p><p>护盾墙在场时，三处关键地点的冲突禁止召唤沙虫。已控制该地点的玩家在揭牌时可从供应区向冲突区部署 1 支部队。使用「本场禁用沙虫」的自制牌始终禁虫。</p><p>未启用联合商会模块或没有可取合同时，每份合同改领 2 帝国索。</p></div></details>
 <details><summary>沙海异闻 · 五种角标</summary><div class="rule-list">${Object.entries(CORNER_RULES).map(([k,v])=>`<p><strong>${icon(k,17)} ${v.name}</strong>　${v.text}</p>`).join("")}<p>角标是全场规则，独立于名次奖励，仅触发一次。沙虫不会将其翻倍。结算转移类效果前，先确定所有名次。</p></div></details>
 <details><summary>规则书与原始牌图</summary><div class="rule-list"><p>采用独立游戏《Dune: Imperium – Uprising》的三、四人规则。初始牌的中文名称为本工具译名。</p><a href="${official}" target="_blank" rel="noopener">Dire Wolf 官方英文规则书（PDF）</a><a href="https://dunecardshub.com/uprising/conflicts" target="_blank" rel="noopener">Dune Cards Hub · 16 张原版冲突牌图</a></div></details>`)}
function packTile(kind,title,desc,chosen){
 return `<button class="pack ${chosen?"active":""}" data-action="pack" data-id="${kind}" aria-pressed="${chosen}"><span class="art ${kind}"><span class="tick">${chosen?icon("check",15):kind==="custom"?'<span style="color:#5c6558">+</span>':""}</span></span><span class="packinfo"><b>${title}</b><small>${desc}</small></span></button>`
}
function selectedCards(){return allCards().filter(c=>state.packs.includes(packOf(c)))}
function shortages(){
 const pool=selectedCards();
 return [1,5,4].map((count,i)=>Math.max(0,count-pool.filter(c=>c.tier===i+1).length)).map((n,i)=>n?`${rom[i+1]} 级缺 ${n} 张`:"").filter(Boolean)
}
function historyBar(){return `<button class="history-bar" data-action="history"><strong>${icon("history")}战斗记录</strong><small>${(state.game?.entries.length||0)+state.history.reduce((sum,h)=>sum+h.entries.length,0)} 场冲突　查看记录 ›</small></button>`}
function setup(){
 const customSelected=state.packs.filter(p=>p.startsWith("c-")).length, short=shortages();
 main.innerHTML=`<div class="wrapper"><section class="hero"><div><div class="eyebrow">ARRAKIS CONFLICT TABLE</div><h1>沙丘战斗牌桌</h1><p>选择你的牌包，揭开厄拉科斯的下一场冲突。</p></div></section>
 <div class="heading"><h2>战前部署 <span class="english">Battle preparation</span></h2><span class="muted">${icon("stack",16)} 标准战局 · 10 轮</span></div>
 <div class="grid"><section class="panel"><div class="panelhead"><h3>${icon("layers")}选择牌包</h3><small class="muted">可多选</small></div>
 <div class="packs">${packTile("base","起义初始牌包","原版 · 16 张战斗牌",state.packs.includes("base"))}${packTile("myth","沙海异闻","原创扩展 · 12 张战斗牌",state.packs.includes("myth"))}${packTile("custom","自定义牌包",customSelected?`已选 ${customSelected} 个牌包`:`我的收藏 · ${state.custom.length} 张战斗牌`,customSelected>0)}</div>
 <div class="packs-foot">${icon("stack",15)}已选 ${state.packs.length} 个牌包 <span>·</span> 共 ${selectedCards().length} 张候选牌</div></section>
 <section class="panel setupbox"><div class="panelhead"><h3>${icon("settings")}战局设置</h3></div><span class="setting-label">玩家人数</span><div class="segments">${[3,4].map(n=>`<button data-action="players" data-id="${n}" aria-pressed="${n===state.players}" class="${n===state.players?"selected":""}">${icon("users",16)}　${n} 人</button>`).join("")}</div>
 <div class="composition"><small class="setting-label" style="margin:0">冲突牌序</small><div class="row">${[1,5,4].map((v,i)=>`<span class="tier-tag"><b>${rom[i+1]}</b> ×${v}</span>`).join("")}</div></div>
 ${short.length?`<p class="error" role="status">${short.join("，")}。请增选牌包。</p>`:""}<button class="primary" data-action="start" ${short.length?"disabled":""}>${icon("swords")}开始战争</button></section></div>${historyBar()}</div>`
}
function shuffle(items){
 const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a
}
function startGame(){
 if(state.game||shortages().length)return;
 const pool=selectedCards(),deck=[1,5,4].flatMap((n,i)=>shuffle(pool.filter(c=>c.tier===i+1)).slice(0,n));
 state.game={id:uid(),started:new Date().toISOString(),players:state.players,packs:state.packs.slice(),deck:JSON.parse(JSON.stringify(deck)),entries:[],wall:true};
 persist();render();window.scrollTo(0,0)
}
function customPacks(){
 modal("选择自定义牌包",`<p class="hint">勾选要混入战局的牌包。</p><form id="pack-form">${state.numbers.map(n=>{
 const id="c-"+n,num=state.custom.filter(c=>c.pack===id).length;
 return `<label class="pack-option"><input type="checkbox" name="packs" value="${id}" ${state.packs.includes(id)?"checked":""} ${num?"":"disabled"}>自定义牌包 ${n}<small class="muted">${num} 张</small></label>`}).join("")}<div class="actions"><button class="primary">应用选择</button><button type="button" data-action="toEditor">制作战斗奖励牌</button></div></form>`);
 $("#pack-form").onsubmit=e=>{e.preventDefault();state.packs=[...state.packs.filter(p=>!p.startsWith("c-")),...new FormData(e.target).getAll("packs")];persist();dialog.close();render()}
}
function battle(){
 const g=state.game,index=g.entries.length,card=g.deck[index],rule=CORNER_RULES[card.corner];
 main.innerHTML=`<div class="wrapper"><div class="subhero"><div class="eyebrow">ACTIVE CONFLICT</div><h1>第 ${index+1} 轮冲突</h1><p class="muted">${g.players} 人战局 · ${g.packs.map(packName).map(esc).join("、")}</p></div>
 <div class="gameboard"><section class="reveal">${cardFace(card,g.players)}</section><section class="panel"><div class="panelhead"><h3>${icon("flag")}战局进度</h3><span class="meta">${String(index+1).padStart(2,"0")} / 10</span></div><div class="roundstrip" aria-label="第 ${index+1} 轮">${g.deck.map((_,i)=>`<i class="${i<index?"past":i===index?"now":""}"></i>`).join("")}</div>
 <p class="hint">在桌面完成部署、战斗与领奖后，登记本轮胜者。</p>${rule?`<div class="callout"><b>${rule.name}</b>　${rule.text}</div>`:""}
 <label class="pack-option"><input type="checkbox" id="wall" ${g.wall?"checked":""}>护盾墙仍在场</label>
 <p class="hint">${card.noWorm?"本牌禁用沙虫。":card.location&&g.wall?"本轮受护盾墙保护，禁止召唤沙虫。":"本轮可按通常规则召唤沙虫。"}${card.location?" 控制该地点者可在揭牌时部署 1 支防守部队。":""}</p>
 <div class="actions"><button class="primary" data-action="resolve">${icon("swords")}战斗结束</button><button data-action="end">提前结束战局</button></div></section></div>${historyBar()}</div>`;
 $("#wall").onchange=e=>{g.wall=e.target.checked;persist();battle()}
}
function resolveModal(){
 const g=state.game,card=g.deck[g.entries.length];
 modal("谁赢得了这场冲突？",`<p class="hint">第 ${g.entries.length+1} 轮 · ${esc(card.name)}</p><form id="result-form">${PLAYER_NAMES.slice(0,g.players).map((p,i)=>`<label class="winner-option"><input type="radio" name="winner" value="${i}" required><i class="p-dot" style="--color:${COLORS[i]}"></i>${p}</label>`).join("")}
 <label class="winner-option"><input type="radio" name="winner" value="tie" required>并列第一 · 无人获得冲突牌</label><label class="winner-option"><input type="radio" name="winner" value="none" required>无人参战或全员零战力</label>
 ${card.id==="myth-split"?`<label class="field hidden" id="bequest">胜者选择<select name="bequest"><option>金封 · 1 胜利点</option><option>蓝封 · 2 水和 1 阴谋</option></select></label>`:""}
 <p class="callout" id="resolve-tip">记录后将揭示下一张冲突牌。请先在桌面发完本轮奖励。</p>
 <label class="row hint"><input type="checkbox" name="end">本轮已达终局，结算后结束战局</label>
 <div class="actions"><button class="primary" type="submit">确认战果</button><button type="button" data-action="close">返回牌桌</button></div></form>`);
 const form=$("#result-form");
 form.onchange=()=>{const w=form.elements.winner.value,tie=w==="tie",none=w==="none";$("#bequest")?.classList.toggle("hidden",tie||none);
 $("#resolve-tip").textContent=tie?`并列第一各领${card.id==="myth-split"?" 2 香料":"第二档奖励"}，无人获得本牌。${g.players===4?"恰有两人并列时，其余人仍可争第三档。":""}`:none?"本轮无人领奖，弃置本牌。":"唯一胜者获得冲突牌。请与已有的冲突牌和目标牌核对图标。"};
 form.onsubmit=e=>{e.preventDefault();const data=new FormData(form),w=data.get("winner");if(w===null||g!==state.game)return;
 g.entries.push({round:g.entries.length+1,card:card.name,battle:card.battle,winner:w,bequest:card.id==="myth-split"&&!["tie","none"].includes(w)?data.get("bequest"):null});
 dialog.close();if(g.entries.length===10||data.has("end")){archiveGame();summaryGame()}else{persist();battle();window.scrollTo(0,0)}}
}
function archiveGame(){const g=state.game;state.history.unshift({id:g.id,started:g.started,ended:new Date().toISOString(),players:g.players,packs:g.packs,entries:g.entries});state.game=null;persist()}
function winnerName(w){return w==="tie"?"并列第一":w==="none"?"无人获胜":PLAYER_NAMES[Number(w)]}
function entriesHTML(g){return g.entries.length?g.entries.map(e=>`<div class="listitem"><span><small>第 ${e.round} 轮 · ${esc(BATTLES[e.battle])}</small><b>${esc(e.card)}</b></span><span>${esc(winnerName(e.winner))}${e.bequest?`<small>${esc(e.bequest)}</small>`:""}</span></div>`).join(""):`<p class="hint">尚未记录冲突。</p>`}
function summaryGame(){
 setup();const g=state.history[0];modal("战局已结束",`<p class="hint">${g.players} 名玩家 · 已结算 ${g.entries.length} 轮。最终胜负按桌面总胜利点判定。</p>${entriesHTML(g)}<div class="actions"><button data-action="close" class="primary">返回战前部署</button></div>`)
}
function historyModal(){
 const games=[...(state.game?[state.game]:[]),...state.history];modal("战斗记录",games.length?games.map((g,i)=>`<details class="history-group" ${i===0?"open":""}><summary>${g.ended?"已结束":"进行中"} · ${new Date(g.started).toLocaleString("zh-CN",{timeZone:"Asia/Shanghai",hour12:false})} · ${g.players} 人</summary>${entriesHTML(g)}</details>`).join(""):`<div class="empty">${icon("history",34)}<p>尚无战斗记录</p><small class="hint">结算第一场冲突后，可在这里查看获胜玩家。</small></div>`)
}
function go(to){if(dialog.open)dialog.close();if(location.hash==="#"+to)render();else location.hash=to}
function render(){
 page=location.hash.slice(1);if(!["war","editor","manage"].includes(page))page="war";
 document.querySelectorAll("[data-nav]").forEach(a=>{a.classList.toggle("current",a.dataset.nav===page);if(a.dataset.nav===page)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
 if(page==="war"){state.game?battle():setup()}else if(page==="editor"){showEditor()}else showManager()
}
const actions={
 close:()=>dialog.close(),pack:id=>{if(id==="custom")return customPacks();state.packs=state.packs.includes(id)?state.packs.filter(p=>p!==id):[...state.packs,id];persist();setup()},
 players:id=>{state.players=Number(id);persist();setup()},start:startGame,history:historyModal,resolve:resolveModal,toEditor:()=>go("editor"),
 end:()=>modal("提前结束战局？",`<p>已结算的轮次将保留在战斗记录中，当前未结算的冲突不会计入。</p><div class="actions"><button class="primary" data-action="confirmEnd">结束并保存记录</button><button data-action="close">继续对局</button></div>`),
 confirmEnd:()=>{if(!state.game)return;archiveGame();summaryGame()}
};
document.addEventListener("click",e=>{const b=e.target.closest("[data-action]");if(b&&!b.disabled)actions[b.dataset.action]?.(b.dataset.id,b)});
window.addEventListener("hashchange",()=>{if(dialog.open)dialog.close();render();window.scrollTo(0,0)});
$("#rules").onclick=openRules;
$("#feedback").onclick=()=>modal("反馈",`
 <div class="feedback-copy"><p>测试内容，数值会继续调整</p><p>联系作者：1244134683（QQ）</p></div>
 <div class="actions"><a class="primary feedback-submit" href="https://github.com/YuZhen-lol/arrakis-conflict-pages/issues/new" target="_blank" rel="noopener noreferrer">提交反馈</a></div>`);
document.querySelectorAll("[data-icon]").forEach(i=>i.innerHTML=icon(i.dataset.icon));
window.addEventListener("storage",event=>{
 if(event.key!=="arrakis-table-v1")return;
 state=loadState();
 if(dialog.open)dialog.close();
 render();
});
window.addEventListener("DOMContentLoaded",()=>{
 const cardId=new URLSearchParams(location.search).get("card");
 const linkedCard=cardId&&location.hash==="#manage"&&allCards().find(c=>c.id===cardId);
 if(linkedCard)managerTab=packOf(linkedCard).startsWith("c-")?"custom":packOf(linkedCard);
 render();
 if(linkedCard)inspectCard(linkedCard.id);
});

