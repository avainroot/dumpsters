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

      toast.success(
        <div className="text-lg mb-2">Создана новая площадка!</div>,
        {
          // className: "flex gap-2 items-start",
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
        },
      );

      closePane();
    },
  });

  const { mutate: deleteLocation, isPending: deletePending } = useMutation({
    mutationFn: (id: string) => {
      return api.delete<ILocation>(`/locations/${id}`);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast.success(<div className="text-lg mb-2">Площадка удалена!</div>, {
        className: "flex gap-2 items-start",
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
    },
    addPending,
    deletePending,
  };
};

export default useLocationForm;
