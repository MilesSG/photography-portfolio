<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import * as d3 from 'd3';
import { feature } from 'topojson-client'; // 导入 topojson-client 库

export default {
  name: 'WorldMap',
  data() {
    return {
      width: 800,  // 宽度设置
      height: 600, // 高度设置
      visitedProvinces: ['北京', '上海', '辽宁', '福建', '重庆', '浙江','江苏', '安徽', '山东', '香港', '广东'], // 你去过的省份列表，请确保与 GeoJSON 的名称匹配
    };
  },
  mounted() {
    this.drawMap();
  },
  methods: {
    async drawMap() {
      const container = this.$refs.mapContainer;
      const svg = d3
          .select(container)
          .append('svg')
          .attr('width', this.width)
          .attr('height', this.height);

      // 加载 TopoJSON 数据
      const topoData = await d3.json('/china_provinces.topo.json');

      // 将 TopoJSON 数据转换为 GeoJSON 格式
      const geoData = feature(topoData, topoData.objects.default);

      // 创建一个地图投影，以中国为中心
      const projection = d3
          .geoMercator()
          .center([104, 35]) // 设置中国为中心
          .scale(800) // 地图缩放大小，根据需要调整大小
          .translate([this.width / 2, this.height / 2]); // 平移地图

      const path = d3.geoPath().projection(projection);

      // 设置缩放行为
      const zoom = d3.zoom()
          .scaleExtent([1, 8])
          .on('zoom', (event) => {
            svg.selectAll('g').attr('transform', event.transform);
          });

      svg.call(zoom);

      // 绘制地图
      svg
          .append('g')
          .selectAll('path')
          .data(geoData.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', (d) => this.visitedProvinces.includes(d.properties.name) ? '#39FF14' : '#cccccc') // 如果省份在去过的列表中，设置为荧光绿
          .attr('stroke', '#333333')
          .attr('stroke-width', 0.5);
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #ddd;
}
</style>
