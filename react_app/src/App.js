import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Theory from "./components/Theory";
import HeightCalculator from "./components/HeightCalculator";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/height" element={<HeightCalculator />} />
          <Route path="/theory" element={<Theory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
