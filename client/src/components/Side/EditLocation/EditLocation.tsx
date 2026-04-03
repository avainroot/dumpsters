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
import * as z from "zod";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLocation } from "@lib/queries";
import type { ILocation } from "@/types";
import { Field, FieldError, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

const EditLocation = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery(getLocation(1));

  console.log(data);

  const form = useForm<ILocation>({
    // resolver: zodResolver(formSchema),
    defaultValues: data,
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <SheetContent>
      <form
        id="form-edit"
        // onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>Редактировать площадку</SheetTitle>
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

                {/* <Combobox items={[]}>
                  <ComboboxInput placeholder="Select a framework" />
                  <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox> */}

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <SheetFooter>
          <Button type="submit">Сохранить</Button>
          <SheetClose asChild>
            <Button variant="outline">Отменить</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </SheetContent>
  );
};

export default EditLocation;
