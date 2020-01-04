import { VueRouter } from "vue-router/types/router";

declare module "vue/types/vue" {
  export interface Vue {
    $api: any;
    $router: VueRouter;
  }
}
