<template>
  <div class="page-container">
    <!-- Home Page Content -->
    <!-- <div class="home-content">
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>

      <div v-if="loading" class="loading">Loading...</div>

      <div v-if="studentCounts" class="statistics">
        <h2>Student Counts</h2>
        <p>Total Students: {{ studentCounts.totalStudents }}</p>
        <p>Passed Students: {{ studentCounts.passedCount }}</p>
        <p>Failed Students: {{ studentCounts.failedCount }}</p>
        <p>Pass Percentage: {{ studentCounts.passPercentage }}%</p>
        <p>Fail Percentage: {{ studentCounts.failPercentage }}%</p>
      </div>
    </div> -->

    <!-- Chart Container -->
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>

    <!-- Content of your page -->
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';


const loading = ref(false);
const studentCounts = ref(null);
const chartData = ref(null);
const totalStudents = ref(0);
const studentsPassed = ref(0);
const studentsFailed = ref(0);
const chartCanvas = ref(null);

// Fetch both student counts and chart data on mounted
onMounted(async () => {
  fetchStudentCounts();
  fetchChartData();
});

// Fetch student counts
const fetchStudentCounts = async () => {
  loading.value = true;
  try {
    const response = await fetch('http://examresulttest.test/api/student-counts');
    if (!response.ok) {
      throw new Error('Failed to fetch student counts');
    }
    studentCounts.value = await response.json();
  } catch (error) {
    console.error('Error fetching student counts:', error);
  } finally {
    loading.value = false;
  }
};

// Fetch chart data and render chart
const fetchChartData = async () => {
  try {
    const response = await fetch('http://examresulttest.test/api/chart');
    if (!response.ok) {
      throw new Error('Failed to fetch chart data');
    }
    chartData.value = await response.json();
    renderChart();
    calculateStatistics(); // Calculate statistics after fetching data
  } catch (error) {
    console.error('Error fetching chart data:', error);
  }
};

// Render the chart using Chart.js
const renderChart = () => {
  if (!chartData.value) return;

  const ctx = chartCanvas.value.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.value.labels,
      datasets: [{
        label: 'Pass Rate by Region',
        data: chartData.value.datasets.map(dataset => dataset.data),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};

// Calculate statistics based on chart data
const calculateStatistics = () => {
  if (!chartData.value) return;

  // Calculate total students
  totalStudents.value = chartData.value.datasets.reduce((acc, dataset) => acc + dataset.data.length, 0);

  // Calculate students passed and failed
  studentsPassed.value = chartData.value.datasets.reduce((acc, dataset) => {
    return acc + dataset.data.filter(score => score > 40).length;
  }, 0);

  studentsFailed.value = totalStudents.value - studentsPassed.value;
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px; /* Adjust top padding as needed */
  background-color: #f9f9f9; /* Light background color for the whole page */
}

.home-content {
  width: 80%;
  max-width: 800px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #e3aaaa; /* White background for home content */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(180, 6, 6, 0.883); /* Subtle shadow */
}

.loading {
  color: #666;
  font-style: italic;
}

.chart-container {
  width: 80%; /* Adjust width as needed */
  max-width: 800px; /* Limit maximum width for responsiveness */
  height: 300px;
  margin-top: 300px; /* Adjust height as needed */
  margin-bottom: 20px; /* Add margin bottom for separation */
  background-color: #000306; /* White background for chart container */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(180, 6, 6, 0.883); /* Subtle shadow */
}

.statistics {
  width: 80%;
  max-width: 800px;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #804646;
  border-radius: 8px;
  background-color: #2aa4a0; /* Light cyan background for statistics */
}

.statistics h2 {
  margin-bottom: 10px;
  color: #00796b; /* Darker shade for headings */
}

.statistics p {
  margin: 5px 0;
}

.content {
  width: 80%;
  max-width: 800px;
  background-color: #533c3cc0; /* White background for content */
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
