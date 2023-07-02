<script setup lang="ts">
import VLazyImage from 'v-lazy-image'
import { computed, ref } from 'vue'

const props = defineProps({
  src: String,
  srcPlaceholder: String,
  srcset: {
    type: String
  },
  intersectionOptions: {
    type: Object,
    default: function () {
      return {}
    }
  },
  usePicture: {
    type: Boolean,
    default: false
  },
  blurLevel: {
    type: Number,
    default: 30
  },
  duration: {
    type: Number,
    default: 500
  }
})

const rate = ref(1)
const deviation = computed(() => {
  return props.blurLevel * rate.value
})

const animate = () => {
  const start = Date.now() + props.duration

  const step = () => {
    const remaining = start - Date.now()

    if (remaining < 0) {
      rate.value = 0
    } else {
      rate.value = remaining / props.duration
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}
</script>

<template>
  <div class="lazy-image">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="filter hidden">
      <defs>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" :stdDeviation="deviation" />
        </filter>
      </defs>
    </svg>
    <VLazyImage
      :src="src"
      :src-placeholder="srcPlaceholder"
      :srcset="srcset"
      :intersectionOptions="intersectionOptions"
      :usePicture="usePicture"
      @load="animate"
    />
  </div>
</template>

<style scoped>
.lazy-image {
  overflow: hidden;
}

.filter {
  display: none;
}

.v-lazy-image {
  filter: url('#blur');
}
</style>
