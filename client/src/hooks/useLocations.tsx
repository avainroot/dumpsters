import { useMapStore } from "@/store";
import type { ILocation } from "@/types";
import { getLocations } from "@lib/queries";
import { coordFromArray } from "@lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { LngLat } from "ymaps3";

const useLocations = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery(getLocations());
  const open = useMapStore((state) => state.open);

  const locations = data || [];

  const newLocation = (coordinates: LngLat) => {
    queryClient.setQueryData(["locations"], (old: ILocation[] = []) => {
      return [
        ...old,
        {
          id: 0,
          containers: [],
          ...coordFromArray(coordinates),
        },
      ];
    });
  };

  useEffect(() => {
    if (!open) {
      queryClient.setQueryData(["locations"], (old: ILocation[] = []) => {
        return old.filter((location) => location.id !== 0);
      });
    }
  }, [open, queryClient]);

  return {
    locations,
    newLocation,
  };
};

export default useLocations;
