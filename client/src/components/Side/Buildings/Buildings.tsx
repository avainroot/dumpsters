import type { TBuilding } from "@/types";
import { Button } from "@components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@components/ui/combobox";
import { Field, FieldError, FieldLabel } from "@components/ui/field";
import { Spinner } from "@components/ui/spinner";
import {
  Add01Icon,
  CancelSquareIcon,
  Home10Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { api } from "@lib/api";
import type { TCreateLocation } from "@lib/formSchema";
import { getBuildings } from "@lib/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";

const Buildings = () => {
  const { control } = useFormContext<TCreateLocation>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<TBuilding | null>(null);
  const [debValue, setDebValue] = useDebounceValue<string>("", 300);

  const { fields, remove, append } = useFieldArray<
    TCreateLocation,
    "buildingIds"
  >({
    control,
    name: "buildingIds",
  });

  const { data, isFetching } = useQuery(getBuildings(debValue));

  const { mutate: addBuilding, isPending: addingPending } = useMutation({
    mutationFn: (data: Pick<TBuilding, "address">) => {
      return api.post<TBuilding>(`/buildings`, data);
    },
    onSuccess: async (data) => {
      toast.success(<div className="text-lg">Добавлен новый дом</div>, {
        description: (
          <div className="flex flex-col gap-1">
            <div>
              <span className="font-medium">Адрес:</span> {data.address}
            </div>
          </div>
        ),
      });
      append(data);
      setValue(null);
    },
  });

  const handleAppend = () => {
    if (value) {
      append(value);
      setValue(null);
    }
  };

  const handleDelete = (index?: number | number[]) => remove(index);

  const buildingList = useMemo(() => {
    const buildingData = data || [];
    return debValue.length
      ? [...buildingData, { id: 0, address: debValue }]
      : buildingData;
  }, [data, debValue]);

  return (
    <Controller
      name="buildingIds"
      control={control}
      render={({ fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>Дома</FieldLabel>
          <div className="flex items-center gap-1">
            <Combobox
              items={buildingList}
              itemToStringValue={(b: TBuilding) => String(b.id)}
              itemToStringLabel={(b: TBuilding) => b.address}
              value={value}
              onValueChange={(b) => {
                if (b && !b.id) {
                  addBuilding({ address: b.address });
                }
                setValue(b);
              }}
              onInputValueChange={setDebValue}
              open={open}
              onOpenChange={(openState) => {
                setOpen(openState);
              }}
              filter={null}
              disabled={addingPending}
            >
              <ComboboxInput
                placeholder="Введите адрес дома..."
                aria-invalid={fieldState.invalid}
                className="flex-1"
              />
              <ComboboxContent>
                <ComboboxEmpty>
                  {isFetching ? <Spinner /> : "Домов не найдено"}
                </ComboboxEmpty>
                <ComboboxList>
                  {(item) =>
                    !item.id ? (
                      <ComboboxItem key={item.id} value={item}>
                        <HugeiconsIcon
                          icon={Add01Icon}
                          size={24}
                          color="currentColor"
                          strokeWidth={1.5}
                        />
                        <div className="text-green-700">{item.address}</div>
                      </ComboboxItem>
                    ) : (
                      <ComboboxItem key={item.id} value={item}>
                        {item.address}
                      </ComboboxItem>
                    )
                  }
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <Button
              disabled={!value}
              onClick={handleAppend}
              size="icon"
              type="button"
            >
              <HugeiconsIcon
                icon={Add01Icon}
                size={18}
                color="currentColor"
                strokeWidth={1.5}
              />
            </Button>
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

          <hr className="mt-2" />

          {fields.map(({ address, id }, index) => {
            return (
              <div key={id} className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Home10Icon}
                  size={22}
                  color="currentColor"
                  strokeWidth={1.5}
                />
                <div className="flex-1">{address}</div>
                <button
                  onClick={() => handleDelete(index)}
                  type="button"
                  className="cursor-pointer text-destructive"
                >
                  <HugeiconsIcon
                    icon={CancelSquareIcon}
                    size={18}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            );
          })}
        </Field>
      )}
    />
  );
};

export default Buildings;
