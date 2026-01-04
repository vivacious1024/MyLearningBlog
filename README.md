# 学习笔记博客 - 维护指南

欢迎来到你的个人知识库！这是一个基于 [VitePress](https://vitepress.dev/) 构建的静态网站。
这份指南将帮助你轻松管理和更新你的博客内容。

## 🚀 快速开始

### 1. 启动本地预览
在开始写作前，先启动本地服务器，这样可以实时看到修改效果。
打开终端（命令行），在项目根目录下运行：

```bash
npm run docs:dev
```

启动后，访问终端显示的地址（通常是 http://localhost:5173/）。
> **提示**：修改内容后保存文件，浏览器通过热更新自动刷新，无需重启命令。

---

## ✍️ 如何添加新内容

整个网站的内容都存放在 `docs` 目录下。

### 步骤 1：创建文章
1. 找到内容存放目录 `docs/notes/`（你也可以在这里创建新的文件夹分类）。
2. 新建一个 `.md` (Markdown) 文件，例如在 `docs/notes/python/` 下新建 `web-scraping.md`。
3. 使用 Markdown 语法编写内容。

**示例文件内容：**
```markdown
# Python 爬虫实战

这里是正文内容...
```

### 步骤 2：更新侧边栏菜单
新文件创建后，默认不会自动出现在左侧菜单中，你需要手动告诉网站它的位置。

1. 打开配置文件：`docs/.vitepress/config.mjs`
2. 找到 `sidebar` 配置项。
3. 在对应的分类下添加新文件的链接。

```javascript
// 示例修改：在 items 数组中添加新的一行
items: [
  { text: '基础语法', link: '/notes/python/basics' },
  // 格式：{ text: '菜单显示的名称', link: '/文件夹/文件名(不带.md)' }
  { text: '爬虫实战', link: '/notes/python/web-scraping' }
]
```

---

## 🛠️ 项目结构说明

```text
f:/博客/
├── docs/                # 【核心目录】所有文章都在这里
│   ├── index.md         # 网站主页（封面）配置
│   ├── .vitepress/      # 系统配置目录
│   │   └── config.mjs   # 【核心配置文件】修改菜单、标题、导航栏
│   └── notes/           # 笔记存放目录（你可以随意新建文件夹分类）
│       ├── python/
│       └── ...
├── package.json         # 项目依赖配置
└── README.md            # 本说明文件
```

## 📦 常用命令

- **`npm run docs:dev`**  
  启动本地开发服务器（写作时一直开着这个）。

- **`npm run docs:build`**  
  构建最终的静态网站文件（用于发布），生成的文件在 `docs/.vitepress/dist`。

- **`npm run docs:preview`**  
  预览构建后的结果（检查发布前的最终效果）。
