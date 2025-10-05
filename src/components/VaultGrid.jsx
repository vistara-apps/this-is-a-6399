import React from 'react';
import VaultCard from './VaultCard';
import { useAccount } from 'wagmi';

const VaultGrid = ({ vaults, portfolioData, setPortfolioData }) => {
  const { isConnected } = useAccount();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">DeFi Yield Vaults</h2>
        <p className="text-text-muted max-w-2xl mx-auto">
          Automated yield optimization across OKX DEX, lending protocols, and liquidity pools on X Layer. 
          Set and forget with intelligent rebalancing and auto-compounding.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total TVL', value: '$' + (vaults.reduce((sum, v) => sum + v.tvl, 0) / 1000000).toFixed(1) + 'M' },
          { label: 'Active Vaults', value: vaults.length },
          { label: 'Avg APY', value: (vaults.reduce((sum, v) => sum + v.currentAPY, 0) / vaults.length).toFixed(1) + '%' },
          { label: 'Gas Saved', value: '99.8%' },
        ].map((stat, index) => (
          <div key={index} className="bg-surface border border-text-muted/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Vault Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {vaults.map((vault) => (
          <VaultCard 
            key={vault.id} 
            vault={vault}
            portfolioData={portfolioData}
            setPortfolioData={setPortfolioData}
          />
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {[
          {
            icon: '⚡',
            title: 'Auto-Rebalancing',
            description: 'Continuously monitors yields across protocols and shifts capital every 6 hours to maximize returns',
          },
          {
            icon: '🔄',
            title: 'Auto-Compounding',
            description: 'Daily reward harvesting and reinvestment with sub-cent gas costs on X Layer',
          },
          {
            icon: '🛡️',
            title: 'Emergency Exit',
            description: 'One-click withdrawal from all positions with 2-second finality on X Layer',
          },
          {
            icon: '📊',
            title: 'Real-Time Analytics',
            description: 'Live APY tracking, performance charts, and gas cost savings vs Ethereum',
          },
          {
            icon: '🎯',
            title: 'Risk Management',
            description: 'Automated circuit breakers and position monitoring with transparent risk scoring',
          },
          {
            icon: '💎',
            title: 'OKB Integration',
            description: 'Native OKB rewards and unique arbitrage opportunities in the OKX ecosystem',
          },
        ].map((feature, index) => (
          <div key={index} className="bg-surface border border-text-muted/20 rounded-lg p-6 hover:border-primary/30 transition-colors">
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-text-muted text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaultGrid;