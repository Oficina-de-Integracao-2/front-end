import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CadsAlunos from '../CadsAlunos/CadsAlunos';

import './Cards.scss';
import bars from '../../assets/Frame-1.png';
import trash from '../../assets/Frame.png';
import edit from '../../assets/Page-1.png';

function Cards(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cidade, setCidade] = useState('');
  const [cargahora, setCargahora] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState('');
  const [alunosOficina, setAlunosOficina] = useState([]); // Alunos cadastrados na oficina
  const [todosAlunos, setTodosAlunos] = useState([]); // Todos os alunos disponíveis
  const [alunosDisponiveis, setAlunosDisponiveis] = useState([]); // Alunos que não estão na oficina

  useEffect(() => {
    fetchOficinaData();
    fetchAlunosData();
    fetchTodosAlunos();
  }, [props.id]);

  const fetchOficinaData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autenticação não encontrado');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/api/oficina/${props.id}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setCidade(data.city_of_realization);
        setCargahora(data.workload);
        setData(data.date_of_realization);
        setHora(data.time_of_realization);
      } else if (response.status === 403) {
        console.error('Acesso proibido. Verifique suas permissões.');
      } else {
        console.error('Erro ao carregar os dados da oficina');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const fetchAlunosData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autenticação não encontrado');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/api/presenca/oficina/${props.id}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAlunosOficina(data);
        filterAlunosDisponiveis(todosAlunos, data);
      } else if (response.status === 403) {
        console.error('Acesso proibido. Verifique suas permissões.');
      } else {
        console.error('Erro ao carregar os dados dos alunos');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const fetchTodosAlunos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autenticação não encontrado');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/api/aluno/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTodosAlunos(data);
        filterAlunosDisponiveis(data, alunosOficina);
      } else if (response.status === 403) {
        console.error('Acesso proibido. Verifique suas permissões.');
      } else {
        console.error('Erro ao carregar todos os alunos');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const filterAlunosDisponiveis = (todosAlunos, alunosOficina) => {
    const idsAlunosOficina = alunosOficina.map(aluno => aluno.id);
    const alunosNaoCadastrados = todosAlunos.filter(aluno => !idsAlunosOficina.includes(aluno.id));
    setAlunosDisponiveis(alunosNaoCadastrados);
  };

  const handleSavePresenca = async (e, close) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/presenca/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aluno: alunoSelecionado,
          oficina: props.id,
          presente: true,
        }),
      });

      if (response.ok) {
        await fetchAlunosData(); // Atualiza a lista de alunos da oficina
        close(); // Fecha o modal
      } else {
        console.error('Erro ao salvar a presença');
      }
    } catch (error) {
      console.error('Erro ao salvar a presença:', error);
    }
  };

  const handleUpdateOficina = async (e, close) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/oficina/${props.id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          city_of_realization: cidade,
          workload: cargahora,
          date_of_realization: data,
          time_of_realization: hora,
        }),
      });

      if (response.ok) {
        const updatedOficina = await response.json(); // Obtém os dados atualizados da oficina

        // Atualiza o estado da oficina
        props.onEdit(props.id, updatedOficina);

        close(); // Fecha o modal
      } else {
        console.error('Erro ao atualizar a oficina');
      }
    } catch (error) {
      console.error('Erro ao atualizar a oficina:', error);
    }
  };


  return (
    <div id={props.id} className='card'>
      <div className='content-data'>
        <h5>{props.title}</h5>
        <span>{props.prof}</span>
        <span>Alunos: {props.qtdAlunos}</span>
        <span>Data: {props.data}</span>
        <span>Carga Horária: {props.hora}</span>
      </div>
      <div className='content-description'>
        <p>{props.description}</p>
        <div className='content-imgs'>
          <Popup
            trigger={<img src={bars} alt="alunos presentes" />}
            modal
            nested
          >
            {close => (
              <div className="modal">
                <div className="header"><h2>Alunos</h2></div>
                <div className="content">
                  <div className='content-cardss'>
                    {alunosOficina.map((item) => (
                      <CadsAlunos key={item.id} nome={item.nome} email={item.email} id={item.id} cpf={item.cpf} />
                    ))}
                  </div>
                  <div className='content-buttons'>
                    <Popup
                      trigger={<button>Marcar Presença</button>}
                      modal
                      nested
                    >
                      {close => (
                        <div className="modal">
                          <div className="header"><h2>Marcar Presença</h2></div>
                          <div className="content">
                            <form className='forms-presenca' onSubmit={(e) => handleSavePresenca(e, close)}>
                              <select
                                value={alunoSelecionado}
                                onChange={(e) => setAlunoSelecionado(e.target.value)}
                                required
                              >
                                <option value="">Selecione um aluno</option>
                                {alunosDisponiveis.map(aluno => (
                                  <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                                ))}
                              </select>
                              <input type="submit" value="Salvar" className='btn-submit' />
                            </form>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </div>
                </div>
              </div>
            )}
          </Popup>

          <Popup
            trigger={<img src={trash} alt="excluir" />}
            modal
            nested
          >
            {close => (
              <div className="modal">
                <div className="header"><h2>Deseja realmente excluir esta oficina?</h2></div>
                <div className="content">
                  <div className='content-buttons'>
                    <button>Sim</button>
                    <button onClick={() => close()} className='btn-no'>Não</button>
                  </div>
                </div>
              </div>
            )}
          </Popup>

          <Popup
            trigger={<img src={edit} alt="editar" />}
            modal
            nested
            onOpen={fetchOficinaData}
          >
            {close => (
              <div className="modal">
                <div className="header"><h2>Editar oficina</h2></div>
                <div className="content">
                  <form onSubmit={(e) => handleUpdateOficina(e, close)}>
                    <input type="text" placeholder='Título' onChange={(e) => setTitle(e.target.value)} value={title} />
                    <input type="text" placeholder='Descrição' onChange={(e) => setDescription(e.target.value)} value={description} />
                    <input type="text" placeholder='Cidade' onChange={(e) => setCidade(e.target.value)} value={cidade} />
                    <input type="text" placeholder='Carga Horária' onChange={(e) => setCargahora(e.target.value)} value={cargahora} />
                    <input type="date" placeholder='Data' onChange={(e) => setData(e.target.value)} value={data} />
                    <input type="time" placeholder='Hora' onChange={(e) => setHora(e.target.value)} value={hora} />
                    <input type="submit" value="Salvar" className='btn-submit' />
                  </form>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default Cards;
