<template>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <div class="oj-home">
    <el-container style="height: 100%">
      <el-aside>
        <div style="text-align: center">
          <img
            src="./assets/logo.png"
            alt="logo"
            style="max-width: 100%; max-height: 100%"
          />
        </div>
        <div class="e-meun">
          <el-menu default-active="1" class="el-menu-vertical-demo" router>
            <el-menu-item
              index="/problemset"
              :class="{
                'menu-background-green': $route.path === '/problemset',
              }"
            >
              <i class="el-icon-menu"></i>
              <router-link class="menu-router-link" to="/problemset"
                >题库</router-link
              >
            </el-menu-item>
            <el-menu-item
              index="/submit-history"
              :class="{
                'menu-background-green': $route.path === '/submit-history',
              }"
            >
              <i class="el-icon-menu"></i>
              <router-link class="menu-router-link" to="/submit-history"
                >提交记录</router-link
              >
            </el-menu-item>
            <el-menu-item
              index="/login"
              v-if="!isVaildLogin"
              :class="{ 'menu-background-green': $route.path === '/login' }"
            >
              <i class="el-icon-menu"></i>
              <router-link class="menu-router-link" to="/login"
                >登录</router-link
              >
            </el-menu-item>
            <el-menu-item
              index="/register"
              v-if="!isVaildLogin"
              :class="{ 'menu-background-green': $route.path === '/register' }"
            >
              <i class="el-icon-menu"></i>
              <router-link class="menu-router-link" to="/register"
                >注册</router-link
              >
            </el-menu-item>
            <el-menu-item v-if="isVaildLogin" @click="dialogVisible = true">
              <i class="el-icon-menu"></i>
              <button class="menu-exit-button">退出登录</button>
            </el-menu-item>
          </el-menu>
        </div>
        <el-dialog v-model="dialogVisible">
          <span>确认退出吗？</span>

          <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="exitLogin">确认</el-button>
          </template>
        </el-dialog>
      </el-aside>
      <el-container style="height: 100%">
        <el-header>
          <router-link
            to="/"
            style="color: black; font-weight: bold; text-decoration: none"
            >首页</router-link
          >
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
        <el-divider style="margin: 5px; border: none" />
        <el-footer>
          <div style="margin-top: 20px">
            <span style="cursor: pointer; color: #fff">关于我们</span>
            <el-divider direction="vertical" />
            <span style="cursor: pointer; color: #fff">联系我们</span>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
  <div style="clear: both"></div>
</template>

<script>
import MojHomeComponent from "./components/MojHomeComponent.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import SubmitHistory from "./components/SubmitHistory.vue";
import ProblemSet from "./components/ProblemSet.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "MojHome",
  data() {
    return {
      currentComponent: "MojHomeComponent",
      dialogVisible: false,
    };
  },
  components: {
    MojHomeComponent,
    Login,
    Register,
    SubmitHistory,
    ProblemSet,
  },
  methods: {
    ...mapMutations([
      "setisVaildLogin",
      "setpassProblemId",
      "sethistorySubmits",
    ]),
    exitLogin(event) {
      this.setisVaildLogin(false);
      this.setpassProblemId([]);
      this.sethistorySubmits([]);
      this.dialogVisible = false;
    },
  },
  computed: {
    ...mapState(["isVaildLogin", "passProblemId", "historySubmits"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.oj-home {
  background-color: #f5f7fa;
  overflow-x: hidden;
  height: 100%;
}
.el-aside {
  background-color: #34495e;
  width: 100px;
  height: auto;
  overflow: hidden;
  margin: 0px;
}

.el-menu {
  background-color: #34495e;
  text-align: left;
}
.menu-router-link {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}
.menu-exit-button {
  border: 0px;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  background-color: #34495e;
}

.el-header {
  background-color: #fff;
  height: 30px;
  display: flex;
  align-items: center;
}

.el-main {
  position: relative;
  background-color: #fff;
  background-color: #f5f7fa;
  height: 100%;
  overflow: hidden;
}

.el-footer {
  background-color: #333333;
  height: 50px;
  overflow: hidden;
  text-align: center;
}

.el-menu-item:hover {
  background-color: #529b2e;
}

.menu-background-green {
  background-color: green;
}
</style>
