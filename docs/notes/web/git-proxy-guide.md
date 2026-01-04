---
title: Git 代理设置指南
---

# Git 网络连接问题解决方案

在国内使用 GitHub，经常会遇到 `Connection refused` 或 `OpenSSL SSL_read: Connection was reset` 等错误。这时候我们需要给 Git 配置代理。

## 1. 确认代理端口

首先，你需要打开你的代理软件（梯子），在设置里找到 **“本地端口” (Local Port)**。
常见的端口是 `7890` (Clash), `10809` (v2rayN), `1080` 等。

**假设你的代理端口是 `7890`**。

## 2. 设置 Git 代理

打开终端（Terminal / PowerShell），输入以下命令：

### 全局设置 HTTP/HTTPS 代理

这是最通用的设置，适用于 `git clone https://...` 或 `git push`。

```bash
# 注意把 7890 换成你的实际端口
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

设置成功后，所有的 Git 操作都会通过这个端口转发。

## 3. 取消代理

如果你关掉了梯子，Git 可能会报错连不上网。这时候需要取消代理：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 4. 进阶：如何查看当前配置？

如果你忘了自己设没设过，可以用这个命令查看：

```bash
git config --global --list
```

如果看到 `http.proxy=...` 的字样，说明代理正在生效。

## 5. 进阶：SSH 协议的代理（选读）

如果你使用的是 `git@github.com:...` 这种 SSH 地址，上面的 HTTP 代理设置是**无效**的。
你需要配置 `~/.ssh/config` 文件：

```text
Host github.com
    User git
    ProxyCommand connect -S 127.0.0.1:7890 %h %p
```
*(注意：Windows 下可能需要完整路径的 connect.exe 或者使用其他工具，SSH 代理相对复杂，建议新手优先使用 HTTPS 协议配合上述设置)*
