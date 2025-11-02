import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Protected from "./Protected";

const App = () => (
  <Router>
    {/* Barra de navegación */}
    <nav>
      <Link to="/login">Login</Link> | <Link to="/protected">Protected</Link>
    </nav>

    {/* Definición de rutas */}
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/protected" element={<Protected />} />
      <Route path="/" element={<h1>Home Page. Go to Login.</h1>} />
    </Routes>
  </Router>
);

export default App;
