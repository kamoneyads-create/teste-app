
import React, { useState, useEffect } from 'react';
import { BrainCircuit, Sparkles, AlertCircle, TrendingDown, Lightbulb, Loader2 } from 'lucide-react';
import { Transaction, AIInsight } from '../types';
import { analyzeSpending } from '../services/geminiService';

interface AIInsightsProps {
  transactions: Transaction[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ transactions }) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(false);

  const getInsights = async () => {
    if (transactions.length === 0) return;
    setLoading(true);
    try {
      const data = await analyzeSpending(transactions);
      setInsights(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md">
            <Sparkles size={16} /> Insight Inteligente
          </div>
          <h2 className="text-3xl font-bold mb-4">Análise Financeira IA</h2>
          <p className="text-indigo-100 max-w-xl text-lg leading-relaxed">
            Usamos Inteligência Artificial de ponta para analisar seus padrões de consumo e sugerir as melhores estratégias para você prosperar financeiramente.
          </p>
          <button 
            onClick={getInsights}
            disabled={loading}
            className="mt-8 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <BrainCircuit size={20} />}
            {loading ? "Processando..." : "Gerar Novos Insights"}
          </button>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-pulse space-y-4">
              <div className="w-10 h-10 bg-slate-100 rounded-lg"></div>
              <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              <div className="h-20 bg-slate-100 rounded w-full"></div>
            </div>
          ))
        ) : insights.length > 0 ? (
          insights.map((insight, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  {idx === 0 ? <TrendingDown size={24} /> : idx === 1 ? <Lightbulb size={24} /> : <AlertCircle size={24} />}
                </div>
                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md border ${getPriorityStyles(insight.priority)}`}>
                  {insight.priority} impact
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">{insight.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                {insight.description}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-400 flex flex-col items-center gap-3">
             <BrainCircuit size={48} className="opacity-20" />
             <p>Clique no botão acima para analisar seus gastos recentes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
