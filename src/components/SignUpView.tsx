import React, { useState } from 'react';
import {
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import { ScreenType } from '../types';

interface SignUpViewProps {
  onNavigate: (screen: ScreenType) => void;
  onSignUpSuccess: () => void;
}

export const SignUpView: React.FC<SignUpViewProps> = ({
  onNavigate,
  onSignUpSuccess,
}) => {
  const [nickname, setNickname] = useState('모디러버');
  const [isNicknameChecked, setIsNicknameChecked] = useState(true);
  const [email, setEmail] = useState('example@modi.com');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [password, setPassword] = useState('Passw0rd!modi');
  const [passwordConfirm, setPasswordConfirm] = useState('Passw0rd!modi');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Agreements state
  const [terms, setTerms] = useState({
    all: true,
    service: true,
    privacy: true,
    marketing: true,
  });

  const handleToggleAllTerms = (checked: boolean) => {
    setTerms({
      all: checked,
      service: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  const handleToggleTerm = (key: 'service' | 'privacy' | 'marketing') => {
    const next = { ...terms, [key]: !terms[key] };
    next.all = next.service && next.privacy && next.marketing;
    setTerms(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms.service || !terms.privacy) {
      alert('필수 약관에 동의해주세요.');
      return;
    }
    alert('🎉 모디 회원이 되신 것을 환영합니다!');
    onSignUpSuccess();
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 text-slate-900">
      <div className="p-4 max-w-sm mx-auto space-y-4 pt-2">
        {/* Top Tag & Title */}
        <div className="pt-2">
          <button
            onClick={() => onNavigate('login')}
            className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 hover:bg-indigo-100 transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>새로운 만남의 시작</span>
          </button>

          <h1 className="text-xl font-black text-slate-900">
            모디 시작하기
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            간단한 정보 입력으로 커뮤니티에 참여해보세요
          </p>
        </div>

        {/* Avatar Upload Container */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden ring-4 ring-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                alt="프로필 미리보기"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => alert('프로필 사진 변경 기능')}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center ring-2 ring-white shadow-xs"
              aria-label="사진 변경"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 font-medium">
            나를 표현하는 프로필 사진
          </span>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* 닉네임 */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              닉네임
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setIsNicknameChecked(false);
                }}
                placeholder="닉네임을 입력하세요"
                className="flex-1 bg-indigo-50/50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setIsNicknameChecked(true)}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs px-3.5 py-2 rounded-xl transition shrink-0"
              >
                중복확인
              </button>
            </div>
            {isNicknameChecked && (
              <p className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>사용 가능한 닉네임입니다</span>
              </p>
            )}
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              이메일
            </label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@modi.com"
                className="flex-1 bg-indigo-50/50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                required
              />
              <button
                type="button"
                onClick={() => {
                  setIsEmailSent(true);
                  alert('인증번호가 발송되었습니다.');
                }}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs px-3 py-2 rounded-xl transition shrink-0"
              >
                {isEmailSent ? '재전송' : '인증번호 전송'}
              </button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              비밀번호
            </label>
            <div className="relative flex items-center bg-indigo-50/50 border border-slate-200 rounded-xl px-3.5 py-2 focus-within:bg-white focus-within:border-indigo-600">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-900 focus:outline-none pr-8"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              영문, 숫자, 특수문자를 조합하여 8~20자로 입력해주세요.
            </p>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              비밀번호 확인
            </label>
            <div className="relative flex items-center bg-indigo-50/50 border border-slate-200 rounded-xl px-3.5 py-2 focus-within:bg-white focus-within:border-indigo-600">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-900 focus:outline-none pr-8"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {password && password === passwordConfirm && (
              <p className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>비밀번호가 일치합니다</span>
              </p>
            )}
          </div>

          {/* Terms Agreement Box */}
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-3.5 space-y-2.5">
            {/* 전체 동의 */}
            <label className="flex items-center gap-2 font-bold text-xs text-slate-900 cursor-pointer pb-2 border-b border-indigo-100">
              <input
                type="checkbox"
                checked={terms.all}
                onChange={(e) => handleToggleAllTerms(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span>전체 동의하기</span>
            </label>

            {/* 항목 1 */}
            <div className="flex items-center justify-between text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={terms.service}
                  onChange={() => handleToggleTerm('service')}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span>[필수] 서비스 이용약관 동의</span>
              </label>
              <button
                type="button"
                onClick={() => alert('서비스 이용약관 상세 내용')}
                className="text-[11px] text-slate-400 hover:text-indigo-600 underline"
              >
                보기
              </button>
            </div>

            {/* 항목 2 */}
            <div className="flex items-center justify-between text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={terms.privacy}
                  onChange={() => handleToggleTerm('privacy')}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span>[필수] 개인정보 수집 및 이용 동의</span>
              </label>
              <button
                type="button"
                onClick={() => alert('개인정보 수집 및 이용 약관')}
                className="text-[11px] text-slate-400 hover:text-indigo-600 underline"
              >
                보기
              </button>
            </div>

            {/* 항목 3 */}
            <div className="flex items-center justify-between text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={terms.marketing}
                  onChange={() => handleToggleTerm('marketing')}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span>[선택] 마케팅 정보 수신 동의</span>
              </label>
              <button
                type="button"
                onClick={() => alert('마케팅 정보 수신 동의')}
                className="text-[11px] text-slate-400 hover:text-indigo-600 underline"
              >
                보기
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs py-3 rounded-xl transition shadow-md shadow-indigo-200 flex items-center justify-center gap-1.5"
          >
            <span>회원가입 완료</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Login Redirect */}
        <div className="text-center pt-2">
          <span className="text-xs text-slate-500 mr-2">
            이미 계정이 있으신가요?
          </span>
          <button
            onClick={() => onNavigate('login')}
            className="text-xs text-indigo-600 font-bold hover:underline"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};
