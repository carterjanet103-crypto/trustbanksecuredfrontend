import React, { useState } from 'react';
const Security: React.FC = () => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const securitySettings = [
    {
      title: 'Two-Factor Authentication',
      description: 'Require verification code for all logins',
      enabled: twoFactor,
      toggle: () => setTwoFactor(!twoFactor)
    },
    {
      title: 'Biometric Login',
      description: 'Use fingerprint or face recognition',
      enabled: biometric,
      toggle: () => setBiometric(!biometric)
    },
    {
      title: 'Login Alerts',
      description: 'Get notified of new login attempts',
      enabled: loginAlerts,
      toggle: () => setLoginAlerts(!loginAlerts)
    }
  ];
  const recentActivity = [
    { device: 'iPhone 15 Pro', location: 'San Francisco, CA', time: '2 hours ago', status: 'current' },
    { device: 'MacBook Pro', location: 'San Francisco, CA', time: '1 day ago', status: 'active' },
    { device: 'Windows PC', location: 'New York, NY', time: '3 days ago', status: 'inactive' },
  ];
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
          Security Settings
        </h1>
        <p style={{ color: '#6b7280' }}>Protect your account with advanced security options</p>
      </div>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>
          🔐 Security Options
        </h2>
        {securitySettings.map((setting, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 0',
            borderBottom: index < securitySettings.length - 1 ? '1px solid #f3f4f6' : 'none'
          }}>
            <div>
              <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>{setting.title}</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>{setting.description}</p>
            </div>
            <button
              onClick={setting.toggle}
              style={{
                width: '52px',
                height: '28px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: setting.enabled ? '#2563eb' : '#d1d5db',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background-color 0.2s'
              }}
            >
              <span style={{
                position: 'absolute',
                top: '2px',
                left: setting.enabled ? '26px' : '2px',
                width: '24px',
                height: '24px',
                borderRadius: '12px',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                transition: 'left 0.2s'
              }} />
            </button>
          </div>
        ))}
      </div>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>
          📱 Active Sessions
        </h2>
        {recentActivity.map((session, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 0',
            borderBottom: index < recentActivity.length - 1 ? '1px solid #f3f4f6' : 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                {session.device.includes('iPhone') ? '📱' : session.device.includes('Mac') ? '💻' : '🖥️'}
              </div>
              <div>
                <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>
                  {session.device}
                  {session.status === 'current' && (
                    <span style={{
                      marginLeft: '8px',
                      padding: '2px 8px',
                      backgroundColor: '#d1fae5',
                      color: '#065f46',
                      fontSize: '11px',
                      borderRadius: '4px'
                    }}>
                      This device
                    </span>
                  )}
                </p>
                <p style={{ fontSize: '13px', color: '#6b7280' }}>{session.location} • {session.time}</p>
              </div>
            </div>
            {session.status !== 'current' && (
              <button style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #ef4444',
                color: '#ef4444',
                borderRadius: '6px',
                fontSize: '13px',
                cursor: 'pointer'
              }}>
                Revoke
              </button>
            )}
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
          🔑 Password & PIN
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <button style={{
            padding: '16px',
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'left'
          }}>
            <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Change Password</p>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>Last changed 30 days ago</p>
          </button>
          <button style={{
            padding: '16px',
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'left'
          }}>
            <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Change PIN</p>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>4-digit transaction PIN</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Security;

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
