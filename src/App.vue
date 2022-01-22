<template>
  <Visualizer msg="Locust Outbreak Visualization"/>
</template>

<script>
import Visualizer from './components/Visualizer.vue'

export default {
  name: 'App',
  components: {
    Visualizer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
