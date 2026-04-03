import SummaryCard from "../../components/SummaryCard";
import useTransactions from "../../hooks/useTransactions";

function SummarySection() {
  const { summary } = useTransactions();

  const cards = [
    {
      label: "Total Balance",
      amount: summary.balance,
      type: "balance",
      hint: "after expenses",
    },
    {
      label: "Income",
      amount: summary.income,
      type: "income",
      hint: "this quarter-ish",
    },
    {
      label: "Expenses",
      amount: summary.expenses,
      type: "expense",
      hint: "includes payroll",
    },
  ];

  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {cards.map((card) => (
        <SummaryCard key={card.type} {...card} />
      ))}
    </section>
  );
}

export default SummarySection;
