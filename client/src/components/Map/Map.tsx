import { ymapsPromise } from "@lib/ymaps";
import { use } from "react";
// import Mark from "./Mark/Mark";
// import type { TMark } from "@/types";
import { useMapStore } from "@/store";
import Locations from "./Locations/Locations";
import type { LngLat } from "ymaps3";

const LOCATION = {
  center: [37.616207, 54.193539],
  zoom: 14,
};

// Тестовые данные
// const TEST_MARKERS: TMark[] = [
//   {
//     id: 1,
//     coordinates: [37.588144, 55.733842],
//     address: "ул. Ленина, 1",
//     containers: 10,
//   },
//   {
//     id: 2,
//     coordinates: [37.61, 55.75],
//     address: "ул. Пушкина, 12",
//     containers: 1,
//   },
//   { id: 3, coordinates: [37.56, 55.72], address: "пр. Мира, 7", containers: 2 },
// ];

const Map = () => {
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapListener,
    reactify,
  } = use(ymapsPromise);

  const { openCreate } = useMapStore();

  const handleMapClick = async (coordinates: LngLat) => openCreate(coordinates);

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="overflow-hidden flex-1">
        <YMap location={reactify.useDefault(LOCATION)} theme="dark">
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
          <Locations />
          <YMapListener
            layer="any"
            onClick={(_, e) => {
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
