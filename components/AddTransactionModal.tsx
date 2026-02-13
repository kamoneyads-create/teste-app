
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Transaction, TransactionType, Category } from '../types';

interface AddTransactionModalProps {
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const CATEGORIES: Category[] = [
  'Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Investimentos', 'Outros', 'Salário'
];

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ onClose, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState<Category>('Alimentação');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    
    onSubmit({
      description,
      amount: parseFloat(amount),
      type,
      category
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">Novo Lançamento</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setType(TransactionType.EXPENSE)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${type === TransactionType.EXPENSE ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'}`}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType(TransactionType.INCOME)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${type === TransactionType.INCOME ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
            >
              Receita
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Descrição</label>
            <input
              autoFocus
              required
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Mercado, Aluguel, Salário..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Valor (R$)</label>
            <input
              required
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-lg font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            Adicionar Transação
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
