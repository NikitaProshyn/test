<template>
   <button
      :class="$style.button"
      :disabled="props.disabled"
      @click="$emit('click')"
   >
      <slot :class="$style.content"></slot>
   </button>
</template>

<script setup>
const props = withDefaults(defineProps(), {
   disabled: {
      type: Boolean,
      default: false,
   },
   buttonText: {
      type: String,
      default: '',
   },
});

defineEmits(['click']);
</script>

<style lang="scss" module>
.button {
   display: flex;
   align-items: center;
   max-width: max-content;
   padding: 1rem 2rem;
   cursor: pointer;
   border: 0.063rem solid $black;
   border-radius: 1rem;
   transition: 0.3s ease-in-out;

   &:disabled {
      cursor: default;
      opacity: 0.4;
   }

   &:not(:disabled):hover {
      background-color: $light-gray;
   }
}
</style>
