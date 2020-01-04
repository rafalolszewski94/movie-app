import store from "./store";
import { ImageSizes } from "@/types";

export function getImage(path: string, size: ImageSizes = "w500") {
  const baseUrl = store.getters["config/baseUrl"];
  return baseUrl + size + path;
}
