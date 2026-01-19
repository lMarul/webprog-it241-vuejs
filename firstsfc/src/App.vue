<script setup>
import { ref } from 'vue'
import FoodItem2 from './components/FoodItem2.vue'

const foods = ref([
  {
    name: 'Santol and Mango',
    description: 'I like santol and mango',
    bgColor: '#A0482B',
    borderStyle: 'none'
  },
  {
    name: 'Durian',
    description: 'I like durian',
    bgColor: '#D4E157',
    borderStyle: '3px dotted black'
  }
])
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Fruits</h1>
    </header>
    
    <div class="food-grid">
      <FoodItem2
        v-for="(food, index) in foods"
        :key="index"
        :name="food.name"
        :description="food.description"
        :bgColor="food.bgColor"
        :borderStyle="food.borderStyle"
      />
    </div>
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
  background: white;
  min-height: 100vh;
}
</style>

<style scoped>
.app-container {
  min-height: 100vh;
  padding: 2rem;
}

.app-header {
  text-align: left;
  color: black;
  margin-bottom: 2rem;
  margin-left: 1rem;
}

.app-header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.food-grid {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  max-width: 1400px;
  margin: 0;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2.5rem;
  }
  
  .food-grid {
    flex-direction: column;
  }
}
</style>
