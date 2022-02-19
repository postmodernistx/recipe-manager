import { createRouter, createWebHistory } from 'vue-router';

import ViewHome from '../views/ViewHome.vue';

const routes = [
  {
    path: '/',
    name: 'ViewHome',
    component: ViewHome,
  },
  {
    path: '/recipe/:name',
    name: 'RecipeSingle',
    component: () => import('../views/RecipeSingle/RecipeSingle.vue'),
  },
  {
    path: '/new-recipe',
    name: 'NewRecipe',
    component: () => import('../views/NewRecipe/NewRecipe.vue'),
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'Error404',
  //   component: () => import(/* webpackChunkName: "error404" */ '../views/Error404.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0, behavior: 'smooth' };
  },
});

export default router;
