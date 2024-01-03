<template>
  <div class="headerNav-wrapper h-12">
    <div class="nav">
      <ul class="flex w-full justify-between">
        <li
          class="relative flex flex-1 h-12 items-center w-full justify-center cursor-pointer"
          v-for="navItem in navItems"
          :key="navItem.id"
        >
          <router-link :to="navItem.href">
            <p class="font-Krub font-medium text-[15px] text-center">{{ navItem.label }}</p>
          </router-link>
          <ul
            class="invisible opacity-0 absolute top-full left-0 right-0 w-full bg-white border border-info rounded-lg p-2 z-30"
            v-if="navItem.children.length"
          >
            <li
              class="hover:bg-menuHover duration-100 rounded-lg"
              v-for="childItem in navItem.children"
              :key="childItem.id"
            >
              <p
                class="kern cursor-pointer capitalize font-Krub text-dashText hover:text-primary py-2 pl-2 !text-xs font-bold"
              >
                {{ childItem.label }}
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { navItems } from '@/constant/headerNav'

</script>

<style scoped>
.nav li:hover > ul {
  opacity: 1;
  visibility: visible;
}
.nav > ul > li li + li {
  margin-top: 4px;
}
.kern {
  font-feature-settings: 'kern';
}
</style>
