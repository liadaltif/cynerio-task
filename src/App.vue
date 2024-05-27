<template>
  <div id="app">
    <LandingPage />
  </div>
</template>

<script setup>
import LandingPage from './components/LandingPage.vue';
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-size: 16px; 
  font-family: Arial, sans-serif;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
