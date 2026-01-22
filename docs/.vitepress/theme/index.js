import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
import { h } from 'vue'
import AIChat from './components/AIChat.vue'
import Comment from './components/Comment.vue'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // layout-bottom 插槽允许我们在整个页面布局的最下方注入内容
            // 非常适合放置全局的悬浮组件
            'layout-bottom': () => h(AIChat),
            // 文档底部插入评论组件
            'doc-after': () => h(Comment)
        })
    }
}
