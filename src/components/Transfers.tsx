import React from 'react';
const Transfers: React.FC = () => {
  return (
    <div className="transfers-container" style={{
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '16px'
      }}>Transfers</h2>
      <p style={{
        color: '#6b7280',
        marginBottom: '24px'
      }}>Send and receive money securely with TrustBank.</p>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <button style={{
          padding: '12px 24px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Send Money
        </button>
        <button style={{
          padding: '12px 24px',
          backgroundColor: '#f3f4f6',
          color: '#1f2937',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Request Money
        </button>
      </div>
    </div>
  );
};
export default Transfers;
