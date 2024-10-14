<template>
  <div :class="$style.layout">
    <HeaderOrganism />
    <div :class="$style.image">
      <img
        src="/public/backgound.webp"
        alt="no_photo" />
    </div>
    <div :class="$style.container">
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'

import HeaderOrganism from '@/components/organisms/Header.vue'
</script>
<style lang="scss" module>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;

  .image {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-index-negative;
    user-select: none;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .container {
    @include container;
    margin-top: 3rem;
    width: 100%;
  }
}
</style>
