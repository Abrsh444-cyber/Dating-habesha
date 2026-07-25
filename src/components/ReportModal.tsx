import React, { useState } from 'react';
import { Language, Profile, ReportReason } from '../types';
import { getTranslation } from '../lib/translations';
import { X, ShieldAlert, CheckCircle2, UserX } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  reportedProfile: Profile;
  onReportSubmitted: (reason: ReportReason, details: string, blockUser: boolean) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  language,
  reportedProfile,
  onReportSubmitted,
}) => {
  const [reason, setReason] = useState<ReportReason>('fake_profile');
  const [details, setDetails] = useState('');
  const [blockUser, setBlockUser] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onReportSubmitted(reason, details, blockUser);
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-stone-900 border border-red-900/40 rounded-3xl shadow-2xl overflow-hidden text-stone-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 via-stone-900 to-red-900 px-6 py-5 border-b border-red-900/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h3 className="text-base font-bold font-amharic text-red-200">
              {getTranslation(language, 'reportTitle')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white bg-stone-800 rounded-full transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold font-amharic text-emerald-200">
                Safety Report Received
              </h4>
              <p className="text-xs text-stone-300 font-amharic max-w-xs mx-auto">
                {getTranslation(language, 'reportSubmitted')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="p-3 bg-stone-800/60 border border-stone-700/60 rounded-2xl flex items-center space-x-3">
                <img
                  src={reportedProfile.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={reportedProfile.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-red-500/50"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-200 font-amharic">
                    Reporting {reportedProfile.name}
                  </h4>
                  <p className="text-[10px] text-stone-400 font-amharic">
                    {reportedProfile.city} • {reportedProfile.age} yrs
                  </p>
                </div>
              </div>

              {/* Reason Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-2 font-amharic">
                  {getTranslation(language, 'reportReasonLabel')}
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'fake_profile', label: getTranslation(language, 'reasonFake') },
                    { id: 'inappropriate_photos', label: getTranslation(language, 'reasonInappropriate') },
                    { id: 'underage', label: getTranslation(language, 'reasonUnderage') },
                    { id: 'spam_or_money', label: getTranslation(language, 'reasonSpam') },
                    { id: 'harassment', label: getTranslation(language, 'reasonHarassment') },
                    { id: 'other', label: getTranslation(language, 'reasonOther') },
                  ].map((item) => (
                    <label
                      key={item.id}
                      onClick={() => setReason(item.id as ReportReason)}
                      className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer text-xs transition font-amharic ${
                        reason === item.id
                          ? 'bg-red-950/60 border-red-600 text-red-200 font-bold'
                          : 'bg-stone-800/40 border-stone-750 text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reportReason"
                        checked={reason === item.id}
                        onChange={() => setReason(item.id as ReportReason)}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Optional details */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1 font-amharic">
                  {getTranslation(language, 'reportDetailsLabel')}
                </label>
                <textarea
                  rows={2}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide any context to help our moderation team..."
                  className="w-full p-2.5 bg-stone-800 border border-stone-700 focus:border-red-500 rounded-xl text-stone-100 text-xs font-amharic outline-none resize-none"
                />
              </div>

              {/* Block Checkbox */}
              <div className="p-3 bg-red-950/30 border border-red-800/40 rounded-xl">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={blockUser}
                    onChange={(e) => setBlockUser(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-stone-800 border-stone-600"
                  />
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-red-200 font-amharic">
                    <UserX className="w-3.5 h-3.5 text-red-400" />
                    <span>{getTranslation(language, 'blockUserCheckbox')}</span>
                  </div>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-750 text-stone-300 font-bold text-xs rounded-xl transition font-amharic"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs rounded-xl shadow-lg transition font-amharic"
                >
                  {getTranslation(language, 'submitReport')}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
