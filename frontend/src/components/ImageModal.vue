


<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <transition name="fade">
      <div class="modal-content">
        <!-- 关闭按钮 -->
        <span class="close-button material-icons" @click="closeModal">close</span>

        <!-- 图片显示区域 -->
        <div class="image-container">
          <img :src="imageSrc" alt="Full-size Image" class="modal-image" />
        </div>

        <!-- 图片标题和描述 -->
        <div class="image-description">
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </div>

        <!-- 图片切换按钮 -->
        <button class="nav-button prev-button material-icons" @click="prevImage">arrow_back</button>
        <button class="nav-button next-button material-icons" @click="nextImage">arrow_forward</button>

        <!-- 下载和分享按钮 -->
        <button class="action-button" @click="downloadImage">下载图片</button>
        <button class="action-button" @click="shareImage">分享图片</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    imageSrc: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '这里是预留的文字描述',
    },
    title: {
      type: String,
      default: '图片标题',
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
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
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

body {
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  max-width: 80%;
  max-height: 85%;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: zoomIn 0.3s ease;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 28px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #d32f2f;
}

.image-container {
  max-width: 100%;
  max-height: 60vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image {
  max-width: 100%;
  max-height: 60vh;
  margin-bottom: 15px;
  border-radius: 12px;
}

.image-description {
  margin-top: 10px;
  font-size: 18px;
  color: #444;
  line-height: 1.5;
}

.nav-button {
  margin: 10px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 24px;
}

.action-button {
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes zoomIn {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
