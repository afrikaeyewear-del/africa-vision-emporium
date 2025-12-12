import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initScrollAnimations } from "./utils/scroll-animations";

createRoot(document.getElementById("root")!).render(<App />);

// Initialize scroll animations
if (typeof window !== "undefined") {
  // Wait for DOM to be ready
  setTimeout(() => {
    initScrollAnimations();
  }, 100);
}
