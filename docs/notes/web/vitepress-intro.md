---
title: 什么是 VitePress？
---

# 什么是 VitePress？

VitePress 是一个**静态站点生成器 (Static Site Generator, SSG)**，专为构建快速、以内容为中心的网站而设计。简单来说，它能帮你把 Markdown 文档变成一个漂亮、现代化的网站。

它是 VuePress 的“兄弟”项目，但基于更新的 [Vite](https://vitejs.dev/) 构建工具，因此速度更快、更轻量。VitePress 是很多开源文档（包括 Vue.js 官方文档）的首选工具，也非常适合用来搭建个人博客（比如你现在的这个网站！）。

## 核心特性

### 1. 极速的开发体验
得益于 Vite，VitePress 的冷启动几乎是瞬间完成的。无论你的项目有多少页面，开发服务器的启动和热更新（HMR）都快得惊人。你修改了 Markdown 文件，浏览器里几乎立刻就能看到变化。

### 2. Markdown 中心化
你只需要专注于写 Markdown。VitePress 会自动处理导航、侧边栏和页面布局。它还支持 GitHub 风格的表格、代码高亮等各种 Markdown 扩展。

### 3. Vue 驱动
虽然你写的是 Markdown，但你可以在 Markdown 里面直接使用 Vue 组件！这意味着你可以给静态文章添加动态交互功能，比如计数器、图表或者自定义的演示组件。

### 4. 默认主题美观且强大
VitePress 自带了一个默认主题（就是你现在的这个样子），它提供了：
- 响应式布局（手机、平板、电脑都能完美显示）
- 黑暗模式（Dark Mode）切换
- 强大的侧边栏和导航栏配置
- 搜索功能（内置支持）

## VitePress 是如何工作的？

1.  **编写内容**：你在 `docs` 目录下编写 `.md` 文件。
2.  **构建过程**：当你运行 `npm run docs:build` 时，VitePress 会把这些 Markdown 文件编译成静态的 HTML、JavaScript (Vue) 和 CSS 文件。
3.  **结果**：生成的 `docs/.vitepress/dist` 目录就是一个完整的静态网站。你可以把它部署到 GitHub Pages、Vercel 或任何静态资源服务器上。

在开发模式下（`npm run docs:dev`），它是基于 Vite 运行的一个单页应用（SPA），当你点击链接时，页面切换非常丝滑，不会有整页刷新的感觉。

## 开发者视角：它是一个 npm 包

对于开发者来说，VitePress 本质上就是一个 **Node.js 的软件包（Package）**，确实是通过 **npm**（Node Package Manager）来安装和管理的。

我们可以结合项目中的 `package.json` 文件来看：

```json
  "scripts": {
    "docs:dev": "vitepress dev docs",    // 这里调用了 vitepress 命令
    "docs:build": "vitepress build docs", // 构建命令
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.6.4"  // <--- 它就是一个依赖包
  }
```

### 关键点

1.  **作为依赖安装**：
    通常使用 `npm install -D vitepress` 安装。`-D` 表示它是“开发依赖” (`devDependencies`)。因为它只是用来构建网站的工具，你的网站发布后（变成纯 HTML/CSS/JS），并不需要 VitePress 在服务器上运行。

2.  **提供命令行工具 (CLI)**：
    安装后，它提供了一个同名的命令行工具 `vitepress`。我们在 `scripts` 里配置的 `npm run docs:dev`，本质上就是让 npm 去执行 `vitepress dev docs`。

3.  **框架性质**：
    虽然它是一个 npm 包，但我们叫它“框架”，因为它制定了一套规则（比如 `.vitepress` 目录结构、`config.mjs` 配置方式），并帮你处理了底层的构建逻辑（基于 Vite 和 Vue），你只需要按它的规则填充内容。

## 深入了解：打包与发布

你可能好奇，“打包”到底发生了什么？

### 1. 静态预渲染 (Static Pre-Rendering)
当你运行 `npm run docs:build` 时，VitePress 并不是简单地复制文件。它会启动一个 Node.js 进程，像浏览器一样“访问”你的每一个页面，然后把看到的内容“抓取”下来生成纯 HTML 文件。

这样做的好处是：
- **SEO 友好**：搜索引擎可以直接读取 HTML 内容。
- **首屏加载快**：用户打开网页时，看到的是已经渲染好的 HTML，不需要等待 JavaScript 执行。

### 2. 输出目录 (`dist`)
打包完成后，你会发现多了一个目录 `docs/.vitepress/dist`。这个文件夹里装的就是你的**整个网站**。

- 里面有 `.html` 文件（对应你的每篇文章）。
- 还有 `assets` 文件夹，里面是压缩与优化过的 CSS 和 JavaScript 文件。

**只要把这个 `dist` 文件夹里的内容，上传到任何 Web 服务器（nginx, Apache）或者静态托管服务，你的网站就能被全世界访问了。**

### 3. 本地预览 (`preview`)
在把文件上传到服务器之前，你可以在本地模拟真实的服务器环境。
运行 `npm run docs:preview`，它会启动一个本地的小型服务器，托管你的 `dist` 目录。这步很重要，因为它能帮你检查打包后的网站有没有坏链或样式问题（有些问题在 `dev` 模式下可能看不出来）。

### 4. 常见的发布平台
- **GitHub Pages**：完全免费，适合个人博客。如果你的仓库名是 `username.github.io`，配置非常简单。如果你是发布到子路径（如 `/blog/`），需要在 `config.mjs` 里添加 `base: '/blog/'` 配置。
- **Vercel / Netlify**：这两个平台对 VitePress 支持极好，通常只需要连接你的 GitHub 仓库，它们就能自动识别并帮你打包发布，每次你 `git push` 后它们都会自动更新网站。

## 常用命令

在你的项目中，主要的命令都在 `package.json` 里定义好了：

- `npm run docs:dev`：启动本地开发服务器（你正在用这个）。
- `npm run docs:build`：打包构建，生成最终的静态文件。
- `npm run docs:preview`：预览打包后的结果。

---

*这篇文章也是用 VitePress 生成的！*
