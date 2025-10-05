import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, Activity, Pause, Play, TrendingDown } from 'lucide-react';

const RiskMonitor = ({ vaults, portfolioData }) => {
  const [riskAlerts, setRiskAlerts] = useState([]);
  const [circuitBreakers, setCircuitBreakers] = useState({});
  const [systemStatus, setSystemStatus] = useState('normal'); // normal, warning, critical

  // Risk thresholds
  const RISK_THRESHOLDS = {
    apy_drop: 50, // 50% APY drop triggers alert
    volatility: 30, // 30% volatility in 24h
    tvl_drop: 25, // 25% TVL drop
    gas_spike: 1000, // 1000% gas price increase
  };

  // Monitor risk conditions
  useEffect(() => {
    const checkRiskConditions = () => {
      const newAlerts = [];
      const newCircuitBreakers = { ...circuitBreakers };

      vaults.forEach(vault => {
        // Simulate risk conditions
        const riskScore = calculateRiskScore(vault);
        const volatility = Math.random() * 40; // Mock volatility
        const tvlChange = (Math.random() - 0.5) * 60; // Mock TVL change

        // APY Drop Alert
        if (vault.currentAPY < vault.currentAPY * (1 - RISK_THRESHOLDS.apy_drop / 100)) {
          newAlerts.push({
            id: `apy_drop_${vault.id}`,
            type: 'apy_drop',
            severity: 'high',
            vault: vault.name,
            message: `APY dropped by ${RISK_THRESHOLDS.apy_drop}% in ${vault.name}`,
            timestamp: new Date(),
            action: 'Consider emergency exit or rebalancing'
          });
        }

        // High Volatility Alert
        if (volatility > RISK_THRESHOLDS.volatility) {
          newAlerts.push({
            id: `volatility_${vault.id}`,
            type: 'volatility',
            severity: 'medium',
            vault: vault.name,
            message: `High volatility detected: ${volatility.toFixed(1)}%`,
            timestamp: new Date(),
            action: 'Monitoring position closely'
          });
        }

        // Circuit Breaker Logic
        if (riskScore > 8 || volatility > 35) {
          newCircuitBreakers[vault.id] = {
            triggered: true,
            reason: riskScore > 8 ? 'High risk score' : 'Extreme volatility',
            timestamp: new Date()
          };
        }
      });

      // System-wide risk assessment
      const avgRisk = vaults.reduce((sum, v) => sum + calculateRiskScore(v), 0) / vaults.length;
      if (avgRisk > 7) {
        setSystemStatus('critical');
      } else if (avgRisk > 5) {
        setSystemStatus('warning');
      } else {
        setSystemStatus('normal');
      }

      setRiskAlerts(newAlerts);
      setCircuitBreakers(newCircuitBreakers);
    };

    const interval = setInterval(checkRiskConditions, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [vaults, circuitBreakers]);

  const calculateRiskScore = (vault) => {
    // Risk scoring based on vault characteristics
    const riskMultipliers = {
      'Low': 1,
      'Medium': 3,
      'High': 6,
      'Experimental': 9
    };
    
    const baseRisk = riskMultipliers[vault.riskLevel] || 1;
    const apyRisk = vault.currentAPY > 50 ? 2 : vault.currentAPY > 25 ? 1.5 : 1;
    const tvlRisk = vault.tvl < 500000 ? 1.5 : 1;
    
    return Math.min(10, baseRisk * apyRisk * tvlRisk);
  };

  const toggleCircuitBreaker = (vaultId) => {
    setCircuitBreakers(prev => ({
      ...prev,
      [vaultId]: {
        ...prev[vaultId],
        triggered: !prev[vaultId]?.triggered,
        timestamp: new Date()
      }
    }));
  };

  const dismissAlert = (alertId) => {
    setRiskAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getSystemStatusColor = () => {
    switch (systemStatus) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-success';
    }
  };

  const getSystemStatusIcon = () => {
    switch (systemStatus) {
      case 'critical': return <AlertTriangle className="w-5 h-5" />;
      case 'warning': return <Activity className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <>
      {/* Risk Status Widget */}
      <div className="fixed bottom-20 left-4 z-30">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className={`bg-surface/90 backdrop-blur-sm border rounded-lg p-4 ${
            systemStatus === 'critical' ? 'border-error/30' :
            systemStatus === 'warning' ? 'border-warning/30' :
            'border-success/30'
          }`}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className={`${getSystemStatusColor()}`}>
              {getSystemStatusIcon()}
            </div>
            <div>
              <div className="text-sm font-medium">Risk Monitor</div>
              <div className={`text-xs capitalize ${getSystemStatusColor()}`}>
                {systemStatus}
              </div>
            </div>
          </div>

          {/* Risk Metrics */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-muted">Active Alerts:</span>
              <span className={riskAlerts.length > 0 ? 'text-warning' : 'text-success'}>
                {riskAlerts.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Circuit Breakers:</span>
              <span className={Object.values(circuitBreakers).some(cb => cb.triggered) ? 'text-error' : 'text-success'}>
                {Object.values(circuitBreakers).filter(cb => cb.triggered).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Avg Risk Score:</span>
              <span className={`${
                vaults.reduce((sum, v) => sum + calculateRiskScore(v), 0) / vaults.length > 6 ? 'text-error' :
                vaults.reduce((sum, v) => sum + calculateRiskScore(v), 0) / vaults.length > 4 ? 'text-warning' :
                'text-success'
              }`}>
                {(vaults.reduce((sum, v) => sum + calculateRiskScore(v), 0) / vaults.length).toFixed(1)}/10
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risk Alerts */}
      <div className="fixed top-20 left-4 z-30 space-y-2 max-w-sm">
        <AnimatePresence>
          {riskAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -300, scale: 0.9 }}
              className={`p-4 rounded-lg border backdrop-blur-sm ${
                alert.severity === 'high' ? 'border-error/30 bg-error/5' :
                alert.severity === 'medium' ? 'border-warning/30 bg-warning/5' :
                'border-text-muted/20 bg-surface/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    <AlertTriangle className={`w-4 h-4 ${
                      alert.severity === 'high' ? 'text-error' :
                      alert.severity === 'medium' ? 'text-warning' :
                      'text-text-muted'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-text-muted mt-1">{alert.action}</p>
                    <p className="text-xs text-text-muted">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="text-text-muted hover:text-text transition-colors ml-2"
                >
                  ×
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Circuit Breaker Controls */}
      {Object.keys(circuitBreakers).length > 0 && (
        <div className="fixed bottom-4 left-4 z-30">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface/90 backdrop-blur-sm border border-error/30 rounded-lg p-4 max-w-xs"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Pause className="w-4 h-4 text-error" />
              <span className="text-sm font-medium text-error">Circuit Breakers</span>
            </div>
            
            <div className="space-y-2">
              {Object.entries(circuitBreakers).map(([vaultId, breaker]) => {
                const vault = vaults.find(v => v.id === parseInt(vaultId));
                if (!vault || !breaker.triggered) return null;
                
                return (
                  <div key={vaultId} className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-medium">{vault.name}</div>
                      <div className="text-text-muted">{breaker.reason}</div>
                    </div>
                    <button
                      onClick={() => toggleCircuitBreaker(parseInt(vaultId))}
                      className="text-success hover:text-success/80 transition-colors"
                    >
                      <Play className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-3 pt-3 border-t border-text-muted/20">
              <p className="text-xs text-text-muted">
                Deposits paused for safety. Manual override available.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default RiskMonitor;