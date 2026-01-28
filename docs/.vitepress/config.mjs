import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    }
  },
  title: "我的学习笔记",
  description: "记录学习与成长的技术博客",
  base: '/MyLearningBlog/',
  head: [
    ['script', { async: '', src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }]
  ],
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
            { text: '260120：构造最小位运算数组', link: '/notes/algorithm/260120-Constructing_a_Bitwise_Operation_Array' },
            { text: '260123：移除最小数对使数组有序', link: '/notes/algorithm/260123' },
            { text: '260128：带传送的最小路径成本', link: '/notes/algorithm/260128' }
          ]
        },
        {
          text: 'C++ 学习笔记',
          collapsed: false,
          items: [
            { text: 'STL 全解：数据结构与接口', link: '/notes/cpp/stl_comprehensive' }
          ]
        },
        {
          text: '📚 全栈建站指南',
          collapsed: false,
          items: [
            {
              text: '🌱 基础篇：入门与设计',
              collapsed: false,
              items: [
                { text: '1. VitePress 简介', link: '/notes/web/vitepress-intro' },
                { text: '2. 快速开始：从零搭建', link: '/notes/web/vitepress-setup-guide' },
                { text: '3. 核心概念：路由与结构', link: '/notes/web/structure-and-routing' },
                { text: '4. 外观定制：UI 主题', link: '/notes/web/ui-customization' },
              ]
            },
            {
              text: '✍️ 内容篇：CMS与管理',
              collapsed: true,
              items: [
                { text: '1. 概念：CMS 原理解析', link: '/notes/web/cms-introduction' },
                { text: '2. 对比：纯代码 vs 可视化', link: '/notes/web/wysiwyg-vs-code' },
                { text: '3. 实战：集成 TinaCMS', link: '/notes/web/tinacms-setup' },
                { text: '4. 进阶：Tina 配置详解', link: '/notes/web/tinacms-config-guide' },
              ]
            },
            {
              text: '🧩 功能篇：交互与增强',
              collapsed: true,
              items: [
                { text: '1. 评论系统：方案选型', link: '/notes/web/comment-system-guide' },
                { text: '2. 评论系统：接入 Waline', link: '/notes/web/waline-setup-guide' },
                { text: '3. AI 对话：后端安全接入', link: '/notes/web/ai-api-security.md' },
              ]
            },
            {
              text: '🚀 部署篇：上线与运维',
              collapsed: true,
              items: [
                { text: '1. 机制：更新与部署工作流', link: '/notes/web/static-site-workflow' },
                { text: '2. 实战：发布到 GitHub Pages', link: '/notes/web/github-pages-deploy' },
                { text: '3. 进阶：域名购买与绑定', link: '/notes/web/domain-purchase-guide.md' },
                { text: '4. 迁移：搬家到 Cloudflare Pages', link: '/notes/web/cloudflare-pages-hosting.md' },
                { text: '5. 探索：Cloudflare Workers 入门', link: '/notes/web/cloudflare-workers-guide' },
              ]
            },
            {
              text: '🔧 附录：工具与安全',
              collapsed: true,
              items: [
                { text: 'Git 代理设置指南', link: '/notes/web/git-proxy-guide' },
                { text: 'GitHub 仓库安全分析', link: '/notes/web/github-security-guide' },
              ]
            }
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
            { text: 'HappyLLM打卡1：NLP的基本概念', link: '/notes/llm/happy1.md' },
            { text: 'HappyLLM打卡2：注意力机制', link: '/notes/llm/happy2.md' },
            { text: 'HappyLLM打卡3：编码器与解码器', link: '/notes/llm/happy3.md' }
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
      copyright: 'Copyright © 2024-present | <span id="busuanzi_container_site_pv" style="display:none">总访问量 <span id="busuanzi_value_site_pv"></span> 次</span>'
    }
  }
})
