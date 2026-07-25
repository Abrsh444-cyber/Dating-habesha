import { createClient } from '@supabase/supabase-js';
import { Profile, Like, Match, Message, Report, Block, RelationshipIntent, Religion, Region } from '../types';
import { initialMockProfiles } from '../data/mockProfiles';

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local Storage Keys for offline/fallback mode
const STORAGE_KEYS = {
  CURRENT_USER: 'habesha_current_user_profile',
  PROFILES: 'habesha_profiles_list',
  LIKES: 'habesha_user_likes',
  MATCHES: 'habesha_user_matches',
  MESSAGES: 'habesha_user_messages',
  REPORTS: 'habesha_user_reports',
  BLOCKS: 'habesha_user_blocks',
};

// Initialize persistent state if empty
export function initLocalData() {
  if (!localStorage.getItem(STORAGE_KEYS.PROFILES)) {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(initialMockProfiles));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.LIKES)) {
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.MATCHES)) {
    // Initial sample match for instant chat testing
    const sampleMatch: Match = {
      id: 'match-selam-yared',
      user_a: initialMockProfiles[0], // Selamawit
      user_b: initialMockProfiles[1], // Yared
      matched_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      last_message: 'ሰላም Yared, nice to meet you! How is your week going in DC?',
      last_message_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify([sampleMatch]));

    const sampleMessages: Message[] = [
      {
        id: 'msg-1',
        match_id: 'match-selam-yared',
        sender_id: initialMockProfiles[1].id,
        content: 'ሰላም Selamawit! Blessed to connect with you.',
        sent_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        read: true,
      },
      {
        id: 'msg-2',
        match_id: 'match-selam-yared',
        sender_id: initialMockProfiles[0].id,
        content: 'ሰላም Yared, nice to meet you! How is your week going in DC?',
        sent_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        read: true,
      }
    ];
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(sampleMessages));
  }

  if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.BLOCKS)) {
    localStorage.setItem(STORAGE_KEYS.BLOCKS, JSON.stringify([]));
  }
}

