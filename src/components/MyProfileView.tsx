import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Share2,
  Plus,
  PenSquare,
  Heart,
  MessageCircle,
  Eye,
  Check,
  Lightbulb,
  MoreVertical,
  Trash2,
  Bookmark,
  CheckCircle2,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';
import { Post, ScreenType, UserProfile } from '../types';

interface MyProfileViewProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectPost: (post: Post) => void;
  posts?: Post[];
  currentUser?: UserProfile;
  onToggleLike?: (postId: string) => void;
  onToggleBookmark?: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({
  onNavigate,
  onSelectPost,
  posts = [],
  currentUser = CURRENT_USER,
  onToggleLike,
  onToggleBookmark,
  onDeletePost,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [sortBy, setSortBy] = useState<'latest' | 'likes'>('latest');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    showToast('내 피드 링크가 클립보드에 복사되었습니다');
  };

  // Filter ONLY posts written by the current user
  const myPosts = posts.filter(
    (p) =>
      p.author.id === currentUser.id ||
      p.author.handle === currentUser.handle ||
      p.author.name === currentUser.name ||
      p.author.id === CURRENT_USER.id
  );

  // Compute aggregate stats from real user posts
  const totalLikes = myPosts.reduce((acc, p) => acc + (p.likes || 0), 0);
  const totalComments = myPosts.reduce((acc, p) => acc + (p.commentsCount || 0), 0);

  // Extract unique categories from my posts
  const availableCategories = ['전체', ...Array.from(new Set(myPosts.map((p) => p.category)))];

  // Filter by category
  let displayedPosts = selectedCategory === '전체'
    ? myPosts
    : myPosts.filter((p) => p.category === selectedCategory);

  // Sort
  displayedPosts = [...displayedPosts].sort((a, b) => {
    if (sortBy === 'likes') {
      return (b.likes || 0) - (a.likes || 0);
    }
    // Default: natural order (latest posts first)
    return 0;
  });

  const handleDelete = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    setMenuOpenId(null);
    if (window.confirm('이 피드를 삭제하시겠습니까?')) {
      onDeletePost?.(postId);
      showToast('피드가 삭제되었습니다');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900">내 피드</h2>
          <span className="bg-indigo-50 text-indigo-700 text-[11px] font-bold px-2 py-0.5 rounded-full tracking-tight">
            {myPosts.length}개의 글
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onNavigate('create')}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xs transition"
            aria-label="새 글 작성"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>글쓰기</span>
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition"
            aria-label="공유"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition"
            aria-label="설정"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-3 pb-16 max-w-lg mx-auto space-y-3.5">
        {/* User Summary Profile Mini-Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center gap-3">
            <div
              className="relative cursor-pointer group"
              onClick={() => onNavigate('edit-profile')}
              title="프로필 수정하기"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-50 shadow-inner group-hover:opacity-90 transition"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base text-slate-900 truncate">
                  {currentUser.name}
                </h3>
                {currentUser.isCertified && (
                  <CheckCircle2 className="w-3.5 h-3.5 fill-blue-500 text-white shrink-0" />
                )}
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-1.5 py-0.2 rounded shrink-0">
                  {currentUser.badgeTitle || 'CREATOR'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 truncate">
                {currentUser.handle} · {currentUser.level}
              </p>
            </div>

            <button
              onClick={() => onNavigate('edit-profile')}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold border border-slate-200/80 transition shrink-0"
            >
              수정
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div className="bg-slate-50/80 rounded-xl p-2.5 mt-3 flex items-center justify-around border border-slate-100/80 text-center">
            <div>
              <p className="text-sm font-bold text-slate-900">{myPosts.length}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">내가 쓴 글</p>
            </div>
            <div className="h-5 w-px bg-slate-200" />
            <div>
              <p className="text-sm font-bold text-indigo-600">{totalLikes}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">받은 좋아요</p>
            </div>
            <div className="h-5 w-px bg-slate-200" />
            <div>
              <p className="text-sm font-bold text-slate-900">{totalComments}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">총 댓글</p>
            </div>
          </div>

          {/* Quick Write Trigger */}
          <button
            onClick={() => onNavigate('create')}
            className="w-full mt-3 flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500 transition group text-left"
          >
            <div className="flex items-center gap-2">
              <PenSquare className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span>새로운 생각이나 일상을 내 피드에 기록해보세요</span>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 shrink-0">
              작성하기 &rarr;
            </span>
          </button>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {availableCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Toggle */}
          <div className="flex items-center gap-1 shrink-0 bg-white p-0.5 rounded-lg border border-slate-200/80 text-[11px]">
            <button
              onClick={() => setSortBy('latest')}
              className={`px-2 py-0.5 rounded font-medium transition ${
                sortBy === 'latest'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => setSortBy('likes')}
              className={`px-2 py-0.5 rounded font-medium transition ${
                sortBy === 'likes'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              좋아요순
            </button>
          </div>
        </div>

        {/* My Posts Feed List */}
        {displayedPosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <PenSquare className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">
              작성된 게시글이 없습니다
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
              {selectedCategory === '전체'
                ? '아직 작성한 피드가 없습니다. 첫 번째 글을 작성하고 사람들과 소통해보세요!'
                : `'${selectedCategory}' 카테고리에 작성된 글이 없습니다.`}
            </p>
            <button
              onClick={() => onNavigate('create')}
              className="mt-4 inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>첫 피드 작성하기</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-sm hover:border-slate-200 transition-all cursor-pointer relative group"
              >
                {/* Header: Category & Date & More Actions */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        post.category === '라이프스타일'
                          ? 'bg-rose-50 text-rose-600'
                          : post.category === '디자인&개발'
                          ? 'bg-indigo-50 text-indigo-600'
                          : post.category === '인기 가이드'
                          ? 'bg-amber-50 text-amber-700'
                          : post.category === '정보공유'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {post.createdAt}
                    </span>
                  </div>

                  {/* Kebab Dropdown Menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(menuOpenId === post.id ? null : post.id);
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                      aria-label="추가 작업"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {menuOpenId === post.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-full mt-1 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20 text-xs animate-in fade-in"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard?.writeText?.(
                              `${window.location.origin}/post/${post.id}`
                            );
                            setMenuOpenId(null);
                            showToast('게시글 주소가 복사되었습니다');
                          }}
                          className="w-full px-3 py-1.5 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Share2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>링크 복사</span>
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, post.id)}
                          className="w-full px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                          <span>글 삭제</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Layout */}
                <div className="flex gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Tip Box if available */}
                    {post.tip && (
                      <div className="mt-2 bg-indigo-50/70 border border-indigo-100 rounded-lg p-2 flex items-center gap-1.5 text-[11px] text-indigo-900 font-medium">
                        <Lightbulb className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{post.tip}</span>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Image if present */}
                  {post.images && post.images.length > 0 && (
                    <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                      <img
                        src={post.images[0]}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {post.images.length > 1 && (
                        <span className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                          +{post.images.length - 1}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-slate-400 font-medium hover:text-indigo-600 transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link preview card if present */}
                {post.linkPreview && (
                  <div className="mt-2.5 p-2 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 truncate">
                      {post.linkPreview.title}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </div>
                )}

                {/* Footer Interaction Bar */}
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100/80 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike?.(post.id);
                      }}
                      className={`flex items-center gap-1 font-medium transition ${
                        post.isLiked
                          ? 'text-rose-500'
                          : 'text-slate-400 hover:text-rose-500'
                      }`}
                      aria-label="좋아요"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          post.isLiked ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                      <span>{post.likes}</span>
                    </button>

                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.commentsCount}</span>
                    </span>

                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{post.views}</span>
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark?.(post.id);
                    }}
                    className={`p-1 rounded hover:bg-slate-100 transition ${
                      post.isBookmarked
                        ? 'text-amber-500'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    aria-label="북마크"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        post.isBookmarked ? 'fill-amber-500 text-amber-500' : ''
                      }`}
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* End of List Indicator */}
        {displayedPosts.length > 0 && (
          <div className="p-4 text-center bg-white rounded-2xl border border-slate-100 text-slate-400 text-xs flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <p className="font-semibold text-slate-700">
              내 모든 피드({displayedPosts.length}개)를 확인했습니다
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              새로운 생각이나 일상을 언제든 자유롭게 기록해보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
