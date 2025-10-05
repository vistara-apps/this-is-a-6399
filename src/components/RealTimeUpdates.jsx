import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Zap, RotateCcw, Bell, X } from 'lucide-react';

const RealTimeUpdates = ({ vaults, setVaults }) => {
  const [notifications, setNotifications] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time APY updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setVaults(prevVaults => {
        const updatedVaults = prevVaults.map(vault => {
          // Simulate APY fluctuations based on vault risk level
          const volatility = {
            'Low': 0.1,
            'Medium': 0.3,
            'High': 0.5,
            'Experimental': 0.8
          }[vault.riskLevel] || 0.1;

          const change = (Math.random() - 0.5) * volatility;
          const newAPY = Math.max(0.1, vault.currentAPY + change);
          
          // Create notification for significant changes
          if (Math.abs(change) > volatility * 0.7) {
            const notification = {
              id: Date.now() + Math.random(),
              type: change > 0 ? 'apy_increase' : 'apy_decrease',
              vault: vault.name,
              oldAPY: vault.currentAPY,
              newAPY: newAPY,
              change: change,
              timestamp: new Date()
            };
            
            setNotifications(prev => [notification, ...prev.slice(0, 4)]);
          }

          return {
            ...vault,
            currentAPY: parseFloat(newAPY.toFixed(1))
          };
        });
        
        setLastUpdate(new Date());
        return updatedVaults;
      });
    }, 15000); // Update every 15 seconds for demo

    return () => clearInterval(updateInterval);
  }, [setVaults]);

  // Simulate rebalancing events
  useEffect(() => {
    const rebalanceInterval = setInterval(() => {
      // Randomly trigger rebalancing notifications
      if (Math.random() > 0.7) {
        const vault = vaults[Math.floor(Math.random() * vaults.length)];
        const notification = {
          id: Date.now() + Math.random(),
          type: 'rebalance',
          vault: vault.name,
          fromProtocol: vault.protocols[0],
          toProtocol: vault.protocols[1] || 'New Protocol',
          amount: Math.floor(Math.random() * 50000) + 10000,
          timestamp: new Date()
        };
        
        setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      }
    }, 45000); // Rebalance notifications every 45 seconds

    return () => clearInterval(rebalanceInterval);
  }, [vaults]);

  // Simulate auto-compound events
  useEffect(() => {
    const compoundInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        const vault = vaults[Math.floor(Math.random() * vaults.length)];
        const notification = {
          id: Date.now() + Math.random(),
          type: 'compound',
          vault: vault.name,
          rewards: Math.floor(Math.random() * 500) + 50,
          timestamp: new Date()
        };
        
        setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      }
    }, 30000); // Compound notifications every 30 seconds

    return () => clearInterval(compoundInterval);
  }, [vaults]);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'apy_increase': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'apy_decrease': return <TrendingDown className="w-4 h-4 text-warning" />;
      case 'rebalance': return <RotateCcw className="w-4 h-4 text-okb-blue" />;
      case 'compound': return <Zap className="w-4 h-4 text-primary" />;
      default: return <Bell className="w-4 h-4 text-text-muted" />;
    }
  };

  const getNotificationMessage = (notification) => {
    switch (notification.type) {
      case 'apy_increase':
        return `${notification.vault} APY increased to ${notification.newAPY.toFixed(1)}% (+${notification.change.toFixed(1)}%)`;
      case 'apy_decrease':
        return `${notification.vault} APY adjusted to ${notification.newAPY.toFixed(1)}% (${notification.change.toFixed(1)}%)`;
      case 'rebalance':
        return `${notification.vault} rebalanced $${notification.amount.toLocaleString()} from ${notification.fromProtocol} to ${notification.toProtocol}`;
      case 'compound':
        return `${notification.vault} auto-compounded $${notification.rewards} in rewards`;
      default:
        return 'System update';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'apy_increase': return 'border-success/30 bg-success/5';
      case 'apy_decrease': return 'border-warning/30 bg-warning/5';
      case 'rebalance': return 'border-okb-blue/30 bg-okb-blue/5';
      case 'compound': return 'border-primary/30 bg-primary/5';
      default: return 'border-text-muted/20 bg-surface';
    }
  };

  return (
    <>
      {/* Live Status Indicator */}
      <div className="fixed top-4 right-4 z-40">
        <div className="flex items-center space-x-2 bg-surface/80 backdrop-blur-sm border border-success/30 rounded-lg px-3 py-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-success">LIVE</span>
          <span className="text-xs text-text-muted">
            Updated {Math.floor((new Date() - lastUpdate) / 1000)}s ago
          </span>
        </div>
      </div>

      {/* Real-time Notifications */}
      <div className="fixed top-20 right-4 z-30 space-y-2 max-w-sm">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.9 }}
              className={`p-4 rounded-lg border backdrop-blur-sm ${getNotificationColor(notification.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {getNotificationMessage(notification)}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-text-muted hover:text-text transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* APY Trend Indicators */}
      <div className="fixed bottom-4 right-4 z-30">
        <div className="bg-surface/80 backdrop-blur-sm border border-text-muted/20 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-sm font-medium">Market Trends</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-text-muted">DeFi TVL:</span>
              <span className="text-success">+2.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">OKB Price:</span>
              <span className="text-success">+1.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Gas Price:</span>
              <span className="text-okb-blue">0.001 OKB</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RealTimeUpdates;