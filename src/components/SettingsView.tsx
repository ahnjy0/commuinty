import React, { useState } from 'react';
import {
  UserCircle,
  Bell,
  Palette,
  ShieldBan,
  Filter,
  Megaphone,
  FileText,
  Shield,
  Code,
  Info,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Sliders,
  Check,
  ArrowLeft,
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';
import { ScreenType, UserProfile } from '../types';

interface SettingsViewProps {
  onNavigate: (screen: ScreenType) => void;
  onBack?: () => void;
  currentUser?: UserProfile;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onNavigate,
  onBack,
  currentUser = CURRENT_USER,
}) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [themeSetting, setThemeSetting] = useState('시스템 설정 따름');

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      onNavigate('login');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('정말로 회원탈퇴 하시겠습니까? 모든 데이터가 영구 삭제됩니다.')) {
      alert('회원탈퇴가 완료되었습니다.');
      onNavigate('signup');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900">
      {/* Title Header */}
      <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 -ml-1.5 rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-700 transition"
              aria-label="뒤로가기"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <Sliders className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">설정</h2>
        </div>
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
          MODI v1.2
        </span>
      </div>

      <div className="px-4 pt-2.5 pb-20 max-w-lg mx-auto space-y-4">
        {/* Section 1: 계정 및 개인화 */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 px-1 mb-2">
            계정 및 개인화
          </h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {/* User Account Row */}
            <div
              className="p-4 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
              onClick={() => onNavigate('edit-profile')}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-indigo-600 rounded-full ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-slate-900">
                      {currentUser.name}
                    </span>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-0.2 rounded-full">
                      {currentUser.badgeTitle || '인증회원'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {currentUser.handle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
                <span>내 프로필 수정</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Profile Edit */}
            <button
              onClick={() => onNavigate('edit-profile')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <UserCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-800">
                    프로필 수정
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    프로필 사진, 닉네임, 소개글 변경
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Push Notifications Toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    푸시 알림 설정
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    새 댓글 및 소식 실시간 수신
                  </p>
                </div>
              </div>

              {/* iOS style Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushEnabled}
                  onChange={(e) => setPushEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Theme Settings Dropdown */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Palette className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  화면 테마 설정
                </span>
              </div>

              <select
                value={themeSetting}
                onChange={(e) => setThemeSetting(e.target.value)}
                className="bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs py-1.5 px-3 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition cursor-pointer"
              >
                <option value="시스템 설정 따름">시스템 설정 따름</option>
                <option value="라이트 모드">라이트 모드</option>
                <option value="다크 모드">다크 모드</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: 커뮤니티 및 콘텐츠 보호 */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 px-1 mb-2">
            커뮤니티 및 콘텐츠 보호
          </h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
            <button
              onClick={() => alert('차단된 사용자 2명 관리 목록')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <ShieldBan className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  차단한 사용자 관리
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span>2명</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => alert('키워드 필터링 설정')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <Filter className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    게시글 및 댓글 필터링
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    민감한 키워드 숨김 처리
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Section 3: 정보 및 고객지원 */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 px-1 mb-2">
            정보 및 고객지원
          </h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
            <button
              onClick={() => alert('모디 커뮤니티 v1.2 업데이트 공지사항')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Megaphone className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  공지사항
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                  NEW
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </button>

            <button
              onClick={() => alert('서비스 이용약관')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  서비스 이용약관
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => alert('개인정보처리방침')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  개인정보처리방침
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => alert('오픈소스 라이선스: React, Tailwind, Lucide Icons')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <Code className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  오픈소스 라이선스
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <Info className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  버전 정보
                </span>
              </div>
              <span className="text-xs text-indigo-600 font-medium">
                1.2.0 (최신 버전)
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Logout Button & Deletion */}
        <div className="pt-1 space-y-3">
          <button
            onClick={handleLogout}
            className="w-full bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 font-bold text-xs py-3 rounded-2xl flex items-center justify-center gap-2 transition active:scale-98"
          >
            <LogOut className="w-4 h-4" />
            <span>로그아웃</span>
          </button>

          <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-400">
            <span>모디 계정을 삭제하시겠습니까?</span>
            <button
              onClick={handleDeleteAccount}
              className="text-rose-500 hover:underline font-semibold"
            >
              회원탈퇴
            </button>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="pt-4 text-center text-xs text-slate-400 space-y-1">
          <p className="flex items-center justify-center gap-1 text-indigo-600 font-medium">
            <span>💙 모디와 함께 활기찬 커뮤니티를 만들어가요</span>
          </p>
          <p className="text-[11px] text-slate-300">
            © 2025 MODI Corp. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
