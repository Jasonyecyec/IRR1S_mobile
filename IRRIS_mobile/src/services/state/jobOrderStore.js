import { create } from "zustand";

const useJobOrderStore = create((set) => ({
    isJobOrderNotif: false,
    jobOrderDetails: null,
    setjobOrderNotif: (value) => set({isJobOrderNotif: value }),
    setJobOrderDetails: (jobOrderDetails) => set({ jobOrderDetails }),
    // clearUser: () => set({ user: null, isAuthenticated: false }),
  }));
  
  export default useJobOrderStore;
  