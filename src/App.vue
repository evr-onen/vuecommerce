<template>
  <ContentLayout v-if="route.fullPath.split('/')[1] !== 'admin'">
    <router-view />
  </ContentLayout>
  <AdminLayout v-else-if="route.fullPath.split('/')[1] === 'admin'">
    <router-view />
  </AdminLayout>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import Cookies from 'js-cookie'

import ContentLayout from '@/layouts/ContentLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useUserStore } from '@/stores/UserStore'

const { getUserDetailFromCookie, getCartItemsFromCookie } = useUserStore()
const token = Cookies.get('token')
const carts = Cookies.get('cart')

if (token) {
  getUserDetailFromCookie(token)
}
if (carts) {
  getCartItemsFromCookie(carts)
}
const route = useRoute()
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Krub:wght@300;400;500;600;700&family=Public+Sans:wght@500&display=swap');
</style>
