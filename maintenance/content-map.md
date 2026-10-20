# 用户文档的内容依据

维护正文时记录“用户要解决的问题”，再查产品预期和当前入口。产品 behavior 的理由用于解释选择；.spec 用于定位职责和边界；实际代码用于核实入口和副作用。不能把实现细节、历史设计或未接通的预期直接搬进正文。

本轮参照产品提交 `2889591121bcab204322c60b78aab5b69896d1b1`（2026-10-20 dev）。后续变更应以当时的实际版本重新核对，表格是查证入口，不是永久功能快照。代码核对不等于真人使用验收。

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
