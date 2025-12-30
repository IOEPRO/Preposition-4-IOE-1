
import React from 'react';
import Button from './Button';
import { UserAnswer } from '../types';
import { QUIZ_DATA } from '../constants';

interface ResultScreenProps {
  userName: string;
  userAnswers: UserAnswer[];
  onRetryAll: () => void;
  onRetryWrong: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ userName, userAnswers, onRetryAll, onRetryWrong }) => {
  const correct = userAnswers.filter(a => a.isCorrect).length;
  const total = userAnswers.length;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const hasWrong = correct < total;
  const score = correct * 10;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in bg-slate-100">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full text-center">
        <div className="mb-8 relative inline-block">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f5f9" strokeWidth="12" />
            <circle 
              cx="60" 
              cy="60" 
              r="54" 
              fill="none" 
              stroke={percent >= 80 ? '#10b981' : percent >= 50 ? '#3b82f6' : '#ef4444'} 
              strokeWidth="12" 
              strokeDasharray="339.292" 
              strokeDashoffset={339.292 - (339.292 * percent) / 100} 
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out" 
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-slate-800">{percent}%</div>
        </div>
        
        <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase">KẾT QUẢ CUỐI CÙNG</h2>
        <p className="text-slate-500 mb-8 font-medium">Người chơi: <span className="text-blue-600 font-black">{userName}</span></p>
        
        <div className="mb-10 inline-flex items-center gap-4 bg-blue-600 text-white px-10 py-5 rounded-3xl shadow-xl shadow-blue-200 transform scale-110">
          <div className="text-left">
            <div className="text-xs font-bold uppercase tracking-widest opacity-80">Tổng điểm</div>
            <div className="text-5xl font-black leading-none">{score}</div>
          </div>
          <div className="w-px h-10 bg-white/20"></div>
          <div className="text-2xl font-bold opacity-80">XẾP HẠNG: {percent >= 90 ? 'S+' : percent >= 80 ? 'A' : percent >= 60 ? 'B' : 'C'}</div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-100">
            <div className="text-3xl font-black text-green-600">{correct}</div>
            <div className="text-xs uppercase text-green-700 font-black tracking-widest">Câu trả lời đúng</div>
          </div>
          <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-100">
            <div className="text-3xl font-black text-red-500">{total - correct}</div>
            <div className="text-xs uppercase text-red-700 font-black tracking-widest">Câu trả lời sai</div>
          </div>
        </div>

        {hasWrong && (
          <div className="text-left mb-10">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="text-red-500">⚠</span> Cần ôn tập lại
              </h3>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">{total - correct} CÂU SAI</span>
            </div>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {userAnswers.filter(a => !a.isCorrect).map((ans, i) => {
                const q = QUIZ_DATA.find(x => x.id === ans.questionId);
                return q ? (
                  <div key={i} className="bg-white border-2 border-slate-100 rounded-2xl p-5 shadow-sm hover:border-red-200 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md">#{q.id}</span>
                    </div>
                    <div className="font-bold text-slate-800 mb-3 text-sm leading-relaxed">{q.questionText}</div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                        <div className="text-[10px] font-black text-red-400 uppercase mb-1">Bạn trả lời:</div>
                        <div className="text-sm font-bold text-red-800 break-words">{ans.userResponse || "(Bỏ qua)"}</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                        <div className="text-[10px] font-black text-green-400 uppercase mb-1">Đáp án đúng:</div>
                        <div className="text-sm font-bold text-green-800 break-words">{q.correctAnswer}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-[11px] text-slate-500 font-medium italic">
                      <span className="font-bold text-blue-500 not-italic uppercase mr-1">Giải thích:</span> {q.explanation}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onRetryAll} size="lg" className="px-12">Luyện tập lại từ đầu</Button>
          {hasWrong && (
            <Button onClick={onRetryWrong} variant="danger" size="lg" className="px-12">Chỉ ôn lại câu sai</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
