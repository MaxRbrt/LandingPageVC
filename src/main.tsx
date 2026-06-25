import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// F5/reload sempre volta ao topo (sem restaurar a posição anterior do scroll)
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
