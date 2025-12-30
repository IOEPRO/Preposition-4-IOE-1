
import React from 'react';
import { Question, UserAnswer } from '../types';

interface QuestionGridProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  currentIndex: number;
  onJump: (index: number) => void;
  onClose: () => void;
}

const QuestionGrid: React.FC<QuestionGridProps> = ({ questions, userAnswers, currentIndex, onJump, onClose }) => {
  const getStatusColor = (q: Question, idx: number) => {
    const ans = userAnswers.find(a => a.questionId === q.id);
    if (idx === currentIndex) return "ring-4 ring-blue-500 border-blue-500 text-blue-600 bg-white scale-110 z-10";
    if (!ans) return "bg-slate-100 text-slate-400 border-transparent shadow-inner";
    return ans.isCorrect ? "bg-emerald-500 text-white border-emerald-600 shadow" : "bg-rose-500 text-white border-rose-600 shadow";
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up border-4 border-white">
        <div className="p-5 border-b flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase">QUESTION LIST</h2>
            <p className="text-sm font-bold text-slate-500">{userAnswers.length} / {questions.length} DONE</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl text-slate-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-50/50">
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((q, idx) => (
              <button 
                key={q.id} 
                onClick={() => onJump(idx)} 
                className={`h-12 w-12 rounded-xl font-black text-base border-2 transition-all transform active:scale-90 ${getStatusColor(q, idx)}`}
              >
                {q.id}
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 bg-white border-t text-[10px] font-black text-slate-400 flex gap-6 justify-center uppercase">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 rounded-full"></span> OK</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-rose-500 rounded-full"></span> WRONG</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-200 rounded-full"></span> TODO</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionGrid;
