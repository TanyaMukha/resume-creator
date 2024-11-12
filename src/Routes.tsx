import { Link, Route, MemoryRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import EditForm from "./pages/EditForm/EditForm";
import Layout from "./components/Layout/Layout";
import Template1 from "./pages/templates/Template1/Template1";

export default function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/">
            <Route
              path="edit"
              element={<EditForm />}
            />
            <Route
              path="template-1"
              element={<Template1 />}
            />
          </Route>
          <Route path="*" element={<Link to="/">Oops, 404</Link>} />
        </Route>
      </Routes>
    </Router>
  );
}
