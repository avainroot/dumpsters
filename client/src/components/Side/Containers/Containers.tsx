import { Button } from "@components/ui/button";
import { Field, FieldLabel } from "@components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Slider } from "@components/ui/slider";
import { Add01Icon, Delete03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CONTAINER_DEFAULT,
  CONTAINER_QUANTITY_MAX,
  CONTAINER_QUANTITY_MIN,
  CONTAINER_VOLUMES,
} from "@lib/constants";
import type { TCreateLocation } from "@lib/formSchema";
import { useFieldArray, useFormContext } from "react-hook-form";

const Containers = () => {
  const { control } = useFormContext<TCreateLocation>();
  const { fields, update, remove, append } = useFieldArray<
    TCreateLocation,
    "containers"
  >({
    control,
    name: "containers",
  });

  return (
    <Field>
      <FieldLabel>Контейнеры</FieldLabel>
      {fields.map((field, index) => {
        return (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Slider
                value={[field.quantity]}
                onValueChange={(quntity) =>
                  update(index, {
                    ...field,
                    ...{ quantity: quntity[0] },
                  })
                }
                min={CONTAINER_QUANTITY_MIN}
                max={CONTAINER_QUANTITY_MAX}
                step={CONTAINER_QUANTITY_MIN}
              />
              <div className="flex items-center gap-2">
                <div className="w-6 text-right select-none">
                  {field.quantity}x
                </div>
                <Select
                  value={String(field.volumeLiters)}
                  onValueChange={(v) =>
                    update(index, {
                      ...field,
                      ...{ volumeLiters: Number(v) },
                    })
                  }
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Объём контейнера" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTAINER_VOLUMES.map((volume) => (
                      <SelectItem
                        key={volume}
                        value={String(volume)}
                      >{`${String(volume)}л`}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                size="icon"
                variant="destructive"
                type="button"
                onClick={() => remove(index)}
                disabled={fields.length < 2}
              >
                <HugeiconsIcon
                  icon={Delete03Icon}
                  size={24}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </Button>
            </div>
          </div>
        );
      })}
      {fields.length < 5 && (
        <div className="flex justify-end items-center gap-2">
          <div>Добавить контейнер</div>
          <Button
            size="icon"
            type="button"
            onClick={() => append(CONTAINER_DEFAULT)}
          >
            <HugeiconsIcon
              icon={Add01Icon}
              size={24}
              color="currentColor"
              strokeWidth={1.5}
            />
          </Button>
        </div>
      )}
    </Field>
  );
};

export default Containers;
