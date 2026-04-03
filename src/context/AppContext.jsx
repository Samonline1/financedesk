import { createContext, useContext, useEffect, useMemo, useState } from "react"; // react core
import transactionsSeed from "../data/transactions"; // seed data
import { applyFilters } from "../utils/filters"; // filters helper
import { calculateSummary, buildMonthlySeries } from "../utils/calculations"; // math bits

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState("viewer"); // fake roles
  const [theme, setTheme] = useState(() => localStorage.getItem("fdx_theme") || "light"); // ui mode
  const [transactions, setTransactions] = useState(() => {
    const cached = localStorage.getItem("fdx_txn");
    return cached ? JSON.parse(cached) : transactionsSeed;
  });
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    sort: "recent",
  });

  useEffect(() => {
    localStorage.setItem("fdx_txn", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("fdx_theme", theme);
  }, [theme]);

  const filteredTransactions = useMemo(
    () => applyFilters(transactions, filters),
    [transactions, filters]
  );

  const summary = useMemo(
    () => calculateSummary(transactions),
    [transactions]
  );

  const monthlySeries = useMemo(
    () => buildMonthlySeries(transactions),
    [transactions]
  );

  const upsertTransaction = (payload) => {
    setTransactions((prev) => {
      const exists = prev.find((t) => t.id === payload.id);
      if (exists) {
        return prev.map((t) => (t.id === payload.id ? payload : t));
      }
      return [{ ...payload, id: crypto.randomUUID() }, ...prev];
    });
  };

  const value = {
    role,
    setRole,
    theme,
    setTheme,
    filters,
    setFilters,
    transactions,
    filteredTransactions,
    summary,
    monthlySeries,
    upsertTransaction,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
