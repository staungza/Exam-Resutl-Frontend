<template>
  <div class="bg-[#CAF4FF] w-full min-h-screen">
    <section class="py-20">
      <h2 class="text-4xl font-extrabold text-cyan-600 text-center">About</h2>
      <div class="about">
      <p class="my-6 text-lg text-gray-700 text-center max-w-4xl mx-auto px-4 ">
        Our goal with this system is to enhance transparency, efficiency, and
        accountability in managing student academic records.<br />
        We believe it will empower educators and administrators alike to make
        informed decisions and provide targeted support to students based on
        their academic needs.
      </p>
      </div>
    </section>

    <!-- Main Section -->
    <main class="py-12">
      <section id="welcome" class="welcome">
        <div class="container mx-auto px-4">
          <div class="section-title text-center mb-12">
            <h1 class="text-3xl font-extrabold text-cyan-600">
              Contact Information
            </h1>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left Column -->
            <div class="contact-info-box-content bg-white rounded-lg shadow-lg p-8">
              <h2 class="company-name-head font-bold text-xl mb-6">
                Za Information Technology Co., Ltd.
              </h2>
              <div class="contact_info mb-4 flex items-center">
                <i class="fa fa-map-marker text-cyan-600 text-2xl mr-3"></i>
                <span class="text-gray-700">Address: </span>
                <p>132, 7th Floor, Anawrahta Road, Botahtaung Tsp, YANGON.</p>
              </div>
              <div class="contact_info mb-4 flex items-center">
                <i class="fa fa-envelope text-cyan-600 text-2xl mr-3"></i>
                <span class="text-gray-700">Mail: </span>
                <a href="mailto:contact@za.com" class="text-cyan-600 hover:underline">contact@za.com</a>
              </div>
              <div class="contact_info mb-4 flex items-center">
                <i class="fa fa-envelope text-cyan-600 text-2xl mr-3"></i>
                <span class="text-gray-700">Technical Support: </span>
                <a href="mailto:techsupport@geniusedusoft.com" class="text-cyan-600 hover:underline">techsupport@geniusedusoft.com</a>
              </div>
            </div>
            <!-- Right Column -->
            <div class="contact-info-box-content bg-white rounded-lg shadow-lg p-8">
              <div class="contact_info flex items-center">
                <i class="fa fa-phone text-cyan-600 text-2xl mr-3"></i>
                <span class="text-gray-700 text-lg">Cell: </span>
                <span class="text-gray-800">+91 -93270 01952</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer Section -->
    <footer class="bg-cyan-600 text-white py-4">
      <div class="container mx-auto text-center">
        Copyright © 2024
        <a href="https://www.education.com/" class="text-white hover:underline ml-1" title="Education Management System">Education Management System</a>
        All Rights Reserved.
      </div>
    </footer>
  </div>
</template>
<style scoped>
/* Scoped styles */

body {
  font-family: 'Arial', sans-serif;
}

.bg {
  background-color: #CAF4FF;
}

.text-cyan-600 {
  color: #1872e0; /* Cyan color */
}

.text-gray-500 {
  color: #6B7280; /* Gray color */
}

.text-gray-700 {
  color: #4B5563; /* Darker gray */
}

.text-gray-800 {
  color: #1F2937; /* Even darker gray */
}

.bg-white {
  background-color: #ffffff;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.text-center {
  text-align: center;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.p-8 {
  padding: 2rem;
}

.max-w-4xl {
  max-width: 56rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mr-3 {
  margin-right: 0.75rem;
}

.text-xl {
  font-size: 1.25rem; /* 20px */
}

.text-2xl {
  font-size: 1.5rem; /* 24px */
}

.text-3xl {
  font-size: 1.875rem; /* 30px */
}

.text-4xl {
  font-size: 2.25rem; /* 36px */
}

.hover\:underline:hover {
  text-decoration: underline;
}

.ml-1 {
  margin-left: 0.25rem;
}

.bg-cyan-600 {
  background-color: #06B6D4;
}

.text-white {
  color: #ffffff;
}
.about{
  margin-left: 25%;
  margin-right: 25%;
 
  justify-content: center
}
</style>
