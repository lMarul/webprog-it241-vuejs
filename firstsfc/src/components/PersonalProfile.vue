<template>
  <div class="profile-container">
    <h1 class="profile-title">{{ title }}</h1>
    
    <div class="grid-container">
      <div class="grid-item">{{ section1 }}</div>
      <div class="grid-item">{{ section2 }}</div>
      <div class="grid-item">{{ section3 }}</div>
      <div class="grid-item">{{ section4 }}</div>
      <div class="grid-item">{{ section5 }}</div>
      <div class="grid-item">{{ section6 }}</div>
      <div class="grid-item full-width">
        <h2>{{ section7 }}</h2>
        <div class="image-gallery">
          <img v-for="food in manyFoods" :src="food" :key="food" alt="Food Image">
        </div>
      </div>
    </div>

    <footer class="profile-footer">{{ footer }}</footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Personal Profile Web page',
      section1: '1 About Me',
      section2: '2 Education / Achievements',
      section3: '3 Course',
      section4: '4 IT Experience',
      section5: '5 Hobbies & Interests',
      section6: '6 Goals In Life / Dream',
      section7: '7 Picture Gallery',
      footer: 'Asia Pacific College',
      manyFoods: [
        'https://www.w3schools.com/vue/img_burrito.svg',
        'https://www.w3schools.com/vue/img_salad.svg',
        'https://www.w3schools.com/vue/img_cake.svg',
        'https://www.w3schools.com/vue/img_soup.svg',
        'https://www.w3schools.com/vue/img_fish.svg',
        'https://www.w3schools.com/vue/img_pizza.svg',
        'https://www.w3schools.com/vue/img_rice.svg'
      ]
    };
  }
};
</script>

<style scoped>
.profile-container {
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;
}

.profile-title {
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  color: #ffffff;
  font-weight: bold;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.grid-item {
  background-color: #dc143c;
  color: #ffffff;
  padding: 60px 20px;
  border-radius: 8px;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.grid-item:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
}

.grid-item.full-width {
  grid-column: 1 / -1;
}

.grid-item h2 {
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  padding: 20px 0;
}

.image-gallery img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.image-gallery img:hover {
  transform: scale(1.2);
}

.profile-footer {
  background-color: #d3d3d3;
  color: #000000;
  padding: 20px;
  font-size: 1rem;
  border-radius: 5px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  
  .profile-title {
    font-size: 2rem;
  }
}
</style>
