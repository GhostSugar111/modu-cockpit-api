//导入mysql数据库
const mysql = require("mysql");
//创建数据库连接池
const db = mysql.createPool({
  host: "localhost",
  user: "modu-cockpit",
  password: "123456",
  database: "modu-cockpit",
});
//向外暴露数据库
module.exports = db;
