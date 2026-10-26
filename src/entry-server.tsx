import { renderToString } from "react-dom/server";
import App, { type SitePage } from "./App";

export { site, stories } from "./data/site";

export function render(page: SitePage = "home") {
  return renderToString(<App page={page} />);
}
