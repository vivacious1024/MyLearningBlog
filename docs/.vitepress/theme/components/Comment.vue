<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useData, useRoute } from 'vitepress';
import { init } from '@waline/client';
import '@waline/client/style';

// 1. 引入必要的 Hook
const { frontmatter, isDark } = useData();
const route = useRoute();

let walineInstance = null;

// 2. 初始化 Waline 的函数
const initWaline = () => {
    // 如果页面通过 frontmatter 禁用了评论 (comments: false)，则不加载
    if (frontmatter.value.comments === false) return;

    // 稍作延迟确保 DOM 存在
    nextTick(() => {
        const el = document.querySelector('#waline');
        if (!el) return;

        // 销毁旧实例（如果有）
        if (walineInstance) walineInstance.destroy();

        // 创建新实例
        walineInstance = init({
            el: '#waline',
            // ⚠️⚠️⚠️ 请将下面的 URL 替换为您刚才部署的 Vercel 地址 ⚠️⚠️⚠️
            serverURL: 'https://my-blog-comment-fawn.vercel.app', 
            // ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
            
            dark: 'html.dark', // 自动适配暗黑模式
            emoji: [
                '//unpkg.com/@waline/emojis@1.2.0/weibo',
                '//unpkg.com/@waline/emojis@1.2.0/bilibili',
            ],
            // 其他可选配置...
        });
    });
};

// 3. 挂载时初始化
onMounted(() => {
    initWaline();
});

// 4. 路由变化时重新初始化 (因为 VitePress 是 SPA)
watch(() => route.path, () => {
    initWaline();
});

// 5. 卸载时销毁
onUnmounted(() => {
    if (walineInstance) walineInstance.destroy();
});
</script>

<template>
  <div class="comment-container" v-if="frontmatter.comments !== false">
    <!-- 评论区挂载点 -->
    <div id="waline"></div>
  </div>
</template>

<style>
.comment-container {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

/* 调整一下评论区的样式以适应 VitePress */
#waline {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  #waline {
    padding: 0 1.5rem;
  }
}
</style>
