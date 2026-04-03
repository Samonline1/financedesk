import { useAppContext } from "../context/AppContext";

const useTransactions = () => {
  const {
    filteredTransactions,
    transactions,
    summary,
    monthlySeries,
    filters,
    setFilters,
    role,
    upsertTransaction,
  } = useAppContext();

  return {
    filteredTransactions,
    transactions,
    summary,
    monthlySeries,
    filters,
    setFilters,
    role,
    upsertTransaction,
  };
};

export default useTransactions;
