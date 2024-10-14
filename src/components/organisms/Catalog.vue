<template>
  <section :class="$style.catalog">
    <template v-if="!!state.catalog?.length && !state.isLoading">
      <div :class="$style.searchInfoWrapper">
        <span :class="$style.search"
          >You searched for: {{ route.query?.search }}</span
        >
        <span :class="$style.count">{{ state.total }} result found</span>
      </div>
      <div :class="$style.cards">
        <CardAtom
          v-for="card of state.catalog"
          :key="card.imdbID"
          :title="card.Title"
          :year="card.Year"
          :id="card.imdbID"
          :type="card.Type"
          :image="card.Poster" />
      </div>
      <PaginationAtom
        v-if="totalPages > 1"
        :currentPage="query.page"
        :totalPages="totalPages"
        @change-page="handleChangePage" />
    </template>
    <EmptyStateAtom
      v-if="!state.catalog?.length && !state.isLoading"
      title="No results were found for your request"
      description="Try again"
      image="/not-found-catalog.webp" />
    <LoaderAtom :is-loading="state.isLoading" />
  </section>
</template>
<script setup>
import { onMounted, reactive, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useDelivery } from '@/composables/delivery'

import CardAtom from '@/components/atoms/Card.vue'
import PaginationAtom from '@/components/atoms/Pagination.vue'
import EmptyStateAtom from '@/components/atoms/EmptyState.vue'
import LoaderAtom from '@/components/atoms/Loader.vue'

const delivery = useDelivery()
const route = useRoute()
const router = useRouter()

const state = reactive({
  catalog: [],
  total: 0,
  isLoading: false,
})

const query = reactive({
  page: 1,
  search: '',
})

const totalPages = computed(() => {
  return Math.ceil(state.total / 10)
})

const handleChangePage = async page => {
  query.page = page

  setQuery()

  await getCatalog()
}

const setQuery = () => {
  const newQuery = {}

  if (query.page > 1) {
    newQuery.page = query.page
  }

  if (route.query?.search) {
    newQuery.search = route.query.search
  }

  router.push({
    path: route.path,
    query: newQuery,
  })
}

const getQuery = () => {
  if (Number(route.query.page) > 1) {
    query.page = Number(route.query.page)
  }

  if (route.query.search) {
    query.search = route.query.search
  }
}

const getCatalog = async () => {
  state.isLoading = true

  const { value, error } = await delivery.CoreService.CatalogActions.getList(
    query
  )

  state.isLoading = false

  if (error) {
    return
  }

  state.total = Number(value.totalResults) ?? 0
  state.catalog = value.Search ?? []
}

watch(
  () => route.query.search,
  async newVal => {
    query.page = 1
    query.search = newVal
    setQuery()

    await getCatalog()
  }
)

onMounted(async () => {
  getQuery()

  await getCatalog()
})
</script>
<style lang="scss" module>
.catalog {
  @include section-margin;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .searchInfoWrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;

    .search,
    .count {
      @include H3;
      color: $black;
    }
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1rem;
  }
}
</style>
