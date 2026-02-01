import React, { useState } from 'react';
import { useTrust } from '../TrustContext';
const Cards: React.FC = () => {
  const { user } = useTrust();
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
          My Cards
        </h1>
        <p style={{ color: '#6b7280' }}>Manage your physical and virtual cards</p>
      </div>
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        borderRadius: '20px',
        padding: '32px',
        color: 'white',
        maxWidth: '420px',
        marginBottom: '32px',
        boxShadow: '0 20px 40px rgba(30, 58, 138, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <span style={{ fontSize: '20px', fontWeight: '600' }}>TrustBank</span>
          <span style={{ fontSize: '14px', opacity: 0.8 }}>VISA</span>
        </div>
        
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '22px', letterSpacing: '3px', fontFamily: 'monospace' }}>
            {showDetails ? '4482 9901 2234 8829' : '•••• •••• •••• 8829'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontSize: '11px', opacity: 0.7, marginBottom: '4px' }}>CARD HOLDER</p>
            <p style={{ fontSize: '14px', fontWeight: '500' }}>{user.name.toUpperCase()}</p>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '11px', opacity: 0.7, marginBottom: '4px' }}>EXPIRES</p>
              <p style={{ fontSize: '14px' }}>09/29</p>
            </div>
            <div>
              <p style={{ fontSize: '11px', opacity: 0.7, marginBottom: '4px' }}>CVV</p>
              <p style={{ fontSize: '14px' }}>{showDetails ? '103' : '•••'}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowDetails(!showDetails)}
        style={{
          padding: '12px 24px',
          backgroundColor: showDetails ? '#ef4444' : '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: '32px'
        }}
      >
        {showDetails ? '🙈 Hide Details' : '👁️ Show Details'}
      </button>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          {[
            { icon: '❄️', label: 'Freeze Card' },
            { icon: '🔐', label: 'Change PIN' },
            { icon: '📊', label: 'Spend Limits' },
            { icon: '🔔', label: 'Notifications' }
          ].map((action, i) => (
            <button key={i} style={{
              padding: '20px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              cursor: 'pointer',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>{action.icon}</span>
              <span style={{ fontSize: '14px', color: '#374151' }}>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginTop: '24px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
          💳 Spend Limit
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#6b7280' }}>$3,200 / $12,500</span>
          <span style={{ fontWeight: '600', color: '#10b981' }}>$9,300 remaining</span>
        </div>
        <div style={{
          height: '8px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '25.6%',
            height: '100%',
            backgroundColor: '#2563eb',
            borderRadius: '4px'
          }} />
        </div>
      </div>
    </div>
  );
};
export default Cards;
