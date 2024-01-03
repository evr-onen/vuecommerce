<template>
  <div class="wrapper relative">
    <div class="bg-info p-2 rounded-md cursor-pointer">
      <slot class="" />
    </div>
    <div class="note flex">
      <slot name="note" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.note {
  @apply invisible opacity-0 duration-300 absolute top-[135%] left-1/2 -translate-x-1/2  w-max max-w-[20rem] border border-info bg-body rounded-md shadow-md py-1 px-2 z-50 text-xs;
}
.wrapper > div:hover + div {
  @apply opacity-100 visible;
}
</style>
