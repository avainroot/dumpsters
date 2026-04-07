import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

const phoneSchema = z.string().refine((val) => isValidPhoneNumber(val), {
  message: "Некорректный номер телефона",
});

export const containerSchema = z.object({
  volumeLiters: z.number(),
  quantity: z.number(),
});

export const buildingSchema = z.object({
  id: z.number(),
  address: z.string(),
});

export const createLoctionSchema = z.object({
  address: z.string().min(1, "Укажите адрес площадки"),
  companyId: z.number("Выберите управляющую компанию"),
  lat: z
    .string()
    .min(1, "Укажите широту")
    .regex(/^-?\d+(\.\d+)?$/, "Введите корректное значение широты"),
  lng: z
    .string()
    .min(1, "Укажите долготу")
    .regex(/^-?\d+(\.\d+)?$/, "Введите корректное значение долготы"),
  containers: z
    .array(containerSchema)
    .min(1, "Добавьте хотя бы один контейнер"),
  buildingIds: z.array(buildingSchema).min(1, "Добавьте хотя бы один дом"),
});

export type TCreateLocation = z.infer<typeof createLoctionSchema>;

export const createCompanySchema = z.object({
  name: z.string().min(1, "Укажите имя управляющей компании"),
  phone: phoneSchema,
  email: z.email("Укажите корректный E-mail"),
});

export type TCreateCompany = z.infer<typeof createCompanySchema>;
