export type Language = 'en' | 'am';

export type Gender = 'female' | 'male';

export type RelationshipIntent = 'marriage' | 'serious' | 'casual';

export type Religion = 
  | 'orthodox'
  | 'islam'
  | 'protestant'
  | 'catholic'
  | 'traditional'
  | 'other'
  | 'prefer_not_to_say';

export type Region = 
  | 'amhara'
  | 'oromo'
  | 'tigray'
  | 'gurage'
  | 'sidama'
  | 'somali'
  | 'afar'
  | 'snnpr'
  | 'diaspora_usa'
  | 'diaspora_europe'
  | 'diaspora_middle_east'
  | 'diaspora_other'
  | 'unspecified';

export interface ProfilePhoto {
  id: string;
  url: string;
  is_verified: boolean;
  order: number;
}

export interface Profile {
  id: string;
  name: string;
  dob: string; // YYYY-MM-DD
  age: number;
  gender: Gender;
  city: string;
  country: string;
  religion: Religion;
  region?: Region; // Optional self-disclosed field
  bio: string;
  intent: RelationshipIntent; // Required intent field
  education?: string;
  profession?: string;
  languages: string[];
  photos: ProfilePhoto[];
  verified_at?: string;
  verification_status: 'verified' | 'pending' | 'unverified';
  selfie_url?: string;
  rate_limit_count: number;
  created_at: string;
  last_active: string;
  phone?: string;
  email?: string;
}

export interface Like {
  id: string;
  liker_id: string;
  liked_id: string;
  created_at: string;
}

export interface Match {
  id: string;
  user_a: Profile;
  user_b: Profile;
  matched_at: string;
  last_message?: string;
  last_message_at?: string;
}

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  image_url?: string;
  sent_at: string;
  read: boolean;
}

export type ReportReason = 
  | 'fake_profile'
  | 'inappropriate_photos'
  | 'underage'
  | 'spam_or_money'
  | 'harassment'
  | 'other';

export interface Report {
  id: string;
  reporter_id: string;
  reported_id: string;
  reason: ReportReason;
  details?: string;
  status: 'pending' | 'reviewed' | 'actioned' | 'dismissed';
  created_at: string;
}

export interface Block {
  id: string;
  blocker_id: string;
  blocked_id: string;
  created_at: string;
}

export interface SearchFilters {
  minAge: number;
  maxAge: number;
  gender?: Gender;
  city?: string;
  religion?: Religion | 'all';
  intent?: RelationshipIntent | 'all';
  region?: Region | 'all';
  verifiedOnly: boolean;
}
