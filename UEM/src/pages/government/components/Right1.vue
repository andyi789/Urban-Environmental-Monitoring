<!--
 * @Description: 右侧第一个
 * @Author: Ronda
 * @insert_time: 2022-02-16 09:30:08
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-14 22:23:21
-->
<template>
  <div id="right1"></div>
</template>

<script>
import { Line } from '@antv/g2plot';
import { get } from '@/utils/request.js';
import { mapState} from 'vuex';
const moment = require("moment");
export default {
  data() {
    return {
         chartData:[
          // {
          //   "insert_time": "2010-01",
          //   "humidity": 1998
          // },
          // {
          //   "insert_time": "2010-02",
          //   "humidity": 1850
          // },
          // {
          //   "insert_time": "2010-03",
          //   "humidity": 1720
          // },
          // {
          //   "insert_time": "2010-04",
          //   "humidity": 1818
          // },
          // {
          //   "insert_time": "2010-05",
          //   "humidity": 1920
          // },
          // {
          //   "insert_time": "2010-06",
          //   "humidity": 1802
          // },
          // {
          //   "insert_time": "2010-07",
          //   "humidity": 1945
          // },
          // {
          //   "insert_time": "2010-08",
          //   "humidity": 1856
          // },
          // {
          //   "insert_time": "2010-09",
          //   "humidity": 2107
          // },
          // {
          //   "insert_time": "2010-10",
          //   "humidity": 2140
          // },
        ],
        line:null,
    };
  },
    computed: {
     ...mapState(["ed"]),
  },
  watch:{
    async ed(){
      await this.loadData();
      this.line.changeData(this.chartData);
    },
  },
  methods: {
  async loadData(){
          let res=await get('/dashboard/pageQueryTodayData',{
            page:1,
            pageSize:20,
            ...this.ed,
            // engineer_id: 1,
            // device_id: 3,
          });
            res.data.list.forEach((value)=>{
            value.time=moment(value.insert_time).format('hh:mm');
            value.humidity=+value.humidity;
          })
          this.chartData=res.data.list;
          //this.init();
          },
    init(){
      this.line = new Line('right1', {
      data:this.chartData,
      padding: 'auto',
      xField: 'time',
      yField: 'humidity',
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
    }
  },
  created() {},
  async mounted() {
      await this.loadData();
      this.init()
  },
};
</script>
<style scoped>
#right1 {
  width: 100%;
  height: 100%;
}
</style>