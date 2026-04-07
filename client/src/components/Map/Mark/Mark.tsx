import type { ILocation } from "@/types";
import { ymapsPromise } from "@lib/ymaps";
import { use } from "react";
import MarkIcon from "./MarkIcon";
import type { LngLat } from "ymaps3";
import { dumpCount } from "@lib/utils";
import { useMapStore } from "@/store";

const Mark = ({ id, lat, lng, containers }: ILocation) => {
  const { locationEdit } = useMapStore();
  const { reactify, YMapMarker } = use(ymapsPromise);

  const coordinates: LngLat = [lng, lat];

  return (
    <YMapMarker
      key={id}
      coordinates={reactify.useDefault(coordinates)}
      onClick={() => locationEdit(id)}
    >
      <MarkIcon count={dumpCount(containers)} />
    </YMapMarker>
  );
};

export default Mark;
