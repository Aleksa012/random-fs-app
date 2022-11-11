import "./scss/main.scss";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { Login } from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
