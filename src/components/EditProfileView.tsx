import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Camera,
  Upload,
  Check,
  RotateCcw,
  Sparkles,
  Link as LinkIcon,
  User,
  AtSign,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { UserProfile } from '../types';
import { AVATAR_PRESETS } from '../data/mockData';

interface EditProfileViewProps {
  currentUser: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
  onBack: () => void;
}

export const EditProfileView: React.FC<EditProfileViewProps> = ({
  currentUser,
  onSave,
  onBack,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [handle, setHandle] = useState(
    currentUser.handle.startsWith('@') ? currentUser.handle : `@${currentUser.handle}`
  );
  const [bio, setBio] = useState(currentUser.bio || '');
  const [badgeTitle, setBadgeTitle] = useState(currentUser.badgeTitle || 'CREATOR');
  const [website, setWebsite] = useState(currentUser.website || '');
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Handle file upload from disk
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('이미지 파일만 업로드할 수 있습니다.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setAvatar(e.target.result);
        showToast('새로운 프로필 사진이 적용되었습니다.');
      }
    };
    reader.readAsDataURL(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageFile(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!name.trim() || name.trim().length < 2) {
      showToast('닉네임은 최소 2글자 이상 입력해주세요.');
      return;
    }

    const cleanHandle = handle.trim().startsWith('@')
      ? handle.trim()
      : `@${handle.trim()}`;

    const updated: UserProfile = {
      ...currentUser,
      name: name.trim(),
      handle: cleanHandle,
      avatar,
      bio: bio.trim(),
      badgeTitle: badgeTitle.trim(),
      website: website.trim(),
    };

    onSave(updated);
    showToast('프로필이 성공적으로 저장되었습니다!');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

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
          <h2 className="text-base font-bold text-slate-900">프로필 수정</h2>
        </div>

        <button
          onClick={() => handleSave()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition"
        >
          저장하기
        </button>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Profile Avatar Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <h3 className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-indigo-600" />
            <span>프로필 사진 변경</span>
          </h3>

          <div className="flex flex-col items-center">
            {/* Avatar with Camera Icon Overlay */}
            <div
              className={`relative group cursor-pointer transition ${
                isDragging ? 'scale-105' : ''
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <img
                src={avatar}
                alt={name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-50 shadow-md transition group-hover:opacity-90"
              />
              <div className="absolute inset-0 rounded-full bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-semibold gap-1 backdrop-blur-2xs">
                <Camera className="w-5 h-5" />
                <span>사진 변경</span>
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md ring-2 ring-white hover:bg-indigo-700 transition"
                aria-label="사진 변경하기"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileInputChange}
            />

            {/* Upload Buttons */}
            <div className="flex items-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>내 기기에서 사진 선택</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAvatar(
                    'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=200&auto=format&fit=crop&q=80'
                  );
                  showToast('기본 프로필 사진으로 복원되었습니다.');
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs font-medium transition"
                title="기본 이미지 복원"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>기본값</span>
              </button>
            </div>

            {/* Preset Avatar Selection */}
            <div className="w-full mt-4 pt-4 border-t border-slate-100">
              <p className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>추천 스타일 프리셋으로 즉시 변경</span>
              </p>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setAvatar(preset.url);
                      showToast(`'${preset.name}' 스타일이 적용되었습니다.`);
                    }}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition ${
                      avatar === preset.url
                        ? 'border-indigo-600 ring-2 ring-indigo-200 scale-105'
                        : 'border-transparent hover:border-slate-300 opacity-80 hover:opacity-100'
                    }`}
                    title={preset.name}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover"
                    />
                    {avatar === preset.url && (
                      <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Form */}
        <form onSubmit={handleSave} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <User className="w-4 h-4 text-indigo-600" />
            <span>기본 회원 정보</span>
          </h3>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              닉네임 <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 20))}
                placeholder="닉네임을 입력해주세요"
                maxLength={20}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              />
              <span className="absolute right-3 top-2.5 text-[11px] text-slate-400">
                {name.length}/20
              </span>
            </div>
          </div>

          {/* Handle Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              아이디 (핸들) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={handle}
                onChange={(e) => {
                  const val = e.target.value;
                  setHandle(val.startsWith('@') ? val : `@${val}`);
                }}
                placeholder="@username"
                maxLength={30}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              />
              <AtSign className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              영문 소문자, 숫자, 밑줄(_)을 조합해 사용할 수 있습니다.
            </p>
          </div>

          {/* Badge Title Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              프로필 뱃지 / 전문 타이틀
            </label>
            <div className="relative">
              <input
                type="text"
                value={badgeTitle}
                onChange={(e) => setBadgeTitle(e.target.value.slice(0, 25))}
                placeholder="예: CREATOR, UI/UX 디자이너, 프론트엔드 개발자"
                maxLength={25}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              />
              <BadgeCheck className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Bio Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              한 줄 소개 (Bio)
            </label>
            <div className="relative">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, 150))}
                rows={3}
                placeholder="회원님을 표현할 수 있는 소개글을 작성해보세요"
                maxLength={150}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition resize-none leading-relaxed"
              />
              <span className="absolute right-3 bottom-2 text-[11px] text-slate-400">
                {bio.length}/150
              </span>
            </div>
          </div>

          {/* Website / Links Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              웹사이트 / SNS 링크
            </label>
            <div className="relative">
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
                className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              />
              <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2.5">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition"
            >
              프로필 저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
