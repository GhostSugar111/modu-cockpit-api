//登录注册路由
//导入express框架
const express = require("express");
//使用express框架创建路由
const router = express.Router();
//导入路由处理函数模块
const loginHandler = require("../router_handle/login");

//导入expressJois模块
const expressJoi = require("@escook/express-joi");

//导入验证规则对象
const { login_limit } = require("../limit/login");

router.post("/register", expressJoi(login_limit), loginHandler.register);
router.post("/login", expressJoi(login_limit), loginHandler.login);

//向外暴露路由
module.exports = router;
