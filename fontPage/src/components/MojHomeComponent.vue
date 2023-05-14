<template>
  <el-row style="height: 50vh" :gutter="10">
    <el-col :span="16" style="width: 100%">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <div class="swiper-container">
          <swiper
            @swiper="onSwiper"
            class="mySwiper"
            :modules="modules"
            :pagination="{ clickable: true }"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
            :autoplay="{
              delay: 3000,
              disableOnInteraction: false,
            }"
            loop
          >
            <swiper-slide
              ><a href="https://leetcode.cn/" target="_blank"
                ><img src="../assets/leetcode.png" /></a
            ></swiper-slide>
            <swiper-slide
              ><a href="https://www.luogu.com.cn/" target="_blank"
                ><img src="../assets/luogu.png" /></a
            ></swiper-slide>
            <swiper-slide
              ><a href="https://www.lintcode.com/" target="_blank"
                ><img src="../assets/lintcode.png" /></a
            ></swiper-slide>
          </swiper>
          <div
            style="cursor: pointer"
            class="swiper-button-prev"
            slot="button-prev"
            @click="swiperPrev"
          >
            <el-icon><ArrowLeftBold /></el-icon>
          </div>
          <div
            style="cursor: pointer"
            class="swiper-button-next"
            slot="button-next"
            @click="swiperNext"
          >
            <el-icon><ArrowRightBold /></el-icon>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8"
      ><div style="height: 100%; background-color: #fff">
        <Calendar backgroundText language="en" />
      </div>
    </el-col>
  </el-row>
  <el-divider style="margin: 25px; border: none" />

  <el-row style="height: 40vh" :gutter="10">
    <el-col :span="10" style="background-color: #fff"
      ><div style="height: 100%; white-space: nowrap">
        <div class="search-container" style="text-align: left; width: 60%">
          <h2 style="margin-left: 40px; marin-top: 10px; width: 60%">
            题目跳转
          </h2>
          <el-input
            style="margin-left: 40px"
            v-model="inputProblemId"
            placeholder="例:1 可跳转到爬楼梯"
          />
          <div style="margin-left: 40px; margin-top: 10px">
            <el-row>
              <el-col :span="24">
                <el-button type="danger" @click="jumpProblem">跳转</el-button>
                <el-button type="danger" @click="randomJumpProblem"
                  >随机一题</el-button
                ></el-col
              >
            </el-row>
          </div>
        </div>
      </div></el-col
    >
    <el-col :span="14"
      ><div style="height: 100%; background-color: #fff">
        <el-row style="height: 100vh; padding: 5px">
          <el-col :span="8" style="height: 100%"
            ><div class="freestyle" style="height: 100%">
              <img
                src="../assets/jay1.png"
                style="object-fit: contain; max-width: 80%; max-height: 80%"
              />
            </div>
          </el-col>
          <el-col :span="8" style="height: 100%"
            ><div class="freestyle" style="height: 100%">
              <img
                src="../assets/jay2.png"
                style="object-fit: contain; max-width: 80%; max-height: 80%"
              />
            </div>
          </el-col>
          <el-col :span="8" style="height: 100%"
            ><div class="freestyle" style="height: 100%">
              <img
                src="../assets/jay3.png"
                style="object-fit: contain; max-width: 80%; max-height: 80%"
              />
            </div>
          </el-col>
        </el-row></div
    ></el-col>
  </el-row>
</template>

<script>
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import Calendar from "mpvue-calendar";
import { ArrowRightBold, ArrowLeftBold } from "@element-plus/icons";
import "swiper/css";
import "swiper/css/pagination";
import { ref } from "vue";
import problemApi from "../api/problemUtils";

export default {
  data() {
    return {
      input: ref(""),
      mySwiper: null,
      modules: [Pagination, Autoplay],
      inputProblemId: "",
    };
  },
  components: {
    Calendar,
    Swiper,
    SwiperSlide,
    ArrowRightBold,
    ArrowLeftBold,
  },

  methods: {
    onSwiper(swiper) {
      this.mySwiper = swiper; // 初始化swiper
    },
    swiperNext() {
      this.mySwiper.slideNext();
    },
    swiperPrev() {
      this.mySwiper.slidePrev();
    },
    jumpProblem() {
      let problemId = this.inputProblemId;
      this.$router.push(`problems/${problemId}`);
    },
    async randomJumpProblem() {
      let problemCount = await problemApi.getProblemCount();
      let problemId = Math.floor(Math.random() * problemCount) + 1;
      this.$router.push(`problems/${problemId}`);
    },
  },
};
</script>

<style scoped>
.swiper-container {
  background-color: #fff;
  width: 60%;
  height: 100%;
  position: absolute;
}
.mySwiper {
  width: 90%;
  height: 90%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-slide img {
  width: 90%;
  height: 100%;
  cursor: pointer;
  margin-left: 5%;
}

.swiper-pagination-bullet {
  font-size: 20px;
}

.swiper-button-prev {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 0 0px rgba(0, 0, 0, 1);
}

.swiper-button-next {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 0 0px rgba(0, 0, 0, 0.5);
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
</style>
