import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketTrendCard({ from = 'USD', to = 'KES' }) {
  // Simulated trend data based on currency pair
  const isPositive = (from.charCodeAt(0) + to.charCodeAt(0)) % 2 === 0;
  const percentage = isPositive ? '+3.60%' : '-1.25%';
  
  // Base rates simulation for high/low
  const baseRate = 129.25;
  const highVal = (baseRate * 1.02).toFixed(2);
  const lowVal = (baseRate * 0.98).toFixed(2);

  // Animated spring counters for high and low values
  const [displayHigh, setDisplayHigh] = useState(highVal);
  const [displayLow, setDisplayLow] = useState(lowVal);

  useEffect(() => {
    // Rapid count-up effect on currency change
    let start = 0;
    const duration = 500;
    const steps = 20;
    const increment = 1 / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= 1) {
        setDisplayHigh(highVal);
        setDisplayLow(lowVal);
        clearInterval(timer);
      } else {
        setDisplayHigh((parseFloat(highVal) * (0.9 + start * 0.1)).toFixed(2));
        setDisplayLow((parseFloat(lowVal) * (0.9 + start * 0.1)).toFixed(2));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [from, to, highVal, lowVal]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white rounded-3xl p-6 shadow-2xl shadow-slate-300/80 border-2 border-slate-200/90 flex flex-col justify-between"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xl shadow-slate-900/30 border border-slate-700">
            {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">
              {from}/{to} • 7 days
            </h4>
            <p className="text-xs text-slate-500 font-medium">Mid-market trend, daily close</p>
          </div>
        </div>

        <div
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1 ${
            isPositive
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-emerald-500/20'
              : 'bg-rose-50 text-rose-700 border border-rose-200 shadow-rose-500/20'
          }`}
        >
          {percentage} this week
        </div>
      </div>

      {/* Interactive SVG Chart Animation */}
      <div className="h-32 w-full mb-6 relative flex items-end">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <motion.path
            key={`${from}-${to}-area`}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            d={
              isPositive
                ? 'M 0 80 Q 75 50 150 65 T 300 20 L 300 100 L 0 100 Z'
                : 'M 0 30 Q 75 70 150 45 T 300 85 L 300 100 L 0 100 Z'
            }
            fill="url(#trendGradient)"
          />

          {/* Line Path */}
          <motion.path
            key={`${from}-${to}-line`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            d={
              isPositive
                ? 'M 0 80 Q 75 50 150 65 T 300 20'
                : 'M 0 30 Q 75 70 150 45 T 300 85'
            }
            fill="none"
            stroke={isPositive ? '#10b981' : '#f43f5e'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Pulsing End Node */}
          <motion.circle
            key={`${from}-${to}-node`}
            cx="300"
            cy={isPositive ? '20' : '85'}
            r="6"
            className={isPositive ? 'fill-emerald-500' : 'fill-rose-500'}
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </svg>

        {/* Axis Labels */}
        <div className="absolute inset-x-0 bottom-[-20px] flex justify-between text-xs font-semibold text-slate-500">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span>Today</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 mt-2">
        <div className="p-3 bg-slate-50/90 rounded-2xl border-2 border-slate-200/80 shadow-lg shadow-slate-200/50 text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            High
          </span>
          <motion.span
            key={displayHigh}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-extrabold text-slate-900"
          >
            {displayHigh}
          </motion.span>
        </div>

        <div className="p-3 bg-slate-50/90 rounded-2xl border-2 border-slate-200/80 shadow-lg shadow-slate-200/50 text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Low
          </span>
          <motion.span
            key={displayLow}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-extrabold text-slate-900"
          >
            {displayLow}
          </motion.span>
        </div>

        <div className="p-3 bg-slate-50/90 rounded-2xl border-2 border-slate-200/80 shadow-lg shadow-slate-200/50 text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Volatility
          </span>
          <span className="text-sm font-extrabold text-slate-900">Low</span>
        </div>
      </div>
    </motion.div>
  );
}