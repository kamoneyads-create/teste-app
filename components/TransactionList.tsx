
import React from 'react';
import { Trash2, ShoppingBag, Home, Bus, Heart, BookOpen, User, Wallet, DollarSign } from 'lucide-react';
import { Transaction, TransactionType, Category } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const CategoryIcon = ({ category }: { category: Category }) => {
  switch (category) {
    case 'Alimentação': return <ShoppingBag size={18} />;
    case 'Moradia': return <Home size={18} />;
    case 'Transporte': return <Bus size={18} />;
    case 'Saúde': return <Heart size={18} />;
    case 'Educação': return <BookOpen size={18} />;
    case 'Investimentos': return <Wallet size={18} />;
    case 'Salário': return <DollarSign size={18} />;
    default: return <User size={18} />;
  }
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">Últimas Transações</h3>
        <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
          {transactions.length} total
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Descrição</th>
              <th className="px-6 py-4">Categoria</th>
              <th className="px-6 py-4 text-right">Valor</th>
              <th className="px-6 py-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                  Nenhuma transação cadastrada.
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-800">{t.description}</span>
                      <span className="text-xs text-slate-400">{new Date(t.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600 bg-slate-100/50 w-fit px-3 py-1.5 rounded-lg text-sm">
                      <CategoryIcon category={t.category} />
                      {t.category}
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-right font-semibold ${t.type === TransactionType.INCOME ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === TransactionType.INCOME ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => onDelete(t.id)}
                      className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
