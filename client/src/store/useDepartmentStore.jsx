import { create } from "zustand";
import { apiGetDepartments } from "~/apis/department";

export const useDepartmentStore = create((set) => ({
  departments: [],
  getDepartments: async (params) => {
    const response = await apiGetDepartments(params);
    if (response.success) {
      return set(() => ({ departments: response.departments }));
    } else {
      return set(() => ({ departments: [] }));
    }
  },
}));
