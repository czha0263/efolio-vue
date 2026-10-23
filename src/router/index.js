
import { createRouter, createWebHistory } from 'vue-router'

import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/get-book-count',
      name: 'GetBookCount',
      component: GetBookCountView
    },
    {
      path: '/WeatherCheck',
      name: 'GetWeather',
      component: WeatherView
    },
    {
      path: '/CountBookAPI',
      name: 'CountBookAPI',
      component: CountBookAPI
    }
  ]
})

export default router
