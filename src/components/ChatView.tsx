import React, { useState, useEffect, useRef } from 'react';
import { Language, Profile, Match, Message } from '../types';
import { getTranslation } from '../lib/translations';
import { localStore } from '../lib/supabase';
import { Send, Image, ShieldAlert, Flag, Lock, ShieldCheck, ArrowLeft, AlertTriangle } from 'lucide-react';

interface ChatViewProps {
  language: Language;
  currentUser: Profile;
  matches: Match[];
  activeMatch: Match | null;
  onSelectMatch: (match: Match) => void;
  onReportProfile: (profile: Profile) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  language,
  currentUser,
  matches,
  activeMatch,
  onSelectMatch,
  onReportProfile,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputContent, setInputContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeMatch) {
      const msgs = localStore.getMessages(activeMatch.id);
      setMessages(msgs);
    }
  }, [activeMatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMatch) return;
    if (!inputContent.trim() && !selectedImage) return;

    const newMsg = localStore.sendMessage(
      activeMatch.id,
      currentUser.id,
      inputContent.trim(),
      selectedImage || undefined
    );

    setMessages((prev) => [...prev, newMsg]);
    setInputContent('');
    setSelectedImage(null);

    // Simulate friendly reply if messaging mock profile
    const partner = activeMatch.user_a.id === currentUser.id ? activeMatch.user_b : activeMatch.user_a;
    setTimeout(() => {
      const replies = [
        'እሺ! Thank you for the thoughtful message.',
        'Ameseginalehu! That sounds wonderful. How are things on your side?',
        'I really appreciate how transparent you are about your family values!',
        'Blessed to connect with you on Habesha Connect!'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const autoMsg = localStore.sendMessage(activeMatch.id, partner.id, randomReply);
      setMessages((prev) => [...prev, autoMsg]);
    }, 2000);
  };

  const partner = activeMatch
    ? activeMatch.user_a.id === currentUser.id
      ? activeMatch.user_b
      : activeMatch.user_a
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 h-[calc(100vh-120px)] flex flex-col md:flex-row gap-4">
      
      {/* MATCHES SIDEBAR */}
      <div
        className={`w-full md:w-80 bg-stone-900 border border-stone-800 rounded-3xl p-4 flex flex-col shadow-xl ${
          activeMatch ? 'hidden md:flex' : 'flex'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-3">
          <h3 className="font-bold text-sm font-amharic text-amber-100 flex items-center space-x-2">
            <span>{getTranslation(language, 'chatTitle')}</span>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              {matches.length}
            </span>
          </h3>
        </div>

        {matches.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-stone-400 space-y-2">
            <ShieldAlert className="w-8 h-8 text-amber-500/50" />
            <p className="text-xs font-amharic">No matches yet. Like profiles in Discover to start chatting!</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-2">
            {matches.map((m) => {
              const p = m.user_a.id === currentUser.id ? m.user_b : m.user_a;
              const isSelected = activeMatch?.id === m.id;

              return (
                <div
                  key={m.id}
                  onClick={() => onSelectMatch(m)}
                  className={`p-3 rounded-2xl cursor-pointer transition flex items-center space-x-3 border ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-600/80 shadow'
                      : 'bg-stone-800/40 hover:bg-stone-800 border-stone-800'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={p.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt={p.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/60"
                      referrerPolicy="no-referrer"
                    />
                    {p.verification_status === 'verified' && (
                      <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-white p-0.5 rounded-full ring-1 ring-stone-900">
                        <ShieldCheck className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-xs font-bold text-stone-100 font-amharic truncate">
                        {p.name}
                      </h4>
                      <span className="text-[9px] text-stone-400 font-mono">
                        {m.last_message_at ? new Date(m.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-400 truncate font-amharic">
                      {m.last_message || 'Start chatting...'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ACTIVE CHAT THREAD */}
      <div
        className={`flex-1 bg-stone-900 border border-stone-800 rounded-3xl flex flex-col shadow-2xl overflow-hidden ${
          !activeMatch ? 'hidden md:flex' : 'flex'
        }`}
      >
        {activeMatch && partner ? (
          <>
            {/* Active Chat Header */}
            <div className="p-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onSelectMatch(null as any)}
                  className="md:hidden p-1.5 text-stone-400 hover:text-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <img
                  src={partner.photos[0]?.url}
                  alt={partner.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/80"
                  referrerPolicy="no-referrer"
                />

                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-bold text-xs sm:text-sm font-amharic text-amber-100">
                      {partner.name}
                    </h3>
                    {partner.verification_status === 'verified' && (
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded font-mono">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-stone-400 font-amharic">
                    {partner.city} • {partner.intent}
                  </p>
                </div>
              </div>

              {/* 2-Tap Report / Block Button */}
              <button
                id="chat-report-btn"
                onClick={() => onReportProfile(partner)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-stone-800 hover:bg-red-950 text-stone-300 hover:text-red-300 border border-stone-700 rounded-xl text-xs font-amharic transition"
                title="Report or Block member"
              >
                <Flag className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">{getTranslation(language, 'reportAndBlock')}</span>
              </button>
            </div>

            {/* Safety & Anti-Screenshot Banners */}
            <div className="bg-amber-950/40 border-b border-amber-900/30 px-4 py-2 space-y-1">
              <div className="flex items-center space-x-2 text-amber-300 text-[11px] font-amharic">
                <Lock className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                <span>{getTranslation(language, 'screenshotWarning')}</span>
              </div>
              <div className="flex items-center space-x-2 text-stone-300 text-[10px] font-amharic">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                <span>{getTranslation(language, 'safetyNotice')}</span>
              </div>
            </div>

            {/* Message Thread List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-950/30">
              {messages.map((msg) => {
                const isMe = msg.sender_id === currentUser.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] sm:max-w-[65%] rounded-2xl p-3 text-xs space-y-1 ${
                        isMe
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md'
                          : 'bg-stone-800 text-stone-100 border border-stone-700'
                      }`}
                    >
                      {msg.image_url && (
                        <img
                          src={msg.image_url}
                          alt="Shared Photo"
                          className="rounded-xl w-full max-h-48 object-cover mb-1 border border-black/20"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <p className="font-amharic leading-relaxed break-words">{msg.content}</p>
                      <span className={`text-[9px] block text-right font-mono ${isMe ? 'text-amber-200/80' : 'text-stone-400'}`}>
                        {new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Selected Image Preview before sending */}
            {selectedImage && (
              <div className="px-4 py-2 bg-stone-800 border-t border-stone-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={selectedImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <span className="text-xs text-stone-300 font-amharic">Photo attached</span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-stone-400 hover:text-white text-xs font-bold"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Message Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-stone-900 border-t border-stone-800 flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setSelectedImage('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800')}
                className="p-2.5 bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-amber-400 rounded-xl transition"
                title="Attach photo"
              >
                <Image className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                placeholder={getTranslation(language, 'typeMessage')}
                className="flex-1 px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs font-amharic outline-none"
              />

              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl shadow transition transform active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400 space-y-3">
            <Lock className="w-12 h-12 text-amber-500/40" />
            <h3 className="text-base font-bold font-amharic text-amber-200">
              Select a Match to Start Chatting
            </h3>
            <p className="text-xs max-w-xs mx-auto font-amharic">
              All chats on Habesha Connect are real-time, protected with safety guidelines and reporting controls.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
