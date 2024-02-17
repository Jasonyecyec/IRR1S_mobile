import { create } from "zustand";

const useNotificationStore = create((set) => ({
    notification: false,
    notificationDetails: null,
    setNotification: (value) => set({notification: value }),
    setNotificationDetails: (notificationDetails) => set({ notificationDetails }),
    // clearUser: () => set({ user: null, isAuthenticated: false }),
  }));
  
  export default useNotificationStore;
  