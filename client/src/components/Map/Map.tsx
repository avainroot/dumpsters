import { ymapsPromise } from "@lib/ymaps";
import { use } from "react";
import { useMapStore } from "@/store";
import Locations from "./Locations/Locations";
import type { LngLat } from "ymaps3";
import { MAP_START_POSITION } from "@lib/constants";
import useLocations from "@hooks/useLocations";

const Map = () => {
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapListener,
    reactify,
  } = use(ymapsPromise);

  const { locationCreate } = useMapStore();
  const { newLocation } = useLocations();

  const handleMapClick = async (coordinates: LngLat) => {
    newLocation(coordinates);
    locationCreate(coordinates);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="overflow-hidden flex-1">
        <YMap location={reactify.useDefault(MAP_START_POSITION)} theme="dark">
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
          <Locations />
          <YMapListener
            layer="any"
            onClick={(obj, e) => {
              if (obj) return;
              handleMapClick(e.coordinates);
            }}
          />
        </YMap>
      </div>
    </div>
  );
};

export default Map;
