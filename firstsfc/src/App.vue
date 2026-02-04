<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from './lib/supabaseClient'
import RestAPI from './components/RestAPI.vue'

const instruments = ref([])
const loading = ref(true)
const error = ref(null)

// Comment form states
const commentName = ref('')
const commentText = ref('')
const comments = ref([])
const commentLoading = ref(false)
const submitMessage = ref('')
const sortOrder = ref('newest')

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

// Fetch comments from Supabase
async function getComments() {
  try {
    const ascending = sortOrder.value === 'oldest'
    const { data, error: fetchError } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending })
    
    if (fetchError) {
      console.error('Error fetching comments:', fetchError)
      console.error('Fetch error details:', {
        code: fetchError.code,
        message: fetchError.message,
        details: fetchError.details,
        hint: fetchError.hint
      })
    } else {
      comments.value = data || []
      console.log('Fetched comments:', data)
    }
  } catch (err) {
    console.error('Error:', err)
  }
}

// Handle sort order change
function handleSortChange() {
  getComments()
}

// Submit a new comment
async function submitComment() {
  if (!commentName.value.trim() || !commentText.value.trim()) {
    submitMessage.value = 'Please fill in both name and comment fields'
    setTimeout(() => submitMessage.value = '', 3000)
    return
  }

  try {
    commentLoading.value = true
    const { data, error: insertError } = await supabase
      .from('comments')
      .insert([
        {
          name: commentName.value.trim(),
          comment: commentText.value.trim()
        }
      ])
      .select()

    if (insertError) {
      submitMessage.value = `Error: ${insertError.message || 'Unable to submit comment'}`
      console.error('Error inserting comment:', insertError)
      console.error('Error details:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint
      })
    } else {
      submitMessage.value = 'Comment submitted successfully!'
      commentName.value = ''
      commentText.value = ''
      await getComments()
    }
  } catch (err) {
    submitMessage.value = `Error: ${err.message || 'Unable to submit comment'}`
    console.error('Error:', err)
  } finally {
    commentLoading.value = false
    setTimeout(() => submitMessage.value = '', 5000)
  }
}

// Format timestamp to relative time
function getRelativeTime(timestamp) {
  const now = new Date()
  const commentDate = new Date(timestamp)
  const diffInSeconds = Math.floor((now - commentDate) / 1000)

  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const year = day * 365

  if (diffInSeconds < minute) {
    return 'just now'
  } else if (diffInSeconds < hour) {
    const minutes = Math.floor(diffInSeconds / minute)
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  } else if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  } else if (diffInSeconds < week) {
    const days = Math.floor(diffInSeconds / day)
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  } else if (diffInSeconds < month) {
    const weeks = Math.floor(diffInSeconds / week)
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  } else if (diffInSeconds < year) {
    const months = Math.floor(diffInSeconds / month)
    return `${months} ${months === 1 ? 'month' : 'months'} ago`
  } else {
    const years = Math.floor(diffInSeconds / year)
    return `${years} ${years === 1 ? 'year' : 'years'} ago`
  }
}

onMounted(() => {
  getInstruments()
  getComments()
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

    <!-- Comment Section -->
    <div class="comment-container">
      <!-- Comment Form -->
      <div class="comment-form-card">
        <h2 class="section-title">Leave a Comment</h2>
        
        <form @submit.prevent="submitComment" class="comment-form">
          <div class="form-group">
            <label for="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              v-model="commentName" 
              placeholder="Enter your name"
              class="form-input"
              maxlength="100"
            />
          </div>

          <div class="form-group">
            <label for="comment">Comment:</label>
            <textarea 
              id="comment" 
              v-model="commentText" 
              placeholder="Write your comment here..."
              class="form-textarea"
              rows="4"
              maxlength="500"
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="submit-btn"
            :disabled="commentLoading"
          >
            {{ commentLoading ? 'Submitting...' : 'Submit' }}
          </button>

          <div v-if="submitMessage" :class="['submit-message', submitMessage.includes('success') ? 'success' : 'error']">
            {{ submitMessage }}
          </div>
        </form>
      </div>

      <!-- Comments Display -->
      <div class="comments-section">
        <div class="comments-header">
          <h2 class="section-title">Comments</h2>
          
          <div class="sort-container">
            <label for="sortOrder" class="sort-label">Sort by:</label>
            <select 
              id="sortOrder" 
              v-model="sortOrder" 
              @change="handleSortChange"
              class="sort-select"
            >
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>
        </div>
        
        <div v-if="comments.length === 0" class="no-comments">
          No comments yet. Be the first to comment!
        </div>

        <div v-else class="comments-list">
          <div 
            v-for="comment in comments" 
            :key="comment.id" 
            class="comment-card"
          >
            <div class="comment-header">
              <div class="comment-author">
                <div class="author-avatar">{{ comment.name.charAt(0).toUpperCase() }}</div>
                <span class="author-name">{{ comment.name }}</span>
              </div>
              <span class="comment-time">{{ getRelativeTime(comment.created_at) }}</span>
            </div>
            <div class="comment-body">
              {{ comment.comment }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RestAPI Component -->
    <RestAPI />
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

/* Comment Section Styles */
.comment-container {
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 1rem;
}

.section-title {
  color: white;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
}

/* Comment Form Card */
.comment-form-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  margin-bottom: 3rem;
  animation: slideInUp 0.6s ease;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: white;
  font-weight: 500;
  font-size: 1rem;
}

.form-input,
.form-textarea {
  padding: 0.875rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #ffd700;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #333;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-message {
  padding: 0.875rem;
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
  animation: fadeIn 0.3s ease;
}

.submit-message.success {
  background: rgba(76, 175, 80, 0.9);
  color: white;
}

.submit-message.error {
  background: rgba(244, 67, 54, 0.9);
  color: white;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Comments Display Section */
.comments-section {
  animation: slideInUp 0.6s ease 0.2s both;
}

.comments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.comments-header .section-title {
  margin-bottom: 0;
  text-align: left;
}

.sort-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sort-label {
  color: white;
  font-weight: 500;
  font-size: 1rem;
}

.sort-select {
  padding: 0.625rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.sort-select:hover {
  border-color: rgba(255, 215, 0, 0.6);
  background: white;
}

.sort-select:focus {
  border-color: #ffd700;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
}

.no-comments {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 1.75rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation: fadeInScale 0.5s ease;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.comment-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);
}

.comment-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.author-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.comment-time {
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
}

.comment-body {
  color: #444;
  font-size: 1rem;
  line-height: 1.6;
  word-wrap: break-word;
}

/* Responsive Design */
@media (max-width: 768px) {
  .comment-form-card {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .comment-card {
    padding: 1.25rem;
  }

  .comment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .author-avatar {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .author-name {
    font-size: 1rem;
  }

  .comments-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .comments-header .section-title {
    text-align: center;
    width: 100%;
  }

  .sort-container {
    width: 100%;
    justify-content: center;
  }
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
