<template>
  <div class="photo-gallery">
    <!-- 页面标题和描述部分 -->
    <header class="header">
      <h1>Miles 的照片墙</h1>
      <p>欢迎来到我的旅行日记，这里记录了我在世界各地的美好瞬间。</p>
    </header>

    <!-- 新西兰照片展示 -->
    <div class="section">
      <h2>New Zealand</h2>
      <div class="gallery">
        <div v-for="(photo, index) in newZealandPhotos" :key="'nz' + index" class="photo-card">
          <img :src="photo" alt="New Zealand Photo" />
        </div>
      </div>
    </div>

    <!-- 重庆照片展示 -->
    <div class="section">
      <h2>Chongqing</h2>
      <div class="gallery">
        <div v-for="(photo, index) in chongqingPhotos" :key="'cq' + index" class="photo-card">
          <img :src="photo" alt="Chongqing Photo" />
        </div>
      </div>
    </div>

    <!-- 新加坡照片展示 -->
    <div class="section">
      <h2>Singapore</h2>
      <div class="gallery">
        <div v-for="(photo, index) in singaporePhotos" :key="'sg' + index" class="photo-card">
          <img :src="photo" alt="Singapore Photo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newZealandPhotos: [
        '/photos/new-zealand/photo1.jpg',
        '/photos/new-zealand/photo2.jpg'
        // 继续添加新西兰的照片路径
      ],
      chongqingPhotos: [
        '/photos/chongqing/photo1.jpg',
        '/photos/chongqing/photo2.jpg'
        // 继续添加重庆的照片路径
      ],
      singaporePhotos: [
        '/photos/singapore/photo1.jpg',
        '/photos/singapore/photo2.jpg'
        // 新加坡的照片路径
      ]
    };
  }
};
</script>

<style src="@/assets/PhotoGallery.css"></style>

