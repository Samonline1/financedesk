import useTransactions from "../../hooks/useTransactions";
import { useTheme } from "../../hooks/useTheme";


function Filters() {
  const { filters, setFilters, transactions } = useTransactions();
  const { theme } = useTheme();

  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  const update = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };


  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 border shadow-card ${
        theme === "dark" ? "bg-ink-900 border-ink-800" : "bg-white border-base-100"
      }`}
    >
      <input
        type="search"
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        placeholder="Search description or category"
       className={`w-full sm:flex-1 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-purple
         ${ theme === "dark"
    ? "border border-ink-800 bg-ink-900 text-white"
    : "border border-base-100 bg-base-50 text-ink-900"
}`}
      />
      <select
        value={filters.type}
        onChange={(e) => update("type", e.target.value)}
        className={`rounded-lg border border-base-100 bg-base-50 px-3 py-2 text-sm  
        ${ theme === "dark"
    ? "border border-ink-800 bg-ink-900 text-white"
    : "border border-base-100 bg-base-50 text-ink-900"
}`}
      >
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select
        value={filters.category}
        onChange={(e) => update("category", e.target.value)}
        className={`rounded-lg border border-base-100 bg-base-50 px-3 py-2 text-sm   
       ${ theme === "dark"
    ? "border border-ink-800 bg-ink-900 text-white"
    : "border border-base-100 bg-base-50 text-ink-900"
}`}
      >
        <option value="all">All categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select
        value={filters.sort}
        onChange={(e) => update("sort", e.target.value)}
        className={`rounded-lg border border-base-100  px-3 py-2 text-sm  
       ${ theme === "dark"
    ? "border border-ink-800 bg-ink-900 text-white"
    : "border border-base-100 bg-base-50 text-ink-900"
}`}
      >
        <option value="recent">Most recent</option>
        <option value="amount">Largest amount</option>
      </select>
    </div>
  );
}

export default Filters;
