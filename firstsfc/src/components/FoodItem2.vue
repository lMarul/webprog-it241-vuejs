<template>
  <div class="food-card" :style="{ backgroundColor: bgColor, border: borderStyle }">
    <h2>{{ name }}</h2>
    <p class="description">{{ description }}</p>
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
    bgColor: {
      type: String,
      default: '#8B4513'
    },
    borderStyle: {
      type: String,
      default: 'none'
    }
  }
};
</script>

<style scoped>
.food-card {
  padding: 3rem 2rem;
  margin: 1rem;
  color: black;
  text-align: center;
  min-width: 250px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.food-card h2 {
  font-size: 2rem;
  margin: 0 0 1rem 0;
  font-weight: bold;
}

.description {
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.5;
}
</style>
