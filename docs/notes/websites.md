---
title: 常用网址收藏
---

# 常用网址收藏

这里收集了一些我常用的网站链接。

<div class="website-grid">
  <a href="https://github.com" target="_blank" class="website-card">
    <div class="icon">🐱</div>
    <div class="name">GitHub</div>
  </a>
  <a href="https://stackoverflow.com" target="_blank" class="website-card">
    <div class="icon">🥞</div>
    <div class="name">Stack Overflow</div>
  </a>
  <a href="https://juejin.cn" target="_blank" class="website-card">
    <div class="icon">🪙</div>
    <div class="name">掘金</div>
  </a>
  <a href="https://v2ex.com" target="_blank" class="website-card">
    <div class="icon">🤓</div>
    <div class="name">V2EX</div>
  </a>
  <a href="https://chatgpt.com/" target="_blank" class="website-card">
    <div class="icon">🤖</div>
    <div class="name">ChatGPT</div>
  </a>
  <a href="https://huggingface.co/" target="_blank" class="website-card">
    <div class="icon">🤗</div>
    <div class="name">Hugging Face</div>
  </a>
</div>

<style>
.website-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.website-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 20px 10px;
  text-decoration: none !important;
  transition: all 0.3s ease;
  height: 120px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.website-card:hover {
  transform: translateY(-4px);
  background-color: var(--vp-c-brand-soft);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  border-color: var(--vp-c-brand);
}

.icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-align: center;
}
</style>
