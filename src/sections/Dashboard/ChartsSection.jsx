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
import { formatInr } from "../../utils/format";

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-white px-3 py-2 shadow border border-slate-100 text-sm">
      <p className="font-medium text-slate-700">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-slate-600">
          {entry.name}: {formatInr(entry.value)}
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
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" tickLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatInr(v, { notation: "compact", maximumFractionDigits: 1 })}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#B7EF3A"
              fillOpacity={0.35}
              fill="#728d31"
            />
            <Area
              type="monotone"
              dataKey="expense"
              name="Expense"
              stroke="#ef4444"
              fillOpacity={0.3}
              fill="#ef4444"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ChartsSection;
