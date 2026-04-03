import type { ILocation } from "@/types";
import { ymapsPromise } from "@lib/ymaps";
import { use } from "react";
import MarkIcon from "./MarkIcon";
import type { LngLat } from "ymaps3";

const Mark = ({ id, lat, lng, containers }: ILocation) => {
  const { reactify, YMapMarker } = use(ymapsPromise);

  const coordinates: LngLat = [lng, lat];

  return (
    <YMapMarker
      key={id}
      coordinates={reactify.useDefault(coordinates)}
      onClick={() => console.log(id, coordinates)}
    >
      <MarkIcon count={containers.length} />
    </YMapMarker>
  );
};

export default Mark;
