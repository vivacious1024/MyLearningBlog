---
title: 为什么要用 Cloudflare 托管网站？
---

# 进阶：把网站搬家到 Cloudflare Pages

你之前问：“Cloudflare 是一种网页托管平台吗？我可以把网页全部放在上面吗？”

**答案是：是的，而且强烈推荐！** 
你现在用的是 **GitHub Pages**，它很棒，但 **Cloudflare Pages** 通常被认为是更现代、更快的升级选择。

## 1. Workers vs Pages：别搞混了

Cloudflare 有两个长得很像的产品：

*   **Cloudflare Workers** (你刚才用的)：
    *   **是啥**：运行代码的地方（Serverless）。
    *   **用途**：做 API 中转、后端逻辑、AI 代理。
    *   **比喻**：你的“云端服务器”。

*   **Cloudflare Pages** (现在要介绍的)：
    *   **是啥**：托管静态网页的地方。
    *   **用途**：存放你的 HTML/CSS/JS 文件（VitePress 打包后的东西）。
    *   **比喻**：你的“云端硬盘” + “超级加速器”。

## 2. 为什么要搬家？

相比 GitHub Pages，Cloudflare Pages 有几个显著优势：

1.  **国内访问更快**：
    GitHub Pages 的服务器在国外，国内访问有时很不稳定（甚至被墙）。Cloudflare 拥有全球 CDN 网络，虽然国内速度也受限，但通常比 GitHub 稳一点。
2.  **构建速度起飞**：
    Cloudflare 的构建环境非常快，通常几秒钟就能检测到你的 Git 提交并开始部署。
3.  **预览部署 (Preview Deployments)**：
    **这是杀手级功能！** 当你（或别人）提交一个 Pull Request 时，Cloudflare 会自动生成一个**临时的测试网址**（比如 `pr-123.your-site.pages.dev`）。你可以先在测试网址上看看改得对不对，确认没问题了再合并到主分支发布。
4.  **无缝集成 Workers**：
    如果你用 Cloudflare Pages，你的 API (Workers) 和网页 (Pages) 可以完美在同一个网络下运行，延迟更低。

## 3. 怎么搬？(0 成本)

你完全不需要动你的代码，只需要在 Cloudflare 后台点几下：

1.  **登录 Cloudflare** -> **Workers & Pages**。
2.  点击 **Create application** -> 选择 **Pages** 标签页。
3.  点击 **Connect to Git** -> 选择你的 GitHub 账号和 `MyLearningBlog` 仓库。
4.  **配置构建命令**：
    *   **Framework preset**: 选 `VitePress` (如果有的话，没有就手动填)。
    *   **Build command**: `npm run docs:build`
    *   **Build output directory**: `docs/.vitepress/dist`
5.  点击 **Save and Deploy**。

只需喝口水的功夫，你的博客就会获得一个新的 `xxx.pages.dev` 域名。你可以同时保留 GitHub Pages 和 Cloudflare Pages，它们互不冲突！
