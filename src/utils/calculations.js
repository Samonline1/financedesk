import dayjs from "dayjs";

export const calculateSummary = (rows) => {
  const income = rows
    .filter((r) => r.type === "income")
    .reduce((acc, r) => acc + r.amount, 0);
  const expenses = rows
    .filter((r) => r.type === "expense")
    .reduce((acc, r) => acc + r.amount, 0);

  const byCategory = rows.reduce((map, r) => {
    map[r.category] = (map[r.category] || 0) + r.amount * (r.type === "income" ? 1 : -1);
    return map;
  }, {});

  let maxCategory = null;
  Object.entries(byCategory).forEach(([name, total]) => {
    if (!maxCategory || total < maxCategory.total) {
      maxCategory = { name, total };
    }
  });

  return {
    income,
    expenses,
    balance: income - expenses,
    highestSpend: maxCategory,
  };
};

export const buildMonthlySeries = (rows) => {
  const months = {};
  rows.forEach((r) => {
    const key = dayjs(r.date).format("YYYY-MM");
    if (!months[key]) months[key] = { income: 0, expense: 0 };
    months[key][r.type] += r.amount;
  });

  const sorted = Object.entries(months)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([month, totals]) => ({
      month,
      income: totals.income,
      expense: totals.expense,
      net: totals.income - totals.expense,
    }));

  return sorted;
};

export const monthOverMonth = (series) => {
  if (series.length < 2) return null;
  const last = series[series.length - 1];
  const prev = series[series.length - 2];
  const delta = last.net - prev.net;
  const pct = prev.net ? (delta / prev.net) * 100 : null;
  return { delta, pct, currentMonth: last.month };
};
