import SummarySection from "../sections/Dashboard/SummarySection";
import ChartsSection from "../sections/Dashboard/ChartsSection";
import InsightsSection from "../sections/Dashboard/InsightsSection";

function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5 lg:p-5">
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <SummarySection />
          <ChartsSection />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <InsightsSection />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
