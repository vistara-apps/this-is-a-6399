import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Filter, Download, Search, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const TransactionHistory = ({ portfolioData }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState('all'); // all, deposit, withdraw, compound, rebalance
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('timestamp'); // timestamp, amount, type
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc

  // Mock transaction data
  useEffect(() => {
    const mockTransactions = [
      {
        id: '1',
        hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12345678',
        type: 'deposit',
        amount: 2500,
        vault: 'OKB Stable Yield',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: 'confirmed',
        gasCost: 0.001,
        blockNumber: 1234567
      },
      {
        id: '2',
        hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef12345679',
        type: 'compound',
        amount: 42.18,
        vault: 'Auto-Compound DEX',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        status: 'confirmed',
        gasCost: 0.002,
        blockNumber: 1234520,
        rewards: 45.20,
        reinvested: 42.18
      },
      {
        id: '3',
        hash: '0x3c4d5e6f7890abcdef1234567890abcdef12345680',
        type: 'rebalance',
        amount: 5000,
        vault: 'OKB Stable Yield',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        status: 'confirmed',
        gasCost: 0.003,
        blockNumber: 1234200,
        fromProtocol: 'Aave V3',
        toProtocol: 'OKB Staking',
        oldAPY: 11.2,
        newAPY: 12.5
      },
      {
        id: '4',
        hash: '0x4d5e6f7890abcdef1234567890abcdef123456781',
        type: 'withdraw',
        amount: 1000,
        vault: 'Leveraged OKX Ecosystem',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        status: 'confirmed',
        gasCost: 0.002,
        blockNumber: 1233800
      },
      {
        id: '5',
        hash: '0x5e6f7890abcdef1234567890abcdef1234567812',
        type: 'deposit',
        amount: 7500,
        vault: 'Auto-Compound DEX',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        status: 'confirmed',
        gasCost: 0.001,
        blockNumber: 1233200
      }
    ];

    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  }, []);

  // Filter and search transactions
  useEffect(() => {
    let filtered = transactions;

    // Apply type filter
    if (filter !== 'all') {
      filtered = filtered.filter(tx => tx.type === filter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(tx => 
        tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.vault.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'amount':
          aVal = a.amount;
          bVal = b.amount;
          break;
        case 'type':
          aVal = a.type;
          bVal = b.type;
          break;
        default:
          aVal = a.timestamp;
          bVal = b.timestamp;
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredTransactions(filtered);
  }, [transactions, filter, searchTerm, sortBy, sortOrder]);

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit': return '↓';
      case 'withdraw': return '↑';
      case 'compound': return '🔄';
      case 'rebalance': return '⚖️';
      default: return '•';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'deposit': return 'text-primary';
      case 'withdraw': return 'text-warning';
      case 'compound': return 'text-success';
      case 'rebalance': return 'text-okb-blue';
      default: return 'text-text-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending': return <Clock className="w-4 h-4 text-warning" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-error" />;
      default: return <Clock className="w-4 h-4 text-text-muted" />;
    }
  };

  const formatHash = (hash) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  const openInExplorer = (hash) => {
    window.open(`https://www.okx.com/explorer/xlayer/tx/${hash}`, '_blank');
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Vault', 'Amount', 'Gas Cost', 'Hash', 'Status'];
    const csvData = filteredTransactions.map(tx => [
      tx.timestamp.toISOString(),
      tx.type,
      tx.vault,
      tx.amount,
      tx.gasCost,
      tx.hash,
      tx.status
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yieldlayer-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl font-semibold">Transaction History</h3>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search by hash, vault, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bg border border-text-muted/20 rounded-lg pl-10 pr-3 py-2 text-text focus:border-primary focus:outline-none"
          />
        </div>

        {/* Type Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-bg border border-text-muted/20 rounded-lg px-3 py-2 text-text focus:border-primary focus:outline-none"
        >
          <option value="all">All Types</option>
          <option value="deposit">Deposits</option>
          <option value="withdraw">Withdrawals</option>
          <option value="compound">Compounds</option>
          <option value="rebalance">Rebalances</option>
        </select>

        {/* Sort Options */}
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [newSortBy, newSortOrder] = e.target.value.split('-');
            setSortBy(newSortBy);
            setSortOrder(newSortOrder);
          }}
          className="bg-bg border border-text-muted/20 rounded-lg px-3 py-2 text-text focus:border-primary focus:outline-none"
        >
          <option value="timestamp-desc">Newest First</option>
          <option value="timestamp-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
          <option value="type-asc">Type A-Z</option>
        </select>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-surface border border-text-muted/20 rounded-lg p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                {/* Transaction Info */}
                <div className="flex items-center space-x-4">
                  {/* Type Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'deposit' ? 'bg-primary/10' :
                    tx.type === 'withdraw' ? 'bg-warning/10' :
                    tx.type === 'compound' ? 'bg-success/10' :
                    'bg-okb-blue/10'
                  }`}>
                    <span className={`text-lg ${getTransactionColor(tx.type)}`}>
                      {getTransactionIcon(tx.type)}
                    </span>
                  </div>

                  {/* Details */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium capitalize">{tx.type}</span>
                      {getStatusIcon(tx.status)}
                    </div>
                    <div className="text-sm text-text-muted">{tx.vault}</div>
                    <div className="text-xs text-text-muted">
                      {tx.timestamp.toLocaleDateString()} {tx.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {/* Amount and Actions */}
                <div className="text-right">
                  <div className="font-medium text-lg">
                    ${tx.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-text-muted">
                    Gas: ${tx.gasCost}
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-text-muted">
                      {formatHash(tx.hash)}
                    </span>
                    <button
                      onClick={() => openInExplorer(tx.hash)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Details for Specific Transaction Types */}
              {tx.type === 'compound' && tx.rewards && (
                <div className="mt-3 pt-3 border-t border-text-muted/10">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-text-muted">Rewards Harvested:</span>
                      <span className="ml-2 font-medium text-success">${tx.rewards}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Reinvested:</span>
                      <span className="ml-2 font-medium text-primary">${tx.reinvested}</span>
                    </div>
                  </div>
                </div>
              )}

              {tx.type === 'rebalance' && tx.fromProtocol && (
                <div className="mt-3 pt-3 border-t border-text-muted/10">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-text-muted">From:</span>
                      <span className="ml-2 font-medium">{tx.fromProtocol}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">To:</span>
                      <span className="ml-2 font-medium">{tx.toProtocol}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Old APY:</span>
                      <span className="ml-2 font-medium">{tx.oldAPY}%</span>
                    </div>
                    <div>
                      <span className="text-text-muted">New APY:</span>
                      <span className="ml-2 font-medium text-success">{tx.newAPY}%</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📊</div>
          <h4 className="text-lg font-medium mb-2">No transactions found</h4>
          <p className="text-text-muted">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Your transaction history will appear here once you start using YieldLayer'
            }
          </p>
        </div>
      )}

      {/* Summary Stats */}
      {filteredTransactions.length > 0 && (
        <div className="bg-bg/50 rounded-lg p-4">
          <h4 className="font-medium mb-3">Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-text-muted">Total Transactions</div>
              <div className="font-medium">{filteredTransactions.length}</div>
            </div>
            <div>
              <div className="text-text-muted">Total Volume</div>
              <div className="font-medium">
                ${filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-text-muted">Total Gas Spent</div>
              <div className="font-medium text-okb-blue">
                ${filteredTransactions.reduce((sum, tx) => sum + tx.gasCost, 0).toFixed(3)}
              </div>
            </div>
            <div>
              <div className="text-text-muted">Avg Gas Cost</div>
              <div className="font-medium text-okb-blue">
                ${(filteredTransactions.reduce((sum, tx) => sum + tx.gasCost, 0) / filteredTransactions.length).toFixed(4)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;