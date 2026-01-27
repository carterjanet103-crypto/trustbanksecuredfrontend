
export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export enum TransactionCategory {
  FOOD = 'Food & Dining',
  SHOPPING = 'Shopping',
  TRANSPORT = 'Transportation',
  UTILITIES = 'Utilities',
  ENTERTAINMENT = 'Entertainment',
  INCOME = 'Income',
  TRANSFER = 'Transfer',
  GOAL = 'Savings Goal',
  FEES = 'Bank Fees',
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  status: 'Pending' | 'Completed' | 'Failed';
  location?: string;
  cardLast4?: string;
  reviewed?: boolean;
  note?: string;
  referenceNumber?: string;
}

export interface User {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  accountStatus: 'Active' | 'On Hold';
  dueCharges: number;
}

export type ViewType = 
  | 'HOME' 
  | 'LOGIN' 
  | 'DASHBOARD' 
  | 'PAYMENT_REQUIRED'
  | 'RECEIPT' 
  | 'RECEIPTS_INDEX' 
  | 'CARDS' 
  | 'STATEMENTS' 
  | 'TRANSFERS' 
  | 'TOOLS'
  | 'SETTINGS' 
  | 'SUPPORT';

export type ViewState = 
  | { view: Exclude<ViewType, 'RECEIPT'> }
  | { view: 'RECEIPT'; transactionId: string };
