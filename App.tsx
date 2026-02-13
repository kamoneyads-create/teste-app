
import React, { useState, useMemo, useEffect } from 'react';
import { Plus, LayoutDashboard, Receipt, BrainCircuit, Wallet, TrendingUp, TrendingDown, Trash2, X } from 'lucide-react';
import { Transaction, TransactionType, Category } from './types';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AIInsights from './components/AIInsights';
import AddTransactionModal from './components/AddTransactionModal';

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Salário Mensal', amount: 5000, type: TransactionType.INCOME, category: 'Salário', date: new Date().toISOString() },
  { id: '2', description: 'Aluguel', amount: 1500, type: TransactionType.EXPENSE, category: 'Moradia', date: new Date().toISOString() },
  { id: '3', description: 'Supermercado', amount: 600, type: TransactionType.EXPENSE, category: 'Alimentação', date: new Date().toISOString() },
];

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'ai'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, t) => acc + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    setTransactions(prev => [transaction, ...prev]);
    setIsModalOpen(false);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Wallet size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">FinanceFlow</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <LayoutDashboard size={20} /> Painel
          </button>
          <button 
            onClick={() => setActiveTab('transactions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'transactions' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Receipt size={20} /> Transações
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'ai' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <BrainCircuit size={20} /> Insights IA
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all shadow-md active:scale-95"
          >
            <Plus size={20} /> Novo Lançamento
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative pb-20 md:pb-0 overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 p-6 md:p-8 flex justify-between items-center border-b border-slate-100 md:bg-transparent md:border-none md:backdrop-blur-none">
          <div className="md:hidden flex items-center gap-3">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Wallet size={18} />
            </div>
            <h1 className="text-lg font-bold">FinanceFlow</h1>
          </div>
          <div className="hidden md:block">
            <h2 className="text-2xl font-bold text-slate-800">Olá, Gerencie suas Finanças</h2>
            <p className="text-slate-500">Acompanhe seus gastos e economize mais hoje.</p>
          </div>
          <div className="flex gap-4">
             {/* Stats summary mobile only */}
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Entradas</p>
                <p className="text-2xl font-bold text-emerald-600">R$ {stats.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">
                <TrendingDown size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Saídas</p>
                <p className="text-2xl font-bold text-rose-600">R$ {stats.expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div className={`p-6 rounded-2xl border flex items-center gap-4 shadow-sm ${stats.balance >= 0 ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-rose-600 text-white border-rose-700'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stats.balance >= 0 ? 'bg-white/20' : 'bg-white/20'}`}>
                <Wallet size={24} />
              </div>
              <div>
                <p className="text-sm opacity-80">Saldo Geral</p>
                <p className="text-2xl font-bold">R$ {stats.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>

          {activeTab === 'dashboard' && <Dashboard transactions={transactions} />}
          {activeTab === 'transactions' && <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />}
          {activeTab === 'ai' && <AIInsights transactions={transactions} />}
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex items-center justify-around py-2 px-6 z-20">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center p-2 ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <LayoutDashboard size={24} />
          <span className="text-[10px] mt-1">Início</span>
        </button>
        <button onClick={() => setActiveTab('transactions')} className={`flex flex-col items-center p-2 ${activeTab === 'transactions' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <Receipt size={24} />
          <span className="text-[10px] mt-1">Lista</span>
        </button>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white w-12 h-12 rounded-full -mt-8 flex items-center justify-center shadow-lg shadow-indigo-200 active:scale-90 transition-transform">
          <Plus size={24} />
        </button>
        <button onClick={() => setActiveTab('ai')} className={`flex flex-col items-center p-2 ${activeTab === 'ai' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <BrainCircuit size={24} />
          <span className="text-[10px] mt-1">IA</span>
        </button>
        <div className="w-12 h-1"></div> {/* Spacer for symmetry */}
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <AddTransactionModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAddTransaction} 
        />
      )}
    </div>
  );
};

export default App;
