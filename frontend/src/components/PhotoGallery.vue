<template>
  <div class="photo-gallery">
    <header class="header">
      <h1>Miles 的照片墙</h1>
      <p>欢迎来到我的旅行日记，这里记录了我在世界各地的美好瞬间。</p>
    </header>

    <!-- 时间轴 -->
    <div class="timeline-container">
      <el-timeline>
        <!-- 厦门照片展示 -->
        <el-timeline-item v-if="xiamenPhotos.length" placement="top">
          <template #dot>
            <div class="timeline-dot"></div>
          </template>
          <!-- 地点和时间 -->
          <h2 class="timeline-header">厦门 2024年6月</h2>
          <div class="gallery">
            <div v-for="(photo, index) in xiamenPhotos" :key="'xm' + index" class="photo-card">
              <img :src="photo.thumbnail" alt="Xiamen Photo" @click="openModal(photo, index, 'xiamenPhotos')" />
            </div>
          </div>
        </el-timeline-item>

        <!-- 重庆照片展示 -->
        <el-timeline-item v-if="chongqingPhotos.length" placement="top">
          <template #dot>
            <div class="timeline-dot"></div>
          </template>
          <!-- 地点和时间 -->
          <h2 class="timeline-header">重庆 2024年6月</h2>
          <div class="gallery">
            <div v-for="(photo, index) in chongqingPhotos" :key="'cq' + index" class="photo-card">
              <img :src="photo.thumbnail" alt="Chongqing Photo" @click="openModal(photo, index, 'chongqingPhotos')" />
            </div>
          </div>
        </el-timeline-item>

        <!-- 新西兰照片展示 -->
        <el-timeline-item v-if="newZealandPhotos.length" placement="top">
          <template #dot>
            <div class="timeline-dot"></div>
          </template>
          <!-- 地点和时间 -->
          <h2 class="timeline-header">新西兰 2024年5月</h2>
          <div class="gallery">
            <div v-for="(photo, index) in newZealandPhotos" :key="'nz' + index" class="photo-card">
              <img :src="photo.thumbnail" alt="New Zealand Photo" @click="openModal(photo, index, 'newZealandPhotos')" />
            </div>
          </div>
        </el-timeline-item>

        <!-- 香港机场转机照片展示 -->
        <el-timeline-item v-if="HKAirportPhotos.length" placement="top">
          <template #dot>
            <div class="timeline-dot"></div>
          </template>
          <!-- 地点和时间 -->
          <h2 class="timeline-header">香港机场 2024年4月</h2>
          <div class="gallery">
            <div v-for="(photo, index) in HKAirportPhotos" :key="'hk' + index" class="photo-card">
              <img :src="photo.thumbnail" alt="HKAirport Photo" @click="openModal(photo, index, 'HKAirportPhotos')" />
            </div>
          </div>
        </el-timeline-item>

        <!-- 新加坡照片展示 -->
        <el-timeline-item v-if="singaporePhotos.length" placement="top">
          <template #dot>
            <div class="timeline-dot"></div>
          </template>
          <!-- 地点和时间 -->
          <h2 class="timeline-header">新加坡 2024年3月</h2>
          <div class="gallery">
            <div v-for="(photo, index) in singaporePhotos" :key="'sg' + index" class="photo-card">
              <img :src="photo.thumbnail" alt="Singapore Photo" @click="openModal(photo, index, 'singaporePhotos')" />
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>

    <!-- 模态框组件 -->
    <ImageModal
        :isVisible="isModalVisible"
        :imageSrc="selectedImage"
        :title="selectedImageTitle"
        :description="selectedImageDescription"
        @close="closeModal"
        @prev="prevImage"
        @next="nextImage"
    />
  </div>
</template>

<script>
import { ElTimeline, ElTimelineItem } from 'element-plus';
import ImageModal from './ImageModal.vue';

export default {
  components: {
    ImageModal,
    ElTimeline,
    ElTimelineItem,
  },
  data() {
    return {
      newZealandPhotos: [],
      chongqingPhotos: [],
      singaporePhotos: [],
      xiamenPhotos: [],
      HKAirportPhotos: [],
      isModalVisible: false,
      selectedImage: '',
      selectedImageTitle: '',
      selectedImageDescription: '',
      currentIndex: 0,
      currentPhotoList: [],
    };
  },
  created() {
    this.loadPhotos();
  },
  methods: {
    async loadPhotos() {
      const basePath = process.env.VUE_APP_PUBLIC_PATH || '';
      try {
        const response = await fetch(`${basePath}photos/photos.json`);
        const data = await response.json();

        this.newZealandPhotos = data['new-zealand'].map(photo => ({
          original: `${basePath}${photo.original}`,
          thumbnail: `${basePath}${photo.thumbnail}`,
        }));
        this.chongqingPhotos = data['chongqing'].map(photo => ({
          original: `${basePath}${photo.original}`,
          thumbnail: `${basePath}${photo.thumbnail}`,
        }));
        this.singaporePhotos = data['singapore'].map(photo => ({
          original: `${basePath}${photo.original}`,
          thumbnail: `${basePath}${photo.thumbnail}`,
        }));
        this.xiamenPhotos = data['xiamen'].map(photo => ({
          original: `${basePath}${photo.original}`,
          thumbnail: `${basePath}${photo.thumbnail}`,
        }));
        this.HKAirportPhotos = data['HKAirport'].map(photo => ({
          original: `${basePath}${photo.original}`,
          thumbnail: `${basePath}${photo.thumbnail}`,
        }));
      } catch (error) {
        console.error("Failed to load photos:", error);
      }
    },
    openModal(photo, index, photoListName) {
      this.selectedImage = photo.original;
      this.selectedImageTitle = `图片标题 ${index + 1}`;
      this.selectedImageDescription = `这里是预留的文字描述 ${index + 1}`;
      this.currentIndex = index;
      this.currentPhotoList = this[photoListName];
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.currentPhotoList.length) % this.currentPhotoList.length;
      this.updateModalContent();
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.currentPhotoList.length;
      this.updateModalContent();
    },
    updateModalContent() {
      const photo = this.currentPhotoList[this.currentIndex];
      this.selectedImage = photo.original;
      this.selectedImageTitle = `图片标题 ${this.currentIndex + 1}`;
      this.selectedImageDescription = `这里是预留的文字描述 ${this.currentIndex + 1}`;
    }
  },
};
</script>

<style scoped>
.photo-gallery {
  display: flex;
  padding: 20px;
}

.timeline-container {
  flex: 1;
  padding-right: 20px;
  position: relative; /* 添加相对定位 */
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.photo-card img {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s;
}

.photo-card img:hover {
  transform: scale(1.05);
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #409eff;
  position: relative;
  top: -10px;
  left: -6px;
}

.timeline-header {
  position: absolute; /* 绝对定位 */
  left: 25px; /* 根据需要调整位置 */
  margin: 0;
  padding: 10px 0;
  font-size: 30px; /* 调整字体大小 */
  font-weight: bold;
  color: #333;
}
</style>
