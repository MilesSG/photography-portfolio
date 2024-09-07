<template>
  <div>
    <h2>评论区</h2>
    <form @submit.prevent="submitComment">
      <input v-model="name" placeholder="你的名字" required />
      <textarea v-model="comment" placeholder="你的评论" required></textarea>
      <button type="submit">提交评论</button>
    </form>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <strong>{{ comment.name }}</strong>: {{ comment.comment }} ({{ comment.created_at }})
      </li>
    </ul>
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
    }
  }
};
</script>
