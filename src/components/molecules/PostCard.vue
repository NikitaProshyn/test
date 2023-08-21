<template>
   <div :class="$style.card">
      <h3 :class="$style.title">{{ title }}</h3>
      <span :class="$style.description">{{ description }}</span>
      <span :class="$style.authorName">{{ authorName }}</span>
   </div>
</template>
<script>
export default {
   props: {
      title: {
         type: String,
         default: '',
      },
      description: {
         type: String,
         default: '',
      },
      authorName: {
         type: String,
         default: '',
      },
   },
};
</script>
<style lang="scss" module>
.card {
   display: flex;
   flex-direction: column;
   gap: 1rem;
   padding: 1rem;
   border: 0.063rem solid $black;

   .title {
      @include bold-default;
      color: $blue;
   }

   .description {
      @include text-default;
      color: $black;
   }

   .authorName {
      @include text-default;
      display: flex;
      align-items: flex-end;
      height: 100%;
      color: $gray;
   }
}
</style>
