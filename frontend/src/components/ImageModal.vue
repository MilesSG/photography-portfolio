<template>
  <el-dialog
      v-model="localVisible"
      :width="dialogWidth"
      :top="dialogTop"
      @close="closeModal"
      custom-class="custom-dialog"
  >
    <div class="image-container">
      <!-- 左右切换按钮 -->
      <el-button
          v-if="hasPrevImage"
          class="nav-button prev-button"
          @click="prevImage"
          circle
      >
        <el-icon><ArrowLeft /></el-icon>
      </el-button>
      <img :src="imageSrc" alt="Full-size Image" class="modal-image" @load="updateDialogSize" />
      <el-button
          v-if="hasNextImage"
          class="nav-button next-button"
          @click="nextImage"
          circle
      >
        <el-icon><ArrowRight /></el-icon>
      </el-button>
    </div>

    <div class="image-description">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="action-buttons">
      <el-button type="success" @click="downloadImage">下载图片</el-button>
      <el-button type="info" @click="shareImage">分享图片</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ElDialog, ElButton, ElIcon } from 'element-plus';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'; // 引入图标

export default {
  components: {
    ElDialog,
    ElButton,
    ElIcon,
    ArrowLeft,
    ArrowRight
  },
  props: {
    isVisible: Boolean,
    imageSrc: String,
    description: String,
    title: String,
  },
  data() {
    return {
      localVisible: this.isVisible,
      dialogWidth: '50%',
      dialogTop: '10vh',
    };
  },
  watch: {
    isVisible(newVal) {
      this.localVisible = newVal;
    },
    localVisible(newVal) {
      this.$emit('update:isVisible', newVal);
    },
  },
  methods: {
    closeModal() {
      this.localVisible = false;
    },
    prevImage() {
      this.$emit('prev');
    },
    nextImage() {
      this.$emit('next');
    },
    downloadImage() {
      const link = document.createElement('a');
      link.href = this.imageSrc;
      link.download = 'image.jpg';
      link.click();
    },
    shareImage() {
      if (navigator.share) {
        navigator.share({
          title: this.title,
          text: this.description,
          url: this.imageSrc,
        }).catch((error) => console.error('分享失败', error));
      } else {
        alert('浏览器不支持分享功能');
      }
    },
    updateDialogSize(event) {
      const img = event.target;
      const imgWidth = img.naturalWidth;
      this.dialogWidth = imgWidth > 1000 ? '80%' : `${imgWidth}px`;
      this.dialogTop = '5vh';
    },
  },
  computed: {
    hasPrevImage() {
      return true;
    },
    hasNextImage() {
      return true;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.custom-dialog {
  padding: 0;
  max-width: 80vw;
  max-height: 90vh;
  overflow: auto;
}

.image-container {
  position: relative;
  max-width: 100%;
  max-height: 70vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image {
  max-width: 100%;
  max-height: 70vh;
  border-radius: 12px;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}

.image-description {
  margin-top: 10px;
  font-size: 18px;
  color: #444;
  line-height: 1.5;
  text-align: center;
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.action-buttons .el-button {
  margin: 0 10px;
  border-radius: 20px;
}
</style>
