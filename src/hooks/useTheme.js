import { useAppContext } from "../context/AppContext";

export const useTheme = () => {
  const { theme, setTheme } = useAppContext();
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggleTheme };
};

export default useTheme;
