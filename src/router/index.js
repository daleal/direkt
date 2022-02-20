import Vue from 'vue';
import VueRouter from 'vue-router';
import { handleShare } from '../handlers/handleShare';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/share/:data',
    name: 'Share',
    beforeEnter: handleShare,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
