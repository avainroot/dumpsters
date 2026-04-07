import { z } from "zod";
import type { containerSchema, TCreateLocation } from "./formSchema";

export const CONTAINER_VOLUMES = [120, 140, 480, 750, 1100];
export const CONTAINER_QUANTITY_MIN = 1;
export const CONTAINER_QUANTITY_MAX = 10;
export const CONTAINER_DEFAULT: z.infer<typeof containerSchema> = {
  volumeLiters: CONTAINER_VOLUMES[0],
  quantity: CONTAINER_QUANTITY_MIN,
};

export const MAP_START_POSITION = {
  center: [37.616207, 54.193539],
  zoom: 14,
};

export const FORM_DEFAULT_VALUES: TCreateLocation = {
  address: "",
  lat: "",
  lng: "",
  companyId: 0,
  containers: [CONTAINER_DEFAULT],
  buildingIds: [],
};
