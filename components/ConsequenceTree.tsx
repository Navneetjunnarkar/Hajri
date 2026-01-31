
import React, { useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Choice, Language } from '../types';
import { IndianRupee, TrendingUp, AlertTriangle } from 'lucide-react';

interface ConsequenceTreeProps {
  choice: Choice;
  lang: Language;
}

const ConsequenceTree: React.FC<ConsequenceTreeProps> = ({ choice, lang }) => {
  const data = useMemo(() => choice.consequences.map(c => ({
    name: c.period[lang],
    amount: c.amount,
    stress: c.stress,
    note: c.note[lang]
  })), [choice, lang]);

  const maxAmount = useMemo(() => Math.max(...data.map(d => d.amount), 100), [data]);
  const isDebt = choice.id === 'debt';

  return (
    <div className="w-full bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-slate-800 tracking-tight">
          {lang === Language.HINDI ? 'भविष्य का प्रभाव' : 'Future Impact'}
        </h3>
        {isDebt && (
          <div className="flex items-center gap-1 text-red-500 bg-red-50 px-3 py-1 rounded-full animate-bounce">
            <AlertTriangle size={16} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Debt Trap Warning</span>
          </div>
        )}
      </div>
      
      {/* Balloon Visualizer */}
      <div className="flex justify-center items-end h-32 mb-8 gap-4 px-2">
        {data.map((item, idx) => {
          const scale = 0.5 + (item.amount / (maxAmount || 1)) * 1.5;
          return (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div 
                className={`w-full rounded-full debt-balloon shadow-lg flex items-center justify-center text-white font-black text-[10px] ${
                  isDebt ? 'bg-gradient-to-t from-red-600 to-orange-400' : 'bg-gradient-to-t from-green-600 to-emerald-400'
                }`}
                style={{ 
                    height: `${Math.min(item.amount / maxAmount * 100 + 40, 100)}%`,
                    width: `${Math.min(item.amount / maxAmount * 60 + 20, 60)}px`,
                    opacity: 0.6 + (idx / data.length) * 0.4
                }}
              >
                {item.amount > 0 && `₹${item.amount / 1000}k`}
              </div>
              <p className="text-[8px] font-bold text-slate-400 mt-2 uppercase text-center">{item.name}</p>
            </div>
          );
        })}
      </div>

      <div className="h-48 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDebt ? "#ef4444" : "#10b981"} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={isDebt ? "#ef4444" : "#10b981"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
              itemStyle={{fontWeight: 900}}
            />
            <Area 
                type="monotone" 
                dataKey="amount" 
                stroke={isDebt ? "#ef4444" : "#10b981"} 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#impactGradient)" 
                name={lang === Language.HINDI ? "राशि" : "Amount"} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {data.slice(-2).map((item, idx) => (
          <div key={idx} className={`flex items-center gap-4 p-4 rounded-2xl border ${isDebt ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
            <div className={`p-2 rounded-xl bg-white shadow-sm ${isDebt ? 'text-red-500' : 'text-green-500'}`}>
              {isDebt ? <TrendingUp size={20} /> : <IndianRupee size={20} />}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">{item.name}</p>
              <p className="text-sm font-bold text-slate-800 leading-tight">{item.note}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-slate-900 leading-none">₹{item.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsequenceTree;
