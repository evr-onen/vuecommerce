import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/content/PageLayout.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/content/auth/PageLayout.vue')
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: () => import('@/views/admin/dashboard/PageLayout.vue')
    },
    {
      path: '/admin/products/create',
      name: 'products-create',
      component: () => import('@/views/admin/products/create/PageLayout.vue')
    },
    {
      path: '/admin/products/edit',
      name: 'products-edit',
      component: () => import('@/views/admin/products/edit/PageLayout.vue')
    },
    {
      path: '/admin/products/edit/:id',
      name: 'products-editProducts',
      component: () => import('@/views/admin/products/edit/id/PageLayout.vue')
    },
    {
      path: '/admin/pagetemplates/cart',
      name: 'pageTemplate-cart',
      component: () => import('@/views/admin/pageTemplates/cart/PageLayout.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('@/views/content/shop/PageLayout.vue')
    },
    {
      path: '/products/:id',
      name: 'singleProduct',
      component: () => import('@/views/content/products/id/PageLayout.vue')
    },
    {
      path: '/shop/cart',
      name: 'cartPage',
      component: () => import('@/views/content/shop/cart/PageLayout.vue')
    },
    {
      path: '/shop/wishlist',
      name: 'wishlistPage',
      component: () => import('@/views/content/shop/wishlist/PageLayout.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
