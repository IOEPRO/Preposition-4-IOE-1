
import React, { useState, useEffect } from 'react';
import { Question, QuestionType } from '../types';
import Button from './Button';
import AudioPlayer from './AudioPlayer';

interface QuestionCardProps {
  question: Question;
  onAnswer: (response: string) => void;
  isAnswered: boolean;
  userAnswer?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, isAnswered, userAnswer }) => {
  const [inputVal, setInputVal] = useState('');
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState('');

  useEffect(() => {
    setInputVal('');
    setSelectedParts([]);
    setShowHint(false);
    setHintText('');
  }, [question.id]);

  const normalize = (str?: string) => str ? str.replace(/[.,!?;:'"]/g, '').replace(/\s+/g, ' ').trim().toLowerCase() : "";
  const isCorrect = () => userAnswer && normalize(userAnswer) === normalize(question.correctAnswer);

  const generateHint = () => {
    if (hintText) return;
    let text = '';
    if (question.type === QuestionType.MULTIPLE_CHOICE) {
      const wrongOptions = question.options?.filter(opt => normalize(opt) !== normalize(question.correctAnswer)) || [];
      const randomWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      text = `Note: Option "${randomWrong}" is incorrect.`;
    } else if (question.type === QuestionType.FILL_IN_BLANK) {
      const answer = question.correctAnswer.trim();
      text = `HINT: ${answer.length} letters. Starts with "${answer.charAt(0).toUpperCase()}".`;
    } else {
      const words = question.correctAnswer.split(' ');
      text = `HINT: Starts with "${words.slice(0, 2).join(' ')}..."`;
    }
    setHintText(text);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-200">
        {/* Subheader gọn nhẹ */}
        <div className="bg-slate-50 px-4 py-2 border-b flex justify-between items-center">
          <div className="flex gap-2">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
              {question.type.split('_').join(' ')}
            </span>
            {!isAnswered && (
              <button 
                onClick={() => { generateHint(); setShowHint(!showHint); }} 
                className={`px-2.5 py-0.5 text-[10px] font-black border rounded-lg transition-all flex items-center gap-1 shadow-sm active:scale-95 ${
                  showHint ? 'bg-amber-500 text-white border-amber-600' : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                }`}
              >
                💡 {showHint ? 'HIDE' : 'HINT'}
              </button>
            )}
          </div>
          <span className="text-[10px] font-black text-slate-400">ID: {question.id}</span>
        </div>

        <div className="p-4 sm:p-5">
          {/* Audio & Hint section gọn gàng */}
          <div className="flex flex-col gap-3 mb-4">
            {question.audioUrl && <AudioPlayer src={question.audioUrl} />}
            {showHint && !isAnswered && (
              <div className="bg-amber-50 p-3 rounded-2xl text-base font-bold text-amber-900 border border-amber-200 animate-slide-up flex items-center gap-2">
                <span>✨</span> <span>{hintText}</span>
              </div>
            )}
          </div>

          {/* Question Text - ULTRA LARGE */}
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-6 leading-tight text-center sm:text-left">
            {question.questionText}
          </h2>

          {/* Multiple Choice - LARGE TARGETS */}
          {question.type === QuestionType.MULTIPLE_CHOICE && (
            <div className="grid grid-cols-1 gap-2.5">
              {question.options?.map((opt, idx) => (
                <button 
                  key={idx} 
                  onClick={() => !isAnswered && onAnswer(opt)} 
                  disabled={isAnswered} 
                  className={`w-full p-4.5 rounded-2xl text-left border-2 transition-all flex items-center gap-4 ${
                    isAnswered 
                      ? (normalize(opt) === normalize(question.correctAnswer)
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-4 ring-emerald-100' 
                          : normalize(opt) === normalize(userAnswer) 
                            ? 'bg-rose-50 border-rose-500 text-rose-900 ring-4 ring-rose-100' 
                            : 'bg-slate-50 opacity-40 border-slate-100'
                        ) 
                      : 'bg-white border-slate-100 hover:border-blue-500 hover:bg-blue-50/30'
                  }`}
                >
                  <span className={`font-black w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                    isAnswered && normalize(opt) === normalize(question.correctAnswer) ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 font-black text-xl sm:text-2xl">{opt}</span>
                </button>
              ))}
            </div>
          )}

          {/* Fill In Blank - ULTRA LARGE INPUT */}
          {question.type === QuestionType.FILL_IN_BLANK && (
            <form onSubmit={(e) => { e.preventDefault(); if(!isAnswered && inputVal.trim()) onAnswer(inputVal.trim()); }} className="space-y-4">
              <input 
                type="text" 
                autoFocus
                value={isAnswered && userAnswer ? userAnswer : inputVal} 
                onChange={(e) => setInputVal(e.target.value)} 
                disabled={isAnswered} 
                className={`w-full p-5 rounded-2xl border-4 text-4xl font-black outline-none transition-all text-center uppercase tracking-widest ${
                  isAnswered 
                    ? (isCorrect() ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-rose-500 bg-rose-50 text-rose-800' ) 
                    : 'border-slate-100 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-8 focus:ring-blue-100'
                }`} 
                placeholder="TYPE..." 
              />
              {!isAnswered && (
                <div className="flex justify-center">
                  <Button type="submit" size="lg" className="w-full sm:w-auto !px-20 !py-4 text-xl shadow-xl">CONFIRM</Button>
                </div>
              )}
            </form>
          )}

          {/* Rearrange - GIANT CHIPS */}
          {question.type === QuestionType.REARRANGE && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2.5 p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner min-h-[80px] items-center justify-center">
                {question.rearrangeParts?.map((part, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => !isAnswered && (selectedParts.includes(part) ? setSelectedParts(selectedParts.filter(p => p !== part)) : setSelectedParts([...selectedParts, part]))} 
                    disabled={isAnswered || selectedParts.includes(part)} 
                    className={`px-4 py-2.5 rounded-xl bg-white border-2 border-slate-200 font-black text-lg shadow-sm transition-all active:scale-90 ${
                      selectedParts.includes(part) ? 'opacity-20 scale-95' : 'hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>
              
              <div className={`w-full min-h-[100px] p-4 rounded-2xl border-4 border-dashed flex flex-wrap gap-2.5 items-center justify-center transition-all ${
                isAnswered ? (isCorrect() ? 'border-emerald-500 bg-emerald-50' : 'border-rose-500 bg-rose-50') : 'border-slate-200 bg-white'
              }`}>
                {selectedParts.length === 0 && !isAnswered && <div className="text-slate-300 font-black italic text-base">Select words...</div>}
                {selectedParts.map((part, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => !isAnswered && setSelectedParts(selectedParts.filter(p => p !== part))} 
                    disabled={isAnswered} 
                    className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-black text-lg shadow-lg"
                  >
                    {part}
                  </button>
                ))}
              </div>
              
              {!isAnswered && (
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={() => setSelectedParts([])} disabled={selectedParts.length === 0} className="!py-3 !px-8 text-lg !rounded-xl">CLEAR</Button>
                  <Button onClick={() => onAnswer(selectedParts.join(' '))} disabled={selectedParts.length === 0} size="lg" className="!py-3 !px-12 text-lg shadow-xl !rounded-xl">CHECK</Button>
                </div>
              )}
            </div>
          )}

          {/* Feedback Section gọn nhưng chữ to */}
          {isAnswered && (
            <div className={`mt-6 p-4 rounded-2xl border-l-[10px] shadow-lg animate-fade-in ${isCorrect() ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white text-2xl font-black ${isCorrect() ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                  {isCorrect() ? '✓' : '✕'}
                </div>
                <div className="flex-1">
                  <h3 className={`font-black text-xl mb-1 ${isCorrect() ? 'text-emerald-800' : 'text-rose-800'}`}>
                    {isCorrect() ? 'EXCELLENT!' : 'NOT QUITE!'}
                  </h3>
                  {!isCorrect() && (
                    <div className="mb-2 p-3 bg-white/90 rounded-xl border-2 border-rose-100">
                      <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest leading-none mb-1">CORRECT ANSWER:</p> 
                      <p className="font-black text-slate-900 text-xl leading-snug">{question.correctAnswer}</p>
                    </div>
                  )}
                  <div className="text-slate-700 font-bold text-base leading-relaxed">
                    <span className="font-black text-blue-600 uppercase text-xs mr-2">EXPLANATION:</span>
                    {question.explanation}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
