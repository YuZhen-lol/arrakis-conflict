
"use strict";
// One vector die per component. Quantities are typeset at render time from the reward data.
const counterDies = {
 spice:`<path d="M16 6h32l14 26-14 26H16L2 32Z" fill="#2e2119"/><path d="M17.5 8.5h29L59 32 46.5 55.5h-29L5 32Z" fill="#d6ba85"/><path d="M19 11h26l12 21-12 21H19L7 32Z" fill="url(#ink-spice)" stroke="#784315" stroke-width="1.4"/><path d="m10 31 10-18h24" fill="none" stroke="#ffe0a0" opacity=".62"/>`,
 solari:`<circle cx="32" cy="33.5" r="27.5" fill="#211d18"/><circle cx="32" cy="31.5" r="26" fill="url(#ink-silver)" stroke="#493c32" stroke-width="2"/><circle cx="32" cy="31.5" r="22.8" fill="none" stroke="#655a48" stroke-width="1.35"/><circle cx="32" cy="31" r="21.2" fill="none" stroke="#fff8d8" opacity=".62"/>`,
 water:`<path d="M32 3C29 16 12 31 12 43a20 20 0 1 0 40 0C52 31 36 17 32 3Z" fill="#1b232c"/><path d="M32 7C28 20 15 32 15 42a17 17 0 1 0 34 0c0-10-13-23-17-35Z" fill="url(#ink-water)" stroke="#a7c7d3" stroke-width="1.7"/><path d="M21 38c2-6 5-10 9-17" fill="none" stroke="#dbf3fa" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>`,
 troop:`<path d="m32 4 25 11v34L32 61 7 49V15Z" fill="#251f1a"/><path d="m32 7 22 10-22 11-22-11Z" fill="#e5ded0"/><path d="M10 19 31 29v27L10 46Z" fill="#c2b8a8"/><path d="m33 29 21-10v27L33 56Z" fill="#9d9383"/><path d="m13 16 19-8 18 9M11 22v22" fill="none" stroke="#fbf2dd" stroke-width="1.1"/>`,
 spy:`<path d="M13 15c0-12 38-12 38 0v35c0 13-38 13-38 0Z" fill="url(#ink-silver)" stroke="#31281d" stroke-width="3"/><ellipse cx="32" cy="15" rx="18.5" ry="7.5" fill="#e1d7c5" stroke="#756b5a" stroke-width="1.5"/><path d="M18 23v25" stroke="#fff8d9" stroke-width="2"/>`,
 intrigue:`<rect x="13" y="3" width="38" height="58" rx="2" fill="#191711" stroke="#191711" stroke-width="3"/><rect x="15" y="5" width="34" height="54" rx="1" fill="url(#ink-black)" stroke="#e8daad" stroke-width="1.5"/><rect x="18" y="8" width="28" height="48" fill="none" stroke="#8f742e"/><path d="M32 12c2 10-10 15-10 22 0 5 4 7 9 8-4-4-2-8 1-10 5-5 9-12 0-20Zm1 39c-1-8 9-13 9-19 0-4-2-6-7-8 3 5 1 9-3 13-4 5-5 10 1 14Z" fill="#eac45e"/>`,
 vp:`<path d="m32 2 6 4 8 1 3 6 7 4 1 7 5 8-4 7-1 8-7 4-4 7-8 1-7 3-7-4-8-1-4-7-7-4v-8l-4-7 4-7 1-8 7-4 4-7 8-1Z" fill="#e9b742" stroke="#fff2a3" stroke-width="1.5"/><circle cx="32" cy="32" r="22" fill="url(#ink-gold)" stroke="#fff1ad" stroke-width="2"/><g fill="none" stroke="#f6d475" stroke-width="1.4" transform="rotate(-29 32 32)"><ellipse cx="32" cy="32" rx="11" ry="21"/><ellipse cx="32" cy="32" rx="21" ry="8"/><path d="M11 32h42m-21-21v42"/></g><circle cx="47" cy="46" r="8" fill="url(#ink-gold)" stroke="#fff0a2" stroke-width="1.5"/>`,
 control:`<path d="M9 6h46v52L32 45 9 58Z" fill="#e9d2a5" opacity=".8"/><path d="M12 36q20-29 40 0-20-15-40 0" fill="#9e7d50"/><circle cx="32" cy="36" r="5.7" fill="#a88a5a"/>`,
 contract:`<path d="m12 13 44 0 4 5v27l-9 8H8l-3-5V22Z" fill="#2c2119" stroke="#e8ce9f" stroke-width="2"/><path d="m13 17 41 0 2 3v22l-8 7H10V24Z" fill="#b66a28"/><circle cx="32" cy="33" r="12" fill="#c22a11"/><circle cx="32" cy="33" r="8" fill="#130f0c"/>`,
 trash:`<rect x="14" y="4" width="36" height="55" rx="1" fill="url(#ink-black)" stroke="#ded1ac" stroke-width="2.2"/><path d="m24 24 16 16m0-16-16 16" fill="none" stroke="#faf2df" stroke-width="6"/>`,
 influence:`<path d="m32 2 28 29-6 3-22-20-22 20-6-3Z" fill="#ffca49" stroke="#652c11" stroke-width="1.5"/><path d="m32 14 21 23-21 24L11 37Z" fill="#1a1714"/>`
};
const tokenGradients={
 spice:["#f89132","#d95b17","#b2360c"], silver:["#f5edda","#c8bfae","#8e8375"], water:["#cae4ec","#8ab7d2","#4b80a1"],
 gold:["#fff5a3","#db9f26","#855014"], black:["#453826","#15130f","#33271b"]
};
const factionMarks={
 any:'<text x="32" y="48" text-anchor="middle" fill="#ffca3e" font-family="Arial,sans-serif" font-weight="bold" font-size="36">?</text>',
 emperor:'<path d="m15 39 6-9 11-5 11 5 6 9-14-8v19h-6V31Z" fill="#eee8d6"/>',
 guild:'<path d="M32 37c-12-18-26 3-13 5 6 1 12-10 14-11 14-10 23 15 10 12-3 0-8-3-11-6Z" fill="none" stroke="#dd4739" stroke-width="4"/>',
 sisterhood:'<g fill="none" stroke="#dba4c9" stroke-width="3"><circle cx="24" cy="37" r="7"/><circle cx="40" cy="37" r="7"/><path d="m25 31 7-6 7 6m-7 0v17"/></g>',
 fremen:'<circle cx="32" cy="37" r="12" fill="#66b6d3"/><path d="M17 37h30m-15-15q-10 15 0 30" fill="none" stroke="#1d3646" stroke-width="2.5"/>'
};
const factionsByEffect=new Map([
 ["任一派系影响力 +1","any"],["宇航公会影响力 +1","guild"],["皇帝影响力 +1","emperor"],
 ["贝尼·杰瑟里特影响力 +1","sisterhood"],["弗雷曼人影响力 +1","fremen"]
]);
function mountCounterDies(){
 if(document.getElementById("counter-dies"))return;
 const gradients=Object.entries(tokenGradients).map(([name,colors])=>`<linearGradient id="ink-${name}" x1="0" y1="0" x2=".7" y2="1">${colors.map((color,i)=>`<stop offset="${i/2}" stop-color="${color}"/>`).join("")}</linearGradient>`).join("");
 const symbols=Object.entries(counterDies).map(([key,die])=>`<symbol id="die-${key}" viewBox="0 0 64 64">${die}</symbol>`).join("");
 document.body.insertAdjacentHTML("afterbegin",`<svg id="counter-dies" width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute;pointer-events:none"><defs>${gradients}${symbols}</defs></svg>`)
}
function componentToken(type,quantity=1,faction="any"){
 const numbersInside=type==="spice"||type==="solari";
 const repeatable=["water","troop","intrigue","spy","vp"].includes(type);
 const repeat=repeatable&&Number.isInteger(quantity)&&quantity>=1&&quantity<=3?quantity:1;
 const die=Object.hasOwn(counterDies,type)?`<use href="#die-${type}"/>`:
   `<path d="m32 3 24 14v30L32 61 8 47V17Z" fill="#25201d" stroke="#d3b378" stroke-width="2"/><svg x="14" y="14" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f1d6a3" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round">${paths[type]||paths.other}</svg>`;
 const middle=numbersInside?`<text x="32" y="33" dominant-baseline="central" text-anchor="middle" class="counter-value ${type}">${quantity}</text>`:"";
 const extra=type==="influence"?factionMarks[faction]:"";
 const badge=!numbersInside&&repeat===1&&quantity>1?`<rect x="36" y="40" width="28" height="22" rx="4" fill="#201b15" stroke="#e9cea1"/><text x="50" y="56" text-anchor="middle" fill="#fff3d8" font-size="16" font-weight="bold">${quantity}</text>`:"";
 const svg=`<svg class="counter ${type}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${die}${extra}${middle}${badge}</svg>`;
 return svg.repeat(repeat)
}
function rewardDescription(item){
 if(item.text)return item.text+(item.qty>1?" ×"+item.qty:"");
 return `${LABELS[item.type]||"效果"} ×${item.qty??1}`
}
// Recognise only complete, unambiguous effects. Free-form custom rules retain their wording.
const resourcesByName={"香料":"spice","帝国索":"solari","水":"water","胜利点":"vp"};
function paymentDiagram(item){
 if(item.type!=="trade"||item.qty!==1)return "";
 const match=/^可(?:付|弃) (\d+) (香料|帝国索|水)换 (\d+) (胜利点|香料)$/.exec(item.text||"");
 if(match)return `${componentToken(resourcesByName[match[2]],Number(match[1]))}<b class="pay-arrow">➜</b>${componentToken(resourcesByName[match[4]],Number(match[3]))}`;
 if(item.text==="可召回 2 名间谍换 1 胜利点")return `${componentToken("spy",2)}<span class="recall-signal">↥</span><b class="pay-arrow">➜</b>${componentToken("vp")}`;
 return ""
}
function rewardChip(item){
 const desc=esc(rewardDescription(item)),q=item.qty??1;
 const trade=paymentDiagram(item);
 let content;
 if(trade)content=trade;
 else if(item.type==="influence"&&item.text==="选两个不同派系，各 +1 影响力"&&q===1){
   content=`<small class="token-caption">任选两个不同派系</small><span class="faction-options">${["emperor","guild","sisterhood","fremen"].map(f=>componentToken("influence",1,f)).join("")}</span>`
 }else{
   const faction=factionsByEffect.get(item.text);
   const chips=componentToken(item.type,q,faction||"any");
   const isKnownControl=item.type==="control"&&["控制厄拉科恩","控制帝国盆地","控制香料精炼厂"].includes(item.text);
   const caption=item.text&&!(item.type==="influence"&&faction)&&!isKnownControl?item.text:"";
   content=chips+(caption?`<small class="token-caption">${esc(caption.length<=15?caption:LABELS[item.type]||"特殊效果")}</small>`:"")
 }
 const cls=trade?" exchange":content.includes("token-caption")?" captioned":"";
 return `<span class="printed-reward${cls}" role="img" aria-label="${desc}" title="${desc}">${content}</span>`
}
const badgeShapes={
 mouse:'<path d="M6 48q8 5 20-5c-6-5-4-14 3-18-1-7-3-17 0-19 5 2 7 10 7 16 2-7 5-14 9-15 2 6-2 14-6 19 3 3 7 6 10 11l-7 3-2 8 7 4-10 1-6-6-5 5h-8l8-5c-9 6-17 9-23 3z"/>',
 blade:'<path d="M8 51 21 39l-2-3 3-3 4 3C34 24 44 15 57 7c-5 14-15 29-28 34l2 4-3 2-3-4-14 11z"/>',
 thopter:'<path d="m6 42 20-9 26-24-18 24 23-17-17 19 19-12-18 16 9-3-9 8-11-4-14 4-8 1 12-6-10 2Zm25 0 14 10-2 2-16-11z"/>',
 wild:'<text x="32" y="51" font-family="Arial,sans-serif" font-size="53" font-weight="bold" text-anchor="middle">?</text>'
};
function printedRank(items,i){
 const controls=items.filter(x=>x.type==="control"),others=items.filter(x=>x.type!=="control");
 const separate=controls.length&&others.length&&!others.some(item=>paymentDiagram(item));
 return `<section class="reward-field place-${i+1}" aria-label="${rankNames[i]}"><span class="place-flag" aria-hidden="true">${i+1}<sup>${["st","nd","rd"][i]}</sup></span>
 <div class="print-items">${separate?`<div class="control-line">${controls.map(rewardChip).join("")}</div>`:""}${(separate?others:items).map(rewardChip).join("")||'<span class="token-caption">无奖励</span>'}</div></section>`
}
function cardFace(card,n){
 mountCounterDies();
 const rule=CORNER_RULES[card.corner],name=card.name||"未命名冲突";
 const battle=Object.hasOwn(badgeShapes,card.battle)?card.battle:"wild";
 const title=card.en?.startsWith("Skirmish (")?"小规模冲突":name;
 const worm=card.noWorm?"本场禁用沙虫":card.location?"护盾墙在场时禁虫":"可召唤沙虫";
 const details=ranks.map((key,i)=>`<p><b>${rankNames[i]}</b>　${card[key].map(rewardDescription).map(esc).join("、")||"无奖励"}</p>`).join("");
 return `<article class="printed-card" aria-label="${esc(name)}"><div class="conflict-stock ${card.location?"location-stock":""}">
 <h3 class="title-rail ${title.length>17?"long-title":""}">${esc(title)}</h3>
 <div class="print-fields">${ranks.map((k,i)=>printedRank(card[k],i)).join("")}</div>
 <div class="corner-badges">${rule?`<span class="ability-tab" role="img" title="${esc(rule.name)}" aria-label="${esc(rule.name)}">${icon(card.corner,25)}</span>`:""}<span class="battle-tab ${battle}" role="img" aria-label="${esc(BATTLES[battle])}" title="${esc(BATTLES[battle])}"><svg viewBox="0 0 64 64" aria-hidden="true">${badgeShapes[battle]}</svg></span></div>
 ${card.noWorm||card.location?`<span class="worm-ban" role="img" aria-label="${worm}" title="${worm}">${icon("worm",32)}</span>`:'<span class="set-pip" aria-hidden="true"></span>'}</div>
 <div class="stock-key"><span>冲突 ${rom[card.tier]} · ${esc(BATTLES[battle])}</span><span>${worm}</span></div>
 ${rule?`<p class="printed-note"><b>${icon(card.corner,16)} ${rule.name}</b>　${esc(rule.text)}</p>`:""}
 ${card.note?`<p class="printed-note">${esc(card.note)}</p>`:""}
 ${n===3?`<p class="printed-note muted">${card.thirdInThree?"本牌三人局也发第三档。":"三人局仅在并列第二时发第三档。"}</p>`:""}
 <details class="print-key"><summary>奖励释义</summary>${details}</details></article>`
}

