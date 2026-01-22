# 实战：为 VitePress 接入 Waline 评论系统 (MongoDB + Vercel 终极避坑指南)

Waline 是一款功能强大的评论系统。本教程将带你采用 **Vercel (服务端) + MongoDB Atlas (数据库)** 的免费架构进行部署。

> ⚠️ **前言 (2026年1月更新)**：
> Waline 最新版 (V3) 在 Vercel 上配合 MongoDB Atlas 使用时，对环境变量配置有**非常严格且特殊的要求**。
> 直接填一个 `MONGO_URI` 连接串在最新版中会导致超时或无法连接。**请务必严格按照本教程的“拆分变量法”进行配置。**

---

## 🛠️ 第一步：准备数据库 (MongoDB Atlas)

1. **注册与创建**：

   * 访问 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)，注册并创建一个 **M0 (Free Forever)** 集群。
   * Provider 选 AWS，Region 选离你近的（如 Singapore 或 Tokyo，或者默认 N. Virginia）。
2. **创建数据库用户** (重要！)：

   * 在左侧菜单 **Database Access** -> **Add New Database User**。
   * 用户名：例如 `vivacious1024`。
   * 密码：设置一个简单的密码（避免特殊字符），**记下来！**
   * 权限：Read and write to any database。
3. **设置网络白名单** (至关重要！)：

   * 在左侧菜单 **Network Access** -> **Add IP Address**。
   * **必须**选择 **Allow Access from Anywhere** (IP 地址为 `0.0.0.0/0`)。
   * *原因：Vercel 的服务器 IP 是动态的，必须全开白名单才能连上。*
4. **获取连接信息**：

   * 点击 **Database** -> **Connect** -> **Drivers**。
   * 复制那个 `mongodb+srv://...` 的连接串，我们后面要用脚本解析它。

---

## 🚀 第二步：部署服务端 (Vercel)

我们采用“纯净手动模式”部署，避免官方一键部署可能带来的锁文件冲突。

### 2.1 准备 GitHub 仓库

1. 在 GitHub 新建一个仓库，例如 `my-waline`。
2. 创建 `package.json`：
   ```json
   {
     "name": "waline-service",
     "scripts": {
       "start": "node api/index.js"
     },
     "dependencies": {
       "@waline/vercel": "latest"
     }
   }
   ```
3. 创建 `api/index.js` (注意路径)：
   ```javascript
   const Application = require('@waline/vercel');

   module.exports = Application({
     env: 'vercel',
     app: 'app',
   });
   ```
4. 创建 `vercel.json`：
   ```json
   {
     "version": 2,
     "rewrites": [ { "source": "/(.*)", "destination": "/api/index.js" } ]
   }
   ```

   *将这三个文件提交到 GitHub 仓库。*

### 2.2 解析 MongoDB SRV 地址 (关键步骤！) 🔥

Waline V3 在 Vercel 上**不支持**直接识别 `mongodb+srv://` 协议，会导致连接超时。我们需要把 Atlas 的 SRV 地址解析成真实的主机列表。

**工具脚本：获取配置信息**
在本地创建一个文件 `tool-resolve-srv.js`，填入代码：

```javascript
const dns = require('dns');
// 👇 将此处替换为你的 MongoDB 连接串里 @ 后面的域名
// 例如: mongodb+srv://user:pass@comments.xz1nooo.mongodb.net/...
// 则 domain 填: '_mongodb._tcp.comments.xz1nooo.mongodb.net' (注意前面加 _mongodb._tcp.)
const domain = '_mongodb._tcp.comments.xz1nooo.mongodb.net'; 

console.log('正在解析 SRV...');
dns.resolveSrv(domain, (err, addresses) => {
    if (err) { console.error('失败:', err); return; }
    console.log('✅ 请将以下内容填入 Vercel 环境变量:');
    console.log(`MONGO_HOST: ${JSON.stringify(addresses.map(a => a.name))}`);
    console.log(`MONGO_PORT: ${JSON.stringify(addresses.map(a => a.port))}`);
});
```

运行它：`node tool-resolve-srv.js`。你将得到两个数组，类似于：

* MONGO_HOST: `["ac-xxx-shard-00-00.xxx.net", ...]`
* MONGO_PORT: `[27017, 27017, 27017]`

### 2.3 配置 Vercel 环境变量 (Env Vars)

在 Vercel 导入项目后，进入 **Settings -> Environment Variables**，**逐个添加**以下变量（不要遗漏！）：

