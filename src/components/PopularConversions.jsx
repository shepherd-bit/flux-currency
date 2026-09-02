import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const initialPairs = [
  { from: 'USD', to: 'KES', rate: '129.25' },
  { from: 'EUR', to: 'KES', rate: '140.49' },
  { from: 'GBP', to: 'KES', rate: '163.61' },
  { from: 'USD', to: 'NGN', rate: '1,580.5' },
  { from: 'USD', to: 'INR', rate: '83.45' },
  { from: 'EUR', to: 'USD', rate: '1.08' },
  { from: 'GBP', to: 'USD', rate: '1.27' }
];

export default function PopularConversions({ onSelectPair }) {
  const [pairs, setPairs] = useState(initialPairs);

  useEffect(() => {
    const interval = setInterval(() => {
      setPairs((prev) => {
        const copy = [...prev];
        const item = copy.shift();
        copy.push(item);
        return copy;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-slate-300/80 border-2 border-slate-200/90 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-900 text-base">Popular conversions</h4>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mid-market</span>
      </div>

      <div className="overflow-hidden relative h-[290px]">
        <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col gap-2.5">
          <AnimatePresence initial={false}>
            {pairs.slice(0, 5).map((pair) => (
              <motion.div
                key={`${pair.from}-${pair.to}`}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                onClick={() => onSelectPair && onSelectPair(pair.from, pair.to)}
                className="flex items-center justify-between p-3.5 bg-slate-50/90 rounded-2xl border-2 border-slate-200/80 shadow-lg shadow-slate-200/50 hover:border-slate-400 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 overflow-hidden">
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shadow-md border-2 border-white">
                      {pair.from.slice(0, 2)}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shadow-md border-2 border-white">
                      {pair.to.slice(0, 2)}
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 text-sm">
                    {pair.from} → {pair.to}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm">{pair.rate}</span>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}