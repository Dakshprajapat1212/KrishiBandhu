import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
// Initialize i18n before mounting the app
import './i18n';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
