---
title: 路由与目录结构
---

# 核心概念：目录即路由

VitePress 的核心设计哲学之一就是 **“文件系统即路由” (File System Routing)**。这意味着你不需要去配置复杂的路由表，你把文件放在哪里，它的网址链接就是什么。

## 1. 基础映射规则

假设你的项目根目录是 `docs`：

| 文件路径 | 生成的 URL | 说明 |
| :--- | :--- | :--- |
| `docs/index.md` | `/` | 网站首页 |
| `docs/about.md` | `/about.html` | 可以在配置中省略 `.html` |
| `docs/guide/start.md` | `/guide/start.html` | 子目录自动变成 URL 路径 |
| `docs/guide/index.md` | `/guide/` | 目录的默认首页 |

**最佳实践**：
我们推荐使用 **目录+index.md** 的方式来组织复杂的栏目。
例如：`docs/python/index.md` 作为 Python 专栏的入口。

## 2. 推荐的目录结构

对于一个技术博客，我建议你采用以下这种清晰的分层结构：

```
docs/
├── index.md            (首页)
├── about.md            (关于页)
├── notes/              (技术笔记专栏)
│   ├── python/         (Python 子类目)
│   │   ├── basics.md
│   │   └── oop.md
│   └── ai/             (AI 子类目)
│       └── llm.md
└── thoughts/           (随笔专栏)
    ├── 2024-01-01.md
    └── ...
```

## 3. 多侧边栏 (Multiple Sidebars)

当你的内容变多时，你不希望在看 "Python 笔记" 时，侧边栏里混杂着 "随笔" 的文章。
VitePress 支持**根据路径显示不同的侧边栏**。

在 `.vitepress/config.mjs` 中可以这样配置：

```js
sidebar: {
  // 当用户在 /notes/python/ 目录下时，显示这个侧边栏
  '/notes/python/': [
    {
      text: 'Python 基础',
      items: [
        { text: '基础语法', link: '/notes/python/basics' },
        { text: '面向对象', link: '/notes/python/oop' }
      ]
    }
  ],

  // 当用户在 /thoughts/ 目录下时，显示另一个侧边栏
  '/thoughts/': [
    {
      text: '近期随笔',
      items: [
        { text: '新年计划', link: '/thoughts/new-year' }
      ]
    }
  ]
}
```

## 4. 动手时刻：重构你的网站？

目前你的网站所有文章都在 `/notes/` 这一个大目录下。
如果想让结构更清晰，我们可以试着拆分一下：

1.  把关于 VitePress 和 CMS 的教程移动到 `/docs/guide/`（建站指南）。
2.  把 Python 相关的保留在 `/docs/python/`。
3.  把 `config.mjs` 里的侧边栏拆开。

这样你的网站就像一个图书馆，分成了不同的阅览室，互不打扰。
