import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, TrendingDown, TrendingUp, Activity, Zap } from 'lucide-react';

const RiskManagement = ({ vaults }) => {
  const [riskMetrics, setRiskMetrics] = useState({
    overallRiskScore: 3.2,
    volatilityIndex: 12.5,
    liquidityRisk: 'Low',
    protocolRisk: 'Medium',
    marketRisk: 'Low',
    lastUpdate: new Date(),
  });

  const [circuitBreakers, setCircuitBreakers] = useState([
    {
      id: 1,
      name: 'APY Drop Protection',
      description: 'Pause deposits if vault APY drops >50%',
      isActive: true,
      threshold: '50%',
      status: 'Normal',
    },
    {
      id: 2,
      name: 'Volatility Monitor',
      description: 'Alert if price volatility exceeds 20%',
      isActive: true,
      threshold: '20%',
      status: 'Normal',
    },
    {
      id: 3,
      name: 'Liquidity Guardian',
      description: 'Monitor protocol liquidity levels',
      isActive: true,
      threshold: '10M',
      status: 'Normal',
    },
    {
      id: 4,
      name: 'Smart Contract Monitor',
      description: 'Detect unusual contract activity',
      isActive: true,
      threshold: 'Auto',
      status: 'Normal',
    },
  ]);

  // Simulate real-time risk updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskMetrics(prev => ({
        ...prev,
        overallRiskScore: Math.max(1, Math.min(10, prev.overallRiskScore + (Math.random() - 0.5) * 0.2)),
        volatilityIndex: Math.max(0, Math.min(50, prev.volatilityIndex + (Math.random() - 0.5) * 2)),
        lastUpdate: new Date(),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (score) => {
    if (score <= 3) return 'text-success';
    if (score <= 6) return 'text-warning';
    return 'text-error';
  };

  const getRiskBgColor = (score) => {
    if (score <= 3) return 'bg-success/10 border-success/20';
    if (score <= 6) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Normal':
        return <Shield className="w-4 h-4 text-success" />;
      case 'Warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'Alert':
        return <AlertTriangle className="w-4 h-4 text-error" />;
      default:
        return <Activity className="w-4 h-4 text-text-muted" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-text-muted/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Risk Management Dashboard</h3>
          <div className="flex items-center space-x-2 text-xs text-text-muted">
            <Activity className="w-3 h-3" />
            <span>Last update: {riskMetrics.lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Overall Risk Score */}
        <div className={`border rounded-lg p-4 mb-6 ${getRiskBgColor(riskMetrics.overallRiskScore)}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Overall Risk Score</h4>
            <div className={`text-2xl font-bold ${getRiskColor(riskMetrics.overallRiskScore)}`}>
              {riskMetrics.overallRiskScore.toFixed(1)}/10
            </div>
          </div>
          <div className="w-full bg-bg/50 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                riskMetrics.overallRiskScore <= 3 ? 'bg-success' :
                riskMetrics.overallRiskScore <= 6 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${(riskMetrics.overallRiskScore / 10) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-text-muted mt-2">
            {riskMetrics.overallRiskScore <= 3 ? 'Low risk - All systems operating normally' :
             riskMetrics.overallRiskScore <= 6 ? 'Medium risk - Monitor market conditions' :
             'High risk - Consider reducing exposure'}
          </p>
        </div>

        {/* Risk Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-bg/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-text-muted">Volatility Index</span>
            </div>
            <div className="text-xl font-bold">{riskMetrics.volatilityIndex.toFixed(1)}%</div>
            <div className="text-xs text-success">Within normal range</div>
          </div>

          <div className="bg-bg/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-sm text-text-muted">Liquidity Risk</span>
            </div>
            <div className="text-xl font-bold text-success">{riskMetrics.liquidityRisk}</div>
            <div className="text-xs text-text-muted">$2.8M+ available</div>
          </div>

          <div className="bg-bg/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-warning" />
              <span className="text-sm text-text-muted">Protocol Risk</span>
            </div>
            <div className="text-xl font-bold text-warning">{riskMetrics.protocolRisk}</div>
            <div className="text-xs text-text-muted">Audited protocols</div>
          </div>

          <div className="bg-bg/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-4 h-4 text-success" />
              <span className="text-sm text-text-muted">Market Risk</span>
            </div>
            <div className="text-xl font-bold text-success">{riskMetrics.marketRisk}</div>
            <div className="text-xs text-text-muted">Stable conditions</div>
          </div>
        </div>
      </motion.div>

      {/* Circuit Breakers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface border border-text-muted/20 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold mb-6">Automated Circuit Breakers</h3>
        
        <div className="space-y-4">
          {circuitBreakers.map((breaker) => (
            <div key={breaker.id} className="bg-bg/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(breaker.status)}
                  <div>
                    <h4 className="font-semibold">{breaker.name}</h4>
                    <p className="text-sm text-text-muted">{breaker.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-xs ${
                    breaker.isActive ? 'bg-success/10 text-success' : 'bg-text-muted/10 text-text-muted'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      breaker.isActive ? 'bg-success animate-pulse' : 'bg-text-muted'
                    }`}></div>
                    <span>{breaker.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Threshold: {breaker.threshold}</span>
                <span className={`font-medium ${
                  breaker.status === 'Normal' ? 'text-success' :
                  breaker.status === 'Warning' ? 'text-warning' : 'text-error'
                }`}>
                  {breaker.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Vault Risk Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-surface border border-text-muted/20 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold mb-6">Vault Risk Analysis</h3>
        
        <div className="space-y-4">
          {vaults.map((vault) => {
            const riskScore = vault.riskLevel === 'Low' ? 2.1 : 
                            vault.riskLevel === 'Medium' ? 4.5 :
                            vault.riskLevel === 'High' ? 7.2 : 8.9;
            
            return (
              <div key={vault.id} className="bg-bg/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{vault.name}</h4>
                    <p className="text-sm text-text-muted">{vault.strategy} Strategy</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getRiskColor(riskScore)}`}>
                      {riskScore.toFixed(1)}/10
                    </div>
                    <div className="text-xs text-text-muted">{vault.riskLevel} Risk</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-text-muted">APY</div>
                    <div className="font-medium text-primary">{vault.currentAPY}%</div>
                  </div>
                  <div>
                    <div className="text-text-muted">TVL</div>
                    <div className="font-medium">${(vault.tvl / 1000000).toFixed(1)}M</div>
                  </div>
                  <div>
                    <div className="text-text-muted">Protocols</div>
                    <div className="font-medium">{vault.protocols.length}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full bg-text-muted/10 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        riskScore <= 3 ? 'bg-success' :
                        riskScore <= 6 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${(riskScore / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* X Layer Security Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-okb-blue/5 to-primary/5 border border-okb-blue/20 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold mb-4">X Layer Security Advantages</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-okb-blue" />
              <span className="text-sm">2-second finality enables instant risk response</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-sm">Low gas costs allow frequent risk monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm">Real-time position adjustments</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-warning" />
              <span className="text-sm">Automated rebalancing every 6 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-error" />
              <span className="text-sm">Emergency exits complete in seconds</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-4 h-4 text-okb-blue" />
              <span className="text-sm">Granular risk management controls</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RiskManagement;