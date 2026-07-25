import React, { useState } from 'react';
import { Language, Profile, Gender, Religion, Region, RelationshipIntent } from '../types';
import { getTranslation } from '../lib/translations';
import { ShieldCheck, Camera, Check, ArrowRight, ArrowLeft, Heart, Info, AlertTriangle, Upload, User, Lock } from 'lucide-react';

interface OnboardingFlowProps {
  language: Language;
  onComplete: (profile: Profile) => void;
  onCancel: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  language,
  onComplete,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Form State
  const [name, setName] = useState('Eden Haile');
  const [dob, setDob] = useState('1999-04-12');
  const [gender, setGender] = useState<Gender>('female');
  const [city, setCity] = useState('Addis Ababa (Bole)');
  const [country, setCountry] = useState('Ethiopia');
  
  const [intent, setIntent] = useState<RelationshipIntent>('marriage');
  const [profession, setProfession] = useState('Software Designer');
  const [education, setEducation] = useState('B.Sc. Information Systems');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['Amharic', 'English']);
  
  const [religion, setReligion] = useState<Religion>('orthodox');
  const [region, setRegion] = useState<Region | 'unspecified'>('amhara');
  
  const [bio, setBio] = useState('Grounded in family values and orthodox faith. I enjoy Sunday coffee ceremonies, interior design, and volunteering. Looking for a respectful, marriage-minded partner.');
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
  ]);
  const [selfiePhoto, setSelfiePhoto] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
  );
  
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Age calculation helper
  const calculateAge = (birthDateString: string): number => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const nextStep = () => {
    setError('');
    
    if (currentStep === 1) {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      const age = calculateAge(dob);
      if (age < 18) {
        setError(getTranslation(language, 'ageVerificationError'));
        return;
      }
    }

    if (currentStep === 2) {
      if (!intent) {
        setError('Relationship intent is required.');
        return;
      }
    }

    if (currentStep === 4) {
      if (photos.length < 2) {
        setError('Please upload at least 2 photos.');
        return;
      }
    }

    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAddPhotoUrl = () => {
    const newSample = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800';
    if (photos.length < 6) {
      setPhotos([...photos, newSample]);
    }
  };

  const handleFinishOnboarding = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const age = calculateAge(dob);
      const newProfile: Profile = {
        id: `usr-${Date.now()}`,
        name,
        dob,
        age,
        gender,
        city,
        country,
        religion,
        region: region === 'unspecified' ? undefined : region,
        bio,
        intent,
        education,
        profession,
        languages: selectedLanguages,
        photos: photos.map((url, idx) => ({
          id: `ph-${idx}`,
          url,
          is_verified: true,
          order: idx + 1,
        })),
        selfie_url: selfiePhoto,
        verification_status: 'verified',
        verified_at: new Date().toISOString(),
        rate_limit_count: 0,
        created_at: new Date().toISOString(),
        last_active: 'Just now',
      };
      setIsVerifying(false);
      onComplete(newProfile);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      
      {/* Progress Bar Header */}
      <div className="bg-stone-900 border border-amber-900/40 rounded-3xl p-6 mb-6 shadow-xl text-stone-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              {currentStep}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-amharic">
                Step {currentStep} of 5
              </span>
              <h2 className="text-base font-bold font-amharic">
                {currentStep === 1 && getTranslation(language, 'stepBasic')}
                {currentStep === 2 && getTranslation(language, 'stepIntent')}
                {currentStep === 3 && getTranslation(language, 'stepFaith')}
                {currentStep === 4 && getTranslation(language, 'stepBioPhotos')}
                {currentStep === 5 && getTranslation(language, 'stepVerification')}
              </h2>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="text-xs text-stone-400 hover:text-stone-200 underline font-amharic"
          >
            Cancel
          </button>
        </div>

        {/* Stepper bar */}
        <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden flex">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-600 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Step Content */}
      <div className="bg-stone-900 border border-amber-900/30 rounded-3xl p-6 shadow-2xl text-stone-100 space-y-6">
        
        {error && (
          <div className="p-3 bg-red-950/80 border border-red-700/60 rounded-2xl flex items-center space-x-2 text-red-200 text-xs font-amharic">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                {getTranslation(language, 'fullName')} *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Eden Haile"
                className="w-full px-4 py-3 bg-stone-800 border border-stone-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl text-stone-100 text-xs outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                  {getTranslation(language, 'dateOfBirth')} * (Mandatory 18+)
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs outline-none"
                />
                <p className="text-[10px] text-amber-400/80 mt-1 font-amharic">
                  Age: {calculateAge(dob)} years old
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                  {getTranslation(language, 'gender')} *
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  className="w-full px-4 py-3 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs outline-none"
                >
                  <option value="female">{getTranslation(language, 'female')}</option>
                  <option value="male">{getTranslation(language, 'male')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                  {getTranslation(language, 'city')} *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Addis Ababa / Washington DC"
                  className="w-full px-4 py-3 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                  {getTranslation(language, 'country')} *
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Ethiopia / USA / UK"
                  className="w-full px-4 py-3 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Relationship Intent & Career */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                {getTranslation(language, 'relationshipIntent')}
              </label>
              <p className="text-[11px] text-stone-400 mb-3 font-amharic">
                {getTranslation(language, 'intentDesc')}
              </p>

              <div className="space-y-2.5">
                <label
                  onClick={() => setIntent('marriage')}
                  className={`flex items-start space-x-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                    intent === 'marriage'
                      ? 'bg-amber-950/60 border-amber-500 text-amber-100 shadow'
                      : 'bg-stone-800/60 border-stone-700 text-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="intent"
                    checked={intent === 'marriage'}
                    onChange={() => setIntent('marriage')}
                    className="mt-1 text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold block font-amharic">
                      {getTranslation(language, 'intentMarriage')}
                    </span>
                    <span className="text-[10px] text-stone-400 font-amharic">
                      Looking for a serious partner to build a life, home, and family with.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setIntent('serious')}
                  className={`flex items-start space-x-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                    intent === 'serious'
                      ? 'bg-amber-950/60 border-amber-500 text-amber-100 shadow'
                      : 'bg-stone-800/60 border-stone-700 text-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="intent"
                    checked={intent === 'serious'}
                    onChange={() => setIntent('serious')}
                    className="mt-1 text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold block font-amharic">
                      {getTranslation(language, 'intentSerious')}
                    </span>
                    <span className="text-[10px] text-stone-400 font-amharic">
                      Open to long-term courtship leading to marriage.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setIntent('casual')}
                  className={`flex items-start space-x-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                    intent === 'casual'
                      ? 'bg-amber-950/60 border-amber-500 text-amber-100 shadow'
                      : 'bg-stone-800/60 border-stone-700 text-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="intent"
                    checked={intent === 'casual'}
                    onChange={() => setIntent('casual')}
                    className="mt-1 text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold block font-amharic">
                      {getTranslation(language, 'intentCasual')}
                    </span>
                    <span className="text-[10px] text-stone-400 font-amharic">
                      Friendly dating, getting to know each other without pressure.
                    </span>
                  </div>
                </label>
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
                  placeholder="e.g. Software Designer"
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                  {getTranslation(language, 'education')}
                </label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="e.g. B.Sc / M.Sc"
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Faith & Cultural Identity */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                {getTranslation(language, 'religionLabel')} *
              </label>
              <select
                value={religion}
                onChange={(e) => setReligion(e.target.value as Religion)}
                className="w-full px-4 py-3 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs font-amharic outline-none"
              >
                <option value="orthodox">{getTranslation(language, 'religionOrthodox')}</option>
                <option value="islam">{getTranslation(language, 'religionIslam')}</option>
                <option value="protestant">{getTranslation(language, 'religionProtestant')}</option>
                <option value="catholic">{getTranslation(language, 'religionCatholic')}</option>
                <option value="traditional">{getTranslation(language, 'religionTraditional')}</option>
                <option value="other">{getTranslation(language, 'religionOther')}</option>
                <option value="prefer_not_to_say">{getTranslation(language, 'religionPreferNot')}</option>
              </select>
            </div>

            <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold">
                <Info className="w-4 h-4 shrink-0 text-amber-400" />
                <span className="font-amharic">{getTranslation(language, 'regionLabel')}</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  {getTranslation(language, 'optionalTag')}
                </span>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed font-amharic">
                {getTranslation(language, 'regionDisclaimer')}
              </p>

              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as Region | 'unspecified')}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs font-amharic outline-none mt-2"
              >
                <option value="unspecified">{getTranslation(language, 'regionUnspecified')}</option>
                <option value="amhara">{getTranslation(language, 'regionAmhara')}</option>
                <option value="oromo">{getTranslation(language, 'regionOromo')}</option>
                <option value="tigray">{getTranslation(language, 'regionTigray')}</option>
                <option value="gurage">{getTranslation(language, 'regionGurage')}</option>
                <option value="sidama">{getTranslation(language, 'regionSidama')}</option>
                <option value="somali">{getTranslation(language, 'regionSomali')}</option>
                <option value="afar">{getTranslation(language, 'regionAfar')}</option>
                <option value="snnpr">{getTranslation(language, 'regionSNNPR')}</option>
                <option value="diaspora_usa">{getTranslation(language, 'regionDiasporaUSA')}</option>
                <option value="diaspora_europe">{getTranslation(language, 'regionDiasporaEurope')}</option>
                <option value="diaspora_middle_east">{getTranslation(language, 'regionDiasporaMiddleEast')}</option>
                <option value="diaspora_other">{getTranslation(language, 'regionDiasporaOther')}</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 4: Bio & Photos */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                {getTranslation(language, 'bioLabel')}
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder={getTranslation(language, 'bioPlaceholder')}
                className="w-full p-3 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs font-amharic outline-none resize-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-300 font-amharic">
                  {getTranslation(language, 'photosLabel')}
                </label>
                <span className="text-[10px] text-amber-400 font-mono">
                  {photos.length} / 6 uploaded
                </span>
              </div>
              <p className="text-[11px] text-stone-400 mb-3 font-amharic">
                {getTranslation(language, 'photosNotice')}
              </p>

              <div className="grid grid-cols-3 gap-3">
                {photos.map((url, idx) => (
                  <div key={idx} className="relative aspect-3/4 rounded-xl overflow-hidden border border-amber-800/40 group">
                    <img
                      src={url}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-stone-900/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                      #{idx + 1}
                    </span>
                    {photos.length > 2 && (
                      <button
                        onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                        className="absolute top-1.5 right-1.5 bg-red-600/90 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                {photos.length < 6 && (
                  <button
                    onClick={handleAddPhotoUrl}
                    className="aspect-3/4 border-2 border-dashed border-amber-800/60 hover:border-amber-500 bg-stone-800/40 hover:bg-stone-800 rounded-xl flex flex-col items-center justify-center p-2 text-amber-400 transition"
                  >
                    <Upload className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-amharic text-stone-300">Add Photo</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Selfie Photo Verification */}
        {currentStep === 5 && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold font-amharic text-amber-200">
              {getTranslation(language, 'selfieVerificationTitle')}
            </h3>
            <p className="text-xs text-stone-300 font-amharic leading-relaxed max-w-md mx-auto">
              {getTranslation(language, 'selfieVerificationDesc')}
            </p>

            <div className="relative w-40 h-40 mx-auto rounded-3xl overflow-hidden border-2 border-emerald-500 shadow-xl">
              <img
                src={selfiePhoto}
                alt="Selfie Verification"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end justify-center p-2">
                <span className="text-[10px] text-emerald-300 font-bold flex items-center space-x-1 font-amharic">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Facial Match 99.4%</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelfiePhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800')}
              className="inline-flex items-center space-x-2 px-3 py-1.5 bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-amharic rounded-xl border border-stone-700 transition"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>Retake Verification Selfie</span>
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-800">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold rounded-xl transition font-amharic"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              className="flex items-center space-x-1.5 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-lg transition transform active:scale-95 font-amharic"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishOnboarding}
              disabled={isVerifying}
              className="flex items-center space-x-1.5 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl shadow-xl transition transform active:scale-95 font-amharic disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isVerifying ? 'Verifying Profile...' : 'Complete & Unlock Profile'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
