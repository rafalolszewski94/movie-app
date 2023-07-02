<template>
  <div class="movie-detail">
    <header class="relative isolate">
      <div
        class="absolute bg-cover bg-no-repeat bg-center h-full w-full rounded-2xl px-8"
        :style="backgroundImage ? `background-image: url('${backgroundImage}')` : ``"
      />
      <div
        class="absolute inset-0 transform-gpu overflow-hidden opacity-70 bg-gradient-to-tr from-black to-black"
        aria-hidden="true"
      ></div>
      <div class="container row relative px-8 py-4">
        <div class="skeleton details-skeleton" v-if="loading"></div>
        <div class="details" v-if="!loading && movie">
          <h1>{{ title }}</h1>
          <p class="overview">{{ movie.overview }}</p>
          <div class="rating-wrapper">
            <div class="stars">
              <span>
                avg: {{ movie.vote_average.toFixed(0) }}/10, votes:
                {{ movie.vote_count }}
              </span>
            </div>
          </div>
        </div>

        <div class="shrink-0 max-w-[200px] rounded-xl overflow-hidden shadow-2xl">
          <LazyImage
            v-if="!loading && movie"
            :src="poster"
            :src-placeholder="smallPoster"
            use-picture
          />
        </div>
      </div>
    </header>

    <main>
      <div class="container">
        <div class="cast">
          <h5>Cast</h5>

          <table>
            <tbody>
              <tr v-for="person in shortenedCast" :key="person.id">
                <td>
                  <LazyImage
                    :src="getPersonPicture(person.profile_path)"
                    :src-placeholder="getPersonPicture(person.profile_path, 'w45')"
                  />
                </td>
                <td>{{ person.name }}</td>
                <td>{{ person.character }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getImage } from '@/utils'
import { request } from '@/api'
import imgPlaceholder from '@/assets/image-loading@2x.png'
import LazyImage from '@/components/LazyImage.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const movie = ref()
const initialized = ref(false)
const loading = ref(true)

const isTVRoute = computed(() => {
  return route.path.includes('/tv/')
})

await request
  .get(`/${isTVRoute.value ? 'tv' : 'movie'}/${route.params.id}`, {
    append_to_response: 'credits'
  })
  .then((response) => {
    response.data.credits.cast.sort((a, b) => {
      return a.order - b.order
    })
    initialized.value = true
    loading.value = false
    movie.value = response.data
  })
  .catch((error) => {})
  .finally(() => {
    initialized.value = true
    loading.value = false
  })

const shortenedCast = computed(() => {
  if (movie.value) {
    return movie.value.credits.cast.slice(0, 10)
  }
  return []
})
const selectedStars = computed(() => {
  if (!movie.value) return 0
  const star5 = movie.value.vote_count
  const star4 = movie.value.vote_count / 2
  const star3 = movie.value.vote_count / 3
  const star2 = movie.value.vote_count / 4
  const star1 = movie.value.vote_count / 5
  return Number(
    (
      (5 * star5 + 4 * star4 + 3 * star3 + 2 * star2 + star1) /
      (star5 + star4 + star3 + star2 + star1)
    ).toFixed(1)
  )
})
const backgroundImage = computed(() => {
  if (!movie?.value?.backdrop_path) return null
  return getImage(movie.value.backdrop_path)
})
const smallPoster = computed(() => {
  if (!movie.value) return null
  return getImage(movie.value.poster_path, 'w45')
})
const poster = computed(() => {
  if (movie.value) {
    return getImage(movie.value.poster_path)
  }
  return null
})
const title = computed(() => {
  if (initialized.value && movie.value) {
    if (movie.value.title) {
      return movie.value.title
    }
    return movie.value.name
  }
  return ''
})

const getPersonPicture = (path: string, size = 'w185') => {
  if (!path) {
    return imgPlaceholder
  }
  return getImage(path, size)
}
const isSelectedStar = (starNumber: number) => {
  return selectedStars.value >= starNumber
}
</script>

<style scoped lang="scss">
header {
  min-height: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;

  .details {
    margin-right: 50px;
  }
}

h1 {
  margin: 30px 0 20px;
  font-weight: 900;
  font-size: 70px;
  line-height: 1;
}

.overview {
  margin: 0;
  font-size: 20px;
  text-shadow: 0 1px 2px rgba(black, 1);
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 70px;
  padding-bottom: 70px;
}

.rating-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  span {
    margin: 0 0 0 6px;
    font-size: 11px;
    font-weight: 500;
    opacity: 0.7;
    text-transform: uppercase;
  }
}

.stars {
  display: flex;
  align-items: center;

  .unicon {
    height: 24px;
  }
}
</style>

<style lang="scss">
.cast {
  width: 100%;

  table {
    width: 100%;
  }

  .lazy-image {
    height: 60px;
    width: max-content;
    margin-right: auto;
    border-radius: 5px;

    img {
      height: inherit;
    }
  }
}
</style>
