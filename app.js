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

app.use((req, res, next) => {
  //status=0为成功，status=1为失败，默认为1
  res.cc = (err, status = 1) => {
    res.send({
      status,
      //判断err是否是错误对象
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 导入路由模块
const loginRouter = require("./router/login");
app.use("/api", loginRouter);

// 导入jwt验证模块
const jwtconfig = require("./jwt_config/index.js");
const { expressjwt: jwt } = require("express-jwt");
app.use(
  jwt({
    secret: jwtconfig.jwtSecretKey,
    algorithms: ["HS256"],
  }).unless({
    path: [/^\/api\//],
  })
);

//对不符合jois规则的错误进行处理
app.use((req, res, next) => {
  if (err instanceof joi.ValidationError) return res.cc(err);
});

// 绑定和监听指定主机和端口
app.listen(3007, () => {
  console.log(`http://127.0.0.1:3007`);
});
