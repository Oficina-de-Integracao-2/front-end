import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from '../../api/axios'; // Certifique-se de que o axios está configurado corretamente

import './Home.scss';
import logo from '../../Images/ELLP 1.png';
import edit from '../../Images/edit.png';
import sair from '../../Images/sair.png';
import Cards from '../Cards/Cards';

const OFICINA_URL = 'http://127.0.0.1:8000/api/oficina/';
const PROFESSOR_URL = 'http://127.0.0.1:8000/api/professor/';

function Home({ name }) {
    const [oficinas, setOficinas] = useState([]);
    const [professor, setProfessor] = useState(null);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cidade, setCidade] = useState('');
    const [cargahora, setCargahora] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [sucess, setSucess] = useState(false);
    const [editProfessor, setEditProfessor] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        cpf: '',
        password: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Carregar oficinas
        axios.get(OFICINA_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setOficinas(response.data.filter(oficina => oficina.professor.username.toLowerCase() === name.toLowerCase()));
            })
            .catch(error => {
                console.error('Erro ao buscar as oficinas:', error);
            });

        // Carregar dados do professor
        axios.get(PROFESSOR_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const prof = response.data.find(prof => prof.username.toLowerCase() === name.toLowerCase());
                if (prof) {
                    setProfessor(prof);
                    setEditProfessor({
                        username: prof.username || '',
                        first_name: prof.first_name || '',
                        email: prof.email || '',
                        cpf: prof.cpf || '',
                        last_name: prof.last_name || '',
                        password: ''
                    });
                } else {
                    console.error('Professor não encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o professor:', error);
            });
    }, [name]);

    const handleEditOficina = (id, updatedOficina) => {
        setOficinas(oficinas.map(oficina =>
            oficina.id === id ? { ...oficina, ...updatedOficina } : oficina
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let tokenn = localStorage.getItem("token");

        try {
            const response = await axios.post(
                OFICINA_URL,
                {
                    title: title,
                    description: description,
                    city_of_realization: cidade,
                    workload: cargahora,
                    date_of_realization: data,
                    time_of_realization: hora,
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenn}`
                    }
                }
            );

            setSucess(true);
            setTitle('');
            setCidade('');
            setCargahora('');
            setData('');
            setHora('');
            setDescription('');

            // Atualiza o estado das oficinas
            setOficinas([...oficinas, response.data]);

        } catch (error) {
            if (!error?.response) {
                setErrMsg('no server response');
                console.log('error', error);
            } else if (error.response?.status === 400) {
                setErrMsg('missing title or description');
            } else if (error.response?.status === 401) {
                setErrMsg('unauthorized');
            } else {
                setErrMsg('failed');
            }
        }
    };

    const handleEditProfessor = async (e, close) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        const token = localStorage.getItem('token');
        const id = professor.id;

        try {
            const response = await axios.put(`${PROFESSOR_URL}${id}/`, {
                username: editProfessor.username,
                first_name: editProfessor.first_name,
                last_name: editProfessor.last_name,
                email: editProfessor.email,
                cpf: editProfessor.cpf,
                password: editProfessor.password
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Atualiza o professor e a lista de oficinas
            setProfessor(response.data);
            setSuccess(true);
            close(); // Fecha o popup

            // Recarregar as oficinas após a atualização
            axios.get(OFICINA_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setOficinas(response.data.filter(oficina => oficina.professor.username.toLowerCase() === name.toLowerCase()));
                })
                .catch(error => {
                    console.error('Erro ao atualizar as oficinas:', error);
                });
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No server response');
            } else if (error.response?.status === 400) {
                setErrMsg(`Bad Request: ${error.response.data.detail || 'Dados inválidos'}`);
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Failed to update');
            }
            console.error('Erro na requisição:', error);
        }
    };


    return (
        <div className='gray content-home'>
            <header className='container light-gray'>
                <div className='container-logo'>
                    <img src={logo} alt="logo ellp" />
                    {professor && (
                        <div className='container-infos'>
                            <span>Professor: {professor.first_name}</span>
                            <span>CPF: {professor.cpf}</span>
                            <span>E-mail: {professor.email}</span>
                            {professor.oficinas?.length && <span>Oficinas: {professor.oficinas?.length}</span>}
                        </div>
                    )}
                </div>
                <div className='container-actions'>
                    <Popup
                        trigger={<img src={edit} alt="edit" className='edit-cadastro' />}
                        modal
                        nested
                        onClose={() => setErrMsg('')} // Limpar mensagem de erro ao fechar o popup
                    >
                        {close => (
                            <div className="modal">
                                <div className="header"><h2>Editar Cadastro</h2></div>
                                <div className="content">
                                    <form onSubmit={(e) => handleEditProfessor(e, close)}>
                                        <input
                                            type="text"
                                            placeholder='username'
                                            value={editProfessor.username}
                                            onChange={(e) => setEditProfessor({ ...editProfessor, username: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder='Nome'
                                            value={editProfessor.first_name}
                                            onChange={(e) => setEditProfessor({ ...editProfessor, first_name: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder='Ultimo Nome'
                                            value={editProfessor.last_name}
                                            onChange={(e) => setEditProfessor({ ...editProfessor, last_name: e.target.value })}
                                        />
                                        <input
                                            type="email"
                                            placeholder='E-mail'
                                            value={editProfessor.email}
                                            onChange={(e) => setEditProfessor({ ...editProfessor, email: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder='CPF'
                                            value={editProfessor.cpf}
                                            onChange={(e) => setEditProfessor({ ...editProfessor, cpf: e.target.value })}
                                        />
                                        <input
                                            type="password"
                                            placeholder='Senha'
                                            value={editProfessor.password}
                                            onChange={(e) => setEditProfessor({ ...editProfessor, password: e.target.value })}
                                        />
                                        <input
                                            type="submit"
                                            value="Salvar"
                                            className='btn-submit'
                                        />
                                    </form>
                                </div>
                            </div>
                        )}
                    </Popup>

                    <a href="/"><img src={sair} alt="sair" /></a>
                </div>
            </header>
            <div className='menu container'>
                <Popup
                    trigger={<a href="#">Criar oficina</a>}
                    modal
                    nested
                >
                    {close => (
                        <div className="modal">
                            <div className="header"><h2>Cadastrar Oficina </h2></div>
                            <div className="content">
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder='Título' onChange={(e) => setTitle(e.target.value)} value={title} required />
                                    <input type="number" placeholder='Carga horária' onChange={(e) => setCargahora(e.target.value)} value={cargahora} required />
                                    <input type="text" placeholder='Cidade de realizacao' onChange={(e) => setCidade(e.target.value)} value={cidade} required />
                                    <input type="date" placeholder='Data de realizacao' onChange={(e) => setData(e.target.value)} value={data} required />
                                    <input type="time" placeholder='Horario de realizacao' onChange={(e) => setHora(e.target.value)} value={hora} required />
                                    <textarea type="text" placeholder='Descricao' onChange={(e) => setDescription(e.target.value)} value={description} required />
                                    <input type="submit" value="Cadastrar" className='btn-submit' />
                                </form>
                            </div>
                        </div>
                    )}
                </Popup>
                <a href="#">Gerar Certificado</a>
                <a href="#">Cadastrar Aluno</a>
            </div>
            <div className='container content-cards'>
                {oficinas.map((item) => (
                    <Cards
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        prof={item.professor.first_name}
                        qtdAlunos={item.qtdAlunos}
                        data={item.date_of_realization}
                        description={item.description}
                        hora={item.workload}
                        onEdit={handleEditOficina}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
