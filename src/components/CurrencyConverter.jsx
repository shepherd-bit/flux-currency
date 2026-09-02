import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Copy, Check, Star, TrendingUp, BarChart2, Share2 } from 'lucide-react';
import CurrencyModal from './CurrencyModal';
import Footer from './Footer';

const currenciesData = [
  { code: 'USD', name: 'United States Dollar', country: 'United States', symbol: '$', rateToUSD: 1.0 },
  { code: 'EUR', name: 'Euro', country: 'European Union', symbol: '€', rateToUSD: 0.92 },
  { code: 'GBP', name: 'British Pound', country: 'United Kingdom', symbol: '£', rateToUSD: 0.79 },
  { code: 'KES', name: 'Kenyan Shilling', country: 'Kenya', symbol: 'KSh', rateToUSD: 129.25 },
  { code: 'JPY', name: 'Japanese Yen', country: 'Japan', symbol: '¥', rateToUSD: 154.32 },
  { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', symbol: '$', rateToUSD: 1.36 },
  { code: 'AUD', name: 'Australian Dollar', country: 'Australia', symbol: '$', rateToUSD: 1.52 },
  { code: 'NGN', name: 'Nigerian Naira', country: 'Nigeria', symbol: '₦', rateToUSD: 1580.5 },
  { code: 'INR', name: 'Indian Rupee', country: 'India', symbol: '₹', rateToUSD: 83.45 },
  { code: 'CHF', name: 'Swiss Franc', country: 'Switzerland', symbol: 'CHF', rateToUSD: 0.89 },
  { code: 'CNY', name: 'Chinese Yuan', country: 'China', symbol: '¥', rateToUSD: 7.23 },
  { code: 'ZAR', name: 'South African Rand', country: 'South Africa', symbol: 'R', rateToUSD: 18.20 },
  { code: 'NZD', name: 'New Zealand Dollar', country: 'New Zealand', symbol: '$', rateToUSD: 1.64 },
  { code: 'SGD', name: 'Singapore Dollar', country: 'Singapore', symbol: '$', rateToUSD: 1.35 },
  { code: 'HKD', name: 'Hong Kong Dollar', country: 'Hong Kong', symbol: '$', rateToUSD: 7.82 },
  { code: 'SEK', name: 'Swedish Krona', country: 'Sweden', symbol: 'kr', rateToUSD: 10.50 },
  { code: 'NOK', name: 'Norwegian Krone', country: 'Norway', symbol: 'kr', rateToUSD: 10.85 },
  { code: 'MXN', name: 'Mexican Peso', country: 'Mexico', symbol: '$', rateToUSD: 17.10 }
];

export default function CurrencyConverter({ fromCurrency, toCurrency, onCurrencyChange }) {
  const [amount, setAmount] = useState('1,000');
  const [modalType, setModalType] = useState(null); // 'from' | 'to' | null
  const [copied, setCopied] = useState(false);
  const [starred, setStarred] = useState(false);

  // Find rate data
  const fromObj = currenciesData.find((c) => c.code === fromCurrency) || currenciesData[4];
  const toObj = currenciesData.find((c) => c.code === toCurrency) || currenciesData[0];

  // Format numbers with commas (e.g. 1,000,000)
  const formatNumberWithCommas = (val) => {
    if (!val && val !== 0) return '';
    const parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const handleAmountChange = (e) => {
    const rawVal = e.target.value.replace(/,/g, '');
    if (rawVal === '' || !isNaN(rawVal)) {
      setAmount(formatNumberWithCommas(rawVal));
    }
  };

  // Calculation logic
  const numericAmount = parseFloat(amount.replace(/,/g, '')) || 0;
  const targetValue = ((numericAmount / fromObj.rateToUSD) * toObj.rateToUSD).toFixed(3);
  const singleRate = (toObj.rateToUSD / fromObj.rateToUSD).toFixed(4);

  // Animated counting state for converted output
  const [displayValue, setDisplayValue] = useState(targetValue);

  useEffect(() => {
    let startTime = null;
    const duration = 400; // ms
    let startVal = parseFloat(displayValue.replace(/,/g, '')) || 0;
    const endVal = parseFloat(targetValue) || 0;
    
    if (startVal === endVal) return;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = startVal + (endVal - startVal) * progress;
      setDisplayValue(formatNumberWithCommas(current.toFixed(3)));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    const animationFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetValue]);

  const handleQuickAmount = (val) => {
    setAmount(formatNumberWithCommas(val.toString()));
  };

  const handleSwap = () => {
    onCurrencyChange(toCurrency, fromCurrency);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] border-2 border-slate-200/90 flex flex-col justify-between">
        {/* Top Bar inside Card */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Amount
            </span>
            <span className="text-xs font-semibold text-slate-600">
              {fromObj.code} • {fromObj.country}
            </span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 shadow-lg shadow-emerald-500/15 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-700">Mid-market</span>
          </div>
        </div>

        {/* Main Input Row */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-400">
              {fromObj.symbol || fromObj.code.slice(0, 2)}
            </span>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full text-4xl sm:text-5xl font-black text-slate-900 bg-transparent focus:outline-none tracking-tight"
              placeholder="0"
            />
          </div>

          {/* Quick Amount Pills */}
          <div className="flex items-center gap-2 mt-4">
            {[100, 500, 1000, 5000].map((val) => (
              <button
                key={val}
                onClick={() => handleQuickAmount(val)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer border ${
                  numericAmount === val
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/30'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 shadow-sm hover:shadow-md'
                }`}
              >
                {val >= 1000 ? `${val / 1000}K` : val}
              </button>
            ))}
          </div>
        </div>

        {/* Currency Selector Row with Swap Button */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 items-center">
          {/* FROM Button Card */}
          <div
            onClick={() => setModalType('from')}
            className="p-4 bg-slate-50/90 rounded-2xl border-2 border-slate-200/80 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.12)] hover:border-slate-400 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-slate-900/20">
                {fromObj.code.slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-slate-900">{fromObj.code}</span>
                  <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md">FROM</span>
                </div>
                <div className="text-xs text-slate-500 font-medium truncate max-w-[110px]">
                  {fromObj.name}
                </div>
              </div>
            </div>
            <span className="text-slate-400 text-xs font-bold">▼</span>
          </div>

          {/* Central Swap Button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:block">
            <button
              onClick={handleSwap}
              className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 flex items-center justify-center transition-all cursor-pointer"
            >
              <ArrowLeftRight size={16} />
            </button>
          </div>

          {/* Mobile Swap Button */}
          <div className="flex justify-center sm:hidden my-1">
            <button
              onClick={handleSwap}
              className="px-4 py-2 rounded-xl bg-white border-2 border-slate-200 shadow-md text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeftRight size={14} /> Swap Currencies
            </button>
          </div>

          {/* TO Button Card */}
          <div
            onClick={() => setModalType('to')}
            className="p-4 bg-slate-50/90 rounded-2xl border-2 border-slate-200/80 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.12)] hover:border-slate-400 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center shadow-md">
                {toObj.code.slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-slate-900">{toObj.code}</span>
                  <span className="text-[10px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded-md">TO</span>
                </div>
                <div className="text-xs text-slate-500 font-medium truncate max-w-[110px]">
                  {toObj.name}
                </div>
              </div>
            </div>
            <span className="text-slate-400 text-xs font-bold">▼</span>
          </div>
        </div>

        {/* Converted Output Display Card */}
        <div className="p-5 bg-amber-50/40 rounded-3xl border-2 border-amber-100/80 shadow-[0_15px_35px_-5px_rgba(251,191,36,0.2)] mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Converted to</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold shadow-sm">Live</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                title="Copy amount"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
              <button
                onClick={() => setStarred(!starred)}
                className={`w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center transition-all cursor-pointer ${
                  starred ? 'text-amber-500' : 'text-slate-700 hover:bg-slate-100'
                }`}
                title="Star pair"
              >
                <Star size={14} fill={starred ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-400">
              {toObj.symbol || toObj.code.slice(0, 2)}
            </span>
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {formatNumberWithCommas(displayValue)}
            </span>
            <span className="text-lg font-bold text-slate-600">{toObj.code}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 pt-3 border-t border-amber-200/50">
            <span className="flex items-center gap-1 text-slate-700">
              <TrendingUp size={13} className="text-emerald-600" />
              1 {fromObj.code} = {singleRate} {toObj.code}
            </span>
            <span>•</span>
            <span>Mid-market rate</span>
            <span>•</span>
            <span>Updated just now</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="space-y-4">
          <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-extrabold text-sm shadow-[0_15px_30px_-5px_rgba(15,23,42,0.35)] hover:bg-slate-800 hover:shadow-[0_20px_35px_-5px_rgba(15,23,42,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2">
            Convert {fromObj.code} to {toObj.code} • {toObj.code.toLowerCase()}
          </button>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1">
                <BarChart2 size={14} /> Rates by ECB + Central Bank
              </span>
              <span>•</span>
              <span>Zero fees</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all cursor-pointer">
                <BarChart2 size={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all cursor-pointer">
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Currency Modal Component */}
        <CurrencyModal
          isOpen={modalType !== null}
          onClose={() => setModalType(null)}
          currencies={currenciesData}
          selectedCurrencyCode={modalType === 'from' ? fromCurrency : toCurrency}
          onSelectCurrency={(code) => {
            if (modalType === 'from') {
              onCurrencyChange(code, toCurrency);
            } else {
              onCurrencyChange(fromCurrency, code);
            }
            setModalType(null);
          }}
        />
      </div>

      <Footer />
    </motion.div>
  );
}