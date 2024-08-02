import { Route, MemoryRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

export default function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
