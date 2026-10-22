# 用户文档的内容依据

维护正文时记录“用户要解决的问题”，再查产品预期和当前入口。产品 behavior 的理由用于解释选择；.spec 用于定位职责和边界；实际代码用于核实入口和副作用。不能把实现细节、历史设计或未接通的预期直接搬进正文。

本轮参照产品提交 `2889591121bcab204322c60b78aab5b69896d1b1`（2026-10-20 dev）。后续变更应以当时的实际版本重新核对，表格是查证入口，不是永久功能快照。代码核对不等于真人使用验收。

第三轮另用官方发布的 Beta `0.2.57-beta.125.1` 独立原生副本走查。发布包与 dev 源码有差异时，具体入口采用原生窗口的实际文案，设计边界仍保留查证入口；不把尚未发布的修复当作全量用户现状。

实测结果：会议记录生成、文件打开、同一会话修改同一文件已完成；项目现有目录添加与目录核对已完成；三张阅读卡已实际读出资料表并逐项对照，确认后在同一任务生成并打开组会提纲。助理只核对介绍、命名和运行位置页面，未为文档验收新开常驻助理，派活、记忆和跨设备接力仍按源码/预期核对，不声称全链实测。

实测修正：桌面入口为「项目 → 新建会话」、项目空选为「未选择项目」、添加项目有三个入口；Git 仓库中的子目录可能升为仓库根目录，已写明发送前查路径及独立练习目录。服务不可用、积分不足、文件写出后容量不足均真实遇到，恢复条目以这些可观察情况编写。

## 按用户问题查证

下表路径来自 `nmhjklnm/gugu`。`behavior/` 为产品预期，`.spec/project/` 为模块合同。实现列的 `features/`、`localization/` 相对 `apps/desktop/src/session/renderer/`，`components/`、`hooks/`、`store/` 相对 `apps/desktop/src/`，`electron/` 相对 `apps/desktop/`。其他只写文件名的入口可先用仓库搜索定位。

本轮重点读过归档、消息回退、话题、模式、App 退出和常驻页面的实现；其余行提供维护时的复查入口。表中不把设计预期、读源码和产品实测混为同一种证据。

| 用户问题与正文 | 产品依据 | 当前实现的查证入口 |
|---|---|---|
| 第一次任务是否必须建项目：quickstart、concepts | behavior/session-page-flows.md；behavior/assistant-app.md | localization/messages-session-workflows.ts 中 task.projectSkip；features/sessions/new-session-page |
| 新建与分叉何时开始执行：tasks | behavior/session-resume.md；.spec/project/apps/desktop-host/agent-runtime/session-initial-status/spec.md | session/shared/core/sessions/initial-agent-status.ts |
| Agent、模型、设备是不是一回事：concepts、agents、models | behavior/model-access.md；behavior/session-page-comm.md | features/sessions/session-config/harness-model-field.tsx；session-config |
| 标题与点名用的名字：concepts | .spec/project/apps/desktop-host/session-addressing-identity/spec.md | electron/unified-session-message.ts；session-title-utils.ts |
| 需要厂商账号吗：models、quickstart | .spec/project/apps/task-application/task-packages/task-plugins/harness-vendor-account/spec.md | session-config/harness-model-field.tsx；harness-model-catalog.ts |
| 通用与编程怎么选：tasks | behavior/session-page-comm.md | localization/messages-session-workflows.ts 中 taskConfig.sessionView* |
| 重开任务怎么继续：tasks、troubleshooting | .spec/project/apps/desktop-host/agent-runtime/session-history-replay/spec.md | features/sessions/acp/acp-chat-store.ts；runtime/codex-app-server-acp.mjs |
| 编辑旧任务消息会不会恢复文件：tasks、troubleshooting | behavior/session-page-comm.md 的消息编辑段 | features/sessions/acp/acp-chat-store.ts 中 canRevertMessage、sendMessageEdit、revertMessage |
| 侧边任务是否保留：tasks | behavior/session-resume.md | features/sessions/acp/side-chat-tab-provider.tsx 中 isPersistent；codex-app-server-acp.mjs 的 ephemeralFork |
| 归档会不会停执行：tasks、troubleshooting | behavior/session-page-flows.md；当前归档确认文案 | electron/session/main/core/sessions/archiveSession.ts 中 archiveOne：先 stopSessionRuntime 再记录归档 |
| 并排与拆开的效果：tasks | behavior/session-page.md 的并排段 | features/tabs/pane-store.ts；pane-layout-store.ts；pane-pair.test.ts 供定位场景 |
| 临时任务和长期项目怎么选：concepts、guides | behavior/assistant-app.md；behavior/projects.md | features/projects；features/sessions/new-session-page |
| 跨设备项目是否同步文件：projects、devices | behavior/projects.md；behavior/gugu-server-multi-device.md | features/projects/stores/project-manager.ts |
| 摘除文件夹是否删内容：projects | behavior/projects.md 的摘除目录段 | features/projects/stores/project-manager.ts；当前摘除与归档流程 |
| 群里只 @ A，B 会收到任务吗：groups | behavior/group-routing.md | messaging/composer；store/chatOutboxWiring.ts；投递域代码 |
| 话题可见与参与通知：chat、groups | behavior/topics.md | hooks/useTopicSurface.ts；components/chat/TopicSplitPane.tsx；messageActionItems.ts |
| 为什么 Agent 统一变被动：groups、troubleshooting | behavior/topics.md 的数量阈值段 | components/chat/MemberListPanel.tsx；话题与群的响应档位逻辑 |
| 关页签、退出与停用的区别：apps、troubleshooting | behavior/tab-extensions.md | features/extensions/app-dock.ts；installed-extensions-store.ts |
| App 挪动是否重建、哪些页面每任务独立：apps | behavior/tab-extensions.md | features/extensions/extension-view-store.ts 的 app / chat / session page identity |
| App 更新是否恢复已撤权限：apps | behavior/tab-extensions.md 的装与卸、自动更新段 | 扩展安装授权、升级及 permissions 数据路径；发布前按目标 App 实测 |
| 切换订阅为何不改变旧会话：models | behavior/subscriptions.md | 设置订阅连接与会话配置各自的连接绑定 |
| 助理派任务、问题卡如何答：assistant、guides/assistant-follow-up | behavior/assistant-app.md | features/assistant；agent-question-store.ts；右侧任务聊天与提问流程 |
| Android 分享后是否直接发送：chat | behavior/share-with-apps.md | 原生分享接收与聊天草稿流程 |
| 系统权限、App 授权与服务账号怎么区分：integrations | behavior/system-permissions.md；behavior/integrations.md；behavior/tab-extensions.md | 设置权限、资源库集成与 App 管理各自入口 |

