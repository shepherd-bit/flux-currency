import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Header from './components/Header';
import CurrencyConverter from './components/CurrencyConverter';
import MarketTrendCard from './components/MarketTrendCard';
import PopularConversions from './components/PopularConversions';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 text-slate-900 flex flex-col font-['Inter',sans-serif]">
      <Navbar />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Main Currency Converter Component Card (Takes up 7 columns on large screens) */}
          <div className="lg:col-span-7">
            <CurrencyConverter />
          </div>

          {/* Right Column for Secondary Cards (Takes up 5 columns on large screens) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <MarketTrendCard />
            <PopularConversions />
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}