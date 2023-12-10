const db = require("../db/index.js");
//导入bcrypt.js
const bcrypt = require("bcryptjs");
//导入jwt，用于生成token
const jwt = require("jsonwebtoken");
//导入jwt配置文件，用于加密和解密
const jwtconfig = require("../jwt_config/index.js");

exports.register = (req, res) => {
  //req是前端传过来的数据，res是后端返回给前端的数据
  const reginfo = req.body;
  //判断用户名和密码是否为空
  if (!reginfo.account || !reginfo.password) {
    return res.send({
      status: 1,
      message: "用户名或密码不能为空",
    });
  }
  //判断用户名是否已经被注册
  const sql = "select * from users where account = ?";
  db.query(sql, reginfo.account, (err, results) => {
    //查询失败
    if (err) return res.cc(err);
    //查询成功，但是查询结果不为空
    if (results.length !== 0) {
      console.log(results);
      return res.send({
        status: 1,
        message: "用户名已存在！",
      });
    }
    //使用中间件bcrypt.js对密码进行加密
    reginfo.password = bcrypt.hashSync(reginfo.password, 10); //一参是要加密的密码，二参是加密的长度
    //把账号密码插入到数据库中
    const sql = "insert into users set ?";
    //注册身份
    const identity = "用户";
    //创建时间
    const create_time = new Date();
    db.query(
      sql,
      {
        account: reginfo.account,
        password: reginfo.password,
        identity: identity,
        create_time: create_time,
        status: 0,
      },
      (err, results) => {
        // console.log(results);
        //插入失败
        //affectedRows是影响的行数
        if (err || results.affectedRows !== 1) {
          console.log(err);
          return res.send({
            status: 1,
            message: "注册账号失败！",
          });
        }
        return res.send({
          status: 1,
          message: "注册账号成功！",
        });
      }
    );
  });
};

exports.login = (req, res) => {
  const logininfo = req.body;
  const sql = `select * from users where account=?`;
  db.query(sql, logininfo.account, (err, results) => {
    //查询失败
    if (err) return res.cc(err);
    //查询成功，但是查询结果为空
    if (results.length !== 1) return res.cc("用户名或密码错误！");
    //判断密码是否正确
    const compareResult = bcrypt.compareSync(
      logininfo.password,
      results[0].password
    ); //一参是用户输入的密码，二参是数据库中的密码
    if (!compareResult) return res.cc("用户名或密码错误！");
    //对账号是否冻结进行判断
    if (results[0].status == 1) return res.cc("账号已被冻结，请联系管理员！");
    //登录成功，生成token
    const user = {
      ...results[0],
      password: "",
      iamgeUrl: "",
      create_time: "",
      update_time: "",
    };
    //设置token的有效期
    const tokenStr = jwt.sign(user, jwtconfig.jwtSecretKey, {
      expiresIn: "10h",
    });
    res.send({
      code: 200,
      results: results[0],
      status: 0,
      message: "登录成功！",
      token: "Bearer " + tokenStr,
    });
  });
};
