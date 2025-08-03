import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log('🚀 Starting e-snapp application');

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(<App />);
