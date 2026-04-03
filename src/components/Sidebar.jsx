import { NavLink } from "react-router-dom";
// import RoleSwitcher from "./RoleSwitcher"; // role toggle
import { useTheme } from "../hooks/useTheme";
import { useAppContext } from "../context/AppContext";


const links = [
  { to: "/", label: "Overview" },
  { to: "/transactions", label: "Transactions" },
];

function Sidebar({ open, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";


   const { role, setRole } = useAppContext();

  const toggleRole = () => {
    setRole((prev) => (prev === "viewer" ? "admin" : "viewer")); // flip
  };

  return (
    <>
      <aside
        className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 h-full border-r flex-col px-4 py-6 z-30 ${
          isDark
            ? "bg-ink-900 border-ink-800"
            : "bg-white border-base-100 shadow-lg"
        }`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-2xl bg-accent-green text-ink-900 grid place-items-center font-semibold shadow">
            FD
          </div>
          <div>
            <p
              className={`text-[11px] uppercase ${
                isDark ? "text-gray-400" : "text-ink-400"
              }`}
            >
              Finance Desk
            </p>
            <p className={`text-lg font-semibold ${isDark ? "text-white" : "text-ink-900"}`}>
              Control
            </p>
          </div>
        </div>
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
             
               className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-semibold ${
                  isActive ? "bg-accent-green text-ink-900" : "text-gray-600 hover:bg-ink-800/20"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-6">
          {/* <RoleSwitcher /> */}

          <button
      onClick={toggleRole}
      className={`mb-3 w-full rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
              isDark
                ? "border-ink-800 text-white hover:bg-ink-800"
                : "border-ink-800 text-ink-700 hover:bg-base-100"
            }`}
      title="Pretend roles for demo"
    >
      Role: {role === "admin" ? "Admin" : "Viewer"}
    </button>

        </div>
        <button
          onClick={toggleTheme}
          className={`mt-4 w-full rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide border ${
            isDark
              ? "border-ink-800 text-white hover:bg-ink-800"
              : "border-base-200 text-ink-700 hover:bg-base-100"
          }`}
        >
          {isDark ? "Light mode" : "Dark mode"}
        </button>
        <div
          className={`mt-auto pt-6 text-xs ${
            isDark ? "text-gray-500" : "text-ink-400"
          }`}
        >
          Built by Zooryn
        </div>
      </aside>

      {/* mobile drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-64 h-full border-r z-40 transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${isDark ? "bg-ink-900 border-ink-800 text-white" : "bg-white border-base-100 text-ink-900"}`}
      >
        <div
          className={`flex items-center justify-between px-4 py-4 border-b ${
            isDark ? "border-ink-800" : "border-base-100"
          }`}
        >
          <p className="font-semibold">Menu</p>
          <button
            onClick={onClose}
            className={`text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-ink-500 hover:text-ink-800"}`}
            aria-label="close menu"
          >
            ←
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-semibold ${
                  isActive ? "bg-accent-green text-ink-900" : "text-gray-600 hover:bg-ink-800/20"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 pb-4">
          <button
            onClick={toggleTheme}
            className={`mb-3 w-full rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
              isDark
                ? "border-ink-800 text-white hover:bg-ink-800"
                : "border-ink-800 text-ink-700 hover:bg-base-100"
            }`}
          >
            {isDark ? "Light mode" : "Dark mode"}
          </button>

          <button
      onClick={toggleRole}
      className={`mb-3 w-full rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
              isDark
                ? "border-ink-800 text-white hover:bg-ink-800"
                : "border-ink-800 text-ink-700 hover:bg-base-100"
            }`}
      title="Pretend roles for demo"
    >
      Role: {role === "admin" ? "Admin" : "Viewer"}
    </button>

        </div>
      </div>
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          onClick={onClose}
          aria-hidden
        />
      )}
    </>
  );
}

export default Sidebar;
