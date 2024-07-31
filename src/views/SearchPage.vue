<template>
    <div class="search-container">
      <h1 class="page-title">Check Your Exam Result</h1>
      <h3 class="subtitle">With One Click</h3><br><br>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" class="search-input" placeholder="Search by Roll No">
       
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
  /* Container styling */
  .search-container {
    padding: 20px;
    margin: 0 auto;
    text-align: center;
    font-family: Arial, sans-serif;
    max-width: 600px;
  }
  
  /* Title and subtitle styling */
  .page-title {
    font-size: 2.5em;
    color: #007bff; /* Blue color for title */
    margin-bottom: 10px;
  }
  
  .subtitle {
    font-size: 1.5em;
    color:  #007bff; /* Gray color for subtitle */
    margin-bottom: 20px;
  }
  
  /* Search bar styling */
  .search-bar {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .search-input {
    padding: 10px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .search-button {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .search-button:hover {
    background-color: #0056b3;
  }
  </style>
  