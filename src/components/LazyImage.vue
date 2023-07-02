<template>
  <div class="lazy-image">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="filter hidden">
      <defs>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" :stdDeviation="deviation" />
        </filter>
      </defs>
    </svg>
    <v-lazy-image
      :src="src"
      :src-placeholder="srcPlaceholder"
      :srcset="srcset"
      :intersectionOptions="intersectionOptions"
      :usePicture="usePicture"
      @load="animate"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    srcPlaceholder: String,
    srcset: {
      type: String,
    },
    intersectionOptions: {
      type: Object,
      default: function() {
        return {};
      },
    },
    usePicture: {
      type: Boolean,
      default: false,
    },
    blurLevel: {
      type: Number,
      default: 30,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data: () => ({ rate: 1 }),
  computed: {
    deviation() {
      return this.blurLevel * this.rate;
    },
  },
  methods: {
    animate() {
      const start = Date.now() + this.duration;

      const step = () => {
        const remaining = start - Date.now();

        if (remaining < 0) {
          this.rate = 0;
        } else {
          this.rate = remaining / this.duration;
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    },
  },
};
</script>

<style scoped>
.lazy-image {
  overflow: hidden;
}

.filter {
  display: none;
}

.v-lazy-image {
  filter: url("#blur");
}
</style>
