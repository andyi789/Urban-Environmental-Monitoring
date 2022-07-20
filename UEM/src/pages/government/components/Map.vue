<!--
 * @Description: 中间地图
 * @Author: Ronda
 * @Date: 2022-02-16 09:30:08
 * @LastEditors: Ronda
 * @LastEditTime: 2022-07-01 14:48:41
-->
<template>
  <div id="map"></div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import { get } from "@/utils/request";
import { mapMutations } from "vuex";
import { log } from "@antv/g2plot/lib/utils";
export default {
  data() {
    return {
      map: null,
      deviceData: [],
    };
  },
  computed: {},
  methods: {
    ...mapMutations(["SET_ED"]),
    initMap() {
      AMapLoader.load({
        key: "3f11dbc20f89f3d72011f4d339ae38b2", // 申请好的Web端开发者Key，首次调用 load 时必填
        // version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.DistrictSearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          let vm = this;
          this.map = new AMap.Map("map", {
            //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: 5, //初始化地图级别
            center: [105.602725, 37.076636], //初始化地图中心点位置
            mapStyle: "amap://styles/darkblue",
          });

          // 生成标记点
          this.deviceData.forEach((item) => {
            // item 设备信息-->生成标记点
            // 标记点
            var marker = new AMap.Marker({
              position: item.position, //位置
              //携带数据
              extData: { engineer_id: item.engineer_id, device_id: item.id },
            });

            // 点击标记点的事件处理程序
            var onMarkerClick = function (e) {
              console.log(this);
              // 获取标记点携带的数据
              let obj = this.getExtData();
              // 将获取到的数据保存到vuex的ed中
              // console.log(obj);
              vm.SET_ED(obj);
              //e.target就是被点击的Marker
            };

            // 给标记点绑定点击事件
            marker.on("click", onMarkerClick); //绑定click事件

            // 给地图添加标记点
            this.map.add(marker);
          });

          let polygons = [];
          var opts = {
            subdistrict: 0, //获取边界不需要返回下级行政区
            extensions: "all", //返回行政区边界坐标组等具体信息
            level: "district", //查询行政级别为 市
          };
          let district = new AMap.DistrictSearch(opts);
          district.setExtensions("all");

          district.search("兰州市", function (status, result) {
            // console.log(result);
            vm.map.remove(polygons); //清除上次结果
            polygons = [];
            var bounds = result.districtList[0].boundaries;
            if (bounds) {
              for (var i = 0, l = bounds.length; i < l; i++) {
                //生成行政区划polygon
                var polygon = new AMap.Polygon({
                  strokeWeight: 5,
                  path: bounds[i],
                  fillOpacity: 0.4,
                  fillColor: "#80d8ff",
                  strokeColor: "#0091ea",
                });
                polygons.push(polygon);
              }
            }
            vm.map.add(polygons);
            vm.map.setFitView(polygons); //视口自适应
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async loadDeviceData() {
      let res = await get("/dashboard/findEngineerDeviceTree");
      let temp = [];
      res.data.forEach((item) => {
        // item工程数据
        temp = temp.concat(item.children);
      });
      this.deviceData = temp;
      this.initMap();
    },
  },
  created() {},
  mounted() {
    this.loadDeviceData();
  },
};
</script>
<style scoped>
#map {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>