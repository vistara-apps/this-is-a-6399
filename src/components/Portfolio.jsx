import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Zap, Shield, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EmergencyExit from './EmergencyExit';
import TransactionHistory from './TransactionHistory';

const Portfolio = ({ portfolioData, setPortfolioData, vaults }) => {
  // Mock performance data
  const performanceData = [
    { date: '2024-01-01', value: 10000, apy: 12.5 },
    { date: '2024-01-08', value: 10023, apy: 13.1 },
    { date: '2024-01-15', value: 10048, apy: 14.2 },
    { date: '2024-01-22', value: 10075, apy: 15.8 },
    { date: '2024-01-29', value: 10102, apy: 16.4 },
    { date: '2024-02-05', value: 10131, apy: 17.2 },
    { date: '2024-02-12', value: 10159, apy: 18.1 },
  ];

  const totalValue = portfolioData.currentBalance || 10159;
  const totalEarnings = totalValue - (portfolioData.totalDeposited || 10000);
  const gasSavings = 234.50; // Mock gas savings vs Ethereum

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">My Portfolio</h2>
        <p className="text-text-muted max-w-2xl mx-auto mb-6">
          Track your earnings, gas savings, and performance across all vault positions
        </p>
        
        {/* Emergency Exit Button */}
        <div className="flex justify-center mb-6">
          <EmergencyExit 
            portfolioData={portfolioData}
            setPortfolioData={setPortfolioData}
            vaults={vaults}
          />
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-text-muted">Total Value</div>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            </div>
          </div>
          <div className="text-xs text-success">+{((totalEarnings / (portfolioData.totalDeposited || 10000)) * 100).toFixed(2)}% all time</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-sm text-text-muted">Total Earnings</div>
              <div className="text-2xl font-bold text-success">${totalEarnings.toFixed(2)}</div>
            </div>
          </div>
          <div className="text-xs text-text-muted">Last 30 days: +$42.18</div>
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
              <div className="text-sm text-text-muted">Gas Savings</div>
              <div className="text-2xl font-bold text-okb-blue">${gasSavings}</div>
            </div>
          </div>
          <div className="text-xs text-text-muted">vs Ethereum L1</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface border border-text-muted/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-warning" />
            </div>
            <div>
              <div className="text-sm text-text-muted">Avg APY</div>
              <div className="text-2xl font-bold">18.1%</div>
            </div>
          </div>
          <div className="text-xs text-success">+2.3% vs last month</div>
        </motion.div>
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-surface border border-text-muted/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Portfolio Performance</h3>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">7D</button>
            <button className="text-sm text-text-muted hover:text-text transition-colors">30D</button>
            <button className="text-sm text-text-muted hover:text-text transition-colors">90D</button>
            <button className="text-sm text-text-muted hover:text-text transition-colors">1Y</button>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
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
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(240, 10%, 8%)',
                  border: '1px solid hsl(240, 5%, 64%, 0.2)',
                  borderRadius: '8px',
                  color: 'hsl(0, 0%, 98%)'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value, name) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(262, 83%, 58%)" 
                strokeWidth={2}
                dot={{ fill: 'hsl(262, 83%, 58%)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Position Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-surface border border-text-muted/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Active Positions</h3>
          <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export CSV</span>
          </button>
        </div>

        <div className="space-y-4">
          {vaults.slice(0, 2).map((vault, index) => (
            <div key={vault.id} className="bg-bg/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{vault.name}</h4>
                  <p className="text-sm text-text-muted">{vault.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">${(2500 * (index + 1)).toLocaleString()}</div>
                  <div className="text-sm text-success">+{vault.currentAPY}% APY</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-text-muted">Deposited</div>
                  <div className="font-medium">${(2400 * (index + 1)).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-text-muted">Earnings</div>
                  <div className="font-medium text-success">+${(100 * (index + 1)).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-text-muted">Last Action</div>
                  <div className="font-medium">{index === 0 ? 'Auto-compound' : 'Rebalanced'}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Add Funds
                  </button>
                  <button className="text-sm text-text-muted hover:text-text transition-colors">
                    Withdraw
                  </button>
                </div>
                <div className="text-xs text-text-muted">
                  Next compound: 18h
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-surface border border-text-muted/20 rounded-xl p-6"
      >
        <TransactionHistory portfolioData={portfolioData} />
      </motion.div>
    </div>
  );
};

export default Portfolio;