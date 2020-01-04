import Movie from "@/views/Movie.vue";

declare namespace movie {
  export interface Genre {
    id: number;
    name: string;
  }

  export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }

  export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
  }

  export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
  }

  export interface MovieType {
    id: number;
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: any;
    budget: number;
    genres: Genre[];
    homepage: string;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: any;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title?: string;
    name?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  export interface MovieWithCastType extends MovieType {
    credits: {
      cast: {
        id: number;
        profile_path: string;
        name: string;
        character: string;
        order: number;
      }[];
    };
  }

  export interface TrendingObject extends MovieType {
    media_type: "movie" | "tv" | "person";
  }
}

export type ImageSizes =
  | "w45"
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

declare namespace configuration {
  export interface Images {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: ImageSizes[];
    profile_sizes: string[];
    still_sizes: string[];
  }

  export interface RootObject {
    images: Images;
    change_keys: string[];
  }
}
