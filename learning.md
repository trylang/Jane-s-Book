### 安装MySQL

- 启动：`mysql.server start`;
- 启动： `mysql -u root -p`;
- 创建名称为cAuth的数据库： `create database cAuth`;
- 使用名为cAuth的数据库： `use cAuth`;
- 找到项目,切换到路径"/server": `cd server`;
- 运行initdb.js: `node tools/initdb.js`;
- 查询：`select * from cSessionInfo;`;

- 创建表：
    `create table books(
        id int(11) not null auto_increment primary key,
        isbn varchar(20) not null,
        openid varchar(100) not null,
        title varchar(100) not null,
        image varchar(100) not null,
        alt varchar(100) not null,
        publisher varchar(100) not null,
        summary varchar(1000) not null,
        price varchar(100),
        rate float,
        tags varchar(100),
        author varchar(100)
    );`

- 查看表结构： `desc books;`
-


### 安装微信sdk [微信小程序解决方案](https://cloud.tencent.com/solution/la)

- `npm install wafer2-client-sdk --save`;