正文中的安装器地址另核对 scripts/gugu-server/install.sh；官网安装脚本只作为可验证链接，不从第三方复制安装命令。

## 不能直接当教程的材料

- behavior/session-resume.md 开头仍写“咕咕自己不留对话正文”；较新的 session-history-replay spec 和当前 acp-chat-store 已描述本机历史。用户文档只写可见的继续与恢复，不采用过时的存储解释，也不在本轮修改产品行为文件。
- behavior 中标注“草稿”“待 owner 认”“未裁决”的条目，不作为已交付承诺。先查目标版本实现与用户确认记录。
- 普通群聊消息的编辑入口仍可能为禁用占位；任务通用聊天的原地编辑是另一条实现路径。正文只在任务上下文说明可用条件，不混为全局功能。
- .spec 的性能目标、内部计数器、传输协议和工程沿革不进入用户正文。离线、失败、缺权限等有可观察影响的边界才转成帮助条目。
- 官网动画只用于展示界面和操作顺序；视频时长、虚构人物和示例结果不能证明真实任务能在相同时间完成。

## 编辑与验证

教程须给输入、步骤、每步可见结果及最后检查点。操作指南按一个真实目标组织，参考页保留必要区别与后果；概念说明解释关系，不重复菜单目录。

更新前先查本表中对应产品资料，再核对当前代码。更新后运行 Mintlify 构建和内链检查，查看桌面、手机以及相关媒体。涉及新的用户任务路径，应另做匹配版本的产品走查；页面渲染通过不能写成任务执行通过。

## 2026-10-21 补充核对

本次参照产品 dev `101e2d3f07c9dd126e5526bd2b4daa25df44b07d` 与市场索引 `a395ebe1eb6aff1d7d78af699f34f6971c3b9c56`。本轮是源码核对与文档页面渲染；不新增声称产品全链实测的结论。此前官方 Beta 的入门截图和操作证据保留，截图内的旧称呼与本轮正文「任务」命名区分。

