
import React from 'react';
import { TrendingUp, ShieldAlert, Heart, ArrowRight, BrainCircuit, Award } from 'lucide-react';
import { UserStats, Language } from '../types';

interface BehavioralScorecardProps {
  stats: UserStats;
  lang: Language;
  onNext: () => void;
}

const BehavioralScorecard: React.FC<BehavioralScorecardProps> = ({ stats, lang, onNext }) => {
  const getProfile = () => {
    if (stats.debtSeeking > 70) return lang === Language.HINDI ? 'अल्पकालिक विचारक' : 'Short-term Thinker';
    if (stats.savingsMindset > 60) return lang === Language.HINDI ? 'दूरदर्शी निवेशक' : 'Visionary Saver';
    return lang === Language.HINDI ? 'संतुलित' : 'Balanced Learner';
  };

  return (
    <div className="w-full bg-white rounded-[3rem] p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-500">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-4 shadow-xl">
            <BrainCircuit size={40} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tighter">
            {lang === Language.HINDI ? 'आपका व्यवहार' : 'Your Stats'}
        </h2>
        <p className="text-orange-500 font-black uppercase tracking-widest text-xs mt-1">{getProfile()}</p>
        <p className="text-slate-400 font-black text-[10px] mt-1">Level {stats.level} Wealth Builder</p>
      </div>

      {/* Badges Section */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {stats.badges.length > 0 ? stats.badges.map(b => (
            <div key={b} className="flex flex-col items-center gap-1 bg-yellow-50 px-3 py-2 rounded-2xl border border-yellow-200">
                <Award size={20} className="text-yellow-600" />
                <span className="text-[8px] font-black text-yellow-800 uppercase leading-none">{b}</span>
            </div>
        )) : (
            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">No badges earned yet</p>
        )}
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-tighter">
                    <ShieldAlert size={16}/> {lang === Language.HINDI ? 'कर्ज की इच्छा' : 'Debt Risk'}
                </span>
                <span className="text-xl font-black text-slate-800">{stats.debtSeeking}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full transition-all duration-1000" style={{ width: `${stats.debtSeeking}%` }} />
            </div>
        </div>

        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="flex items-center gap-2 text-green-600 font-black text-xs uppercase tracking-tighter">
                    <TrendingUp size={16}/> {lang === Language.HINDI ? 'बचत की आदत' : 'Savings Pulse'}
                </span>
                <span className="text-xl font-black text-slate-800">{stats.savingsMindset}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-green-600 h-full transition-all duration-1000" style={{ width: `${stats.savingsMindset}%` }} />
            </div>
        </div>

        <div className="flex items-center gap-6 p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-[2.5rem] border border-orange-200 shadow-inner mt-4">
            <div className="bg-white w-14 h-14 rounded-[1.2rem] shadow-md flex items-center justify-center">
                <Heart className="text-orange-500 fill-orange-500" size={28} />
            </div>
            <div>
                <p className="text-[10px] text-orange-600 font-black uppercase tracking-[0.2em] mb-1">
                    {lang === Language.HINDI ? 'लचीलापन स्कोर' : 'Resilience'}
                </p>
                <div className="flex items-baseline gap-1">
                    <p className="text-4xl font-black text-orange-900 tracking-tighter">{stats.resilienceScore}</p>
                    <p className="text-sm font-black text-orange-400">/100</p>
                </div>
            </div>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="w-full mt-8 bg-slate-900 text-white py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-800 active:scale-95 transition-all shadow-xl"
      >
        {lang === Language.HINDI ? 'अगला अध्याय' : 'NEXT CHAPTER'}
        <ArrowRight size={24} />
      </button>
    </div>
  );
};

export default BehavioralScorecard;
