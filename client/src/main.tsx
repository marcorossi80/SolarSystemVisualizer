import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom font imports
const fontStylesheet = document.createElement('link');
fontStylesheet.rel = 'stylesheet';
fontStylesheet.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Mono&display=swap';
document.head.appendChild(fontStylesheet);

// Add font awesome for icons
const fontAwesome = document.createElement('link');
fontAwesome.rel = 'stylesheet';
fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
document.head.appendChild(fontAwesome);

// Set document title
document.title = "Solar System Visualization - April 1, 2025";

createRoot(document.getElementById("root")!).render(<App />);
