<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { sideMenuItems } from '@/constant/sideMenuItems.js'
import RightChavronIcon from '@/assets/svg/RightChavronIcon.vue'
import CircleIcon from '@/assets/svg/CircleIcon.vue'

const { isExpand } = defineProps(['isExpand'])

const route = useRoute()

const navItems = ref(sideMenuItems)

const openTitle = (e, length) => {
  const target = e.currentTarget.nextSibling
  target.style.height === '0px'
    ? (target.style.height = length * 50 + 'px')
    : (target.style.height = 0)

  let charonIcon = e.currentTarget.children[1]

  charonIcon.classList.contains('rotateChavron')
    ? charonIcon.classList.remove('rotateChavron')
    : charonIcon.classList.add('rotateChavron')
}
</script>
<template>
  <div class="px-2 pt-2 font-admin font-medium" v-for="title in navItems" :key="title.label">
    <div
      class="item text-center text-dashText bg-dashTitleBg rounded-lg cursor-pointer py-2 flex hover:bg-dashTitleBg/80"
      @click="($event) => openTitle($event, title.children.length)"
    >
      <div class="my-auto homeIcon w-6 h-6 w mx-1" :class="title.icon">
        <p
          class="pl-8 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:flex duration-300"
          :class="{ '!opacity-100': isExpand, '!visible': isExpand }"
        >
          {{ title.label }}
        </p>
      </div>
      <RightChavronIcon
        class="ml-auto mr-4 duration-500"
        :class="{
          rotateChavron: route.fullPath.split('/')[2] === title.href.toLowerCase()
        }"
      />
    </div>
    <div
      class="overflow-hidden duration-300"
      :style="{
        height:
          route.fullPath.split('/')[2] === title.href.toLowerCase()
            ? title.children.length * 50 + 'px'
            : 0
      }"
    >
      <router-link
        :to="item.href"
        class="flex mt-2 h-[40px] rounded-lg pl-3 items-center hover:bg-dashHover duration-300"
        :class="{
          currentItem:
            route.fullPath === item.href ||
            route.fullPath.split('/')[3]?.match(/^[^#]*/)[0] ===
              item.href.toLowerCase().split('/')[3],
          adminShadow:
            route.fullPath === item.href ||
            route.fullPath.split('/')[3]?.match(/^[^#]*/)[0] ===
              item.href.toLowerCase().split('/')[3]
        }"
        v-for="item in title.children"
        :key="item.label"
      >
        <CircleIcon class="w-2 h-2 ml-4" />
        <p
          class="pl-4 whitespace-nowrap not-italic text-sm text-dashText"
          :class="{
            '!text-cyan-100':
              route.fullPath === item.href ||
              route.fullPath.split('/')[3]?.match(/^[^#]*/)[0] ===
                item.href.toLowerCase().split('/')[3]
          }"
        >
          {{ item.label }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.currentItem {
  background: linear-gradient(72.47deg, #7367f0 22.16%, rgba(115, 103, 240, 0.7) 76.47%);
  @apply text-cyan-100 hover:!opacity-90;
}
a {
  font-size: 16px !important;
}

.rotateChavron {
  transform: rotate(90deg);
}
</style>
