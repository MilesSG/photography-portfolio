<template>
  <div class="photo-gallery">
    <header class="header">
      <h1>Miles 的照片墙</h1>
      <p>欢迎来到我的旅行日记，这里记录了我在世界各地的美好瞬间。</p>
    </header>

    <!-- 新西兰照片展示 -->
    <div class="section" v-if="newZealandPhotos.length">
      <h2>New Zealand</h2>
      <div class="gallery">
        <div v-for="(photo, index) in newZealandPhotos" :key="'nz' + index" class="photo-card">
          <img :src="photo" alt="New Zealand Photo" />
        </div>
      </div>
    </div>

    <!-- 重庆照片展示 -->
    <div class="section" v-if="chongqingPhotos.length">
      <h2>Chongqing</h2>
      <div class="gallery">
        <div v-for="(photo, index) in chongqingPhotos" :key="'cq' + index" class="photo-card">
          <img :src="photo" alt="Chongqing Photo" />
        </div>
      </div>
    </div>

    <!-- 新加坡照片展示 -->
    <div class="section" v-if="singaporePhotos.length">
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
      newZealandPhotos: [],
      chongqingPhotos: [],
      singaporePhotos: []
    };
  },
  created() {
    this.loadPhotos();
  },
  methods: {
    async loadPhotos() {
      const basePath = process.env.NODE_ENV === 'production' ? '/photography-portfolio' : '';
      try {
        const response = await fetch(`${basePath}/photos/photos.json`);
        const data = await response.json();

        this.newZealandPhotos = data['new-zealand'].map(photo => `${basePath}/photos/new-zealand/${photo}`);
        this.chongqingPhotos = data['chongqing'].map(photo => `${basePath}/photos/chongqing/${photo}`);
        this.singaporePhotos = data['singapore'].map(photo => `${basePath}/photos/singapore/${photo}`);
      } catch (error) {
        console.error("Failed to load photos:", error);
      }
    }
  }
};
</script>

<style src="@/assets/PhotoGallery.css"></style>
