import React from 'react';
import { Bell, ArrowLeft, MessageSquare } from 'lucide-react';
import { ScreenType, UserProfile } from '../types';
import { CURRENT_USER } from '../data/mockData';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onBack?: () => void;
  unreadNotifications?: boolean;
  unreadCount?: number;
  currentUser?: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  unreadNotifications,
  unreadCount = 0,
  currentUser = CURRENT_USER,
}) => {
  const hasUnread = unreadNotifications ?? unreadCount > 0;

  // Screen specific titles and layouts
  const isSubScreen = ['detail', 'create', 'user-profile', 'login', 'signup'].includes(
    currentScreen
  );

  const getSubScreenTitle = () => {
    switch (currentScreen) {
      case 'detail':
        return 'Post Detail';
      case 'create':
        return 'Post Create';
      case 'user-profile':
        return 'User Profile';
      case 'login':
        return 'Login';
      case 'signup':
        return 'Sign Up';
      default:
        return '';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between transition-all">
      {isSubScreen ? (
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack || (() => onNavigate('feed'))}
            className="p-1.5 -ml-1.5 rounded-full hover:bg-slate-100 active:bg-slate-200 transition text-slate-700"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <MessageSquare className="w-4 h-4 fill-white" />
            </div>
            <span className="font-semibold text-slate-900 text-base">
              {getSubScreenTitle()}
            </span>
          </div>
        </div>
      ) : (
        /* Brand Logo: 모디 MODI */
        <button
          onClick={() => onNavigate('feed')}
          className="flex items-center gap-2 text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-4 h-4 fill-white" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-lg text-slate-900 tracking-tight">모디</span>
            <span className="font-extrabold text-sm text-indigo-600 tracking-wide uppercase bg-indigo-50 px-1.5 py-0.5 rounded">
              MODI
            </span>
          </div>
        </button>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {!isSubScreen && (
          <button
            className="relative p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-600 transition"
            aria-label="알림"
            onClick={() => onNavigate('notifications')}
          >
            <Bell className="w-5 h-5" />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>
        )}

        {/* Profile Avatar Button */}
        <button
          onClick={() => onNavigate('my-profile')}
          className={`relative rounded-full p-0.5 transition ring-offset-2 ${
            currentScreen === 'my-profile'
              ? 'ring-2 ring-indigo-600'
              : 'hover:ring-2 hover:ring-slate-300'
          }`}
          aria-label="내 피드 보기"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover shadow-inner"
          />
        </button>
      </div>
    </header>
  );
};
