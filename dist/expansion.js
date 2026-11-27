// 沙海异闻 · 原创冲突牌包。数值奖励沿用起义的沙虫规则。
window.CORNER_RULES = {
  retreat: {name:"有序撤离", text:"战斗奖励发完后，各家将自己仍在冲突区的部队的一半（向下取整）放回驻军，其余照常回供应区。沙虫照常归还。"},
  bidding: {name:"香料悬赏", text:"打出战斗阴谋牌前，所有有单位参战的玩家同时暗握 0 至 2 个香料并揭示。每支付 1 香料，本场 +2 战力。随后照常进行战斗。"},
  lookout: {name:"前哨信号", text:"进入战斗阶段时，从起始玩家起顺时针，每位有单位参战的玩家可召回自己的 1 名间谍，本场 +3 战力。每人限一次。"},
  reserves: {name:"最后援军", text:"打出战斗阴谋牌前，记录此刻所有战力大于 0 的玩家。仅其中战力最低者（含并列）可从驻军增派 1 支部队，各人同时决定。至少须有两人参战。"},
  waterpact: {name:"水之盟约", text:"发完奖励后，若至少两人战力大于 0，其中战力最高者（含并列）可各向一名参战对手赠送自己的 1 水，以获得 1 点任意派系影响力。由起始玩家顺时针各执行至多一次。"}
};
const reward = (type, qty=1, text) => ({type,qty,...(text?{text}:{})});
const E = (id,name,en,tier,battle,corner,first,second,third,note="",extra={}) => ({
  id:"myth-"+id,name,en,tier,battle,corner,noWorm:false,location:null,first,second,third,note,pack:"myth",...extra
});
const r = reward;
window.EXPANSION_CARDS = [
  E("last","末席盛宴","The Last Banquet",1,"mouse",null,[r("solari")],[r("spice",2)],[r("vp")],
    "本牌特例：三人局也发第三档。仅战力大于 0 者有资格领奖。并列照常降档。唯一胜者仍拿牌并检查图标。",{thirdInThree:true,noWorm:true}),
  E("courier","失踪的信使","The Lost Courier",1,"thopter","lookout",[r("intrigue"),r("spy")],[r("water")],[r("solari",2)]),
  E("ransom","香料赎金","A Price in Spice",2,"blade","bidding",[r("vp"),r("solari",2)],[r("spice",2)],[r("water")]),
  E("split","双封遗嘱","The Divided Bequest",2,"mouse",null,[r("choice",1,"先选一封遗嘱")],[r("remainder",1,"领取余下的一封")],[r("troop",2)],
    "金封为 1 胜利点，蓝封为 2 水和 1 阴谋。唯一胜者先选一封，独占第二档者得另一封。并列第一时每人改领 2 香料。并列第二照常领第三档。沙虫仅翻倍所得封内物资或分数。"),
  E("purge","静默哨站","Silent Outposts",2,"thopter","retreat",[r("purge",1,"撤回所有对手的间谍")],[r("spy"),r("intrigue")],[r("spice")],
    "先将所有对手在观察站的间谍送回各自供应区，无召回收益。再按名次部署奖励间谍。清场只执行一次。"),
  E("cargo","弃舱协议","Jettison Protocol",2,"thopter","reserves",[r("vp"),r("trade",1,"可弃 1 水换 3 香料")],[r("water",2)],[r("intrigue")]),
  E("well","隐井分水","The Hidden Cistern",2,"mouse","waterpact",[r("water",3)],[r("influence"),r("water")],[r("troop",2)]),
  E("mask","假面拍卖","The Masked Auction",2,"blade","bidding",[r("choice",1,"1 胜利点 或 2 阴谋")],[r("solari",4)],[r("spy")],"有沙虫时先选一次，再将所选奖励翻倍。"),
  E("cities","三地易帜","Three Banners",3,"thopter",null,[r("cities",1,"接管三处关键地点")],[r("vp"),r("spice",2)],[r("intrigue"),r("water")],
    "唯一胜者同时控制厄拉科恩、香料精炼厂及帝国盆地。替换对手标记，已控制的地点保留。此次转移不触发防守部署或控制加成。",{noWorm:true}),
  E("echo","归队的幽灵","Ghosts of the Garrison",3,"blade","retreat",[r("vp",2)],[r("influence"),r("troop",3)],[r("spice",2)]),
  E("tithe","露水什一税","The Dew Tithe",3,"mouse","waterpact",[r("vp"),r("trade",1,"可付 2 水换 1 胜利点")],[r("water",2),r("intrigue")],[r("influence")]),
  E("eyes","沙海千眼","Eyes of the Erg",3,"thopter","lookout",[r("vp"),r("intrigue",2)],[r("spy",2),r("spice",2)],[r("water",2)])
];
