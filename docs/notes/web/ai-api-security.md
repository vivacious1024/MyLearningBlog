---
title: 实战：如何安全地在博客中接入 AI
---

# 实战：如何安全地在博客中接入 AI？

你现在的需求是：“我想在博客里加一个对话框，调用 AI API (比如 OpenAI/Gemini/DeepSeek)，但不想再次部署时泄露 API Key”。

这是一个非常经典且重要的安全问题。在静态网站（如 VitePress + GitHub Pages）中，**稍有不慎，你的 Key 就会被盗用耗尽余额。**

## 1. 为什么不能直接在代码里写 Key？

### ❌ 错误做法
```javascript
// 假设你在 .vue 组件里这样写
const apiKey = "sk-abcdefg123456..."; 
const response = await fetch("https://api.openai.com/...", {
  headers: { Authorization: `Bearer ${apiKey}` }
});
```
即便你也没把 Key 推送到 GitHub，或者你把它藏在了 `.env` 环境变量里，只要你的代码是运行在**浏览器（前端）**里的，这都是**极其危险**的。

### ⚠️ 原理揭秘
1.  **静态网站没有后台**：VitePress 打包出来的是纯 HTML/JS。
2.  **浏览器是透明的**：任何访问你网站的人，只要按 `F12` 打开开发者工具，点击 `Network` 标签，就能看到你的网页发出的请求头里带着 `Bearer sk-abcdefg...`。
3.  **结果**：黑客都不用攻击你，直接复制粘贴你的 Key 拿去用，你的信用卡瞬间刷爆。

## 2. GitHub Secrets 能救命吗？

你可能会想：“我在 GitHub 仓库设置里配了 Secrets，是不是就安全了？”

**分情况：**
-   **构建时 (Build Time)**：有用。比如你需要 Key 来**生成**静态文章（预渲染）。这时候 Key 只存在于 GitHub 的服务器上，生成的 HTML 里只有“文章结果”，没有 Key。这是安全的。
-   **运行时 (Runtime)**：没用。如果你是想做“对话框”，意味着**用户点击按钮**时才发请求。这时候为了让代码跑通，构建工具（Vite）会把 Key **打包进 JavaScript 文件里**传给浏览器。这又回到了上面的“裸奔”状态。

## 3. ✅ 正确的架构：中间人模式 (Proxy)

要绝对安全，**API Key 必须永远只存在于服务器端**。
因为我们用的是 GitHub Pages（纯静态托管），没有服务器，所以我们需要引入一个**免费的“中间人”**。

### 架构图
```mermaid
graph LR
    User[用户浏览器] -->|1. 提问 (无 Key)| Proxy[你的中转服务]
    Proxy -->|2. 加上 Key (只有它知道)| AI[AI 提供商 API]
    AI -->|3. 返回答案| Proxy
    Proxy -->|4. 返回答案| User
```

### 推荐方案 A：Cloudflare Workers (最轻量)
-   **优点**：免费，不用换博客托管，代码极少。
-   **原理**：你在 Cloudflare 上写一个只有 10 行代码的小脚本。你的博客把问题发给 Cloudflare，Cloudflare 拿着藏好的 Key 去问 AI，再把结果传回来。
-   **安全性**：★★★★★ (Key 存在 Cloudflare 环境变量里)

### 推荐方案 B：Vercel Serverless (最省心)
-   **优点**：如果把博客搬家到 Vercel，它自带“API 路由”功能。
-   **原理**：在项目里写一个 `/api/chat.js` 文件。VitePress 依然是静态的，但这个文件会变成一个独立的后端接口。
-   **安全性**：★★★★★ (Key 存在 Vercel 环境变量里)

## 4. 动手指南：怎么做？

如果你不想折腾服务器，**方案 A (Cloudflare Workers)** 是搭配 GitHub Pages 的最佳拍档。

1.  注册 Cloudflare 账号。
2.  创建一个 Worker。
3.  在 Worker 的设置里添加 `API_KEY` 变量。
4.  写一段简单的转发代码（Forwarding Code）。
5.  在你的 VitePress 博客里，把请求地址改成你的 Worker 地址（如 `https://my-chat.worker.dev`）。

这样，你的 GitHub 仓库里只有 `https://my-chat.worker.dev` 这个公开地址，而真正的 `sk-...` 密钥被牢牢锁在了 Cloudflare 的保险箱里。
