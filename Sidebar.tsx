

Add context
Media
Mentions





Sidebar.tsx
corrected-files/src/components



import React from 'react';
import { useTrust } from '../TrustContext';
type ViewType = 'LOGIN' | 'DASHBOARD' | 'CARDS' | 'TRANSFERS' | 'SECURITY';
interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onLogout: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onLogout }) => {
  const { user } = useTrust();
  const menuItems: { id: ViewType; label: string; icon: string }[] = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: '🏠' },
    { id: 'CARDS', label: 'Cards', icon: '💳' },
    { id: 'TRANSFERS', label: 'Transfers', icon: '↔️' },
    { id: 'SECURITY', label: 'Security', icon: '🔒' },
  ];
  return (
    <aside style={{
      width: '280px',
      backgroundColor: '#1e3a8a',
      color: 'white',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>TrustBank</h1>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px' }}>
          SECURE ASSET MANAGEMENT
        </p>
      </div>
      <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <p style={{ fontWeight: '600', marginBottom: '4px' }}>{user.name}</p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{user.accountNumber}</p>
      </div>
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              backgroundColor: currentView === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '15px',
              fontWeight: currentView === item.id ? '600' : '400',
              cursor: 'pointer',
              marginBottom: '4px',
              textAlign: 'left'
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div style={{ padding: '24px' }}>
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
