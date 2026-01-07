# My Learning Blog 📚

欢迎来到我的个人知识花园！这是一个基于 **VitePress** 构建，集成 **TinaCMS** 可视化管理，并拥有 **AI 智能助手** 的现代化技术博客。

🔗 **访问地址**: [https://vivacious1024.github.io/MyLearningBlog/](https://vivacious1024.github.io/MyLearningBlog/)

---

## 🚀 项目亮点

- **🤖 AI 智能助手**: 
    - 集成 **Gemini Pro** 大模型，支持全屏侧边栏对话。
    - 采用 **Cloudflare Workers** 做安全中转，API Key 零泄露。
    - 支持 Markdown 实时渲染 (代码高亮、公式等)。
- **⚡ 极速体验**: 基于 VitePress 构建，秒级加载，SEO 友好。
- **📝 所见即所得**: 集成 TinaCMS，支持在网页端直接编辑内容。
- **🔄 自动化部署**: 通过 GitHub Actions 实现 `git push` 即发布。

## 🛠️ 技术栈

- **前端框架**: [VitePress](https://vitepress.dev/) (Vue 3 + Vite)
- **CMS**: [TinaCMS](https://tina.io/) (Git-backed Headless CMS)
- **AI 后端**: [Cloudflare Workers](https://workers.cloudflare.com/) (Serverless) -> Google Gemini API
- **部署**: GitHub Pages + GitHub Actions
- **工具链**: Markdown-it, TypeScript

## 💻 本地开发指南

如果你想在本地运行这个项目：

1.  **克隆仓库**
    ```bash
    git clone https://github.com/vivacious1024/MyLearningBlog.git
    cd MyLearningBlog
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动开发服务器**
    ```bash
    npm run dev
    ```
    - 博客预览: `http://localhost:5173`
    - CMS 后台: `http://localhost:5173/admin/index.html`

4.  **构建与预览生产环境**
    ```bash
    npm run docs:build
    npm run docs:preview
    ```

## 📝 目录结构

```
.
├── .github/workflows/    # 自动化部署脚本
├── docs/                 # 内容源文件
│   ├── .vitepress/       
│   │   ├── config.mjs    # 网站主配置
│   │   └── theme/        # 主题定制 (含 AIChat 组件)
│   ├── notes/            # 学习笔记 (Python, Web等)
│   └── public/           # 静态资源
├── tina/                 # CMS 配置文件
└── package.json
```

## 🔐 安全说明

本项目使用了 API Key（如 Gemini），但采取了**后端分理**的安全策略：
*   ❌ 前端代码中**不包含**任何私有 Key。
*   ✅ 所有 API 请求通过 Cloudflare Worker 转发，Key 存储在 Worker 的加密环境变量中。
*   详细指南请参考文档中的 [《实战：如何安全地接入AI》](/notes/web/ai-api-security)。

---
*Created with ❤️ by vivacious1024*
