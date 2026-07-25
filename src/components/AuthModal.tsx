import React, { useState } from 'react';
import { Language, Profile } from '../types';
import { getTranslation } from '../lib/translations';
import { X, Phone, Mail, ShieldAlert, Heart, Check, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSuccess: (profile: Profile | null, isNewAccount: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('+251 91 123 4567');
  const [password, setPassword] = useState('••••••••');
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otpCode, setOtpCode] = useState('789012');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'signup' && !isAgeConfirmed) {
      setErrorMsg(getTranslation(language, 'ageVerificationError'));
      return;
    }

    if (!identifier) {
      setErrorMsg('Please enter a valid phone number or email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'signup') {
        setStep('otp');
      } else {
        // Log in demo user
        onSuccess(null, false); // Triggers loading existing or sample user
        onClose();
      }
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 6) {
      setErrorMsg('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Proceed to new profile onboarding flow
      onSuccess(null, true);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-stone-900 border border-amber-800/40 rounded-3xl shadow-2xl overflow-hidden text-stone-100">
        
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-amber-700 via-stone-900 to-amber-900 px-6 py-6 border-b border-amber-800/30">
          <button
            id="close-auth-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white bg-stone-800/60 hover:bg-stone-800 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-md">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <h2 className="text-xl font-bold font-amharic text-amber-100">
              {getTranslation(language, 'appName')}
            </h2>
          </div>
          <p className="text-xs text-amber-200/80 font-amharic">
            {getTranslation(language, 'authSubtitle')}
          </p>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-5">
          
          {step === 'form' ? (
            <>
              {/* Tab Switcher: Signup vs Login */}
              <div className="flex p-1 bg-stone-800 rounded-2xl border border-stone-700/60">
                <button
                  type="button"
                  id="tab-signup"
                  onClick={() => { setMode('signup'); setErrorMsg(''); }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl font-amharic transition ${
                    mode === 'signup'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {getTranslation(language, 'signup')}
                </button>
                <button
                  type="button"
                  id="tab-login"
                  onClick={() => { setMode('login'); setErrorMsg(''); }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl font-amharic transition ${
                    mode === 'login'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {getTranslation(language, 'login')}
                </button>
              </div>

              {/* Error Message Alert */}
              {errorMsg && (
                <div className="p-3 bg-red-950/80 border border-red-700/60 rounded-xl flex items-start space-x-2 text-red-200 text-xs">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="font-amharic">{errorMsg}</span>
                </div>
              )}

              {/* Google OAuth Button */}
              <button
                type="button"
                id="google-oauth-btn"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    onSuccess(null, mode === 'signup');
                    onClose();
                  }, 800);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 py-2.5 rounded-2xl text-xs font-semibold shadow-sm transition active:scale-98"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="font-amharic">{getTranslation(language, 'googleSignIn')}</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-stone-800"></div>
                <span className="absolute bg-stone-900 px-3 text-[10px] text-stone-500 uppercase tracking-widest font-mono">
                  OR
                </span>
              </div>

              {/* Phone or Email Switcher */}
              <form onSubmit={handleSubmitForm} className="space-y-4">
                <div className="flex space-x-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setAuthMethod('phone')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition ${
                      authMethod === 'phone'
                        ? 'bg-amber-900/30 border-amber-600/80 text-amber-200'
                        : 'bg-stone-800/40 border-stone-800 text-stone-400'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Phone</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMethod('email')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition ${
                      authMethod === 'email'
                        ? 'bg-amber-900/30 border-amber-600/80 text-amber-200'
                        : 'bg-stone-800/40 border-stone-800 text-stone-400'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1 font-amharic">
                    {getTranslation(language, 'phoneOrEmail')}
                  </label>
                  <input
                    type={authMethod === 'email' ? 'email' : 'text'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={authMethod === 'phone' ? '+251 91 123 4567 or +1 202 555 0199' : 'you@example.com'}
                    required
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl text-stone-100 text-xs font-mono placeholder-stone-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1 font-amharic">
                    {getTranslation(language, 'password')}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl text-stone-100 text-xs outline-none transition"
                  />
                </div>

                {/* Mandatory Age Verification Checkbox (for Signup) */}
                {mode === 'signup' && (
                  <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-2xl space-y-2">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAgeConfirmed}
                        onChange={(e) => setIsAgeConfirmed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 bg-stone-800 border-stone-600"
                      />
                      <span className="text-xs font-bold text-amber-200 leading-tight font-amharic">
                        {getTranslation(language, 'ageVerificationLabel')}
                      </span>
                    </label>
                    <p className="text-[11px] text-stone-400 leading-relaxed font-amharic pl-7">
                      {getTranslation(language, 'termsAgreement')}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3 rounded-2xl text-xs shadow-lg shadow-amber-950/50 flex items-center justify-center space-x-2 transition transform active:scale-98 font-amharic disabled:opacity-50"
                >
                  {loading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <span>{mode === 'signup' ? getTranslation(language, 'getStarted') : getTranslation(language, 'login')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* OTP Verification Step */
            <form onSubmit={handleVerifyOtp} className="space-y-4 py-2">
              <div className="text-center space-y-1">
                <h3 className="text-base font-bold font-amharic text-amber-200">
                  {getTranslation(language, 'confirmOtp')}
                </h3>
                <p className="text-xs text-stone-400 font-amharic">
                  {getTranslation(language, 'otpSentTo')} <span className="font-mono text-amber-300 font-bold">{identifier}</span>
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-950/80 border border-red-700/60 rounded-xl text-red-200 text-xs text-center font-amharic">
                  {errorMsg}
                </div>
              )}

              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full tracking-[1em] text-center px-4 py-3 bg-stone-800 border border-amber-600/80 focus:ring-2 focus:ring-amber-500 rounded-2xl text-stone-100 text-lg font-bold font-mono outline-none"
                />
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-2xl flex items-center space-x-2 text-emerald-300 text-xs">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-amharic text-[11px]">
                  Verification code generated. Click below to confirm and start profile creation.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold py-3 rounded-2xl text-xs shadow-lg flex items-center justify-center space-x-2 transition font-amharic"
              >
                {loading ? 'Verifying...' : getTranslation(language, 'verifyCode')}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
