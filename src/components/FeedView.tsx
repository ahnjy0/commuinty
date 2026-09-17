import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreVertical,
  Pencil,
  ExternalLink,
  Code2,
  Check,
} from 'lucide-react';
import { Post } from '../types';

interface FeedViewProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
  onOpenCreate: () => void;
  onOpenUserProfile: (userId: string) => void;
  onToggleLike: (postId: string) => void;
  onToggleBookmark: (postId: string) => void;
}

const CATEGORIES = ['전체', '일상', '정보공유', '질문/답변', '취미/모임', '라이프'];

export const FeedView: React.FC<FeedViewProps> = ({
  posts,
  onSelectPost,
  onOpenCreate,
  onOpenUserProfile,
  onToggleLike,
  onToggleBookmark,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPosts =
    selectedCategory === '전체'
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const handleShare = (post: Post, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative pb-20 bg-slate-50 min-h-screen">
      {/* Category Scroll Chips */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-2 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-2xs">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Feed Posts List */}
      <div className="px-4 pt-2.5 pb-16 space-y-3.5 max-w-lg mx-auto">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => onSelectPost(post)}
            className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:border-slate-200 transition-all cursor-pointer group"
          >
            {/* Author Header */}
            <div className="flex items-center justify-between mb-3">
              <div
                className="flex items-center gap-2.5"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenUserProfile(post.author.id);
                }}
              >
                <div className="relative">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-100"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-slate-900 hover:text-indigo-600 transition">
                      {post.author.name}
                    </span>
                    {post.author.badge && (
                      <span className="bg-indigo-50 text-indigo-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {post.author.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">
                    {post.createdAt}
                  </span>
                </div>
              </div>
              <button
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
                onClick={(e) => {
                  e.stopPropagation();
                  alert('신고하기 / 작성자 차단하기 메뉴입니다.');
                }}
                aria-label="더보기"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Excerpt */}
            <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-indigo-600 transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="text-sm text-slate-600 line-clamp-2 mb-3 leading-relaxed">
              {post.content}
            </p>

            {/* Optional Photo Attachment */}
            {post.images && post.images.length > 0 && (
              <div className="relative rounded-xl overflow-hidden mb-3.5 bg-slate-100 aspect-[16/10]">
                <img
                  src={post.images[0]}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  loading="lazy"
                />
                {post.images.length > 1 && (
                  <span className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                    1 / {post.images.length}
                  </span>
                )}
              </div>
            )}

            {/* Optional Link Preview Card */}
            {post.linkPreview && (
              <div
                className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 mb-3.5 flex items-center justify-between hover:bg-indigo-50 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(post.linkPreview?.url, '_blank');
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-indigo-950 font-mono">
                      {post.linkPreview.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] text-indigo-700 font-medium">
                        {post.linkPreview.status} • {post.linkPreview.ping}
                      </span>
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-indigo-500 shrink-0 mr-1" />
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded-full transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-slate-500 text-xs">
              <div className="flex items-center gap-4">
                {/* Likes */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(post.id);
                  }}
                  className={`flex items-center gap-1.5 py-1 px-1.5 rounded-md hover:bg-rose-50 transition ${
                    post.isLiked ? 'text-rose-500 font-semibold' : 'hover:text-rose-500'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      post.isLiked ? 'fill-rose-500 stroke-rose-500' : ''
                    }`}
                  />
                  <span>{post.likes}</span>
                </button>

                {/* Comments */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPost(post);
                  }}
                  className="flex items-center gap-1.5 py-1 px-1.5 rounded-md hover:bg-slate-100 hover:text-slate-700 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.commentsCount}</span>
                </button>
              </div>

              <div className="flex items-center gap-1">
                {/* Bookmark */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(post.id);
                  }}
                  className={`p-1.5 rounded-md hover:bg-slate-100 transition ${
                    post.isBookmarked
                      ? 'text-indigo-600'
                      : 'hover:text-indigo-600'
                  }`}
                  aria-label="북마크"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      post.isBookmarked ? 'fill-indigo-600 stroke-indigo-600' : ''
                    }`}
                  />
                </button>

                {/* Share */}
                <button
                  onClick={(e) => handleShare(post, e)}
                  className="p-1.5 rounded-md hover:bg-slate-100 hover:text-slate-700 transition"
                  aria-label="공유하기"
                >
                  {copiedId === post.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Floating Action Button (FAB) for Post Creation */}
      <button
        onClick={onOpenCreate}
        className="fixed bottom-20 right-6 sm:right-8 z-40 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold px-4 py-2.5 rounded-full shadow-lg shadow-indigo-300/50 flex items-center gap-2 transition-all"
        aria-label="글쓰기"
      >
        <Pencil className="w-4 h-4" />
        <span className="text-sm">글쓰기</span>
      </button>
    </div>
  );
};
