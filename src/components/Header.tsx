import React from 'react';
import { Language, Profile } from '../types';
import { getTranslation } from '../lib/translations';
import { ShieldCheck, Flame, MessageCircle, User, Shield, LayoutGrid, Globe, Heart, Lock } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  currentTab: 'discover' | 'grid' | 'matches' | 'profile' | 'safety' | 'admin';
  onSelectTab: (tab: 'discover' | 'grid' | 'matches' | 'profile' | 'safety' | 'admin') => void;
  currentUser: Profile | null;
  onOpenAuth: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  currentTab,
  onSelectTab,
  currentUser,
  onOpenAuth,
  unreadCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-amber-900/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('discover')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-red-600 flex items-center justify-center text-white shadow-md shadow-amber-900/40 border border-amber-400/30 transform hover:scale-105 transition">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-amber-100 font-amharic">
                  {getTranslation(language, 'appName')}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                  18+
                </span>
              </div>
              <p className="text-[10px] text-stone-400 font-amharic hidden md:block">
                {getTranslation(language, 'tagline')}
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 bg-stone-800/80 p-1 rounded-2xl border border-stone-700/60">
            <button
              id="nav-tab-discover"
              onClick={() => onSelectTab('discover')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'discover'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="font-amharic">{getTranslation(language, 'navDiscover')}</span>
            </button>

            <button
              id="nav-tab-grid"
              onClick={() => onSelectTab('grid')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'grid'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-amber-400" />
              <span className="font-amharic">{getTranslation(language, 'navGrid')}</span>
            </button>

            <button
              id="nav-tab-matches"
              onClick={() => onSelectTab('matches')}
              className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'matches'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span className="font-amharic">{getTranslation(language, 'navMatches')}</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              id="nav-tab-safety"
              onClick={() => onSelectTab('safety')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'safety'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="font-amharic">{getTranslation(language, 'navSafety')}</span>
            </button>

            <button
              id="nav-tab-admin"
              onClick={() => onSelectTab('admin')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'admin'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-amharic text-[11px]">{getTranslation(language, 'navAdmin')}</span>
            </button>
          </nav>

          {/* Right Actions: Language Switch & User Profile / Login */}
          <div className="flex items-center space-x-3">
            
            {/* Language Toggle Button */}
            <button
              id="language-toggle-btn"
              onClick={onToggleLanguage}
              className="flex items-center space-x-1.5 bg-stone-800 hover:bg-stone-700 text-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-700/40 shadow-sm transition active:scale-95"
              title="Switch Language / ቋንቋ ቀይር"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-amharic">{getTranslation(language, 'languageToggle')}</span>
            </button>

            {/* Profile Avatar or Login */}
            {currentUser ? (
              <button
                id="header-user-profile-btn"
                onClick={() => onSelectTab('profile')}
                className="flex items-center space-x-2 bg-stone-800 hover:bg-stone-700/80 p-1.5 pr-3 rounded-full border border-stone-700 transition"
              >
                <div className="relative">
                  <img
                    src={currentUser.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500/80"
                    referrerPolicy="no-referrer"
                  />
                  {currentUser.verification_status === 'verified' && (
                    <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-white p-0.5 rounded-full ring-1 ring-stone-900" title="Photo Verified">
                      <ShieldCheck className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-stone-200 font-amharic hidden sm:inline max-w-[100px] truncate">
                  {currentUser.name}
                </span>
              </button>
            ) : (
              <button
                id="header-auth-btn"
                onClick={onOpenAuth}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-amber-900/30 transition transform active:scale-95 font-amharic"
              >
                {getTranslation(language, 'login')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Navigation Bar */}
      <div className="md:hidden border-t border-stone-800 bg-stone-900 px-2 py-2 flex items-center justify-around">
        <button
          id="mobile-nav-discover"
          onClick={() => onSelectTab('discover')}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition ${
            currentTab === 'discover' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Flame className="w-5 h-5" />
          <span className="font-amharic">{getTranslation(language, 'navDiscover')}</span>
        </button>

        <button
          id="mobile-nav-grid"
          onClick={() => onSelectTab('grid')}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition ${
            currentTab === 'grid' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="font-amharic">{getTranslation(language, 'navGrid')}</span>
        </button>

        <button
          id="mobile-nav-matches"
          onClick={() => onSelectTab('matches')}
          className={`relative flex flex-col items-center space-y-0.5 text-[10px] font-medium transition ${
            currentTab === 'matches' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-amharic">{getTranslation(language, 'navMatches')}</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          id="mobile-nav-profile"
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition ${
            currentTab === 'profile' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="font-amharic">{getTranslation(language, 'navProfile')}</span>
        </button>

        <button
          id="mobile-nav-safety"
          onClick={() => onSelectTab('safety')}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition ${
            currentTab === 'safety' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="font-amharic">{getTranslation(language, 'navSafety')}</span>
        </button>
      </div>
    </header>
  );
};
