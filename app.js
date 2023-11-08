// 导入express框架，创建实例
const express = require("express");
const app = express();
//导入body-parser模块
var bodyParser = require("body-parser");

// 导入cors模块
const cors = require("cors");
//全局挂载cors
app.use(cors());

// parse application/x-www-form-urlencoded
//当extended为false时，键值对中的值就为'String'或'Array'形式，为true时，则可为任何数据类型。
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// 绑定和监听指定主机和端口
app.listen(3007, () => {
  console.log(`http://127.0.0.1:3007`);
});
