# 沙丘：帝国起义 · 战斗牌桌

三至四人的《沙丘：帝国起义》实体桌游辅助网页，收录 16 张原版冲突牌、12 张「沙海异闻」原创冲突牌和 5 种额外规则角标。卡牌由数据和矢量图标绘制。

## 使用

[打开 GitHub Pages 战斗牌桌](https://yuzhen-lol.github.io/arrakis-conflict-pages/) · [提交反馈](https://github.com/YuZhen-lol/arrakis-conflict-pages/issues/new)

下载 [Arrakis-Table.html](Arrakis-Table.html)，用浏览器打开即可离线游玩。选择牌包和玩家人数，开始战局后逐轮揭牌、登记胜者。可在制牌页面保存自定义牌，在「管理」中分配牌包或导出单张卡牌 JSON。战局和自制牌保存在当前浏览器。

## 源码

网页入口为 [dist/index.html](dist/index.html)。修改后可直接用浏览器打开该文件，或在项目根目录运行 `python -m http.server 8000 --directory dist`，访问本机的 8000 端口。

- [完整卡牌数据](dist/conflict-cards.json)
- [卡面绘制](dist/card-face.js) 和 [牌面样式](dist/card-face.css)
- [原版冲突牌图鉴](https://dunecardshub.com/uprising/conflicts) 和 [官方规则书](https://dwd-web.s3.us-west-2.amazonaws.com/pdfs/DUNE_IMPERIUM_UPRISING_Main_Rulebook_23-10-12.pdf)

本项目为玩家制作。「沙海异闻」使用自制规则。
