# My Learning Blog 📚

欢迎来到我的个人知识花园！这是一个基于 **VitePress** 构建，集成 **TinaCMS** 可视化管理，并拥有 **AI 智能助手** 的现代化技术博客。

这里记录了从 Python 基础、Web 开发（VitePress、Cloudflare）到金融量化、算法以及大语言模型（LLM）学习的完整脚印。

🔗 **访问地址**: [https://vivacious1024.github.io/MyLearningBlog/](https://vivacious1024.github.io/MyLearningBlog/)

---

## 🚀 项目亮点

- **🤖 AI 智能助手**: 
    - 集成 **SiliconFlow (硅基流动)** 大模型 API（兼容 OpenAI 格式）。
    - 当前使用 **Qwen (通义千问)** 系列模型，支持智能问答。
    - 采用 **Cloudflare Workers** 做安全中转，API Key 零泄露。
    - 支持 Markdown 实时渲染 (代码高亮、公式展示)。
- **⚡ 极速体验**: 基于 VitePress 驱动，享受秒级加载与极简阅读体验。
- **📝 所见即所得**: 集成 TinaCMS，支持进入 `/admin` 在网页端直接编辑 Markdown 内容。
- **🔄 自动化部署**: 通过 GitHub Actions 实现 `git push` 即自动发布到 GitHub Pages。

## 🛠️ 技术栈

- **前端框架**: [VitePress](https://vitepress.dev/) (Vue 3 + Vite)
- **CMS**: [TinaCMS](https://tina.io/) (Git-backed Headless CMS)
- **AI 后端**: [Cloudflare Workers](https://workers.cloudflare.com/) (Serverless) -> SiliconFlow API (Qwen/DeepSeek等)
- **部署**: GitHub Pages + GitHub Actions
- **工具链**: Markdown-it, TypeScript, TailwindCSS (for CMS)

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
    - 博客预览: `http://localhost:5173` (具体端口视终端输出而定)
    - CMS 后台: `http://localhost:5173/admin/index.html`

4.  **构建与预览生产环境**
    ```bash
    npm run docs:build
    npm run docs:preview
    ```

## 📝 目录结构规范

为了保持项目整洁，文件存放遵循以下规范：

```
.
├── .github/workflows/       # 自动化部署脚本
├── docs/                    # 内容源文件
│   ├── .vitepress/          # 网站核心配置与主题
│   │   ├── config.mjs       # 侧边栏、导航栏配置
│   │   └── theme/           # 自定义组件 (如 AIChat.vue)
│   ├── notes/               # 学习笔记 (.md 文件)
│   │   ├── llm/             # 例如：LLM 学习笔记
│   │   │   └── images/      # ✅ 文章插图存放这里 (相对路径引用)
│   │   └── ...
│   └── public/              # 静态资源 (编译时直接复制到根目录)
│       └── resources/       
│           └── pdf/         # ✅ PDF 下载资源存放这里
├── tina/                    # TinaCMS 配置文件
└── package.json
```

### 资源引用指南
*   **文章插图**: 存放在笔记同级目录下的 `images` 文件夹中，使用相对路径引用。
    *   `![图](../images/pic.png)`
*   **PDF下载**: 存放在 `docs/public/resources/pdf/`。
    *   引用链接: `[下载 PDF](../../resources/pdf/文件名.pdf)` (向上回溯至根目录)

## 🔐 安全说明

本项目使用了 API Key，但采取了**后端分理**的安全策略：
*   ❌ 前端代码中**不包含**任何私有 Key。
*   ✅ 所有 API 请求通过 Cloudflare Worker 转发，Key 存储在 Worker 的加密环境变量 (`SILICONFLOW_API_KEY`) 中。
*   详细指南请参考文档中的 [《实战：如何安全地接入AI》](/notes/web/ai-api-security)。

---
*Created with ❤️ by vivacious1024*
