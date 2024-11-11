import { create } from "zustand";
import { zoneGeoSchema } from "@/schema/carte";

interface ZoneStore {
  isCarte: boolean;
  setIsCarte: (is: boolean) => void;
  zoneSelected: string | null;
  setZoneSelected: (zoneId: any) => void;
}

export const useZoneStore = create<ZoneStore>((set) => ({
    isCarte: false,
    setIsCarte: (is) => set({ isCarte: is  }),
    zoneSelected: null,
    setZoneSelected: (zoneId) => set({ zoneSelected: zoneId }),
}));
