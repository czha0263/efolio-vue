
<template>
  <div class="book-counter">
    <h1>Book Counter</h1>

    <button @click="getBookCount">
      Get Book Count
    </button>

    <p v-if="count !== null">
      Total number of books: {{ count }}
    </p>

    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const count = ref(null)
const error = ref('')

const getBookCount = async () => {
  try {
    error.value = ''
    count.value = null

    const response = await axios.get(
      'https://australia-southeast1-efolio-week9-d8ca3.cloudfunctions.net/getBookCount'
    )

    count.value = response.data.count
  } catch (err) {
    console.error(err)
    error.value = 'Error getting book count'
  }
}
</script>

<style scoped>
.book-counter {
  text-align: center;
  padding: 30px;
}

button {
  padding: 10px 20px;
  margin: 20px;
  cursor: pointer;
}
</style>
