export default function Footer() {
  return (
    <div className="w-full bg-slate-50/80 rounded-2xl px-4 py-3 border border-slate-200/80 flex items-center justify-center gap-2.5 mt-4 shadow-sm">
      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm animate-pulse" />
      <span className="text-[11px] font-bold text-slate-500 tracking-tight text-center">
        No hidden fees. Rates refreshed every 60s. Built for humans, not banks.
      </span>
    </div>
  );
}