import { Button } from "@components/ui/button";
import { SheetClose, SheetFooter } from "@components/ui/sheet";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import Company from "../Company/Company";
import { createLoctionSchema, type TCreateLocation } from "@lib/formSchema";
import useLocationForm from "@hooks/useLocationForm";
import { useMapStore } from "@/store";
import Containers from "../Containers/Containers";
import Buildings from "../Buildings/Buildings";

interface ILocationForm {
  defaultValues: TCreateLocation;
}

const LocationForm = ({ defaultValues }: ILocationForm) => {
  const sheet = useMapStore((state) => state.sheet);
  const isEdit = sheet?.mode === "edit";
  const locationId = isEdit && sheet.locationId;

  const { location, addPending, deletePending } = useLocationForm();

  const form = useForm<TCreateLocation>({
    resolver: zodResolver(createLoctionSchema),
    defaultValues,
  });

  function onSubmit(data: TCreateLocation) {
    location.add(data);
  }

  const handleDelete = () => {
    if (locationId) location.delete(String(locationId));
  };

  return (
    <FormProvider {...form}>
      <form
        id="form-create"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex flex-col"
      >
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

          <Containers />
          <Buildings />
        </div>

        <SheetFooter>
          <Button type="submit" disabled={addPending}>
            {isEdit ? "Сохранить" : "Добавить"}
          </Button>
          {isEdit ? (
            <Button
              type="button"
              variant="destructive"
              disabled={deletePending}
              onClick={handleDelete}
            >
              Удалить
            </Button>
          ) : (
            <SheetClose asChild>
              <Button variant="outline">Отменить</Button>
            </SheetClose>
          )}
        </SheetFooter>
      </form>
    </FormProvider>
  );
};

export default LocationForm;
