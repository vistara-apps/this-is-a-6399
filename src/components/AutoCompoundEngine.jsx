import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Clock, CheckCircle, Activity, DollarSign } from 'lucide-react';

const AutoCompoundEngine = ({ vaults }) => {
  const [compoundEvents, setCompoundEvents] = useState([
    {
      id: 1,
      vaultName: 'OKB Stable Yield',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      rewardsHarvested: 42.18,
      amountReinvested: 41.95,
      gasCost: 0.23,
      txHash: '0x1234...5678',
      status: 'completed',
    },
    {
      id: 2,
      vaultName: 'Auto-Compound DEX',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      rewardsHarvested: 128.45,
      amountReinvested: 127.89,
      gasCost: 0.56,
      txHash: '0xabcd...efgh',
      status: 'completed',
    },
    {
      id: 3,
      vaultName: 'Leveraged OKX Ecosystem',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      rewardsHarvested: 234.67,
      amountReinvested: 233.78,
      gasCost: 0.89,
      txHash: '0x9876...5432',
      status: 'completed',
    },
  ]);

  const [nextCompounds, setNextCompounds] = useState([
    {
      vaultName: 'OKB Stable Yield',
      nextCompound: new Date(Date.now() + 22 * 60 * 60 * 1000), // 22 hours from now
      estimatedRewards: 38.92,
      efficiency: 98.5,
    },
    {
      vaultName: 'Auto-Compound DEX',
      nextCompound: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
      estimatedRewards: 142.33,
      efficiency: 97.8,
    },
    {
      vaultName: 'Leveraged OKX Ecosystem',
      nextCompound: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
      estimatedRewards: 298.45,
      efficiency: 96.2,
    },
  ]);

  const [totalStats, setTotalStats] = useState({
    totalCompounded: 15420.45,
    gasSaved: 2340.67,
    efficiencyGain: 28.5,
    activeVaults: 3,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNextCompounds(prev => prev.map(compound => ({
        ...compound,
        nextCompound: new Date(compound.nextCompound.getTime() - 60000), // Subtract 1 minute
      })));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatTimeUntil = (date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    if (diff <= 0) return 'Processing...';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ago`;
    }
    return `${minutes}m ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Auto-Compound Engine</h2>
        <p className="text-text-muted max-w-2xl mx-auto">
          Automated reward harvesting and reinvestment powered by X Layer's low gas costs
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-sm text-text-muted">Total Compounded</div>
              <div className="text-2xl font-bold">${totalStats.totalCompounded.toLocaleString()}</div>
            </div>
          </div>
          <div className="text-xs text-success">+{totalStats.efficiencyGain}% efficiency gain</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-okb-blue/10 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-okb-blue" />
            </div>
            <div>
              <div className="text-sm text-text-muted">Gas Saved</div>
              <div className="text-2xl font-bold text-okb-blue">${totalStats.gasSaved.toLocaleString()}</div>
            </div>
          </div>
          <div className="text-xs text-text-muted">vs manual compounding</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-text-muted">Active Vaults</div>
              <div className="text-2xl font-bold">{totalStats.activeVaults}</div>
            </div>
          </div>
          <div className="text-xs text-text-muted">Auto-compounding enabled</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-warning" />
            </div>
            <div>
              <div className="text-sm text-text-muted">Avg Efficiency</div>
              <div className="text-2xl font-bold">97.5%</div>
            </div>
          </div>
          <div className="text-xs text-success">Optimal performance</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Next Compounds */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Upcoming Compounds</h3>
          
          <div className="space-y-4">
            {nextCompounds.map((compound, index) => (
              <div key={index} className="bg-bg/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{compound.vaultName}</h4>
                    <p className="text-sm text-text-muted">
                      Est. rewards: ${compound.estimatedRewards.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {formatTimeUntil(compound.nextCompound)}
                    </div>
                    <div className="text-xs text-text-muted">Next compound</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-success">Active</span>
                  </div>
                  <div className="text-sm text-text-muted">
                    {compound.efficiency}% efficiency
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full bg-text-muted/10 rounded-full h-1.5">
                    <div
                      className="h-1.5 bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${compound.efficiency}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Compound Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Recent Compound Events</h3>
          
          <div className="space-y-4">
            {compoundEvents.map((event) => (
              <div key={event.id} className="bg-bg/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{event.vaultName}</h4>
                      <p className="text-xs text-text-muted">
                        {formatTimeAgo(event.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">
                      +${event.amountReinvested.toFixed(2)}
                    </div>
                    <div className="text-xs text-text-muted">Reinvested</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-text-muted">Rewards Harvested</div>
                    <div className="font-medium">${event.rewardsHarvested.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-text-muted">Gas Cost</div>
                    <div className="font-medium text-okb-blue">${event.gasCost.toFixed(3)}</div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-text-muted/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">
                      TX: {event.txHash}
                    </span>
                    <span className="text-success">
                      {((event.amountReinvested / event.rewardsHarvested) * 100).toFixed(1)}% efficiency
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Compound Strategy Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-primary/5 to-okb-blue/5 border border-primary/20 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold mb-4">How Auto-Compounding Works</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">1. Monitor</h4>
            <p className="text-sm text-text-muted">
              Continuously track pending rewards across all protocols
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <h4 className="font-semibold mb-2">2. Harvest</h4>
            <p className="text-sm text-text-muted">
              Automatically claim rewards when threshold is met ($10+)
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-okb-blue/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-okb-blue" />
            </div>
            <h4 className="font-semibold mb-2">3. Swap</h4>
            <p className="text-sm text-text-muted">
              Convert rewards to base assets via OKX DEX aggregator
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-warning" />
            </div>
            <h4 className="font-semibold mb-2">4. Reinvest</h4>
            <p className="text-sm text-text-muted">
              Deploy capital into highest-yield strategies automatically
            </p>
          </div>
        </div>

        <div className="mt-6 bg-bg/50 rounded-lg p-4">
          <h4 className="font-semibold mb-3">X Layer Advantages</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-okb-blue rounded-full"></div>
              <span>Daily compounding profitable at $100+ deposits</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Sub-cent gas costs enable frequent harvesting</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>2-second finality for rapid reinvestment</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>Batched transactions reduce per-user costs</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AutoCompoundEngine;