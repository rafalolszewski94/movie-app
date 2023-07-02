import type { ImageSizes } from "types";
import { useConfigStore } from "./stores/config";

export function getImage(path: string, size: ImageSizes = "w500") {
  const configStore = useConfigStore();
  let baseUrl = configStore.data.images.base_url
  if (import.meta.env.PROD) {
    baseUrl = configStore.data.images.secure_base_url
  }
  return baseUrl + size + path;
}