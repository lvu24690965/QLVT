import { create } from "zustand";
import { apiGetPropertyTypes } from "~/apis/propertyType";

export const usePropertiesStore = create((set) => ({
  propertyTypes: [],
  getPropertyTypes: async () => {
    const response = await apiGetPropertyTypes();
    if (response.success) return set({ propertyTypes: response.propertyTypes });
  },
}));
