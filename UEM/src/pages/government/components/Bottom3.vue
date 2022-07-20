<!--
 * @Description: 底部第三个
 * @Author: Ronda
 * @Date: 2022-02-16 09:30:08
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-15 12:21:28
-->
<template>
  <div id="bottom3"></div>
</template>

<script>
import { DualAxes } from '@antv/g2plot';
import {get} from '@/utils/request';
const moment = require("moment");
export default {
  data() {
    return {
        chartData:[],
        dualAxes:null
    };
  },
  computed: {},
  methods: {
    async loadData(){
      let res=await get('/dashboard/pageQueryTodayData',{
        page: 1,
        pageSize: 20,
        engineer_id: 1,
        device_id: 3
      });
      res.data.list.forEach(element => {
        element.time=moment(element.insert_time).format('hh:mm')
       element.pm10=parseInt(element.pm10)
       element.pm25=parseInt(element.pm25)
        // element.pm25=+element.pm25
      });
      this.chartData=res.data.list;
      this.init()
    },
    init(){
          this.dualAxes = new DualAxes('bottom3', {
          data: [this.chartData, this.chartData],
          xField: 'time',
          yField: ['pm10', 'pm25'],
          geometryOptions: [
            {
              geometry: 'line',
              color: '#5B8FF9',
            },
            {
              geometry: 'line',
              color: '#5AD8A6',
            },
          ],
        });
        this.dualAxes.render();
    }
  },
  created() {},
  mounted() {
    this.loadData()
    //this.init()
  },
};
</script>
<style scoped>
#bottom3 {
  width: 100%;
  height: 100%;
}
</style>