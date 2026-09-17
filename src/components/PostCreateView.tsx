import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  Save,
  Coffee,
  Lightbulb,
  HelpCircle,
  Users,
  X,
  Plus,
  Image as ImageIcon,
  Hash,
  MapPin,
  Smile,
  Star,
} from 'lucide-react';
import { Post, UserProfile } from '../types';
import { CURRENT_USER } from '../data/mockData';

interface PostCreateViewProps {
  onBack: () => void;
  onSubmitPost: (newPost: Partial<Post>) => void;
  currentUser?: UserProfile;
}

const CATEGORIES = [
  { id: '일상', label: '일상', icon: Coffee },
  { id: '정보공유', label: '정보공유', icon: Lightbulb },
  { id: '질문/답변', label: '질문/답변', icon: HelpCircle },
  { id: '취미/모임', label: '취미/모임', icon: Users },
];

export const PostCreateView: React.FC<PostCreateViewProps> = ({
  onBack,
  onSubmitPost,
  currentUser = CURRENT_USER,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('일상');
  const [title, setTitle] = useState(
    '도심 속 조용한 힐링 작업실 카페를 발견했습니다'
  );
  const [content, setContent] = useState(
    '오랜만에 마음에 쏙 드는 작업 공간을 찾아서 공유해봅니다!\n\n햇살도 부드럽게 들어오고, 배경음악도 잔잔해서 집중이 정말 잘 되네요. 콘센트 자리도 넉넉하고 커피 향도 훌륭해서 주말 아침마다 종종 오게 될 것 같아요.'
  );
  const [tags, setTags] = useState<string[]>([
    '#카페투어',
    '#원격근무',
    '#생산성',
  ]);
  const [newTagInput, setNewTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [mediaList, setMediaList] = useState<string[]>([
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
  ]);

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    const formatted = newTagInput.startsWith('#')
      ? newTagInput.trim()
      : `#${newTagInput.trim()}`;
    if (!tags.includes(formatted)) {
      setTags([...tags, formatted]);
    }
    setNewTagInput('');
    setShowTagInput(false);
  };

  const handleRemoveMedia = (index: number) => {
    setMediaList(mediaList.filter((_, i) => i !== index));
  };

  const handleAddSampleMedia = () => {
    if (mediaList.length >= 5) {
      alert('최대 5장까지 등록 가능합니다.');
      return;
    }
    const samples = [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
    ];
    const nextImg = samples[mediaList.length % samples.length];
    setMediaList([...mediaList, nextImg]);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 본문을 입력해주세요.');
      return;
    }

    const newPost: Partial<Post> = {
      author: {
        id: currentUser.id,
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        badge: currentUser.badgeTitle || 'CREATOR',
        isCertified: currentUser.isCertified,
      },
      category: selectedCategory,
      title: title.trim(),
      content: content.trim(),
      images: mediaList,
      tags: tags,
      likes: 0,
      commentsCount: 0,
      views: 1,
      isLiked: false,
      isBookmarked: false,
    };

    onSubmitPost(newPost);
  };

  return (
    <div className="bg-white min-h-screen pb-20 text-slate-900">
      {/* Top Header */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-700 transition"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <span className="font-semibold text-xs text-slate-900">
              새로운 피드 작성
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('작성 중인 내용이 임시저장되었습니다.')}
            className="flex items-center gap-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition font-medium"
          >
            <Save className="w-3.5 h-3.5" />
            <span>임시저장 (1)</span>
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 text-xs text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 px-3.5 py-1.5 rounded-full transition font-semibold shadow-sm shadow-indigo-200"
          >
            <span>등록</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-2.5 pb-16 max-w-lg mx-auto space-y-3.5">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                    : 'bg-indigo-50/70 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Title Input */}
        <div className="pt-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full text-lg font-bold text-slate-900 placeholder-slate-400 focus:outline-none border-b border-slate-200 pb-2.5 focus:border-indigo-600 transition"
          />
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-100"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-rose-500 transition"
                aria-label="태그 삭제"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {showTagInput ? (
            <form onSubmit={handleAddTag} className="inline-flex items-center">
              <input
                type="text"
                autoFocus
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                placeholder="태그 입력 후 엔터"
                className="text-xs bg-slate-100 border border-slate-300 rounded-full px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-600 w-28"
                onBlur={() => setShowTagInput(false)}
              />
            </form>
          ) : (
            <button
              onClick={() => setShowTagInput(true)}
              className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full font-medium transition"
            >
              <Plus className="w-3 h-3" />
              <span>태그</span>
            </button>
          )}
        </div>

        {/* Body Textarea */}
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="사진과 함께 공유하고 싶은 이야기를 자유롭게 적어보세요..."
            rows={7}
            className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Media Upload Section */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <ImageIcon className="w-4 h-4 text-indigo-600" />
              <span>첨부된 미디어</span>
              <span className="text-indigo-600 font-extrabold">{mediaList.length}</span>
              <span className="text-slate-400 font-normal">/ 5</span>
            </div>
            <span className="text-[11px] text-slate-400">
              첫 번째 사진이 대표 이미지로 설정됩니다
            </span>
          </div>

          {/* Media list & Add button */}
          <div className="grid grid-cols-2 gap-3">
            {mediaList.map((url, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 group shadow-sm"
              >
                <img
                  src={url}
                  alt={`첨부 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Delete button */}
                <button
                  onClick={() => handleRemoveMedia(index)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rose-600 transition"
                  aria-label="사진 삭제"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {/* Primary cover badge */}
                {index === 0 && (
                  <span className="absolute bottom-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-white" />
                    대표
                  </span>
                )}
              </div>
            ))}

            {mediaList.length < 5 && (
              <button
                onClick={handleAddSampleMedia}
                className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl aspect-[4/3] flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50/50 transition"
              >
                <Plus className="w-6 h-6" />
                <span className="text-xs font-medium">사진 추가</span>
              </button>
            )}
          </div>
        </div>

        {/* Tip Box matching screenshot */}
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-indigo-950">
              따뜻한 피드백을 부르는 팁
            </h4>
            <p className="text-xs text-indigo-900/80 mt-0.5 leading-relaxed">
              구체적인 장소명이나 방문 시간대를 본문에 함께 적어주시면 이웃 회원들에게 더 큰 도움이 돼요!
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Formatting Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 px-4 py-2.5">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddSampleMedia}
              className="flex items-center gap-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              <ImageIcon className="w-4 h-4" />
              <span>{mediaList.length}/5</span>
            </button>
            <button
              onClick={() => setShowTagInput(true)}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
              aria-label="해시태그"
            >
              <Hash className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert('위치 태그 추가 기능: 성수동, 서울')}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
              aria-label="위치 추가"
            >
              <MapPin className="w-4 h-4" />
            </button>
            <button
              onClick={() => setContent(content + ' ✨')}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
              aria-label="이모지"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs font-mono text-slate-400">
            <span className="font-semibold text-indigo-600">
              {content.length}
            </span>{' '}
            / 2000
          </div>
        </div>
      </div>
    </div>
  );
};
