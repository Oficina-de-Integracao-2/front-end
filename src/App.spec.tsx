import { fireEvent, getByText, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from "react-router-dom";
import Login from "./componentes/Login/Login.jsx";
import Cadastro from './componentes/Cadastro/Cadastro.jsx'
import CadastroOficina from './componentes/CadastroOficina/CadastroOficina.jsx'
import Home from './componentes/Home/Home.jsx'
import axios from 'axios';
import Cards from './componentes/Cards/Cards.jsx'

describe('Login Component', () => {
  it('should render text', () => {
    const { getByText } = render(<BrowserRouter><Login /></BrowserRouter>)

    expect(getByText('Autenticação', { selector: 'h3' })).toBeInTheDocument();
  });

  it('should render input user element', async () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Login /></BrowserRouter>)

    expect(getByPlaceholderText('Nome de Usuário')).toBeInTheDocument();
  })

  it('should render input password element', async () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Login /></BrowserRouter>)

    expect(getByPlaceholderText('Senha')).toBeInTheDocument();
  })

  it('should call cadastro when hits cadastro button', () => {
    const { getByText } = render(<BrowserRouter><Login /></BrowserRouter>)

    const btnCadastro = getByText('Cadastro')
    fireEvent.click(btnCadastro)

    expect(getByText('Cadastro')).toBeInTheDocument();
  })
});


describe('Cadastro Component', () => {
  it('should render input cpf ', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Cadastro /></BrowserRouter>)

    expect(getByPlaceholderText('CPF')).toBeInTheDocument();
  });
  it('should render input Nome de usuario ', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Cadastro /></BrowserRouter>)

    expect(getByPlaceholderText('Nome de usuario')).toBeInTheDocument();
  });
  it('should render input Primeiro nome ', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Cadastro /></BrowserRouter>)

    expect(getByPlaceholderText('Primeiro nome')).toBeInTheDocument();
  });
  it('should render input Ultimo nome ', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Cadastro /></BrowserRouter>)

    expect(getByPlaceholderText('Ultimo nome')).toBeInTheDocument();
  });
  it('should render input E-mail ', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Cadastro /></BrowserRouter>)

    expect(getByPlaceholderText('E-mail')).toBeInTheDocument();
  });
  it('should render input Senha ', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Cadastro /></BrowserRouter>)

    expect(getByPlaceholderText('Senha')).toBeInTheDocument();
  });
  it('should call login when hits login button', () => {
    const { getByText } = render(<BrowserRouter><Cadastro /></BrowserRouter>)

    const btnLogin = getByText('Login')
    fireEvent.click(btnLogin)

    expect(getByText('Login')).toBeInTheDocument();
  })
})

describe('Cadastro Component', () => {
  it('should render input Titulo ', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><CadastroOficina /></BrowserRouter>)

    expect(getByPlaceholderText('Titulo')).toBeInTheDocument();
  });
  it('should render input Descrição ', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><CadastroOficina /></BrowserRouter>)

    expect(getByPlaceholderText('Descrição')).toBeInTheDocument();
  });
})

describe('Home Component', () => {
  it('should render help text ', () => {
    const { getByText } = render(<BrowserRouter><CadastroOficina /></BrowserRouter>)

    expect(getByText('Cadastro de Oficina')).toBeInTheDocument();
  });
});

describe('Card Component', () => {
  it('should render student text ', () => {
    const { getByText } = render(<BrowserRouter><Cards /></BrowserRouter>)

    expect(getByText('Alunos:')).toBeInTheDocument();
  });
});