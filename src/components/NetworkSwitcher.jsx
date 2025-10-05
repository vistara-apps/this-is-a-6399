import React, { useState, useEffect } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Zap, ExternalLink } from 'lucide-react';

const NetworkSwitcher = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();
  const [showNetworkModal, setShowNetworkModal] = useState(false);

  const X_LAYER_CHAIN_ID = 196;
  const isOnXLayer = chainId === X_LAYER_CHAIN_ID;

  // Auto-show network modal if connected but not on X Layer
  useEffect(() => {
    if (isConnected && !isOnXLayer && !isPending) {
      setShowNetworkModal(true);
    } else {
      setShowNetworkModal(false);
    }
  }, [isConnected, isOnXLayer, isPending]);

  const handleSwitchToXLayer = async () => {
    try {
      await switchChain({ chainId: X_LAYER_CHAIN_ID });
      setShowNetworkModal(false);
    } catch (error) {
      console.error('Failed to switch to X Layer:', error);
    }
  };

  const detectOKXWallet = () => {
    return typeof window !== 'undefined' && window.okxwallet;
  };

  if (!isConnected) return null;

  return (
    <>
      {/* Network Status Indicator */}
      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${
        isOnXLayer 
          ? 'bg-success/10 border-success/30 text-success' 
          : 'bg-warning/10 border-warning/30 text-warning'
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          isOnXLayer ? 'bg-success animate-pulse' : 'bg-warning animate-pulse'
        }`}></div>
        <span className="text-sm font-medium">
          {isOnXLayer ? 'X Layer' : 'Wrong Network'}
        </span>
        {!isOnXLayer && (
          <button
            onClick={() => setShowNetworkModal(true)}
            className="text-xs hover:underline"
          >
            Switch
          </button>
        )}
      </div>

      {/* Network Switch Modal */}
      <AnimatePresence>
        {showNetworkModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface border border-warning/30 rounded-xl p-6 max-w-md w-full"
            >
              {/* Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Switch to X Layer</h3>
                  <p className="text-sm text-text-muted">Required for YieldLayer</p>
                </div>
              </div>

              {/* Network Info */}
              <div className="bg-bg/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-text-muted">Current Network</span>
                  <span className="text-sm font-medium">
                    {chainId === 1 ? 'Ethereum' : 
                     chainId === 137 ? 'Polygon' : 
                     chainId === 10 ? 'Optimism' : 
                     chainId === 42161 ? 'Arbitrum' : 
                     chainId === 8453 ? 'Base' : 
                     `Chain ${chainId}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Required Network</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-okb-blue rounded-full"></div>
                    <span className="text-sm font-medium text-okb-blue">X Layer (196)</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-okb-blue/5 border border-okb-blue/20 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-okb-blue mb-3">X Layer Benefits</h4>
                <div className="space-y-2 text-xs text-text-muted">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-3 h-3 text-okb-blue" />
                    <span>Ultra-low gas costs (~$0.001 per transaction)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-success" />
                    <span>2-second transaction finality</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-success" />
                    <span>Native OKB rewards and ecosystem integration</span>
                  </div>
                </div>
              </div>

              {/* OKX Wallet Detection */}
              {detectOKXWallet() && (
                <div className="bg-success/5 border border-success/20 rounded-lg p-3 mb-6">
                  <div className="flex items-center space-x-2 text-success">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">OKX Wallet Detected</span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    Optimized experience with native X Layer support
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleSwitchToXLayer}
                  disabled={isPending}
                  className="w-full bg-okb-blue hover:bg-okb-blue/80 disabled:bg-okb-blue/50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Switching...</span>
                    </>
                  ) : (
                    <>
                      <span>Switch to X Layer</span>
                      <Zap className="w-4 h-4" />
                    </>
                  )}
                </button>
                
                <div className="flex items-center justify-center space-x-4 text-xs">
                  <a
                    href="https://www.okx.com/explorer/xlayer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-text-muted hover:text-text transition-colors"
                  >
                    <span>View X Layer Explorer</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => setShowNetworkModal(false)}
                    className="text-text-muted hover:text-text transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NetworkSwitcher;