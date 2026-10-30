# 用户文档的内容依据

维护正文时记录“用户要解决的问题”，再查产品预期和当前入口。产品 behavior 的理由用于解释选择；.spec 用于定位职责和边界；实际代码用于核实入口和副作用。不能把实现细节、历史设计或未接通的预期直接搬进正文。

本轮参照产品提交 `2889591121bcab204322c60b78aab5b69896d1b1`（2026-10-20 dev）。后续变更应以当时的实际版本重新核对，表格是查证入口，不是永久功能快照。代码核对不等于真人使用验收。

第三轮另用官方发布的 Beta `0.2.57-beta.125.1` 独立原生副本走查。发布包与 dev 源码有差异时，具体入口采用原生窗口的实际文案，设计边界仍保留查证入口；不把尚未发布的修复当作全量用户现状。

实测结果：会议记录生成、文件打开、同一会话修改同一文件已完成；项目现有目录添加与目录核对已完成；三张阅读卡已实际读出资料表并逐项对照，确认后在同一任务生成并打开组会提纲。助理只核对介绍、命名和运行位置页面，未为文档验收新开常驻助理，派活、记忆和跨设备接力仍按源码/预期核对，不声称全链实测。

实测修正：桌面入口为「项目 → 新建会话」、项目空选为「未选择项目」、添加项目有三个入口；Git 仓库中的子目录可能升为仓库根目录，已写明发送前查路径及独立练习目录。服务不可用、积分不足、文件写出后容量不足均真实遇到，恢复条目以这些可观察情况编写。

## 2026-10-30 全面翻新（当前依据）

本轮按 OpenDCAI/gugu dev `837d8ec`（10-30）与 GUYI-AI/gugu-apps `e22d540` 逐页重核并改写全部正文，新增 interface、topics、folder、apps/contribute。证据是源码与界面文案核对，没有新做产品实测；与下方旧小节冲突时以本节为准。下方旧小节的路径出自已冻结的旧私仓 `nmhjklnm/gugu` 与其 `behavior/`，只作历史出处。

界面结构变化：最左栏的「项目」「对话」合进「消息」（内分「项目 | 对话」页签）；手机底栏只剩「消息 · 伙伴」。App API 当前为 22；`platforms` 安装与上架必填。

### 入门、任务与项目

