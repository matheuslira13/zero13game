"use client";

import { useNotificationStore } from "./store";

export function NotificationProvider() {
  const { notification, clearNotification } = useNotificationStore();

  if (!notification) return null;

  const bgColor =
    {
      alert: "bg-orange-500",
      error: "bg-red-500",
      success: "bg-green-600",
    }[notification.type] ?? "bg-zinc-800";

  return (
    <div
      className={`fixed flex flex-col  items-end right-4 top-4 z-50 rounded-lg ${bgColor} px-4 py-3 text-white shadow-lg`}
    >
      <button
        onClick={clearNotification}
        className="mt-2 text-sm font-bold underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-x"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
      <p>{notification.message}</p>
    </div>
  );
}
