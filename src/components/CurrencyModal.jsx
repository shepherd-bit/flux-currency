import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

const popularCodes = ['USD', 'EUR', 'GBP', 'KES', 'JPY', 'CAD'];

export default function CurrencyModal({
  isOpen,
  onClose,
  currencies = [],
  selectedCurrencyCode,
  onSelectCurrency
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = useMemo(() => {
    return currencies.filter(
      (c) =>
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currencies, searchQuery]);

  const popularList = useMemo(() => {
    return currencies.filter((c) => popularCodes.includes(c.code));
  }, [currencies]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200/95 w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] relative z-50"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">Select currency</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="px-6 py-4 border-b border-slate-100">
              <div className="relative flex items-center">
                <Search size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search currency or country"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200/80 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-400 transition-all"
                  autoFocus
                />
              </div>

              {/* Popular Tags */}
              {!searchQuery && popularList.length > 0 && (
                <div className="mt-4">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                    Popular
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {popularList.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          onSelectCurrency(c.code);
                          onClose();
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border cursor-pointer flex items-center gap-1.5 ${
                          selectedCurrencyCode === c.code
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{c.symbol || c.code.slice(0, 2)}</span>
                        <span>{c.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Currency List */}
            <div className="overflow-y-auto p-6 space-y-2 flex-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                All Currencies
              </span>
              {filteredCurrencies.length === 0 ? (
                <div className="py-8 text-center text-sm font-semibold text-slate-400">
                  No currencies found matching "{searchQuery}"
                </div>
              ) : (
                filteredCurrencies.map((c) => {
                  const isSelected = selectedCurrencyCode === c.code;
                  return (
                    <div
                      key={c.code}
                      onClick={() => {
                        onSelectCurrency(c.code);
                        onClose();
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                          : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-400 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3 pointer-events-none">
                        <div
                          className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shadow-sm ${
                            isSelected
                              ? 'bg-white text-slate-900'
                              : 'bg-slate-900 text-white'
                          }`}
                        >
                          {c.code.slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm">{c.code}</span>
                            <span
                              className={`text-xs truncate max-w-[150px] font-medium ${
                                isSelected ? 'text-slate-300' : 'text-slate-500'
                              }`}
                            >
                              {c.country}
                            </span>
                          </div>
                          <div
                            className={`text-xs truncate max-w-[200px] ${
                              isSelected ? 'text-slate-400' : 'text-slate-400 font-semibold'
                            }`}
                          >
                            {c.name}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`text-sm font-extrabold pointer-events-none ${
                          isSelected ? 'text-white' : 'text-slate-700'
                        }`}
                      >
                        {c.rateToUSD}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Info */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] font-bold text-slate-400">
              Mid-market rates • Tap to select
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}