import { Post, Comment, UserProfile, AppNotification } from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'user_current',
  name: '진영',
  handle: '@jinyoung_creator',
  avatar: 'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=200&auto=format&fit=crop&q=80',
  badgeTitle: 'CREATOR',
  isCertified: true,
  level: '활동 레벨 4 · 모디언',
  bio: '모바일 인터랙션과 개발에 진심인 UI/UX 디자이너입니다. 일상의 소소한 발견과 유용한 디자인 팁을 공유해요 ✨',
  website: 'https://github.com/jinyoung-ui',
  postCount: 24,
  likeCount: 890,
  followerCount: 152,
};

export const MINJI_USER: UserProfile = {
  id: 'user_minji',
  name: '민지',
  handle: '@minji_vibe',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  badgeTitle: '인증 회원',
  isCertified: true,
  level: '지식인 Lv.3',
  bio: '커피와 일상의 순간들을 기록하는 디자이너입니다. 감성 카페와 브랜딩 인사이트를 공유해요 ☕✨',
  postCount: 14,
  likeCount: 428,
  followerCount: 240,
  isFollowing: false,
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    author: {
      id: 'user_minji',
      name: '민지',
      handle: '@minji_vibe',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      badge: '초보 모디러',
      isCertified: true,
      level: 'Lv.3',
    },
    createdAt: '15분 전',
    category: '일상',
    title: '이번 주말에 다녀온 성수동 골목 카페 추천합니다 ☕',
    content: '조용하고 채광 좋은 곳 찾다가 발견했는데 원두도 직접 고를 수 있고 베이커리도 너무 맛있었어요! 다음주에 또 가볼 생각입니다. 채광이 너무 좋고 원두 종류를 고를 수 있는 핸드드립 전문점입니다. 조용하게 작업하거나 책 읽기에도 최적의 공간이었어요. 근처 가시는 분들은 꼭 필터커피 에티오피아 시켜보세요! 꽃 향이랑 상큼한 산미 밸런스가 정말 환상적입니다 ✨',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&auto=format&fit=crop&q=80',
    ],
    tags: ['#성수동카페', '#핸드드립', '#주말나들이', '#카페투어'],
    likes: 42,
    commentsCount: 8,
    views: 340,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 'post_2',
    author: {
      id: 'user_coding_rabbit',
      name: '코딩하는토끼',
      handle: '@coding_rabbit',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      badge: '개발자',
      isCertified: false,
    },
    createdAt: '2시간 전',
    category: '정보공유',
    title: 'Next.js + Supabase 조합으로 첫 모바일 사이드 프로젝트 배포 완료!',
    content: '기획부터 배포까지 딱 3주 걸렸네요. 생각보다 Supabase Auth랑 Row Level Security 세팅이 편해서 놀랐습니다. 피드백 언제든 환영해요!',
    images: [],
    tags: ['#Nextjs', '#Supabase', '#개발'],
    likes: 128,
    commentsCount: 24,
    views: 890,
    isLiked: false,
    isBookmarked: false,
    linkPreview: {
      title: 'project-modi-v1.vercel.app',
      url: 'https://project-modi-v1.vercel.app',
      status: 'Production Live',
      ping: 'Ping 24ms',
    },
  },
  {
    id: 'post_3',
    author: {
      id: 'user_travel',
      name: '여행조아',
      handle: '@travel_lover',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      badge: '모디 러버',
      isCertified: false,
    },
    createdAt: '어제',
    category: '취미/모임',
    title: '초보자를 위한 가벼운 트레킹 코스 best 3 공유드려요 ⛰️',
    content: '주말에 가볍게 운동 겸 산책하기 좋은 코스들만 모아봤습니다. 대중교통으로 가기에도 무리 없어요.',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&auto=format&fit=crop&q=80',
    ],
    tags: ['#트레킹', '#등산', '#주말나들이', '#힐링'],
    likes: 76,
    commentsCount: 15,
    views: 620,
    isLiked: false,
    isBookmarked: true,
  },
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c_1',
    postId: 'post_1',
    author: {
      name: '코딩러',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    },
    createdAt: '어제',
    content: '성수동 자주 가는데 이번 주말에 바로 가봐야겠네요! 좌석에 콘센트도 있나요?',
    likes: 2,
    isLiked: false,
    replies: [
      {
        id: 'c_1_1',
        postId: 'post_1',
        author: {
          name: '민지',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          isAuthor: true,
        },
        createdAt: '18시간 전',
        content: '네! 창가 바 테이블 쪽에 콘센트 넉넉하게 있었어요 ㅎㅎ 작업하시는 분들도 꽤 계시더라구요!',
        likes: 1,
        isLiked: true,
      },
    ],
  },
  {
    id: 'c_2',
    postId: 'post_1',
    author: {
      name: '여행조아',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    },
    createdAt: '2시간 전',
    content: '분위기 너무 예뻐요 사진 잘 찍으시네요 👍 다음 서울 여행 코스에 바로 저장해둡니다!',
    likes: 1,
    isLiked: false,
  },
];

