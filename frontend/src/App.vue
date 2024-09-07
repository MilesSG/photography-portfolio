<template>
  <div id="app">
    <PhotoGallery />
    <CommentSection /> <!-- 添加评论区组件 -->
  </div>
</template>

<script>
import PhotoGallery from './components/PhotoGallery.vue';
import CommentSection from './components/CommentSection.vue';

export default {
  components: {
    PhotoGallery,
    CommentSection
  }
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
