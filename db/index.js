
require('dotenv').config()
console.log(process.env.host)
//导入mysql数据库
const mysql = require("mysql");
//创建数据库连接池
const db = mysql.createPool({
  host: process.env.host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: "modu-cockpit",
});
//向外暴露数据库
module.exports = db;
