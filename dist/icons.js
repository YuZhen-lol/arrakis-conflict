// Shared line icon catalogue used in navigation, reward rows and the card editor.
const paths = {
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',
  swords:'<path d="m3 3 5 2 11 12-2 2L5 8zM21 3l-5 2-4 5m-2 3-5 5m2 2 5-5M3 16l5 5m8-1 5-5M3 21l2-2m14 0 2 2"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  book:'<path d="M12 6c-4-3-7-3-10-2v14c4-1 7-1 10 2 3-3 6-3 10-2V4c-3-1-6-1-10 2v14"/>',
  plus:'<path d="M12 4v16M4 12h16"/>', check:'<path d="m5 12 4 4 10-10"/>',
  pencil:'<path d="m3 21 5-1L21 7l-4-4L4 16zM14 6l4 4"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M2 20v-2c0-6 14-6 14 0v2M17 5c4 0 4 6 0 6m1 3c4 0 4 4 4 5"/>',
  stack:'<rect x="7" y="5" width="13" height="16" rx="2"/><path d="M4 16V3h12"/>',
  history:'<path d="M3 11a9 9 0 1 1 2 7M3 5v6h6m3-4v5l3 2"/>',
  close:'<path d="m5 5 14 14M19 5 5 19"/>', play:'<path d="m7 4 13 8-13 8z"/>',
  settings:'<path d="M3 7h8m5 0h5M3 17h3m5 0h10"/><circle cx="13" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  flag:'<path d="M4 21V3c5-3 10 4 16 0v11c-6 4-10-3-16 0"/>',
  spice:'<path d="m3 19 1-8 5-5 2 9 3-12 6 6 1 10-9 2zM9 6l-2 11m7-14 2 12"/>',
  water:'<path d="M12 2c-2 5-7 9-7 13a7 7 0 0 0 14 0c0-4-5-8-7-13Z"/><path d="M8 15c0 2 1 3 3 3"/>',
  solari:'<circle cx="12" cy="12" r="9"/><path d="M15 8H10l-2 4h8l-2 4H9m3-11v3m0 8v3"/>',
  vp:'<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>',
  troop:'<path d="m12 2 9 5v10l-9 5-9-5V7l9-5zm-9 5 9 5 9-5m-9 5v10"/>',
  intrigue:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M7 12c3-5 7-5 10 0-3 5-7 5-10 0z"/><circle cx="12" cy="12" r="1"/>',
  influence:'<path d="m2 13 5 1 5-9 5 9 5-1-3 7H5z"/>',
  spy:'<path d="M2 12c6-9 14-9 20 0-6 9-14 9-20 0Z"/><circle cx="12" cy="12" r="3"/>',
  control:'<path d="M4 21V3l15 3-4 3 4 4-15-2"/>',
  agent:'<circle cx="12" cy="7" r="4"/><path d="m4 21 2-7 6 3 6-3 2 7z"/>',
  trade:'<path d="M3 7h17l-4-4m5 14H4l4 4"/>', trash:'<path d="M3 6h18M9 3h6m-10 3 2 15h10l2-15M10 10v7m4-7v7"/>',
  draw:'<path d="M3 16V3h12"/><rect x="7" y="6" width="13" height="15" rx="1"/><path d="M10 14h7m-3-3 3 3-3 3"/>',
  choice:'<path d="M12 21v-8L5 6m7 7 7-7M3 11V4h7m4 0h7v7"/>',
  remainder:'<path d="m3 12 9 5 9-5M3 7l9 5 9-5M3 17l9 5 9-5"/>',
  purge:'<path d="M2 12c6-9 14-9 20 0-6 9-14 9-20 0Zm1 9L21 3"/>',
  cities:'<path d="M2 20V9h5v11m0-12 5-6 5 6v12m0-10h5v10M1 21h22M10 21v-6h4v6"/>',
  other:'<path d="m12 2 9 10-9 10-9-10z"/>',
  mouse:'<path d="M5 16c1-7 8-9 12-4l4 4-5 3H9c-5 0-8-2-7-5"/><circle cx="14" cy="8" r="3"/>',
  blade:'<path d="m4 21 6-7m-4 0 5 4m-3-5C11 8 16 5 22 2c-3 8-7 12-12 14z"/>',
  thopter:'<path d="m12 11 1-6 1 6-1 9zM12 11 2 4l2 6 8 3m2-2 9-7-2 6-7 3m-2 1-9 4 5 1 4-3m2-2 8 4-4 1-4-3"/>',
  worm:'<path d="M2 18c5-1 2-12 10-14 6-1 10 2 10 6a5 5 0 0 1-10 0m-9 9 11 1m1-13 4 5m-1-6-2 6"/>',
  retreat:'<path d="M20 19v-5a6 6 0 0 0-6-6H4m5-5L4 8l5 5"/>',
  bidding:'<path d="m3 13 6-6 7 7-6 6zM12 9l6-6m-1 6 4-4M15 21h7"/>',
  lookout:'<path d="m5 21 4-14h6l4 14M7 17h10M6 7V3m6 4V2m6 5V3M5 7h14"/>',
  reserves:'<path d="M5 21V4l14 3-3 4-11-1m8 8h8m-4-4v8"/>',
  waterpact:'<path d="M8 3C6 7 2 11 2 14a6 6 0 0 0 12 0c0-3-4-7-6-11Zm9 3c-1 3-3 5-3 8a4 4 0 0 0 8 0c0-3-3-6-5-8Z"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M3 16v5h18v-5"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m15 8-2 6-5 2 2-6z"/>'
};
const LABELS = {spice:"香料",water:"水",solari:"帝国索",vp:"胜利点",troop:"招募部队",intrigue:"阴谋牌",influence:"任意派系影响力",spy:"部署间谍",control:"地点控制权",agent:"特使",trade:"支付换取奖励",trash:"移除卡牌",draw:"抽牌",choice:"二选一",remainder:"剩余奖励",purge:"清空间谍",cities:"三地控制权",other:"自定效果"};
const BATTLES = {blade:"晶牙匕",mouse:"沙漠鼠",thopter:"扑翼机"};
const icon=(key,size=20)=>`<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[key]||paths.other}</svg>`;
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const rom=["","I","II","III"];

