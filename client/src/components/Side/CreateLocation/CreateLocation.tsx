import { Button } from "@components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@components/ui/sheet";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import Company from "../Company/Company";
import { createLoctionSchema, type TCreateLocation } from "@lib/formSchema";
import { useMapStore } from "@/store";
import { useEffect } from "react";

const CreateLocation = () => {
  const { sheet } = useMapStore();

  const form = useForm<TCreateLocation>({
    resolver: zodResolver(createLoctionSchema),
    defaultValues: {
      address: "",
      // companyId: undefined,
      lat: "",
      lng: "",
    },
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