| 正文 | 产品预期 / 合同 | 核对的实现或原文 |
| --- | --- | --- |
| agents、models、concepts | behavior/model-access.md；harness-vendor-account spec | packages/session-plugins/src/agents/registry.ts 与 impl/{codex,claude,qwen,copilot,opencode,hermes,mimocode,codebuddy,pi}；harness-model-field.tsx；platform-protocols.ts |
| tasks 与既有页面术语 | behavior/session-page.md、session-page-flows.md | features/tabs/pane-store.ts、pane-layout-store.ts；创建入口采用操作描述，不捏造已全面改名的按钮文本 |
| apps 的首启/预装/更新 | behavior/tab-extensions.md | extensions/first-run.ts、market.ts；gugu-apps README 的 firstRun 约束 |
| extensions、apps/manifest | gugu-extension skill；behavior/tab-extensions.md | extensions/authoring-guide.ts；manifest.ts 的 strict schema、API 下限、能力数、perSession；bridge-protocol.ts API=9 |
| extension-api | 产品内 App 指南（实际现有11篇专题） | authoring-guide.ts 各 EXTENSION_GUIDE 与 TOPICS；bridge-protocol.ts BRIDGE_VERBS；文件与 Agent 的各自范围 |
| apps/development | gugu-extension skill；App 沙箱合同 | app-csp.ts、app-csp.test.ts；authoring-guide.ts 的 app_check、页面存活、工具程序；安装确认路径 |
| apps/publishing、apps/policies、apps/maintenance | docs/publishing-an-extension.md；behavior/tab-extensions.md | gugu-apps README、scripts/add-version.mjs、verify.mjs、lib.mjs；apps/*.json；sources/paper-club/app、kanban/app、forum 的 manifest/README |
| forum、models 的社区积分区别 | behavior/forum.md | extensions/app-forum-core.ts；authoring-guide.ts apps-forum；gugu-apps sources/forum 的 manifest/README/页面 |
| resource-monitor、settings | .spec/project/apps/resource-monitor/spec.md | SettingsPage.tsx 的 InterfaceSettingsPage；ResourceMonitorSettingsCard.tsx；command-palette/resource-monitor-view.tsx；resource-monitor-store.ts |
| mobile、devices | behavior/mobile-session-view.md；gugu-server.md、gugu-server-multi-device.md | mobile/agent-watch/ProjectsPage.tsx（项目与机器同页分组）；SessionTimelinePage.tsx、opened-output-open.ts；mobile/phone-device/PhoneDeviceActionsPage.tsx；useMobileShell.ts；server install.sh |

App 贡献章节的组织参照 Obsidian 官方 developer-docs：Build a plugin、Manifest、Submit your plugin、Plugin guidelines、Developer policies 与 Submission requirements for plugins。已读取其官方仓库原文，只采用起步到维护的组织顺序；没有移植其发布资产、提交入口或审核承诺。

PR #2 的有效结构并入 extensions 和 extension-api：外置脚本、完整最小示例、主题、隔离、网络、授权和错误可见。旧 API 1、taskId、切页重载、无 Agent 控制等已以当前接口重写。当前 authoring-guide 仍有“禁止远程图片/字体”旧句，实际 app-csp.ts 及测试允许已声明域名；本轮采用实际 CSP，并将这个冲突报告维护者。skill 的“八篇”也已落后于11篇实际专题。

公开章节不要求外部作者访问私有产品仓。必要契约在正文给出，完整运行时指引可通过产品 guide_read 取得；公开索引仓与示例提供可访问的源码入口。未查到独立开发者政策、审核时限或申诉制度，不从其他平台补造要求。

## 自己部署（self-hosting）

| 用户问题与正文 | 依据 | 查证入口与证据 |
|---|---|---|
| 不用官方服务，能不能自己部署：self-hosting | OpenDCAI/gugu-supabase 的 docs/self-hosting.md、self-hosting-smtp.md、self-hosting-free-plan.md（gugu-supabase#12 合入 dev） | scripts/setup.mjs；客户端 README 与 scripts/dev-app.sh |

2026-10-22 在一个新的 Supabase 免费项目上从零实测：setup 安装、两个账号验证码登录、加好友、建群、消息实时到达、附件上传下载、本机 Claude Code 任务。验证码登录测试时用临时发信钩子读取验证码，真实 SMTP 投递未实测。「免费版自带发信改不了模板」来自 Supabase 后台提示与接口返回，免费版数字来自 supabase.com/pricing。

## 英文版（en/）

`en/` 逐页对照中文正文（31 篇），`docs.json` 用 `navigation.languages`：中文 `zh` 为默认、地址不变，英文页在 `/en/...`。中文页改动后同步改对应英文页。界面名称取客户端英文文案（`i18n/locales/en-US/` 与 `localization/`），术语见 [glossary-en.md](glossary-en.md)。截图与视频沿用中文素材，英文页注明界面为中文。英文稿上线前由 owner 或 shuxue 审阅。
