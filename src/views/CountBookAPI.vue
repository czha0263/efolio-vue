
<template>
  <div class="api-page">
    <pre v-if="jsondata">{{ JSON.stringify(jsondata, null, 2) }}</pre>
    <pre v-else-if="error">{{ error }}</pre>
    <pre v-else>Loading...</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const jsondata = ref(null)
const error = ref('')

const getBookCountAPI = async () => {
  try {
    const response = await axios.get(
      'https://australia-southeast1-efolio-week9-d8ca3.cloudfunctions.net/getBookCount'
    )

    jsondata.value = response.data
  } catch (err) {
    console.error('API request failed:', err)
    error.value = 'Failed to retrieve book count'
  }
}

onMounted(() => {
  getBookCountAPI()
})
</script>

<style scoped>
.api-page {
  padding: 20px;
}

pre {
  font-family: monospace;
  white-space: pre-wrap;
  text-align: left;
  font-size: 16px;
}
</style>
