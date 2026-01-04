---
title: 实战：集成 TinaCMS
---

# 实战指南：在 VitePress 中集成 TinaCMS

TinaCMS 是一个非常适合 VitePress 的 Git-based CMS。下面是将它“部署”到你项目中的详细步骤。

## 1. 初始化 TinaCMS

在你的项目根目录下，我们需要运行 Tina 的初始化命令。打开终端，输入：

```bash
npx @tinacms/cli@latest init
```

这个命令会引导你完成配置：
1.  **Choose your package manager**: 选择 `npm`。
2.  **What framework are you using?**: 选择 `Other` (因为列表中可能只有 Next/Gatsby 等，VitePress 选 Other 即可)。
3.  **Does your project use TypeScript?**: 建议选 `Yes` (Tina 的配置文件通常是 TS)。
4.  **Where are your public assets stored?**: 输入 `docs/public` (VitePress 的静态资源目录)。

## 2. 发生了什么变化？

运行完命令后，你会发现项目里多了一些东西：

-   **`tina/config.ts`**: 这是 Tina 的核心配置文件。你需要在里面定义你的内容结构（Schema），比如“文章”有哪些字段（标题、日期、内容等）。
-   **`package.json`**: `scripts` 脚本会被自动修改。
    -   原来的 `dev` 可能被改成了 `tinacms dev -c "vitepress dev docs"`。
    -   意思是：先启动 Tina 的后台服务，然后由 Tina 去启动 VitePress。

## 3. 配置内容模型 (Schema)

你需要修改 `tina/config.ts` 来匹配你的博客结构。比如你的博客文章在 `docs/notes` 下，你需要这样配置：

```typescript
schema: {
  collections: [
    {
      name: "notes",
      label: "学习笔记",
      path: "docs/notes", // 指向你的 markdown 文件夹
      fields: [
        {
          type: "string",
          name: "title",
          label: "标题",
          isTitle: true,
          required: true,
        },
        {
          type: "rich-text", // 富文本编辑器
          name: "body",
          label: "内容",
          isBody: true,
        },
      ],
    },
  ],
},
```

## 4. 本地运行

现在，你只需要运行：

```bash
npm run dev
```

你会发现：
1.  终端里会告诉你 CMS 的访问地址，通常是 `http://localhost:3000/admin`。
2.  打开这个地址，你就能看到一个漂亮的后台界面，可以直接编辑你的 `docs/notes` 里的 markdown 文件了！
3.  你在后台做的修改，会直接同步保存到你本地的硬盘文件里。

## 5. 部署上线 (生产环境)

要让这个 CMS 在线上也能用，你需要：

1.  **注册 Tina Cloud**: 去 [app.tina.io](https://app.tina.io) 注册一个账号。
2.  **创建项目**: 连接你的 GitHub 仓库。
3.  **获取密钥**: 拿到 `ClientId` 和 `Token`。
4.  **配置环境变量**: 在你的 Vercel 或 GitHub Actions 里设置这些环境变量。
5.  **构建**: 当你部署网站时，Tina 会把 CMS 的后台界面也一起打包进去。

这样，你访问 `你的域名.com/admin`，就可以用 Tina Cloud 的账号登录，直接在线编辑内容了。

## 常见问题：文件为什么不显示？

如果在 Tina 后台看不到你已有的 Markdown 文件，通常是因为缺少 **Frontmatter（元数据头）**。

TinaCMS 依赖文件头部的 `yaml` 格式元数据来识别文件。比如你的文章必须长这样：

```markdown
---
title: 我的第一篇文章
---

# 我的第一篇文章

这里是正文...
```

如果你的文件开头直接是 `# 标题` 而没有上面的 `---` 包裹的元数据区域，Tina 可能会忽略该文件。所以在引入 Tina 后，记得给现有的所有文章补上这个“身份证”。
