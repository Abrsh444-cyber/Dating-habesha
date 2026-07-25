import React, { useState } from 'react';
import { Language, Profile, SearchFilters, Match } from '../types';
import { getTranslation } from '../lib/translations';
import { 
  Heart, X, SlidersHorizontal, ShieldCheck, MapPin, Briefcase, 
  GraduationCap, Sparkles, MessageCircle, AlertCircle, Eye, Flag, 
  Check, RefreshCw, Layers, LayoutGrid
} from 'lucide-react';

interface DiscoveryFeedProps {
  language: Language;
  profiles: Profile[];
  currentUser: Profile | null;
  filters: SearchFilters;
  onOpenFilterDrawer: () => void;
  onLikeProfile: (likedProfile: Profile) => { isMatch: boolean; match?: Match };
  onPassProfile: (profileId: string) => void;
  onReportProfile: (profile: Profile) => void;
  onStartChat: (match: Match) => void;
  viewMode: 'swipe' | 'grid';
  onToggleViewMode: (mode: 'swipe' | 'grid') => void;
}

export const DiscoveryFeed: React.FC<DiscoveryFeedProps> = ({
  language,
  profiles,
  currentUser,
  filters,
  onOpenFilterDrawer,
  onLikeProfile,
  onPassProfile,
  onReportProfile,
  onStartChat,
  viewMode,
  onToggleViewMode,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProfileDetail, setSelectedProfileDetail] = useState<Profile | null>(null);
  const [matchCelebration, setMatchCelebration] = useState<{ match: Match; profile: Profile } | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Filter logic
  const filteredProfiles = profiles.filter((p) => {
    if (currentUser && p.id === currentUser.id) return false;
    if (p.age < filters.minAge || p.age > filters.maxAge) return false;
    if (filters.religion && filters.religion !== 'all' && p.religion !== filters.religion) return false;
    if (filters.intent && filters.intent !== 'all' && p.intent !== filters.intent) return false;
    if (filters.region && filters.region !== 'all' && p.region !== filters.region) return false;
    if (filters.verifiedOnly && p.verification_status !== 'verified') return false;
    return true;
  });

  const currentProfile = filteredProfiles[currentIndex];

  const handleActionLike = (profileToLike: Profile) => {
    const result = onLikeProfile(profileToLike);
    if (result.isMatch && result.match) {
      setMatchCelebration({ match: result.match, profile: profileToLike });
    }
    advanceCard();
  };

  const handleActionPass = (profileToPass: Profile) => {
    onPassProfile(profileToPass.id);
    advanceCard();
  };

  const advanceCard = () => {
    setActivePhotoIdx(0);
    if (currentIndex < filteredProfiles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(filteredProfiles.length);
    }
  };

  const resetStack = () => {
    setCurrentIndex(0);
    setActivePhotoIdx(0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      
      {/* Top Filter & View Mode Bar */}
      <div className="flex items-center justify-between mb-6 bg-stone-900 border border-stone-800 p-3 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-2">
          <button
            id="filter-drawer-btn"
            onClick={onOpenFilterDrawer}
            className="flex items-center space-x-2 bg-stone-800 hover:bg-stone-750 text-amber-300 px-3.5 py-2 rounded-xl text-xs font-bold border border-amber-800/40 transition active:scale-95"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span className="font-amharic">{getTranslation(language, 'filterTitle')}</span>
          </button>

          <div className="hidden sm:flex items-center space-x-1.5 text-[11px] text-stone-400 font-mono bg-stone-950/60 px-3 py-1.5 rounded-xl border border-stone-800">
            <span>Age: {filters.minAge}-{filters.maxAge}</span>
            {filters.intent !== 'all' && <span className="text-amber-400"> • {filters.intent}</span>}
            {filters.religion !== 'all' && <span className="text-emerald-400"> • {filters.religion}</span>}
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 bg-stone-800 rounded-xl border border-stone-700">
          <button
            id="mode-swipe-btn"
            onClick={() => onToggleViewMode('swipe')}
            className={`p-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'swipe' ? 'bg-amber-600 text-white shadow' : 'text-stone-400 hover:text-white'
            }`}
            title="Swipe Card View"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            id="mode-grid-btn"
            onClick={() => onToggleViewMode('grid')}
            className={`p-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'grid' ? 'bg-amber-600 text-white shadow' : 'text-stone-400 hover:text-white'
            }`}
            title="Grid Browse View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: SWIPE CARD STACK */}
      {viewMode === 'swipe' && (
        <div className="max-w-md mx-auto">
          {currentProfile && currentIndex < filteredProfiles.length ? (
            <div className="relative bg-stone-900 border border-amber-900/40 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
              
              {/* Profile Photo Carousel */}
              <div className="relative aspect-3/4 w-full bg-stone-950 overflow-hidden">
                <img
                  src={currentProfile.photos[activePhotoIdx]?.url || currentProfile.photos[0]?.url}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Photo Carousel Indicators */}
                {currentProfile.photos.length > 1 && (
                  <div className="absolute top-3 inset-x-3 flex space-x-1.5 z-10">
                    {currentProfile.photos.map((_, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => setActivePhotoIdx(pIdx)}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          activePhotoIdx === pIdx ? 'bg-amber-400 shadow' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Badges Overlay */}
                <div className="absolute top-6 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  {currentProfile.verification_status === 'verified' && (
                    <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/50 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shadow font-amharic">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{getTranslation(language, 'verifiedBadge')}</span>
                    </span>
                  )}

                  <button
                    onClick={() => onReportProfile(currentProfile)}
                    className="pointer-events-auto ml-auto bg-stone-900/80 hover:bg-stone-900 text-stone-300 hover:text-red-400 p-2 rounded-full border border-stone-700 backdrop-blur-md transition"
                    title="Report / Block"
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Card Gradient & Quick Info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent p-5 pt-12 text-stone-100">
                  
                  {/* Name & Age */}
                  <div className="flex items-baseline space-x-2 mb-1">
                    <h2 className="text-2xl font-extrabold font-amharic text-amber-100">
                      {currentProfile.name}
                    </h2>
                    <span className="text-xl font-bold font-mono text-amber-400">
                      {currentProfile.age}
                    </span>
                  </div>

                  {/* Intent Badge */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-amharic">
                      {currentProfile.intent === 'marriage' && getTranslation(language, 'intentMarriage')}
                      {currentProfile.intent === 'serious' && getTranslation(language, 'intentSerious')}
                      {currentProfile.intent === 'casual' && getTranslation(language, 'intentCasual')}
                    </span>

                    <span className="bg-stone-800/80 text-stone-300 border border-stone-700 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-amharic">
                      {currentProfile.religion === 'orthodox' && getTranslation(language, 'religionOrthodox')}
                      {currentProfile.religion === 'islam' && getTranslation(language, 'religionIslam')}
                      {currentProfile.religion === 'protestant' && getTranslation(language, 'religionProtestant')}
                      {currentProfile.religion === 'catholic' && getTranslation(language, 'religionCatholic')}
                    </span>
                  </div>

                  {/* Location & Profession */}
                  <div className="space-y-1 text-xs text-stone-300 font-amharic">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{currentProfile.city}, {currentProfile.country}</span>
                    </div>
                    {currentProfile.profession && (
                      <div className="flex items-center space-x-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{currentProfile.profession}</span>
                      </div>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-stone-300/90 line-clamp-2 font-amharic italic">
                    "{currentProfile.bio}"
                  </p>
                </div>
              </div>

              {/* Action Buttons: Pass & Like */}
              <div className="p-4 bg-stone-900 flex items-center justify-evenly border-t border-stone-800">
                <button
                  id="pass-btn"
                  onClick={() => handleActionPass(currentProfile)}
                  className="w-14 h-14 rounded-2xl bg-stone-800 hover:bg-stone-750 text-stone-400 hover:text-white border border-stone-700 flex items-center justify-center shadow-lg transition transform active:scale-90"
                  title="Pass / Next"
                >
                  <X className="w-7 h-7 text-stone-400" />
                </button>

                <button
                  id="view-detail-btn"
                  onClick={() => setSelectedProfileDetail(currentProfile)}
                  className="w-11 h-11 rounded-xl bg-stone-800 hover:bg-stone-750 text-amber-300 border border-stone-700 flex items-center justify-center transition"
                  title="View Full Profile"
                >
                  <Eye className="w-5 h-5" />
                </button>

                <button
                  id="like-btn"
                  onClick={() => handleActionLike(currentProfile)}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 text-white flex items-center justify-center shadow-xl shadow-amber-950/60 transition transform active:scale-90"
                  title="Like Profile"
                >
                  <Heart className="w-7 h-7 fill-white" />
                </button>
              </div>

            </div>
          ) : (
            /* Empty state when stack exhausted */
            <div className="bg-stone-900 border border-amber-900/30 rounded-3xl p-8 text-center space-y-4 shadow-xl">
              <Sparkles className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold font-amharic text-amber-200">
                {getTranslation(language, 'noMoreProfiles')}
              </h3>
              <p className="text-xs text-stone-400 font-amharic max-w-sm mx-auto leading-relaxed">
                {getTranslation(language, 'noMoreProfilesDesc')}
              </p>
              <button
                onClick={resetStack}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow transition font-amharic"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Review All Profiles Again</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: GRID BROWSE MODE */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((p) => (
            <div
              key={p.id}
              className="bg-stone-900 border border-stone-800 hover:border-amber-700/60 rounded-3xl overflow-hidden shadow-lg transition group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-stone-950">
                  <img
                    src={p.photos[0]?.url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {p.verification_status === 'verified' && (
                    <span className="absolute top-2 left-2 bg-emerald-950/80 backdrop-blur text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center space-x-1 font-amharic">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{getTranslation(language, 'verifiedBadge')}</span>
                    </span>
                  )}

                  <span className="absolute bottom-2 right-2 bg-stone-950/80 backdrop-blur text-amber-300 px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono">
                    {p.age} yrs
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base font-amharic text-amber-100 truncate">
                      {p.name}
                    </h3>
                    <button
                      onClick={() => onReportProfile(p)}
                      className="text-stone-500 hover:text-red-400 p-1"
                      title="Report"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-1 text-xs text-stone-300 font-amharic">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{p.city}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="bg-amber-950/60 text-amber-300 text-[10px] px-2 py-0.5 rounded-md border border-amber-800/40 font-amharic">
                      {p.intent === 'marriage' ? 'Marriage-Minded' : p.intent === 'serious' ? 'Serious' : 'Casual'}
                    </span>
                    <span className="bg-stone-800 text-stone-300 text-[10px] px-2 py-0.5 rounded-md font-amharic">
                      {p.religion}
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 font-amharic pt-1">
                    {p.bio}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center space-x-2">
                <button
                  onClick={() => setSelectedProfileDetail(p)}
                  className="flex-1 py-2 bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-bold rounded-xl transition font-amharic"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleActionLike(p)}
                  className="p-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow transition"
                  title="Like Profile"
                >
                  <Heart className="w-4 h-4 fill-white" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* FULL PROFILE DETAIL MODAL */}
      {selectedProfileDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-stone-900 border border-amber-900/40 rounded-3xl max-h-[90vh] overflow-y-auto text-stone-100 shadow-2xl p-6 space-y-5">
            
            <button
              onClick={() => setSelectedProfileDetail(null)}
              className="absolute top-4 right-4 p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photos gallery */}
            <div className="space-y-2">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
                <img
                  src={selectedProfileDetail.photos[0]?.url}
                  alt={selectedProfileDetail.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {selectedProfileDetail.photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {selectedProfileDetail.photos.map((ph, idx) => (
                    <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-stone-800">
                      <img
                        src={ph.url}
                        alt=""
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Info Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-amber-100 font-amharic">
                    {selectedProfileDetail.name}, <span className="font-mono">{selectedProfileDetail.age}</span>
                  </h3>
                  <p className="text-xs text-stone-400 font-amharic flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{selectedProfileDetail.city}, {selectedProfileDetail.country}</span>
                  </p>
                </div>

                <button
                  onClick={() => onReportProfile(selectedProfileDetail)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-stone-800 hover:bg-red-950 text-stone-300 hover:text-red-300 border border-stone-700 rounded-xl text-xs font-amharic transition"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report / Block</span>
                </button>
              </div>

              <div className="p-4 bg-stone-800/60 rounded-2xl border border-stone-750 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-amharic">About Me</h4>
                <p className="text-xs text-stone-200 leading-relaxed font-amharic">
                  {selectedProfileDetail.bio}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-amharic">
                <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 block">Intent:</span>
                  <span className="font-bold text-amber-300">{selectedProfileDetail.intent}</span>
                </div>
                <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 block">Faith:</span>
                  <span className="font-bold text-stone-200">{selectedProfileDetail.religion}</span>
                </div>
                {selectedProfileDetail.region && (
                  <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800">
                    <span className="text-[10px] text-stone-400 block">Region (Optional):</span>
                    <span className="font-bold text-stone-200">{selectedProfileDetail.region}</span>
                  </div>
                )}
                {selectedProfileDetail.profession && (
                  <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800">
                    <span className="text-[10px] text-stone-400 block">Profession:</span>
                    <span className="font-bold text-stone-200">{selectedProfileDetail.profession}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Bar inside Detail */}
            <div className="flex items-center space-x-3 pt-3 border-t border-stone-800">
              <button
                onClick={() => {
                  handleActionPass(selectedProfileDetail);
                  setSelectedProfileDetail(null);
                }}
                className="flex-1 py-3 bg-stone-800 hover:bg-stone-750 text-stone-300 font-bold text-xs rounded-2xl transition font-amharic"
              >
                Pass
              </button>
              <button
                onClick={() => {
                  handleActionLike(selectedProfileDetail);
                  setSelectedProfileDetail(null);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-red-600 text-white font-bold text-xs rounded-2xl shadow-lg transition font-amharic flex items-center justify-center space-x-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Like Profile</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MUTUAL MATCH CELEBRATION MODAL */}
      {matchCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm bg-stone-900 border-2 border-amber-500/80 rounded-3xl p-6 text-center text-stone-100 shadow-2xl space-y-5">
            
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center mx-auto shadow-lg shadow-amber-900/50 animate-bounce">
              <Heart className="w-8 h-8 fill-white text-white" />
            </div>

            <div>
              <h3 className="text-2xl font-black font-amharic text-amber-200 mb-1">
                {getTranslation(language, 'matched')}
              </h3>
              <p className="text-xs text-stone-300 font-amharic">
                {getTranslation(language, 'matchedDesc', { name: matchCelebration.profile.name })}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4 py-2">
              <img
                src={currentUser?.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                alt="You"
                className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-500"
                referrerPolicy="no-referrer"
              />
              <Heart className="w-6 h-6 text-amber-400 animate-pulse" />
              <img
                src={matchCelebration.profile.photos[0]?.url}
                alt={matchCelebration.profile.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  const m = matchCelebration.match;
                  setMatchCelebration(null);
                  onStartChat(m);
                }}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition font-amharic"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{getTranslation(language, 'startChat')}</span>
              </button>

              <button
                onClick={() => setMatchCelebration(null)}
                className="w-full py-2 text-stone-400 hover:text-stone-200 text-xs font-amharic"
              >
                {getTranslation(language, 'keepSwiping')}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
