import type { ILocation, TContainer } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TCreateLocation } from "./formSchema";
import type { LngLat } from "ymaps3";
import { FORM_DEFAULT_VALUES } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dumpCount = (data: TContainer[]) => {
  return data.reduce((sum, item) => sum + item.quantity, 0);
};

export const locationTranform = ({
  lat,
  lng,
  locationBuildings,
  ...rest
}: ILocation): TCreateLocation => {
  const buildingIds = locationBuildings.map(({ building }) => building);
  return {
    lat: String(lat),
    lng: String(lng),
    buildingIds,
    ...rest,
  };
};

export const defaultValuesPrepare = (coordinates?: LngLat) => {
  return coordinates
    ? {
        ...FORM_DEFAULT_VALUES,
        ...{
          lng: String(coordinates[0]),
          lat: String(coordinates[1]),
        },
      }
    : FORM_DEFAULT_VALUES;
};
