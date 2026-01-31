
import { Language } from '../types';

export const speak = (text: string, lang: Language) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    
    // Attempt to find a native voice for the language
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(v => v.lang === lang) || voices[0];
    if (selectedVoice) utterance.voice = selectedVoice;
    
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

export const createRecognition = (lang: Language, onResult: (transcript: string) => void) => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    onResult(transcript);
  };

  return recognition;
};
