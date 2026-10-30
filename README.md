# 咕咕文档站

[线上文档](https://gugu.mintlify.site/) · [官网](https://gugu.nextmind.space/zh/)

中文用户指南，使用 Mintlify 和 MDX。英文版在 `en/` 逐页对照，导航通过语言切换进入，术语见 [英文术语表](maintenance/glossary-en.md)。已有页面地址保持不变；导航覆盖全部三十五篇正文。

## 本地预览与检查

```sh
npx mint@4.2.1072 dev --no-open --port 3000
npx mint@4.2.1072 validate
npx mint@4.2.1072 broken-links
```

`docs.json` 管导航、站点名称与品牌。页面源在根目录，媒体在 `videos/`，原始产品截图在 `images/walkthrough/`，可下载的练习包在 `samples/`。本轮用 Node 22 完成本地预览；Node 24 的网络检测依赖在此环境出现过异常。预览或验证时使用满足 Mintlify 要求的 Node 版本。

练习包下载链接指向公开 GitHub 仓库中的固定提交，避免文档托管站未提供 ZIP 静态文件时返回 404。修改练习材料时同步生成 ZIP，并把两篇指南的下载链接更新到对应素材提交。

## 内容

- 开始：`index`、`quickstart`、`concepts`、`interface`。
- 照着做：`guides/research`、`guides/assistant-follow-up`、`examples`。
- 任务与项目：`tasks`、`projects`、`schedules`、`assistant`。
- Agent：`agents`。
- 一起协作：`chat`、`groups`、`topics`、`folder`、`contacts`、`forum`。
- 使用 App：`apps`。
- 贡献 App：`apps/contribute`、`extensions`、`apps/manifest`、`extension-api`、`apps/development`、`apps/publishing`、`apps/policies`、`apps/maintenance`。
- 设备与手机：`devices`、`mobile`、`resource-monitor`。
- 配置与帮助：`models`、`integrations`、`settings`、`self-hosting`、`troubleshooting`。

写之前读 `AGENTS.md`。产品事实来自 `OpenDCAI/gugu` dev 的界面文案与界面源码，App 市场流程来自 `GUYI-AI/gugu-apps`；涉及当前 Beta 的说明注明范围，不把设计稿当成已交付功能。价格与在售模型引用官网及账户的当前页面，不在文档中维护第二份价格表。

## 视频

入门图解来自官方 Beta `0.2.57-beta.125.1` 的实际原生操作截图，素材为虚构记录；步骤停留时间经过编排。另五段视频为官网界面演示动画的屏幕录制，使用示例人物与任务，分别标注来源，不当作产品实测证据。每段均配 JPG 封面、内置中文字幕及 WebVTT 源文件和正文步骤，使用原生控制条，按需加载。

来源、录制尺寸与文件清单见 [videos/README.md](videos/README.md)。媒体更新时同步修改字幕、封面和页面说明。

## 发布

本仓 Mintlify 连接的是 `main`。先在工作分支预览并经内容审阅，再合并发布。不要把尚未合并的本地预览称为线上更新。

## 本轮内容依据

2026-10-30 全面翻新参照 `OpenDCAI/gugu` dev `837d8ec` 与 `GUYI-AI/gugu-apps` `e22d540`。界面名称核对 `apps/desktop/src/i18n/locales/` 与 `apps/desktop/src/session/renderer/localization/`。

用户问题和实现查证入口的对应关系见 [内容依据](maintenance/content-map.md)。维护资料不进入公开站点。

写入门时使用可复制材料、明确产物与检查点；菜单解释放参考页。对产品内部设计作取舍：有助于预测操作后果的信息写给用户，实现沿革留在原资料中。

## App 贡献与新增参考

「贡献 App」从 `apps/contribute` 总览开始，经第一个 App、manifest、App API、本地调试与测试、提交到 gugu-apps、审核与政策、版本维护，共八页。`samples/app-starter` 是可复制的三文件便签起步包（App API 12），另带 README 和 CHANGELOG。论坛、手机与资源监视器分别位于 `forum`、`mobile`、`resource-monitor`。

本次维护范围见 [2026-10 维护表](maintenance/product-delta-2026-10.md)，逐页依据见 [内容依据](maintenance/content-map.md)。正文统一使用「任务」，执行工具称「引擎」；已有版本截图可能仍显示旧文案。当前导航 35 页。

`.mintignore` 排除起步包源码与维护资料，避免示例 JavaScript 被 Mintlify 当作全站脚本。源码仍在 GitHub 可复制；教程内也给出完整三文件代码。
