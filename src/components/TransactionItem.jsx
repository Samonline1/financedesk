import clsx from "clsx";
import { useTheme } from "../hooks/useTheme";
import { formatInr } from "../utils/format";

function TransactionItem({ txn }) {
  const { theme } = useTheme();
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-5 items-center py-3 border-b text-sm ${
        theme === "dark" ? "border-ink-800 text-white" : "border-base-100 text-ink-900"
      }`}
    >
      <div className="sm:col-span-2 flex items-center gap-3">
        <span
          className={clsx(
            "w-10 h-10 rounded-lg grid place-items-center text-sm font-semibold",
            txn.type === "income"
              ? "bg-green-100 text-green-700"
              : "bg-rose-100 text-rose-700"
          )}
        >
          {txn.category[0]}
        </span>
        <div>
          <p className="font-semibold">{txn.description}</p>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-ink-400"} text-xs`}>{txn.account}</p>
        </div>
      </div>
      <p className={theme === "dark" ? "text-gray-400" : "text-ink-400"}>{txn.date}</p>
      <p
        className={clsx(
          "font-semibold",
          txn.type === "income" ? "text-green-600" : "text-rose-600"
        )}
      >
        {txn.type === "income" ? "+" : "-"}
        {formatInr(txn.amount)}
      </p>
      <p className="text-right sm:text-left text-ink-800">{txn.category}</p>
    </div>
  );
}

export default TransactionItem;
