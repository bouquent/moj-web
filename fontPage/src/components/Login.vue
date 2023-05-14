<template>
  <div class="login-container">
    <el-row>
      <el-col :span="8" style="width: 100%">
        <div class="img-container">
          <img
            src="../assets/cat.png"
            style="max-width: 100%; max-height: 100px"
          />
        </div>
      </el-col>
      <el-col :span="16" style="width: 100%">
        <div class="form-container">
          <el-form
            :model="form"
            :rules="rules"
            ref="loginForm"
            label-width="80px"
            class="login-form"
          >
            <el-form-item label="账号" prop="account">
              <el-input
                v-model="form.account"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="login-tip" v-if="loginFalse">
          *登陆失败:{{ loginFalseTip }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loginFalseTip: "",
      loginFalse: false,
      form: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions(["userLogin"]),
    async login() {
      this.$refs.loginForm.validate(async (valid) => {
        try {
          let account = this.form.account;
          let password = this.form.password;
          const response = await this.userLogin({ account, password });
          if (response.status == 200) {
            this.$router.push("/");
          } else if (response.status == 401) {
            (this.loginFalseTip = "密码或账号错误"), (this.loginFalse = true);
          } else {
            (this.loginFalseTip = "未知的错误"), (this.loginFalse = true);
          }
        } catch (error) {
          (this.loginFalseTip = "请求失败"), (this.loginFalse = true);
        }
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);
  width: 100%;
  background-color: #fff;
}
.login-tip {
  height: 40px;
  width: 100%;
  padding-left: 80px;
  font-size: 12px;
  color: #c45656;
}
</style>
