import { Lightbulb } from "lucide-react";
import useTransactions from "../../hooks/useTransactions";
import { monthOverMonth } from "../../utils/calculations";
import { useTheme } from "../../hooks/useTheme";
import { formatInr } from "../../utils/format";

function InsightsSection() {
  const { theme } = useTheme();
  const { summary, monthlySeries } = useTransactions();
  const delta = monthOverMonth(monthlySeries);

  return (
    <section
      className={`rounded-2xl p-4 sm:p-4 flex flex-col gap-4 border shadow-card  ${
        theme === "dark" ? "bg-ink-900 border-ink-800 text-white" : "bg-white border-base-100"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="rounded-lg bg-accent-green text-ink-900 p-2">
          <Lightbulb size={18} />
        </span>
        <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-ink-900"}`}>Insights</h3>
      </div>

      <ul className={`space-y-3 text-sm ${theme === "dark" ? "text-gray-200" : "text-ink-800"}`}>
        {summary.highestSpend && (
          <li className="flex gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-rose-900/40 ">
              spend
            </span>
            Highest burn in {summary.highestSpend.name} ({formatInr(Math.abs(summary.highestSpend.total))}).
          </li>
        )}
        {delta && (
          <li className="flex gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-blue-900/40 ">
              trend
            </span>
            Net cash {delta.delta >= 0 ? "up" : "down"} {formatInr(Math.abs(delta.delta))} vs previous month ({delta.currentMonth}).
          </li>
        )}
        <li className="flex gap-2">
          <span className="px-3 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-gray-800 text-gray-200">
            note
          </span>
          Try to keep expenses under 60% of income; we're at{" "}
          {summary.income
            ? Math.round((summary.expenses / summary.income) * 100)
            : 0}
          % right now.
        </li>
      </ul>
    </section>
  );
}

export default InsightsSection;
