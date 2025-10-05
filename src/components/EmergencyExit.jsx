import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Zap, Shield, Clock, CheckCircle, X } from 'lucide-react';
import { useAccount } from 'wagmi';

const EmergencyExit = ({ isOpen, onClose, portfolioData, setPortfolioData, vaults }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [exitSuccess, setExitSuccess] = useState(false);
  const [exitStep, setExitStep] = useState(0);
  const { isConnected } = useAccount();

  const exitSteps = [
    'Withdrawing from all vault positions',
    'Swapping assets to USDT',
    'Processing final transfers',
    'Emergency exit completed'
  ];

  const handleEmergencyExit = async () => {
    if (!isConnected || portfolioData.currentBalance === 0) return;

    setIsExiting(true);
    setExitStep(0);

    // Simulate emergency exit process
    for (let i = 0; i < exitSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setExitStep(i + 1);
    }

    // Update portfolio to show emergency exit
    setPortfolioData(prev => ({
      ...prev,
      currentBalance: 0,
      totalDeposited: 0,
      lifetimeEarnings: prev.currentBalance - prev.totalDeposited,
    }));

    setIsExiting(false);
    setExitSuccess(true);

    setTimeout(() => {
      setExitSuccess(false);
      onClose();
      setExitStep(0);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-bg/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-surface border border-error/30 rounded-xl p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-error" />
              </div>
              <h3 className="text-xl font-semibold text-error">Emergency Exit</h3>
            </div>
            <button
              onClick={onClose}
              disabled={isExiting}
              className="text-text-muted hover:text-text transition-colors disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {exitSuccess ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Emergency Exit Completed!</h4>
              <p className="text-text-muted mb-4">
                All funds have been withdrawn and transferred to your wallet
              </p>
              <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                <div className="text-sm text-success">
                  Final amount: ${portfolioData.currentBalance?.toLocaleString() || '0'}
                </div>
              </div>
            </motion.div>
          ) : isExiting ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <h4 className="text-lg font-semibold mb-2">Processing Emergency Exit</h4>
                <p className="text-text-muted">
                  Please wait while we withdraw all your funds...
                </p>
              </div>

              <div className="space-y-3">
                {exitSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      index < exitStep
                        ? 'bg-success/10 border border-success/20'
                        : index === exitStep
                        ? 'bg-primary/10 border border-primary/20'
                        : 'bg-bg/50 border border-text-muted/10'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      index < exitStep
                        ? 'bg-success text-white'
                        : index === exitStep
                        ? 'bg-primary text-white'
                        : 'bg-text-muted/20 text-text-muted'
                    }`}>
                      {index < exitStep ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : index === exitStep ? (
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm ${
                      index < exitStep
                        ? 'text-success'
                        : index === exitStep
                        ? 'text-primary'
                        : 'text-text-muted'
                    }`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-okb-blue/5 border border-okb-blue/20 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-okb-blue text-sm">
                  <Zap className="w-4 h-4" />
                  <span>X Layer fast finality: 2-second confirmations</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Warning Message */}
              <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-error mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-error mb-2">⚠️ Emergency Exit Warning</h4>
                    <p className="text-sm text-text-muted mb-3">
                      This will immediately withdraw ALL funds from ALL vault positions. This action cannot be undone.
                    </p>
                    <ul className="text-xs text-text-muted space-y-1">
                      <li>• May incur slippage during asset swaps</li>
                      <li>• Will forfeit any pending rewards</li>
                      <li>• Positions will be closed permanently</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Current Portfolio Summary */}
              <div className="bg-bg/50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-3">Current Portfolio</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Total Balance:</span>
                    <span className="font-medium">${portfolioData.currentBalance?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Active Positions:</span>
                    <span className="font-medium">{vaults.filter(v => v.tvl > 0).length} vaults</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Estimated Exit Time:</span>
                    <span className="font-medium text-success">~6 seconds</span>
                  </div>
                </div>
              </div>

              {/* X Layer Benefits */}
              <div className="bg-okb-blue/5 border border-okb-blue/20 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 text-okb-blue mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">X Layer Emergency Benefits</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-success" />
                    <span className="text-text-muted">2s finality</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-3 h-3 text-success" />
                    <span className="text-text-muted">~$0.003 gas cost</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleEmergencyExit}
                  disabled={!isConnected || portfolioData.currentBalance === 0}
                  className="w-full bg-error hover:bg-error/80 disabled:bg-error/50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Execute Emergency Exit</span>
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

export default EmergencyExit;