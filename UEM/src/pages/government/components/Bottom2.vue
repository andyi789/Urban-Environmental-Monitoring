<!--
 * @Description: 底部第二个
 * @Author: Ronda
 * @Date: 2022-02-16 09:30:08
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-15 14:59:32
-->
<template>
  <div id="bottom2"></div>
</template>

<script>
import { Column } from '@antv/g2plot';
import {get} from '@/utils/request'
import { mapState } from 'vuex';
export default {
  data() {
    return {
      chartData:[
        // {
        //   name: 'London',
        //   月份: 'Jan.',
        //   月均降雨量: 18.9,
        // },
        // {
        //   name: 'London',
        //   月份: 'Feb.',
        //   月均降雨量: 28.8,
        // },
        // {
        //   name: 'London',
        //   月份: 'Mar.',
        //   月均降雨量: 39.3,
        // },
        // {
        //   name: 'London',
        //   月份: 'Apr.',
        //   月均降雨量: 81.4,
        // },
        // {
        //   name: 'London',
        //   月份: 'May',
        //   月均降雨量: 47,
        // },
        // {
        //   name: 'London',
        //   月份: 'Jun.',
        //   月均降雨量: 20.3,
        // },
        // {
        //   name: 'London',
        //   月份: 'Jul.',
        //   月均降雨量: 24,
        // },
        // {
        //   name: 'London',
        //   月份: 'Aug.',
        //   月均降雨量: 35.6,
        // },
        // {
        //   name: 'Berlin',
        //   月份: 'Jan.',
        //   月均降雨量: 12.4,
        // },
        // {
        //   name: 'Berlin',
        //   月份: 'Feb.',
        //   月均降雨量: 23.2,
        // },
        // {
        //   name: 'Berlin',
        //   月份: 'Mar.',
        //   月均降雨量: 34.5,
        // },
        // {
        //   name: 'Berlin',
        //   月份: 'Apr.',
        //   月均降雨量: 99.7,
        // },
        // {
        //   name: 'Berlin',
        //   月份: 'May',
        //   月均降雨量: 52.6,
        // },
        // {
        //   name: 'Berlin',
        //   月份: 'Jun.',
        //   月均降雨量: 35.5,
        // },
        // {
        //   name: 'Berlin',
        //   月份: 'Jul.',
        //   月均降雨量: 37.4,
        // },
        // {
        //   name: 'Berlin',
        //   月份: 'Aug.',
        //   月均降雨量: 42.4,
        // },
      ],
      stackedColumnPlot:null
    };
  },
  computed: {
    ...mapState(['ed'])
  },
  watch:{
   async ed(){
     await this.loadData()
     this.stackedColumnPlot.changeData(this.chartData)
    }
  },
  methods: {
    async loadData(){
      let res=await get('/dashboard/queryMouthData',{
        ...this.ed
        // engineer_id:1,
        // device_id:3
      });
      this.chartData=res.data;
      //this.init()
    },
    init(){
        this.stackedColumnPlot = new Column('bottom2', {
        data:this.chartData,
        isGroup: true,
        xField: 'date',
        yField: 'value',
        seriesField: 'type',
        /** 设置颜色 */
        //color: ['#1ca9e6', '#f88c24'],
        /** 设置间距 */
        // marginRatio: 0.1,
        label: {
          // 可手动配置 label 数据标签位置
          position: 'middle', // 'top', 'middle', 'bottom'
          // 可配置附加的布局方法
          layout: [
            // 柱形图数据标签位置自动调整
            { type: 'interval-adjust-position' },
            // 数据标签防遮挡
            { type: 'interval-hide-overlap' },
            // 数据标签文颜色自动调整
            { type: 'adjust-color' },
          ],
        },
      });

      this.stackedColumnPlot.render();
          }
  },
  created() {},
  async mounted() {
    await this.loadData()
    this.init()
  },
};
</script>
<style scoped>
#bottom2 {
  width: 100%;
  height: 100%;
}
</style>