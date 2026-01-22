const Application = require('@waline/vercel');

// ----------------------------------------------------------------------
// 🐛 【补丁】自动解析 MongoDB 连接字符串
// Waline V3 最新版即使配置了 MONGO_URI 也不识别，必须拆分成 MONGO_DB, MONGO_HOST 等变量。
// 这段代码负责帮它做这件事。
// ----------------------------------------------------------------------
function patchMongoEnv() {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) return;

    try {
        // 简单的解析逻辑 (针对标准 mongodb+srv://user:pass@host/db?opts)
        const url = new URL(uri.replace('mongodb+srv://', 'http://').replace('mongodb://', 'http://'));

        // 1. 设置数据库名 (这是触发 Waline 识别 Mongo 的关键开关!)
        // 如果 URL 里没写数据库名，默认叫 waline
        process.env.MONGO_DB = url.pathname.replace(/^\//, '') || 'waline';

        // 2. 设置主机地址 (去除开头的 user:pass@)
        process.env.MONGO_HOST = url.hostname;

        // 3. 设置端口
        process.env.MONGO_PORT = url.port || '27017';

        // 4. 设置账号密码
        process.env.MONGO_USER = decodeURIComponent(url.username);
        process.env.MONGO_PASSWORD = decodeURIComponent(url.password);

        // 5. 设置认证源 (默认 admin)
        process.env.MONGO_AUTHSOURCE = 'admin';

        console.log(`✅ [Waline补丁] 成功解析 MongoDB 配置: DB=${process.env.MONGO_DB}, Host=${process.env.MONGO_HOST}`);
    } catch (e) {
        console.warn('⚠️ [Waline补丁] 解析 MONGO_URI 失败:', e.message);
    }
}

// 运行补丁
patchMongoEnv();

// 启动 Waline
module.exports = Application({
    env: 'vercel',
    app: 'app',
});
