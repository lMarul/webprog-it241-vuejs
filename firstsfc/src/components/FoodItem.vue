<template>
  <div class="food-card" :class="{ favorite: isFavorite }">
    <div class="food-emoji">{{ emoji }}</div>
    <h2>{{ name }}</h2>
    <p class="description">{{ description }}</p>
    <div class="rating">
      <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= rating }">
        ★
      </span>
    </div>
    <button @click="toggleFavorite" class="favorite-btn">
      {{ isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: 'Delicious food item'
    },
    emoji: {
      type: String,
      default: '🍽️'
    },
    rating: {
      type: Number,
      default: 5,
      validator: (value) => value >= 0 && value <= 5
    }
  },
  data() {
    return {
      isFavorite: false
    }
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    }
  }
};
</script>

<style scoped>
.food-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  margin: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  color: white;
  text-align: center;
  min-width: 280px;
}

.food-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.food-card.favorite {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.food-emoji {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.food-card h2 {
  font-size: 1.8rem;
  margin: 0.5rem 0;
  font-weight: 700;
}

.description {
  font-size: 1rem;
  margin: 1rem 0;
  opacity: 0.9;
  line-height: 1.5;
}

.rating {
  margin: 1rem 0;
  font-size: 1.5rem;
}

.star {
  color: rgba(255, 255, 255, 0.3);
  transition: color 0.2s;
}

.star.filled {
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.favorite-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.favorite-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.favorite-btn:active {
  transform: scale(0.95);
}
</style>