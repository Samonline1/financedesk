const inrFormatter = (options = {}) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    ...options,
  });

export const formatInr = (value, options) => inrFormatter(options).format(value);
