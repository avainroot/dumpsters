import { Button } from "@components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@components/ui/sheet";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import Company from "../Company/Company";
import { createLoctionSchema, type TCreateLocation } from "@lib/formSchema";
import { useMapStore } from "@/store";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  CONTAINER_DEFAULT,
  CONTAINER_QUANTITY_MAX,
  CONTAINER_QUANTITY_MIN,
  CONTAINER_VOLUMES,
} from "@lib/constants";
import { Slider } from "@components/ui/slider";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";

const CreateLocation = () => {
  const { sheet } = useMapStore();

  const form = useForm<TCreateLocation>({
    resolver: zodResolver(createLoctionSchema),
    defaultValues: {
      address: "",
      // companyId: undefined,
      lat: "",
      lng: "",
      containers: [CONTAINER_DEFAULT],
    },
  });

  const containers = useFieldArray({
    control: form.control,
    name: "containers",
  });

  function onSubmit(data: TCreateLocation) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  useEffect(() => {
    if (sheet) form.reset();
  }, [sheet, form]);

  return (
    <SheetContent>
      <form
        id="form-create"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>Добавить площадку</SheetTitle>
          <SheetDescription>Заполните поля:</SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-create-address">Адрес</FieldLabel>
                <Input
                  {...field}
                  id="form-create-address"
                  aria-invalid={fieldState.invalid}
                  placeholder="Адрес площадки"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="companyId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Управляющая компания</FieldLabel>

                <Company {...field} error={fieldState.invalid} />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <FieldLabel>Координаты</FieldLabel>
            <div className="flex gap-2">
              <Controller
                name="lat"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="form-create-latitude"
                      aria-invalid={fieldState.invalid}
                      placeholder="Широта (lat)"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="lng"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="form-create-longitude"
                      aria-invalid={fieldState.invalid}
                      placeholder="Долгота (lng)"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </Field>
          <Field>
            <FieldLabel>Контейнеры</FieldLabel>
            {containers.fields.map((field, index) => {
              return (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[field.quantity]}
                      onValueChange={(quntity) =>
                        containers.update(index, {
                          ...field,
                          ...{ quantity: quntity[0] },
                        })
                      }
                      min={CONTAINER_QUANTITY_MIN}
                      max={CONTAINER_QUANTITY_MAX}
                      step={CONTAINER_QUANTITY_MIN}
                    />
                    <div className="flex items-center gap-2">
                      <div className="w-6 text-right">{field.quantity}x</div>
                      <Select
                        value={String(field.volumeLiters)}
                        onValueChange={(v) =>
                          containers.update(index, {
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
                  </div>
                </div>
              );
            })}
            {containers.fields.length < 5 && (
              <div className="flex justify-end items-center gap-2">
                <div>Добавить контейнер</div>
                <Button
                  size="icon"
                  type="button"
                  onClick={() => containers.append(CONTAINER_DEFAULT)}
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
        </div>

        <SheetFooter>
          <Button type="submit">Добавить</Button>
          <SheetClose asChild>
            <Button variant="outline">Отменить</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </SheetContent>
  );
};

export default CreateLocation;
