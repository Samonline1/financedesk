import { StrictMode } from "react"; // keep sanity
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // router
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx"; // global stash
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