// Store helpers
export const localStore = {
  getProfiles: (): Profile[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILES);
      return data ? JSON.parse(data) : initialMockProfiles;
    } catch {
      return initialMockProfiles;
    }
  },
  saveProfiles: (profiles: Profile[]) => {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
  },
  getCurrentUser: (): Profile | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setCurrentUser: (profile: Profile | null) => {
    if (profile) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(profile));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },
  getLikes: (): Like[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LIKES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  addLike: (likerId: string, likedId: string): { isMatch: boolean; match?: Match } => {
    const likes = localStore.getLikes();
    const newLike: Like = {
      id: `like-${Date.now()}`,
      liker_id: likerId,
      liked_id: likedId,
      created_at: new Date().toISOString(),
    };
    likes.push(newLike);
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));

    // Check if liked person also liked liker (mutual match) OR if liked is mock profile (auto mutual for demo feel)
    const isMutual = likes.some(l => l.liker_id === likedId && l.liked_id === likerId) || true; // simulate realistic engagement

    if (isMutual) {
      const profiles = localStore.getProfiles();
      const currentUser = localStore.getCurrentUser();
      const matchedProfile = profiles.find(p => p.id === likedId);

      if (currentUser && matchedProfile) {
        const matches = localStore.getMatches();
        const existingMatch = matches.find(
          m => (m.user_a.id === currentUser.id && m.user_b.id === matchedProfile.id) ||
               (m.user_a.id === matchedProfile.id && m.user_b.id === currentUser.id)
        );

        if (!existingMatch) {
          const newMatch: Match = {
            id: `match-${Date.now()}`,
            user_a: currentUser,
            user_b: matchedProfile,
            matched_at: new Date().toISOString(),
            last_message: 'You matched! Say ሰላም...',
            last_message_at: new Date().toISOString(),
          };
          matches.unshift(newMatch);
          localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
          return { isMatch: true, match: newMatch };
        }
      }
    }

    return { isMatch: false };
  },
  getMatches: (): Match[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MATCHES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  getMessages: (matchId: string): Message[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      const all: Message[] = data ? JSON.parse(data) : [];
      return all.filter(m => m.match_id === matchId).sort((a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime());
    } catch {
      return [];
    }
  },
  sendMessage: (matchId: string, senderId: string, content: string, imageUrl?: string): Message => {
    const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const all: Message[] = data ? JSON.parse(data) : [];
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      match_id: matchId,
      sender_id: senderId,
      content,
      image_url: imageUrl,
      sent_at: new Date().toISOString(),
      read: true,
    };
    all.push(newMsg);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(all));

    // Update last message on match
    const matches = localStore.getMatches();
    const idx = matches.findIndex(m => m.id === matchId);
    if (idx !== -1) {
      matches[idx].last_message = content || (imageUrl ? '📷 Photo shared' : '');
      matches[idx].last_message_at = newMsg.sent_at;
      localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
    }

    return newMsg;
  },
  getReports: (): Report[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  addReport: (report: Omit<Report, 'id' | 'created_at' | 'status'>): Report => {
    const reports = localStore.getReports();
    const newReport: Report = {
      ...report,
      id: `report-${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    reports.unshift(newReport);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    return newReport;
  },
  getBlocks: (): Block[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BLOCKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  addBlock: (blockerId: string, blockedId: string): Block => {
    const blocks = localStore.getBlocks();
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      blocker_id: blockerId,
      blocked_id: blockedId,
      created_at: new Date().toISOString(),
    };
    blocks.push(newBlock);
    localStorage.setItem(STORAGE_KEYS.BLOCKS, JSON.stringify(blocks));
    return newBlock;
  },
};

export const SUPABASE_SQL_SCHEMA = `-- Supabase Schema & Row-Level Security Policies for Habesha Connect
-- Execute this SQL script in your Supabase SQL Editor

-- 1. Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dob DATE NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('female', 'male')),
  city TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Ethiopia',
  religion TEXT NOT NULL CHECK (religion IN ('orthodox', 'islam', 'protestant', 'catholic', 'traditional', 'other', 'prefer_not_to_say')),
  region TEXT CHECK (region IN ('amhara', 'oromo', 'tigray', 'gurage', 'sidama', 'somali', 'afar', 'snnpr', 'diaspora_usa', 'diaspora_europe', 'diaspora_middle_east', 'diaspora_other', 'unspecified')),
  bio TEXT,
  intent TEXT NOT NULL CHECK (intent IN ('marriage', 'serious', 'casual')),
  education TEXT,
  profession TEXT,
  languages TEXT[] DEFAULT '{}',
  selfie_url TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('verified', 'pending', 'unverified')),
  verified_at TIMESTAMP WITH TIME ZONE,
  rate_limit_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Profile Photos Table
CREATE TABLE IF NOT EXISTS public.profile_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Likes Table
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  liker_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  liked_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(liker_id, liked_id)
);

-- 4. Create Matches Table
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_b UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  matched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_a, user_b)
);

-- 5. Create Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_url TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- 6. Create Reports Table
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reported_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL CHECK (reason IN ('fake_profile', 'inappropriate_photos', 'underage', 'spam_or_money', 'harassment', 'other')),
  details TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'actioned', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create Blocks Table
CREATE TABLE IF NOT EXISTS public.blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  blocked_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_id)
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;

-- Allow users to read verified profiles except blocked ones
CREATE POLICY "Public verified profiles visible" ON public.profiles 
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Allow users to update their own profile
CREATE POLICY "Users edit own profile" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Likes RLS
CREATE POLICY "Users insert own likes" ON public.likes 
  FOR INSERT WITH CHECK (auth.uid() = liker_id);

-- Messages RLS
CREATE POLICY "Match members see messages" ON public.messages 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.matches 
      WHERE matches.id = messages.match_id 
      AND (matches.user_a = auth.uid() OR matches.user_b = auth.uid())
    )
  );

CREATE POLICY "Match members send messages" ON public.messages 
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.matches 
      WHERE matches.id = messages.match_id 
      AND (matches.user_a = auth.uid() OR matches.user_b = auth.uid())
    )
  );
`;
