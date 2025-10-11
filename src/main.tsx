import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LenisProvider } from "./hooks/LenisProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <LenisProvider>
      <App />
    </LenisProvider>
);
