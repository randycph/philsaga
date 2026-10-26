import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/sora/latin-500.css";
import "@fontsource/sora/latin-600.css";
import "@fontsource/sora/latin-700.css";
import "./index.css";
import App, { type SitePage } from "./App";

const root = document.getElementById("root")!;
const pageRoutes: Record<string, SitePage> = {
  "about.html": "about",
  "careers.html": "careers",
  "articles.html": "articles",
  "annual-reports.html": "reports",
  "hospital.html": "hospital",
};
const pageFile = window.location.pathname.split("/").at(-1) || "";
const app = (
  <React.StrictMode>
    <App page={pageRoutes[pageFile] || "home"} />
  </React.StrictMode>
);

if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
