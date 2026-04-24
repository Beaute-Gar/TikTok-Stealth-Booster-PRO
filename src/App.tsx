/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import { AppState, TikTokAccount } from './types';

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('nexus_analytics_state');
    const defaults: AppState = {
      isOnboarded: false,
      acceptedTerms: false,
      country: 'Cameroon',
      currentTab: 'overview',
      accounts: {},
      commissions: []
    };
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed, accounts: { ...defaults.accounts, ...parsed.accounts } };
      } catch (e) {
        return defaults;
      }
    }
    return defaults;
  });

  useEffect(() => {
    localStorage.setItem('nexus_analytics_state', JSON.stringify(state));
  }, [state]);

  const handleOnboardingComplete = (account: TikTokAccount, country: string) => {
    setState(prev => ({
      ...prev,
      isOnboarded: true,
      currentAccount: account,
      accounts: {
        ...prev.accounts,
        tiktok: account
      },
      commissions: [
        {
          id: 'comm_001',
          amount: Math.floor(account.monetizationStatus.estimatedEarnings * 0.15),
          date: new Date().toISOString(),
          status: 'pending',
          platform: 'tiktok'
        }
      ],
      country: country as any,
      trialExpiresAt: Date.now() + (2 * 24 * 60 * 60 * 1000) // 2 days trial
    }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] selection:bg-orange-500/30">
      <AnimatePresence mode="wait">
        {!state.isOnboarded ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-auto bg-[#050505]"
          >
            <Onboarding onComplete={handleOnboardingComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen"
          >
            <Dashboard 
              state={state} 
              setState={(updates) => setState(prev => ({ ...prev, ...updates }))} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

