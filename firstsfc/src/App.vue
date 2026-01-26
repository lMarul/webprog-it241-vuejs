<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const instruments = ref([])
const loading = ref(true)
const error = ref(null)

async function getInstruments() {
  try {
    loading.value = true
    const { data, error: fetchError } = await supabase.from('instruments').select()
    
    if (fetchError) {
      error.value = fetchError.message
      console.error('Error fetching instruments:', fetchError)
    } else {
      instruments.value = data
      console.log('Fetched instruments:', data)
    }
  } catch (err) {
    error.value = err.message
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
  <div style="padding: 20px; font-family: Arial, sans-serif;">
    <h1 style="color: white;">Instruments List</h1>
    
    <div v-if="loading">Loading instruments...</div>
    
    <div v-else-if="error" style="color: red; background: #fee; padding: 15px; border-radius: 5px; margin: 10px 0;">
      <strong>Error:</strong> {{ error }}
      <p style="margin-top: 10px; font-size: 14px;">
        <strong>Troubleshooting tips:</strong><br>
        1. Check if the "instruments" table exists in your Supabase database<br>
        2. Check if Row Level Security (RLS) is enabled - if yes, you need to add a policy<br>
        3. Verify your Supabase URL and anon key in the .env file
      </p>
    </div>
    
    <div v-else-if="instruments && instruments.length > 0">
      <ul style="list-style: none; padding: 0;">
        <li v-for="instrument in instruments" :key="instrument.id" 
            style="padding: 10px; margin: 5px 0; background: #f0f0f0; border-radius: 5px; color: black;">
          {{ instrument.name }}
        </li>
      </ul>
    </div>
    
    <div v-else style="background: #fff3cd; padding: 15px; border-radius: 5px;">
      <strong>⚠️ No instruments found in the database.</strong>
      <p style="margin-top: 10px;">
        The table exists but is empty. Try adding some data to your "instruments" table in Supabase.
      </p>
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
