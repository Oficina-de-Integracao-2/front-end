import { render } from "@testing-library/react";
import Login from "./componentes/Login/Login.tsx";
import App from "./App.tsx";

describe('Login Component', () => {
  it('should render input', () => {
    const { getByText } = render(<App/>)

    expect(getByText('Autenticação')).toBeInTheDocument();
  });
});
