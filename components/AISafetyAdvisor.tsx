
import React, { useState } from 'react';
import { getSafetyInsights, predictPPERequirement } from '../services/geminiService';
import { IPPERecord } from '../types';

interface Props {
  history: IPPERecord[];
}

const AISafetyAdvisor: React.FC<Props> = ({ history }) => {
  const [query, setQuery] = useState('');
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'insight' | 'task'>('insight');

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setInsight(null);
    
    let response = "";
    if (mode === 'insight') {
      response = await getSafetyInsights(history, query);
    } else {
      response = await predictPPERequirement(query);
    }
    
    setInsight(response);
    setIsLoading(false);
  };

  const suggestions = [
    "Recommend PPE for hot work in engine room",
    "Analyze glove usage trends for MV Voyager",
    "What PPE is needed for working at heights?",
    "Review safety compliance for tank cleaning"
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
      <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between">
        <h2 className="text-white font-semibold text-lg flex items-center gap-2">
          <span>🤖</span> AI Safety Advisor
        </h2>
        <div className="flex bg-indigo-700/50 p-1 rounded-lg">
          <button 
            onClick={() => setMode('insight')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition ${mode === 'insight' ? 'bg-white text-indigo-600' : 'text-indigo-100 hover:bg-indigo-700'}`}
          >
            Insights
          </button>
          <button 
             onClick={() => setMode('task')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition ${mode === 'task' ? 'bg-white text-indigo-600' : 'text-indigo-100 hover:bg-indigo-700'}`}
          >
            Task Assist
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {!insight && !isLoading && (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-2xl">
              💡
            </div>
            <h3 className="text-slate-900 font-semibold">How can I help you with safety today?</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              {mode === 'insight' 
                ? "Ask me to analyze your PPE history, spot trends, or suggest compliance improvements." 
                : "Describe a maritime task, and I'll list the required PPE items and safety protocols."}
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto mt-6">
              {suggestions.map(s => (
                <button 
                  key={s} 
                  onClick={() => setQuery(s)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm animate-pulse">Analyzing maritime protocols...</p>
          </div>
        )}

        {insight && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 mb-4">
               <span className="text-indigo-600 font-bold">Expert Response:</span>
            </div>
            <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
              {insight}
            </div>
            <button 
                onClick={() => setInsight(null)}
                className="mt-6 text-indigo-600 text-sm font-semibold hover:underline"
            >
                Start New Consultation
            </button>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
            placeholder={mode === 'insight' ? "Ask about fleet trends..." : "Describe a deck task..."}
            className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          <button 
            onClick={handleAsk}
            disabled={isLoading || !query.trim()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg shadow-indigo-100"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISafetyAdvisor;
