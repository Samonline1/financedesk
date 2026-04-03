import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Sidebar from "./components/Sidebar";
import { useTheme } from "./hooks/useTheme";

// shell layout
function Layout() {
  const [open, setOpen] = useState(false); // drawer flag
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className={`min-h-screen lg:pl-64 ${
        theme === "dark" ? "bg-ink-900 text-white" : "bg-base-50 text-ink-900"
      }`}
    >
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="flex flex-col min-h-screen">
        <div
          className={`flex items-center justify-between px-4 py-3 border-b lg:hidden ${
            theme === "dark"
              ? "border-ink-800 bg-ink-900"
              : "border-base-100 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-ink-900 grid place-items-center font-semibold text-white">
              FD
            </div>
            <div>
              <p
                className={`text-[11px] uppercase ${
                  theme === "dark" ? "text-gray-400" : "text-ink-400"
                }`}
              >
                Finance Desk
              </p>
              <p className="text-lg font-semibold">Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className={`w-10 h-10 grid place-items-center rounded-lg border text-xl ${
              theme === "dark"
                ? "bg-ink-800 border-ink-700 text-white"
                : "bg-white border-base-100 shadow"
            }`}
            aria-label="toggle menu"
          >
            ⋮
          </button>
        </div>

        <main className="px-4 sm:px-6 lg:px-10 pb-10 pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>
    </Routes>
  );
}

export default App;
