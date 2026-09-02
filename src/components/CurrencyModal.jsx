import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

export default function CurrencyModal({ isOpen, onClose, currencies, onSelectCurrency, selectedCurrencyCode }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Filter currencies based on search input
  const filteredCurrencies = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularCodes = ['USD', 'EUR', 'GBP', 'KES', 'JPY', 'CAD'];
  const popularCurrencies = currencies.filter((c) => popularCodes.includes(c.code));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-white rounded-3xl shadow-2xl shadow-slate-900/20 border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Modal Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Select currency</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="p-6 pb-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search currency or country"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all shadow-inner"
                autoFocus
              />
            </div>

            {/* Popular Tags */}
            {!searchQuery && (
              <div className="mt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">
                  Popular
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularCurrencies.map((pop) => (
                    <button
                      key={pop.code}
                      onClick={() => {
                        onSelectCurrency(pop.code);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                        {pop.symbol || pop.code.slice(0, 2)}
                      </span>
                      {pop.code}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Currency List */}
          <div className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-slate-100">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((c) => {
                const isSelected = c.code === selectedCurrencyCode;
                return (
                  <div
                    key={c.code}
                    onClick={() => {
                      onSelectCurrency(c.code);
                      onClose();
                    }}
                    className={`flex items-center justify-between py-3.5 px-3 rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 my-1'
                        : 'hover:bg-slate-50 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-900'
                        }`}
                      >
                        {c.code.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-sm flex items-center gap-2">
                          {c.code}
                          <span
                            className={`text-xs font-normal ${
                              isSelected ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            {c.country}
                          </span>
                        </div>
                        <div
                          className={`text-xs ${
                            isSelected ? 'text-slate-300' : 'text-slate-400'
                          }`}
                        >
                          {c.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">
                      {c.rateToUSD ? c.rateToUSD.toFixed(2) : '1.00'}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-slate-400 text-sm">
                No currencies found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-400">
            Mid-market rates • Tap to select
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}