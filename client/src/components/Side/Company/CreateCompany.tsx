import { Button } from "@components/ui/button";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCompanySchema, type TCreateCompany } from "@lib/formSchema";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@lib/api";
import type { TCompany } from "@/types";
import { useCompanyModalStore } from "@/store";

const CreateCompany = ({ onCreate }: { onCreate: (value: number) => void }) => {
  const { closeCompanyModal, ...modal } = useCompanyModalStore();
  const queryClient = useQueryClient();

  const form = useForm<TCreateCompany>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
      phone: "+78005553535",
      email: "company@mail.ru",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateCompany) => {
      return api.post<TCompany>(`/companies`, data);
    },
    onSuccess: async ({ id, name, phone, email }) => {
      await queryClient.invalidateQueries({ queryKey: ["companies"] });
      onCreate(id);
      toast.success(
        <div className="text-lg">
          Добавлена новая управляющая компания
          <span className="text-green-700">{` ${name}`}</span>
        </div>,
        {
          description: (
            <div className="flex flex-col gap-1">
              <div>
                <span className="font-medium">Телефон: </span>
                {phone}
              </div>
              <div>
                <span className="font-medium">E-mail: </span>
                {email}
              </div>
            </div>
          ),
        },
      );
      closeCompanyModal();
      form.reset();
    },
  });

  function onSubmit(data: TCreateCompany) {
    mutate(data);
  }

  return (
    <Dialog {...modal}>
      <DialogTrigger asChild>
        <Button size="icon" type="button">
          <HugeiconsIcon
            icon={Add01Icon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Управляющая компания</DialogTitle>
          <DialogDescription>
            Добавить новую управляющую компанию
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-create-company-name">
                  Название управляющей компании
                </FieldLabel>
                <Input
                  {...field}
                  id="form-create-company-name"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-create-company-phone">
                  Телефон
                </FieldLabel>
                <Input
                  {...field}
                  id="form-create-company-phone"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-create-company-email">
                  E-mail
                </FieldLabel>
                <Input
                  {...field}
                  id="form-create-company-email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            Добавить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompany;
