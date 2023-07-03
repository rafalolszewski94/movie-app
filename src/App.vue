<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { request } from '@/api'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()

request
  .get('/configuration')
  .then((response) => {
    configStore.data = response.data
  })
  .catch((error) => {
    throw new Error(error)
  })
</script>

<template>
  <div class="max-h-screen overflow-hidden relative">
    <AppHeader />
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>
