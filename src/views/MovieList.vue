<script setup lang="ts">
import { request } from '@/api'
import { useConfigStore } from '@/stores/config'
import { computed, ref } from 'vue'

const configStore = useConfigStore()

await request
  .get('/configuration')
  .then((response) => {
    configStore.data = response.data
  })
  .catch((error) => {
    throw new Error(error)
  })

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
</script>

<template>
  <main>
    <div v-for="movie in sortedTrending" :key="movie.id">
      {{ movie.title }}
    </div>
  </main>
</template>
