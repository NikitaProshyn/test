<template>
  <div :class="$style.pagination">
    <div
      :class="[
        $style.arrowPaginationPreviewWrapper,
        { [$style.disabled]: props.currentPage <= 1 },
      ]"
      @click="$emit('change-page', props.currentPage - 1)">
      <IconAtom
        name="arrow-pagination-preview"
        :class="$style.iconPreview" />
    </div>
    <ul :class="$style.paginationItems">
      <li
        v-for="(page, index) of paginationPages"
        :key="index"
        :class="$style.paginationItem">
        <button
          v-if="String(page) !== '...'"
          :class="[
            $style.paginationButton,
            { [$style.active]: props.currentPage === page },
          ]"
          @click="$emit('change-page', page)">
          {{ page }}
        </button>
        <span
          v-else
          :class="$style.dots"
          >...</span
        >
      </li>
    </ul>
    <div
      :class="[
        $style.arrowPaginationNextWrapper,
        { [$style.disabled]: props.currentPage >= props.totalPages },
      ]"
      @click="$emit('change-page', props.currentPage + 1)">
      <IconAtom
        name="arrow-pagination-next"
        :class="$style.iconNext" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'

import IconAtom from '@/components/atoms/Icon.vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
})

const paginationPages = computed(() => {
  let paginationArray = []

  if (props.totalPages <= 7) {
    paginationArray = Array.from(
      { length: props.totalPages },
      (_, index) => index + 1
    )

    return paginationArray
  }

  if (props.totalPages > 7 && props.currentPage < 5) {
    paginationArray = [1, 2, 3, 4, 5, '...', props.totalPages]
    return paginationArray
  }

  if (props.currentPage >= 5 && props.currentPage <= props.totalPages - 3) {
    paginationArray = [
      1,
      '...',
      props.currentPage - 1,
      props.currentPage,
      props.currentPage + 1,
      '...',
      props.totalPages,
    ]
    return paginationArray
  }

  if (props.currentPage >= props.totalPages - 3) {
    paginationArray = [
      1,
      '...',
      props.totalPages - 3,
      props.totalPages - 2,
      props.totalPages - 1,
      props.totalPages,
    ]
    return paginationArray
  }

  return paginationArray
})

defineEmits(['change-page'])
</script>
<style lang="scss" module>
.pagination {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin: 0 auto;

  .arrowPaginationPreviewWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.3s ease;

    @include media-hover {
      &:hover {
        background-color: $light-gray;
      }
    }

    &.disabled {
      pointer-events: none;
      cursor: default;
      background-color: unset;

      .iconPreview {
        path {
          fill: $light-gray;
        }
      }
    }
  }

  .paginationItems {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    .paginationItem {
      .paginationButton {
        @include main;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 2rem;
        height: 2rem;
        padding: 0.5rem 1rem;
        color: $gray;
        cursor: pointer;
        background-color: unset;
        border: none;
        border-radius: 50%;
        transition: all 0.3s ease;

        @include media-hover {
          &:hover {
            background-color: $light-gray;
          }
        }

        &.active {
          color: $white;
          background-color: $blue;
          pointer-events: none;
        }
      }

      .dots {
        @include main;
        color: $gray;
      }
    }
  }

  .arrowPaginationNextWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.3s ease;

    @include media-hover {
      &:hover {
        background-color: $light-gray;
      }
    }

    &.disabled {
      pointer-events: none;
      cursor: default;
      background-color: unset;

      .iconNext {
        path {
          fill: $light-gray;
        }
      }
    }
  }
}
</style>
