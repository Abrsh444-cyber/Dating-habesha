import React, { useState, useEffect } from 'react';
import { Language, Profile, SearchFilters, Match, Report, ReportReason } from './types';
import { initLocalData, localStore } from './lib/supabase';
import { initialMockProfiles } from './data/mockProfiles';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { OnboardingFlow } from './components/OnboardingFlow';
import { DiscoveryFeed } from './components/DiscoveryFeed';
import { FilterDrawer } from './components/FilterDrawer';
import { ChatView } from './components/ChatView';
import { SafetyCenter } from './components/SafetyCenter';
import { AdminDashboard } from './components/AdminDashboard';
import { ReportModal } from './components/ReportModal';
import { ProfileView } from './components/ProfileView';

export default function App() {
  // Initialize storage once
  useEffect(() => {
    initLocalData();
  }, []);

  // State
  const [language, setLanguage] = useState<Language>('en');
  const [currentTab, setCurrentTab] = useState<'discover' | 'grid' | 'matches' | 'profile' | 'safety' | 'admin'>('discover');
  
  // Current user state
  const [currentUser, setCurrentUser] = useState<Profile | null>(() => {
    const saved = localStore.getCurrentUser();
    if (saved) return saved;
    // Default logged-in sample profile for instant preview
    const sampleUser: Profile = {
      id: 'usr-demo-me',
      name: 'Eden Haile',
      dob: '1999-04-12',
      age: 27,
      gender: 'female',
      city: 'Addis Ababa (Bole)',
      country: 'Ethiopia',
      religion: 'orthodox',
      region: 'amhara',
      bio: 'Architect based in Addis. Grounded in family values, orthodox faith, and Habesha culture. Enjoy Sunday coffee ceremonies, art galleries, and nature trips to Debre Libanos.',
      intent: 'marriage',
      education: 'B.Sc. Architecture (AAU)',
      profession: 'Project Designer',
      languages: ['Amharic', 'English'],
      photos: [
        { id: 'ph-me-1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800', is_verified: true, order: 1 },
        { id: 'ph-me-2', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800', is_verified: true, order: 2 },
      ],
      verification_status: 'verified',
      verified_at: '2026-01-01T00:00:00Z',
      rate_limit_count: 0,
      created_at: '2026-01-01T00:00:00Z',
      last_active: 'Just now',
    };
    localStore.setCurrentUser(sampleUser);
    return sampleUser;
  });

  const [profiles, setProfiles] = useState<Profile[]>(() => localStore.getProfiles());
  const [matches, setMatches] = useState<Match[]>(() => localStore.getMatches());
  const [activeMatch, setActiveMatch] = useState<Match | null>(null);
  const [reports, setReports] = useState<Report[]>(() => localStore.getReports());

  // Modals & Drawers
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [reportingProfile, setReportingProfile] = useState<Profile | null>(null);
  const [discoveryViewMode, setDiscoveryViewMode] = useState<'swipe' | 'grid'>('swipe');

  // Search Filters
  const [filters, setFilters] = useState<SearchFilters>({
    minAge: 18,
    maxAge: 50,
    religion: 'all',
    intent: 'all',
    region: 'all',
    verifiedOnly: false,
  });

  // Toggle Language (EN <-> AM)
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'am' : 'en'));
  };

  // Auth Success
  const handleAuthSuccess = (profile: Profile | null, isNewAccount: boolean) => {
    if (isNewAccount) {
      setIsOnboardingOpen(true);
    } else {
      const user = profile || localStore.getCurrentUser();
      setCurrentUser(user);
    }
  };

  // Onboarding Complete
  const handleOnboardingComplete = (newProfile: Profile) => {
    localStore.setCurrentUser(newProfile);
    setCurrentUser(newProfile);
    
    // Add to profile list
    const updatedProfiles = [newProfile, ...profiles];
    localStore.saveProfiles(updatedProfiles);
    setProfiles(updatedProfiles);

    setIsOnboardingOpen(false);
    setCurrentTab('discover');
  };

  // Like & Match logic
  const handleLikeProfile = (likedProfile: Profile) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return { isMatch: false };
    }

    const result = localStore.addLike(currentUser.id, likedProfile.id);
    if (result.isMatch && result.match) {
      setMatches(localStore.getMatches());
    }
    return result;
  };

  // Pass profile logic
  const handlePassProfile = (profileId: string) => {
    // Optionally log pass
  };

  // Report & Block submission
  const handleReportSubmitted = (reason: ReportReason, details: string, blockUser: boolean) => {
    if (!reportingProfile || !currentUser) return;

    // Add report
    localStore.addReport({
      reporter_id: currentUser.id,
      reported_id: reportingProfile.id,
      reason,
      details,
    });
    setReports(localStore.getReports());

    // Add block if checked
    if (blockUser) {
      localStore.addBlock(currentUser.id, reportingProfile.id);
      // Remove reported profile from feed
      const filtered = profiles.filter((p) => p.id !== reportingProfile.id);
      setProfiles(filtered);
      localStore.saveProfiles(filtered);

      // Remove from active matches if existing
      const remainingMatches = matches.filter(
        (m) => m.user_a.id !== reportingProfile.id && m.user_b.id !== reportingProfile.id
      );
      setMatches(remainingMatches);
      if (activeMatch && (activeMatch.user_a.id === reportingProfile.id || activeMatch.user_b.id === reportingProfile.id)) {
        setActiveMatch(null);
      }
    }

    setReportingProfile(null);
  };

  // Admin Actions
  const handleApproveVerification = (profileId: string) => {
    const updated = profiles.map((p) =>
      p.id === profileId ? { ...p, verification_status: 'verified' as const, verified_at: new Date().toISOString() } : p
    );
    setProfiles(updated);
    localStore.saveProfiles(updated);
  };

  const handleRejectVerification = (profileId: string) => {
    const updated = profiles.map((p) =>
      p.id === profileId ? { ...p, verification_status: 'unverified' as const } : p
    );
    setProfiles(updated);
    localStore.saveProfiles(updated);
  };

  const handleDismissReport = (reportId: string) => {
    const all = localStore.getReports().filter((r) => r.id !== reportId);
    localStorage.setItem('habesha_user_reports', JSON.stringify(all));
    setReports(all);
  };

  const handleBanUser = (userId: string) => {
    const filtered = profiles.filter((p) => p.id !== userId);
    setProfiles(filtered);
    localStore.saveProfiles(filtered);
    
    // Remove reports for user
    handleDismissReport(userId);
  };

  // Unread messages count
  const unreadCount = matches.length > 0 ? 1 : 0;

  return (
    <div className="min-w-full min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white habesha-pattern">
      
      {/* Header Bar */}
      <Header
        language={language}
        onToggleLanguage={toggleLanguage}
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'grid') {
            setCurrentTab('discover');
            setDiscoveryViewMode('grid');
          } else if (tab === 'discover') {
            setCurrentTab('discover');
            setDiscoveryViewMode('swipe');
          } else {
            setCurrentTab(tab);
          }
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        unreadCount={unreadCount}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-16 md:pb-8">
        
        {/* Onboarding Flow Full View */}
        {isOnboardingOpen ? (
          <OnboardingFlow
            language={language}
            onComplete={handleOnboardingComplete}
            onCancel={() => setIsOnboardingOpen(false)}
          />
        ) : (
          <>
            {/* Discover & Grid Browse View */}
            {currentTab === 'discover' && (
              <DiscoveryFeed
                language={language}
                profiles={profiles}
                currentUser={currentUser}
                filters={filters}
                onOpenFilterDrawer={() => setIsFilterOpen(true)}
                onLikeProfile={handleLikeProfile}
                onPassProfile={handlePassProfile}
                onReportProfile={(p) => setReportingProfile(p)}
                onStartChat={(m) => {
                  setActiveMatch(m);
                  setCurrentTab('matches');
                }}
                viewMode={discoveryViewMode}
                onToggleViewMode={setDiscoveryViewMode}
              />
            )}

            {/* Matches & Chat View */}
            {currentTab === 'matches' && (
              <ChatView
                language={language}
                currentUser={currentUser || profiles[0]}
                matches={matches}
                activeMatch={activeMatch || matches[0] || null}
                onSelectMatch={setActiveMatch}
                onReportProfile={(p) => setReportingProfile(p)}
              />
            )}

            {/* Profile View */}
            {currentTab === 'profile' && currentUser && (
              <ProfileView
                language={language}
                profile={currentUser}
                onUpdateProfile={(updated) => {
                  setCurrentUser(updated);
                  localStore.setCurrentUser(updated);
                }}
                onLogout={() => {
                  setCurrentUser(null);
                  localStore.setCurrentUser(null);
                  setIsAuthOpen(true);
                }}
              />
            )}

            {/* Safety & Guidelines */}
            {currentTab === 'safety' && (
              <SafetyCenter language={language} />
            )}

            {/* Moderation Admin Dashboard */}
            {currentTab === 'admin' && (
              <AdminDashboard
                language={language}
                pendingVerifications={profiles.filter((p) => p.verification_status === 'pending')}
                reports={reports}
                onApproveVerification={handleApproveVerification}
                onRejectVerification={handleRejectVerification}
                onDismissReport={handleDismissReport}
                onBanUser={handleBanUser}
              />
            )}
          </>
        )}

      </main>

      {/* MODALS */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        language={language}
        onSuccess={handleAuthSuccess}
      />

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        language={language}
        filters={filters}
        onApplyFilters={setFilters}
        onResetFilters={() =>
          setFilters({
            minAge: 18,
            maxAge: 50,
            religion: 'all',
            intent: 'all',
            region: 'all',
            verifiedOnly: false,
          })
        }
      />

      {reportingProfile && (
        <ReportModal
          isOpen={Boolean(reportingProfile)}
          onClose={() => setReportingProfile(null)}
          language={language}
          reportedProfile={reportingProfile}
          onReportSubmitted={handleReportSubmitted}
        />
      )}

    </div>
  );
}
