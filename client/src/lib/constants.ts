import { z } from "zod";
import type { containerSchema } from "./formSchema";

export const CONTAINER_VOLUMES = [120, 140, 480, 750, 1100];
export const CONTAINER_QUANTITY_MIN = 1;
export const CONTAINER_QUANTITY_MAX = 10;
export const CONTAINER_DEFAULT: z.infer<typeof containerSchema> = {
  volumeLiters: CONTAINER_VOLUMES[0],
  quantity: CONTAINER_QUANTITY_MIN,
};
