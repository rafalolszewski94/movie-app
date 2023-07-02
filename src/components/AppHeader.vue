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
  <div class="pb-8">
    <header class="fixed top-0">
      <nav class="flex">
        <RouterLink to="/">
          <h2 class="text-2xl font-bold"><span class="text-green-500">M</span>DB</h2>
        </RouterLink>
        <button @click="routerGoBack" v-if="notHomeRoute" class="go-back-btn">go back</button>
      </nav>
    </header>
  </div>
</template>