| 变量名                     | 值 (示例)                        | 说明                                                                                                               |
| :------------------------- | :------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **MONGO_HOST**       | `["host1.net","host2.net"...]` | **复制刚才脚本解析出的 JSON 数组**                                                                           |
| **MONGO_PORT**       | `[27017,27017,27017]`          | **复制刚才脚本解析出的 JSON 数组**                                                                           |
| **MONGO_DB**         | `waline`                       | 数据库名，自定义                                                                                                   |
| **MONGO_USER**       | `vivacious1024`                | 步骤1创建的数据库用户名                                                                                            |
| **MONGO_PASSWORD**   | `your_password`                | 数据库密码                                                                                                         |
| **MONGO_AUTHSOURCE** | `admin`                        | 固定填 admin                                                                                                       |
| **MONGO_REPLICASET** | `atlas-xxxx-shard-0`           | 副本集名字 (可选，如超时则必须填。可在 Atlas 连接串 `replicaSet=xxx` 参数找到，或用 `nslookup -type=TXT` 查询) |
| **JWT_SECRET**       | `任意复杂字符串`               | **必须填**，用于加密登录态                                                                                   |

**⚠️ 注意：不要添加 `MONGO_URI` 或 `LEAN_ID` 等其他变量，以免干扰配置。**

![](./images/waline_variables.png)
### 2.4 部署与验证

配置好变量后，点击 Vercel 的 **Redeploy**。
部署完成后，访问 `https://你的域名.vercel.app/ui`。

* **成功画面**：出现注册/登录框。第一个注册的人自动成为管理员。
* **失败画面**：页面一直转圈，或出现 `500 Error`。请查看 Vercel Logs。

---

## 💻 第三步：前端接入 (VitePress)

修改 `docs/.vitepress/theme/components/Comment.vue`：

```javascript
import { init } from '@waline/client';
import '@waline/client/style';

// ...
onMounted(() => {
  init({
    el: '#waline',
    // ⚠️ 替换为你部署好的 Vercel 地址
    serverURL: 'https://my-blog-comment.vercel.app', 
    dark: 'html.dark', 
    // ...
  });
});
```

---

## 🩺 故障排查与调试宝典 (Troubleshooting)

如果在部署过程中遇到问题，请对照下表排查。这是基于实战踩坑总结的经验。

### 1. 报错：`500 ResourceRequest timed out`

* **现象**：访问接口一直 pending，最后报 500 超时。数据库连不上。
* **原因 A**：IP 白名单没开。
  * **解法**：去 MongoDB Atlas 确认 Network Access 里有 `0.0.0.0/0`。
* **原因 B**：Waline V3 使用 SRV 协议失败。
  * **解法**：**不要用 MONGO_URI**。必须按照本文 [2.3 节] 使用拆分的 `MONGO_HOST` (数组) + `MONGO_PORT` 方式配置。
* **原因 C**：缺少 `MONGO_REPLICASET`。
  * **解法**：如果是 `timed out` 且地址都对，尝试补上 `MONGO_REPLICASET` 变量。

### 2. 报错：`500 Not initialized`

* **现象**：连上了，但无法服务。Logs 里显示 `leancloud-storage ... Error`.
* **原因**：Waline 没读到 MongoDB 配置，默认回退到了 LeanCloud 模式，但你又没填 LeanCloud 的 key。
* **解法**：
  1. 检查 `MONGO_DB` 变量是否设置（这是开启 Mongo 模式的开关）。
  2. 删除所有 LeanCloud 相关变量（`LEAN_ID` 等）。
  3. 添加 `JWT_SECRET` 变量。

### 3. 报错：`phpass ... Cannot read properties of undefined`

* **现象**：登录时报错。
* **原因**：数据库里的用户数据损坏（可能是在调试期间写入了不完整的 User 记录）。
* **解法**：需要清空数据库里的 `Users` 表。请使用下面的 **清洗脚本**。

---

## 🧰 调试工具箱 (Tools)

将这些脚本保存为 `.js` 文件，在本地 `node xxx.js` 运行，能帮你快速定位问题。

### 工具 1：数据库连通性测试 (`debug-mongo.js`)

*用途：排除 Vercel 环境干扰，测试你的账号密码和 URI 是否正确。*

```javascript
const { MongoClient } = require('mongodb');
// 填入你的完整连接串
const uri = "mongodb+srv://user:pass@cluster0.xxx.mongodb.net/waline?retryWrites=true&w=majority";

async function run() {
    console.log("测试连接中...");
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("✅ 连接成功！账号密码无误。");
        const db = client.db("waline");
        await db.collection('test').insertOne({ date: new Date() });
        console.log("✅ 写入测试成功！");
    } catch (e) {
        console.error("❌ 连接失败:", e.message);
    } finally { await client.close(); }
}
run();
```

### 工具 2：坏入数据清洗脚本 (`clean-db.js`)

*用途：解决登录报错问题，一键清空所有用户，重置系统。*

```javascript
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://user:pass@cluster0.xxx.mongodb.net/waline?retryWrites=true&w=majority";

async function clean() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("waline");
        // 删除 Users 集合
        await db.collection('Users').deleteMany({});
        console.log("✅ 用户表已清空，请重新注册管理员。");
    } catch (e) { console.error(e); } 
    finally { await client.close(); }
}
clean();
```
