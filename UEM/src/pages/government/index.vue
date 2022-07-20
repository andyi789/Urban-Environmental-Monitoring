<!--
 * @Description: 大屏
 * @Author: Ronda
 * @Date: 2022-02-16 09:30:06
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-15 15:44:52
-->
<template>
  <div>
    <!-- 头部 -->
    <div class="header">智慧城市大气环境监测系统</div>
    <!-- 体部 -->
    <div class="container">
      <!-- 体部上 -->
      <div class="container-top">
        <!-- 左侧 -->
        <div class="container-top-left">
          <div class="charts">
            <Box title="实时温度曲线">
              <template #content>
                <Left1 />
              </template>
            </Box>
          </div>
          <div class="charts">
            <Box title="设备状态分布">
              <template #content> <Left2 /> </template>
            </Box>
          </div>
        </div>
        <div class="container-top-center">
          <Map />
        </div>
        <div class="container-top-right">
          <div class="charts">
            <Box title="实时湿度曲线">
              <template #content> <Right1 /> </template>
            </Box>
          </div>
          <div class="charts">
            <Box title="实时噪声监测">
              <template #content><Right2 /> </template>
            </Box>
          </div>
        </div>
      </div>
      <!-- 体部下 -->
      <div class="container-bottom">
        <div class="charts">
          <Box title="服务事项概览">
            <template #content> <Bottom1 /> </template>
          </Box>
        </div>
        <div class="charts">
          <Box title="监测月报">
            <template #content><Bottom2 /> </template>
          </Box>
        </div>
        <div class="charts">
          <Box title="实时颗粒物曲线">
            <template #content><Bottom3 /> </template>
          </Box>
        </div>
        <div class="charts">
          <Box title="监测视频">
            <template #content><Bottom4 /> </template>
          </Box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Box from "@/components/Box";
import Map from "./components/Map.vue";
import Left1 from "./components/Left1.vue";
import Left2 from "./components/Left2.vue";
import Right1 from "./components/Right1.vue";
import Right2 from "./components/Right2.vue";
import Bottom1 from "./components/Bottom1.vue";
import Bottom2 from "./components/Bottom2.vue";
import Bottom3 from "./components/Bottom3.vue";
import Bottom4 from "./components/Bottom4.vue";
export default {
  components: {
    Box,
    Map,
    Left1,
    Left2,
    Right1,
    Right2,
    Bottom1,
    Bottom2,
    Bottom3,
    Bottom4,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
/* 头部样式 */
.header {
  height: 50px;
  background-image: url("../../assets/layout/header.png");
  background-size: 100% 200px;
  color: white;
  font-size: 24px;
  text-align: center;
  line-height: 46px;
  margin-bottom: 10px;
}
/* 体部样式 */
.container {
  padding-left: 8px;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  // 给图表div设置背景图片
  .charts {
    background-image: url("../../assets/layout/chart_box_bg.png");
    background-size: 100% 100%;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 8px;
  }
  .container-top {
    flex: 2;
    display: flex;
    flex-direction: row;
    .container-top-left,
    .container-top-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      & > * {
        flex: 1;
      }
    }
    .container-top-center {
      flex: 2;
      margin-right: 8px;
      margin-bottom: 8px;
      background-image: url("../../assets/layout/chart_center_box_bg.png");
      background-size: 100% 100%;
    }
  }
  .container-bottom {
    flex: 1;
    display: flex;
    flex-direction: row;
    & > * {
      flex: 1;
    }
  }
}
</style>