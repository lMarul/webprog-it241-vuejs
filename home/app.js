const { createApp } = Vue;

createApp({
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
}).mount('#app');
