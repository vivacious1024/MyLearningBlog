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
          text: 'Web 建站指南',
          collapsed: false,
          items: [
            { text: '用VitePress搭建主体', link: '/notes/web/vitepress-intro' },
            { text: '实战：从零搭建 VitePress', link: '/notes/web/vitepress-setup-guide' },
            { text: '实战：发布到 GitHub Pages', link: '/notes/web/github-pages-deploy' },
            { text: '附：Git 代理设置指南', link: '/notes/web/git-proxy-guide' },
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
