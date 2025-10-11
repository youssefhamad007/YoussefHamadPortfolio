import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/main.css";
import ScrollPositionRestore from "./components/ScrollPositionRestore";
import SiteNav from "./components/SiteNav";
import TransitionRoutes from "./components/TransitionRoutes";


const App = () => (
  <BrowserRouter>
    {/* Global Navigation shown on all routes */}
    <SiteNav />
    <ScrollPositionRestore />
    {/* Animated, no-break route transitions */}
    <TransitionRoutes />
  </BrowserRouter>
);

export default App;
