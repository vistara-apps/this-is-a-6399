import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import VaultGrid from './components/VaultGrid';
import Portfolio from './components/Portfolio';
import Analytics from './components/Analytics';
import RealTimeUpdates from './components/RealTimeUpdates';
import RiskMonitor from './components/RiskMonitor';
import AutoCompoundEngine from './components/AutoCompoundEngine';
import { useAccount } from 'wagmi';

function App() {
  const [activeTab, setActiveTab] = useState('vaults');
  const { isConnected } = useAccount();

  // Mock data for demonstration
  const [portfolioData, setPortfolioData] = useState({
    totalDeposited: 0,
    currentBalance: 0,
    lifetimeEarnings: 0,
    gasSavings: 0,
  });

  const [vaults, setVaults] = useState([
    {
      id: 1,
      name: 'OKB Stable Yield',
      strategy: 'Conservative',
      currentAPY: 12.5,
      tvl: 2850000,
      riskLevel: 'Low',
      performanceFee: 2,
      description: 'USDT/USDC lending + OKB staking',
      protocols: ['Aave V3', 'OKB Staking'],
      minDeposit: 100,
      isStable: true,
    },
    {
      id: 2,
      name: 'Auto-Compound DEX',
      strategy: 'Balanced',
      currentAPY: 28.7,
      tvl: 1650000,
      riskLevel: 'Medium',
      performanceFee: 2,
      description: 'OKX DEX farming with auto-compounding',
      protocols: ['OKX DEX', 'Compound V3'],
      minDeposit: 250,
      isStable: false,
    },
    {
      id: 3,
      name: 'Leveraged OKX Ecosystem',
      strategy: 'Aggressive',
      currentAPY: 45.2,
      tvl: 890000,
      riskLevel: 'High',
      performanceFee: 2.5,
      description: 'Delta-neutral farming + flash loans',
      protocols: ['OKX DEX', 'Flash Loans', 'Perp Dex'],
      minDeposit: 1000,
      isStable: false,
    },
    {
      id: 4,
      name: 'OKB Arbitrage',
      strategy: 'Experimental',
      currentAPY: 62.1,
      tvl: 420000,
      riskLevel: 'Experimental',
      performanceFee: 3,
      description: 'CEX-DEX arbitrage opportunities',
      protocols: ['OKX CEX API', 'OKX DEX', 'MEV'],
      minDeposit: 2500,
      isStable: false,
    },
  ]);

  // Simulate real-time APY updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would fetch real APY data in production
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-bg gradient-bg">
      <Header />
      
      {/* Real-time Updates */}
      {isConnected && (
        <RealTimeUpdates vaults={vaults} setVaults={setVaults} />
      )}
      
      {/* Risk Monitoring */}
      {isConnected && (
        <RiskMonitor vaults={vaults} portfolioData={portfolioData} />
      )}
      
      {/* Auto-Compound Engine */}
      {isConnected && portfolioData.currentBalance > 0 && (
        <AutoCompoundEngine 
          vaults={vaults} 
          portfolioData={portfolioData}
          setPortfolioData={setPortfolioData}
        />
      )}
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-8 mb-8 border-b border-text-muted/20">
          {[
            { id: 'vaults', label: 'Vaults', icon: '🏦' },
            { id: 'portfolio', label: 'Portfolio', icon: '📊' },
            { id: 'analytics', label: 'Analytics', icon: '📈' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary text-text'
                  : 'border-transparent text-text-muted hover:text-text'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'vaults' && (
            <VaultGrid 
              vaults={vaults} 
              portfolioData={portfolioData}
              setPortfolioData={setPortfolioData}
            />
          )}
          {activeTab === 'portfolio' && (
            <Portfolio 
              portfolioData={portfolioData}
              setPortfolioData={setPortfolioData}
              vaults={vaults}
            />
          )}
          {activeTab === 'analytics' && (
            <Analytics vaults={vaults} />
          )}
        </motion.div>

        {/* Connection Prompt */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-surface border border-primary/30 rounded-xl p-8 max-w-md text-center">
              <div className="text-6xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-text-muted mb-6">
                Connect your OKX Wallet or any Web3 wallet to start earning yields on X Layer
              </p>
              <div className="text-sm text-text-muted">
                <p>• Low gas costs (~$0.001 per transaction)</p>
                <p>• 2-second transaction finality</p>
                <p>• Native OKB rewards</p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;