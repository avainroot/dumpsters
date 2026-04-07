import type { ILocation, TBuilding, TCompany } from "@/types";
import { api } from "./api";

export const getLocations = () => {
  return {
    queryKey: ["locations"],
    queryFn: () => api.get<ILocation[]>("/locations"),
  };
};

export const getLocation = (id?: number) => {
  return {
    queryKey: ["location", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return api.get<ILocation>(`/locations/${id}`);
    },
    enabled: !!id,
  };
};

export const getCompanies = () => {
  return {
    queryKey: ["companies"],
    queryFn: () => api.get<TCompany[]>(`/companies`),
  };
};

export const getBuildings = (search?: string | null) => {
  return {
    queryKey: ["buildings", search],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return api.get<TBuilding[]>(`/buildings?search=${search}`);
    },
    // enabled: !!id,
  };
};
