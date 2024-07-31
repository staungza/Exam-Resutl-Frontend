<template>
    <div class="results-container">
      <h1>Search Results</h1>
      <div v-if="filteredResults.length > 0" class="results">
        <table class="results-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Pass/Fail</th>
              <th>Credit Subjects</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in filteredResults" :key="student.roll_no" :class="{'pass': calculatePassOrFail(student) === 'Pass', 'fail': calculatePassOrFail(student) === 'Fail'}">
              <td>{{ student.roll_no }}</td>
              <td>{{ student.student_name }}</td>
              <td>{{ calculatePassOrFail(student) }}</td>
              <td>{{ formatCreditSubjects(calculateCreditSubjects(student)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="filteredResults.length === 0 && searchQuery" class="no-results">
        <p>No results found for: <strong>{{ searchQuery }}</strong>.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  // Initialize state variables
  const students = ref([]);
  const results = ref([]);
  const route = useRoute();
  const searchQuery = computed(() => route.query.q?.trim().toLowerCase() || '');
  
  // Fetch students from the API
  async function fetchStudents() {
    try {
      const response = await axios.get('http://examresulttest.test/api/students');
      students.value = response.data.map(student => ({
        ...student,
        major: student.major || 'Unknown' // Ensure 'major' is initialized
      }));
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }
  
  // Fetch results from the API
  async function fetchResults() {
    try {
      const response = await axios.get('http://examresulttest.test/api/results');
      results.value = response.data.map(result => {
        const student = students.value.find(s => s.roll_no === result.roll_no);
        return {
          ...result,
          major: student ? student.major : 'Unknown'
        };
      });
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  }
  
  // Filter results based on search query
  const filteredResults = computed(() => {
    const query = searchQuery.value;
    return results.value.filter(result => 
      result.roll_no.toLowerCase().includes(query) ||
      result.student_name.toLowerCase().includes(query)
    );
  });
  
  // Function to calculate Pass/Fail
  function calculatePassOrFail(student) {
    const passThreshold = 40;
    const subjects = ['myanmar', 'english', 'mathematics', 'chemistry', 'physics', 'biological'];
    
    for (let subject of subjects) {
      if (student[subject] < passThreshold) {
        return 'Fail';
      }
    }
    return 'Pass';
  }
  
  // Function to calculate credit subjects
  function calculateCreditSubjects(student) {
    const credits = [];
    
    if (student.myanmar >= 75) credits.push('Myanmar');
    if (student.english >= 75) credits.push('English');
    if (student.mathematics >= 80) credits.push('Mathematics');
    if (student.chemistry >= 80) credits.push('Chemistry');
    if (student.physics >= 80) credits.push('Physics');
    
    if (student.major === 'bio' && student.biological >= 75) {
      credits.push('Biological');
    } else if (student.major === 'eco' && student.biological >= 75) {
      credits.push('Economical');
    }
  
    return credits;
  }
  
  // Function to format credit subjects as a comma-separated string
  function formatCreditSubjects(subjects) {
    return subjects.join(', ');
  }
  
  // Fetch initial data when the component is mounted
  onMounted(() => {
    fetchStudents();
    fetchResults();
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  