| 页面 | 用户问题 | 代码查证入口（OpenDCAI/gugu dev 837d8ec，仓库相对路径） |
|---|---|---|
| interface | 最左栏有哪些入口、各去哪里 | apps/desktop/src/components/Sidebar.tsx（Sidebar、AssistantRailTop、AppsOnRail、DockItem、HelpOnRail）；apps/desktop/src/i18n/locales/zh-CN/main.ts、en-US/main.ts（shell.messages / contacts / library / apps / settings、appOpen / appOpenInWindow / appUnpin / appQuit）；zh-CN/assistant.ts railEntry |
| interface | 项目和对话去哪了、怎么合在一起 | apps/desktop/src/session/renderer/features/sidebar/left-sidebar.tsx；sidebar-list-switch.tsx；sidebar-chats-section.tsx；sidebar-sessions-section.tsx；apps/desktop/src/session/renderer/localization/messages.ts（sidebar.projects / chats / listLayout / listMerged / listSplit / newTask / sessionHistory / scheduled / pinned / tasks / addProject / newGroupChat / addContact） |
| interface | 怎么快速搜索、切到命令 | apps/desktop/src/session/renderer/features/sidebar/sidebar-search-trigger.tsx；apps/desktop/src/session/shared/commands.ts（app.quickSwitcher Mod+O、app.commandPalette）；apps/desktop/src/session/renderer/lib/components/app-keyboard-shortcuts.tsx；messages.ts palette.prefixHint |
| interface | ⌘1 / ⌘2 快捷键 | apps/desktop/src/layouts/MainLayout.tsx（metaKey 1/2 handler） |
| interface | 在哪新建 Agent | apps/desktop/src/components/WindowTitleBar.tsx（文件 → 新建 Agent）；apps/desktop/src/lib/window-chrome.ts hasWindowTitlebarRow（仅 Windows）；apps/desktop/src/components/contacts/ContactsCreateAgentButton.tsx；zh-CN/messaging.ts memberList.createAgent |
| interface | 群聊顶部按钮 | apps/desktop/src/components/chat/ChatHeaderActions.tsx；chatFolderName.ts；PinnedTopicTabs.tsx；GroupTopicsMenuItem.tsx；zh-CN/messaging.ts header.*、topic.pins |
| interface | 手机布局、我的、助理入口 | apps/desktop/src/layouts/MainLayout.tsx（MOBILE_TABS、PhoneAssistantRow、PhoneMeButton）；apps/desktop/src/mobile/PhoneMeButton.tsx；apps/desktop/src/mobile/assistant/PhoneAssistantRow.tsx；apps/desktop/src/mobile/assistant/MobileAssistantApp.tsx |
| interface、quickstart | 导览怎么看、怎么重看 | apps/desktop/src/lib/productTour.ts；apps/desktop/src/components/productTour/tourTargets.ts；apps/desktop/src/components/firstRun/FirstRunGate.tsx（tourChoice）；zh-CN/productTour.ts help.*；zh-CN/main.ts firstRun.tourChoice* |
| quickstart、interface | 示例项目是什么 | apps/desktop/src/session/renderer/features/sidebar/sample-project-row.tsx；features/sample-project/use-sample-project.ts；localization/messages-projects.ts projects.sample.* |
| quickstart、tasks | 新建任务从哪开始、设备和项目怎么选 | apps/desktop/src/session/renderer/features/sessions/new-session-page.tsx；composer-context-tray.tsx；localization/messages-session-workflows.ts（task.newTask、task.deviceLocal、task.projectNone）；zh-CN/main.ts firstRun.harnessTitle |
| index、concepts、projects、research | 项目群能不能拉别人 | zh-CN/messaging.ts、en-US/messaging.ts group.projectGroupNoInvite |
| research、projects | 怎么添加项目、给项目加文件夹 | apps/desktop/src/session/renderer/features/sidebar/add-project-menu-items.tsx；projects-group-label.tsx；remote-project-menu-items.tsx；project-item.tsx（行上「+」= sidebar.newSession）；features/projects/components/main-panel/project-folder-card.tsx、project-folder-stage.tsx、project-folder-menu.tsx；localization/messages-projects.ts projects.create.*、projects.folders.* |
| tasks、research | Fork、侧边聊天的位置和条件 | apps/desktop/src/session/renderer/features/sidebar/sidebar-session-item.tsx（sidebar.forkSession 右键菜单）；features/sessions/tab-bar-actions.tsx（workspace.sideTask、sideTaskUnavailable） |
| tasks | 归档后从哪恢复 | localization/messages.ts sidebar.sessionHistory；messages-session-workflows.ts sessionHistory.restore；features/session-history/session-history-view.tsx |
| tasks | 并排页签菜单、App 退出 | localization/messages.ts tabs.splitRight / splitDown / separatePair；components/Sidebar.tsx DockItem（拖动只排序） |
| assistant、guides/assistant-follow-up | 助理面板各页签、手机怎么进 | zh-CN/assistant.ts nav.*、routines.title；features/assistant/assistant-view.tsx；mobile/assistant/MobileAssistantApp.tsx；layouts/MainLayout.tsx PhoneAssistantRow |
| schedules | 定时在哪看、怎么改、错过了怎么办 | left-sidebar.tsx（已安排 → automations）；features/automations/automations-view.tsx、components/AutomationsHeader.tsx、AutomationDetailView.tsx；features/sessions/session-schedule-chip.tsx；features/sidebar/sidebar-schedule-badge.tsx；localization/messages-session-schedules.ts；zh-CN/agents.ts settings.nav.tasks、tasks.*；components/agentsettings/AgentSettingsModal.tsx |
| examples | 话题短片链接到哪 | 指向 /topics（话题页由另一位作者维护） |

### Agent、协作与 App 使用

