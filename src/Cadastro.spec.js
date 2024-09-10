import React from 'react';
import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Cadastro from './componentes/Cadastro/Cadastro.jsx'
import CadastroOficina from './componentes/CadastroOficina/CadastroOficina.jsx'

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