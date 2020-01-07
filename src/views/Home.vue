<template>
  <div class="home container">
    <movie-list title="Trending" :movie-list="trending.results">
      <div slot="header_extra" class="header_extra">
        <v-select
          name="trendiing_type"
          v-model="filtering.type"
          id="trendiing_type-type"
          @input="touch"
          :clearable="false"
          :searchable="false"
          :options="['All', 'Movie', 'TV']"
        >
          <div slot="selected-option" slot-scope="option">
            {{ option.label }}
          </div>
        </v-select>
        <v-select
          name="trendiing_time_span"
          v-model="filtering.timeSpan"
          id="trendiing_time_span"
          @input="touch"
          :clearable="false"
          :searchable="false"
          :options="['Daily', 'Weekly']"
        >
          <div slot="selected-option" slot-scope="option">
            {{ option.label }}
          </div>
        </v-select>
        <button @click="clearFiltering" v-if="filtering.touched">X</button>
      </div>
    </movie-list>
  </div>
</template>

<script>
import Vue from "vue";
import MovieList from "@/components/MovieList.vue";
import { request } from "@/api";

const INITIAL_FILTERING = {
  type: "All",
  timeSpan: "Daily",
  touched: false
};

export default Vue.extend({
  components: { MovieList },
  data: () => ({
    filtering: { type: "All", timeSpan: "Daily", touched: false },
    trending: {}
  }),
  watch: {
    filtering: {
      immediate: true,
      deep: true,
      handler: function(val) {
        this.fetchTrending(val.type, val.timeSpan);
      }
    }
  },
  computed: {},
  methods: {
    fetchTrending(
      type = this.filtering.type,
      timeSpan = this.filtering.timeSpan
    ) {
      let realType = "all";
      let realTimeSpan = "day";
      switch (type) {
        case "All":
          realType = "all";
          break;
        case "Movie":
          realType = "movie";
          break;
        case "TV":
          realType = "tv";
          break;
        default:
          realType = "all";
      }
      switch (timeSpan) {
        case "Daily":
          realTimeSpan = "day";
          break;
        case "Weekly":
          realTimeSpan = "week";
          break;
        default:
          realTimeSpan = "day";
      }
      request
        .get(`/trending/${realType}/${realTimeSpan}`)
        .then(response => {
          this.trending = response.data;
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    touch() {
      this.filtering.touched = true;
    },
    clearFiltering() {
      this.filtering = { ...INITIAL_FILTERING };
    }
  }
});
</script>

<style lang="scss">
.container.home {
  margin: 47px auto 100px;
  flex-direction: column;

  h1 {
    font-weight: 900;
    font-size: 70px;
    color: $text-color;
  }
}
</style>

<style lang="scss" scoped>
.header_extra {
  display: flex;

  > * {
    &:not(:last-child) {
      margin-right: 3px;
    }
  }
}
</style>
