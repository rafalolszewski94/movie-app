import store from "./store";
import { ImageSizes } from "@/types";

export function getImage(path: string, size: ImageSizes = "w500") {
  let baseUrl = store.getters["config/baseUrl"];
  if (process.env.NODE_ENV === "production") {
    baseUrl = store.getters["config/secureBaseUrl"];
  }
  return baseUrl + size + path;
}
