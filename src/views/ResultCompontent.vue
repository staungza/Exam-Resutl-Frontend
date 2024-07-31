<template>
  <div class="container">
    <!-- Region Selection Dropdown -->
    <label for="region_id" class="label">Region:</label>
    <select v-model="selectedRegion" @change="handleRegionChange" class="select-region">
      <option value="" disabled>Select Region</option>
      <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
    </select>

    <!-- Township Selection Dropdown (Only shows if a region is selected) -->
    <div v-if="selectedRegion">
      <label for="township_id" class="label">Township:</label>
      <select v-model="selectedTownship" class="select-township" :disabled="loadingTownships">
        <option value="" disabled>Select Township</option>
        <option v-for="township in townships" :key="township.id" :value="township.id">{{ township.name }}</option>
      </select>
      
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

// Initialize state variables
const selectedRegion = ref('');
const selectedTownship = ref('');
const regions = ref([]);
const townships = ref([]);
const loadingTownships = ref(true);

// Computed property to filter townships based on the selected region
// const filteredTownships = computed(() => {
//   const regionId = selectedRegion.value;
//   // Ensure that filtering is only performed if a valid region is selected
//   if (regionId) return [];
//   return townships.value.filter(township => township.region_id === regionId);
// });

// Fetch regions from the API
async function fetchRegions() {
  try {
    const response = await axios.get('http://examresulttest.test/api/regions');
    regions.value = response.data;
    console.log('Fetched Regions:', regions.value); // Debugging
  } catch (error) {
    console.error('Error fetching regions:', error);
  }
}

watch(selectedRegion, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    try {
      const response = await axios.get('http://examresulttest.test/api/townships', {
        params: {
          region_id: newValue
        }
      });
      console.log(response.data); // Handle the response data
      townships.value = response.data;
    } catch (error) {
      console.error('Error fetching townships:', error);
    }
  }
});

// Fetch townships from the API
async function fetchTownships() {
  try {
    loadingTownships.value = true;
    const response = await axios.get('http://examresulttest.test/api/townships');
    townships.value = response.data;
    console.log('Fetched Townships:', townships.value); // Debugging
  } catch (error) {
    console.error('Error fetching townships:', error);
  } finally {
    loadingTownships.value = false;
  }
}

// Handle region change event to reset township selection
function handleRegionChange() {
  selectedTownship.value = ''; // Reset township selection when region changes
}

// Fetch initial data when the component is mounted
onMounted(async () => {
  await fetchRegions();
  await fetchTownships();
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.label {
  display: block;
  margin-bottom: 5px;
}

.select-region, .select-township {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
