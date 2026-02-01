import React, { useState } from 'react';
import { TrustProvider } from './TrustContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Cards from './components/Cards';
import Transfers from './components/Transfers';
import Security from './components/Security';
import './index.css';
type ViewType = 'LOGIN' | 'DASHBOARD' | 'CARDS' | 'TRANSFERS' | 'SECURITY';
function App() {
    const [currentView, setCurrentView] = useState<ViewType>('LOGIN');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleLogin = () => {
        setIsAuthenticated(true);
        setCurrentView('DASHBOARD');
    };
    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentView('LOGIN');
    };
    const renderView = () => {
        switch (currentView) {
            case 'DASHBOARD':
                return <Dashboard />;
            case 'CARDS':
                return <Cards />;
            case 'TRANSFERS':
                return <Transfers />;
            case 'SECURITY':
                return <Security />;
            default:
                return <Dashboard />;
        }
    };
    if (!isAuthenticated) {
        return (
            <TrustProvider>
                <Login onLogin={handleLogin} />
            </TrustProvider>
        );
    }
    return (
        <TrustProvider>
            <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
                <Sidebar
                    currentView={currentView}
                    onNavigate={setCurrentView}
                    onLogout={handleLogout}
                />
                <main style={{ flex: 1, padding: '24px', marginLeft: '280px' }}>
                    {renderView()}
                </main>
            </div>
        </TrustProvider>
    );
}
export default App;

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
