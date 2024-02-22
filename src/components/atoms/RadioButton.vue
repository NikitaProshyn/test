<template>
   <label :class="[$style.radio, { [$style.checked]: props.isChecked }]">
      <input
         type="radio"
         :value="props.value"
         :checked="props.isChecked"
         :class="$style.input"
         @change="$emit('change', $event.target.value)"
      />
      <slot :class="$style.content"></slot>
   </label>
</template>

<script setup>
const props = defineProps({
   value: {
      type: String,
      default: '',
   },
   isChecked: {
      type: Boolean,
      default: false,
   },
});

defineEmits(['change']);
</script>

<style lang="scss" module>
.radio {
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   padding: 1rem;
   transition: 0.3s ease-in-out;
   border-radius: 1rem;
   border: 0.063rem solid $black;
   width: 100%;

   &:hover {
      background-color: $light-gray;
   }

   &.checked {
      background-color: $light-gray;
   }

   .input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
   }
}
</style>
