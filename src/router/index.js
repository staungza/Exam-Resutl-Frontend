// router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue' // Replace with your actual Home component
import Student from '../views/StudentList.vue' // Replace with your actual About component
import Result from '../views/ResultCompontent.vue'
import Show from '../views/TestPage.vue'
import Region from '../views/RegionList.vue'
import Select from '../views/SelectPage.vue'
import About from '../views/AboutPage.vue'
import TestPage from '../views/TestPage.vue'
import SearchPage from '../views/SearchPage.vue'
import ResultsPage from '../views/ResultsPage.vue'


import Township from '../views/TownshipList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  },
  {
    path: '/studentresult',
    name: 'Student',
    component: Student
  },
  {
    path: '/main',
    name: 'ShowResult',
    component: Show
  },
  {
    path: '/region',
    name: 'ShowResult',
    component: Region
  },
  {
    path: '/township',
    name: 'Township',
    component: Township
  },{
    path: '/select',
    name: 'Select',
    component: Select
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/test',
    name: 'Test',
    component: TestPage
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  },
  {
    path: '/results',
    name: 'Results',
    component: ResultsPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
