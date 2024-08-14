import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./componentes/Login/Login.jsx";
import Cadastro from "./componentes/Cadastro/Cadastro.jsx";
import Home from "./componentes/Home/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
