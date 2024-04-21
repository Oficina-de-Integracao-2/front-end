import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./componentes/Login/Login.jsx";
import Cadastro from "./componentes/Cadastro/Cadastro.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
