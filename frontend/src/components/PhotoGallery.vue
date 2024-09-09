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
            <!-- 使用图标或颜色来区分节点 -->
            <i class="iconfont icon-xiamen timeline-dot"></i>
          </template>
          <!-- 单独展示时间和地点，放在左侧 -->
          <div class="timeline-info">
            <div class="timeline-label">厦门</div>
            <div class="timeline-date">2024年6月</div>
          </div>
          <div class="gallery">
            <div v-for="(photo, index) in xiamenPhotos" :key="'xm' + index" class="photo-card">
              <img :src="photo.thumbnail" alt="Xiamen Photo" @click="openModal(photo, index, 'xiamenPhotos')" />
            </div>
          </div>
        </el-timeline-item>

        <!-- 重庆照片展示 -->
        <el-timeline-item v-if="chongqingPhotos.length" placement="top">
          <template #dot>
            <i class="iconfont icon-chongqing timeline-dot" style="color: #67C23A;"></i>
          </template>
          <div class="timeline-info">
            <div class="timeline-label">重庆</div>
            <div class="timeline-date">2024年6月</div>
          </div>
          <div class="gallery">
            <div v-for="(photo, index) in chongqingPhotos" :key="'cq' + index" class="photo-card">
              <img :src="photo.thumbnail" alt="Chongqing Photo" @click="openModal(photo, index, 'chongqingPhotos')" />
            </div>
          </div>
        </el-timeline-item>

        <!-- 新西兰照片展示 -->
        <el-timeline-item v-if="newZealandPhotos.length" placement="top">
          <template #dot>
            <i class="iconfont icon-newzealand timeline-dot" style="color: #E6A23C;"></i>
          </template>
          <div class="timeline-info">
            <div class="timeline-label">新西兰</div>
            <div class="timeline-date">2024年5月</div>
          </div>
          <div class="gallery">
            <div v-for="(photo, index) in newZealandPhotos" :key="'nz' + index" class="photo-card">
              <img :src="photo.thumbnail" alt="New Zealand Photo" @click="openModal(photo, index, 'newZealandPhotos')" />
            </div>
          </div>
        </el-timeline-item>

        <!-- 香港机场转机照片展示 -->
        <el-timeline-item v-if="HKAirportPhotos.length" placement="top">
          <template #dot>
            <i class="iconfont icon-hkairport timeline-dot" style="color: #F56C6C;"></i>
          </template>
          <div class="timeline-info">
            <div class="timeline-label">香港机场</div>
            <div class="timeline-date">2024年4月</div>
          </div>
          <div class="gallery">
            <div v-for="(photo, index) in HKAirportPhotos" :key="'hk' + index" class="photo-card">
              <img :src="photo.thumbnail" alt="HKAirport Photo" @click="openModal(photo, index, 'HKAirportPhotos')" />
            </div>
          </div>
        </el-timeline-item>

        <!-- 新加坡照片展示 -->
        <el-timeline-item v-if="singaporePhotos.length" placement="top">
          <template #dot>
            <i class="iconfont icon-singapore timeline-dot" style="color: #909399;"></i>
          </template>
          <div class="timeline-info">
            <div class="timeline-label">新加坡</div>
            <div class="timeline-date">2024年3月</div>
          </div>
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
  display: block; /* 将布局改为块级元素 */
  padding: 20px;
}

.header {
  width: 100%; /* 让标题部分占据整行 */
  text-align: center; /* 标题内容居中 */
  margin-bottom: 40px; /* 增加标题与内容之间的间距 */
}

.timeline-container {
  position: relative;
  display: flex; /* 使用flex布局，使时间轴和内容并排显示 */
  flex-direction: column; /* 使时间轴垂直排列 */
  align-items: flex-start; /* 左对齐时间轴内容 */
  padding-left: 180px; /* 增加左边距以避免时间和地点信息与标题重叠 */
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

.iconfont {
  font-size: 20px;
  margin-right: 8px;
}

.icon-xiamen {
  color: #409eff;
}

.icon-chongqing {
  color: #67C23A;
}

.icon-newzealand {
  color: #E6A23C;
}

.icon-hkairport {
  color: #F56C6C;
}

.icon-singapore {
  color: #909399;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
  top: -10px;
  left: -6px;
}

.timeline-info {
  position: absolute;
  left: -140px; /* 调整这个值来控制时间和地点的位置 */
  top: 20px;
  text-align: right;
}

.timeline-label {
  font-size: 30px;
  font-weight: bold;
  color: #333;
}

.timeline-date {
  font-size: 22px;
  font-weight: bold;
  color: #666;
  margin-bottom: 10px;
}



</style>
