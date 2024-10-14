<template>
  <div
    v-if="props.isLoading"
    :class="$style.loaderOverlay">
    <div :class="$style.spinner" />
  </div>
</template>

<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" module>
.loaderOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .spinner {
    width: 3rem;
    height: 3rem;
    border: 4px solid $blue;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
