import { useState } from "react";
import useTransactions from "../../hooks/useTransactions";
import TransactionItem from "../../components/TransactionItem";
import EmptyState from "../../components/EmptyState";
import { useTheme } from "../../hooks/useTheme";

function TransactionsTable() {
  const { filteredTransactions, role, upsertTransaction } = useTransactions();
  const { theme } = useTheme();
  const [draft, setDraft] = useState({
    date: "",
    description: "",
    category: "Misc",
    type: "expense",
    amount: "",
    account: "Checking",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role !== "admin") return;
    if (!draft.description || !draft.amount) return;
    upsertTransaction({
      ...draft,
      id: crypto.randomUUID(),
      amount: Number(draft.amount),
    });
    setDraft((d) => ({ ...d, description: "", amount: "" }));
  };

  return (
    <section
      className={`rounded-2xl p-4 sm:p-6 border shadow-card ${
        theme === "dark" ? "bg-ink-900 border-ink-800 text-white" : "bg-white border-base-100"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className={`text-[11px] uppercase tracking-wide ${theme === "dark" ? "text-gray-400" : "text-ink-400"}`}>All activity</p>
          <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-ink-900"}`}>Transactions</h2>
        </div>
        {role === "admin" ? (
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-accent-green text-ink-900 px-3 py-2 text-xs uppercase tracking-wide hover:brightness-95 active:scale-95 border border-accent-green"
          >
            Quick add
          </button>
        ) : (
          <span className="text-xs text-ink-400">Viewer mode</span>
        )}
      </div>

      {role === "admin" && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-4 text-sm"
        >
          <input
            required
            placeholder="Description"
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            className={`col-span-2 sm:col-span-2 rounded-lg border px-3 py-2 ${
              theme === "dark"
                ? "border-ink-800 bg-ink-900 text-white"
                : "border-base-100 bg-base-50 text-ink-900"
            }`}
          />
          <input
            type="date"
            value={draft.date}
            onChange={(e) => setDraft({ ...draft, date: e.target.value })}
            className={`col-span-1 rounded-lg border px-3 py-2 ${
              theme === "dark"
                ? "border-ink-800 bg-ink-900 text-white"
                : "border-base-100 bg-base-50 text-ink-900"
            }`}
          />
          <input
            type="number"
            required
            placeholder="Amount"
            value={draft.amount}
            onChange={(e) => setDraft({ ...draft, amount: e.target.value })}
            className={`col-span-1 rounded-lg border px-3 py-2 ${
              theme === "dark"
                ? "border-ink-800 bg-ink-900 text-white"
                : "border-base-100 bg-base-50 text-ink-900"
            }`}
          />
          <select
            value={draft.type}
            onChange={(e) => setDraft({ ...draft, type: e.target.value })}
            className={`col-span-1 rounded-lg border px-3 py-2 ${
              theme === "dark"
                ? "border-ink-800 bg-ink-900 text-white"
                : "border-base-100 bg-base-50 text-ink-900"
            }`}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            placeholder="Category"
            value={draft.category}
            onChange={(e) => setDraft({ ...draft, category: e.target.value })}
            className={`col-span-2 sm:col-span-1 rounded-lg border px-3 py-2 ${
              theme === "dark"
                ? "border-ink-800 bg-ink-900 text-white"
                : "border-base-100 bg-base-50 text-ink-900"
            }`}
          />
        </form>
      )}

      {!filteredTransactions.length ? (
        <EmptyState message="No transactions found" cta="Try clearing filters." />
      ) : (
        <div className={`divide-y ${theme === "dark" ? "divide-ink-800" : "divide-base-100"}`}>
          <div
            className={`hidden sm:grid sm:grid-cols-5 text-[11px] pb-2 uppercase tracking-[0.12em] ${
              theme === "dark" ? "text-gray-400" : "text-ink-400"
            }`}
          >
            <span className="sm:col-span-2">Description</span>
            <span>Date</span>
            <span>Amount</span>
            <span>Category</span>
          </div>
          {filteredTransactions.map((txn) => (
            <TransactionItem key={txn.id} txn={txn} />
          ))}
        </div>
      )}
    </section>
  );
}

export default TransactionsTable;
