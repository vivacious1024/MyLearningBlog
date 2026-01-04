---
title: 实战：发布到 GitHub Pages
---

# 实战：将网站发布到 GitHub Pages

现在你的博客已经在本地跑得很欢了，是时候把它发布到互联网上，让全世界都能访问了！
我们将使用 **GitHub Pages** 配合 **GitHub Actions** 来实现全自动部署。

## 1. 准备工作

确保你已经注册了 [GitHub](https://github.com/) 账号，并且本地安装了 Git。

### 检查 .gitignore

在你的项目根目录下，确保有一个名为 `.gitignore` 的文件，并且包含以下内容（如果没有，请新建一个）：

```text
node_modules
dist
.DS_Store
cache
.env.local
```
*这很重要！我们不希望把垃圾文件和生成的 `dist` 文件夹上传到 GitHub。*

## 2. 创建 GitHub 仓库

1.  登录 GitHub，点击右上角的 **+** 号，选择 **New repository**。
2.  **Repository name**: 输入你的项目名（比如 `my-learning-blog`）。
3.  **Public/Private**: 建议选 **Public**（免费且设置简单）。
4.  点击 **Create repository**。

## 3. 推送代码到 GitHub

回到你的本地终端（在项目根目录）：

```bash
# 1. 初始化 Git 仓库
git init

# 2. 添加所有文件
git add .

# 3. 提交第一次记录
git commit -m "first commit"

# 4. 关联远程仓库 (把你刚才创建的仓库地址换到下面)
# 例如: git remote add origin https://github.com/你的用户名/my-learning-blog.git
git remote add origin <你的仓库地址>

# 5. 推送！
git push -u origin main
```
*注意：如果你的主分支叫 master，就把上面的 main 改成 master。*

## 4. 配置自动部署脚本 (GitHub Actions)

为了实现“一定要把大米煮成熟饭（打包）”的自动化，我们需要给 GitHub 一个脚本。

1.  在项目根目录创建文件夹：`.github`
2.  在 `.github` 里创建文件夹：`workflows`
3.  在 `workflows` 里创建文件：`deploy.yml`

**文件路径**: `.github/workflows/deploy.yml`
**文件内容**:

```yaml
# 构建并部署 VitePress 站点到 GitHub Pages
name: Deploy to GitHub Pages

on:
  # 当代码推送到 main 分支时触发
  push:
    branches: [main]
  # 允许在 Actions 页面手动触发
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建任务
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果没开 lastUpdated 可以不加这一行

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署任务
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

*如果你以前没用过 YAML，请务必小心缩进。*

## 5. 开启 GitHub Pages

1.  把上面那个 `deploy.yml` 文件也推送上去：
    ```bash
    git add .
    git commit -m "add deploy workflow"
    git push
    ```
2.  回到 GitHub 仓库页面，点击 **Settings (设置)**。
3.  在左侧侧边栏找到 **Pages**。
4.  在 **Build and deployment** > **Source** 选项中，选择 **GitHub Actions**。 
    *(注意：之前默认可能是 Deploy from a branch，一定要改成 GitHub Actions)*

## 6. 见证奇迹

设置完成后，点击仓库上方的 **Actions** 标签页。
你应该能看到有一个正在旋转的圆圈（Deploy to GitHub Pages）。

等它变成绿色 ✅ 后，点进去，或者再回到 Settings > Pages 页面，你就会看到你的博客网址了！

通常是：`https://你的用户名.github.io/仓库名/`

### ⚠️ 重要提示：路径修正

如果你的网址后面带着仓库名（如 `/my-learning-blog/`），你的 CSS 可能会挂掉。
你需要修改 `.vitepress/config.mjs`，添加 `base` 配置：

```js
export default defineConfig({
  // ... 其他配置
  base: '/my-learning-blog/', // 必须和你的仓库名一致，前后都要有斜杠
})
```
修改完再 push 一次代码，就完美了！
