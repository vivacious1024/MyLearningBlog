# Typst 模板制作

本笔记结合 [Typst 官方教程：Making a Template](https://typst.app/docs/tutorial/making-a-template/)，总结如何创建一个包含页边距、字体设置等格式的可复用模板。

## 核心概念

在 Typst 中，模板本质上是一个**函数**。
这个函数接收文档的内容（`body`）以及其他参数（如标题、作者），并在函数内部应用各种 `set` 和 `show` 规则，最后输出内容。

## 步骤演示

### 1. 创建模板文件 (`template.typ`)

我们创建一个名为 `template.typ` 的文件，定义一个 `project` 函数。

```typst
// template.typ

// 定义 project 函数，接收 title, authors, date 和 body 参数
#let project(
  title: "",
  authors: (),
  date: none,
  body
) = {
  // 1. 设置文档元数据
  set document(author: authors, title: title)

  // 2. 设置页面参数：页边距、页码
  set page(
    paper: "a4",
    margin: (left: 25mm, right: 25mm, top: 25mm, bottom: 25mm),
    numbering: "1",
  )

  // 3. 设置字体和文本格式
  // font 可以是一个列表，优先使用前面的字体，找不到则向后回退
  // "CC-Nought" 是自定义字体，"Microsoft YaHei" 是系统自带字体
  set text(font: ("Linux Libertine", "Microsoft YaHei"), lang: "zh", size: 11pt)
  set par(justify: true) // 两端对齐

  // 4. 显示标题部分
  align(center)[
    #block(text(weight: 700, 1.75em, title))
    #v(1em, weak: true)
    #if date != none {
      text(date)
    }
  ]

  // 5. 显示作者信息
  pad(
    top: 0.5em,
    bottom: 0.5em,
    x: 2em,
    grid(
      columns: (1fr,) * calc.min(3, authors.len()),
      gutter: 1em,
      ..authors.map(author => align(center, strong(author))),
    ),
  )

  // 6. 渲染正文
  body
}
```

#### 关键点解析：
- **`set page(...)`**: 用于设置页面尺寸 (`paper: "a4"`) 和页边距 (`margin`)。
- **`set text(...)`**: 设置全局字体。传入数组时，支持字体回退（fallback），这对于中英文混排非常有用（例如英文用 Linux Libertine，中文用微软雅黑）。
- **`authors.map(...)`**: 动态生成作者列表的布局。

### 2. 使用模板 (`main.typ`)

在你的主文档中，导入并使用这个函数。最方便的方法是使用 `show` 规则。

```typst
// main.typ
#import "template.typ": project

// 使用 show 规则应用模板
// .with() 用于传递这一特定文档的元数据
#show: project.with(
  title: "我的 Typst 论文模板",
  authors: ("Antigravity", "User"),
  date: "2026-01-29",
)

// 下面开始写正文
= 绪论

Typst 是一个能够在这个世纪取代 LaTeX 的排版系统。它编译速度极快，语法简洁。

== 字体测试
English font test. 中文字体测试。

#lorem(50)
```

## 进阶技巧：针对特定部分的格式

如果你希望标题和正文使用不同的字体，可以在模板函数中添加 `show heading` 规则：

```typst
// 在 template.typ 的函数内部添加
show heading: set text(font: "SimHei") // 标题使用黑体
```

如果你希望首行缩进：
```typst
set par(first-line-indent: 2em)
```
注意：Typst 默认首段不缩进，后续段落缩进。如果需要全缩进，可能需要额外通过 `fake-par` 等技巧或检查最新文档支持。

## 文件组织建议

建议将所有通用的 `.typ` 文件放在一个 `library` 或 `modules` 文件夹中，或者对于简单的项目，直接放在同级目录。
