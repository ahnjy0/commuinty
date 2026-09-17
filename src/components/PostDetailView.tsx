import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  MoreVertical,
  CheckCircle2,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  Image as ImageIcon,
  Check,
  UserPlus,
  UserCheck,
} from 'lucide-react';
import { Post, Comment } from '../types';
import { CURRENT_USER } from '../data/mockData';

interface PostDetailViewProps {
  post: Post;
  comments: Comment[];
  onBack: () => void;
  onToggleLike: (postId: string) => void;
  onToggleBookmark: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onOpenUserProfile: (userId: string) => void;
}

export const PostDetailView: React.FC<PostDetailViewProps> = ({
  post,
  comments,
  onBack,
  onToggleLike,
  onToggleBookmark,
  onAddComment,
  onOpenUserProfile,
}) => {
  const [commentText, setCommentText] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Local comments for this post
  const postComments = comments.filter((c) => c.postId === post.id);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen pb-24 text-slate-900">
      {/* Top Action Header Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-700 transition"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold text-sm text-slate-900">
            게시글 상세
          </span>
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
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition"
            aria-label="더보기"
            onClick={() => alert('게시글 옵션: 링크 복사 / 북마크 / 신고')}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-3 pb-16 max-w-lg mx-auto">
        {/* Author Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onOpenUserProfile(post.author.id)}
          >
            <div className="relative">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition">
                  {post.author.name}
                </span>
                {post.author.isCertified && (
                  <span className="inline-flex items-center gap-0.5 bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-100">
                    <CheckCircle2 className="w-3 h-3 fill-blue-500 text-white" />
                    인증 회원
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {post.createdAt} · 조회 {post.views}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition ${
              isFollowing
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
            }`}
          >
            {isFollowing ? (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                팔로잉
              </>
            ) : (
              <>
                <UserPlus className="w-3.5 h-3.5" />
                팔로우
              </>
            )}
          </button>
        </div>

        {/* Category Pill */}
        <div className="mb-2">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {post.category || '라이프스타일'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-slate-900 mb-3.5 leading-snug">
          {post.title}
        </h1>

        {/* Body Paragraphs */}
        <div className="text-slate-700 text-[15px] leading-relaxed space-y-3 mb-5 font-normal">
          <p>
            {post.content}
          </p>
          {post.images && post.images.length > 0 && (
            <p>
              채광이 너무 좋고 원두 종류를 고를 수 있는 핸드드립 전문점입니다. 조용하게 작업하거나 책 읽기에도 최적의 공간이었어요.
            </p>
          )}
          <p>
            근처 가시는 분들은 꼭 필터커피 에티오피아 시켜보세요! 꽃 향이랑 상큼한 산미 밸런스가 정말 환상적입니다 ✨
          </p>
        </div>

        {/* Multi-Image Gallery Layout matching screenshot */}
        {post.images && post.images.length > 0 && (
          <div className="space-y-2.5 mb-5">
            {/* Main Featured Photo */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3] shadow-sm">
              <img
                src={post.images[0]}
                alt="메인 이미지"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                1 / {Math.max(post.images.length, 3)}
              </span>
            </div>

            {/* Sub photos 2-column grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl overflow-hidden bg-slate-100 aspect-square shadow-sm">
                <img
                  src={
                    post.images[1] ||
                    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80'
                  }
                  alt="상세 이미지 1"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="rounded-xl overflow-hidden bg-slate-100 aspect-square shadow-sm">
                <img
                  src={
                    post.images[2] ||
                    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80'
                  }
                  alt="상세 이미지 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        )}

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(post.tags.length > 0
            ? post.tags
            : ['#성수동카페', '#핸드드립', '#주말나들이', '#카페투어']
          ).map((tag) => (
            <span
              key={tag}
              className="bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full transition cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Reaction Stats Bar */}
        <div className="flex items-center justify-between py-3 border-y border-slate-100 text-slate-600 text-sm">
          <div className="flex items-center gap-5">
            <button
              onClick={() => onToggleLike(post.id)}
              className={`flex items-center gap-1.5 font-medium transition ${
                post.isLiked ? 'text-rose-500' : 'hover:text-rose-500'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  post.isLiked ? 'fill-rose-500 stroke-rose-500' : ''
                }`}
              />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center gap-1.5 font-medium text-slate-500">
              <MessageCircle className="w-5 h-5" />
              <span>{post.commentsCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleBookmark(post.id)}
              className={`p-1.5 rounded-full hover:bg-slate-100 transition ${
                post.isBookmarked ? 'text-indigo-600' : 'hover:text-indigo-600'
              }`}
              aria-label="북마크"
            >
              <Bookmark
                className={`w-5 h-5 ${
                  post.isBookmarked ? 'fill-indigo-600 stroke-indigo-600' : ''
                }`}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-800 transition"
              aria-label="공유하기"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 font-bold text-base text-slate-900">
              <span>댓글</span>
              <span className="text-indigo-600 font-extrabold">{post.commentsCount}</span>
            </div>
            <button className="text-xs text-slate-500 flex items-center gap-1 hover:text-slate-800">
              <span>등록순</span>
              <span className="text-[10px]">▼</span>
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {postComments.map((comment) => (
              <div key={comment.id} className="space-y-3">
                {/* Parent comment */}
                <div className="flex items-start gap-3">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900">
                          {comment.author.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {comment.createdAt}
                        </span>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                      <button className="hover:text-indigo-600 font-medium">
                        답글달기
                      </button>
                      <button className="flex items-center gap-1 hover:text-rose-500">
                        <Heart className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-10 space-y-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-2.5">
                        <img
                          src={reply.author.avatar}
                          alt={reply.author.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-slate-900">
                              {reply.author.name}
                            </span>
                            {reply.author.isAuthor && (
                              <span className="bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                                작성자
                              </span>
                            )}
                            <span className="text-[11px] text-slate-400">
                              {reply.createdAt}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                            {reply.content}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                            <button className="flex items-center gap-1 hover:text-rose-500">
                              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                              <span>{reply.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Comment Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5">
        <form
          onSubmit={handleSubmitComment}
          className="max-w-lg mx-auto flex items-center gap-2.5"
        >
          <img
            src={CURRENT_USER.avatar}
            alt="내 프로필"
            className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
          />
          <div className="flex-1 relative flex items-center bg-slate-100 rounded-full px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:bg-white transition">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="따뜻한 댓글을 남겨보세요..."
              className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none pr-8"
            />
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600 p-1"
              aria-label="사진 첨부"
              onClick={() => alert('댓글 사진 첨부 기능')}
            >
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white flex items-center justify-center shadow-sm transition shrink-0"
            aria-label="댓글 전송"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
