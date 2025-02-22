<template>
  <div class="container">
    <!-- Toggle between Pass and Fail -->
    <div class="form-container">
      <div class="toggle-pass-fail">
        <label>
          <input type="checkbox" v-model="passChecked"> Pass
        </label>
        <p v-if="passChecked">Pass Count: {{ passCount }}</p>

        <label>
          <input type="checkbox" v-model="failChecked"> Fail
        </label>
        <p v-if="failChecked">Fail Count: {{ failCount }}</p>
      </div>

      <!-- Region Selection Dropdown with Search -->
       <div class="re">
        <div class="region-selection">
          <label for="region_id">Region:</label>
          <select v-model="selectedRegion" @change="handleChange" class="select-region">
            <option value="" disabled>Select Region</option>
            <option v-for="region in filteredRegions" :key="region.id" :value="region.id">{{ region.name }}</option>
          </select>
        </div>
        
        <!-- Conditionally Render Refresh Button -->
        <div v-if="selectedRegion">
          <button @click="handleRefresh" class="refresh-button">Refresh</button>
        </div>
       </div>
     
      
      <!-- Display Selected Region -->
      
      <!-- Credit Subject Filters -->
      <div class="credit-subjects">
        <label>
          <input type="radio" v-model="selectedCreditFilter" value="all"> All
        </label>
        <label>
          <input type="radio" v-model="selectedCreditFilter" value="none"> None
        </label>
        <label>
          <input type="radio" v-model="selectedCreditFilter" value="one"> 1 D
        </label>
        <label>
          <input type="radio" v-model="selectedCreditFilter" value="two"> 2 D
        </label>
        <label>
          <input type="radio" v-model="selectedCreditFilter" value="three"> 3 D
        </label>
        <label>
          <input type="radio" v-model="selectedCreditFilter" value="four"> 4 D
        </label>
        <label>
          <input type="radio" v-model="selectedCreditFilter" value="five"> 5 D
        </label>
        <label>
          <input type="radio" v-model="selectedCreditFilter" value="six"> 6 D
        </label>
      </div>

      <!-- Refresh button -->
      

      <!-- Display Selected Region -->
      <div v-if="!selectedRegion" class="no-region-selected">
        <p>Select a region to view results.</p>
      </div>
    </div>

    <!-- Display Students -->
    <div v-if="filteredResults.length > 0" class="results">
      <h3>Students in {{ selectedRegionName }} Result :</h3>
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Student Name</th>
            <!-- <th>Myanmar</th>
            <th>English</th>
            <th>Mathematics</th>
            <th>Chemistry</th>
            <th>Physics</th>
            <th>Biological</th> -->
            <th>Pass Or Fail</th>
            <th>Credit Subjects</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in paginatedResults" :key="student.id">
            <td>{{ student.roll_no }}</td>
            <td>{{ student.student_name }}</td>
            <!-- <td :class="{ 'pass': student.myanmar > 39, 'fail': student.myanmar <= 39 }">{{ student.myanmar }}</td>
            <td :class="{ 'pass': student.english > 39, 'fail': student.english <= 39 }">{{ student.english }}</td>
            <td :class="{ 'pass': student.mathematics > 39, 'fail': student.mathematics <= 39 }">{{ student.mathematics }}</td>
            <td :class="{ 'pass': student.chemistry > 39, 'fail': student.chemistry <= 39 }">{{ student.chemistry }}</td>
            <td :class="{ 'pass': student.physics > 39, 'fail': student.physics <= 39 }">{{ student.physics }}</td>
            <td :class="{ 'pass': student.biological > 39, 'fail': student.biological <= 39 }">{{ student.biological }}</td> -->
            <td class="res">{{ calculatePassOrFail(student) }}</td>
            <td>{{ formatCreditSubjects(calculateCreditSubjects(student)) }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination Controls -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>

    <div v-if="selectedRegion && filteredResults.length === 0" class="no-results">
      <p>No results found for {{ selectedRegionName }}.</p>
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect, computed } from 'vue';
import axios from 'axios';

// Initialize variables
const selectedRegion = ref('');
const regions = ref([]);
const allResults = ref([]);
const filteredResults = ref([]);
const students = ref([]);
const selectedRegionName = ref('');
const searchQuery = ref('');

// Pagination variables
const currentPage = ref(1);
const itemsPerPage = 10; // Number of items per page

// Checkbox states
const passChecked = ref(true); // Default to showing passed students
const failChecked = ref(false); // Default to hiding failed students

// Selected credit subject filter
const selectedCreditFilter = ref('all'); // Default to 'all'

// Simulate fetching regions from an API
fetchRegions();

async function fetchRegions() {
  try {
    const response = await fetch('http://examresulttest.test/api/regions');
    if (!response.ok) {
      throw new Error('Failed to fetch regions');
    }
    regions.value = await response.json();
  } catch (error) {
    console.error('Error fetching regions:', error);
  }
}

