import React from 'react';
import { useTrust } from '../TrustContext';
const Dashboard: React.FC = () => {
  const { user, transactions } = useTrust();
  const statCards = [
    { 
      title: 'Total Balance', 
      value: `$${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      color: '#2563eb'
    },
    { 
      title: 'Monthly Income', 
      value: `+$${user.monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      color: '#10b981'
    },
    { 
      title: 'Monthly Spending', 
      value: `-$${user.monthlyExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      color: '#ef4444'
    },
    { 
      title: 'Account Status', 
      value: user.accountStatus,
      color: user.accountStatus === 'Active' ? '#10b981' : '#f59e0b'
    },
  ];
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
          Welcome back, {user.name}
        </h1>
        <p style={{ color: '#6b7280' }}>Here's your financial overview</p>
      </div>
      {user.accountStatus === 'On Hold' && user.dueCharges > 0 && (
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ fontWeight: '600', color: '#92400e', marginBottom: '4px' }}>
              ⚠️ Account On Hold
            </p>
            <p style={{ color: '#a16207', fontSize: '14px' }}>
              Outstanding charges: ${user.dueCharges.toFixed(2)}. Please clear to restore full access.
            </p>
          </div>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Pay Now
          </button>
        </div>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {statCards.map((card, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{card.title}</p>
            <p style={{ 
              fontSize: card.title === 'Account Status' ? '18px' : '24px', 
              fontWeight: '700', 
              color: card.color 
            }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>
          Recent Transactions
        </h2>
        <div>
          {transactions.slice(0, 5).map((tx) => (
            <div key={tx.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 0',
              borderBottom: '1px solid #f3f4f6'
            }}>
              <div>
                <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>{tx.merchant}</p>
                <p style={{ fontSize: '13px', color: '#9ca3af' }}>
                  {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {tx.category}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontWeight: '600',
                  color: tx.type === 'DEBIT' ? '#ef4444' : '#10b981'
                }}>
                  {tx.type === 'DEBIT' ? '-' : '+'}${tx.amount.toFixed(2)}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: tx.status === 'Completed' ? '#10b981' : tx.status === 'Pending' ? '#f59e0b' : '#ef4444'
                }}>
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

App.tsx
corrected-files/src

Login.tsx
corrected-files/src/components

Dashboard.tsx
corrected-files/src/components

Sidebar.tsx
corrected-files/src/components

Cards.tsx
corrected-files/src/components

Transfers.tsx
corrected-files/src/components

Security.tsx
corrected-files/src/components
