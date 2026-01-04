# My Learning Blog 📚

欢迎来到我的个人知识花园！这是一个基于 **VitePress** 构建，并集成 **TinaCMS** 实现可视化管理的现代化技术博客。

🔗 **访问地址**: [https://vivacious1024.github.io/MyLearningBlog/](https://vivacious1024.github.io/MyLearningBlog/)

---

## 🚀 项目亮点

- **极速体验**: 基于 VitePress 构建，秒级加载，SEO 友好。
- **所见即所得**: 集成了 TinaCMS，支持在网页端直接编辑内容并管理图片。
- **自动化部署**: 通过 GitHub Actions 实现 `git push` 即发布。
- **现代化架构**: 采用 "文件即路由" 的设计理念，结构清晰。

## 🛠️ 技术栈

- **框架**: [VitePress](https://vitepress.dev/) (Vue 3 + Vite)
- **CMS**: [TinaCMS](https://tina.io/) (Git-backed Headless CMS)
- **部署**: GitHub Pages + GitHub Actions
- **开发语言**: Markdown, TypeScript, Vue

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
├── docs/                 # 内容源文件 (Markdown)
│   ├── .vitepress/       # 网站配置文件 (Review UI)
│   ├── notes/            # 学习笔记 (Python, Web等)
│   └── public/           # 静态资源 (图片等)
├── tina/                 # CMS 配置文件 (Schema)
└── package.json
```

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来改进这个博客！

---
*Created with ❤️ by vivacious1024*
