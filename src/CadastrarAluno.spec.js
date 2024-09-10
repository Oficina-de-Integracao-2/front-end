import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CadsAlunos from './componentes/CadsAlunos/CadsAlunos.jsx';

// Mock da função fetch global
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ nome: 'Nome Atual', email: 'email@exemplo.com', cpf: '12345678900' }),
  })
);

describe('CadsAlunos Component', () => {
  const mockOnDelete = jest.fn();
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render aluno details correctly', () => {
    render(<CadsAlunos id="1" nome="Nome Teste" email="email@teste.com" cpf="12345678900" onDelete={mockOnDelete} onUpdate={mockOnUpdate} oficinaId="1" />);
    expect(screen.getByText('Nome Teste')).toBeInTheDocument();
    expect(screen.getByText('email@teste.com')).toBeInTheDocument();
  });

  test('should call handleDelete function on delete button click', async () => {
    render(<CadsAlunos id="1" nome="Nome Teste" email="email@teste.com" cpf="12345678900" onDelete={mockOnDelete} onUpdate={mockOnUpdate} oficinaId="1" />);
    const deleteButton = screen.getByAltText('excluir aluno');
    fireEvent.click(deleteButton);
    
    // Simular o clique no botão "Sim"
    const confirmButton = screen.getByText('Sim');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith('1');
    });
  });

  test('should call handleUpdate function on form submit', async () => {
    render(<CadsAlunos id="1" nome="Nome Teste" email="email@teste.com" cpf="12345678900" onDelete={mockOnDelete} onUpdate={mockOnUpdate} oficinaId="1" />);
    
    // Abrir o popup de edição
    const editButton = screen.getByAltText('editar aluno');
    fireEvent.click(editButton);

    // Preencher o formulário de edição
    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'Nome Atualizado' } });
    fireEvent.change(screen.getByPlaceholderText('CPF'), { target: { value: '09876543210' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'novoemail@teste.com' } });

    // Submeter o formulário
    fireEvent.click(screen.getByValue('Salvar'));

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith('1', {
        nome: 'Nome Atualizado',
        cpf: '09876543210',
        email: 'novoemail@teste.com',
      });
    });
  });

  test('should handle update failure', async () => {
    // Mock de uma resposta de erro
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(<CadsAlunos id="1" nome="Nome Teste" email="email@teste.com" cpf="12345678900" onDelete={mockOnDelete} onUpdate={mockOnUpdate} oficinaId="1" />);
    
    const editButton = screen.getByAltText('editar aluno');
    fireEvent.click(editButton);

    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'Nome Atualizado' } });
    fireEvent.change(screen.getByPlaceholderText('CPF'), { target: { value: '09876543210' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'novoemail@teste.com' } });

    fireEvent.click(screen.getByValue('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao atualizar o aluno')).toBeInTheDocument();
    });
  });

  test('should handle delete failure', async () => {
    // Mock de uma resposta de erro
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(<CadsAlunos id="1" nome="Nome Teste" email="email@teste.com" cpf="12345678900" onDelete={mockOnDelete} onUpdate={mockOnUpdate} oficinaId="1" />);
    
    const deleteButton = screen.getByAltText('excluir aluno');
    fireEvent.click(deleteButton);

    // Simular o clique no botão "Sim"
    const confirmButton = screen.getByText('Sim');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText('Erro ao excluir o aluno')).toBeInTheDocument();
    });
  });

  test('should not call handleDelete if no token is available', async () => {
    // Remove o token para simular a ausência dele
    localStorage.removeItem('token');

    render(<CadsAlunos id="1" nome="Nome Teste" email="email@teste.com" cpf="12345678900" onDelete={mockOnDelete} onUpdate={mockOnUpdate} oficinaId="1" />);
    
    const deleteButton = screen.getByAltText('excluir aluno');
    fireEvent.click(deleteButton);

    // Simular o clique no botão "Sim"
    const confirmButton = screen.getByText('Sim');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnDelete).not.toHaveBeenCalled();
      expect(screen.getByText('Token de autenticação não encontrado')).toBeInTheDocument();
    });
  });
});
