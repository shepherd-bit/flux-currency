export default function Header() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center">
      {/* Top Badge Shape with heavy shadow */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200/90 rounded-full shadow-xl shadow-slate-300/60 text-xs font-semibold text-slate-700 mb-4 cursor-pointer hover:border-slate-300 transition-all">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50 animate-pulse"></span>
        Compatible with 18 major world currencies
      </div>
      
      {/* Description text */}
      <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto">
        A currency converter for travelers, freelancers and businesses. Glass-clear rates, instant math, zero clutter.
      </p>
    </div>
  );
}