<template>
  <div id="app" class="flex flex-col min-h-screen bg-gray-200">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4 border-b border-gray-300 fixed inset-x-0 top-0 z-50">
      <nav class="flex justify-end">
        <ul class="flex space-x-4">
          <li>
            <router-link to="/search" class="nav-link">
              <i class="fas fa-chart-line"></i> Home
            </router-link>
          </li>
          <!-- <li>
            <router-link to="/studentresult" class="nav-link">
              <i class="fas fa-users"></i> Home
            </router-link>
          </li> -->
          <li>
            <router-link to="/region" class="nav-link" :class="{ 'font-bold': $route.path === '/region' }">
              <i class="fas fa-chart-line"></i> Region List
            </router-link>
          </li>
          <li>
            <router-link to="/township" class="nav-link" :class="{ 'font-bold': $route.path === '/township' }">
              <i class="fas fa-chart-line"></i> Township List
            </router-link>
          </li>
          <li>
            <router-link to="/about" class="nav-link">
              <i class="fas fa-chart-line"></i> About
            </router-link>
          </li>
          
         
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1 pt-16 p-4 bg-gray-100 overflow-auto">
      <router-view></router-view>
    </main>
  </div>
</template>


<script>
export default {
  name: 'App',
  // Your data and methods go here
};
</script>

<style scoped>
/* Scoped styles for this component */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #bb7a7a; /* Light grey background for the whole app */
}

header {
  background-color: white; /* Primary color for header */
  color: white;
  padding: 10px;
  border-bottom: 1px solid #cccccc;
}

nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center; 
}

nav li {
  margin-right: 10px;
}

.nav-link {
  color: #007bff;
  text-decoration: none;
  padding: 10px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #c3d4e4; /* Darker shade for hover effect */
  border-radius: 5px;
}

main {
  flex: 1;
  padding: 20px;
  background-color:white; /* Light grey background for main content area */
}

aside {
  background-color: #2e21e6; /* White background for sidebar */
  padding: 20px;
  border-left: 1px solid #ccc;
  width: 250px;
}

.sidebar {
  background-color: #400bed; /* Light grey background for sidebar widgets */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Shadow effect */
}

h2 {
  margin-bottom: 10px;
  color: #3498db; /* Primary color for headings */
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  margin-bottom: 10px;
}

.router-link-active {
  font-weight: bold;
}

.router-link-active::before {
  content: "• "; /* Bullet point before active link */
  color: #3498db; /* Primary color for active link bullet */
}
</style>
