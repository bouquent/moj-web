import { createStore } from 'vuex';
import problemApi from "../api/problemUtils";
import userApi from "../api/userController";

export default createStore({
  state: {
    allProblemTitle: [],  // 存储所有题目列表
    isVaildProblemData: false, //是否获取过题目列表
    isVaildLogin: false,  // 是否登录
    passProblemId: [],    // 用户通过的题目id
    userAccount:"",
  },
  mutations: {
    setAllProblemTitle(state, allProblemTitle) {
      state.allProblemTitle = allProblemTitle;
    },
    setisVaildProblemData(state, isVaildProblemData) {
      state.isVaildProblemData = isVaildProblemData;
    },
    setisVaildLogin(state, isVaildLogin) {
      state.isVaildLogin = isVaildLogin;
    },
    setpassProblemId(state, passProblemId) {
      state.passProblemId = passProblemId;
      
      if (!Array.isArray(passProblemId)) {
        return;
      }

      let problemIdMap = {};
      for (let problemId of passProblemId) {
        problemIdMap[problemId] = 1;
      }
      for (let problemTitle of state.allProblemTitle) {
        if (problemIdMap[problemTitle.problem_id]) {
          problemTitle.is_pass = true;
        }
      }
    },
    setuserAccount(state, userAccount) {
      state.userAccount = userAccount;
    }
  },

  actions: {
    async fetchProblems({commit}) {  // 异步获取题目列表
      try {
        const allProblemTitle = await problemApi.fetchProblems();
        commit('setAllProblemTitle', allProblemTitle);
        commit('setisVaildProblemData', true);
      } catch (error) {
        commit('setAllProblemTitle', {});
        return error;
      }
    },
    async userLogin({commit}, {account, password}) {
      try {
        let response = await userApi.userLogin(account, password);
        if (typeof response.response != "undefined") {
          //如果返回不是2xx状态码,结果会有区别
          response = response.response;
        }

        if (response.status == 200) {
          commit('setpassProblemId', response.data['pass_problems_id']);
          commit('setisVaildLogin', true);
          commit('setuserAccount', response.data['account']);
        }
        return response;
      } catch(error) {
        commit('setpassProblemId', {});
        commit('setisVaildLogin', false);
        return error;
      }

    }
  },
});
