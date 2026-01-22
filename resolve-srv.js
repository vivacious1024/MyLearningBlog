const dns = require('dns');

const domain = '_mongodb._tcp.comments.xz1nooo.mongodb.net';

console.log('正在解析 SRV...');
dns.resolveSrv(domain, (err, addresses) => {
    if (err) {
        console.error('解析失败:', err);
        return;
    }

    console.log('✅ 解析成功！这是您的 Vercel 需要填的配置信息：');
    console.log('------------------------------------------------');

    // 1. 生成 MONGO_HOST
    const hosts = addresses.map(a => a.name);
    console.log(`MONGO_HOST: ${JSON.stringify(hosts)}`);

    // 2. 生成 MONGO_PORT
    const ports = addresses.map(a => a.port);
    console.log(`MONGO_PORT: ${JSON.stringify(ports)}`);

    console.log('------------------------------------------------');
    console.log('⚠️ 注意：MONGO_REPLICASET 名字通常是 atlas-xxxx-shard-0');
    console.log('您可以在连接 Atlas 时，在那串 mongodb+srv 里的 replicaSet=xxxx 参数找到它。');
    console.log('如果没有，通常可以不填 replicaSet 试试。');
});
