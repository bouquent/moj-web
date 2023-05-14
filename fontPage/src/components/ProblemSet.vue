<template>
  <div class="problemset" style="min-height: 100vh">
    <h1 style="margin: 0">题目列表</h1>
    <div class="filter">
      <el-select
        v-model="selectedTag"
        placeholder="题目类型"
        @change="handleSelect"
      >
        <el-option label="全部" value="0"></el-option>
        <el-option label="数组" value="1"></el-option>
        <el-option label="字符串" value="2"></el-option>
        <el-option label="动态规划" value="3"></el-option>
        <el-option label="回溯" value="4"></el-option>
        <el-option label="分治" value="5"></el-option>
        <el-option label="链表" value="6"></el-option>
        <el-option label="树" value="7"></el-option>
      </el-select>
      <el-select
        v-model="selectedDifficulty"
        placeholder="难度"
        @change="handleSelect"
      >
        <el-option label="全部" value="total"></el-option>
        <el-option label="简单" value="easy"></el-option>
        <el-option label="中等" value="medium"></el-option>
        <el-option label="困难" value="hard"></el-option>
      </el-select>
      <div class="search-container">
        <el-input
          class="search"
          placeholder="请输入搜索内容"
          v-model="searchText"
          @keyup.enter.native="handleSearch"
        ></el-input>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
    </div>
    <el-table :data="problems" border>
      <el-table-column
        prop="id"
        label="题目编号"
        width="120px"
        header-align="center"
      >
        <template #default="{ row }">
          <div class="cell-center">{{ row.problem_id }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="题目名称" header-align="center">
        <template #default="{ row }">
          <div class="cell-center">
            <router-link
              style="text-decoration: none; color: #000"
              :to="`/problems/${row.problem_id}`"
            >
              {{ row.problem_name }}
            </router-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="difficulty"
        label="难度"
        width="70px"
        padding="15px"
        header-align="center"
      >
        <template #default="{ row }">
          <el-tag
            :type="getDifficultyTagType(row.problem_difficulty)"
            style="width: 40px"
            >{{ row.problem_difficulty }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180px" header-align="center">
        <template #default="{ row }">
          <div class="cell-center" v-if="row.is_pass">
            <el-icon style="color: green"><CircleCheck /></el-icon>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="allProblems.length"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { ElInput, ElButton } from "element-plus";
import { CircleCheck } from "@element-plus/icons";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState([
      "allProblemTitle",
      "isVaildLogin",
      "passProblemId",
      "isVaildProblemData",
    ]),
  },
  name: "ProblemSet",
  data() {
    return {
      searchText: "",
      currentPage: 1,
      pageSize: 15,
      selectedTag: "0",
      selectedDifficulty: "total",
      problems: [],
      allProblems: [],
    };
  },
  methods: {
    ...mapActions(["fetchProblems"]),

    handleSelect() {
      this.allProblems = [];
      this.searchText = "";

      let difficulty = this.selectedDifficulty;
      let problemTag = this.selectedTag;

      for (let problemTitle of this.allProblemTitle) {
        if (
          difficulty == "total" ||
          problemTitle.problem_difficulty == difficulty
        ) {
          if (problemTag == "0") {
            this.allProblems.push(problemTitle);
          } else {
            for (let i in problemTitle.problem_type) {
              if (problemTag == problemTitle.problem_type[i]) {
                this.allProblems.push(problemTitle);
              }
            }
          }
        }
      }

      this.initProblems();
    },
    handleSearch() {
      this.allProblems = [];
      this.selectedDifficulty = "total";
      this.selectedTag = "0";

      let searchText = this.searchText;
      for (let problemTitle of this.allProblemTitle) {
        if (
          problemTitle.problem_name.search(searchText) != -1 ||
          problemTitle.problem_id.toString().search(searchText) != -1
        ) {
          this.allProblems.push(problemTitle);
        }
      }

      this.initProblems();
    },
    getDifficultyTagType(difficulty) {
      switch (difficulty) {
        case "easy":
          return "success";
        case "medium":
          return "warning";
        case "hard":
          return "danger";
        default:
          return "info";
      }
    },
    handleCurrentChange(page) {
      // 根据当前页码和每页数据条数计算出需要显示的数据
      const start = (page - 1) * this.pageSize;
      const end = page * this.pageSize;
      this.currentPage = page;
      this.problems = this.allProblems.slice(start, end);
    },
    initProblems() {
      this.problems = this.allProblems.slice(0, this.pageSize);
    },
  },
  async created() {
    try {
      if (this.isVaildProblemData == false) {
        await this.fetchProblems();
        this.allProblems = this.allProblemTitle;
        this.initProblems();
      } else {
        this.allProblems = this.allProblemTitle;
        this.initProblems();
      }
    } catch (error) {
      //获取题目失败
      this.allProblems = [];
    }
  },

  components: {
    ElInput,
    ElButton,
    CircleCheck,
  },
};
</script>

<style scoped>
.filter {
  margin: 20px 0;
  display: flex;
  justify-content: left;
  align-items: center;
}

.search-container {
  display: flex;
  justify-content: flex-end;
  margin-left: 20px;
  width: 250px;
}
.search {
  width: 200px;
}

.cell-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
