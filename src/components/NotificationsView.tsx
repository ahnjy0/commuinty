import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  Heart,
  MessageSquare,
  UserPlus,
  Megaphone,
  Trash2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationsViewProps {
  notifications: AppNotification[];
  onBack: () => void;
  onSelectNotification: (notif: AppNotification) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onClearAll?: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onBack,
  onSelectNotification,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAll,
}) => {
  const [filter, setFilter] = useState<'all' | 'activity' | 'system'>('all');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'activity') {
      return ['like', 'comment', 'follow', 'mention'].includes(notif.type);
    }
    if (filter === 'system') {
      return notif.type === 'system';
    }
    return true;
  });

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'like':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <Heart className="w-4 h-4 fill-rose-500" />
          </div>
        );
      case 'comment':
        return (
          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
        );
      case 'follow':
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserPlus className="w-4 h-4" />
          </div>
        );
      case 'system':
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Megaphone className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-2.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-700 transition"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-bold text-slate-900">알림</h2>
            {unreadCount > 0 && (
              <span className="bg-rose-500 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 px-2 py-1 rounded-lg hover:bg-indigo-50/70 transition"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>모두 읽음</span>
            </button>
          )}
          {notifications.length > 0 && onClearAll && (
            <button
              onClick={() => {
                if (window.confirm('알림을 모두 비우시겠습니까?')) {
                  onClearAll();
                }
              }}
              className="text-xs text-slate-400 hover:text-rose-600 px-1.5 py-1 rounded-lg transition"
            >
              전체 삭제
            </button>
          )}
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="bg-white px-4 py-2.5 border-b border-slate-100 flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
            filter === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          전체 ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('activity')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
            filter === 'activity'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          활동
        </button>
        <button
          onClick={() => setFilter('system')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
            filter === 'system'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          공지사항
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-w-md mx-auto p-4 space-y-2.5">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-slate-100 text-center shadow-xs mt-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-800">
              새로운 알림이 없습니다
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              {filter === 'activity'
                ? '새로운 좋아요, 댓글, 팔로우 알림이 여기에 표시됩니다.'
                : filter === 'system'
                ? '새로운 서비스 공지나 업데이트 알림이 없습니다.'
                : '모든 알림을 확인했습니다. 활발하게 소통해보세요!'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onSelectNotification(notif)}
              className={`rounded-2xl p-3.5 border transition cursor-pointer relative group flex items-start gap-3 ${
                notif.isRead
                  ? 'bg-white border-slate-100/90 text-slate-800 hover:border-slate-200 hover:shadow-xs'
                  : 'bg-indigo-50/40 border-indigo-100/80 text-slate-900 shadow-xs'
              }`}
            >
              {/* Avatar or Type Icon */}
              {notif.user ? (
                <div className="relative shrink-0">
                  <img
                    src={notif.user.avatar}
                    alt={notif.user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-2xs"
                  />
                  <span className="absolute -bottom-1 -right-1">
                    {getIcon(notif.type)}
                  </span>
                </div>
              ) : (
                <div className="shrink-0">{getIcon(notif.type)}</div>
              )}

              {/* Notification Content */}
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-slate-900">
                    {notif.title}
                  </span>
                  {!notif.isRead && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 ring-2 ring-indigo-200" />
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                  {notif.message}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] text-slate-400">
                    {notif.createdAt}
                  </span>
                  {notif.postId && (
                    <span className="text-[11px] font-semibold text-indigo-600 flex items-center">
                      피드 바로가기 <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNotification(notif.id);
                }}
                className="absolute top-3 right-3 p-1 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-slate-100 transition opacity-80 group-hover:opacity-100"
                aria-label="알림 삭제"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}

        {/* Footer info note */}
        {filteredNotifications.length > 0 && (
          <p className="text-center text-[11px] text-slate-400 pt-3 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>알림은 최대 30일간 보관됩니다</span>
          </p>
        )}
      </div>
    </div>
  );
};
