import React, { useState, useCallback } from 'react';
import { useTrust } from './TrustContext';

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Transfers from './components/Transfers';
import Security from './components/Security';
import Cards from './components/Cards';
import Home from './components/Home';

const App: React.FC = () => {
  const { user, transactions } = useTrust();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [viewState, setViewState] = useState(() => {
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('trustbank_session') === 'active';
      return isAuth ? { view: 'DASHBOARD' } : { view: 'HOME' };
    }
    return { view: 'HOME' };
  });

  const handleLogin = useCallback(() => {
    sessionStorage.setItem('trustbank_session', 'active');
    setViewState({ view: 'DASHBOARD' });
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('trustbank_session');
    setViewState({ view: 'HOME' });
  }, []);

  if (viewState.view === 'HOME')
    return <Home onStart={() => setViewState({ view: 'LOGIN
