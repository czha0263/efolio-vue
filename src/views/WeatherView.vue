
<template>
  <div class="weather-page">
    <h1>Get Weather</h1>

    <div>
      <input
        v-model="city"
        type="text"
        placeholder="Enter city, e.g. Clayton, AU"
        @keyup.enter="searchByCity"
      />

      <button @click="searchByCity">
        Search
      </button>

      <button @click="fetchCurrentLocationWeather">
        Current Location
      </button>
    </div>

    <main>
      <p v-if="loading">Loading weather...</p>

      <p v-if="error">{{ error }}</p>

      <div v-if="weatherData">
        <h2>
          {{ weatherData.name }},
          {{ weatherData.sys.country }}
        </h2>

        <div>
          <img
            :src="iconUrl"
            alt="Weather Icon"
          />

          <p>{{ temperature }} °C</p>
        </div>

        <span>
          {{ weatherData.weather[0].description }}
        </span>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const apikey = import.meta.env.VITE_OPENWEATHER_API_KEY
console.log('API key loaded:', Boolean(apikey))

const city = ref('')
const weatherData = ref(null)
const loading = ref(false)
const error = ref('')

const temperature = computed(() => {
  return weatherData.value
    ? Math.round(weatherData.value.main.temp)
    : null
})

const iconUrl = computed(() => {
  return weatherData.value
    ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
    : ''
})

const fetchWeatherData = async (params) => {
  if (!apikey) {
    error.value = 'OpenWeatherMap API key is missing'
    return
  }

  loading.value = true
  error.value = ''
  weatherData.value = null

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          ...params,
          appid: apikey,
          units: 'metric'
        }
      }
    )

    weatherData.value = response.data
  } catch (err) {
    console.error('Error fetching weather:', err)

    error.value = err.response?.status === 401
      ? 'Invalid or inactive API key'
      : 'Unable to get weather information'
  } finally {
    loading.value = false
  }
}

const searchByCity = async () => {
  if (!city.value.trim()) {
    error.value = 'Please enter a city'
    return
  }

  await fetchWeatherData({
    q: city.value.trim()
  })
}

const fetchCurrentLocationWeather = () => {
  if (!navigator.geolocation) {
    error.value = 'Geolocation is not supported'
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      await fetchWeatherData({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    },
    () => {
      error.value = 'Unable to access your location'
    }
  )
}

onMounted(() => {
  fetchCurrentLocationWeather()
})
</script>

<style scoped>
.weather-page {
  padding: 30px;
  text-align: center;
}

input {
  padding: 10px;
  margin: 10px;
  width: 230px;
}

button {
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
}

main {
  margin-top: 25px;
}

h2 {
  margin-bottom: 10px;
}

img {
  width: 100px;
  height: 100px;
}
</style>
