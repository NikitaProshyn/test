<template>
  <div :class="$style.card">
    <div :class="$style.image">
      <img
        :src="props.image"
        alt="no_photo"
        @error="setDefaultImage" />
    </div>
    <div :class="$style.mainInfo">
      <span :class="$style.info">Name: {{ props.title }}</span>
      <span :class="$style.info">Year: {{ props.year }}</span>
      <span :class="$style.info">ID: {{ props.id }}</span>
      <span :class="$style.info">Type: {{ props.type }}</span>
    </div>
  </div>
</template>
<script setup>
import { setDefaultImage } from '@/helpers/image';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  year: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'Movie',
  },
  image: {
    type: String,
    default: '',
  },
})
</script>
<style lang="scss" module>
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border: 0.063rem solid $black;
  padding: 1rem;
  border-radius: 0.5rem;

  .image {
    max-width: 25rem;
    max-height: 25rem;
    height: 100%;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1rem;
    }
  }

  .mainInfo {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .info {
      @include main;
      color: $black;
    }
  }
}
</style>
