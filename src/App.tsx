import React, { useState } from 'react';
import { ScreenType, MainTabType, Post, Comment, UserProfile, AppNotification } from './types';
import {
  INITIAL_POSTS,
  INITIAL_COMMENTS,
  MY_POSTS,
  CURRENT_USER,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FeedView } from './components/FeedView';
import { PostDetailView } from './components/PostDetailView';
import { PostCreateView } from './components/PostCreateView';
import { SearchView } from './components/SearchView';
import { MyProfileView } from './components/MyProfileView';
import { UserProfileView } from './components/UserProfileView';
import { SettingsView } from './components/SettingsView';
import { LoginView } from './components/LoginView';
import { SignUpView } from './components/SignUpView';
import { NotificationsView } from './components/NotificationsView';
import { EditProfileView } from './components/EditProfileView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('feed');
  const [currentTab, setCurrentTab] = useState<MainTabType>('feed');
  const [previousScreen, setPreviousScreen] = useState<ScreenType>('feed');

  // User Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);

  // Notifications State
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // App data state - starts with user's own posts and community posts
  const [posts, setPosts] = useState<Post[]>(() => {
    const existingIds = new Set(INITIAL_POSTS.map((p) => p.id));
    const userPosts = MY_POSTS.filter((p) => !existingIds.has(p.id));
    return [...userPosts, ...INITIAL_POSTS];
  });
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [selectedPost, setSelectedPost] = useState<Post>(INITIAL_POSTS[0]);

  // Unread notification count
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Navigation handlers
  const navigateTo = (screen: ScreenType) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
    // Sync active tab if matching
    if (screen === 'feed') setCurrentTab('feed');
    else if (screen === 'search') setCurrentTab('search');
    else if (screen === 'my-profile') setCurrentTab('my-profile');
    else if (screen === 'settings') setCurrentTab('settings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: MainTabType) => {
    setCurrentTab(tab);
    setPreviousScreen(currentScreen);
    setCurrentScreen(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (
      [
        'detail',
        'create',
        'user-profile',
        'login',
        'signup',
        'notifications',
        'edit-profile',
      ].includes(currentScreen)
    ) {
      setCurrentScreen(previousScreen || 'feed');
    } else {
      setCurrentScreen('feed');
      setCurrentTab('feed');
    }
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    navigateTo('detail');
  };

  // Notification actions
  const handleSelectNotification = (notif: AppNotification) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );

    if (notif.postId) {
      const targetPost = posts.find((p) => p.id === notif.postId);
      if (targetPost) {
        handleSelectPost(targetPost);
      }
    }
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  // Profile Edit save handler
  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setCurrentUser(updatedProfile);

    // Sync all posts authored by current user so their new avatar/name appears in feeds
    setPosts((prev) =>
      prev.map((p) => {
        if (
          p.author.id === updatedProfile.id ||
          p.author.handle === currentUser.handle ||
          p.author.name === currentUser.name ||
          p.author.id === CURRENT_USER.id
        ) {
          return {
            ...p,
            author: {
              ...p.author,
              name: updatedProfile.name,
              handle: updatedProfile.handle,
              avatar: updatedProfile.avatar,
              badge: updatedProfile.badgeTitle || p.author.badge,
            },
          };
        }
        return p;
      })
    );

    handleBack();
  };

  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      })
    );

    if (selectedPost.id === postId) {
      setSelectedPost((prev) => {
        const isLiked = !prev.isLiked;
        return {
          ...prev,
          isLiked,
          likes: isLiked ? prev.likes + 1 : Math.max(0, prev.likes - 1),
        };
      });
    }
  };

  const handleToggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, isBookmarked: !p.isBookmarked };
        }
        return p;
      })
    );

    if (selectedPost.id === postId) {
      setSelectedPost((prev) => ({
        ...prev,
        isBookmarked: !prev.isBookmarked,
      }));
    }
  };

  const handleAddComment = (postId: string, text: string) => {
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      postId,
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        isAuthor: false,
      },
      createdAt: '방금 전',
      content: text,
      likes: 0,
      isLiked: false,
    };

    setComments((prev) => [newComment, ...prev]);

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p
      )
    );

    if (selectedPost.id === postId) {
      setSelectedPost((prev) => ({
        ...prev,
        commentsCount: prev.commentsCount + 1,
      }));
    }
  };

  const handleCreatePost = (newPostData: Partial<Post>) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: newPostData.author!,
      createdAt: '방금 전',
      category: newPostData.category || '일상',
      title: newPostData.title || '',
      content: newPostData.content || '',
      images: newPostData.images || [],
      tags: newPostData.tags || [],
      likes: 0,
      commentsCount: 0,
      views: 1,
      isLiked: false,
      isBookmarked: false,
    };

    setPosts([newPost, ...posts]);
    setSelectedPost(newPost);
    navigateTo('detail');
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    if (selectedPost && selectedPost.id === postId) {
      handleBack();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex justify-center">
      {/* App Container */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col shadow-xs border-x border-slate-200/70 relative">
        {/* Top Application Header - Primary brand header for Feed */}
        {currentScreen === 'feed' && (
          <Header
            currentScreen={currentScreen}
            onNavigate={navigateTo}
            onBack={handleBack}
            unreadCount={unreadNotificationsCount}
            currentUser={currentUser}
          />
        )}

        {/* Screen Body */}
        <main className="flex-1 overflow-y-auto">
          {currentScreen === 'feed' && (
            <FeedView
              posts={posts}
              onSelectPost={handleSelectPost}
              onOpenCreate={() => navigateTo('create')}
              onOpenUserProfile={() => navigateTo('user-profile')}
              onToggleLike={handleToggleLike}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {currentScreen === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onBack={handleBack}
              onSelectNotification={handleSelectNotification}
              onMarkAllAsRead={handleMarkAllNotificationsAsRead}
              onDeleteNotification={handleDeleteNotification}
              onClearAll={handleClearAllNotifications}
            />
          )}

          {currentScreen === 'detail' && (
            <PostDetailView
              post={selectedPost}
              comments={comments}
              onBack={handleBack}
              onToggleLike={handleToggleLike}
              onToggleBookmark={handleToggleBookmark}
              onAddComment={handleAddComment}
              onOpenUserProfile={() => navigateTo('user-profile')}
            />
          )}

          {currentScreen === 'create' && (
            <PostCreateView
              onBack={handleBack}
              onSubmitPost={handleCreatePost}
              currentUser={currentUser}
            />
          )}

          {currentScreen === 'search' && (
            <SearchView
              posts={posts}
              onSelectPost={handleSelectPost}
              onOpenUserProfile={() => navigateTo('user-profile')}
            />
          )}

          {currentScreen === 'my-profile' && (
            <MyProfileView
              onNavigate={navigateTo}
              onSelectPost={handleSelectPost}
              posts={posts}
              currentUser={currentUser}
              onToggleLike={handleToggleLike}
              onToggleBookmark={handleToggleBookmark}
              onDeletePost={handleDeletePost}
            />
          )}

          {currentScreen === 'edit-profile' && (
            <EditProfileView
              currentUser={currentUser}
              onSave={handleSaveProfile}
              onBack={handleBack}
            />
          )}

          {currentScreen === 'user-profile' && (
            <UserProfileView
              onBack={handleBack}
              onSelectPost={handleSelectPost}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsView
              onNavigate={navigateTo}
              onBack={handleBack}
              currentUser={currentUser}
            />
          )}

          {currentScreen === 'login' && (
            <LoginView
              onNavigate={navigateTo}
              onLoginSuccess={() => {
                alert('로그인되었습니다!');
                navigateTo('feed');
              }}
            />
          )}

          {currentScreen === 'signup' && (
            <SignUpView
              onNavigate={navigateTo}
              onSignUpSuccess={() => {
                navigateTo('feed');
              }}
            />
          )}
        </main>

        {/* Bottom Nav Bar (Feed, Search, My Profile, Settings) */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={handleTabChange}
          currentScreen={currentScreen}
        />
      </div>
    </div>
  );
}
