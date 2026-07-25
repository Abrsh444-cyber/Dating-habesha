import React, { useState } from 'react';
import { Language, Profile, Religion, Region, RelationshipIntent } from '../types';
import { getTranslation } from '../lib/translations';
import { SUPABASE_SQL_SCHEMA, isSupabaseConfigured } from '../lib/supabase';
import { ShieldCheck, MapPin, Briefcase, GraduationCap, Edit3, Camera, Database, Copy, Check, LogOut, User } from 'lucide-react';

interface ProfileViewProps {
  language: Language;
  profile: Profile;
  onUpdateProfile: (updated: Profile) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  language,
  profile,
  onUpdateProfile,
  onLogout,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(profile.bio);
  const [intent, setIntent] = useState<RelationshipIntent>(profile.intent);
  const [profession, setProfession] = useState(profile.profession || '');
  const [education, setEducation] = useState(profile.education || '');
  const [city, setCity] = useState(profile.city);
  const [religion, setReligion] = useState<Religion>(profile.religion);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      bio,
      intent,
      profession,
      education,
      city,
      religion,
    });
    setIsEditing(false);
  };

  const copySqlSchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-stone-100">
      
      {/* Profile Header Card */}
      <div className="bg-stone-900 border border-amber-900/40 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          
          <div className="relative">
            <img
              src={profile.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'}
              alt={profile.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-amber-500/80 shadow-xl"
              referrerPolicy="no-referrer"
            />
            {profile.verification_status === 'verified' && (
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full ring-2 ring-stone-900 shadow" title="Selfie Verified">
                <ShieldCheck className="w-4 h-4" />
              </span>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-black font-amharic text-amber-100">
                  {profile.name}, <span className="font-mono">{profile.age}</span>
                </h2>
                <p className="text-xs text-stone-400 font-amharic flex items-center justify-center sm:justify-start space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{profile.city}, {profile.country}</span>
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3.5 py-2 bg-stone-800 hover:bg-stone-750 text-amber-300 border border-stone-700 rounded-xl text-xs font-bold font-amharic transition flex items-center space-x-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
                </button>

                <button
                  onClick={onLogout}
                  className="p-2 bg-stone-800 hover:bg-red-950 text-stone-400 hover:text-red-300 border border-stone-700 rounded-xl transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold font-amharic">
                {profile.intent === 'marriage' && getTranslation(language, 'intentMarriage')}
                {profile.intent === 'serious' && getTranslation(language, 'intentSerious')}
                {profile.intent === 'casual' && getTranslation(language, 'intentCasual')}
              </span>

              <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-bold font-amharic flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Member ✓</span>
              </span>

              {profile.region && (
                <span className="bg-stone-800 text-stone-300 px-3 py-1 rounded-full text-xs font-amharic border border-stone-700">
                  Region: {profile.region}
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Editing Form vs Display View */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-stone-800">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                {getTranslation(language, 'bioLabel')}
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs font-amharic outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                  {getTranslation(language, 'relationshipIntent')}
                </label>
                <select
                  value={intent}
                  onChange={(e) => setIntent(e.target.value as RelationshipIntent)}
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs font-amharic outline-none"
                >
                  <option value="marriage">{getTranslation(language, 'intentMarriage')}</option>
                  <option value="serious">{getTranslation(language, 'intentSerious')}</option>
                  <option value="casual">{getTranslation(language, 'intentCasual')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                  {getTranslation(language, 'religionLabel')}
                </label>
                <select
                  value={religion}
                  onChange={(e) => setReligion(e.target.value as Religion)}
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs font-amharic outline-none"
                >
                  <option value="orthodox">{getTranslation(language, 'religionOrthodox')}</option>
                  <option value="islam">{getTranslation(language, 'religionIslam')}</option>
                  <option value="protestant">{getTranslation(language, 'religionProtestant')}</option>
                  <option value="catholic">{getTranslation(language, 'religionCatholic')}</option>
                  <option value="other">{getTranslation(language, 'religionOther')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                  {getTranslation(language, 'profession')}
                </label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                  {getTranslation(language, 'city')}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-xs rounded-xl shadow-lg transition font-amharic"
            >
              Save Profile Changes
            </button>
          </form>
        ) : (
          <div className="space-y-4 pt-4 border-t border-stone-800">
            <div className="p-4 bg-stone-800/40 rounded-2xl border border-stone-800 space-y-1">
              <h4 className="text-xs font-bold text-amber-300 font-amharic uppercase tracking-wider">Bio</h4>
              <p className="text-xs text-stone-200 leading-relaxed font-amharic">"{profile.bio}"</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-amharic">
              <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800">
                <span className="text-[10px] text-stone-400 block">Faith:</span>
                <span className="font-bold text-stone-200">{profile.religion}</span>
              </div>
              <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800">
                <span className="text-[10px] text-stone-400 block">Profession:</span>
                <span className="font-bold text-stone-200">{profile.profession || 'N/A'}</span>
              </div>
              <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-stone-400 block">Education:</span>
                <span className="font-bold text-stone-200">{profile.education || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Supabase Integration & Database Schema Export Box */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold font-amharic text-amber-100">
              Supabase Backend Status & SQL Blueprint
            </h3>
          </div>

          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${
            isSupabaseConfigured
              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
              : 'bg-amber-950 text-amber-300 border-amber-500/40'
          }`}>
            {isSupabaseConfigured ? 'Supabase Connected' : 'Running Persistent Local Mode'}
          </span>
        </div>

        <p className="text-xs text-stone-300 font-amharic">
          You can run this application with our native persistent store OR link directly to a Supabase project by adding <code className="text-amber-400 font-mono">VITE_SUPABASE_URL</code> and <code className="text-amber-400 font-mono">VITE_SUPABASE_ANON_KEY</code> to your secrets.
        </p>

        <div className="relative">
          <pre className="bg-stone-950 p-4 rounded-2xl text-[10px] font-mono text-emerald-400 overflow-x-auto max-h-48 border border-stone-800">
            {SUPABASE_SQL_SCHEMA}
          </pre>
          <button
            onClick={copySqlSchema}
            className="absolute top-3 right-3 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-xl text-xs font-bold font-mono border border-stone-700 flex items-center space-x-1.5 transition"
          >
            {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedSchema ? 'Copied!' : 'Copy SQL'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
