<template>
  <div class="food-card-simple" :class="{ liked: isLiked }">
    <h2>{{ title }}</h2>
    <p class="message">{{ message }}</p>
    <button @click="toggleLike" class="like-btn">
      {{ isLiked ? '👍 Liked' : '👎 Like?' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: 'I like this food'
    }
  },
  data() {
    return {
      isLiked: false
    }
  },
  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked;
    }
  }
};
</script>

<style scoped>
.food-card-simple {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  color: white;
  text-align: center;
}

.food-card-simple:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.food-card-simple.liked {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.food-card-simple h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.message {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.like-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.like-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.liked .like-btn {
  background: #fff;
  color: #f5576c;
}
</style>
