import { createRoot } from "react-dom/client";
import "./index.css";

function SimpleApp() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">e-snapp Works!</h1>
        <p className="text-gray-600">React is loading successfully</p>
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <p className="text-green-800">✅ Website is functioning properly</p>
        </div>
      </div>
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<SimpleApp />);
} else {
  console.error("Root element not found");
}