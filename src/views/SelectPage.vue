<template>
  <div class="search-container">
    <h1>Search for Exam Results</h1>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" class="search-input" placeholder="Search by Roll No or Name">
      <button @click="search" class="search-button">Search</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();

function search() {
  if (searchQuery.value.trim()) {
    router.push({ name: 'Results', query: { q: searchQuery.value } });
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
