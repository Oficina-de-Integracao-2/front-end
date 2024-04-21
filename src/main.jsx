import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";
import { AuthProvider } from './context/AuthProvider.jsx'

render(
  <AuthProvider>
    <App />
  </AuthProvider>,
    document.getElementById('root')
)