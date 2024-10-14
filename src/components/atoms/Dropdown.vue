<template>
  <transition
    :enter-from-class="$style.enter"
    :leave-to-class="$style.leaveTo"
    :enter-active-class="$style.enterActive"
    :leave-active-class="$style.leaveActive">
    <div
      v-if="props.isOpen"
      ref="items"
      :class="[$style.items, { [$style.isOpen]: props.isOpen }]"
      @click.stop>
      <slot name="items" />
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: false,
})


const items = ref(null)

const handleClickOutside = event => {
  if (items.value && !items.value.contains(event.target)) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const emit = defineEmits(['close'])
</script>

<style lang="scss" module>
.enter,
.leaveTo {
  opacity: 0;
}

.enterActive,
.leaveActive {
  transition: opacity 0.3s ease;
}

.items {
  z-index: $z-index-dropdown;
  max-height: 0;
  margin-top: 8px;
  overflow-y: auto;
  background-color: $white;
  border-radius: 16px;
  box-shadow: $dropdown-shadow;

  &.isOpen {
    max-height: 1000px;
  }
}
</style>
