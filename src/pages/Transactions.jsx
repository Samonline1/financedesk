import Filters from "../sections/Transactions/Filters";
import TransactionsTable from "../sections/Transactions/TransactionsTable";

function Transactions() {
  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5">
      <Filters />
      <TransactionsTable />
    </div>
  );
}

export default Transactions;
