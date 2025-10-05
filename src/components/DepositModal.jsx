import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { useAccount } from 'wagmi';

const DepositModal = ({ isOpen, onClose, vault, portfolioData, setPortfolioData }) => {
  const [amount, setAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState(false);
  const { isConnected } = useAccount();

  const projectedEarnings = {
    monthly: (parseFloat(amount) || 0) * (vault.currentAPY / 100) / 12,
    sixMonth: (parseFloat(amount) || 0) * (vault.currentAPY / 100) / 2,
    yearly: (parseFloat(amount) || 0) * (vault.currentAPY / 100),
  };

  const handleDeposit = async () => {
    if (!isConnected || !amount) return;

    setIsDepositing(true);
    
    // Simulate transaction
    setTimeout(() => {
      const depositAmount = parseFloat(amount);
      setPortfolioData(prev => ({
        ...prev,
        totalDeposited: prev.totalDeposited + depositAmount,
        currentBalance: prev.currentBalance + depositAmount,
      }));
      
      setIsDepositing(false);
      setDepositSuccess(true);
      
      setTimeout(() => {
        setDepositSuccess(false);
        onClose();
        setAmount('');
      }, 2000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-bg/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-surface border border-primary/30 rounded-xl p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Deposit to {vault.name}</h3>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {depositSuccess ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Deposit Successful!</h4>
              <p className="text-text-muted">
                Your funds are now earning {vault.currentAPY}% APY
              </p>
            </motion.div>
          ) : (
            <>
              {/* Vault Info */}
              <div className="bg-bg/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-muted">Current APY</span>
                  <span className="text-lg font-bold text-primary">{vault.currentAPY}%</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-muted">Performance Fee</span>
                  <span className="text-sm">{vault.performanceFee}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Min Deposit</span>
                  <span className="text-sm">${vault.minDeposit}</span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Deposit Amount (USD)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-bg border border-text-muted/20 rounded-lg px-4 py-3 text-text focus:border-primary focus:outline-none"
                  />
                  <div className="absolute right-3 top-3 text-text-muted">
                    <Calculator className="w-5 h-5" />
                  </div>
                </div>
                {amount && parseFloat(amount) < vault.minDeposit && (
                  <div className="flex items-center space-x-2 mt-2 text-warning">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Minimum deposit is ${vault.minDeposit}</span>
                  </div>
                )}
              </div>

              {/* Projected Earnings */}
              {amount && parseFloat(amount) >= vault.minDeposit && (
                <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-medium mb-3 text-success">Projected Earnings</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">
                        ${projectedEarnings.monthly.toFixed(2)}
                      </div>
                      <div className="text-xs text-text-muted">1 Month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">
                        ${projectedEarnings.sixMonth.toFixed(2)}
                      </div>
                      <div className="text-xs text-text-muted">6 Months</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">
                        ${projectedEarnings.yearly.toFixed(2)}
                      </div>
                      <div className="text-xs text-text-muted">1 Year</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Gas Cost Info */}
              <div className="bg-okb-blue/5 border border-okb-blue/20 rounded-lg p-3 mb-6">
                <div className="flex items-center space-x-2 text-okb-blue">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">X Layer Benefits</span>
                </div>
                <div className="text-xs text-text-muted mt-1">
                  • Transaction cost: ~$0.001 (99.8% cheaper than Ethereum)
                  • 2-second finality
                  • Daily auto-compounding enabled
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleDeposit}
                  disabled={!isConnected || !amount || parseFloat(amount) < vault.minDeposit || isDepositing}
                  className="w-full bg-primary hover:bg-primary/80 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isDepositing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Depositing...</span>
                    </>
                  ) : (
                    <>
                      <span>Deposit & Start Earning</span>
                      <Zap className="w-4 h-4" />
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-surface border border-text-muted/20 hover:border-primary/30 text-text font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DepositModal;