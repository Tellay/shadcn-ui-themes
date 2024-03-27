import { create } from "zustand";

type useRadiusStore = {
  radius: number;
  setRadius: (radius: number) => void;
};

export const useRadius = create<useRadiusStore>((set) => ({
  radius: 0.5,
  setRadius: (radius: number) => set({ radius }),
}));
