<template>
  <div class="wrapper relative h-full flex flex-col justify-center !bg-white">
    <div class="cursor-pointer">
      <slot />
    </div>
    <div class="menu flex">
      <slot name="menu" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
div.menu {
  @apply invisible opacity-0 duration-300 absolute top-[100%] left-1/2 -translate-x-1/2  w-max max-w-[20rem] border border-info bg-body rounded-md shadow-md py-1 px-2 z-50 text-xs;
}
.wrapper:hover > div.menu {
  @apply opacity-100 visible;
}
</style>
