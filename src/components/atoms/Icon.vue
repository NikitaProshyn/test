<template>
   <component :is="setIcon()" @click="$emit('click')" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
   name: {
      type: String,
      default: '',
   },
});

defineEmits(['click']);

const setIcon = () =>
   defineAsyncComponent(() => import(`../../assets/icons/${props.name}.svg`));
</script>
