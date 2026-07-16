"use client";

import { useEffect } from "react";
import { userDataStore, type UserData } from "@/mobx/store";

type UserStoreInitializerProps = {
  user: UserData | null;
};

export const UserStoreInitializer = ({ user }: UserStoreInitializerProps) => {
  useEffect(() => {
    if (user) {
      userDataStore.setUserInfo(user);
      return;
    }

    userDataStore.clearUserInfo();
  }, [user]);

  return null;
};
