import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { TrendingUp, Zap, AlertTriangle } from 'lucide-react';
import EmergencyExit from './EmergencyExit';

const Header = ({ portfolioData, setPortfolioData, vaults }) => {
  const { address, isConnected } = useAccount();
  const [showEmergencyExit, setShowEmergencyExit] = useState(false);
  const { data: balance } = useBalance({
    address,
    chainId: 196, // X Layer
  });

  return (
    <header className="border-b border-text-muted/10 bg-surface/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-okb-blue rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">YieldLayer</h1>
              <p className="text-xs text-text-muted">Auto-compounding DeFi yields</p>
            </div>
          </div>

          {/* Network Info & Wallet */}
          <div className="flex items-center space-x-4">
            {/* X Layer Badge */}
            <div className="hidden sm:flex items-center space-x-2 bg-okb-blue/10 border border-okb-blue/30 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 bg-okb-blue rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-okb-blue">X Layer</span>
              <span className="text-xs text-text-muted">196</span>
            </div>

            {/* Balance Display */}
            {isConnected && balance && (
              <div className="hidden md:flex items-center space-x-2 bg-surface border border-text-muted/20 rounded-lg px-3 py-1.5">
                <span className="text-sm text-text-muted">Balance:</span>
                <span className="text-sm font-medium">
                  {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                </span>
              </div>
            )}

            {/* Emergency Exit Button */}
            {isConnected && portfolioData?.currentBalance > 0 && (
              <button
                onClick={() => setShowEmergencyExit(true)}
                className="hidden md:flex items-center space-x-2 bg-error/10 border border-error/30 hover:bg-error/20 text-error px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency Exit</span>
              </button>
            )}

            {/* Connect Wallet Button */}
            <div className="flex items-center">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>

      <EmergencyExit
        isOpen={showEmergencyExit}
        onClose={() => setShowEmergencyExit(false)}
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
        vaults={vaults}
      />
    </header>
  );
};

export default Header;