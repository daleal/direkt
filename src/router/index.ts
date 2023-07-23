import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { handleShare } from './guards';

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/share/:data',
    beforeEnter: handleShare,
    component: () => null,
  },
] satisfies RouteRecordRaw[];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
