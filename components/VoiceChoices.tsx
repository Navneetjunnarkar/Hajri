
import React, { useState, useCallback, useEffect } from 'react';
import { Mic, MicOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createRecognition } from '../services/speechService';
import { Language, Choice } from '../types';

interface VoiceChoicesProps {
  lang: Language;
  choices: Choice[];
  onChoiceSelected: (choice: Choice) => void;
}

const VoiceChoices: React.FC<VoiceChoicesProps> = ({ lang, choices, onChoiceSelected }) => {
  const [status, setStatus] = useState<'IDLE' | 'LISTENING' | 'ERROR' | 'SUCCESS'>('IDLE');
  const [lastTranscript, setLastTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleResult = useCallback((transcript: string) => {
    setLastTranscript(transcript);
    
    const matchedChoice = choices.find(choice => 
      choice.keywords.some(kw => transcript.toLowerCase().includes(kw.toLowerCase()))
    );

    if (matchedChoice) {
      setStatus('SUCCESS');
      setTimeout(() => {
        onChoiceSelected(matchedChoice);
        setStatus('IDLE');
      }, 800);
    } else {
      setStatus('ERROR');
      setErrorMsg(lang === Language.HINDI ? 'समझ नहीं आया, फिर से बोलें' : "Didn't catch that, try again");
      setTimeout(() => setStatus('IDLE'), 2000);
    }
  }, [choices, onChoiceSelected, lang]);

  const toggleListening = () => {
    if (status === 'LISTENING') return;

    const recognition = createRecognition(lang, handleResult);
    if (!recognition) {
        setStatus('ERROR');
        setErrorMsg("Voice not supported");
        return;
    }

    recognition.onerror = (e: any) => {
      setStatus('ERROR');
      setErrorMsg(e.error === 'not-allowed' ? "Permission Denied" : "Try again");
      setTimeout(() => setStatus('IDLE'), 2000);
    };

    recognition.onstart = () => setStatus('LISTENING');
    recognition.onend = () => { if(status === 'LISTENING') setStatus('IDLE'); };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-8 pb-4">
      <div className="relative">
        <button
          onClick={toggleListening}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-90 shadow-2xl ${
            status === 'LISTENING' ? 'bg-red-500 pulse ring-8 ring-red-100 text-white' : 
            status === 'SUCCESS' ? 'bg-green-500 text-white scale-110' :
            status === 'ERROR' ? 'bg-slate-400 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {status === 'LISTENING' ? <Mic size={40} /> : 
           status === 'SUCCESS' ? <CheckCircle2 size={40} /> :
           status === 'ERROR' ? <AlertCircle size={40} /> : <MicOff size={40} />}
        </button>
        
        {status === 'LISTENING' && (
           <div className="absolute -top-2 -right-2 bg-white text-red-500 p-1 rounded-full shadow-lg border border-red-100">
             <div className="w-4 h-4 bg-red-500 rounded-full animate-ping" />
           </div>
        )}
      </div>

      <div className="text-center">
        <p className={`text-sm font-black tracking-tight ${status === 'ERROR' ? 'text-red-500' : 'text-slate-600'}`}>
          {status === 'LISTENING' ? (lang === Language.HINDI ? 'बोलिए...' : 'Listening...') : 
           status === 'ERROR' ? errorMsg :
           status === 'SUCCESS' ? (lang === Language.HINDI ? 'पहचान लिया!' : 'Recognized!') :
           (lang === Language.HINDI ? 'बोलकर चुनें (जैसे "कर्ज" या "बचत")' : 'Speak keyword (e.g. "Loan" or "Savings")')}
        </p>
        {lastTranscript && status !== 'IDLE' && (
          <p className="text-xs text-slate-400 italic mt-1 font-medium">"{lastTranscript}"</p>
        )}
      </div>
    </div>
  );
};

export default VoiceChoices;
