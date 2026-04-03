import type { LngLat } from "ymaps3";
import { create } from "zustand";

type Location = unknown;

type SheetState =
  | null
  | { mode: "create"; coordinates: LngLat }
  | { mode: "edit"; location: Location };

interface MapStore {
  sheet: SheetState;
  openCreate: (coordinates: LngLat) => void;
  openEdit: (location: Location) => void;
  close: () => void;
}

export const useMapStore = create<MapStore>((set) => ({
  sheet: null,
  openCreate: (coordinates) => set({ sheet: { mode: "create", coordinates } }),
  openEdit: (location) => set({ sheet: { mode: "edit", location } }),
  close: () => set({ sheet: null }),
}));

interface CompanyModal {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  openCompanyModal: () => void;
  closeCompanyModal: () => void;
}

export const useCompanyModalStore = create<CompanyModal>((set) => ({
  open: false,
  onOpenChange: (open) => set({ open }),
  openCompanyModal: () => set({ open: true }),
  closeCompanyModal: () => set({ open: false }),
}));
