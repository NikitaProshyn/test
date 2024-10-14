<template>
  <div :class="$style.container">
    <CatalogOrganism />
  </div>
</template>
<script setup>
import CatalogOrganism from '@/components/organisms/Catalog.vue'
</script>
<style lang="scss" module>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
