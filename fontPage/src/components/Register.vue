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
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="form.checkPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">注册</el-button>
          </el-form-item>
        </el-form>
        <el-dialog v-model="dialogVisible">
          <span>{{ registerResponse }}</span>
          <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="enterLogin">确认</el-button>
          </template>
        </el-dialog>
        <div class="register-tip" v-if="registerFalse">
          *注册失败:未知的错误,请联系我们!
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userApi from "../api/userController";
export default {
  data() {
    return {
      dialogVisible: false,
      registerResponse: "",
      registerFalse: false,
      form: {
        name: "",
        password: "",
        checkPassword: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "必须为长度 2 到 10 的字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "必须为长度 6 到 16 的字符",
            trigger: "blur",
          },
        ],
        checkPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: this.validatePassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async submitForm() {
      this.$refs.form.validate(async (valid) => {
        try {
          let userName = this.form.name;
          let userPassword = this.form.password;

          let response = await userApi.userRegister(userName, userPassword);
          if (response.status != "undefined" && response.status == 200) {
            this.dialogVisible = true;
            this.registerResponse =
              "注册成功!您的账号为" + response.data["user_id"] + ",请保存!";
          } else {
            this.registerFalse = true;
          }
        } catch (error) {
          this.registerFalse = true;
        }
      });
    },
    enterLogin() {
      this.dialogVisible = false;
      this.$router.push("/login");
    },
    validatePassword(rule, value, callback) {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
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

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.register-tip {
  height: 40px;
  width: 100%;
  padding-left: 80px;
  font-size: 12px;
  color: #c45656;
}
</style>
