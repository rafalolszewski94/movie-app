<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const routerGoBack = () => {
  router.go(-1)
}

const notHomeRoute = computed(() => {
  return router.currentRoute.value.path !== '/'
})
</script>

<template>
  <header
    class="absolute -translate-x-1/2 left-1/2 w-full top-3 pb-3 mb-6 z-10 px-2 max-w-[800px] mx-auto"
  >
    <nav class="flex justify-between bg-black/70 backdrop-blur-md rounded-lg px-4">
      <RouterLink to="/" class="py-2 px-4 -mx-4">
        <h2 class="text-2xl font-bold"><span class="text-orange-500">M</span>DB Trending</h2>
      </RouterLink>
      <button @click="routerGoBack" v-if="notHomeRoute" class="py-2 px-4 -mx-4 font-semibold">
        Back
      </button>
    </nav>
  </header>
</template>
