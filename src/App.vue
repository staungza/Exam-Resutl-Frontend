<!-- App.vue -->
<template>
  <div id="app">
    <Navbar />
   
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; /* Adjust margin to avoid overlap with navbar */
}
</style>
