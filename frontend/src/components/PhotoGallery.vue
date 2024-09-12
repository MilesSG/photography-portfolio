<template>
  <div class="photo-gallery">
    <header class="header">
      <h1>Miles 的照片墙</h1>
      <p>欢迎来到我的旅行日记，这里记录了我在世界各地的美好瞬间。</p>
    </header>

    <!-- 上传照片按钮 -->
    <button class="upload-button" @click="openUploadModal">上传照片</button>

    <!-- 上传照片模态框 -->
    <el-dialog
        title="上传新照片"
        v-model="isUploadModalVisible"
        width="40%"
        @close="resetUploadForm"
        class="upload-dialog"
    >
      <div class="upload-form">
        <div class="form-item">
          <label class="form-label">选择文件：</label>
          <input type="file" @change="handleFileChange" class="form-input-file" />
        </div>
        <div class="form-item">
          <label class="form-label">照片标题：</label>
          <el-input v-model="uploadForm.title" placeholder="请输入照片标题" class="form-input"></el-input>
        </div>
        <div class="form-item">
          <label class="form-label">照片地点：</label>
          <el-input v-model="uploadForm.location" placeholder="请输入照片地点" class="form-input"></el-input>
        </div>
        <div class="form-item">
          <label class="form-label">照片日期：</label>
          <el-date-picker
              v-model="uploadForm.date"
              type="date"
              placeholder="选择照片日期"
              class="form-input"
          ></el-date-picker>
        </div>
        <div class="form-item">
          <label class="form-label">照片描述：</label>
          <el-input
              type="textarea"
              v-model="uploadForm.description"
              placeholder="请输入照片描述"
              class="form-input"
          ></el-input>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isUploadModalVisible = false" class="cancel-button">取消</el-button>
          <el-button type="primary" @click="uploadPhoto" class="upload-button">上传</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 时间轴 -->
    <div class="timeline-container">
      <el-timeline>
        <el-timeline-item
            v-for="(photos, location) in photosByLocation"
            :key="location"
            placement="top"
        >
          <template #dot>
            <i :class="'iconfont icon-' + location.toLowerCase() + ' timeline-dot'"></i>
          </template>
          <div class="timeline-info">
            <div class="timeline-label">{{ location }}</div>
            <div class="timeline-date">2024年6月</div> <!-- 可以根据你的数据进行动态调整 -->
          </div>
          <div class="gallery">
            <div
                v-for="(photo, index) in photos"
                :key="location + '-' + index"
                class="photo-card"
            >
              <img
                  :src="photo.imageData"
                  alt="Photo"
                  @click="openModal(photo, index, location)"
              />
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
import { ElTimeline, ElTimelineItem, ElDialog, ElButton, ElInput, ElDatePicker } from 'element-plus';
import ImageModal from './ImageModal.vue';

export default {
  components: {
    ImageModal,
    ElTimeline,
    ElTimelineItem,
    ElDialog,
    ElButton,
    ElInput,
    ElDatePicker
  },
  data() {
    return {
      photosByLocation: {},
      isModalVisible: false,
      selectedImage: '',
      selectedImageTitle: '',
      selectedImageDescription: '',
      currentIndex: 0,
      currentPhotoList: [],
      isUploadModalVisible: false, // 控制上传模态框的显示状态
      uploadForm: {
        file: null,
        location: '',
        date: '',
        description: ''
      }
    };
  },
  created() {
    this.loadPhotos();
  },
  methods: {
    openUploadModal() {
      this.isUploadModalVisible = true;
    },
    handleFileChange(event) {
      this.uploadForm.file = event.target.files[0];
    },
    resetUploadForm() {
      this.uploadForm = {
        file: null,
        location: '',
        date: '',
        description: ''
      };
    },
    async uploadPhoto() {
      if (!this.uploadForm.file) {
        alert('请先选择要上传的照片');
        return;
      }

      const formData = new FormData();
      formData.append('photo', this.uploadForm.file);
      formData.append('location', this.uploadForm.location);
      formData.append('date', this.uploadForm.date);
      formData.append('description', this.uploadForm.description);
      formData.append('title', this.uploadForm.title); // 新增的标题字段

      try {
        const response = await fetch('http://localhost:3000/api/upload', { // 替换为你的后端 API URL
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        console.log(result.message);
        alert('照片上传成功！');
        this.isUploadModalVisible = false; // 上传成功后关闭模态框
        this.resetUploadForm();
        this.loadPhotos(); // 重新加载照片以显示新上传的照片
      } catch (error) {
        console.error('上传照片失败:', error);
        alert('上传照片失败，请重试。');
      }
    },

    async loadPhotos() {
      try {
        const response = await fetch('http://localhost:3000/api/getPhotos'); // 获取照片数据
        const data = await response.json();

        // 按地点分类照片
        this.photosByLocation = data.reduce((acc, photo) => {
          if (!acc[photo.location]) acc[photo.location] = [];
          acc[photo.location].push(photo);
          return acc;
        }, {});
      } catch (error) {
        console.error("Failed to load photos:", error);
      }
    },
    openModal(photo, index, location) {
      this.selectedImage = photo.imageData;
      this.selectedImageTitle = photo.title; // 使用数据库中的标题
      this.selectedImageDescription = photo.description;
      this.currentIndex = index;
      this.currentPhotoList = this.photosByLocation[location];
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
      this.selectedImage = photo.imageData;
      this.selectedImageTitle = `图片标题 ${this.currentIndex + 1}`;
      this.selectedImageDescription = photo.description;
    }
  }
};
</script>


<style scoped>
/* 保留你现有的样式 */
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 创建自适应网格 */
  gap: 10px;
  margin: 20px 0;
}

.photo-card {
  overflow: hidden;
  position: relative;
  border-radius: 8px;
}

.photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保图片填充容器 */
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

/* 添加新的模态框样式 */
.upload-dialog {
  padding: 20px;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-input,
.form-input-file {
  width: 100%;
  padding: 8px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.upload-button {
  background-color: #409eff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  background-color: #f56c6c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.upload-button:hover,
.cancel-button:hover {
  opacity: 0.9;
}
</style>
