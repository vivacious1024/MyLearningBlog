const { MongoClient } = require('mongodb');

// 1. 这里填入您认为正确的连接字符串
// ⚠️ 记得把 url 里的 <password> 替换成真实密码
// ⚠️ 记得在 .net/ 后面加上 waline
// 这里的字符串我预填了您刚才提供的，但请确认它是最终版本
const uri = "mongodb+srv://vivacious1024:111@comments.xz1nooo.mongodb.net/waline?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    console.log("正在尝试连接 MongoDB...");
    console.log(`连接字符串: ${uri.replace(/:([^:@]+)@/, ':****@')}`); // 隐藏密码打印

    const client = new MongoClient(uri, {
        connectTimeoutMS: 5000, // 5秒连不上就报错
        serverSelectionTimeoutMS: 5000
    });

    try {
        await client.connect();
        console.log("✅ 连接成功！(Connected successfully to server)");

        const db = client.db("waline");
        console.log(`正在检查数据库: ${db.databaseName}`);

        // 尝试写入一条测试数据
        const collection = db.collection('test_connection');
        const result = await collection.insertOne({ date: new Date(), msg: "Hello from local test" });
        console.log(`✅ 写入测试数据成功，ID: ${result.insertedId}`);

        // 尝试读取
        const count = await collection.countDocuments();
        console.log(`✅ 当前集合文档数量: ${count}`);

        console.log("\n结论：连接字符串是正确的！\n如果您在 Vercel 上依然报错，说明 Vercel 的环境变量没有更新，或者没有重新部署 (Redeploy)。");

    } catch (err) {
        console.error("\n❌ 连接失败！(Connection failed)");
        console.error("错误详情:", err.message);

        if (err.message.includes('Authentication failed')) {
            console.error("👉 原因：用户名或密码错误。请检查 Atlas Database Access 里的用户密码。");
        } else if (err.message.includes('bad auth : Authentication failed')) {
            console.error("👉 原因：可能是数据库名不对，或者密码错误。");
        } else if (err.code === 'ENOTFOUND') {
            console.error("👉 原因：连接字符串里的域名写错了 (comments.xz1nooo.mongodb.net)。");
        } else {
            console.error("👉 原因：网络问题或 IP 白名单未生效。");
        }
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
