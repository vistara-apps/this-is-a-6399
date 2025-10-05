import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Settings, Clock, DollarSign, TrendingUp, Pause, Play } from 'lucide-react';

const AutoCompoundEngine = ({ vaults, portfolioData, setPortfolioData }) => {
  const [compoundSettings, setCompoundSettings] = useState({
    enabled: true,
    frequency: 24, // hours
    minThreshold: 10, // minimum $10 in rewards to compound
    gasOptimization: true,
    reinvestmentStrategy: 'highest_apy' // highest_apy, balanced, conservative
  });
  
  const [compoundHistory, setCompoundHistory] = useState([]);
  const [nextCompound, setNextCompound] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [isCompounding, setIsCompounding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Simulate auto-compounding process
  useEffect(() => {
    if (!compoundSettings.enabled) return;

    const compoundInterval = setInterval(() => {
      executeAutoCompound();
    }, compoundSettings.frequency * 60 * 60 * 1000); // Convert hours to milliseconds

    return () => clearInterval(compoundInterval);
  }, [compoundSettings]);

  // Demo compound execution every 30 seconds for demonstration
  useEffect(() => {
    if (!compoundSettings.enabled) return;

    const demoInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        executeAutoCompound();
      }
    }, 30000);

    return () => clearInterval(demoInterval);
  }, [compoundSettings]);

  const executeAutoCompound = async () => {
    if (isCompounding || !compoundSettings.enabled) return;

    setIsCompounding(true);

    // Simulate compound calculation
    const totalRewards = Math.random() * 100 + 20; // $20-120 in rewards
    
    if (totalRewards < compoundSettings.minThreshold) {
      setIsCompounding(false);
      return;
    }

    // Simulate compound execution
    setTimeout(() => {
      const compoundEvent = {
        id: Date.now(),
        timestamp: new Date(),
        totalRewards: totalRewards,
        gasCost: 0.002, // X Layer gas cost
        reinvestedAmount: totalRewards - 0.002,
        strategy: compoundSettings.reinvestmentStrategy,
        vaultsAffected: vaults.slice(0, 2).map(v => v.name),
        apyBoost: Math.random() * 2 + 0.5 // 0.5-2.5% APY boost
      };

      setCompoundHistory(prev => [compoundEvent, ...prev.slice(0, 9)]); // Keep last 10 events
      
      // Update portfolio
      setPortfolioData(prev => ({
        ...prev,
        currentBalance: prev.currentBalance + compoundEvent.reinvestedAmount,
        lifetimeEarnings: prev.lifetimeEarnings + compoundEvent.totalRewards
      }));

      setNextCompound(new Date(Date.now() + compoundSettings.frequency * 60 * 60 * 1000));
      setIsCompounding(false);
    }, 3000); // 3 second simulation
  };

  const toggleAutoCompound = () => {
    setCompoundSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const updateSettings = (key, value) => {
    setCompoundSettings(prev => ({ ...prev, [key]: value }));
  };

  const getStrategyDescription = (strategy) => {
    switch (strategy) {
      case 'highest_apy': return 'Reinvest in vault with highest current APY';
      case 'balanced': return 'Distribute rewards proportionally across all vaults';
      case 'conservative': return 'Prioritize stable, low-risk vaults';
      default: return 'Custom strategy';
    }
  };

  const formatTimeUntilNext = () => {
    const now = new Date();
    const diff = nextCompound - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      {/* Auto-Compound Status Widget */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-surface/90 backdrop-blur-sm border rounded-lg p-4 ${
            compoundSettings.enabled ? 'border-primary/30' : 'border-text-muted/20'
          }`}
        >
          <div className="flex items-center space-x-4">
            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                isCompounding ? 'bg-warning animate-pulse' :
                compoundSettings.enabled ? 'bg-success animate-pulse' : 'bg-text-muted'
              }`}></div>
              <span className="text-sm font-medium">
                {isCompounding ? 'Compounding...' : 
                 compoundSettings.enabled ? 'Auto-Compound Active' : 'Auto-Compound Paused'}
              </span>
            </div>

            {/* Next Compound Timer */}
            {compoundSettings.enabled && !isCompounding && (
              <div className="flex items-center space-x-2 text-xs text-text-muted">
                <Clock className="w-3 h-3" />
                <span>Next: {formatTimeUntilNext()}</span>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleAutoCompound}
                className={`p-2 rounded-md transition-colors ${
                  compoundSettings.enabled 
                    ? 'bg-success/20 text-success hover:bg-success/30' 
                    : 'bg-text-muted/20 text-text-muted hover:bg-text-muted/30'
                }`}
              >
                {compoundSettings.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-md bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          {compoundHistory.length > 0 && (
            <div className="mt-3 pt-3 border-t border-text-muted/20 grid grid-cols-3 gap-4 text-xs">
              <div className="text-center">
                <div className="font-medium text-success">
                  ${compoundHistory.reduce((sum, event) => sum + event.totalRewards, 0).toFixed(2)}
                </div>
                <div className="text-text-muted">Total Compounded</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-okb-blue">
                  ${compoundHistory.reduce((sum, event) => sum + event.gasCost, 0).toFixed(3)}
                </div>
                <div className="text-text-muted">Gas Spent</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-primary">
                  {compoundHistory.length}
                </div>
                <div className="text-text-muted">Compounds</div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface border border-primary/30 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Auto-Compound Settings</h3>
                  <p className="text-sm text-text-muted">Configure your yield optimization</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Frequency Setting */}
                <div>
                  <label className="block text-sm font-medium mb-2">Compound Frequency</label>
                  <select
                    value={compoundSettings.frequency}
                    onChange={(e) => updateSettings('frequency', parseInt(e.target.value))}
                    className="w-full bg-bg border border-text-muted/20 rounded-lg px-3 py-2 text-text focus:border-primary focus:outline-none"
                  >
                    <option value={6}>Every 6 hours</option>
                    <option value={12}>Every 12 hours</option>
                    <option value={24}>Daily (24 hours)</option>
                    <option value={48}>Every 2 days</option>
                    <option value={168}>Weekly</option>
                  </select>
                  <p className="text-xs text-text-muted mt-1">
                    More frequent compounding = higher gas costs but better yields
                  </p>
                </div>

                {/* Minimum Threshold */}
                <div>
                  <label className="block text-sm font-medium mb-2">Minimum Threshold</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
                    <input
                      type="number"
                      value={compoundSettings.minThreshold}
                      onChange={(e) => updateSettings('minThreshold', parseFloat(e.target.value))}
                      className="w-full bg-bg border border-text-muted/20 rounded-lg pl-10 pr-3 py-2 text-text focus:border-primary focus:outline-none"
                      min="1"
                      step="1"
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    Only compound when rewards exceed this amount
                  </p>
                </div>

                {/* Reinvestment Strategy */}
                <div>
                  <label className="block text-sm font-medium mb-2">Reinvestment Strategy</label>
                  <select
                    value={compoundSettings.reinvestmentStrategy}
                    onChange={(e) => updateSettings('reinvestmentStrategy', e.target.value)}
                    className="w-full bg-bg border border-text-muted/20 rounded-lg px-3 py-2 text-text focus:border-primary focus:outline-none"
                  >
                    <option value="highest_apy">Highest APY</option>
                    <option value="balanced">Balanced Distribution</option>
                    <option value="conservative">Conservative</option>
                  </select>
                  <p className="text-xs text-text-muted mt-1">
                    {getStrategyDescription(compoundSettings.reinvestmentStrategy)}
                  </p>
                </div>

                {/* Gas Optimization */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Gas Optimization</div>
                    <div className="text-xs text-text-muted">Batch transactions to minimize costs</div>
                  </div>
                  <button
                    onClick={() => updateSettings('gasOptimization', !compoundSettings.gasOptimization)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      compoundSettings.gasOptimization ? 'bg-primary' : 'bg-text-muted/30'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        compoundSettings.gasOptimization ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 mt-8">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-primary hover:bg-primary/80 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Save Settings
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-text-muted hover:text-text transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compound History Notifications */}
      <div className="fixed top-20 right-80 z-30 space-y-2 max-w-sm">
        <AnimatePresence>
          {compoundHistory.slice(0, 3).map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.9 }}
              className="bg-primary/5 border border-primary/20 rounded-lg p-3 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Auto-Compound Executed</span>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-text-muted">Rewards:</span>
                  <span className="text-success">${event.totalRewards.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Gas Cost:</span>
                  <span className="text-okb-blue">${event.gasCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Net Gain:</span>
                  <span className="text-success">${event.reinvestedAmount.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AutoCompoundEngine;