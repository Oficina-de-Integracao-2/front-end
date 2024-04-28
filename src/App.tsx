import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./componentes/Login/Login.jsx";
import Cadastro from "./componentes/Cadastro/Cadastro.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
