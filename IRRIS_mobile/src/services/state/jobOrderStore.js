import { create } from "zustand";

const useJobOrderStore = create((set) => ({
    isJobOrderNotif: false,
    isJobOrderRequestNotif: false,
    jobOrderDetails: null,
    jobOrderRequestDetails:null,
    setjobOrderNotif: (value) => set({isJobOrderNotif: value }),
    setJobOrderDetails: (jobOrderDetails) => set({ jobOrderDetails }),
    setjobOrderRequestNotif: (value) => set({isJobOrderRequestNotif: value }),
    setJobOrderRequestDetails: (jobOrderRequestDetails) => set({ jobOrderRequestDetails }),
    // clearUser: () => set({ user: null, isAuthenticated: false }),
  }));
  
  export default useJobOrderStore;
  