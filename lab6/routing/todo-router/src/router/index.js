import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddTodo from '../views/AddTodo.vue'
import TaskDetail from '../views/TaskDetail.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add',
    name: 'add',
    component: AddTodo
  },
  {
    path: '/task/:id',
    name: 'task',
    component: TaskDetail
  },
  {
    path: '/task/:id/delete',
    name: 'delete',
    component: TaskDetail,
    props: true
  },
  {
    path: '/task/:id/complete',
    name: 'complete',
    component: TaskDetail,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router