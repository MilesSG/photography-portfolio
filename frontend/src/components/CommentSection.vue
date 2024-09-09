<template>
  <div class="comment-section">
    <h2>评论区</h2>
    <form @submit.prevent="submitComment" class="comment-form">
      <input v-model="name" placeholder="你的名字" class="input" required />
      <textarea v-model="comment" placeholder="你的评论" class="textarea" required></textarea>
      <button type="submit" class="button">提交评论</button>
    </form>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      comments: [],
      name: '',
      comment: ''
    };
  },
  created() {
    this.fetchComments();
  },
  methods: {
    fetchComments() {
      axios.get('http://localhost:3000/api/comments')
          .then(response => {
            this.comments = response.data;
          })
          .catch(error => {
            console.error("Failed to fetch comments:", error);
          });
    },
    submitComment() {
      if (!this.name || !this.comment) return;

      axios.post('http://localhost:3000/api/comments', {
        name: this.name,
        comment: this.comment
      })
          .then(response => {
            this.comments.unshift(response.data);
            this.name = '';
            this.comment = '';
          })
          .catch(error => {
            console.error("Failed to submit comment:", error);
          });
    },
    formatDate(date) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      return new Date(date).toLocaleString(undefined, options);
    }
  }
};
</script>

<style scoped>
.comment-section {
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-top: 30px;
}

.comment-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input, .textarea {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.textarea {
  resize: vertical;
  min-height: 60px;
}

.button {
  padding: 10px 15px;
  background-color: #007bff; /* 修改为蓝色 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.button:hover {
  background-color: #0056b3; /* 更深的蓝色用于 hover 效果 */
}

.comments-list {
  margin-top: 20px;
}

.comment-item {
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.comment-item strong {
  display: block;
  color: #333;
  font-size: 14px;
  margin-bottom: 5px;
}

.comment-item span {
  display: block;
  font-size: 13px;
  color: #555;
}

.comment-item small {
  display: block;
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}
</style>
