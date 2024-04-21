import { getByPlaceholderText, render } from "@testing-library/react";
import '@testing-library/jest-dom'
import {screen} from '@testing-library/dom'
import Login from "./componentes/Login/Login.jsx";

describe('Login Component', () => {
  it('should render text', () => {
    const { getByText } = render(<Login/>)

    expect(getByText('Autenticação', { selector: 'h3' })).toBeInTheDocument();
  });
  it('should render input email and password', () => {
    const { getByText } = render(<Login/>)

    const inputEmail = screen.getByPlaceholderText('E-mail')
    const inputSenha= screen.getByPlaceholderText('Senha')

    expect(inputEmail).toBeInTheDocument()
    expect(inputSenha).toBeInTheDocument()
  })
});
