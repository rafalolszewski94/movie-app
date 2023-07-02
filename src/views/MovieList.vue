<script setup lang="ts">
import LazyImage from '@/components/LazyImage.vue'
import { request } from '@/api'
import { getImage } from '@/utils'
import { computed, ref } from 'vue'

const trending = ref()
const sortedTrending = computed(() => {
  const results = [...trending.value.results]
  if (!results) return []
  return results.sort((a, b) => {
    return b.popularity - a.popularity
  })
})
await request
  .get(`/trending/all/day`)
  .then((response) => {
    trending.value = response.data
  })
  .catch((error) => {
    throw new Error(error)
  })

const displayPoster = (path: string) => {
  return getImage(path)
}

const displaySmallPoster = (path: string) => {
  return getImage(path, 'w45')
}
</script>

<template>
  <main>
    <div class="grid grid-cols-3 gap-10">
      <RouterLink
        class="rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/30"
        v-for="movie in sortedTrending"
        :key="movie.id"
        :to="movie.media_type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`"
      >
        <LazyImage
          :src="displayPoster(movie.poster_path)"
          :src-placeholder="displaySmallPoster(movie.poster_path)"
        />
      </RouterLink>
    </div>
  </main>
</template>
