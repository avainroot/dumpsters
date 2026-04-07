import { ymapsPromise } from "@lib/ymaps";
import { use } from "react";
// import Mark from "./Mark/Mark";
// import type { TMark } from "@/types";
import { useMapStore } from "@/store";
import Locations from "./Locations/Locations";
import type { LngLat } from "ymaps3";
import { MAP_START_POSITION } from "@lib/constants";

const Map = () => {
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapListener,
    reactify,
  } = use(ymapsPromise);

  const { locationCreate } = useMapStore();

  const handleMapClick = async (coordinates: LngLat) =>
    locationCreate(coordinates);

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
            // onMouseDown={(obj, event) => {
            //   if (obj) return;
            //   const [lng, lat] = event.coordinates;
            //   handleMapClick([lng, lat]);
            // }}
          />
        </YMap>
      </div>
    </div>
  );
};

export default Map;
