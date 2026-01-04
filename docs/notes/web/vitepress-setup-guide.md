---
title: 实战：从零搭建 VitePress 博客
---

# 实战：从零搭建 VitePress 博客

这篇文章将还原我们今天搭建这个博客网站的全过程。如果你也想拥有一个像这样干净、现代化的技术博客，跟着做就可以了！

## 1. 环境准备

首先，确保你的电脑上安装了 **Node.js**。
打开终端（Terminal 或 PowerShell），输入以下命令检查：

```bash
node -v
# 输出 v18.x.x 或更高版本即可
```

## 2. 初始化项目

找一个你喜欢的文件夹（比如 `my-blog`），并在终端中进入该目录。

### 第一步：初始化 package.json

```bash
npm init -y
```
这会生成一个默认的 `package.json` 文件，它是 Node.js 项目的身份证。

### 第二步：安装 VitePress

```bash
npm install -D vitepress
```
这会将 VitePress 作为开发依赖（Dev Dependencies）安装到你的项目中。

### 第三步：使用向导快速配置

VitePress 提供了一个非常贴心的初始化向导。运行：

```bash
npx vitepress init
```

接下来，终端会问你几个问题，你可以参考我的回答：

1.  **Where should VitePress initialize the config?**
    -   直接回车（默认 `./`）。
2.  **Site title:**
    -   输入你的博客名称，比如 `我的学习笔记`。
3.  **Site description:**
    -   输入一句话简介，比如 `记录技术成长`。
4.  **Theme:**
    -   选择 `Default Theme`（默认主题）。
5.  **Use TypeScript for config and theme files?**
    -   建议选 `Yes`（虽然我们今天用了 JavaScript，但在现代前端开发中 TS 是趋势）。
6.  **Add VitePress npm scripts to package.json?**
    -   一定要选 **Yes**！这会自动帮你配置好启动命令。

## 3. 启动项目

向导完成后，你只需要运行：

```bash
npm run docs:dev
```

如果一切顺利，你会看到终端提示：
`➜  Local:   http://localhost:5173/`

在浏览器打开这个地址，你的博客就已经跑起来了！🎉

## 4. 目录结构解析

此时你的项目结构应该是这样的：

```
.
├─ docs/
│  ├─ .vitepress/
│  │  └─ config.mjs   <-- 核心配置文件（导航栏、侧边栏都在这改）
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md        <-- 网站首页
└─ package.json
```

-   **所有文章都写在 `docs` 目录下**。
-   **所有配置都在 `docs/.vitepress/config.mjs` 里**。

## 5. 基础配置入门

打开 `.vitepress/config.mjs`，你可以开始定制你的网站。

### 修改导航栏 (Nav)

```js
themeConfig: {
  nav: [
    { text: '首页', link: '/' },
    { text: '我的笔记', link: '/notes/python/basics' }
  ]
}
```

### 修改侧边栏 (Sidebar)

```js
themeConfig: {
  sidebar: [
    {
      text: 'Python 学习',
      items: [
        { text: '基础语法', link: '/notes/python/basics' },
        { text: '面向对象', link: '/notes/python/oop' }
      ]
    }
  ]
}
```

## 6. box 开始写作！

现在，你只需要在 `docs` 目录下创建新的 `.md` 文件（比如 `docs/hello.md`），然后访问 `http://localhost:5173/hello`，就能看到你的新文章了。

这就是搭建一个现代化静态博客的全部核心步骤。是不是比想象中简单很多？
