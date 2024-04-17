import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./componentes/Login/Login";
import Cadastro from "./componentes/Cadastro/Cadastro";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Login />} />
            <Route path="Cadastro" element={<Cadastro />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
