import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../lib/translations';
import { ShieldCheck, Lock, AlertTriangle, UserCheck, Heart, FileText, CheckCircle2 } from 'lucide-react';

interface SafetyCenterProps {
  language: Language;
}

export const SafetyCenter: React.FC<SafetyCenterProps> = ({ language }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-stone-100">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/80 to-stone-900 border border-amber-800/40 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-amharic text-amber-100 mb-2">
          {getTranslation(language, 'guidelinesTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 font-amharic max-w-xl mx-auto leading-relaxed">
          Habesha Connect is dedicated to creating a safe, respectful, and culturally grounded space for Ethiopian singles in Ethiopia and across the diaspora.
        </p>
      </div>

      {/* Safety Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Rule 1 */}
        <div className="bg-stone-900 border border-stone-800 hover:border-amber-800/60 rounded-3xl p-6 shadow-xl space-y-3 transition">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold font-amharic text-amber-200">
            {getTranslation(language, 'rule1Title')}
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed font-amharic">
            {getTranslation(language, 'rule1Body')}
          </p>
        </div>

        {/* Rule 2 */}
        <div className="bg-stone-900 border border-stone-800 hover:border-amber-800/60 rounded-3xl p-6 shadow-xl space-y-3 transition">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold font-amharic text-emerald-200">
            {getTranslation(language, 'rule2Title')}
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed font-amharic">
            {getTranslation(language, 'rule2Body')}
          </p>
        </div>

        {/* Rule 3 */}
        <div className="bg-stone-900 border border-stone-800 hover:border-amber-800/60 rounded-3xl p-6 shadow-xl space-y-3 transition">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold font-amharic text-blue-200">
            {getTranslation(language, 'rule3Title')}
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed font-amharic">
            {getTranslation(language, 'rule3Body')}
          </p>
        </div>

        {/* Rule 4 */}
        <div className="bg-stone-900 border border-stone-800 hover:border-amber-800/60 rounded-3xl p-6 shadow-xl space-y-3 transition">
          <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold font-amharic text-red-200">
            {getTranslation(language, 'rule4Title')}
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed font-amharic">
            {getTranslation(language, 'rule4Body')}
          </p>
        </div>

      </div>

      {/* Discretion & Privacy Commitment */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <Lock className="w-6 h-6 text-amber-400" />
          <h3 className="text-base font-bold font-amharic text-amber-100">
            Discretion, Disclosed Regional Fields & Privacy
          </h3>
        </div>
        <div className="space-y-2 text-xs text-stone-300 leading-relaxed font-amharic">
          <p>
            • <strong className="text-stone-100">Regional Identity:</strong> Ethnicity and regional background fields are strictly self-disclosed and completely optional. They exist solely to help members connect over shared cultural roots and regional traditions. They are never used to exclude or restrict profiles.
          </p>
          <p>
            • <strong className="text-stone-100">Anti-Harassment Controls:</strong> Report and Block buttons are accessible within two taps from any screen, card, or chat message thread.
          </p>
          <p>
            • <strong className="text-stone-100">Rate Limiting:</strong> Messaging velocity on new accounts is automatically rate-limited to prevent automated spam and bot behavior.
          </p>
        </div>
      </div>

    </div>
  );
};
