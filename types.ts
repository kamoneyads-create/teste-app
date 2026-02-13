
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export type Category = 
  | 'Alimentação' 
  | 'Transporte' 
  | 'Moradia' 
  | 'Lazer' 
  | 'Saúde' 
  | 'Educação' 
  | 'Investimentos' 
  | 'Outros' 
  | 'Salário';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
}

export interface Budget {
  category: Category;
  limit: number;
}

export interface AIInsight {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}
