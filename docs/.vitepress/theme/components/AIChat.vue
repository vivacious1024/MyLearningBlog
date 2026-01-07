<script setup>
import { ref, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'

// 初始化 Markdown 解析器
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

// ⚠️⚠️⚠️ 请再次确认地址
const API_URL = "https://ai-proxy.vivacious1024.workers.dev" 

const isOpen = ref(false)
const isLoading = ref(false)
const userInput = ref('')
const messages = ref([
  { 
    role: 'ai', 
    content: '你好！我是你的 AI 助手。',
    html: md.render('你好！我是你的 AI 助手。')
  }
])
const messagesContainer = ref(null)

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    scrollToBottom()
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  const text = userInput.value
  userInput.value = ''
  
  // 用户消息由 Markdown 渲染没啥必要，直接显示文本即可，或者也渲染
  messages.value.push({ role: 'user', content: text, html: md.render(text).replace(/^<p>|<\/p>$/g, '') }) 
  scrollToBottom()

  isLoading.value = true

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: text }] }]
      })
    })

    const data = await response.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "抱歉，我没有理解你的问题。"
    
    // 渲染 Markdown
    messages.value.push({ 
      role: 'ai', 
      content: reply,
      html: md.render(reply)
    })
  } catch (e) {
    console.error(e)
    messages.value.push({ 
      role: 'ai', 
      content: '连接失败',
      html: '连接失败：请检查 API 地址是否正确。'
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>

<template>
  <div class="ai-chat-root">
    <!-- 悬浮按钮 -->
    <button class="chat-toggle-btn" @click="toggleChat" :class="{ 'btn-hidden': isOpen }">
      <span class="icon">✨</span>
    </button>

    <!-- 侧边栏窗口 (无遮罩模式) -->
    <transition name="slide-right">
      <div v-if="isOpen" class="chat-sidebar">
        <!-- 头部 -->
        <div class="sidebar-header">
          <div class="header-title">
            <span class="icon">🤖</span> AI 助手
          </div>
          <button class="close-btn" @click="toggleChat">✕</button>
        </div>
        
        <!-- 消息列表 -->
        <div class="chat-messages" ref="messagesContainer">
          <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
            <div class="avatar">{{ msg.role === 'ai' ? '🤖' : '👤' }}</div>
            <!-- 使用 v-html 渲染 Markdown -->
            <div class="bubble markdown-body" v-html="msg.html"></div>
          </div>
          
          <div v-if="isLoading" class="message ai">
            <div class="avatar">🤖</div>
            <div class="bubble loading">
              <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
            </div>
          </div>
        </div>

        <!-- 输入框区域 -->
        <div class="chat-input-area">
          <textarea 
            v-model="userInput" 
            @keydown.enter.exact.prevent="sendMessage"
            placeholder="输入问题 (Enter 发送, Shift+Enter 换行)..."
          ></textarea>
          <div class="input-actions">
            <button class="send-btn" @click="sendMessage" :disabled="isLoading || !userInput.trim()">
              发送
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* 根容器：防止样式污染全局 */
.ai-chat-root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  /* 关键：允许点击事件穿透根容器，这样不会挡住页面其他部分的操作 */
  pointer-events: none;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 200;
}

/* 悬浮按钮 */
.chat-toggle-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 14px rgba(0,0,0,0.25);
  cursor: pointer;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* 开启点击 */
  pointer-events: auto;
}

.chat-toggle-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.chat-toggle-btn.btn-hidden {
  transform: scale(0);
  opacity: 0;
}

.chat-toggle-btn .icon {
  font-size: 24px;
}

/* 侧边栏 */
.chat-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  max-width: 100vw;
  height: 100vh;
  background: white;
  z-index: 202;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0,0,0,0.15);
  /* 开启点击 */
  pointer-events: auto;
  border-left: 1px solid #eee;
}

/* 头部 */
.sidebar-header {
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
}

.header-title {
  font-weight: 600;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}
.close-btn:hover { background: #eee; }

/* 消息区域 */
.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff;
}

.message {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.message.ai {
  margin-right: 24px;
}

.message.user {
  flex-direction: row-reverse;
  margin-left: 24px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.bubble {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  max-width: 100%;
  overflow-wrap: break-word;
}

.message.ai .bubble {
  background: #f5f7f9;
  border-top-left-radius: 2px;
}

.message.user .bubble {
  background: #667eea;
  color: white;
  border-top-right-radius: 2px;
}

/* 输入区域 */
.chat-input-area {
  padding: 20px;
  border-top: 1px solid #eee;
  background: #fff;
}

textarea {
  width: 100%;
  height: 80px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  display: block;
}

textarea:focus {
  border-color: #667eea;
}

.input-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.send-btn {
  padding: 8px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.send-btn:not(:disabled):hover {
  background: #5a6fd1;
}

/* Markdown 样式微调 (针对气泡内) */
:deep(.markdown-body) {
  font-size: 14px;
}
:deep(.markdown-body p) {
  margin: 0 0 8px 0;
}
:deep(.markdown-body p:last-child) {
  margin-bottom: 0;
}
:deep(.markdown-body pre) {
  background: #282c34; /* 代码块深色背景 */
  color: #abb2bf;
  padding: 10px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 8px 0;
}
:deep(.markdown-body code) {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  background: rgba(0,0,0,0.05);
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.9em;
}
.message.user :deep(.markdown-body code) {
  background: rgba(255,255,255,0.2); /* 用户气泡里的代码块背景稍微亮一点 */
  color: white;
}
.message.user :deep(.markdown-body) {
  color: white; /* 确保用户气泡里的文字是白的 */
}

/* 动画 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active { transition: transform 0.3s ease-out; }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }

/* 加载动画 */
.loading .dot { display: inline-block; animation: bounce 1.4s infinite ease-in-out both; }
.loading .dot:nth-child(1) { animation-delay: -0.32s; }
.loading .dot:nth-child(2) { animation-delay: -0.16s; }
@keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
</style>
