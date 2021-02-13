import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: () => import('@/views/Shop.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('@/views/Product.vue'),
    meta: {
      layout: 'main',
      auth: false
    },
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/products',
    component: () => import('@/views/Admin.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/admin/Products.vue')
      },
      {
        path: 'product/:id',
        component: () => import('@/views/admin/Product.vue'),
        props: true
      },
      {
        path: 'categories',
        component: () => import('@/views/admin/Categories.vue')
      },
      {
        path: 'playground',
        component: () => import('@/views/admin/Playground.vue')
      }
    ],
    meta: {
      layout: 'admin',
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requareAuth = to.meta.auth

  if (requareAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requareAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
