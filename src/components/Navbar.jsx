export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-slate-200/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo & Live Rates Badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center text-base shadow-xl shadow-slate-900/25">
              F
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
              Flux <span className="text-slate-400 font-normal">•</span> <span className="text-slate-500 font-medium">Currency</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white border-2 border-slate-200/90 rounded-full shadow-lg shadow-slate-200/50 text-xs font-semibold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            Live rates
          </div>
        </div>

        {/* Right: Login Link & Sign Up Button */}
        <div className="flex items-center gap-6">
          <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
            Login
          </button>
          
          <button className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-xl shadow-slate-900/30 transition-all cursor-pointer">
            Sign Up
          </button>
        </div>

      </div>
    </header>
  );
}