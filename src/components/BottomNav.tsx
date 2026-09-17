import React from 'react';
import { Layers, Search, User, Settings } from 'lucide-react';
import { MainTabType, ScreenType } from '../types';

interface BottomNavProps {
  currentTab: MainTabType;
  onTabChange: (tab: MainTabType) => void;
  currentScreen: ScreenType;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  currentScreen,
}) => {
  // Hide bottom nav only on post creation, login, or signup
  if (['create', 'login', 'signup'].includes(currentScreen)) {
    return null;
  }

  const tabs: { id: MainTabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'feed',
      label: '홈',
      icon: <Layers className="w-5 h-5" />,
    },
    {
      id: 'search',
      label: '검색',
      icon: <Search className="w-5 h-5" />,
    },
    {
      id: 'my-profile',
      label: '내 피드',
      icon: <User className="w-5 h-5" />,
    },
    {
      id: 'settings',
      label: '설정',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-2 flex items-center justify-around shadow-sm">
      {tabs.map((tab) => {
        const isActive =
          currentTab === tab.id ||
          (tab.id === 'feed' && currentScreen === 'feed') ||
          (tab.id === 'search' && currentScreen === 'search') ||
          (tab.id === 'my-profile' && (currentScreen === 'my-profile' || currentScreen === 'user-profile')) ||
          (tab.id === 'settings' && currentScreen === 'settings');

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all group ${
              isActive ? 'text-indigo-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="relative flex flex-col items-center">
              <div className="transition-transform group-active:scale-95">
                {tab.icon}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight font-medium">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-0.5" />
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
};
