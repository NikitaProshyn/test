<template>
  <input
    v-model="value"
    :placeholder="props.placeholder"
    :class="$style.input" />
</template>
<script setup>
const props = withDefaults(defineProps(), {
  placeholder: '',
  
})

const value = defineModel({ default: '', type: String })
</script>
<style lang="scss" module>
.input {
  @include main;
  padding: 0.5rem;
  max-width: 25rem;
  width: 100%;
  outline: none;
  background-color: transparent;
  border: 0.063rem solid $white;
  border-radius: 0.25rem;
  height: 2rem;
  background-color: $white;
  transition: all 0.3s ease;

  &::placeholder {
    @include main;
    color: $light-gray;
  }

  &:focus {
    border-color: $black;
  }
}
</style>
