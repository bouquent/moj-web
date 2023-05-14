<template>
  <div class="problem-container">
    <el-row>
      <el-col :span="10">
        <div class="problem-description-container">
          <h2 style="margin: 0px">
            {{ problemData.id }}.{{ problemData.title }}
          </h2>
          <el-divider style="margin: 5px" />
          <h4>题目描述</h4>
          <div v-html="problemData.description" style="font-size: 16px"></div>
          <h4>输入格式</h4>
          <div v-html="problemData.inputformat" style="font-size: 16px"></div>
          <h4>输出格式</h4>
          <div v-html="problemData.outputformat" style="font-size: 16px"></div>
          <h4>样例输入</h4>
          <pre>{{ problemData.sampleinput }}</pre>
          <h4>样例输出</h4>
          <pre>{{ problemData.sampleoutput }}</pre>
          <h4>提示</h4>
          <div v-html="problemData.hint" style="font-size: 16px"></div>
        </div>
      </el-col>
      <el-divider direction="vertical" style="margin: 5px; height: 100vh" />
      <el-col :span="13">
        <div class="problem-edit-container">
          <div class="problem-type-container">
            <el-form-item label="语言类型" style="height: 60%; width: 40%">
              <el-select v-model="language" placeholder="请选择">
                <el-option label="C" value="C"></el-option>
                <el-option label="C++" value="C++"></el-option>
                <el-option label="Java" value="Java"></el-option>
                <el-option label="Python" value="Python"></el-option>
                <el-option label="Lua" value="Lua"></el-option>
              </el-select>
            </el-form-item>
            <div class="problem-type-mode">
              <el-icon><WindPower /></el-icon>{{ problemData.mode }}
            </div>
          </div>

          <div class="problem-input-container">
            <div class="problem-line-number-container">
              <textarea
                wrap="off"
                cols="2"
                id="problem-line-number"
                disabled
              ></textarea>
            </div>
            <textarea
              ref="anwerInput"
              class="problem-input-code"
              @input="handleTextareaInput"
              @keydown.tab.prevent="insertTab"
              v-model="answerCode"
              onscroll="document.getElementById('problem-line-number').scrollTop = this.scrollTop;"
              spellcheck="false"
            ></textarea>
          </div>
          <div class="problem-result-container" v-if="showDrawer">
            <div
              class="close-result-container-button"
              style="
                float: right;
                padding: 15px 20px 10px 10px;
                width: 10px;
                height: 10px;
                cursor: pointer;
              "
              @click="closeResultContainer"
            >
              <el-icon><ArrowDownBold /></el-icon>
            </div>
            <el-tabs
              v-model="activeTab"
              class="problem-result-tabs"
              style="width: 100%; height: 100%"
            >
              <el-tab-pane
                label="自测输入"
                name="first"
                style="width: 100%; height: 100%"
              >
                <textarea
                  type="text"
                  class="selftest_input"
                  placeholder="自测输入"
                  v-model="selfTestInput"
                ></textarea>
              </el-tab-pane>
              <el-tab-pane
                label="测试输出"
                name="second"
                class="output-tab"
                style="width: 100%; height: 100%"
              >
                <textarea
                  type="text"
                  class="selftest_input"
                  placeholder="自测输入"
                  v-model="selfTestOutput"
                ></textarea>
              </el-tab-pane>
              <el-tab-pane label="代码运行结果" name="third" class="result-tab">
                <div
                  class="loadding-container"
                  style="width: 100%; height: 100%; margin-top: 40px"
                  v-loading="true"
                  v-if="Loading"
                  element-loading-text="Loading..."
                  :element-loading-spinner="svg"
                  element-loading-svg-view-box="-10, -10, 50, 50"
                  element-loading-background="rgba(122, 122, 122, 0.8)"
                ></div>
                <div
                  v-if="Accept"
                  class="problem-result-div"
                  style="background-color: #f0f9eb"
                >
                  <el-row :gutter="5" style="width: 100%; height: 20%">
                    <el-col :span="8"
                      ><div
                        class="submit-result-type"
                        style="background-color: #e1f3d8; color: #529b2e"
                      >
                        {{ returnData.submitResultType }}
                      </div></el-col
                    >
                    <el-col :span="8"
                      ><div class="time-consumption-ms" style="color: #529b2e">
                        运行时间:{{ returnData.timeConsumptionMs }}
                      </div></el-col
                    >
                    <el-col :span="8"
                      ><div
                        class="memory-consumption-kbs"
                        style="color: #529b2e"
                      >
                        占用内存:{{ returnData.memoryConsumptionKbs }}
                      </div></el-col
                    >
                  </el-row>
                  <el-row style="width: 100%; height: 80%">
                    <el-col :span="24"
                      ><div style="margin-top: 15px; width: 100%; height: 65px">
                        <el-icon
                          style="font-size: 48px; left: 45%; color: #529b2e"
                          ><CircleCheck
                        /></el-icon></div
                    ></el-col>
                  </el-row>
                </div>
                <div
                  v-if="WrongAnswer"
                  class="problem-result-div"
                  style="background-color: #fde2e2"
                >
                  <el-row :gutter="5" style="width: 100%; height: 20%">
                    <el-col :span="6"
                      ><div
                        class="submit-result-type"
                        style="background-color: #fab6b6; color: #dc143c"
                      >
                        {{ returnData.submitResultType }}
                      </div></el-col
                    >
                    <el-col :span="6"
                      ><div class="time-consumption-ms" style="color: #dc143c">
                        运行时间:{{ returnData.timeConsumptionMs }}
                      </div></el-col
                    >
                    <el-col :span="6"
                      ><div
                        class="memory-consumption-kbs"
                        style="color: #dc143c"
                      >
                        占用内存:{{ returnData.memoryConsumptionKbs }}
                      </div></el-col
                    >
                    <el-col :span="6"
                      ><div class="pass-rate" style="color: #dc143c">
                        通过率:{{ returnData.passRate }}
                      </div></el-col
                    >
                  </el-row>
                  <el-row style="width: 100%; height: 80%">
                    <el-col :span="24"
                      ><div
                        class="submit-result-detail"
                        style="color: #dc143c"
                        v-html="returnData.submitResultDetail"
                      ></div
                    ></el-col>
                  </el-row>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="problem-edit-btns">
            <el-button
              class="submit-button"
              type="primary"
              @click="submitCode"
              width="50px"
              >提交</el-button
            >
            <el-button class="self-test-button" @click="testCode" width="50px"
              >自测</el-button
            >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  WindPower,
  ArrowDownBold,
  CircleCheck,
  CircleClose,
} from "@element-plus/icons";

