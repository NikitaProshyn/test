<template>
   <div :class="$style.wrapper">
      <input
         type="text"
         :class="$style.input"
         :placeholder="placeholder"
         :value="modelValue"
         :disabled="disabled"
         @input="$emit('update:modelValue', $event.target.value)"
      />
      <img
         src="@/assets/icons/search.svg"
         alt="icon"
         :class="$style.icon"
         @click="$emit('search')"
      />
   </div>
</template>
<script>
export default {
   props: {
      placeholder: {
         type: String,
         default: '',
      },
      modelValue: {
         type: String,
         default: '',
      },
      disabled: {
         type: Boolean,
         default: false,
      },
   },
};
</script>
<style lang="scss" module>
.wrapper {
   display: flex;
   gap: 0.5rem;
   .icon {
      cursor: pointer;
   }

   .input {
      width: 10rem;
      border: none;
      text-decoration: none;
      border-bottom: 0.063rem solid $black;

      &:focus {
         outline: none;
      }
   }
}
</style>
