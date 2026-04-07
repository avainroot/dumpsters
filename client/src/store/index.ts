import type { LngLat } from "ymaps3";
import { create } from "zustand";

type SheetState =
  | null
  | { mode: "create"; coordinates: LngLat }
  | { mode: "edit"; locationId: number };

interface MapStore {
  open: boolean;
  sheet: SheetState;
  locationCreate: (coordinates: LngLat) => void;
  locationEdit: (locationId: number) => void;
  openPane: () => void;
  closePane: () => void;
  onOpenChange: (open: boolean) => void;
  sheetReset: () => void;
}

export const useMapStore = create<MapStore>((set) => ({
  open: false,
  sheet: null,
  locationCreate: (coordinates) =>
    set({ sheet: { mode: "create", coordinates }, open: true }),
  locationEdit: (locationId) =>
    set({ sheet: { mode: "edit", locationId }, open: true }),
  openPane: () => set({ open: true }),
  closePane: () => set({ open: false }),
  onOpenChange: (open) => set({ open }),
  sheetReset: () => set({ sheet: null }),
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
