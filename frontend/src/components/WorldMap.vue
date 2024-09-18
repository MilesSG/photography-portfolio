<template>
  <div class="background-map">
    <div ref="mapContainer" class="map-container"></div>
    <div class="photo-wall">
      <!-- 照片墙内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { feature } from 'topojson-client';

export default {
  name: 'WorldMap',
  data() {
    return {
      visitedProvinces: ['北京', '上海', '辽宁', '福建', '重庆', '浙江', '江苏', '安徽', '山东', '香港', '广东'],
    };
  },
  mounted() {
    this.drawMap();
  },
  methods: {
    async drawMap() {
      const container = this.$refs.mapContainer;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const svg = d3
          .select(container)
          .append('svg')
          .attr('width', width)
          .attr('height', height);

      const topoData = await d3.json('/china_provinces.topo.json');
      const geoData = feature(topoData, topoData.objects.default);

      const projection = d3
          .geoMercator()
          .center([104, 35]) // 调整中心点
          .scale(Math.min(width, height) * 1.1) // 根据屏幕尺寸调整缩放比例
          .translate([width / 2, height / 2]); // 居中显示

      const path = d3.geoPath().projection(projection);

      svg
          .append('g')
          .selectAll('path')
          .data(geoData.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', (d) => this.visitedProvinces.includes(d.properties.name) ? '#39FF14' : '#cccccc')
          .attr('stroke', '#333333')
          .attr('stroke-width', 0.5)
          .on('click', (event, d) => this.handleProvinceClick(d.properties.name)); // 添加点击事件
    },
    handleProvinceClick(provinceName) {
      if (this.visitedProvinces.includes(provinceName)) {
        this.scrollToLocation(provinceName);
      }
    },
    scrollToLocation(location) {
      const element = document.getElementById(`timeline-${location}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
};
</script>
