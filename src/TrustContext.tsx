import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, Transaction, TransactionType, TransactionCategory } from './types';
import { CURRENT_USER, MOCK_TRANSACTIONS } from './constants';

interface TrustContextType {
  user: User;
  transactions: Transaction[];
  handleTransaction: (tx: Transaction) => void;
  handlePayCharges: () => void;
  updateNote: (id: string, note: string) => void;
}

const TrustContext = createContext<TrustContextType | undefined>(undefined);

export const TrustProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(CURRENT_USER);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  const handleTransaction = useCallback((tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
    setUser(prev => ({
      ...prev,
      balance: Math.round((prev.balance + (tx.type === TransactionType.DEBIT ? -tx.amount : tx.amount)) * 100) / 100,
    }));
  }, []);

  const handlePayCharges = useCallback(() => {
    const amount = user.dueCharges;
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      date: new Date().toISOString(),
      merchant: 'TrustBank Fees',
      amount,
      type: TransactionType.DEBIT,
      category: TransactionCategory.FEES,
      status: 'Completed',
      location: 'System Charge',
      note: 'Payment for outstanding charges',
    };
    setTransactions(prev => [newTx, ...prev]);
    setUser(prev => ({
      ...prev,
      balance: Math.round((prev.balance - amount) * 100) / 100,
      accountStatus: 'Active',
      dueCharges: 0,
    }));
  }, [user.dueCharges]);

  const updateNote = (id: string, note: string) => {
    setTransactions(prev => prev.map(t => (t.id === id ? { ...t, note } : t)));
  };

  return (
    <TrustContext.Provider value={{ user, transactions, handleTransaction, handlePayCharges, updateNote }}>
      {children}
    </TrustContext.Provider>
  );
};

export const useTrust = () => {
  const context = useContext(TrustContext);
  if (!context) throw new Error('useTrust must be used within a TrustProvider');
  return context;
};
