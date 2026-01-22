const { MongoClient } = require('mongodb');

// 您的连接字符串
const uri = "mongodb+srv://vivacious1024:111@comments.xz1nooo.mongodb.net/waline?retryWrites=true&w=majority&appName=Cluster0";

async function cleanUsers() {
    console.log("正在连接数据库清理脏数据...");
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("waline");

        // 1. 查找并删除 Users 集合
        const usersCollection = db.collection('Users'); // 注意 Waline 大小写，一般是 Users
        const count = await usersCollection.countDocuments();

        if (count > 0) {
            console.log(`发现 ${count} 个用户数据，正在清理...`);
            await usersCollection.deleteMany({});
            console.log("✅ 用户数据已清空！请重新注册。");
        } else {
            console.log("用户表是空的，可能是集合名字不对？尝试小写...");
            const usersLower = db.collection('users');
            const countLower = await usersLower.countDocuments();
            if (countLower > 0) {
                await usersLower.deleteMany({});
                console.log("✅ (users) 用户数据已清空！");
            } else {
                console.log("数据库里似乎本身就没有用户数据。");
            }
        }

    } catch (err) {
        console.error("❌ 清理失败:", err.message);
    } finally {
        await client.close();
    }
}

cleanUsers();
