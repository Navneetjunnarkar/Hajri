
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { X, Send, Sparkles, Mic, Bot, ExternalLink, Loader2, Sparkle } from 'lucide-react';
import { Language, UserProfile, UserStats, Episode } from '../types';
import { speak, createRecognition } from '../services/speechService';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  profile: UserProfile | null;
  stats: UserStats;
  currentEpisode?: Episode;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, lang, profile, stats, currentEpisode }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, citations?: any[] }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const roleSuggestions = useMemo(() => {
    if (!profile) return ['What is Interest?', 'How to Save?', 'Debt Safety'];
    
    switch (profile.occupation) {
      case 'farmer':
        return [
          'PM-Kisan Benefits?',
          'Kisan Credit Card help',
          'Crop Insurance details',
          'SHG Loan process'
        ];
      case 'student':
        return [
          'Education Loan Repayment',
          'Scholarships for me',
          'Budgeting for Hostel',
          'Safe Investing for Students'
        ];
      case 'worker':
      default:
        return [
          'Emergency Fund Tips',
          'Micro-finance business',
          'Saving for children',
          'Gold loan vs Personal loan'
        ];
    }
  }, [profile]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const systemInstruction = `
        You are "Guru", a wise, supportive, and highly knowledgeable financial mentor in the HAJRI game.
        Your goal is to help users like ${profile?.name || 'the user'} (Occupation: ${profile?.occupation || 'unknown'}) achieve financial freedom.
        
        Current User Context:
        - Role: ${profile?.occupation || 'general citizen'}
        - Language Preference: ${lang === Language.HINDI ? 'Hindi' : 'English'}
        - Current Game Situation: ${currentEpisode?.title[Language.ENGLISH] || 'Learning basics'}
        - Financial Resilience: ${stats.resilienceScore}/100
        
        Voice Tone:
        - Professional yet warm. Use simple analogies (e.g., comparing interest to a growing seed).
        - If the user is a Farmer, mention government Kisan schemes.
        - If the user is a Student, mention Education loans and compounding.
        - If the user is a Worker/Woman, focus on safety nets and micro-savings.
        
        Constraints:
        1. Maximum 3 sentences per response.
        2. Always encourage the user's progress.
        3. Respond in ${lang === Language.HINDI ? 'Hindi (simple, rural-friendly)' : 'English'}.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
        },
      });

      const aiText = response.text || "I am thinking. Please wait a moment.";
      const citations = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiText,
        citations: citations.length > 0 ? citations : undefined
      }]);
      
      speak(aiText, lang);

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Guru is momentarily resting. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoice = () => {
    const recognition = createRecognition(lang, (transcript) => {
      handleSend(transcript);
    });
    if (recognition) recognition.start();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex flex-col justify-end">
      <div className="bg-white rounded-t-[3rem] h-[90%] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-500 border-t-8 border-slate-900">
        {/* Header */}
        <div className="p-7 border-b-2 border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-[2.5rem]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-orange-400 shadow-xl">
              <Bot size={32} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-2xl leading-none">Guru AI</h3>
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mt-1 flex items-center gap-1">
                <Sparkle size={10} fill="currentColor" /> {profile?.occupation || 'User'}'s Advisor
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white border-2 border-slate-900 rounded-full text-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-y-0.5 transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center px-8">
              <Sparkles size={64} className="text-slate-100 mb-4 animate-pulse" />
              <h4 className="font-black text-slate-900 text-2xl mb-2 tracking-tight">Need help, {profile?.name}?</h4>
              <p className="text-slate-500 text-sm font-bold leading-tight mb-8">
                Ask Guru about your current crisis or general wealth tips.
              </p>
              
              <div className="w-full space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 text-left ml-2">Suggested for you:</p>
                <div className="grid gap-2">
                  {roleSuggestions.map(t => (
                    <button 
                      key={t} 
                      onClick={() => handleSend(t)} 
                      className="w-full p-4 bg-white border-2 border-slate-900 rounded-2xl text-left font-black text-slate-900 text-sm shadow-[3px_3px_0_0_rgba(249,115,22,1)] active:shadow-none active:translate-y-0.5 transition-all"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] p-5 rounded-[2rem] font-bold text-base leading-snug shadow-sm ${
                m.role === 'user' 
                ? 'bg-slate-900 text-white rounded-tr-none' 
                : 'bg-white text-slate-900 rounded-tl-none border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(249,115,22,1)]'
              }`}>
                {m.content}
                
                {m.citations && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grounding Sources:</p>
                    {m.citations.map((cite: any, ci: number) => (
                      <a 
                        key={ci} 
                        href={cite.web?.uri} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs text-blue-600 font-black flex items-center gap-1 hover:underline truncate bg-blue-50 p-2 rounded-lg"
                      >
                        <ExternalLink size={12} /> {cite.web?.title || 'External Source'}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border-2 border-slate-900 flex items-center gap-3">
                <Loader2 size={20} className="animate-spin text-orange-500" />
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Guru is consulting the web...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-7 bg-white border-t-2 border-slate-100 pb-10">
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-[2rem] border-2 border-slate-900 focus-within:shadow-[4px_4px_0_0_rgba(15,23,42,1)] transition-all">
            <button onClick={handleVoice} className="p-4 bg-white border-2 border-slate-900 rounded-full shadow-sm text-slate-900 active:scale-90 transition-all">
              <Mic size={24} />
            </button>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..." 
              className="flex-1 bg-transparent border-none outline-none px-2 font-black text-lg text-slate-900 placeholder:text-slate-300" 
            />
            <button onClick={() => handleSend()} className="p-4 bg-slate-900 rounded-full shadow-lg text-white active:scale-90 transition-all">
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
