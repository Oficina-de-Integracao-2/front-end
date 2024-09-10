import React from 'react';
import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./componentes/Login/Login.jsx";



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