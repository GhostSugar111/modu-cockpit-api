const joi = require("joi");

//string 代表字符串类型
//alphanum() 代表只能是数字或者字母
//min(6) 最小长度为6 max(12) 最大长度为12
//required() 代表必填项
//patten() 代表正则验证

//对账号的验证
const account = joi.string().alphanum().min(6).max(12).required();
//对密码的验证
const password = joi
  .string()
  .pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/)
  .min(6)
  .max(12)
  .required();

//对登录的验证
exports.login_limit = {
  //对req.body的验证
  body: {
    account,
    password,
  },
};
