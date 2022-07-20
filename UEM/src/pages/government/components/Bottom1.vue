<!--
 * @Description: 底部第一个
 * @Author: Ronda
 * @Date: 2022-02-16 09:30:08
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-15 16:21:02
-->
<template>
  <div id="bottom1"></div>
</template>

<script>
import { DualAxes } from '@antv/g2plot';
import {get} from '@/utils/request';
const moment = require("moment");
//import { mapState } from 'vuex';
export default {
  data() {
    return {
        chartData:[],
        dualAxes:null
    }
    },
  computed: {
   // ...mapState(['ed'])
  },
  watch:{
   async ed(){
     await this.loadData();
    // this.dualAxes.changeData(this.chartData);
    }
  },
  methods: {
     async loadData(){
      let res=await get('/dashboard/pageQueryTodayData',{
        page: 1,
        pageSize: 20,
        //...this.ed,
        engineer_id: 1,
        device_id: 3
      });
      res.data.list.forEach(element => {
       element.time=moment(element.insert_time).format('hh:mm')
       element.wind_direction=parseInt(element.wind_direction)
       element.wind_speed=parseInt(element.wind_speed)
        // element.wind_speed=+element.wind_speed
      });
      this.chartData=res.data.list;
      this.init()
    },
    init(){
          this.dualAxes = new DualAxes('bottom1', {
          data: [this.chartData, this.chartData],
          xField: 'time',
          yField: ['wind_direction', 'wind_speed'],
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
    this.loadData();
  },
  //  async mounted() {
  //  await this.loadData();
  //  this.init()
  // },
};
</script>
<style scoped>
#bottom1{
  width: 100%;
  height: 100%;
}
</style>