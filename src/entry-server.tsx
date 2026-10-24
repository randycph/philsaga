import { renderToString } from "react-dom/server";
import App from "./App";

export { site, stories } from "./data/site";

export function render() {
  return renderToString(<App />);
}
