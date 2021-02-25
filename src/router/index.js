import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: () => import('@/views/Shop.vue'),
    meta: { layout: 'main', auth: false }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('@/views/Product.vue'),
    meta: { layout: 'main', auth: false },
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue'),
    meta: { layout: 'main', auth: false }
  },
  {
    path: '/orders/:userId',
    name: 'Orders',
    component: () => import('@/views/Orders.vue'),
    meta: { layout: 'main', auth: true },
    props: true
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/Auth.vue'),
    meta: { layout: 'auth', auth: false }
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/products',
    component: () => import('@/views/admin/Admin.vue'),
    meta: { layout: 'admin', auth: true, admin: true },
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/admin/Products.vue')
      },
      {
        path: 'product/:id',
        component: () => import('@/views/admin/Product.vue'),
        props: true
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('@/views/admin/Categories.vue')
      },
      {
        path: 'category/:id',
        component: () => import('@/views/admin/Category.vue'),
        props: true
      },
      {
        name: 'AdminOrders',
        path: 'orders',
        component: () => import('@/views/admin/Orders.vue')
      },
      {
        path: 'order/:id',
        component: () => import('@/views/admin/Order.vue'),
        props: true
      },
      {
        path: 'playground',
        component: () => import('@/views/admin/Playground.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const requireAdmin = to.meta.admin

  if (requireAdmin) {
    if (store.getters['auth/isAdmin']) {
      return next()
    } else {
      return next('/auth?message=admin')
    }
  }

  if (requireAuth) {
    if (store.getters['auth/isAuthenticated']) {
      return next()
    } else {
      return next('/auth?message=auth')
    }
  }

  next()
})

export default router