import problemApi from "../api/problemUtils";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["isVaildLogin", "userAccount"]),
  },
  data() {
    return {
      problemId: this.$route.params.id,
      problemData: {
        id: "",
        title: "",
        description: "",
        inputformat: "",
        outputformat: "",
        sampleinput: "",
        sampleoutput: "",
        hint: "",
        mode: "",
      },
      language: "C++",
      answerCode: "",
      selfTestOutput: "",
      selfTestInput: "",
      num: "",
      showDrawer: false,
      activeTab: "third",

      Loading: true,
      Accept: false,
      WrongAnswer: false,
      returnData: {
        submitResultType: "",
        submitResultDetail: "",
        timeConsumptionMs: "",
        memoryConsumptionKbs: "",
        passRate: "",
      },
      svg: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `,
      language_map: {
        C: 1,
        "C++": 2,
        Java: 4,
        Python3: 11,
      },
      result_type_map: {
        3: "运行时错误",
        4: "答案错误",
        5: "通过",
        6: "运行超时",
        7: "内存超限",
        12: "编译错误",
        13: "提交失败",
      },
    };
  },

  methods: {
    async submitCode() {
      this.activeTab = "third";
      this.WrongAnswer = false;
      this.Accept = false;
      this.showDrawer = true;
      this.Loading = true;
      const inputContainer = document.querySelector(".problem-input-container");
      inputContainer.style.height = "60%";
      const editButtonContainer = document.querySelector(".problem-edit-btns");
      editButtonContainer.style.height = "5%";

      const json_data = {
        langId: this.language_map[this.language],
        content: this.answerCode,
        submitType: 1,
      };

      const resultData = await problemApi.submitCode(json_data, this.problemId);
      this.showSubmitResult(resultData);

      if (this.isVaildLogin == true) {
        problemApi.saveHisotrySubmit(
          this.problemId,
          this.problemData.title,
          this.result_type_map[resultData["status"]],
          this.userAccount
        );
      }
    },
    async testCode() {
      this.activeTab = "third";
      this.WrongAnswer = false;
      this.Accept = false;
      this.showDrawer = true;
      this.Loading = true;
      const inputContainer = document.querySelector(".problem-input-container");
      inputContainer.style.height = "60%";
      const editButtonContainer = document.querySelector(".problem-edit-btns");
      editButtonContainer.style.height = "5%";

      console.log(this.selfTestOutput + this.selfTestInput);
      const json_data = {
        langId: this.language_map[this.language],
        content: this.answerCode,
        selfInput: this.selfTestInput,
        selfOutput: this.selfTestOutput,
        submitType: 2,
      };

      const resultData = await problemApi.submitCode(json_data, this.problemId);
      this.showSubmitResult(resultData);
    },
    showSubmitResult(resultData) {
      if (typeof resultData["status"] == "undefined") {
        this.Loading = false;
        this.WrongAnswer = true;
        this.returnData.submitResultType = "请求失败";
        return;
      }
      this.returnData.submitResultType =
        this.result_type_map[resultData["status"]];
      this.returnData.timeConsumptionMs =
        resultData["timeConsumptionMs"] + "Ms";
      this.returnData.memoryConsumptionKbs =
        resultData["memoryConsumptionKbs"] + "Kb";

      if (resultData["status"] == 5) {
        //Accept
        this.Loading = false;
        this.Accept = true;
      } else {
        //Answer Wrong
        let all_case_num = resultData["allCaseNum"];
        let right_case_num = resultData["rightCaseNum"];
        let pass_rate = (right_case_num / all_case_num).toFixed(2) * 100;
        this.returnData.passRate = pass_rate + "%";

        resultData["memo"]["stderr"] = resultData["memo"]["stderr"].replace(
          /\\n/g,
          "<br/>"
        );
        this.returnData.submitResultDetail = resultData["memo"]["stderr"];

        this.Loading = false;
        this.WrongAnswer = true;
      }
    },
    closeResultContainer() {
      this.showDrawer = false;
      const inputContainer = document.querySelector(".problem-input-container");
      inputContainer.style.height = "calc(70% + 20px)";
      const editButtonContainer = document.querySelector(".problem-edit-btns");
      editButtonContainer.style.height = "15%";
    },
    insertTab(event) {
      const start = this.$refs.anwerInput.selectionStart;
      const end = this.$refs.anwerInput.selectionEnd;
      const value = this.$refs.anwerInput.value;

      this.answerCode = value.substring(0, start) + "\t" + value.substring(end);
      this.$nextTick(() => {
        this.$refs.anwerInput.selectionStart =
          this.$refs.anwerInput.selectionEnd = start + 1;
      });

      event.preventDefault();
    },
    handleTextareaInput(e) {
      let str = e.target.value;
      str = str.replace(/\r/gi, "");
      str = str.split("\n");
      let n = str.length;
      let lineobj = document.getElementById("problem-line-number");
      for (let i = 1; i <= n; i++) {
        if (document.all) {
          this.num += i + "\r\n"; //判断浏览器是否是IE
        } else {
          this.num += i + "\n";
        }
      }
      lineobj.value = this.num;
      this.num = "";
    },
  },

  async created() {
    const theProblemData = await problemApi.getProblemData(this.problemId);
    this.problemData = theProblemData;
    this.selfTestOutput = this.problemData.sampleoutput;
    this.selfTestInput = this.problemData.sampleinput;
  },

  components: {
    WindPower,
    ArrowDownBold,
    CircleCheck,
    CircleClose,
  },
};
</script>

<style scoped>
.problem-container {
  background-color: #f5f7fa;
  height: 100vh;
  border: 1px solid #f0f2f5;
}

.problem-description-container {
  padding: 10px;
  background-color: #fff;
  height: calc(100vh - 20px);
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #f0f2f5;
}
.h4 {
  margin: 0px;
}
.problem-edit-container {
  background-color: #fff;
  padding: 10px;
  height: calc(100vh - 20px);
  border-left: 1px solid #f0f2f5;
  position: relative;
}
.problem-type-container {
  width: 90%;
  height: 5%;
  display: flex;
  border: 1px solid #e4e7ed;
  padding: 10px;
}
.problem-type-mode {
  margin-left: 20px;
  padding-top: 10px;
  font-size: 10px;
  color: #909399;
}
.problem-input-container {
  margin-top: 10px;
  display: flex;
  height: calc(70% + 20px);
  width: 95%;
  border: 1px solid #dcdfe6;
}

.problem-input-code {
  padding: 10px 8px;
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 24px;
  color: #0074d9;
  background: #f7f7f7;
  font-family: Consolas;
  border: none;
  box-sizing: border-box;
  outline: none;
  resize: none;
}

.problem-line-number-container {
  width: 20px;
  height: 100%;
  text-align: left;
}

#problem-line-number {
  padding: 10px 4px;
  height: 100%;
  width: 100%;
  line-height: 24px;
  font-size: 14px;
  text-align: right;
  color: #555;
  background: #f7f7f7;
  font-weight: bold;
  resize: none;
  outline: none;
  border: 0;
  border-right: 1px solid #e4e7ed;
  box-sizing: border-box;
  overflow: hidden;
}

.problem-result-container {
  margin-top: 5px;
  margin-bottom: 5px;
  height: calc(25% - 10px);
  width: calc(95% - 10px);
  background-color: #f7f7f7;
  padding-left: 10px;
}

::v-deep .el-tabs__content {
  padding: 0px;
  margin: 0px;
  height: calc(100% - 50px);
}
::v-deep .el-tabs__header {
  width: calc(90% + 10px);
  margin: 0px;
}
.selftest_input {
  margin: 10px;
  width: 80%;
  height: 80%;
  font-size: 14px;
  resize: none;
  border: 2px solid #c6e2ff;
}

.problem-result-div {
  width: calc(90% + 10px);
  height: 100px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.submit-result-type {
  margin: 5px 0px 0px 5px;
  height: 20px;
  font-size: 16px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}
.time-consumption-ms {
  margin: 5px 0px 0px 10px;
  height: 20px;
  font-size: 12px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}
.memory-consumption-kbs {
  margin: 5px 0px 0px 0px;
  height: 20px;
  font-size: 12px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}
.pass-rate {
  margin: 5px 0px 0px 0px;
  height: 20px;
  font-size: 12px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}
.submit-result-detail {
  margin-left: 10%;
  margin-top: 10px;
  padding: 5px;
  width: 90%;
  height: 65px;
  font-size: 12px;
  text-align: left;
  overflow: auto;
}

.problem-edit-btns {
  position: absolute;
  height: 15%;
  width: 100%;
  bottom: 10px;
  right: calc(5% + 10px);
}

.submit-button {
  float: right;
  width: 15%;
  height: 40px;
  margin-left: 10px;
}
.self-test-button {
  float: right;
  width: 15%;
  height: 40px;
}

::-webkit-scrollbar {
  width: 6px; /* 设置滚动条的宽度 */
}

::-webkit-scrollbar-thumb {
  background-color: #d4d4d4; /* 设置滚动条的颜色 */
  border-radius: 3px; /* 设置滚动条的圆角 */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a9a9a9; /* 设置滚动条的悬停颜色 */
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 设置滚动条轨道的背景颜色 */
  border-radius: 3px; /* 设置滚动条轨道的圆角 */
}
</style>
