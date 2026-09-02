import { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import CurrencyConverter from './components/CurrencyConverter';
import MarketTrendCard from './components/MarketTrendCard';
import PopularConversions from './components/PopularConversions';

export default function App() {
  const [fromCurrency, setFromCurrency] = useState('JPY');
  const [toCurrency, setToCurrency] = useState('USD');

  const handleCurrencyChange = (newFrom, newTo) => {
    setFromCurrency(newFrom);
    setToCurrency(newTo);
  };

  const handleSelectPair = (from, to) => {
    setFromCurrency(from);
    setToCurrency(to);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-['Inter'] selection:bg-slate-900 selection:text-white">
      <Navbar />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Converter Card & Footer */}
        <div className="lg:col-span-7">
          <CurrencyConverter
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            onCurrencyChange={handleCurrencyChange}
          />
        </div>

        {/* Right Column: Trend Chart & Popular Conversions */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <MarketTrendCard fromCurrency={fromCurrency} toCurrency={toCurrency} />
          <PopularConversions onSelectPair={handleSelectPair} />
        </div>
      </main>
    </div>
  );
}