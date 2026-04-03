import dayjs from "dayjs";

export const applyFilters = (rows, filters) => {
  const { search, type, category, sort } = filters;
  let data = [...rows];

  if (search) {
    const term = search.toLowerCase();
    data = data.filter(
      (r) =>
        r.description.toLowerCase().includes(term) ||
        r.category.toLowerCase().includes(term)
    );
  }

  if (type !== "all") {
    data = data.filter((r) => r.type === type);
  }

  if (category !== "all") {
    data = data.filter((r) => r.category === category);
  }

  if (sort === "recent") {
    data.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
  } else if (sort === "amount") {
    data.sort((a, b) => b.amount - a.amount);
  }

  return data;
};
