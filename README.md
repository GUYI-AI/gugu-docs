# 咕咕文档站

[线上文档](https://gugu.mintlify.site/) · [官网](https://gugu.nextmind.space/zh/)

中文用户指南，使用 Mintlify 和 MDX。已有九篇页面的地址保持不变；导航覆盖全部二十篇正文。

## 本地预览与检查

```sh
npx mint@4.2.1072 dev --no-open --port 3000
npx mint@4.2.1072 validate
npx mint@4.2.1072 broken-links
```

`docs.json` 管导航、站点名称与品牌。页面源在根目录，媒体在 `videos/`，原始产品截图在 `images/walkthrough/`，可下载的练习包在 `samples/`。预览或验证时使用满足 Mintlify 要求的 Node 版本。

## 内容

- 开始：`index`、`quickstart`、`concepts`。
- 照着做：`guides/research`、`guides/assistant-follow-up`、`examples`。
- 把事情做完：`assistant`、`tasks`、`projects`、`agents`、`apps`、`schedules`。
- 一起协作：`chat`、`groups`、`contacts`。
- 配置与帮助：`devices`、`integrations`、`models`、`settings`、`troubleshooting`。

写之前读 `AGENTS.md`。产品事实来自产品仓库当前的 behavior、治理节点和界面源码；涉及当前 Beta 的说明注明范围，不把设计稿当成已交付功能。价格与在售模型引用官网及账户的当前页面，不在文档中维护第二份价格表。

## 视频

入门图解来自官方 Beta `0.2.57-beta.125.1` 的实际原生操作截图，素材为虚构记录；步骤停留时间经过编排。另五段视频为官网界面演示动画的屏幕录制，使用示例人物与任务，分别标注来源，不当作产品实测证据。每段均配 JPG 封面、内置中文字幕及 WebVTT 源文件和正文步骤，使用原生控制条，按需加载。

来源、录制尺寸与文件清单见 [videos/README.md](videos/README.md)。媒体更新时同步修改字幕、封面和页面说明。

## 发布

本仓 Mintlify 连接的是 `main`。先在工作分支预览并经内容审阅，再合并发布。不要把尚未合并的本地预览称为线上更新。

## 本轮内容依据

产品参照 `nmhjklnm/gugu` 的 `2889591121`（2026-10-20 dev）：

| 内容 | 产品事实所在文件 |
|---|---|
| 入门、个人助理 | `behavior/first-run.md`、`behavior/assistant-app.md` |
| 任务、项目、历史 | `behavior/session-page.md`、`behavior/session-page-flows.md`、`behavior/projects.md` |
| App 与能力 | `behavior/tab-extensions.md`、`behavior/integrations.md`、`behavior/system-permissions.md` |
| 群、话题、分享 | `behavior/group-routing.md`、`behavior/topics.md`、`behavior/agent-social.md`、`behavior/session-fork-share.md` |
| 模型、订阅、积分 | `behavior/model-access.md`、`behavior/subscriptions.md`、`behavior/membership.md` |
| 设备与设置 | `behavior/gugu-server.md`、`behavior/gugu-server-multi-device.md`、`behavior/settings.md` |

界面名称同时核对 `apps/desktop/src/i18n/locales/zh-CN`、`SettingsNav.tsx` 和 Agent 插件目录。`.spec` 的现有文档节点只同步到这些已确认的产品事实。


用户问题、产品 behavior、.spec 和实现查证入口的对应关系见 [内容依据](maintenance/content-map.md)。维护资料不进入公开站点。

写入门时使用可复制材料、明确产物与检查点；菜单解释放参考页。对产品内部设计作取舍：有助于预测操作后果的信息写给用户，实现沿革留在原资料中。
