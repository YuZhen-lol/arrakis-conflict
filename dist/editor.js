
"use strict";
let managerTab="custom",managerFilter="all";
function option(value,label,selected){return `<option value="${esc(value)}" ${String(value)===String(selected)?"selected":""}>${esc(label)}</option>`}
function newDraft(){return {id:"custom-"+uid(),pack:"c-1",name:"",en:"",tier:2,battle:"blade",corner:null,noWorm:false,location:null,thirdInThree:false,first:[{type:"vp",qty:1}],second:[{type:"spice",qty:2}],third:[{type:"solari",qty:2}],note:""}}
function packOptions(current){return state.numbers.map(n=>option("c-"+n,"自定义牌包 "+n,current)).join("")}
function subhead(en,title,desc){return `<div class="subhero"><div class="eyebrow">${en}</div><h1>${title}</h1><p class="muted">${desc}</p></div>`}
function rewardFields(rank){
 return draft[rank].map((item,i)=>`<div class="reward-input" data-rank="${rank}" data-index="${i}">
 <select data-rfield="type" aria-label="奖励类型">${Object.entries(LABELS).map(([k,v])=>option(k,v,item.type)).join("")}</select>
 <input data-rfield="qty" aria-label="奖励数量" required type="number" min="1" max="99" value="${esc(item.qty)}">
 <input data-rfield="text" aria-label="效果说明" maxlength="100" placeholder="效果说明（可选）" value="${esc(item.text||"")}">
 <button type="button" data-action="delReward" data-id="${rank}:${i}" aria-label="移除此项奖励">${icon("close",15)}</button></div>`).join("")
}
function showEditor(){
 if(!draft)draft=newDraft();
 main.innerHTML=`<div class="wrapper">${subhead("Card workshop","制作战斗奖励牌","设定冲突等级、战场规则与三个名次的奖励。")}
 <div class="editor-layout"><form class="panel" id="editorForm"><div class="panelhead"><h3>${icon("pencil")}卡牌设置</h3><button type="button" class="smallbtn" data-action="newDraft">${icon("plus",15)} 新建</button></div>
 <div class="formgrid"><label class="field wide">牌名<input name="name" placeholder="为这场冲突命名" maxlength="40" required value="${esc(draft.name)}"></label>
 <label class="field">冲突等级<select name="tier">${[1,2,3].map(n=>option(n,"冲突 "+rom[n],draft.tier)).join("")}</select></label>
 <label class="field">归属牌包<select name="pack">${packOptions(draft.pack)}</select></label>
 <label class="field">战斗图标<select name="battle">${Object.entries(BATTLES).map(([k,v])=>option(k,v,draft.battle)).join("")}</select></label>
 <label class="field">右上角规则<select name="corner">${option("","无额外规则",draft.corner||"")}${Object.entries(CORNER_RULES).map(([k,v])=>option(k,v.name,draft.corner)).join("")}</select></label>
 <label class="row hint"><input type="checkbox" name="noWorm" ${draft.noWorm?"checked":""}>本场禁用沙虫</label>
 <label class="row hint"><input type="checkbox" name="thirdInThree" ${draft.thirdInThree?"checked":""}>三人局也发第三档</label></div>
 ${ranks.map((rank,i)=>`<section class="form-section"><h3>${rankNames[i]}奖励</h3>${rewardFields(rank)}<button type="button" class="smallbtn" data-action="addReward" data-id="${rank}">${icon("plus",15)} 添加奖励</button></section>`).join("")}
 <label class="field form-section">结算说明<textarea name="note" maxlength="600" placeholder="写明选项、支付条件或平局处理。">${esc(draft.note)}</textarea></label>
 <div class="actions"><button class="primary" type="submit">${icon("check",17)}保存战斗牌</button><button type="button" data-action="addPack">新建牌包</button></div></form>
 <section class="panel preview-panel"><p class="preview-top">${icon("stack",18)}　实时牌面</p><div id="preview">${cardFace(draft)}</div></section></div></div>`;
 const form=$("#editorForm");
 form.oninput=e=>{
 const el=e.target,row=el.closest(".reward-input");
 if(row){draft[row.dataset.rank][Number(row.dataset.index)][el.dataset.rfield]=el.dataset.rfield==="qty"?Number(el.value):el.value}
 else if(el.name){draft[el.name]=el.type==="checkbox"?el.checked:el.name==="tier"?Number(el.value):el.name==="corner"?(el.value||null):el.value}
 $("#preview").innerHTML=cardFace(draft)
 };
 form.onsubmit=e=>{e.preventDefault();draft.name=draft.name.trim();if(!draft.name){form.elements.name.setCustomValidity("请输入牌名。");form.elements.name.reportValidity();form.elements.name.setCustomValidity("");return}
 const detailTypes=["trade","choice","remainder","control","other"];for(const rank of ranks){for(const [i,item] of draft[rank].entries()){if(detailTypes.includes(item.type)&&!item.text?.trim()){const el=form.querySelector(`[data-rank="${rank}"][data-index="${i}"] [data-rfield="text"]`);el.setCustomValidity("请写明这个效果如何结算。");el.reportValidity();el.setCustomValidity("");return}}}
 const c=structuredClone(draft),pos=state.custom.findIndex(old=>old.id===c.id);if(pos<0)state.custom.push(c);else state.custom[pos]=c;
 if(persist())toast("已保存至"+packName(c.pack));draft=null;managerTab="custom";managerFilter="all";go("manage")}
}
function addPack(){const n=Math.max(0,...state.numbers)+1;state.numbers.push(n);if(page==="editor")draft.pack="c-"+n;persist();render();toast("已新建自定义牌包 "+n)}
function downloadJSON(name,value){const a=document.createElement("a"),url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:"application/json;charset=utf-8"}));a.href=url;a.download=name+".json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1500)}
function customList(){
 const cards=state.custom.filter(c=>managerFilter==="all"||c.pack===managerFilter);
 return `<div class="panel"><div class="panelhead"><h3>${icon("layers")}我的战斗牌</h3><span class="muted">${cards.length} 张</span></div><label class="row">筛选牌包 <select id="filter" style="width:auto">${option("all","全部牌包",managerFilter)}${packOptions(managerFilter)}</select></label>
 ${cards.length?cards.map(c=>`<div class="listitem"><span><small>冲突 ${rom[c.tier]} · ${esc(BATTLES[c.battle])}</small><b>${esc(c.name)}</b></span><div class="row"><select aria-label="移动 ${esc(c.name)} 的归属牌包" data-move="${esc(c.id)}">${packOptions(c.pack)}</select>
 <button data-action="inspectCard" data-id="${esc(c.id)}">查看</button><button data-action="editCard" data-id="${esc(c.id)}">编辑</button><button class="danger" data-action="removeCard" data-id="${esc(c.id)}" aria-label="删除 ${esc(c.name)}">${icon("trash",16)}</button></div></div>`).join(""):`<div class="empty">${icon("layers",40)}<p>${managerFilter==="all"?"还没有自定义战斗牌":"这个牌包中还没有战斗牌"}</p><button class="primary" data-action="toEditor">${icon("plus",16)}制作第一张牌</button></div>`}</div>`
}
function showManager(){
 const tabs={custom:"自定义牌",base:"起义初始牌包",myth:"沙海异闻"};
 const list=allCards().filter(c=>packOf(c)===managerTab);
 main.innerHTML=`<div class="wrapper">${subhead("Card archive","牌库管理","查看牌面与来源，编辑自制牌，或调整它们的归属牌包。")}<div class="heading"><div class="tabbar">${Object.entries(tabs).map(([k,v])=>`<button aria-pressed="${k===managerTab}" class="${k===managerTab?"on":""}" data-action="managerTab" data-id="${k}">${v}</button>`).join("")}</div><button class="smallbtn" data-action="addPack">${icon("plus",15)} 新建牌包</button></div>
 ${managerTab==="custom"?customList():`<div class="catalog">${list.map(c=>`<div>${cardFace(c)}<div class="actions"><button class="smallbtn" data-action="inspectCard" data-id="${c.id}">卡牌详情</button></div></div>`).join("")}</div>`}</div>`;
 if($("#filter"))$("#filter").onchange=e=>{managerFilter=e.target.value;showManager()};
 main.querySelectorAll("[data-move]").forEach(el=>el.onchange=()=>{const c=state.custom.find(c=>c.id===el.dataset.move);c.pack=el.value;dropEmptySelections();if(persist())toast("已移动至"+packName(c.pack));showManager()})
}
function dropEmptySelections(){state.packs=state.packs.filter(p=>!p.startsWith("c-")||state.custom.some(c=>c.pack===p))}
function inspectCard(id){const c=allCards().find(c=>c.id===id);if(!c)return;
 modal(c.name,`${cardFace(c)}<div class="actions"><button data-action="jsonCard" data-id="${esc(id)}">${icon("download",16)} 导出 JSON</button>${c.source?`<a href="${esc(c.source)}" target="_blank" rel="noopener">对照原始牌图</a>`:""}</div>`)
}
Object.assign(actions,{
 managerTab:id=>{managerTab=id;showManager()},addPack,
 addReward:rank=>{draft[rank].push({type:"spice",qty:1});showEditor()},
 delReward:id=>{const [rank,i]=id.split(":");draft[rank].splice(Number(i),1);showEditor()},
 newDraft:()=>modal("新建战斗牌？",`<p>新建将清空当前编辑表单。</p><div class="actions"><button data-action="confirmDraft" class="primary">新建战斗牌</button><button data-action="close">继续编辑</button></div>`),
 confirmDraft:()=>{dialog.close();draft=newDraft();showEditor()},
 editCard:id=>{draft=structuredClone(state.custom.find(c=>c.id===id));go("editor")},
 inspectCard,jsonCard:id=>{const c=allCards().find(c=>c.id===id);if(c)downloadJSON(c.name,c)},
 removeCard:id=>{const c=state.custom.find(c=>c.id===id);modal("删除战斗牌？",`<p>从本地牌库移除「${esc(c.name)}」。已有战局的牌序和记录会保留。</p><div class="actions"><button class="primary" data-action="confirmRemove" data-id="${esc(id)}">删除此牌</button><button data-action="close">取消</button></div>`)},
 confirmRemove:id=>{state.custom=state.custom.filter(c=>c.id!==id);dropEmptySelections();if(draft?.id===id)draft=null;persist();dialog.close();showManager()}
});

