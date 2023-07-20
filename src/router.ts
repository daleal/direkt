import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    component: HomeView,
  },
] satisfies RouteRecordRaw[];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