// Fetch students data
async function fetchStudents() {
  try {
    const response = await axios.get('http://examresulttest.test/api/students');
    students.value = response.data;

    // Merge students with results based on roll_no
    allResults.value.forEach(result => {
      const student = students.value.find(s => s.roll_no === result.roll_no);
      if (student) {
        result.major = student.major || 'Unknown';
      }
    });
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}

// Watch for changes in selectedRegion and update selectedRegionName and filteredResults
watchEffect(() => {
  if (selectedRegion.value !== '') {
    const region = regions.value.find(r => r.id === selectedRegion.value);
    selectedRegionName.value = region ? region.name : '';
    updateFilteredResults();
  }
});

// Handle change event to fetch results for the selected region
async function handleChange() {
  try {
    const response = await fetch(`http://examresulttest.test/api/results?region_id=${selectedRegion.value}`);
    if (!response.ok) {
      throw new Error('Failed to fetch results');
    }
    allResults.value = await response.json();
    await fetchStudents(); // Fetch students after getting results
    updateFilteredResults();
  } catch (error) {
    console.error('Error fetching results:', error);
  }
}

// Function to update filteredResults based on selectedRegion, checkbox states, and credit subject filter
function updateFilteredResults() {
  filteredResults.value = allResults.value.filter(student => {
    const studentStatus = calculatePassOrFail(student);
    const creditSubjectsPassed = calculateCreditSubjects(student);

    return (
      student.region_id === selectedRegion.value &&
      ((passChecked.value && studentStatus === 'Pass') || (failChecked.value && studentStatus === 'Fail')) &&
      meetsCreditSubjectFilter(creditSubjectsPassed)
    );
  });
  // Reset pagination to first page when filtering results
  currentPage.value = 1;
}

// Function to calculate Pass or Fail based on scores
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

// Function to calculate credit subjects passed
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
    credits.push('Economics');
  }

  return credits;
}

// Function to format credit subjects as a comma-separated string
function formatCreditSubjects(subjects) {
  return subjects.join(', ');
}

// Function to check if the student meets the selected credit subject filter
function meetsCreditSubjectFilter(subjectsPassed) {
  const subjectsCount = subjectsPassed.length;
  switch (selectedCreditFilter.value) {
    case 'all':
      return true; // Show all students
    case 'none':
      return subjectsCount === 0;
    case 'one':
      return subjectsCount === 1;
    case 'two':
      return subjectsCount === 2;
    case 'three':
      return subjectsCount === 3;
    case 'four':
      return subjectsCount === 4;
    case 'five':
      return subjectsCount === 5;
    case 'six':
      return subjectsCount === 6;
    default:
      return false;
  }
}

// Computed property to count pass students
const passCount = computed(() => {
  return filteredResults.value.filter(student => calculatePassOrFail(student) === 'Pass').length;
});

// Computed property to count fail students
const failCount = computed(() => {
  return filteredResults.value.filter(student => calculatePassOrFail(student) === 'Fail').length;
});

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

// Computed property to filter regions based on search query
const filteredRegions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    return regions.value;
  } else {
    return regions.value.filter(region => region.name.toLowerCase().includes(query));
  }
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

// Function to handle refreshing data
async function handleRefresh() {
  if (!selectedRegion.value) {
    // If no region is selected, do not perform refresh
    return;
  }

  try {
    // Clear current results and students data
    allResults.value = [];
    filteredResults.value = [];
    students.value = [];
    selectedRegion.value = ''; // Clear selected region
    
    // Optionally hide refresh button here
    // No need to explicitly hide button; the v-if in template will handle it
    
    // You may want to update the state or fetch new data if needed
    // await handleChange(); // Only if you want to refetch after clearing
  } catch (error) {
    console.error('Error refreshing data:', error);
  }
}


</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.form-container {
  margin-bottom: 20px;
 
}

.toggle-pass-fail label {
  margin-right: 15px;
}

.toggle-pass-fail p {
  display: inline;
  margin-left: 10px;
}

.region-selection {
  margin: 15px 0;
}

.region-search {
  margin-right: 10px;
  padding: 5px;
}

.select-region {
  padding: 5px;
}

.credit-subjects label {
  margin-right: 15px;
}

.refresh-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.refresh-button:hover {
  background-color: #0056b3;
}

.results table {
  width: 100%;
  border-collapse: collapse;
}

 .results td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.results th {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
.res{
  text-align: center;
}
.results th {
  background-color:#007bff;
}

.pass {
  color: green;
}

.fail {
  color: red;
}

.pagination {
  margin: 15px 0;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
}

.no-region-selected, .selected-region, .no-results {
  margin: 20px 0;
}

</style>
