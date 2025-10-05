import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Zap, Shield, CheckCircle, ExternalLink } from 'lucide-react';
import { useAccount, useChainId } from 'wagmi';

const EmergencyExit = ({ portfolioData, setPortfolioData, vaults }) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [exitComplete, setExitComplete] = useState(false);
  const [exitDetails, setExitDetails] = useState(null);
  const { isConnected } = useAccount();
  const chainId = useChainId();

  const hasPositions = portfolioData.currentBalance > 0;
  const isOnXLayer = chainId === 196;

  const handleEmergencyExit = async () => {
    if (!isConnected || !hasPositions) return;

    setIsExiting(true);
    
    // Simulate emergency exit process
    const exitData = {
      totalWithdrawn: portfolioData.currentBalance,
      gasCost: 0.002, // X Layer gas cost
      txHashes: [
        '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
        '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
        '0x3c4d5e6f7890abcdef1234567890abcdef123456'
      ],
      exitTime: new Date().toISOString(),
      vaultsExited: vaults.filter((_, index) => index < 2) // Mock: user has positions in first 2 vaults
    };

    // Simulate the withdrawal process with realistic timing
    setTimeout(() => {
      setExitDetails(exitData);
      setPortfolioData(prev => ({
        ...prev,
        currentBalance: 0,
        totalDeposited: 0,
      }));
      
      setIsExiting(false);
      setExitComplete(true);
      
      // Auto-close after showing success
      setTimeout(() => {
        setExitComplete(false);
        setShowExitModal(false);
        setExitDetails(null);
      }, 5000);
    }, 3000); // 3 second simulation
  };

  if (!hasPositions) return null;

  return (
    <>
      {/* Emergency Exit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowExitModal(true)}
        className="flex items-center space-x-2 bg-error/10 hover:bg-error/20 border border-error/30 text-error font-medium py-2 px-4 rounded-lg transition-colors"
      >
        <AlertTriangle className="w-4 h-4" />
        <span>Emergency Exit</span>
      </motion.button>

      {/* Emergency Exit Modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => !isExiting && !exitComplete && setShowExitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface border border-error/30 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {exitComplete ? (
                /* Success State */
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Emergency Exit Complete!</h3>
                  <p className="text-text-muted mb-6">
                    All positions withdrawn successfully to your wallet
                  </p>

                  {exitDetails && (
                    <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-6 text-left">
                      <h4 className="font-semibold mb-3 text-success">Exit Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-muted">Total Withdrawn:</span>
                          <span className="font-medium">${exitDetails.totalWithdrawn.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">Gas Cost:</span>
                          <span className="font-medium text-okb-blue">${exitDetails.gasCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">Exit Time:</span>
                          <span className="font-medium">~3 seconds</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">Vaults Exited:</span>
                          <span className="font-medium">{exitDetails.vaultsExited.length}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-text-muted">
                    This modal will close automatically in a few seconds
                  </div>
                </motion.div>
              ) : isExiting ? (
                /* Loading State */
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 border-4 border-error/30 border-t-error rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">Processing Emergency Exit...</h3>
                  <p className="text-text-muted mb-6">
                    Withdrawing from all vault positions
                  </p>

                  <div className="bg-okb-blue/5 border border-okb-blue/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-okb-blue mb-2">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">X Layer Speed</span>
                    </div>
                    <div className="text-xs text-text-muted">
                      Fast 2-second finality enables instant withdrawals
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Confirmation State */
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-error" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Emergency Exit</h3>
                      <p className="text-sm text-text-muted">Withdraw all funds immediately</p>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2 text-warning mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Important Notice</span>
                    </div>
                    <div className="text-xs text-text-muted space-y-1">
                      <p>• This will withdraw ALL funds from ALL vault positions</p>
                      <p>• You may experience minor slippage during exit</p>
                      <p>• Auto-compounding will stop for withdrawn funds</p>
                      <p>• You can re-deposit anytime after exit</p>
                    </div>
                  </div>

                  {/* Current Positions */}
                  <div className="bg-bg/50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold mb-3">Current Positions</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Total Balance:</span>
                        <span className="font-medium">${portfolioData.currentBalance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Active Vaults:</span>
                        <span className="font-medium">2</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Est. Gas Cost:</span>
                        <span className="font-medium text-okb-blue">~$0.002</span>
                      </div>
                    </div>
                  </div>

                  {/* X Layer Benefits */}
                  {isOnXLayer && (
                    <div className="bg-okb-blue/5 border border-okb-blue/20 rounded-lg p-3 mb-6">
                      <div className="flex items-center space-x-2 text-okb-blue mb-2">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">X Layer Emergency Exit</span>
                      </div>
                      <div className="text-xs text-text-muted">
                        • 2-second finality for instant withdrawals
                        • Ultra-low gas costs (~$0.002 total)
                        • Parallel processing of multiple vault exits
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={handleEmergencyExit}
                      disabled={!isConnected || !isOnXLayer}
                      className="w-full bg-error hover:bg-error/80 disabled:bg-error/50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Confirm Emergency Exit</span>
                    </button>
                    
                    <button
                      onClick={() => setShowExitModal(false)}
                      className="w-full bg-surface border border-text-muted/20 hover:border-primary/30 text-text font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>

                    {!isOnXLayer && (
                      <div className="text-xs text-warning text-center">
                        Please switch to X Layer network for emergency exit
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EmergencyExit;