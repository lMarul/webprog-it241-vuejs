<script setup>
import { ref } from 'vue'
import FoodItem from './components/FoodItem.vue'
import FoodItem2 from './components/FoodItem2.vue'

const foods = ref([
  {
    name: 'Mango',
    description: 'The king of fruits! Sweet, juicy, and absolutely delicious.',
    emoji: '🥭',
    rating: 5
  },
  {
    name: 'Pizza',
    description: 'Classic comfort food with endless topping possibilities.',
    emoji: '🍕',
    rating: 5
  },
  {
    name: 'Ramen',
    description: 'Rich, savory noodle soup that warms the soul.',
    emoji: '🍜',
    rating: 4
  },
  {
    name: 'Ice Cream',
    description: 'Sweet, creamy, and the perfect treat any time of day!',
    emoji: '🍨',
    rating: 5
  }
])

const simpleFoods = ref([
  {
    title: 'Santol and Mango',
    message: 'I like santol and mango'
  },
  {
    title: 'Durian',
    message: 'I like durian'
  }
])
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>🍽️ My Favorite Foods</h1>
      <p class="subtitle">Discover and save your favorite dishes</p>
    </header>
    
    <div class="food-grid">
      <FoodItem
        v-for="(food, index) in foods"
        :key="index"
        :name="food.name"
        :description="food.description"
        :emoji="food.emoji"
        :rating="food.rating"
      />
    </div>

    <div class="simple-food-grid">
      <FoodItem2
        v-for="(food, index) in simpleFoods"
        :key="index"
        :title="food.title"
        :message="food.message"
      />
    </div>
    
    <footer class="app-footer">
      <p>Built with ❤️ using Vue.js</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to bottom right, #1a1a2e, #16213e, #0f3460);
  min-height: 100vh;
}
</style>

<style scoped>
.app-container {
  min-height: 100vh;
  padding: 2rem;
}

.app-header {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
  animation: fadeInDown 0.8s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.app-header h1 {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #f093fb, #f5576c, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.8;
  font-weight: 300;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease 0.2s both;
}

.simple-food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 3rem auto 0;
  animation: fadeInUp 0.8s ease 0.4s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.app-footer {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4rem;
  padding: 2rem;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2.5rem;
  }
  
  .food-grid,
  .simple-food-grid {
    grid-template-columns: 1fr;
  }
}
</style>
