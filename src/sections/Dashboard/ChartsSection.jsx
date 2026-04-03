import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import useTransactions from "../../hooks/useTransactions";
import EmptyState from "../../components/EmptyState";
import { useTheme } from "../../hooks/useTheme";

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-white px-3 py-2 shadow border border-slate-100 text-sm">
      <p className="font-medium text-slate-700">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-slate-600">
          {entry.name}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

function ChartsSection() {
  const { theme } = useTheme();
  const { monthlySeries } = useTransactions();

  if (!monthlySeries.length) {
    return <EmptyState message="No chart data yet" cta="Add a transaction to see trends." />;
  }

  return (
    <section
      className={`rounded-2xl p-5 sm:p-6 border shadow-card ${
        theme === "dark" ? "bg-ink-900 border-ink-800 text-white" : "bg-white border-base-100"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className={`text-[11px] uppercase tracking-wide ${theme === "dark" ? "text-gray-400" : "text-ink-400"}`}>Trend</p>
          <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-ink-900"}`}>Cashflow by month</h2>
        </div>
        <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-blue-900/40 ">
          net vs spend
        </span>
      </div>

      <div className="h-72 sm:h-80">
        <ResponsiveContainer>
          <AreaChart data={monthlySeries} margin={{ left: 0, right: 0 }}>
            <defs>
              <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f472b6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" tickLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#059669"
              fillOpacity={1}
              fill="url(#income)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              name="Expense"
              stroke="#e11d48"
              fillOpacity={1}
              fill="url(#expense)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ChartsSection;
