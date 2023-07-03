<script setup lang="ts">
import LazyImage from '@/components/LazyImage.vue'
import { request } from '@/api'
import { getImage } from '@/utils'
import { computed, ref } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import type { Movie, TVShow } from 'types'

const loading = ref(true)
const trending = ref<{
  page: number
  results: Movie[] | TVShow[]
  total_results: number
  total_pages: number
}>({ page: 1, results: [], total_results: 0, total_pages: 0 })
const sortedTrending = computed(() => {
  const results = [...trending.value.results]
  if (!results) return []
  return results.sort((a, b) => {
    return b.popularity - a.popularity
  })
})
const page = ref(1)
const query = computed(() => {
  const params = {
    page: page.value.toString()
  }

  return new URLSearchParams(params).toString()
})
const getTrending = async () => {
  loading.value = true
  try {
    const response = await request.get(`/trending/all/week?${query.value}`)
    loading.value = false
    return response.data
  } catch (error) {
    throw new Error(error)
  } finally {
    loading.value = false
  }
}
const _trending = await getTrending()
trending.value = _trending

const getRouteTo = (media_type: 'tv' | 'movie' | 'person', id: number) => {
  return `/${media_type}/${id}`
}

const displayPoster = (path: string) => getImage(path)

const displaySmallPoster = (path: string) => getImage(path, 'w45')

const listWrapper = ref<HTMLElement>()
useInfiniteScroll(
  listWrapper,
  async () => {
    if (!loading.value && page.value < trending.value.total_pages) {
      page.value++
      const nextPageTrending = await getTrending()
      trending.value = {
        ...trending.value,
        page: nextPageTrending.page,
        results: [...trending.value.results, ...nextPageTrending.results]
      }
    }
  },
  { distance: 5, direction: 'bottom', interval: 250 }
)
</script>

<template>
  <main class="pt-28 max-h-screen h-full overflow-y-scroll" ref="listWrapper">
    <div class="grid grid-cols-3 gap-10 max-w-[800px] mx-auto">
      <RouterLink
        class="rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/30"
        v-for="movie in sortedTrending"
        :key="movie.id"
        :to="getRouteTo(movie.media_type, movie.id)"
      >
        <LazyImage
          :src="displayPoster(movie.poster_path)"
          :src-placeholder="displaySmallPoster(movie.poster_path)"
        />
      </RouterLink>
    </div>
  </main>
</template>
