---
title: 实战：域名购买与绑定指南
---

# 实战：域名购买与绑定指南

你现在可能遇到了 `workers.dev` 在国内访问不稳定的问题，或者觉得 `vivacious1024.github.io` 这个网址太长不够酷。

买一个自己的域名（Domain Name），是成为“站长”的成人礼。

## 1. 该去哪里买？

对于个人开发者，我强烈建议**在国外注册商购买**。

*   **理由**：
    1.  **无需备案**：只要你的服务器不在中国大陆（比如 GitHub Pages, Cloudflare 都在国外），你就**不需要**进行繁琐的 ICP 备案。
    2.  **免实名认证**：很多国外平台只需邮箱即可注册。
    3.  **避免被锁**：国内注册的域名如果解析到国外服务器，有时会面临被“clientHold”（停止解析）的风险。

### 推荐平台

1.  **Cloudflare (首选)**
    *   **优点**：你已经有账号了；**价格透明**（批发价，不赚差价）；自动绑定。
    *   **缺点**：只能用信用卡或 PayPal 支付（不支持支付宝/微信）。
    
2.  **Namesilo / Porkbun**
    *   **优点**：支持**支付宝**；价格便宜；老牌稳定。
    *   **缺点**：界面比较复古（尤其是 Namesilo）。

## 2. 选什么后缀？(.com vs .xyz)

*   **`.com`**：永远的王。最贵（约 $10/年），但最专业，升值空间大。
*   **`.org` / `.net`**：次选，也很专业。
*   **`.xyz` / `.top` / `.me`**：如果不做商业项目，只是玩玩，这些后缀非常便宜（有的首年只要 $1），而且很有极客范儿。

## 3. 购买流程 (以 Namesilo 为例)

如果只有支付宝，Namesilo 是最佳选择：

1.  **注册账号**：去 [Namesilo 官网](https://www.namesilo.com/) 注册。
2.  **搜索域名**：在搜索框输入你想要的名字（比如 `vivacious-blog`）。
3.  **筛选**：它会列出各种后缀的价格。选一个你看着顺眼且便宜的，点 **Add**。
4.  **结账 (Checkout)**：
    *   **Configuration**：把 "Privacy Setting"（隐私保护）选为 **WHOIS Privacy**（这是免费的，一定要选，否则你的电话会被打爆）。
    *   **Payment**：选择 **Alipay (支付宝)** 扫码付款。

## 4. 关键一步：托管到 Cloudflare

买完域名后，为了享受 Cloudflare 的免费 CDN 和 Worker 绑定功能，不管是哪里买的，都建议把“管理权”移交给 Cloudflare。

1.  **登录 Cloudflare** -> 点击 **Add a Site**。
2.  输入你刚买的域名（如 `vivacious-blog.xyz`）。
3.  选择 **Free Plan**（免费套餐）。
4.  **修改 DNS 服务器 (Nameservers)**：
    *   Cloudflare 会给你两个地址（比如 `bob.ns.cloudflare.com` 和 `alice.ns.cloudflare.com`）。
    *   回到你购买域名的网站（如 Namesilo 后台），找到 **NameServers** 设置。
    *   把原来的删掉，填入 Cloudflare 给你的这两个。
5.  等待生效（通常几分钟到几小时）。

## 5. 解决你的两个问题

一旦 Cloudflare 显示你的域名状态为 **Active**，你就可以起飞了：

### A. 解决 Worker 访问问题 (绑定 Worker)
1.  去 Cloudflare -> **Workers & Pages** -> 你的 AI Worker。
2.  点击 **Settings** -> **Triggers**。
3.  点击 **Add Custom Domain**。
4.  填入二级域名（比如 `api.vivacious-blog.xyz`）。
5.  **搞定！** 以后你的代码里 `API_URL` 就填这个新地址。因为它走了你自己的域名，国内通常就能直连了。

### B. 解决博客访问问题 (绑定 Pages)
1.  去 GitHub 仓库 -> Settings -> Pages -> **Custom domain**。
2.  填入你的域名（比如 `blog.vivacious-blog.xyz`）。
3.  GitHub 会自动帮你配置 DNS。
4.  **搞定！** 以后访问你的博客就不用输长长的 github.io 了。
