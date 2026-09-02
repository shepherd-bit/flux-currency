import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const currenciesData = [
  { code: 'USD', rateToUSD: 1.0 },
  { code: 'EUR', rateToUSD: 0.92 },
  { code: 'GBP', rateToUSD: 0.79 },
  { code: 'KES', rateToUSD: 129.25 },
  { code: 'JPY', rateToUSD: 154.32 },
  { code: 'CAD', rateToUSD: 1.36 },
  { code: 'AUD', rateToUSD: 1.52 },
  { code: 'NGN', rateToUSD: 1580.5 },
  { code: 'INR', rateToUSD: 83.45 },
  { code: 'CHF', rateToUSD: 0.89 },
  { code: 'CNY', rateToUSD: 7.23 },
  { code: 'ZAR', rateToUSD: 18.20 },
  { code: 'NZD', rateToUSD: 1.64 },
  { code: 'SGD', rateToUSD: 1.35 },
  { code: 'HKD', rateToUSD: 7.82 },
  { code: 'SEK', rateToUSD: 10.50 },
  { code: 'NOK', rateToUSD: 10.85 },
  { code: 'MXN', rateToUSD: 17.10 }
];

export default function MarketTrendCard({ fromCurrency = 'USD', toCurrency = 'KES' }) {
  const fromObj = currenciesData.find((c) => c.code === fromCurrency) || currenciesData[0];
  const toObj = currenciesData.find((c) => c.code === toCurrency) || currenciesData[3];
  
  const baseRate = toObj.rateToUSD / fromObj.rateToUSD;
  const targetHigh = (baseRate * 1.025).toFixed(2);
  const targetLow = (baseRate * 0.975).toFixed(2);

  const [displayHigh, setDisplayHigh] = useState(targetHigh);
  const [displayLow, setDisplayLow] = useState(targetLow);

  // Rapid count-up animation for numbers
  useEffect(() => {
    let startTime = null;
    const duration = 400;
    const startHigh = parseFloat(displayHigh) || 0;
    const endHigh = parseFloat(targetHigh) || 0;
    const startLow = parseFloat(displayLow) || 0;
    const endLow = parseFloat(targetLow) || 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setDisplayHigh((startHigh + (endHigh - startHigh) * progress).toFixed(2));
      setDisplayLow((startLow + (endLow - startLow) * progress).toFixed(2));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetHigh, targetLow]);

  // Unique curve generation based on currency codes so the graph actually changes shape
  const charCodeSum = (fromCurrency + toCurrency).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const pathVariantY = 15 + (charCodeSum % 55);
  const midY = 20 + ((charCodeSum * 3) % 60);

  const strokePath = `M 0 70 Q 75 ${pathVariantY}, 150 ${midY} T 300 20`;
  const fillPath = `M 0 70 Q 75 ${pathVariantY}, 150 ${midY} T 300 20 L 300 100 L 0 100 Z`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl p-6 shadow-2xl shadow-slate-300/80 border-2 border-slate-200/90 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
            <TrendingUp size={20} />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-base">
              {fromCurrency}/{toCurrency} • 7 days
            </h4>
            <span className="text-xs font-semibold text-slate-400">Mid-market trend, daily close</span>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold shadow-sm">
          +3.60% this week
        </div>
      </div>

      {/* Fully Dynamic & Morphing SVG Trend Chart */}
      <div className="relative h-32 w-full mb-6 flex items-end">
        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <motion.path
            d={fillPath}
            fill="url(#trendGradient)"
            animate={{ d: fillPath }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
          <motion.path
            d={strokePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ d: strokePath }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </svg>
        <div className="absolute right-0 top-3 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-md animate-ping" />
        <div className="absolute right-0 top-3 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-md" />
      </div>

      <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-6 px-1">
        <span>Mon</span>
        <span>Wed</span>
        <span>Fri</span>
        <span>Today</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center shadow-sm">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">High</span>
          <span className="text-sm sm:text-base font-black text-slate-900">{displayHigh}</span>
        </div>
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center shadow-sm">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Low</span>
          <span className="text-sm sm:text-base font-black text-slate-900">{displayLow}</span>
        </div>
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center shadow-sm">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Volatility</span>
          <span className="text-sm sm:text-base font-black text-slate-900">Low</span>
        </div>
      </div>
    </motion.div>
  );
}