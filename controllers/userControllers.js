let pg = require("../DB/pg");

async function register(req, res) {
  let password = req.body.password;
  let name = req.body.name;
  let sql = "select create_user($1, $2);";
  let result = await pg.query(sql, [password, name]);
  if (result.rows.length != 1) {
    //注册失败
    res.status(501).send("register account failed! Please contact us!");
  }
  let ret_data = {
    user_id: result.rows[0]["create_user"],
  };
  res.status(200).send(ret_data);
}

function isIntString(str) {
  return /^\d+$/.test(str);
}

async function sign(req, res) {
  try {
    let account = req.body.account;
    let password = req.body.password;
    let result = {};
    if (isIntString(account)) {
      result = await pg.query(
        "select user_password,pass_problems_id from moj_user where user_account = $1",
        [account]
      );
    } else {
      result = await pg.query(
        "select user_account, user_password,pass_problems_id from moj_user where user_name = $1",
        [account]
      );
    }
    if (result.rows.length != 1) {
      //账号或者密码错误
      res.status(401).send("account or password wrong!");
      return -1;
    }
    let user_data = result.rows[0];
    if (user_data["user_password"] != password) {
      //账号或者密码错误
      res.status(401).send("account or password wrong!");
      return -1;
    }

    res.setHeader("Content-Type", "application/json");
    const ret_data = {
      pass_problems_id: user_data["pass_problems_id"],
      account: user_data["user_account"],
    };
    res.status(200).send(ret_data);
  } catch (error) {
    res.status(501).send("");
  }
}

module.exports = {
  register,
  sign,
};
