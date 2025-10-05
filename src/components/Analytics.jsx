import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Activity, DollarSign, Zap } from 'lucide-react';

const Analytics = ({ vaults }) => {
  const [timeframe, setTimeframe] = useState('30D');

  // Mock analytics data
  const apyTrendData = [
    { date: '2024-01-01', 'OKB Stable': 11.2, 'Auto-Compound': 24.1, 'Leveraged': 38.5, 'Arbitrage': 52.3 },
    { date: '2024-01-08', 'OKB Stable': 11.8, 'Auto-Compound': 26.3, 'Leveraged': 41.2, 'Arbitrage': 58.7 },
    { date: '2024-01-15', 'OKB Stable': 12.1, 'Auto-Compound': 27.9, 'Leveraged': 43.8, 'Arbitrage': 61.2 },
    { date: '2024-01-22', 'OKB Stable': 12.3, 'Auto-Compound': 28.2, 'Leveraged': 44.1, 'Arbitrage': 59.8 },
    { date: '2024-01-29', 'OKB Stable': 12.5, 'Auto-Compound': 28.7, 'Leveraged': 45.2, 'Arbitrage': 62.1 },
  ];

  const protocolDistribution = [
    { name: 'OKX DEX', value: 35, color: '#3b82f6' },
    { name: 'Aave V3', value: 25, color: '#8b5cf6' },
    { name: 'OKB Staking', value: 20, color: '#06b6d4' },
    { name: 'Flash Loans', value: 12, color: '#f59e0b' },
    { name: 'Other', value: 8, color: '#64748b' },
  ];

  const rebalanceData = [
    { date: '2024-01-01', events: 12, gasSaved: 245.50 },
    { date: '2024-01-08', events: 15, gasSaved: 312.75 },
    { date: '2024-01-15', events: 18, gasSaved: 378.90 },
    { date: '2024-01-22', events: 14, gasSaved: 294.20 },
    { date: '2024-01-29', events: 16, gasSaved: 336.80 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Protocol Analytics</h2>
        <p className="text-text-muted max-w-2xl mx-auto">
          Deep insights into vault performance, protocol distribution, and X Layer optimization benefits
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-text-muted">Avg APY Trend</div>
              <div className="text-2xl font-bold">+12.3%</div>
            </div>
          </div>
          <div className="text-xs text-success">vs last month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-sm text-text-muted">Rebalances</div>
              <div className="text-2xl font-bold">234</div>
            </div>
          </div>
          <div className="text-xs text-text-muted">This month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-okb-blue/10 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-okb-blue" />
            </div>
            <div>
              <div className="text-sm text-text-muted">X Layer Benefits</div>
              <div className="text-2xl font-bold">99.8%</div>
            </div>
          </div>
          <div className="text-xs text-text-muted">Gas cost reduction</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-warning" />
            </div>
            <div>
              <div className="text-sm text-text-muted">Total Saved</div>
              <div className="text-2xl font-bold">$12.4K</div>
            </div>
          </div>
          <div className="text-xs text-text-muted">In gas fees</div>
        </motion.div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex justify-center">
        <div className="flex bg-surface border border-text-muted/20 rounded-lg p-1">
          {['7D', '30D', '90D', '1Y'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                timeframe === period
                  ? 'bg-primary text-white'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* APY Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-6">APY Trends by Vault</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 5%, 64%, 0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(240, 5%, 64%)"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis 
                  stroke="hsl(240, 5%, 64%)"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(240, 10%, 8%)',
                    border: '1px solid hsl(240, 5%, 64%, 0.2)',
                    borderRadius: '8px',
                    color: 'hsl(0, 0%, 98%)'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value) => [`${value}%`, 'APY']}
                />
                <Bar dataKey="OKB Stable" fill="hsl(142, 76%, 36%)" />
                <Bar dataKey="Auto-Compound" fill="hsl(262, 83%, 58%)" />
                <Bar dataKey="Leveraged" fill="hsl(24, 95%, 53%)" />
                <Bar dataKey="Arbitrage" fill="hsl(0, 84%, 60%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Protocol Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Protocol Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={protocolDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {protocolDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(240, 10%, 8%)',
                    border: '1px solid hsl(240, 5%, 64%, 0.2)',
                    borderRadius: '8px',
                    color: 'hsl(0, 0%, 98%)'
                  }}
                  formatter={(value) => [`${value}%`, 'Allocation']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {protocolDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-text-muted">{item.name}</span>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Gas Optimization Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-okb-blue/5 to-primary/5 border border-okb-blue/20 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold mb-6">X Layer Optimization Benefits</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-okb-blue mb-2">$0.001</div>
            <div className="text-sm text-text-muted">Avg transaction cost</div>
            <div className="text-xs text-success mt-1">vs $50+ on Ethereum</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2s</div>
            <div className="text-sm text-text-muted">Transaction finality</div>
            <div className="text-xs text-success mt-1">vs 15min on other L2s</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">24/7</div>
            <div className="text-sm text-text-muted">Auto-compounding</div>
            <div className="text-xs text-success mt-1">Profitable at any size</div>
          </div>
        </div>

        {/* Gas Savings Calculator */}
        <div className="bg-bg/50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-3">Gas Savings Calculator</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-text-muted mb-2">If you used Ethereum L1:</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Daily compound (365x):</span>
                  <span className="text-error">$18,250</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekly rebalance (52x):</span>
                  <span className="text-error">$2,600</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency exits (2x):</span>
                  <span className="text-error">$100</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-text-muted/20 pt-2">
                  <span>Total Annual Gas:</span>
                  <span className="text-error">$20,950</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-text-muted mb-2">On X Layer:</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Daily compound (365x):</span>
                  <span className="text-okb-blue">$0.73</span>
                </div>
                <div className="flex justify-between">
                  <span>4x daily rebalance (1460x):</span>
                  <span className="text-okb-blue">$1.46</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency exits (2x):</span>
                  <span className="text-okb-blue">$0.004</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-text-muted/20 pt-2">
                  <span>Total Annual Gas:</span>
                  <span className="text-success">$2.19</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-lg text-center">
            <div className="text-lg font-bold text-success mb-1">
              You save $20,947.81 per year (99.99%)
            </div>
            <div className="text-xs text-text-muted">
              This enables profitable auto-compounding even for small deposits
            </div>
          </div>
        </div>

        <div className="bg-bg/50 rounded-lg p-4">
          <h4 className="font-semibold mb-3">Daily Operations Enabled by Low Gas Costs</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Automated rebalancing every 6 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Daily reward harvesting & compounding</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Real-time risk monitoring & adjustments</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Instant emergency exits</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vault Performance Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-surface border border-text-muted/20 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold mb-6">Vault Performance Comparison</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-text-muted/20">
                <th className="text-left py-3 text-sm font-medium text-text-muted">Vault</th>
                <th className="text-right py-3 text-sm font-medium text-text-muted">Current APY</th>
                <th className="text-right py-3 text-sm font-medium text-text-muted">30D Avg</th>
                <th className="text-right py-3 text-sm font-medium text-text-muted">TVL</th>
                <th className="text-right py-3 text-sm font-medium text-text-muted">Risk</th>
                <th className="text-right py-3 text-sm font-medium text-text-muted">Performance</th>
              </tr>
            </thead>
            <tbody>
              {vaults.map((vault, index) => (
                <tr key={vault.id} className="border-b border-text-muted/10 last:border-b-0">
                  <td className="py-4">
                    <div>
                      <div className="font-medium">{vault.name}</div>
                      <div className="text-sm text-text-muted">{vault.strategy}</div>
                    </div>
                  </td>
                  <td className="text-right py-4">
                    <span className="text-primary font-bold">{vault.currentAPY}%</span>
                  </td>
                  <td className="text-right py-4">
                    <span className="font-medium">{(vault.currentAPY - 2.1).toFixed(1)}%</span>
                  </td>
                  <td className="text-right py-4">
                    <span className="font-medium">${(vault.tvl / 1000000).toFixed(1)}M</span>
                  </td>
                  <td className="text-right py-4">
                    <span className={`text-sm px-2 py-1 rounded ${
                      vault.riskLevel === 'Low' ? 'bg-success/10 text-success' :
                      vault.riskLevel === 'Medium' ? 'bg-warning/10 text-warning' :
                      vault.riskLevel === 'High' ? 'bg-accent/10 text-accent' :
                      'bg-error/10 text-error'
                    }`}>
                      {vault.riskLevel}
                    </span>
                  </td>
                  <td className="text-right py-4">
                    <span className="text-success text-sm">+{(12 + index * 3).toFixed(1)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;