---
title: Cloudflare Workers 入门指南
---

# 什么是 Cloudflare Workers？

**Cloudflare Workers** 是一个**Serverless（无服务器）**计算平台。简单来说，它让你可以在全球几百个数据中心的“边缘网络”上运行一小段 JavaScript 代码，而不需要租用任何云服务器。

## 1. 账号与费用

你现在的疑问是：“是不是用普通的谷歌账号就能免费使用？”

**简短回答：是的，完全可以。**

-   **注册方式**：Cloudflare 账号其实就是用邮箱注册的，所以你可以直接用你的 Gmail（谷歌邮箱）注册。
-   **免费额度**：Cloudflare 对开发者极其慷慨。
    -   **每天 100,000 次请求**：对于个人博客来说，这几乎是用不完的。
    -   **免费绑定自定义域名**。
    -   **不需要绑定信用卡**（除非你要购买特定的付费功能，或者你是老用户可能被风控触发，但新用户通常可以直接开通）。

## 2. 为什么它适合做 API 代理？

对于我们“隐藏 AI Key”的需求来说，Workers 是天选之子：

1.  **代码保密**：代码运行在 Cloudflare 的服务器上，用户浏览器只能看到接口地址（如 `api.yoursite.com`），永远看不到代码里的 `sk-xxx` 密钥。
2.  **极速响应**：因为它部署在全球各地，用户访问时会自动连接最近的节点，延迟极低。
3.  **支持跨域 (CORS)**：你可以轻松配置允许你的博客访问，拒绝其他网站盗用你的接口。

## 3. 十行代码实现 OpenAI 代理

下面是一个最简化的示例，它能把你的请求转发给 OpenAI，并把结果传回来：

```javascript
export default {
  async fetch(request, env) {
    // 1. 只允许 OPTIONS 和 POST 请求 (安全性)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*", // 生产环境建议改成你的博客域名
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // 2. 从环境变量里读取 Key (绝对安全)
    const apiKey = env.OPENAI_API_KEY;

    // 3. 构造请求发送给 AI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: request.body,
    });

    // 4. 把 AI 的回答返回给用户
    return response;
  },
};
```

**就这么简单！** 你只需要在 Cloudflare 后台把 `OPENAI_API_KEY` 填进去，然后发布，你就拥有了一个免费、安全、且全球加速的私有 API 网关。

## 3.5 如果你是用 Google Gemini API

Gemini 的代码稍微有点不一样（因为它的 Key 通常放在 URL 后面，而不是 Header 里）。请用这段代码：

```javascript
export default {
  async fetch(request, env) {
    // 1. 处理跨域
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // 2. 读取 Key
    const apiKey = env.GEMINI_API_KEY;

    // 3. 转发给 Google
    // 注意：这里写死了用 gemini-1.5-flash 模型，你可以按需修改
    const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: request.body,
    });

    return response;
  },
};
```

## 4. 常见误区：卡在“添加站点”页面？

很多新用户注册后，会被引导去填写“输入您的域名”。

**⚠️ 请注意：**
1.  **不要填 `xxx.github.io`**：你无法把 GitHub 的子域名托管给 Cloudflare，因为你没有域名的所有权。
2.  **你不需要添加站点**：如果你只是想用 Workers 做 API 中转，你根本不需要拥有自己的域名。
3.  **正确做法**：直接在左侧菜单的 **Build** 分组下，点击 **Compute (计算)** 或者 **Workers & Pages**。
    *(注：Cloudflare 界面常更新，有时它藏在 `Compute & AI` 里面)*。
    然后点击蓝色的 **Create application** 按钮。

4.  **关键分岔路口**：
    -   **不要点** "Connect to Git"。
    -   **请点** **"Create Worker"** 按钮。
    
    你现在应该看到了 **"Deploy Hello World"** 界面：
    1.  **起个名字**：比如叫 `my-ai-proxy` (在 `Worker name` 那里改，不改也可以)。
    2.  **点击部署**：直接点页面右下角的蓝色 **"Deploy"** 按钮。
    3.  **进入编辑**：部署成功后，你会进入一个仪表盘页面。点击右上角的 **"Edit code"** 按钮。

5.  **编写与发布**：
    -   把编辑器里默认的代码删光。
    -   把本文上面提供的 **"十行代码"** 复制进去。
    -   点击右上角的 **"Deploy"** 保存并发布。

6.  **最重要的一步：设置密钥**
    -   发布后，点击左上角的 **"ai-proxy"** (或者你的名字) 返回刚才的仪表盘。
    -   点击顶部的 **Settings (设置)** 选项卡。
    -   在左侧菜单点击 **Variables and Secrets (变量与机密)**。
    -   点击 **Add** 按钮。
    -   **Variable name**: 填 `OPENAI_API_KEY` (如果是 Gemini 就填 `GEMINI_API_KEY`)。
    -   **Value**: 填你的 `sk-xxxx` 或 `AIza...` 密钥。
    -   点击 **Encrypt** (加密) 保存。

现在，你的 API 就真的安全上线了！

## 7. 最终回环：在博客中调用

现在你已经有了一个安全的后端地址（Worker URL）。
在 Cloudflare 仪表盘的首页，你可以看到类似于 `https://ai-proxy.vivacious1024.workers.dev` 的地址。

以后在你的博客代码里（比如 `.vue` 组件中），就这样调用：

```javascript
// 你的 Worker 地址 (公开的，不怕人看)
const API_URL = "https://ai-proxy.vivacious1024.workers.dev";

// 发送请求
const response = await fetch(API_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  // 注意：这里的 body 格式要符合 Gemini/OpenAI 的官方要求
  body: JSON.stringify({
    contents: [{
      parts: [{ text: "你好，请用一句话自我介绍" }]
    }]
  })
});

const data = await response.json();
console.log("AI回复:", data);
```

**你看，前端代码里完全不需要 Key 了！** 你的 Key 安全地躺在 Cloudflare 的服务器里，黑客就算把你的博客翻个底朝天，也找不到任何敏感信息。
