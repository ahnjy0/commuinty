import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Info,
} from 'lucide-react';
import { ScreenType } from '../types';

interface LoginViewProps {
  onNavigate: (screen: ScreenType) => void;
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('example@modi.app');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      alert('이메일 주소를 입력해주세요.');
      return;
    }
    onLoginSuccess();
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 text-slate-900 flex flex-col justify-between">
      <div className="p-5 max-w-sm mx-auto w-full pt-6">
        {/* Brand Hero */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-200">
              <MessageSquare className="w-10 h-10 fill-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-800 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
              ‹
            </span>
          </div>

          <div className="mb-2">
            <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
              ● 모두의 디자인 커뮤니티
            </span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            모디 <span className="text-indigo-600">MODI</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-[240px] leading-relaxed">
            함께 이야기하고 성장하는 모바일 커뮤니티에 오신 것을 환영해요!
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                이메일 주소
              </label>
              <div className="relative flex items-center bg-indigo-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <span className="text-slate-400 font-medium mr-2 text-sm">@</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@modi.app"
                  className="w-full bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                  required
                />
              </div>
              <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-1.5">
                <Info className="w-3 h-3 text-slate-400" />
                <span>가입 시 등록한 이메일 계정을 입력해주세요.</span>
              </p>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  비밀번호
                </label>
                <button
                  type="button"
                  onClick={() => alert('비밀번호 재설정 이메일이 발송됩니다.')}
                  className="text-xs text-indigo-600 hover:underline font-medium"
                >
                  비밀번호 찾기
                </button>
              </div>

              <div className="relative flex items-center bg-indigo-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <Lock className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none pr-8"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                  aria-label="비밀번호 표시 전환"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span className="text-xs text-slate-700 font-medium">
                  로그인 상태 유지
                </span>
              </label>
              <span className="text-[11px] text-slate-400">보안 권장</span>
            </div>

            {/* Login Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs py-3 rounded-xl transition shadow-md shadow-indigo-200 flex items-center justify-center gap-1.5"
            >
              <span>로그인</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Social Login Section */}
        <div className="mt-6">
          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-slate-50 px-3 text-xs text-slate-400 font-medium absolute">
              간편 로그인
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Kakao */}
            <button
              onClick={onLoginSuccess}
              className="flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#ebd300] text-[#191919] font-bold text-xs py-2.5 rounded-xl transition shadow-xs"
            >
              <span className="text-sm">💬</span>
              <span>카카오</span>
            </button>

            {/* Google */}
            <button
              onClick={onLoginSuccess}
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition shadow-xs"
            >
              <span className="font-bold text-sm text-blue-500">G</span>
              <span>구글</span>
            </button>
          </div>
        </div>

        {/* Signup Redirect Footer */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-indigo-50/70 border border-indigo-100 rounded-full px-4 py-2">
            <span className="text-xs text-slate-600 mr-2">
              아직 계정이 없으신가요?
            </span>
            <button
              onClick={() => onNavigate('signup')}
              className="text-xs text-indigo-600 font-bold hover:underline"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
