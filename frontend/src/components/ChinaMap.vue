<template>
  <div class="china-map">
    <v-chart :option="mapOptions" @click="handleMapClick" autoresize></v-chart>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { use } from 'echarts/core';
import VChart from 'vue-echarts';

// 手动引入 ECharts 各模块
import { CanvasRenderer } from 'echarts/renderers';
import { MapChart, LinesChart, EffectScatterChart } from 'echarts/charts';
import {
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
} from 'echarts/components';

// 注册必须的组件
use([
  CanvasRenderer,
  MapChart,
  LinesChart,
  EffectScatterChart,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
]);

// 修改导入路径，指向本地的 china.json 文件
import chinaGeoJson from '@/assets/map/china.json';

export default defineComponent({
  name: 'ChinaMap',
  components: {
    VChart,
  },
  setup() {
    const mapOptions = ref(null);

    onMounted(() => {
      // 注册地图
      echarts.registerMap('china', chinaGeoJson);

      // 定义一些地点坐标，用于飞线和散点效果
      const geoCoordMap = {
        北京: [116.405285, 39.904989],
        上海: [121.472644, 31.231706],
        重庆: [106.504962, 29.533155],
        厦门: [118.11022, 24.490474],
        新加坡: [103.819836, 1.352083],
        香港: [114.173355, 22.320048],
        // 添加你访问过的其他地点
      };

      // 定义飞线的数据
      const flightData = [
        ['北京', '上海'],
        ['北京', '重庆'],
        ['北京', '厦门'],
        ['上海', '新加坡'],
        ['重庆', '香港'],
        // 添加其他线路
      ];

      // 转换数据格式用于飞线效果
      const convertData = (data) => {
        const res = [];
        for (let i = 0; i < data.length; i++) {
          const fromCoord = geoCoordMap[data[i][0]];
          const toCoord = geoCoordMap[data[i][1]];
          if (fromCoord && toCoord) {
            res.push({
              fromName: data[i][0],
              toName: data[i][1],
              coords: [fromCoord, toCoord],
            });
          }
        }
        return res;
      };

      mapOptions.value = {
        backgroundColor: '#000', // 背景颜色
        tooltip: {
          trigger: 'item',
          formatter: '{b}',
        },
        geo: {
          map: 'china',
          roam: true,
          zoom: 1.2,
          label: {
            show: true,
            color: '#fff',
          },
          itemStyle: {
            areaColor: '#073684',
            borderColor: '#1DE9B6',
            shadowColor: '#1773c3',
            shadowBlur: 20,
          },
          emphasis: {
            label: {
              color: '#fff',
            },
            itemStyle: {
              areaColor: '#0b1c2d',
            },
          },
        },
        series: [
          {
            name: '地点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke',
            },
            label: {
              show: true,
              position: 'right',
              formatter: '{b}',
              color: '#fff',
            },
            symbolSize: 10,
            itemStyle: {
              color: '#ffeb7b',
            },
            data: Object.keys(geoCoordMap).map((name) => ({
              name,
              value: geoCoordMap[name],
            })),
          },
          {
            name: '线路',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: '#fff',
              symbolSize: 3,
            },
            lineStyle: {
              color: '#a6c84c',
              width: 1,
              opacity: 0.6,
              curveness: 0.2,
            },
            data: convertData(flightData),
          },
        ],
      };
    });

    const handleMapClick = (params) => {
      if (params.componentType === 'series') {
        const provinceName = params.name;
        scrollToLocation(provinceName);
      }
    };

    const scrollToLocation = (location) => {
      const element = document.getElementById(`timeline-${location}`);
      if (element) {
        element.scrollIntoView({behavior: 'smooth'});
      } else {
        console.log(`No timeline item found for location: ${location}`);
      }
    };

    return {
      mapOptions,
      handleMapClick,
    };
  },
});
</script>

<style scoped>
.china-map {
  width: 100%;
  height: 600px;
}
</style>
