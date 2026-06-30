"use client";

import { create } from "zustand";

type Notification = {
  message: string;
  type: "success" | "error" | "alert";
};

type Store = {
  notification: Notification | null;
  showNotification: (notification: Notification) => void;
  clearNotification: () => void;
};

export const useNotificationStore = create<Store>((set) => ({
  notification: null,

  showNotification: (notification) => set({ notification }),

  clearNotification: () => set({ notification: null }),
}));
