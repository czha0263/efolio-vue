
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import ChenghaoZhang from './components/ChenghaoZhang.vue'

const route = useRoute()

const showHeader = computed(() => {
  return route.name !== 'CountBookAPI'
})
</script>

<template>
  <header v-if="showHeader">
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        |
        <RouterLink to="/get-book-count">
          Book Counter
        </RouterLink>
        |
        <RouterLink to="/WeatherCheck">
          Get Weather
        </RouterLink>
        |
        <RouterLink to="/CountBookAPI">
          Count Book API
        </RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <template v-if="route.path === '/'">
      <TheWelcome />
      <ChenghaoZhang />
    </template>

    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  margin-top: 20px;
  font-size: 16px;
}

nav a {
  padding: 8px;
  text-decoration: none;
  color: #42b883;
}

nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