export const MY_POSTS: Post[] = [
  {
    id: 'my_post_1',
    author: {
      id: 'user_current',
      name: '진영',
      handle: '@jinyoung_creator',
      avatar: 'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=200&auto=format&fit=crop&q=80',
      badge: 'CREATOR',
      isCertified: true,
    },
    createdAt: '2025.02.20',
    category: '라이프스타일',
    title: '이번 주말에 다녀온 성수동 골목 카페 추천합니다',
    content: '감각적인 인테리어와 핸드드립 커피가 매력적인 공간이었어요. 주말 오후 작업하...',
    images: [
      'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=400&auto=format&fit=crop&q=80',
    ],
    tags: ['#성수동카페', '#핸드드립'],
    likes: 42,
    commentsCount: 8,
    views: 310,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 'my_post_2',
    author: {
      id: 'user_current',
      name: '진영',
      handle: '@jinyoung_creator',
      avatar: 'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=200&auto=format&fit=crop&q=80',
      badge: 'CREATOR',
      isCertified: true,
    },
    createdAt: '2025.02.14',
    category: '디자인&개발',
    title: 'Tailwind CSS v4 마이그레이션 후기 및 팁 공유',
    content: '설정 파일 간소화와 새로워진 CSS-first 구성 방식을 프로덕션에 도입해봤습니다. 겪었던 주요 호환성 이슈들과 해결 팁을 정리했습니다.',
    images: [],
    tags: ['#TailwindCSS', '#Frontend'],
    likes: 67,
    commentsCount: 19,
    views: 542,
    isLiked: false,
    isBookmarked: true,
    tip: '💡 빌드 속도 40% 단축 달성, @theme 설정 팁 포함',
  },
  {
    id: 'my_post_3',
    author: {
      id: 'user_current',
      name: '진영',
      handle: '@jinyoung_creator',
      avatar: 'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=200&auto=format&fit=crop&q=80',
      badge: 'CREATOR',
      isCertified: true,
    },
    createdAt: '2025.02.08',
    category: '인기 가이드',
    title: '초보자도 쉽게 따라하는 와이어프레임 설계 가이드',
    content: '구조화된 정보 아키텍처(IA)를 기반으로 사용자 중심의 플로우를 그리는 실전 템플릿과 노하우를 소개합니다.',
    images: [
      'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=400&auto=format&fit=crop&q=80',
    ],
    tags: ['#UIUX', '#와이어프레임'],
    likes: 112,
    commentsCount: 31,
    views: 1280,
    isLiked: false,
    isBookmarked: false,
  },
];

export const SEARCH_TRENDS = [
  { rank: 1, keyword: '사이드프로젝트', trend: 'up' },
  { rank: 2, keyword: '주말나들이', trend: 'up' },
  { rank: 3, keyword: '개발자모임', trend: 'same' },
  { rank: 4, keyword: '원두추천', trend: 'up' },
];

export const INITIAL_RECENT_SEARCHES = [
  '성수동 카페',
  'Supabase 팁',
  '트레킹 코스',
  '프론트엔드',
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    type: 'like',
    title: '새로운 좋아요',
    message: '민지님이 회원님의 피드 "모바일 반응형 웹 UI 여백과 폰트 스케일 가이드"를 좋아합니다.',
    createdAt: '12분 전',
    isRead: false,
    user: {
      name: '민지',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      handle: '@minji_vibe',
    },
    postId: 'my_post_1',
  },
  {
    id: 'notif_2',
    type: 'comment',
    title: '새로운 댓글',
    message: '준호님이 피드에 댓글을 남겼습니다: "정리해주신 폰트 스케일 표 정말 도움 많이 되었습니다!"',
    createdAt: '45분 전',
    isRead: false,
    user: {
      name: '준호',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      handle: '@junho_craft',
    },
    postId: 'my_post_1',
  },
  {
    id: 'notif_3',
    type: 'follow',
    title: '새로운 팔로워',
    message: '서연님이 회원님을 팔로우하기 시작했습니다.',
    createdAt: '2시간 전',
    isRead: false,
    user: {
      name: '서연',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      handle: '@seoyeon_daily',
    },
  },
  {
    id: 'notif_4',
    type: 'system',
    title: '모디 v1.2 업데이트',
    message: '새로운 내 피드 필터 및 내 프로필 수정, 프로필 사진 변경 기능이 새롭게 추가되었습니다.',
    createdAt: '1일 전',
    isRead: true,
  },
  {
    id: 'notif_5',
    type: 'like',
    title: '북마크 저장',
    message: '태현님이 회원님의 피드 "2025 프론트엔드 모바일 트렌드 노트"를 북마크에 저장했습니다.',
    createdAt: '2일 전',
    isRead: true,
    user: {
      name: '태현',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      handle: '@taehyun_dev',
    },
    postId: 'my_post_2',
  },
];

export const AVATAR_PRESETS = [
  {
    id: 'preset_1',
    name: '디자이너',
    url: 'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'preset_2',
    name: '모던 캐주얼',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'preset_3',
    name: '테크 프로',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'preset_4',
    name: '크리에이티브',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'preset_5',
    name: '개발자 감성',
    url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'preset_6',
    name: '미니멀 스타일',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  },
];

