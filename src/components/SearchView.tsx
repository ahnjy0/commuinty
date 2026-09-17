import React, { useState } from 'react';
import {
  Search as SearchIcon,
  X,
  TrendingUp,
  ArrowUpRight,
  Minus,
  Heart,
  MessageCircle,
  Eye,
  Bookmark,
  MoreVertical,
  SlidersHorizontal,
  ChevronRight,
  UserPlus,
  UserCheck,
} from 'lucide-react';
import { Post } from '../types';
import { MINJI_USER, SEARCH_TRENDS, INITIAL_RECENT_SEARCHES } from '../data/mockData';

interface SearchViewProps {
  onSelectPost: (post: Post) => void;
  onOpenUserProfile: (userId: string) => void;
  posts: Post[];
}

type SearchTab = 'all' | 'posts' | 'users';

export const SearchView: React.FC<SearchViewProps> = ({
  onSelectPost,
  onOpenUserProfile,
  posts,
}) => {
  const [searchTerm, setSearchTerm] = useState('성수동');
  const [activeTab, setActiveTab] = useState<SearchTab>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>(INITIAL_RECENT_SEARCHES);
  const [isFollowingMinji, setIsFollowingMinji] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleRemoveRecent = (item: string) => {
    setRecentSearches(recentSearches.filter((s) => s !== item));
  };

  const handleClearAllRecent = () => {
    setRecentSearches([]);
  };

  const handleKeywordClick = (kw: string) => {
    setSearchTerm(kw);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((b) => b !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  // Matched mock posts for "성수동"
  const searchResultsPosts = [
    {
      id: 'search_post_1',
      author: {
        id: 'user_minji',
        name: '민지',
        handle: '@minji_vibe',
        avatar: MINJI_USER.avatar,
      },
      createdAt: '2시간 전',
      title: '골목 카페 추천합니다',
      keywordPrefix: '성수동',
      content: '주말에 다녀온 조용하고 원두 퀄리티 뛰어난 에스프레소 바 3곳을 정리해봤어요.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&auto=format&fit=crop&q=80',
      likes: 42,
      comments: 8,
      views: 340,
    },
    {
      id: 'search_post_2',
      author: {
        id: 'user_coder',
        name: '코딩러',
        handle: '@coder',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      },
      createdAt: '어제',
      title: 'Next.js 풀스택 개발 & 모각코 후기',
      keywordPrefix: '성수동',
      content: '어제 성수동 위워크에서 열린 모디 모각코에서 나온 App Router 최적화 질문과 Server Actions 활용 팁들을 간략...',
      likes: 89,
      comments: 12,
      views: 720,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 text-slate-900">
      {/* Search Input Bar */}
      <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 border-b border-slate-100 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          <div className="relative flex-1 flex items-center bg-slate-100 rounded-xl px-3 py-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-600 transition">
            <SearchIcon className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="관심사, 키워드, 사용자를 검색해보세요"
              className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none pr-6"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="지우기"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => {
              if (searchTerm && !recentSearches.includes(searchTerm)) {
                setRecentSearches([searchTerm, ...recentSearches]);
              }
            }}
            className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-sm shadow-indigo-200 shrink-0"
          >
            검색
          </button>
        </div>
      </div>

      {/* Search Filter Tabs */}
      <div className="bg-white border-b border-slate-100 px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-3 text-xs font-semibold relative flex items-center gap-1.5 transition ${
              activeTab === 'all'
                ? 'text-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>전체</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'all'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              24
            </span>
            {activeTab === 'all' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`py-3 text-xs font-semibold relative flex items-center gap-1.5 transition ${
              activeTab === 'posts'
                ? 'text-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>게시글</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'posts'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              18
            </span>
            {activeTab === 'posts' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`py-3 text-xs font-semibold relative flex items-center gap-1.5 transition ${
              activeTab === 'users'
                ? 'text-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>사용자</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'users'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              6
            </span>
            {activeTab === 'users' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>
        </div>

        <button
          onClick={() => alert('필터 정렬 및 상태 전환 모달')}
          className="flex items-center gap-1 text-[11px] font-medium text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition"
        >
          <SlidersHorizontal className="w-3 h-3" />
          <span>상태 전환</span>
        </button>
      </div>

      <div className="px-4 pt-2.5 pb-16 max-w-lg mx-auto space-y-3.5">
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <span>최근 검색어</span>
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
              </div>
              <button
                onClick={handleClearAllRecent}
                className="text-[11px] text-slate-400 hover:text-slate-600"
              >
                모두 지우기
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-full transition cursor-pointer"
                  onClick={() => handleKeywordClick(item)}
                >
                  <span>{item}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveRecent(item);
                    }}
                    className="text-slate-400 hover:text-slate-600 ml-0.5"
                    aria-label="삭제"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Keywords Section */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <span className="text-rose-500">🔥</span>
              <span>인기 급상승 키워드</span>
            </div>
            <span className="text-[11px] text-slate-400">14:00 기준</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {SEARCH_TRENDS.map((trend) => (
              <button
                key={trend.rank}
                onClick={() => handleKeywordClick(trend.keyword)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 transition text-left group"
              >
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-rose-500 w-3">
                    {trend.rank}
                  </span>
                  <span className="text-xs text-slate-800 font-medium group-hover:text-indigo-600">
                    {trend.keyword}
                  </span>
                </div>
                {trend.trend === 'up' ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-rose-500" />
                ) : (
                  <Minus className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* User Search Results */}
        {(activeTab === 'all' || activeTab === 'users') && (
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-900">
                사용자 검색 결과
              </h4>
              <button
                onClick={() => setActiveTab('users')}
                className="text-[11px] text-indigo-600 font-medium flex items-center gap-0.5 hover:underline"
              >
                더보기 <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-start justify-between gap-3 pt-1">
              <div
                className="flex items-start gap-3 cursor-pointer flex-1"
                onClick={() => onOpenUserProfile(MINJI_USER.id)}
              >
                <img
                  src={MINJI_USER.avatar}
                  alt={MINJI_USER.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">
                      {MINJI_USER.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {MINJI_USER.handle}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    작성글 {MINJI_USER.postCount} · 팔로워 {MINJI_USER.followerCount}
                  </p>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    커피와 기록을 좋아하는 디자이너.{' '}
                    <span className="bg-indigo-100 text-indigo-700 font-medium px-1 rounded">
                      성수동
                    </span>{' '}
                    스페셜티 로스터리 탐방 기록을 공유합니다
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFollowingMinji(!isFollowingMinji)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition ${
                  isFollowingMinji
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                }`}
              >
                {isFollowingMinji ? '팔로잉' : '팔로우'}
              </button>
            </div>
          </div>
        )}

        {/* Posts Search Results */}
        {(activeTab === 'all' || activeTab === 'posts') && (
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-900">
                게시글 검색 결과
              </h4>
              <button className="text-[11px] text-slate-500 flex items-center gap-1 hover:text-slate-800">
                <span>정확도순</span>
                <span className="text-[9px]">▼</span>
              </button>
            </div>

            <div className="space-y-4 divide-y divide-slate-100">
              {searchResultsPosts.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => {
                    // Navigate to post 1 if matched
                    const match = posts.find((p) => p.id === 'post_1') || posts[0];
                    onSelectPost(match);
                  }}
                  className={`pt-3 cursor-pointer group ${idx === 0 ? 'pt-0' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.author.avatar}
                        alt={item.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-medium text-xs text-slate-800">
                        {item.author.name}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-400">
                        {item.createdAt}
                      </span>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <h5 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                        <span className="bg-indigo-100 text-indigo-700 px-1 rounded mr-1">
                          {item.keywordPrefix}
                        </span>
                        {item.title}
                      </h5>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {item.content}
                      </p>
                    </div>

                    {item.image && (
                      <img
                        src={item.image}
                        alt="썸네일"
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2.5 text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-rose-500 font-medium">
                        <Heart className="w-3.5 h-3.5 fill-rose-500" />
                        {item.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {item.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {item.views}
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleBookmark(item.id, e)}
                      className="p-1 hover:text-indigo-600"
                      aria-label="북마크"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          bookmarkedIds.includes(item.id)
                            ? 'text-indigo-600 fill-indigo-600'
                            : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
