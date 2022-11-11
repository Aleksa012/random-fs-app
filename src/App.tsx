import "./scss/main.scss";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { Login } from "./pages/Login";
import { UnauthorizedRoute } from "./routes/UnauthorizedRoute";
import { AuthorizedRoute } from "./routes/AuthorizedRoute";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <UnauthorizedRoute>
              <Login />
            </UnauthorizedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnauthorizedRoute>
              <Register />
            </UnauthorizedRoute>
          }
        />
        <Route
          path="/"
          element={
            <AuthorizedRoute>
              <Home />
            </AuthorizedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
