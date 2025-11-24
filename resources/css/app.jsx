import React from "react";
import { createRoot } from "react-dom/client";

function App() {
    return <div></div>;
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
