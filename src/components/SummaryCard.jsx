import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const icons = {
  income: ArrowUpCircle,
  expense: ArrowDownCircle,
  balance: Wallet,
};

function SummaryCard({ label, amount, type, hint }) {
  const { theme } = useTheme();
  const Icon = icons[type] || Wallet;
  const surface = theme === "dark" ? "bg-ink-900 border-ink-800 text-white" : "bg-white border-base-100 text-ink-900";
  const muted = theme === "dark" ? "text-gray-400" : "text-ink-400";
  return (
    <div className={`rounded-2xl p-5 sm:p-6 flex flex-col gap-3 border shadow-card ${surface}`}>
      <div className="flex items-center justify-between">
        <p className={`text-[11px] uppercase tracking-wide ${muted}`}>{label}</p>
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${
            type === "income"
              ? "bg-green-100 text-green-700"
            : type === "expense"
              ? "bg-rose-100 text-rose-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {type}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-ink-900 text-white p-3">
          <Icon size={20} />
        </span>
        <div>
          <p className="text-3xl sm:text-4xl font-semibold tracking-tight ">
            ${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
          {hint && <p className="text-sm text-ink-400 mt-1">{hint}</p>}
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
