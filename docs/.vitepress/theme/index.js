import DefaultTheme from 'vitepress/theme'
import './style.css'
import { h } from 'vue'
import AIChat from './components/AIChat.vue'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // layout-bottom 插槽允许我们在整个页面布局的最下方注入内容
            // 非常适合放置全局的悬浮组件
            'layout-bottom': () => h(AIChat)
        })
    }
}
