<template>
  <div class="container">
    <!-- Search Bar for Roll Number or Name -->
    <div class="search-bar">
      <label for="search-query" class="label">Search by Roll No or Name:</label>
      <div class="search-input-container">
        <input type="text" v-model="searchQuery" id="search-query" class="search-input" placeholder="Enter Roll No or Name">
        <button @click="search" class="search-button">Search</button>
        <a href="javascript: location.reload();"><button class="search-button">Refresh</button></a>
      </div>
    </div>

    <!-- Results Table -->
    <div v-if="filteredResults.length > 0" class="results">
      <h3>Search Results:</h3>
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
          <tr v-for="student in paginatedResults" :key="student.roll_no">
            <td>{{ student.roll_no }}</td>
            <td>{{ student.student_name }}</td>
            <td>{{ calculatePassOrFail(student) }}</td>
            <td>{{ formatCreditSubjects(calculateCreditSubjects(student)) }}</td>
           
           
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">Next</button>
      </div>
    </div>

    <!-- No Results Found -->
    <div v-if="filteredResults.length === 0 && searchQuery" class="no-results">
      <p>No results found for: <strong>{{ searchQuery }}</strong>.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';



// Initialize state variables
const searchQuery = ref('');
const students = ref([]);
const results = ref([]);
const filteredResults = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;


// Fetch students from the API
async function fetchStudents() {
  try {
    const response = await axios.get('http://examresulttest.test/api/students');
    students.value = response.data.map(student => ({
      ...student,
      major: student.major || 'Unknown' // Ensure 'major' is initialized
    }));
    console.log('Fetched students:', students.value);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}

// Fetch results from the API
async function fetchResults() {
  try {
    const response = await axios.get('http://examresulttest.test/api/results');
    results.value = response.data;

    // Merge students with results based on roll_no
    results.value = results.value.map(result => {
      const student = students.value.find(s => s.roll_no === result.roll_no);
      return {
        ...result,
        major: student ? student.major : 'Unknown'
      };
    });

    console.log('Fetched results with major:', results.value);
  } catch (error) {
    console.error('Error fetching results:', error);
  }
}

// Fetch both students and results
async function fetchData() {
  await Promise.all([fetchStudents(), fetchResults()]);
}

// Search results by roll number or name
function search() {
  const query = searchQuery.value.trim().toLowerCase();
  if (query) {
    filteredResults.value = results.value.filter(result => 
      result.roll_no.toLowerCase().includes(query) || // Exact match for roll_no
      result.student_name.toLowerCase().includes(query) // Partial match for name
    );
    currentPage.value = 1; // Reset to the first page
  } else {
    filteredResults.value = []; // Clear results if search input is empty
  }
}


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

function calculateCreditSubjects(student) {
  const credits = [];
  
  if (student.myanmar >= 75) credits.push('Myanmar');
  if (student.english >= 75) credits.push('English');
  if (student.mathematics >= 80) credits.push('Mathematics');
  if (student.chemistry >= 80) credits.push('Chemistry');
  if (student.physics >= 80) credits.push('Physics');
  
  // Check for biological subject based on the major
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

// Computed property for paginated results
const paginatedResults = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredResults.value.slice(startIndex, endIndex);
});

// Computed property for total pages
const totalPages = computed(() => {
  return Math.ceil(filteredResults.value.length / itemsPerPage);
});

// Methods for pagination
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

// Fetch initial data when the component is mounted
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Container styling */
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

/* Search Bar styling */
.search-bar {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar .label {
  font-weight: bold;
  color: #333;
}

.search-input-container {
  display: flex;
  align-items: center;
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

/* Results Table styling */
.results {
  margin-top: 20px;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.results-table th, .results-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.results-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.pass {
  background-color: #d4edda;
}

.fail {
  background-color: #f8d7da;
}

/* Pagination styling */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination-button {
  padding: 8px 16px;
  border: 1px solid #007bff;
  background-color: #fff;
  color: #007bff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.pagination-button:hover {
  background-color: #007bff;
  color: #fff;
}

.pagination-button:disabled {
  cursor: not-allowed;
  background-color: #e9ecef;
  border-color: #e9ecef;
  color: #6c757d;
}

/* No Results styling */
.no-results {
  margin-top: 20px;
  color: #dc3545;
  font-size: 1.2em;
}
</style>
