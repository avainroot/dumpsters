import { useMapStore } from "@/store";
import type { ILocation } from "@/types";
import { api } from "@lib/api";
import type { TCreateLocation } from "@lib/formSchema";
import { dumpCount } from "@lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useLocationForm = () => {
  const { closePane } = useMapStore();
  const queryClient = useQueryClient();

  const { mutate: addLocation, isPending: addPending } = useMutation({
    mutationFn: (data: TCreateLocation) => {
      return api.post<ILocation>(`/locations`, {
        ...data,
        lat: Number(data.lat),
        lng: Number(data.lng),
        buildingIds: data.buildingIds.map((b) => b.id),
      });
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["locations"] });

      toast.success(<div className="text-lg">Создана новая площадка!</div>, {
        description: (
          <div className="flex flex-col gap-1">
            <div>
              <span className="font-medium">Адрес: </span>
              {data.address}
            </div>
            <div>
              <span className="font-medium">Управляющая компания: </span>
              {data.company.name}
            </div>
            <div>
              <span className="font-medium">Количество контейнеров: </span>
              {dumpCount(data.containers)}
            </div>
          </div>
        ),
      });

      closePane();
    },
  });

  const { mutate: saveLocation, isPending: savePending } = useMutation({
    mutationFn: ({ id, ...data }: TCreateLocation & { id: string }) => {
      return api.patch<ILocation>(`/locations/${id}`, {
        ...data,
        lat: Number(data.lat),
        lng: Number(data.lng),
        buildingIds: data.buildingIds.map((b) => b.id),
      });
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["locations"] });
      await queryClient.invalidateQueries({ queryKey: ["location", data.id] });
      toast.success(<div className="text-lg">Площадка обновлена!</div>, {
        description: (
          <div className="flex flex-col gap-1">
            <div>
              <span className="font-medium">Адрес: </span>
              {data.address}
            </div>
            <div>
              <span className="font-medium">Управляющая компания: </span>
              {data.company.name}
            </div>
            <div>
              <span className="font-medium">Количество контейнеров: </span>
              {dumpCount(data.containers)}
            </div>
          </div>
        ),
      });

      closePane();
    },
  });

  const { mutate: deleteLocation, isPending: deletePending } = useMutation({
    mutationFn: (id: string) => {
      return api.delete<ILocation>(`/locations/${id}`);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast.success(<div className="text-lg">Площадка удалена!</div>, {
        description: (
          <div className="flex flex-col gap-1">
            <div>
              <span className="font-medium">Адрес:</span> {data.address}
            </div>
          </div>
        ),
      });
      closePane();
    },
  });

  return {
    location: {
      add: addLocation,
      delete: deleteLocation,
      save: saveLocation,
    },
    addPending,
    deletePending,
    savePending,
  };
};

export default useLocationForm;
