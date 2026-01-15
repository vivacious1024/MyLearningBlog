import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "我的学习笔记",
  description: "记录学习与成长的技术博客",
  base: '/MyLearningBlog/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/notes/web/vitepress-intro' },
      { text: '随想', link: '/notes/thoughts/' },
      { text: '进入编辑模式', link: '/admin/index.html', target: '_blank' }
    ],

    sidebar: {
      // 统一的【学习笔记】侧边栏
      '/notes/': [
        {
          text: '算法',
          collapsed: false,
          items: [
            { text: '260108：最大方阵和', link: '/notes/algorithm/260108-maximum-matrix-sum' },
          ]
        },
        {
          text: 'Web 建站指南',
          collapsed: false,
          items: [
            { text: '用VitePress搭建主体', link: '/notes/web/vitepress-intro' },
            { text: '实战：从零搭建 VitePress', link: '/notes/web/vitepress-setup-guide' },
            { text: '实战：发布到 GitHub Pages', link: '/notes/web/github-pages-deploy' },
            { text: '附：Git 代理设置指南', link: '/notes/web/git-proxy-guide' },
            { text: '附：GitHub 仓库安全吗？', link: '/notes/web/github-security-guide' },
            { text: '实战：如何安全地接入AI', link: '/notes/web/ai-api-security.md' },
            { text: '实战：域名购买与绑定', link: '/notes/web/domain-purchase-guide.md' },
            { text: '附：Cloudflare Workers 入门', link: '/notes/web/cloudflare-workers-guide' },
            { text: '进阶：搬家到 Cloudflare Pages', link: '/notes/web/cloudflare-pages-hosting.md' },
            { text: '更新与部署', link: '/notes/web/static-site-workflow' },
            { text: '网站的路由与结构', link: '/notes/web/structure-and-routing' },
            { text: 'UI 定制指南', link: '/notes/web/ui-customization' },
          ]
        },
        {
          text: 'CMS 内容管理',
          collapsed: false,
          items: [
            { text: '所见即所得 vs 代码驱动', link: '/notes/web/wysiwyg-vs-code' },
            { text: 'CMS：点击即改的原理与实践', link: '/notes/web/cms-introduction' },
            { text: '实战：集成 TinaCMS', link: '/notes/web/tinacms-setup' },
            { text: 'Tina配置详解: config.ts', link: '/notes/web/tinacms-config-guide' },
          ]
        },
        {
          text: 'Python 学习笔记',
          collapsed: false,
          items: [
            { text: '基础语法', link: '/notes/python/basics' },
            { text: '面向对象', link: '/notes/python/oop' }
          ]
        },
        {
          text: 'LLM 学习笔记',
          collapsed: false,
          items: [
            { text: 'HappyLLM打卡1：NLP的基本概念', link: '/notes/llm/happy1.md' }
          ]
        },
        {
          text: '金融与量化交易',
          collapsed: false,
          items: [
            { text: '金融市场基础', link: '/notes/quant/finance-basics' },
            { text: '量化交易入门', link: '/notes/quant/quantitative-trading' },
            { text: '高频交易详解', link: '/notes/quant/high-frequency-trading' }
          ]
        },
        {
          text: '小笔记',
          collapsed: false,
          items: [
            { text: '“抽象”与“接口”', link: '/notes/tips/abstract-and-interfaces' },
            { text: 'Android结合数据库', link: '/notes/tips/android-database-binding' },
            { text: 'gemini每次更新设置代理端口', link: '/notes/tips/gemini-proxy-settings' },
            { text: 'java自带打包指令', link: '/notes/tips/java-packaging-command' },
            { text: 'linux', link: '/notes/tips/linux-commands' },
            { text: 'markdown常用语法', link: '/notes/tips/markdown-syntax' },
            { text: 'npm install', link: '/notes/tips/npm-install' },
            { text: 'vi编辑器', link: '/notes/tips/vi-editor' },
            { text: 'word快捷键', link: '/notes/tips/word-shortcuts' },
            { text: 'ollama', link: '/notes/tips/ollama-guide' },
            { text: '应用缓存', link: '/notes/tips/app-cache' },
            { text: '学习妙妙小工具', link: '/notes/tips/academic-tools' },
            { text: '安装deb文件', link: '/notes/tips/install-deb-file' },
            { text: '手机快捷键', link: '/notes/tips/mobile-shortcuts' },
            { text: '输入文本框的使用', link: '/notes/tips/input-textbox-usage' },
            { text: '电脑快捷键', link: '/notes/tips/computer-shortcuts' },
          ]
        },
        {
          text: '关于',
          collapsed: true,
          items: [
            { text: '关于本站', link: '/notes/introduction' },
            { text: '关于我', link: '/notes/about' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vivacious1024' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    }
  }
})
