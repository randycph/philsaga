import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/sora/latin-500.css";
import "@fontsource/sora/latin-600.css";
import "@fontsource/sora/latin-700.css";
import "./index.css";
import App from "./App";

const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
