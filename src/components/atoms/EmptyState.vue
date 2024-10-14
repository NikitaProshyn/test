<template>
  <div :class="$style.emptyState">
    <div :class="$style.image">
      <img
        :src="props.image"
        alt="no_photo" />
    </div>
    <div :class="$style.mainInfo">
      <h3 :class="$style.title">{{ props.title }}</h3>
      <span :class="$style.description">{{ props.description }}</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})
</script>
<style lang="scss" module>
.emptyState {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  .image {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 15rem;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .mainInfo {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    text-align: center;
    max-width: 30rem;

    .title,
    .description {
      @include main;
      color: $black;
    }
  }
}
</style>
