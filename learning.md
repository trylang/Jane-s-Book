### 安装MySQL

- 启动： `mysql -u root -p`
- 创建名称为cAuth的数据库： `create database cAuth`;
- 找到项目,切换到路径"/server": `cd server`;
- 运行initdb.js: `node tools/initdb.js`;
- 查询：`select * from cSessionInfo;`;


### 安装微信sdk [微信小程序解决方案](https://cloud.tencent.com/solution/la)

- `npm install wafer2-client-sdk --save`;