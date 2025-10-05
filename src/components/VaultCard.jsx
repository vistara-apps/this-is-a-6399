import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, ExternalLink, AlertTriangle } from 'lucide-react';
import DepositModal from './DepositModal';

const VaultCard = ({ vault, portfolioData, setPortfolioData }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Low': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'High': return 'text-accent';
      case 'Experimental': return 'text-error';
      default: return 'text-text-muted';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'Low': return <Shield className="w-4 h-4" />;
      case 'Medium': return <TrendingUp className="w-4 h-4" />;
      case 'High': return <Zap className="w-4 h-4" />;
      case 'Experimental': return <AlertTriangle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-surface border border-text-muted/20 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-card"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">{vault.name}</h3>
            <p className="text-text-muted text-sm">{vault.description}</p>
          </div>
          {vault.isStable && (
            <div className="bg-success/10 border border-success/30 rounded-full px-2 py-1">
              <span className="text-xs font-medium text-success">STABLE</span>
            </div>
          )}
        </div>

        {/* APY Display */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <motion.span 
              key={vault.currentAPY}
              initial={{ scale: 1.1, color: '#8b5cf6' }}
              animate={{ scale: 1, color: '#8b5cf6' }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold text-primary"
            >
              {vault.currentAPY}%
            </motion.span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-success font-medium">LIVE APY</span>
            </div>
          </div>
          <div className="text-sm text-text-muted">
            Performance fee: {vault.performanceFee}% on profits
          </div>
          
          {/* APY Trend Indicator */}
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success/20 rounded flex items-center justify-center">
                <div className="w-1 h-1 bg-success rounded-full"></div>
              </div>
              <span className="text-xs text-success">+2.3% (24h)</span>
            </div>
            <div className="w-px h-3 bg-text-muted/20"></div>
            <span className="text-xs text-text-muted">Trending up</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm text-text-muted">TVL</div>
            <div className="font-semibold">${(vault.tvl / 1000000).toFixed(2)}M</div>
          </div>
          <div>
            <div className="text-sm text-text-muted">Min Deposit</div>
            <div className="font-semibold">${vault.minDeposit}</div>
          </div>
        </div>

        {/* Risk Level */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-muted">Risk Level:</span>
            <div className={`flex items-center space-x-1 ${getRiskColor(vault.riskLevel)}`}>
              {getRiskIcon(vault.riskLevel)}
              <span className="text-sm font-medium">{vault.riskLevel}</span>
            </div>
          </div>
          <div className="text-xs text-text-muted">{vault.strategy}</div>
        </div>

        {/* Protocols */}
        <div className="mb-6">
          <div className="text-sm text-text-muted mb-2">Protocols</div>
          <div className="flex flex-wrap gap-1">
            {vault.protocols.map((protocol, index) => (
              <span
                key={index}
                className="bg-primary/10 border border-primary/30 rounded-md px-2 py-1 text-xs text-primary"
              >
                {protocol}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={() => setShowDepositModal(true)}
            className="w-full bg-primary hover:bg-primary/80 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>Deposit & Earn</span>
            <Zap className="w-4 h-4" />
          </button>
          <button className="w-full bg-surface border border-text-muted/20 hover:border-primary/30 text-text font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
            <span>View Details</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Last Rebalance */}
        <div className="mt-4 pt-4 border-t border-text-muted/10">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-okb-blue rounded-full animate-pulse"></div>
              <span>Last rebalanced: 2h ago</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>Next check: 4h</span>
              <div className="w-1 h-1 bg-text-muted/50 rounded-full"></div>
            </div>
          </div>
          
          {/* Activity Indicator */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: i < 3 ? 1 : 0.3 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="w-1 h-2 bg-success rounded-full"
                  />
                ))}
              </div>
              <span className="text-xs text-success">High Activity</span>
            </div>
            <div className="text-xs text-text-muted">
              {vault.tvl > 1000000 ? '🔥 Popular' : '⭐ Growing'}
            </div>
          </div>
        </div>
      </motion.div>

      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        vault={vault}
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
      />
    </>
  );
};

export default VaultCard;