| 页面 | 用户问题 | 代码查证入口（OpenDCAI/gugu dev 837d8ec） |
|---|---|---|
| agents | 怎么新建一位 Agent | apps/desktop/src/components/ChatListPanel.tsx（chatList.createAgent，仅桌面）；components/contacts/ContactsCreateAgentButton.tsx、ContactsDeviceSections.tsx、ContactsSectionState.tsx（panel.createAgent）；components/WindowTitleBar.tsx:120 与 lib/window-chrome.ts hasWindowTitlebarRow（仅 Windows）；components/chat/GroupMemberPanelControls.tsx:162（group.memberList.createAgent） |
| agents | Agent 设置有哪些页、怎么暂停 | components/agentsettings/AgentSettingsModal.tsx（形象仅个人助理；无「设置」页签）；components/agentsettings/AgentPauseRow.tsx；i18n zh-CN/agents.ts settings.nav、settings.profile.pause |
| apps | 怎么在群里打开、固定 App | components/chat/ChatHeaderActions.tsx:99；components/chat/GroupAppsPicker.tsx（header.personalPins）；components/appSlot/ChatTabHosts.tsx ChatPlusMenu（header.openInGroup） |
| apps | 左栏 App 右键菜单 | components/Sidebar.tsx:236-247（shell.appOpenInWindow / appUnpin / appQuit） |
| apps | 远程 server 能否用 Browser Use | apps/desktop/electron/capability-bundle.ts browserUseOf |
| chat | 搜索聊天、标注图片 | components/chat/ChatHeaderActions.tsx（header.searchConversation / searchChat）；components/ImagePreviewProvider.tsx:312；components/imageAnnotate/AnnotateSendBar.tsx、useAnnotateSend.ts；i18n zh-CN/main.ts imageAnnotate |
| chat | 悄悄话从哪里进 | components/MemberProfileCard.tsx:339；zh-CN/messaging.ts message.whisperBoth |
| topics | 开话题、改名、分栏 | components/chat/messageActionItems.ts:57；hooks/useTopicSurface.ts（topicNameFromMessage）；components/chat/MemberListPanel.tsx:422；messaging topic.pane / topic.anchor |
| topics | 话题列表、置顶成页签 | components/chat/GroupTopicsMenuItem.tsx；components/chat/PinnedTopicTabs.tsx、useChatPinSettings.ts（按账号）；mobile/chat/PhoneChatTabs.tsx；components/ChatAreaPanel.tsx:812 |
| topics | 话题的 Agent 数量阈值 | components/chat/GroupAgentFloodSettings.tsx；components/chat/ChatSettingsPanel.tsx:139（私聊） |
| folder | 群文件夹能做什么 | apps/desktop/preinstalled-apps/workspace/app.js（STRINGS、rowMenu、fileMenu、blockMenu、cite、pickedActions）；workspace/manifest.json |
| folder | 文件保留多久、存在哪 | workspace/app.js keepTip / storedOn*；zh-CN/settings.ts fileStorage |
| groups | 谁能改倾听模式 | components/chat/useListenModeEditControls.ts:52；components/chat/MemberListPanel.tsx ListenModeToggle；messaging group.memberList.listen |
| groups | 群设置与群管理有哪些项 | components/chat/GroupMembersSection.tsx:285-310；components/chat/GroupSettingsManagePage.tsx；components/chat/groupSettingsUi.tsx MemberInviteLink / GroupInviteLinkBlock；components/chat/ChatDetailsMenuItems.tsx |
| groups | Agent 太多时怎么处理 | components/chat/AgentFloodThresholdSetting.tsx；components/chat/AgentFloodSystemNotice.tsx |
| groups | 项目群和群聊的区别 | messaging group.projectGroupNoInvite；components/chat/GroupSettingsManagePage.tsx:56 |
| contacts | 联系人与伙伴入口 | components/Sidebar.tsx；mobile/PhoneTabBar.tsx；mobile/partners/PhonePartnersPage.tsx、PhoneProjectContacts.tsx |
| contacts | 怎么分享或公开 Agent | components/contacts/ContactDetail.tsx（inviteToAgent、setPublic、requestJoin）；components/agentsettings/AgentSharePane.tsx；components/sessionpage/AgentSharePopover.tsx；layouts/MainLayout.tsx:1376-1400 |
| forum | 安装要求、悬赏上限、指派 | gugu-apps sources/forum/manifest.json（0.1.5，engines gugu >=0.2.57）、forum.js、forum.html；zh-CN/messaging.ts forum.consent.error.activeLimit |

### 设备、手机与设置

| page | user question | code source entries (OpenDCAI/gugu dev 837d8ec) |
|---|---|---|
| devices | How do I add another machine, and which method fits? | apps/desktop/src/i18n/locales/zh-CN/settings.ts devices.addServer.{open,method,oneLine,reasons}; apps/desktop/src/components/settings/AddServerPanel.tsx; apps/desktop/electron/server/server-download.ts; apps/desktop/electron/server/ssh-install/logic.ts oneLineInstallCommand |
| devices | Why was my machine not added? | settings.ts devices.addServer.machineLimit.*; apps/desktop/src/components/settings/addServer/MachineLimitNotice.tsx |
| devices | What happens when a server is out of date? | settings.ts devices.link.{updating,waitingIdle,updateNow,updateNowConfirm,reinstall} |
| devices, integrations | What can tasks on this computer use, and how do I pause it? | settings.ts devices.deviceActions.*; apps/desktop/src/components/settings/DevicesSection.tsx; apps/desktop/src/components/settings/DeviceActionsPage.tsx; apps/desktop/electron/device-actions/families/*.ts (platforms per group); computer-control-window.ts |
| devices, mobile | Can my Android phone run tasks? | commit 067c2c899; apps/mobile/runtime/README.md; settings.ts devices.kind.phone, devices.connectMore.steps.android3, devices.phoneActions.localAgentOnly |
| mobile | Where are messages, projects and Me on the phone? | packages/core/src/shared/enums/sidebarTabModels.ts MOBILE_TABS; apps/desktop/src/layouts/MainLayout.tsx (PhoneAssistantRow, PhoneMeButton); apps/desktop/src/mobile/PhoneMeButton.tsx; apps/desktop/src/mobile/partners/PhonePartnersPage.tsx; zh-CN/main.ts shell.{messagesMobile,partnersMobile}, partners.projects |
| mobile | How do I enable phone tasks and Skills? | apps/desktop/src/mobile/local-agent/PhoneAgentHostControl.tsx; PhoneTaskSkillsButton.tsx; apps/desktop/src/mobile/agent-watch/task-flow-catalog.ts; CreateOptionsPill.tsx; PhoneHostSetupEntry.tsx |
| mobile, integrations | Which phone data can tasks read? | apps/desktop/src/mobile/phone-device/PhoneDeviceActionsPage.tsx; PhonePermissionsList.tsx; phonePermissionRows.ts; settings.ts devices.phoneActions.groupDescription |
| mobile | What can I open from a task on the phone? | zh-CN/main.ts agentWatch.output.*, agentWatch.offline.*; packages/session-core/src/session-record/contract.ts OPENED_FILE_MAX_BYTES |
| resource-monitor | How do I turn on and read the monitor? | packages/core/src/shared/enums/settingsSectionModels.ts; apps/desktop/src/session/renderer/features/settings/components/ResourceMonitorSettingsPage.tsx; resource-timeline.tsx; apps/desktop/src/session/renderer/localization/messages-capabilities.ts resourceMonitor.*; session/renderer/lib/commands/app-commands.ts app.resourceMonitor |
| resource-monitor | How do I stop an item or copy a report? | apps/desktop/src/session/renderer/features/command-palette/resource-monitor-view.tsx; localization/messages.ts palette.{stop,stopQuestion,copyReport} |
| integrations | Where do I connect a service, and with my own key? | zh-CN/main.ts settings.nav.connectors; zh-CN/assistant.ts connectors.*; packages/session-plugins/src/integrations/impl/amap/index.ts, summary.ts; commits 9b281b812, 08efdd32f |
| models | How do I manage and switch provider connections? | apps/desktop/src/session/renderer/localization/messages-subscriptions.ts subscriptions.connections.*; features/settings/subscriptions/SubscriptionsSettingsPage.tsx (manageable = claude, codex); SubscriptionConnections.tsx; commit d068c2f80 (Beta) |
| models | Which picker group is billed in credits? | localization/messages.ts composer.platformModelGroupHeading |
| settings | Where is each setting? | packages/core/src/shared/enums/settingsSectionModels.ts SETTINGS_GROUPS; apps/desktop/src/components/SettingsPanel.tsx section filter; zh-CN/main.ts settings.{group,nav,general}; session/renderer/features/settings/components/SettingsPage.tsx; zh-CN/settings.ts model, files, about |
| self-hosting | How do I run gugu on my own backend? | README.md (self-hosting steps); .node-version; package.json packageManager; docs/optional-cloud-services.md; gugu-supabase docs/self-hosting.md, self-hosting-free-plan.md, self-hosting-smtp.md, files-service.md (HEAD bf594a0, 2026-10-26) |
| troubleshooting | What does archiving do? | localization/messages-session-workflows.ts task.archive*, sessionHistory.title |
| troubleshooting | What does editing an old message undo? | features/sessions/acp/acp-chat-store.ts canRevertHistory, canRevertMessage, sendMessageEdit |
| troubleshooting | Why did all Agents turn passive? | zh-CN/messaging.ts agentFlood.*, agentFloodThreshold*; components/chat/AgentFloodSystemNotice.tsx; AgentFloodThresholdSetting.tsx |

### 贡献 App

| 页面 | 用户问题 | 来源 |
|---|---|---|
| apps/contribute | 从零到上架要走哪几步；代码放自己的仓还是索引仓；官方 App 为什么要两个 PR、登记里 repo 写什么 | GUYI-AI/gugu-apps: README.md、scripts/lib.mjs（fetchSource 默认分支检查 132-138、INDEX_REPO）、scripts/add-version.mjs、apps/studio.json、apps/spexcode.json；OpenDCAI/gugu: apps/desktop/src/session/shared/extensions/first-run.ts（GUGU_APPS_REPO）、authoring-guide.ts（EXTENSION_GUIDE_FORK「Push or contribute」） |
| extensions | 第一个 App 最少写什么、怎么装进咕咕、改完怎么重装 | OpenDCAI/gugu: apps/desktop/src/session/shared/extensions/manifest.ts、app-platforms.ts、bridge-protocol.ts（EXTENSION_API_VERSION）、authoring-guide.ts（EXTENSION_GUIDE_START 沙箱段）；apps/desktop/electron/session/main/core/extensions/extensions-service.ts（installFromDirectory 替换、requireAppPlatform）；apps/desktop/src/session/renderer/localization/messages.ts（extensions.installLocal、installed、installedNext、installFailed、alsoOnFolderOnly）；features/settings/components/ExtensionsSettingsCard.tsx；GUYI-AI/gugu-docs: samples/app-starter |
| apps/manifest | 每个字段的格式、上限，哪个字段要哪个 API 版本，权限怎么写 | OpenDCAI/gugu: apps/desktop/src/session/shared/extensions/manifest.ts（schema 与 superRefine）、app-platforms.ts、bridge-protocol.ts 54-73、catalog.ts（MARKET_CATEGORIES）、authoring-guide.ts（EXTENSION_GUIDE_SETTINGS、apps-ui 市场卡片段）；GUYI-AI/gugu-apps: scripts/lib.mjs（GUGU_APPS_LINE_MAX_CHARS） |
| extension-api | window.gugu 有哪些方法、要什么权限和 API；旧的 compose/send/spawnAgent/messageAgent 怎么迁移 | OpenDCAI/gugu: apps/desktop/src/session/shared/extensions/bridge-protocol.ts（BRIDGE_VERBS）、app-dispatch-core.ts（DISPATCH_GONE）、apps/desktop/src/session/app-runtime/create-gugu.ts:177、authoring-guide.ts（PAGE、AGENTS、SESSIONS、PROJECTION、PROGRAMS、FILES 与 EXTENSION_GUIDE_TOPICS） |
| apps/development | 怎么反复调试；页面沙箱能做什么；人会看到哪些错误；索引仓 CI 测什么、自己的测试怎么写 | OpenDCAI/gugu: apps/desktop/src/session/shared/extensions/app-csp.ts、manifest.ts（apiVersion 报错文案）、authoring-guide.ts（沙箱、app_check、页面存活）、components/extensionBundle/installedHere.ts、messages.ts（installedHereFolder、publisherLocal）；GUYI-AI/gugu-apps: package.json、.github/workflows/verify.yml、scripts/app-tests.mjs、sources/kanban/package.json 与 test/ |
| apps/publishing | 登记文件长什么样、命令怎么跑、CI 查什么、市场图片怎么准备、合并后怎么到用户手里 | GUYI-AI/gugu-apps: README.md、scripts/lib.mjs（validateApp 58-95、packDir、inspectAppDir、上限常量）、scripts/add-version.mjs、scripts/verify.mjs、scripts/app-platforms.mjs、.github/gugu-app-contract.json、.github/workflows/verify.yml、scripts/promo/README.md、sources/*/screenshots/SOURCE.md；OpenDCAI/gugu: docs/publishing-an-extension.md |
| apps/policies | 哪些规则是强制的，提交时该说明什么，谁来审 | GUYI-AI/gugu-apps: README.md、scripts/verify.mjs；OpenDCAI/gugu: docs/publishing-an-extension.md、manifest.ts（agents:tools 规则）、authoring-guide.ts（apps-together、apps-agents） |
| apps/maintenance | 怎么发新版；撤回、停维、下架各有什么后果；用户怎么收到更新 | GUYI-AI/gugu-apps: README.md、scripts/verify.mjs（不可变、撤回不可收回、文件不可删）；OpenDCAI/gugu: docs/publishing-an-extension.md、messages.ts（rowYanked、deprecated、deprecatedRow、rowGone、autoUpdate）、authoring-guide.ts（EXTENSION_GUIDE_SETTINGS 配置值保留） |

## 按用户问题查证（2026-10-20 旧依据）

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

`en/` 逐页对照中文正文（35 篇），`docs.json` 用 `navigation.languages`：中文 `zh` 为默认、地址不变，英文页在 `/en/...`。中文页改动后同步改对应英文页。界面名称取客户端英文文案（`i18n/locales/en-US/` 与 `localization/`），术语见 [glossary-en.md](glossary-en.md)。截图与视频沿用中文素材，英文页注明界面为中文。英文稿上线前由 owner 或 shuxue 审阅。
