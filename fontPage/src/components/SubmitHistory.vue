<template>
  <div class="submit-history">
    <div style="display: flex; align-items: center">
      <el-icon style="font-size: 18px; height: 18px"><PieChart /></el-icon>
      <h1 style="font-size: 18px; margin-left: 10px">提交记录</h1>
      <font style="font-size: 8px; font-weight: bold" v-if="!this.isVaildLogin">
        (登录后查看)
      </font>
    </div>
    <el-table :data="history" style="width: 100%">
      <el-table-column
        prop="problem_id"
        label="题目ID"
        width="80px"
      ></el-table-column>
      <el-table-column prop="problem_name" label="题目名称"></el-table-column>
      <el-table-column prop="status" label="状态" width="130px">
        <template #default="{ row }">
          <el-tag :type="statusTagType(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        width="180"
        header-align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { PieChart } from "@element-plus/icons";
import { mapState, mapActions } from "vuex";
import problemApi from "../api/problemUtils";

export default {
  computed: {
    ...mapState(["isVaildLogin", "userAccount"]),
  },
  data() {
    return {
      history: [],
    };
  },
  methods: {
    statusTagType(status) {
      if (status === "Accept" || status == "通过") {
        return "success";
      } else {
        return "danger";
      }
    },
  },
  components: {
    PieChart,
  },
  async created() {
    if (this.isVaildLogin == true) {
      //如果处于登录状态就获取历史提交记录
      this.history = await problemApi.getSubmitHistory(this.userAccount);
    }
  },
};
</script>

<style scoped>
.submit-history {
  min-height: 100vh;
}

.oj-history {
  padding: 20px;
}
.title-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
</style>
