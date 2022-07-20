<!--
 * @Description: 左侧第一个
 * @Author: Ronda
 * @Date: 2022-02-16 09:30:08
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-15 12:18:51
-->
<template>
  <div id="left1"></div>
</template>

<script>
import { Line } from "@antv/g2plot";
import { get } from "@/utils/request";
import { mapState } from "vuex";
const moment = require("moment");
export default {
  data() {
    return {
      chartData: [],
      line: null,
    };
  },
  computed: {
    ...mapState(["ed"]),
  },
  // 监听器去监听仓库中数据的变化
  watch: {
    async ed() {
      // console.log(this.ed);
      // 发送请求获取数据，更新图表数据
      await this.loadData();
      this.line.changeData(this.chartData);
      // 方案一
      /*  this.loadData(() => {
        this.line.changeData(this.chartData);
      }); */
    },
    /* ed: {
      handler() {
        console.log(this.ed);
      },
      deep: true,
    }, */
  },
  methods: {
    async loadData() {
      let res = await get("/dashboard/pageQueryTodayData", {
        page: 1,
        pageSize: 20,
        ...this.ed,
      });
      res.data.list.forEach((item) => {
        item.time = moment(item.insert_time).format("HH:mm");
        item.temperature = +item.temperature;
        //item.temperature=parseInt(item.temperature)
      });
      this.chartData = res.data.list;
    },
    // 方案一
    /*  async loadData(fun) {
      let res = await get("/dashboard/pageQueryTodayData", {
        page: 1,
        pageSize: 20,
        ...this.ed,
      });
      res.data.list.forEach((item) => {
        // item.time = new Date(item.insert_time).toLocaleTimeString();
        item.time = moment(item.insert_time).format("HH:mm");
        item.temperature = +item.temperature;
      });
      this.chartData = res.data.list;
      // this.init();
      fun();
    }, */

    init() {
      this.line = new Line("left1", {
        data: this.chartData,
        xField: "time",
        yField: "temperature",
        color: "l(90) 0:#D1D1FF 1:#7C82EA",
        xAxis: {
          label: {
            rotate: -45,
            offset: 10,
            style: {
              fill: "#fff",
              fontFamily: "TencentSans",
              fontSize: 12,
            },
          },
        },
        yAxis: {
          label: {
            style: {
              fill: "#fff",
              fontFamily: "TencentSans",
              fontSize: 12,
            },
          },
        },
      });
      this.line.render();
    },
  },
  created() {},
  async mounted() {
    await this.loadData();
    this.init();
    // 方案一
    // this.loadData(this.init);
  },
};
</script>
<style scoped>
#left1 {
  width: 100%;
  height: 100%;
}
</style>