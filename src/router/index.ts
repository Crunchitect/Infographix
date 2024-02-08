import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/sign-up',
      redirect: '/sign-in'
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('../views/Projects.vue')
    },
    {
      path: '/google-auth',
      redirect: '/projects'
    },
    {
      path: '/slide/404',
      name: 'SlideNotFound',
      component: () => import('../views/core/NoSlide.vue')
    },
    {
      path: '/slide/:id',
      name: 'Slide',
      component: () => import('../views/core/Slides.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    },
    {
      path: '/place',
      redirect: '/slide/fdb8fad1-c0f9-41b8-a85b-2a323d614838'
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    },
  ]
})

export default router
