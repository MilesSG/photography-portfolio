<template>
  <div id="app">
    <h1>Miles 的照片墙</h1>
    <p>欢迎来到我的旅行日记，这里记录了我在世界各地的美好瞬间。</p>
    <WorldMap /> <!-- 在标题和简介下面添加世界地图组件 -->
    <PhotoGallery />
    <CommentSection />
  </div>
</template>

<script>
import PhotoGallery from './components/PhotoGallery.vue';
import CommentSection from './components/CommentSection.vue';
import WorldMap from './components/WorldMap.vue'; // 导入新的 WorldMap 组件

export default {
  components: {
    PhotoGallery,
    CommentSection,
    WorldMap, // 注册 WorldMap 组件
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
