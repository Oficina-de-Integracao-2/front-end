import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import './CadsAlunos.scss';

import trash from '../../assets/Frame.png';
import edit from '../../assets/Page-1.png';

function CadsAlunos(props) {
  const [Nome, setNome] = useState(props.nome);
  const [Email, setEmail] = useState(props.email);
  const [Cpf, setCpf] = useState(props.cpf);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/presenca/unmark/${props.id}/${props.oficinaId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        props.onDelete(props.id); // Chama a função de deleção no componente pai
      } else {
        console.error('Erro ao excluir o aluno');
      }
    } catch (error) {
      console.error('Erro ao excluir o aluno:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }

    const updatedAluno = {
      nome: Nome,
      cpf: Cpf,
      email: Email,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/aluno/${props.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedAluno),
      });

      if (response.ok) {
        const updatedData = await response.json();
        // Atualiza o estado local
        setNome(updatedData.nome);
        setEmail(updatedData.email);
        setCpf(updatedData.cpf);

        // Atualiza o componente pai com os novos dados
        props.onUpdate(props.id, updatedData);

        console.log('Aluno atualizado com sucesso!');
      } else {
        console.error('Erro ao atualizar o aluno');
      }
    } catch (error) {
      console.error('Erro ao atualizar o aluno:', error);
    }
  };

  return (
    <div className='cards-alunos'>
      <div className='content-alunos'>
        <p>{Nome}</p>
        <p>{Email}</p>
      </div>

      <div>
        <Popup
          trigger={<img src={trash} alt='excluir aluno' />}
          modal
          nested
        >
          {close => (
            <div className="modal">
              <div className="header"><h2>Deseja realmente excluir este aluno?</h2></div>
              <div className="content">
                <div className='content-buttons'>
                  <button onClick={() => {
                    handleDelete();
                    close();
                  }}>Sim</button>
                  <button onClick={() => close()} className='btn-no'>Não</button>
                </div>
              </div>
            </div>
          )}
        </Popup>

        <Popup
          trigger={<img src={edit} alt='editar aluno' />}
          modal
          nested
        >
          {close => (
            <div className="modal">
              <div className="header"><h2>Editar Cadastro</h2></div>
              <div className="content">
                <form onSubmit={handleUpdate}>
                  <input
                    placeholder='Nome'
                    type="text"
                    onChange={(e) => setNome(e.target.value)}
                    value={Nome} />
                  <input
                    placeholder='CPF'
                    type="text"
                    onChange={(e) => setCpf(e.target.value)}
                    value={Cpf} />
                  <input
                    placeholder='Email'
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={Email} />
                  <input
                    type="submit"
                    value="Salvar"
                    className='btn-submit'
                    onClick={close}
                  />
                </form>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
}

export default CadsAlunos;
