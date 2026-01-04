---
title: UI 定制指南
---

# VitePress 的 UI 设计能力

你问得很对，在 VitePress 中，绝大多数的 UI 调整确实都发生在 `.vitepress/config.mjs` 和 Markdown 文件本身。

VitePress 奉行 **"Content-First (内容优先)"** 的设计理念，所以它并没有像 WordPress 那样花哨的拖拽皮肤功能，而是提供了一套**高度标准化、干净且耐看**的默认主题。

我们能控制的 UI 元素主要分为以下几类：

## 1. 首页布局 (Hero & Features)

这是用户进入网站看到的第一眼。它不是通过 HTML 写的，而是在 `index.md` 的 Frontmatter（头部配置）里定义的。

```yaml
---
layout: home

hero:
  name: "我的酷炫标题"
  text: "副标题写在这里"
  tagline: "一句打动人心的标语"
  image:
    src: /logo.png
    alt: Logo
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com

features:
  - title: feature A
    details: 详情介绍...
    icon: ⚡️
  - title: feature B
    details: 详情介绍...
    icon: 📦
---
```

**你能改的**：文字、按钮颜色（brand/alt）、Logo 图片、下方的三栏特性介绍。

## 2. 导航栏 (Navbar)

位于页面最顶部，在 `config.mjs` 的 `themeConfig.nav` 中配置。

-   **普通链接**：`{ text: '首页', link: '/' }`
-   **下拉菜单**：`{ text: '更多', items: [...] }`
-   **高亮当前项**：VitePress 会自动识别 URL 并高亮对应的菜单。

## 3. 侧边栏 (Sidebar)

位于页面左侧，文档站的灵魂。在 `config.mjs` 的 `themeConfig.sidebar` 中配置。

-   **分组**：`{ text: '组名', items: [...] }`
-   **折叠**：可以设置 `collapsed: true` 让侧边栏默认作为折叠菜单。

## 4. 全局提示框 (Callouts / Admonitions)

这是在文章正文中用来高亮重要信息的 UI 组件，非常漂亮且实用。
直接在 Markdown 里使用 `:::` 语法：

```markdown
::: info
这是一个普通的提示信息。
:::

::: tip
这是一个绿色的成功/技巧提示。
:::

::: warning
这是一个黄色的警告。
:::

::: danger
这是一个红色的危险警告！
:::
```

## 5. 徽章 (Badges)

如果你想给某个标题打个标签（比如“新功能”或“测试版”），可以用内置的 `<Badge>` 组件：

```markdown
# 这是一个标题 <Badge type="tip" text="推荐" />
# 这是一个标题 <Badge type="warning" text="Beta" />
```

## 6. 自定义 CSS

如果默认的样式不能满足你（比如想换个主题色，或者把按钮改成圆角），你可以创建 `.vitepress/theme/index.css`。

VitePress 使用 **CSS 变量**系统，所以改主题色非常简单，不需要重写大量 CSS：

```css
:root {
  --vp-c-brand-1: #646cff; /* 主色调 */
  --vp-c-brand-2: #747bff; /* 浅一点的主色调 */
}
```

## 总结

-   **大框架**（导航、侧边栏、页脚）：在 `config.mjs` 改。
-   **首页**：在 `index.md` 改。
-   **文章内的漂亮框框**：用 `::: tip` 语法。
-   **微调颜色/样式**：写 CSS 覆盖变量。
