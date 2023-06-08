import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "../components";
import { Home } from "../container";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
