<!--
 * @Description: 右侧第二个
 * @Author: Ronda
 * @Date: 2022-02-16 09:30:08
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-15 15:51:41
-->
<template>
  <div id="right2"></div>
</template>

<script>
import { Bar } from '@antv/g2plot';
import {get} from '@/utils/request';
const moment = require("moment");
import { mapState } from 'vuex';
export default {
  data() {
    return {
      chartData:[
        // { year: '1951 年', value: 38 },
        // { year: '1952 年', value: 52 },
        // { year: '1956 年', value: 61 },
        // { year: '1957 年', value: 145 },
        // { year: '1958 年', value: 48 },
      ],
      bar:null
    };
  },
  computed: {
    ...mapState(['ed'])
  },
  watch:{
   async ed(){
      await this.loadData();
      this.bar.changeData(this.chartData)
    }
  },
  methods: {
    async loadData(){
      let res=await get('/dashboard/pageQueryTodayData',{
        page: 1,
        pageSize: 20,
        ...this.ed
        // engineer_id: 1,
        // device_id: 3
      });
      res.data.list.forEach(element => {
        element.time=moment(element.insert_time).format('hh:mm');
        element.noise=parseInt(element.noise)
      });
      
      this.chartData=res.data.list;
      //this.init();
    },
    init(){
      this.bar = new Bar('right2', {
      data:this.chartData,
      xField: 'noise',
      yField: 'time',
      seriesField: 'noise',
      legend: {
        position: 'top-left',
    },
  });
    this.bar.render();
    }
  },
  created() {},
  async mounted() {
    await this.loadData()
     this.init();
  },
};
</script>
<style scoped>
#right2 {
  width: 100%;
  height: 100%;
}
</style>