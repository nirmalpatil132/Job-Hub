"use client";

import React from "react";
import { useJobHub } from "@/lib/context/JobHubContext";
import { formatRelativeDate } from "@/lib/utils";
import {
  Bell,
  CheckCheck,
  Trash2,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function NotificationsPage() {
  const {
    currentUser,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotification,
  } = useJobHub();

  const userNotifications = notifications.filter((n) => n.user_id === currentUser?.user_id);
  const unreadCount = userNotifications.filter((n) => !n.is_read).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-subText mt-1">
            Stay updated on candidate status changes, application reviews, and new job opportunities.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 transition shrink-0"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {userNotifications.length > 0 ? (
          userNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-5 rounded-2xl border transition flex items-start justify-between gap-4 cursor-pointer ${
                notif.is_read
                  ? "bg-white border-borderLine opacity-80"
                  : "bg-indigo-50/40 border-indigo-200 shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    notif.type === "status_change"
                      ? "bg-purple-100 text-purple-700"
                      : notif.type === "success"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  {notif.type === "status_change" ? (
                    <Sparkles className="w-5 h-5" />
                  ) : notif.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Bell className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-mainText">{notif.title}</h4>
                    {!notif.is_read && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{notif.message}</p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {formatRelativeDate(notif.created_at)}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearNotification(notif.id);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition shrink-0"
                title="Dismiss"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-borderLine space-y-3 shadow-subtle">
            <Bell className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-mainText">No notifications</h3>
            <p className="text-xs text-subText">You're all caught up! Updates about your applications will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
