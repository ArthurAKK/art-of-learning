# NOTES — 教学偏好与工作笔记（The Art of Learning）

## 用户偏好
- **语言**：中英对照。讲解中文为主；Waitzkin 术语（entity/incremental、Investment in Loss、Soft Zone…）
  与原文引用保留英文。
- **节奏**：每课短、手机上可完成、必须有即时反馈（测验 / 分类练习）。
- **应用领域**：四个全要——职场硬技能、身体技艺/运动、临场发挥/抗压、教别人（孩子/团队）。
  例子四场景轮转，直到用户指定主战场。
- **零基础**：从心智模型搭起，不堆术语。

## 状态：20 / 20 全部交付
全部 20 课已写完并接入导航（`index.html` / `map.html` / `glossary.html`）。
链接与 quiz/sorter JSON 全部校验通过（校验脚本思路见本文件末尾）。

| 模块 | 课 | 文件 |
|---|---|---|
| 韧性 | 1–5 | `0001-process-before-results` … `0005-the-internal-solution` |
| 巅峰表现 | 6–10 | `0006-the-power-of-presence` … `0010-building-your-trigger` |
| 内省的艺术 | 11–15 | `0011-listening-first` … `0015-the-middle-way` |
| 高阶学习 | 16–20 | `0016-master-the-fundamentals` … `0020-bringing-it-all-together` |

## 待办 / 下次开课要点
- [ ] **追问主战场技能**（最高优先级，一直没拿到）：用户四个领域全选，
      但从没说具体在练什么。20 课的例子目前四场景轮转。
      **一旦拿到，值得把全部例子/练习重写成用户自己的战场**——每课的「ask」区块都留了这个钩子。
- [x] 2026-10-19：第 1 课原档遗失，已依本文件与各课互引重写（quiz 答案已打散）；
      全站中文做过一轮深度润色（去翻译腔、减粗体）。
- [ ] 确认是否愿意加入社群（影响 RESOURCES 的 Wisdom 部分）。
- [ ] 尚无技能掌握证据：用户还没做过任何练习，也没反馈过任何一课。
      下次开场应先问第 5/10/15 课末尾那三组「模块自查五问」的答案。

## 课程骨架（Waitzkin 基金会官方结构，4 模块 × 5 概念）
来源：<https://theartoflearningproject.org/resources/>
⚠️ 2026-10 起官方网域已停放（跳 /lander），课内链接一律改用 Wayback：`https://web.archive.org/web/2026/<原网址>`。
- **Resilience**：Value Process Before Results ｜ Investment in Loss ｜ Beginner's Mind ｜
  Using Adversity ｜ The Internal Solution
- **Peak Performance**：The Power of Presence ｜ The Soft Zone ｜ The Downward Spiral ｜
  Stress and Recovery ｜ Building Your Trigger
- **Art of Introspection**：Listening First ｜ Loving the Game ｜ Breaking Down Walls ｜
  Intuition ｜ The Middle Way
- **Advanced Learning**：Master the Fundamentals ｜ Learning the Macro From the Micro ｜
  Making Smaller Circles ｜ Numbers to Leave Numbers ｜ Bringing it All Together

顺序说明：官方就是「从最基础到最进阶」排的，且用户的卡点正在 Resilience 开头 → 按序走，不跳。

## 官方 concept page 的真实 URL（slug 与概念名不一致，别猜）
原 sitemap 已失效；改查 Wayback 存档。
几个不直觉的：
- Soft Zone → `peak-performance/enter-the-soft-zone/`
- Downward Spiral → `peak-performance/avoid-the-downward-spiral/`
- Building Your Trigger → `peak-performance/build-your-trigger/`（不是 building-）
- Listening First → `art-of-introspection/listen-first/`
- Loving the Game → `art-of-introspection/love-the-game/`
- Intuition → `art-of-introspection/develop-the-internal-compass/`
- The Middle Way → `art-of-introspection/the-middle-way/`
- Making Smaller Circles → `advanced-learning/make-smaller-circles/`

抓正文的办法（比 WebFetch 便宜、且拿到逐字原文与页码）：curl + 正则剥 `<main>`，
再按 `Leave a Reply` / `comments` 截断评论区。

