import type { ILocation, TCompany } from "@/types";
import { api } from "./api";

export const getLocations = () => {
  return {
    queryKey: ["locations"],
    queryFn: () => api.get<ILocation[]>("/locations"),
  };
};

export const getLocation = (id: number) => {
  return {
    queryKey: ["location", id],
    queryFn: () => api.get<ILocation>(`/locations/${id}`),
  };
};

export const getCompanies = () => {
  return {
    queryKey: ["companies"],
    queryFn: () => api.get<TCompany[]>(`/companies`),
  };
};
