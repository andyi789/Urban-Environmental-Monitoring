<!--
 * @Description: 左侧第二个
 * @Author: Ronda
 * @Date: 2022-02-16 09:30:08
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-14 12:00:52
-->
<template>
  <div id="left2"></div>
</template>

<script>
import { Pie } from '@antv/g2plot';
import {get} from '@/utils/request';
export default {
  data() {
    return {
        chartData:[ { type: '分类一', value: 27 },
                    { type: '分类二', value: 25 },
                    ],
        piePlot:null           
    };
  },
  computed: {},
  methods: {
      async loadData(){
          let res=await get('/dashboard/queryDeviceOnlineNumber');
          console.log(res);
          this.chartData=res.data;
          this.init();
    },
    init(){
          this.piePlot = new Pie('left2', {
          appendPadding: 10,
          data:this.chartData,
          angleField: 'value',
          colorField: 'type',
          radius: 0.8,
          label: {
            type: 'outer',
          },
        interactions: [{ type: 'element-active' }],

        });
        this.piePlot.render();
    }
  },
  created() {},
  mounted() {
    // this.init()
    this.loadData();
    },
};
</script>
<style scoped>
#left2 {
  width: 100%;
  height: 100%;
}
</style>