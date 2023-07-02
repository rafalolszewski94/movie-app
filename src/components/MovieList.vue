<template>
  <div class="movie-list__wrapper">
    <div class="movie-list__header">
      <h1>{{ title }}</h1>
      <slot name="header_extra" />
    </div>
    <div class="movie-list">
      <router-link
        class="movie"
        v-for="movie in movieList"
        :key="movie.id"
        tag="a"
        :to="
          movie.media_type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`
        "
      >
        <lazy-image
          :src="displayPoster(movie.poster_path)"
          :src-placeholder="displaySmallPoster(movie.poster_path)"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { getImage } from "@/utils";

export default {
  props: {
    title: {
      type: String,
      default: "Movies",
    },
    movieList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    displayPoster(path) {
      return getImage(path);
    },

    displaySmallPoster(path) {
      return getImage(path, "w45");
    },
  },
};
</script>

<style scoped lang="scss">
h1 {
  margin: 0;
}

.movie-list__wrapper {
  display: flex;
  flex-direction: column;
}

.movie-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0 80px;
}

.movie-list {
  display: grid;
  grid-template-columns: 240px 240px 240px;
  grid-gap: 40px;

  .movie {
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: none;
    transition: box-shadow 0.3s ease, transform 0.2s ease;
    background-color: #222222;
    text-decoration: none;
    color: $text-color;
    position: relative;

    &:hover {
      box-shadow: 0 14px 45px 8px rgba($primary-color, 0.2);
      transform: translateY(-3px);
    }

    img {
      height: 360px;
      width: 100%;
      vertical-align: top;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }

    .details {
      padding: 20px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-image: linear-gradient(
        rgba(white, 0) 0%,
        rgba(white, 0) 60%,
        rgba(black, 0.9) 100%
      );
      display: flex;
      align-items: flex-end;
    }

    .title {
      font-weight: 700;
      font-size: 18px;
      display: block;
    }
  }
}
</style>
