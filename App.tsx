
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { EPISODES } from './data/episodes';
import { Language, Choice, UserStats, UserProfile } from './types';
import { speak } from './services/speechService';
import VoiceChoices from './components/VoiceChoices';
import ConsequenceTree from './components/ConsequenceTree';
import BehavioralScorecard from './components/BehavioralScorecard';
import AIAssistant from './components/AIAssistant';
import { Trophy, Home, Settings, Info, IndianRupee, HeartPulse, Wallet, RefreshCw, PlayCircle, User, Languages, ChevronDown, Zap, Sparkles, Award, Bot, Sparkle } from 'lucide-react';

type GamePhase = 'REGISTRATION' | 'INTRO' | 'STORY' | 'CONSEQUENCE' | 'SCORECARD' | 'EPISODE_SELECT';

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>('REGISTRATION');
  const [lang, setLang] = useState<Language>(Language.HINDI);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    debtSeeking: 0,
    savingsMindset: 0,
    resilienceScore: 50,
    xp: 0,
    level: 1,
    badges: []
  });
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [shake, setShake] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Fix: define currentEpisode derived from current index
  const currentEpisode = EPISODES[currentEpisodeIndex];

  useEffect(() => {
    const saved = localStorage.getItem('hajri_v6_progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserStats(parsed.stats);
      setCurrentEpisodeIndex(parsed.episodeIndex || 0);
      setProfile(parsed.profile);
      setLang(parsed.profile?.language || Language.HINDI);
      setPhase('INTRO');
    }
  }, []);

  const saveProgress = (stats: UserStats, epIndex: number, prof: UserProfile | null) => {
    localStorage.setItem('hajri_v6_progress', JSON.stringify({ stats, episodeIndex: epIndex, profile: prof }));
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProfile: UserProfile = {
      name: formData.get('name') as string,
      age: formData.get('age') as string,
      occupation: formData.get('occupation') as string,
      language: lang
    };
    setProfile(newProfile);
    saveProgress(userStats, currentEpisodeIndex, newProfile);
    setPhase('INTRO');
  };

  const resetGame = () => {
    if (confirm("Reset everything?")) {
        localStorage.removeItem('hajri_v6_progress');
        window.location.reload();
    }
  };

  const startEpisode = useCallback((idx: number) => {
    setCurrentEpisodeIndex(idx);
    setPhase('STORY');
    const ep = EPISODES[idx];
    const scenario = ep.scenario[lang] || ep.scenario[Language.ENGLISH];
    const narrative = ep.narrative[lang] || ep.narrative[Language.ENGLISH];
    speak(scenario + " " + narrative, lang);
  }, [lang]);

  const handleChoice = useCallback((choice: Choice) => {
    setSelectedChoice(choice);
    setPhase('CONSEQUENCE');
    
    if (choice.id === 'debt' || choice.id === 'credit-card' || choice.id === 'relative-loan') {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    } else {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 2000);
    }

    setUserStats(prev => {
        const next = { ...prev };
        next.xp += choice.impact.xp;
        const nextLevel = Math.floor(next.xp / 500) + 1;
        if (nextLevel > next.level) {
            next.level = nextLevel;
            speak("Level Up! You are now level " + nextLevel, lang);
        }

        if (choice.id === 'insurance' && !next.badges.includes('Risk Shield')) next.badges.push('Risk Shield');
        if (['save-up', 'wait-save', 'ppf-safe'].includes(choice.id) && !next.badges.includes('Savvy Saver')) next.badges.push('Savvy Saver');

        if (['debt', 'credit-card', 'crypto-gamble', 'relative-loan'].includes(choice.id)) {
            next.debtSeeking = Math.min(100, next.debtSeeking + 40);
            next.resilienceScore = Math.max(0, next.resilienceScore - 20);
        } else {
            next.savingsMindset = Math.min(100, next.savingsMindset + 30);
            next.resilienceScore = Math.min(100, next.resilienceScore + 20);
        }
        
        saveProgress(next, currentEpisodeIndex, profile);
        return next;
    });

    const description = choice.impact.description[lang] || choice.impact.description[Language.ENGLISH];
    speak(description, lang);
  }, [currentEpisodeIndex, profile, lang]);

  const nextEpisode = useCallback(() => {
    const nextIndex = currentEpisodeIndex + 1;
    if (nextIndex < EPISODES.length) {
      startEpisode(nextIndex);
    } else {
      setPhase('EPISODE_SELECT');
    }
  }, [currentEpisodeIndex, startEpisode]);

  const languages = [
    { code: Language.HINDI, label: 'हिन्दी' },
    { code: Language.ENGLISH, label: 'English' },
    { code: Language.MARATHI, label: 'मराठी' },
    { code: Language.BENGALI, label: 'বাংলা' },
    { code: Language.TELUGU, label: 'తెలుగు' },
    { code: Language.PUNJABI, label: 'ਪੰਜਾਬੀ' },
  ];

  return (
    <div className={`max-w-md mx-auto h-screen bg-white flex flex-col overflow-hidden relative border-x border-slate-200 shadow-2xl transition-transform ${shake ? 'animate-shake' : ''}`}>
      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} lang={lang} profile={profile} stats={userStats} currentEpisode={currentEpisode} />

      {confetti && (
        <div className="absolute inset-0 z-[100] pointer-events-none flex items-center justify-center">
            <div className="animate-bounce flex gap-2">
                <Sparkles className="text-yellow-400 w-12 h-12" />
                <Sparkles className="text-blue-400 w-12 h-12" />
                <Sparkles className="text-green-400 w-12 h-12" />
            </div>
        </div>
      )}

      {/* Header */}
      <header className="p-4 pt-6 bg-slate-900 text-white flex justify-between items-center shadow-lg z-50">
        <div className="flex items-center gap-2" onClick={() => profile && setPhase('INTRO')}>
            <div className="bg-orange-500 p-1.5 rounded-lg rotate-12">
              <IndianRupee size={18} className="text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase">HAJRI</h1>
        </div>
        <div className="flex items-center gap-3 relative">
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md text-[8px] font-black uppercase">
                    <Zap size={8} className="text-yellow-300 fill-yellow-300" />
                    Lvl {userStats.level}
                </div>
                <div className="w-10 h-1 bg-white/20 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: `${(userStats.xp % 500) / 5}%` }} />
                </div>
            </div>
            <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="text-[10px] font-black bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1 uppercase"
            >
                <Languages size={12} />
                {languages.find(l => l.code === lang)?.label}
            </button>
            <button onClick={resetGame} className="p-1 hover:rotate-180 transition-transform duration-500">
                <RefreshCw size={18} />
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-28 relative bg-slate-50">
        <style>{`
            @keyframes shake {
                0% { transform: translate(1px, 1px) rotate(0deg); }
                10% { transform: translate(-1px, -2px) rotate(-1deg); }
                20% { transform: translate(-3px, 0px) rotate(1deg); }
                30% { transform: translate(3px, 2px) rotate(0deg); }
                40% { transform: translate(1px, -1px) rotate(1deg); }
                50% { transform: translate(-1px, 2px) rotate(-1deg); }
            }
            .animate-shake { animation: shake 0.5s; }
        `}</style>

        {phase === 'REGISTRATION' && (
          <div className="h-full p-8 flex flex-col justify-center bg-white animate-in slide-in-from-bottom duration-500">
            <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg mb-4">
                  <Sparkle size={14} className="text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Financial Identity</span>
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2">Build Your Future</h2>
                <p className="text-slate-400 font-bold text-sm">Create your profile to start the journey.</p>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                  <input 
                    name="name" 
                    required 
                    placeholder="e.g. Raj Kumar" 
                    className="w-full bg-white border-2 border-slate-900 p-5 rounded-2xl font-black text-xl text-slate-900 placeholder:text-slate-300 focus:shadow-[4px_4px_0_0_rgba(15,23,42,1)] outline-none transition-all" 
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Age</label>
                    <input 
                      name="age" 
                      required 
                      type="number" 
                      placeholder="24" 
                      className="w-full bg-white border-2 border-slate-900 p-5 rounded-2xl font-black text-xl text-slate-900 placeholder:text-slate-300 focus:shadow-[4px_4px_0_0_rgba(15,23,42,1)] outline-none transition-all" 
                    />
                  </div>
                  <div className="flex-[2] space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Occupation</label>
                    <select 
                      name="occupation" 
                      required 
                      className="w-full bg-white border-2 border-slate-900 p-5 rounded-2xl font-black text-xl text-slate-900 appearance-none focus:shadow-[4px_4px_0_0_rgba(15,23,42,1)] outline-none transition-all"
                    >
                      <option value="farmer">🌾 Farmer</option>
                      <option value="student">🎓 Student</option>
                      <option value="worker">🏗️ Worker / Woman</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-2xl shadow-[0_8px_0_0_rgba(249,115,22,1)] hover:bg-slate-800 active:translate-y-1 active:shadow-none transition-all mt-4 uppercase tracking-tighter">
                    Save Profile & Play
                </button>
            </form>
          </div>
        )}

        {phase === 'INTRO' && profile && (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-very-light.png')] opacity-30" />
            <div className="relative z-10 w-full">
                <div className="flex justify-center mb-6">
                    {userStats.badges.map(b => (
                        <div key={b} className="bg-orange-500 p-2 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)]" title={b}>
                            <Award className="text-white w-5 h-5" />
                        </div>
                    ))}
                </div>
                <p className="text-orange-500 font-black mb-2 uppercase tracking-widest text-xs">Namaste, {profile.name}!</p>
                <div className="w-32 h-32 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl relative">
                    <IndianRupee size={56} className="text-white" />
                    <div className="absolute -top-2 -right-2 bg-orange-500 p-2 rounded-full border-4 border-white">
                      <Zap size={16} className="text-white fill-white" />
                    </div>
                </div>
                <h2 className="text-6xl font-black text-slate-900 mb-4 tracking-tighter leading-none">HAJRI</h2>
                <button 
                    onClick={() => setPhase('EPISODE_SELECT')}
                    className="bg-slate-900 text-white py-6 rounded-2xl font-black text-2xl shadow-[0_8px_0_0_rgba(249,115,22,1)] hover:bg-slate-800 active:translate-y-1 active:shadow-none transition-all w-full flex items-center justify-center gap-4 uppercase tracking-tighter"
                >
                    PLAY NOW 🎮
                </button>
            </div>
          </div>
        )}

        {phase === 'EPISODE_SELECT' && (
          <div className="p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter uppercase underline decoration-orange-500 decoration-4 underline-offset-8">Select Chapter</h2>
            {EPISODES.map((ep, idx) => (
                <button 
                    key={ep.id}
                    disabled={idx > currentEpisodeIndex}
                    onClick={() => startEpisode(idx)}
                    className={`w-full p-6 rounded-3xl flex items-center gap-5 border-2 transition-all text-left relative overflow-hidden group ${
                        idx <= currentEpisodeIndex 
                        ? 'bg-white border-slate-900 shadow-[6px_6px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-1 active:translate-y-1' 
                        : 'bg-slate-100 border-slate-200 opacity-60'
                    }`}
                >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl border-2 ${
                        idx === currentEpisodeIndex ? 'bg-orange-500 text-white border-slate-900' : 'bg-slate-200 text-slate-400 border-transparent'
                    }`}>
                        {idx + 1}
                    </div>
                    <div className="flex-1">
                        <p className="font-black text-slate-900 text-lg leading-tight">{ep.title[lang] || ep.title[Language.ENGLISH]}</p>
                        <p className="text-xs text-slate-400 mt-1 font-bold truncate">{ep.scenario[lang] || ep.scenario[Language.ENGLISH]}</p>
                    </div>
                </button>
            ))}
          </div>
        )}

        {phase === 'STORY' && currentEpisode && (
          <div className="p-6 animate-in zoom-in-95 duration-300">
            <div className="bg-white p-7 rounded-[2.5rem] border-4 border-slate-900 shadow-[8px_8px_0_0_rgba(249,115,22,1)] mb-10 relative overflow-hidden">
                <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      <PlayCircle size={14} />
                      Chapter {currentEpisodeIndex + 1}
                    </div>
                    <div className="flex items-center gap-1 text-orange-600 font-black text-xs uppercase italic">
                        <Zap size={14} /> +{currentEpisode.choices[0].impact.xp} XP
                    </div>
                </div>
                <p className="text-xl font-bold text-slate-900 leading-tight mb-4 tracking-tight">
                    {currentEpisode.scenario[lang] || currentEpisode.scenario[Language.ENGLISH]}
                </p>
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-900 border-dashed">
                    <p className="text-2xl font-black text-slate-900 leading-tight italic">
                        "{currentEpisode.narrative[lang] || currentEpisode.narrative[Language.ENGLISH]}"
                    </p>
                </div>
            </div>

            <div className="grid gap-4 mb-8">
                {currentEpisode.choices.map(choice => (
                    <button 
                        key={choice.id}
                        onClick={() => handleChoice(choice)}
                        className="bg-white border-2 border-slate-900 p-6 rounded-2xl font-black text-slate-900 hover:bg-slate-50 shadow-[4px_4px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-left"
                    >
                        {choice.label[lang] || choice.label[Language.ENGLISH]}
                    </button>
                ))}
            </div>

            <div className="flex justify-center">
              <VoiceChoices lang={lang} choices={currentEpisode.choices} onChoiceSelected={handleChoice} />
            </div>
            
            <div className="fixed right-6 bottom-32 z-[60]">
                <button 
                  onClick={() => setIsAIOpen(true)}
                  className="w-16 h-16 bg-slate-900 border-2 border-white rounded-full flex items-center justify-center text-orange-400 shadow-2xl hover:scale-110 active:scale-95 transition-all animate-pulse"
                >
                  <Bot size={28} />
                </button>
            </div>
          </div>
        )}

        {phase === 'CONSEQUENCE' && selectedChoice && (
            <div className="p-6 space-y-8">
                <div className="flex items-center justify-center gap-2 text-orange-600 font-black text-2xl uppercase tracking-tighter">
                    <Zap size={28} fill="currentColor" />
                    Level {userStats.level} Progress!
                </div>
                <ConsequenceTree choice={selectedChoice} lang={lang} />
                <div className="flex flex-col gap-4">
                  <button 
                      onClick={() => setIsAIOpen(true)}
                      className="w-full bg-white border-4 border-slate-900 text-slate-900 py-5 rounded-2xl font-black text-xl shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase"
                  >
                      <Sparkles size={24} className="text-orange-500" />
                      Ask Guru AI
                  </button>
                  <button 
                      onClick={() => setPhase('SCORECARD')}
                      className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-2xl shadow-[0_8px_0_0_rgba(249,115,22,1)] hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-4 uppercase"
                  >
                      Check Score
                      <Trophy size={28} className="text-yellow-400" />
                  </button>
                </div>
            </div>
        )}

        {phase === 'SCORECARD' && (
            <div className="p-6">
                <BehavioralScorecard stats={userStats} lang={lang} onNext={nextEpisode} />
            </div>
        )}
      </main>

      {/* Nav */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-slate-900 h-24 flex justify-around items-center px-6 z-40">
        <button onClick={() => setPhase('EPISODE_SELECT')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-900 transition-colors">
            <Home size={30} />
            <span className="text-[10px] font-black uppercase tracking-widest">STORY</span>
        </button>
        <div className="relative -top-10">
            <div className="w-20 h-20 bg-orange-500 border-4 border-slate-900 rounded-3xl flex items-center justify-center shadow-xl text-white rotate-12 transition-transform hover:rotate-0">
                <IndianRupee size={36} />
            </div>
        </div>
        <button className="flex flex-col items-center gap-1 text-slate-400">
            <Award size={30} />
            <span className="text-[10px] font-black uppercase tracking-widest">CARDS</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
