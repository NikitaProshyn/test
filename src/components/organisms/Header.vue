<template>
  <header :class="$style.header">
    <div :class="$style.content">
      <h2 :class="$style.logo">Movie Catalog</h2>
      <InputAtom
        :model-value="query.search"
        placeholder="Start search"
        @input="handleInput" />
      <div :class="$style.rightSide">
        <div
          :class="$style.userWrapper"
          @click="state.isUserDropdownOpen = !state.isUserDropdownOpen">
          <span :class="$style.user">Nikita Proshyn</span>
          <div
            :class="[
              $style.arrowDownWrapper,
              {
                [$style.openArrowDownWrapper]: state.isUserDropdownOpen,
              },
            ]">
            <IconAtom
              name="arrow-down"
              :class="$style.arrowDown" />
          </div>
        </div>
        <DropdownAtom
          :is-open="state.isUserDropdownOpen"
          :class="$style.dropdown">
          <template #items>
            <div :class="$style.dropdownItems">
              <span>123</span>
            </div>
          </template>
        </DropdownAtom>
      </div>
    </div>
  </header>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { debounce } from '@/helpers/common'

import DropdownAtom from '@/components/atoms/Dropdown.vue'
import InputAtom from '@/components/atoms/Input.vue'
import IconAtom from '@/components/atoms/Icon.vue'

const route = useRoute()
const router = useRouter()

const handleInput = event => {
  query.search = event.target.value

  setQueryDebounce()
}

const setQuery = () => {
  const newQuery = {}

  if (route.query?.page > 1) {
    newQuery.page = route.query.page
  }

  if (query.search) {
    newQuery.search = query.search
  }

  router.push({
    path: route.path,
    query: newQuery,
  })
}

const getQuery = () => {
  if (route.query?.search) {
    query.search = route.query.search
  }
}

const setQueryDebounce = debounce(setQuery, 500)

const state = reactive({
  isUserDropdownOpen: false,
})

const query = reactive({
  search: '',
})

onMounted(() => {
  getQuery()
})
</script>
<style lang="scss" module>
.header {
  position: sticky;
  top: 0;
  left: 0;
  padding: 1rem 0;
  background-color: $green;

  .content {
    @include container;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    .logo {
      @include H2;
      color: $white;
    }

    .rightSide {
      display: flex;
      align-items: center;
      gap: 1rem;

      .userWrapper {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;

        .user {
          @include main;
          color: $white;
        }

        .arrowDownWrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease-in-out;

          .arrowDown {
            path {
              fill: $white;
            }
          }

          &.openArrowDownWrapper {
            transition: all 0.3s ease;
            transform: rotate(180deg);
          }
        }
      }

      .dropdown {
        position: absolute;
        right: 3rem;
        top: 3rem;
        z-index: $z-index-dropdown;

        .dropdownItems {
          display: flex;
          flex-direction: column;
          width: 240px;
          height: 100%;
          padding: 12px;
        }
      }
    }
  }
}
</style>
