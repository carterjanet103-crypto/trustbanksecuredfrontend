import React, { useState } from 'react';
interface LoginProps {
  onLogin: () => void;
}
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('verification');
    }, 1500);
  };
  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === '123456') {
      setIsLoading(true);
      setTimeout(() => {
        onLogin();
      }, 1000);
    } else {
      setError('Invalid verification code. Hint: 123456');
    }
  };
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '48px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1e3a8a',
            marginBottom: '8px'
          }}>TrustBank</h1>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Secure Banking Gateway</p>
        </div>
        {step === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Account Number
              </label>
              <input
                type="text"
                defaultValue="****4582"
                disabled
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: '#f9fafb',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                PIN
              </label>
              <input
                type="password"
                placeholder="Enter your PIN"
                defaultValue="****"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        )}
        {step === 'verification' && (
          <form onSubmit={handleVerificationSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                Verification Required
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                Enter the 6-digit code (Hint: 123456)
              </p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  setError('');
                  setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                }}
                placeholder="000000"
                style={{
                  width: '100%',
                  padding: '16px',
                  border: error ? '2px solid #ef4444' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '24px',
                  textAlign: 'center',
                  letterSpacing: '8px',
                  boxSizing: 'border-box'
                }}
              />
              {error && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px' }}>{error}</p>}
            </div>
            <button
              type="submit"
              disabled={isLoading || verificationCode.length !== 6}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading || verificationCode.length !== 6 ? 0.7 : 1
              }}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        )}
        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          color: '#9ca3af',
          fontSize: '12px'
        }}>
          Protected by TrustBank Secure Infrastructure
        </p>
      </div>
    </div>
  );
};
export default Login;

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
