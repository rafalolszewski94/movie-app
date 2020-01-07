<template>
  <div class="movie-detail">
    <header>
      <div
        class="bg-image"
        :style="
          backgroundImage ? `background-image: url('${backgroundImage}')` : ``
        "
      />
      <div class="container row">
        <div class="skeleton details-skeleton" v-if="loading"></div>
        <div class="details" v-if="!loading && movie">
          <h1>{{ title }}</h1>
          <p class="overview">{{ movie.overview | truncate(160) }}</p>
          <div class="rating-wrapper">
            <div class="stars">
              <!--              <unicon name="star-filled" :fill="primaryFillColor" />-->
              <span>
                avg: {{ movie.vote_average.toFixed(0) }}/10, votes:
                {{ movie.vote_count }}
              </span>
            </div>
          </div>
        </div>

        <lazy-image
          v-if="!loading && movie"
          :src="poster"
          :src-placeholder="smallPoster"
          use-picture
        />
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
                  <lazy-image
                    :src="getPersonPicture(person.profile_path)"
                    :src-placeholder="
                      getPersonPicture(person.profile_path, 'w45')
                    "
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

<script>
import Vue from "vue";
import { getImage } from "@/utils";
import scssVariables from "@/styles/_variables.scss";
import { request } from "@/api";

export default Vue.extend({
  data: () => ({
    movie: undefined,
    initialized: false,
    loading: true,
    data: {}
  }),

  beforeRouteEnter(to, from, next) {
    request
      .get(`/tv/${to.params.id}`, {
        append_to_response: "credits"
      })
      .then(response => {
        next(async vm => {
          response.data.credits.cast.sort((a, b) => {
            return a.order - b.order;
          });
          await vm.setData(true, "initialized");
          await vm.setData(false, "loading");
          await vm.setData(response.data, "movie");
          return vm;
        });
      })
      .catch(error => {
        next();
      })
      .finally(() => {
        next(async vm => {
          await vm.setData(true, "initialized");
          await vm.setData(false, "loading");
          return vm;
        });
      });
  },

  computed: {
    primaryFillColor() {
      return scssVariables.primary;
    },
    shortenedCast() {
      if (this.movie) {
        return this.movie.credits.cast.slice(0, 10);
      }
      return [];
    },
    selectedStars() {
      if (!this.movie) return 0;
      const star5 = this.movie.vote_count;
      const star4 = this.movie.vote_count / 2;
      const star3 = this.movie.vote_count / 3;
      const star2 = this.movie.vote_count / 4;
      const star1 = this.movie.vote_count / 5;
      return (
        (5 * star5 + 4 * star4 + 3 * star3 + 2 * star2 + star1) /
        (star5 + star4 + star3 + star2 + star1)
      ).toFixed(1);
    },
    backgroundImage() {
      if (!this.movie) return null;
      return getImage(this.movie.backdrop_path);
    },
    smallPoster() {
      if (!this.movie) return null;
      return getImage(this.movie.poster_path, "w45");
    },
    poster() {
      if (this.movie) {
        return getImage(this.movie.poster_path);
      }
      return null;
    },
    title() {
      if (this.initialized && this.movie) {
        if (this.movie.title) {
          return this.movie.title;
        }
        return this.movie.name;
      }
      return "";
    }
  },

  methods: {
    getPersonPicture(path, size = "w185") {
      return getImage(path, size);
    },
    setData(data, key) {
      this[key] = data;
    },
    isSelectedStar(starNumber) {
      return this.selectedStars >= starNumber;
    }
  }
});
</script>

<style scoped lang="scss">
header {
  min-height: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;

  .bg-image {
    position: absolute;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    filter: blur(17px);
    transform: scale(1.1);

    &::before {
      content: "\A";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.4);
      opacity: 1;
      transition: opacity 1s;
    }
  }

  * {
    position: relative;
  }

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
  color: darken($text-color, 5%);
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
