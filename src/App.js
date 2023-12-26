import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

function App() {
  return (
    <div className="App">
      Hello React
      <BrowserRouter>
        <ScrollToTop />
        <Routes></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