## 各课引用的原书页码（均经官方 concept page 溯源，勿凭记忆改）
1: p.33, p.38 ｜ 2: p.47, p.33 ｜ 3: pp.79–80, p.96, pp.107–108 ｜ 4: p.54, p.60 ｜ 5: p.211
6: p.172 ｜ 7: p.54 ｜ 8: p.63, p.66, p.172 ｜ 9: pp.180,182, p.184 ｜ 10: p.187, p.190
11: p.10, p.80 ｜ 12: p.43, p.47, p.80 ｜ 13: p.76, pp.107–108 ｜ 14: p.137, p.142 ｜ 15: p.88
16: pp.34–35, pp.117–118, p.123 ｜ 17: p.116 ｜ 18: pp.119–122 ｜ 19: p.74, p.136, p.231 ｜ 20: p.225, p.262

## 组件 / Assets
- `assets/style.css` — 共享样式（Tufte 风；靛蓝 `--accent` + 胡桃 `--accent-2`）。
- `assets/quiz.js` — 4 选 1 即时反馈测验。用法：`<div class="quiz" data-quiz='[…JSON…]'></div>`。
  题数不限（第 20 课用了 8 题）。
- `assets/sorter.js` — 两桶分类练习。用法：`<div class="sorter" data-sorter='{"buckets":[…],"items":[…]}'></div>`。
- 新的可复用件先进 `assets/`，再由课程链接。不要在课里内联会被复用的代码。

### ⚠️ data-* 属性里写 JSON 的坑
属性用单引号包裹 → **JSON 内不能出现 `'`**。英文撇号一律写 `&#39;`（HTML 先解码，
JSON.parse 拿到的是真撇号，没问题）。`<` `>` 写 `&lt;` `&gt;`。中文引号用「」不会出问题。
**每次改完跑一遍校验**：抽出所有 `data-quiz` / `data-sorter` 属性 → `html.unescape` → `json.loads`。

## 教学法备忘
- 重 storage strength：提取练习、间隔、跨模块交错。第 20 课是唯一一次跨全课程提取（8 题）。
- quiz / sorter 选项保持等长，不靠格式泄题。
- **答案位置必须打散**：quiz 的 `answer` 和 sorter 的 `b` 序列都不能有可识别规律
  （尤其别全 0、别 0/1 交替）。校验脚本会把两个序列打印出来，扫一眼即可。
- 每课引一处**原书页码**（经官方 concept page 溯源），保持可信度。
- 版权：原文引用一课不超过一处、极短、带出处；其余一律改写。
- **课与课之间显式互引**：每课的分类练习和 callout 里都指向前后课（「这是第 X 课的 ______」）。
  这是交错练习，也是让 20 课变成一个系统而不是 20 篇文章的关键。
- **每课固定结构**：win 横幅 → 接上一课 → 知识 → 误读拆除 → 分类练习（8 题）→
  技能练习（reveal）→ 检验（4 题）→ 本周行动 → source → 下一课 → ask。
- **每课必须有一个可带走的产出物**（锚点、断链动作、三个子……），并被后面的课调用。
  产出物清单见 `reference/map.html` 每条下的橙色小字。

## 发布 / 运维（手机学习）
- 本地：`/Users/arthurkwan/Claude/Teach-ArtOfLearning`（与影响力课程 `/Users/arthurkwan/Claude/Teach` 平级、互不干扰）。
- 已发布（2026-10-19）：仓库 <https://github.com/ArthurAKK/art-of-learning>，
  GitHub Pages：<https://arthurakk.github.io/art-of-learning/>。`gh` 已用 keyring 登入，直接 `git push` 即更新。
- 影响力课程的发布方式可照搬：一次性 PAT 临时推送，token 只出现在内存中的单条命令、**不写入任何文件**，
  用完提醒去 <https://github.com/settings/tokens> 撤销。
- ⚠️ 成本教训（沿用自影响力课程）：GateGuard 钩子让每次写文件都要先陈述事实，来回翻倍。
  **建议以 `ECC_GATEGUARD=off` 启动教学会话**，并一次多出几课、减少来回。

## 统一用语（2026-10 润色后）
专家架子（原「专家壳」）· 看台（原「旁观席」）· 开关（原「扳机」）· 把指导换成问题（原「读取问题」）· 模块收尾（原「收口」）。
第 1 课归因改写为三步：听出判决词 → 找到动作（提取）→ 定下一次。第 19 课 sorter 桶改为「有数打底 / 从没进去过」。
