import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  MoreVertical,
  CheckCircle2,
  BookOpen,
  UserPlus,
  UserCheck,
  Coffee,
  Heart,
  MessageCircle,
  Bookmark,
  ChevronRight,
  Laptop,
  Check,
} from 'lucide-react';
import { MINJI_USER } from '../data/mockData';
import { Post } from '../types';

interface UserProfileViewProps {
  onBack: () => void;
  onSelectPost: (post: Post) => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  onBack,
  onSelectPost,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'scraps'>('posts');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['p2']);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((b) => b !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 text-slate-900">
      {/* Top Header */}
      <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-700 transition"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="font-bold text-sm text-slate-900 leading-none">
              {MINJI_USER.name}
            </h3>
            <span className="text-[11px] text-slate-400">
              {MINJI_USER.handle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition"
            aria-label="공유"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => alert('사용자 차단 / 신고')}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition"
            aria-label="더보기"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-2.5 pb-16 max-w-lg mx-auto space-y-3.5">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs relative overflow-hidden">
          <div className="flex items-start justify-between">
            {/* Avatar */}
            <div className="relative">
              <img
                src={MINJI_USER.avatar}
                alt={MINJI_USER.name}
                className="w-18 h-18 rounded-full object-cover ring-4 ring-indigo-50"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white ring-2 ring-white">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Knowledge Level Badge */}
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              <span>지식인 Lv.3</span>
            </div>
          </div>

          {/* Name & Bio */}
          <div className="mt-3">
            <h2 className="text-lg font-bold text-slate-900">
              {MINJI_USER.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {MINJI_USER.handle}
            </p>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              {MINJI_USER.bio}
            </p>
          </div>

          {/* Stats */}
          <div className="bg-slate-50 rounded-xl p-3 mt-4 flex items-center justify-around border border-slate-100 text-center">
            <div>
              <p className="text-base font-bold text-slate-900">
                {MINJI_USER.postCount}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">작성한 글</p>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <p className="text-base font-bold text-slate-900">
                {MINJI_USER.likeCount}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">받은 좋아요</p>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <p className="text-base font-bold text-slate-900">
                {MINJI_USER.followerCount + (isFollowing ? 1 : 0)}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">팔로워</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex items-center justify-center gap-1.5 font-semibold text-xs py-2.5 rounded-xl transition ${
                isFollowing
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
              }`}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>팔로잉</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>팔로우</span>
                </>
              )}
            </button>

            <button
              onClick={() => alert('민지님과 1:1 커피챗 신청 대화창')}
              className="flex items-center justify-center gap-1.5 bg-blue-50/90 hover:bg-blue-100 text-blue-700 font-semibold text-xs py-2.5 rounded-xl transition"
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>커피챗 / 메시지</span>
            </button>
          </div>
        </div>

        {/* User Content Tabs */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="flex items-center justify-around border-b border-slate-100 px-2">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-3 text-xs font-semibold relative flex items-center gap-1.5 transition ${
                activeTab === 'posts'
                  ? 'text-indigo-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>작성한 글</span>
              <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                14
              </span>
              {activeTab === 'posts' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('scraps')}
              className={`py-3 text-xs font-semibold relative flex items-center gap-1.5 transition ${
                activeTab === 'scraps'
                  ? 'text-indigo-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>스크랩한 글</span>
              <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                32
              </span>
              {activeTab === 'scraps' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
              )}
            </button>
          </div>

          {/* User Posts List matching screenshot */}
          <div className="p-4 space-y-5 divide-y divide-slate-100">
            {/* Post 1 */}
            <div
              className="pt-1 cursor-pointer group"
              onClick={() => {
                onSelectPost({
                  id: 'post_1',
                  author: {
                    id: MINJI_USER.id,
                    name: MINJI_USER.name,
                    handle: MINJI_USER.handle,
                    avatar: MINJI_USER.avatar,
                    badge: '인증 회원',
                    isCertified: true,
                  },
                  createdAt: '2일 전',
                  category: '카페 투어',
                  title: '이번 주말에 다녀온 성수동 골목 카페 추천합니다 ☕',
                  content: '성수동 붉은 벽돌 골목에 숨겨진 차분한 핸드드립 쇼룸이에요. 원두 노트 카드 디자인부터 조도까지 감각적입니다.',
                  images: [
                    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
                  ],
                  tags: ['#카페투어', '#성수동카페'],
                  likes: 42,
                  commentsCount: 8,
                  views: 340,
                  isLiked: true,
                  isBookmarked: false,
                });
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    카페 투어
                  </span>
                  <span className="text-[11px] text-slate-400">2일 전</span>
                </div>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                이번 주말에 다녀온 성수동 골목 카페 추천합니다 ☕
              </h4>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                성수동 붉은 벽돌 골목에 숨겨진 차분한 핸드드립 쇼룸이에요. 원두 노트 카드 디자인부터 조도까지 감각...
              </p>

              {/* Photo with photo count indicator */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 mt-3 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80"
                  alt="카페"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  📷 3
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-rose-500 font-medium">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    42
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    8
                  </span>
                </div>

                <button
                  onClick={(e) => toggleBookmark('p1', e)}
                  className="p-1 hover:text-indigo-600"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      bookmarkedIds.includes('p1')
                        ? 'text-indigo-600 fill-indigo-600'
                        : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Post 2 */}
            <div className="pt-4 cursor-pointer group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    워크스페이스
                  </span>
                  <span className="text-[11px] text-slate-400">5일 전</span>
                </div>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                디자이너의 데스크 셋업 & 생산성 툴 추천 5선
              </h4>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                재택근무 몰입도를 200% 올려준 데스크 셋업 아이템들과 매일 쓰고 있는 Figma 플러그인, 아날로그 플래너 기록 루틴을 정리해봤습니다.
              </p>

              {/* Blue Article Note Card */}
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 mt-3 flex items-center justify-between hover:bg-indigo-50 transition">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-indigo-950">
                      데스크 셋업 아티클 요약노트
                    </h5>
                    <p className="text-[10px] text-indigo-700 mt-0.5">
                      5분 읽을거리 • 유용한 툴 큐레이션
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0" />
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-rose-500 font-medium">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    73
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    15
                  </span>
                </div>

                <button
                  onClick={(e) => toggleBookmark('p2', e)}
                  className="p-1 hover:text-indigo-600"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      bookmarkedIds.includes('p2')
                        ? 'text-indigo-600 fill-indigo-600'
                        : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
