import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from '../../api/axios'; // Certifique-se de que o axios está configurado corretamente

import './Home.scss';
import Cards from '../Cards/Cards';
import Header from '../Header/Header';
import Menu from '../Menu/Menu'

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
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [todosAlunos, setTodosAlunos] = useState([]);


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
            } else if (response.status === 403) {
                console.error('Acesso proibido. Verifique suas permissões.');
            } else {
                console.error('Erro ao carregar todos os alunos');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const ALUNO_URL = 'http://127.0.0.1:8000/api/aluno/';

    const handleSubmitAluno = async (e) => {
        e.preventDefault();

        let tokenn = localStorage.getItem("token");

        try {
            const response = await axios.post(
                ALUNO_URL,
                {
                    nome: nome,  // Usando 'title' para o nome temporariamente, crie um estado separado para 'nome'
                    cpf: cpf,  // Usando 'cargahora' temporariamente, crie um estado separado para 'cpf'
                    email: email   // Usando 'cidade' temporariamente, crie um estado separado para 'email'
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenn}`
                    }
                }
            );

            setSucess(true);
            setNome('');
            setCpf('');
            setEmail('');

            await fetchTodosAlunos();

            // Atualize o estado para incluir o novo aluno
            // Se houver listagem de alunos, adicione o novo aluno na lista.

        } catch (error) {
            if (!error?.response) {
                setErrMsg('No server response');
                console.log('error', error);
            } else if (error.response?.status === 400) {
                setErrMsg('Missing or invalid fields');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Failed to register');
            }
        }

        if (props.atualizarTodosAlunos) {
            props.atualizarTodosAlunos();
        }
    };

    useEffect(() => {
        fetchTodosAlunos(); // Carregar alunos ao montar o componente
    }, []);


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

    const handleDeleteOficina = (idOficina) => {
        setOficinas(prevOficinas => prevOficinas.filter(oficina => oficina.id !== idOficina));
    };

    return (
        <div className='gray content-home'>
            <Header
                professor={professor}
                editProfessor={editProfessor}
                setEditProfessor={setEditProfessor}
                handleEditProfessor={handleEditProfessor}
            />

            <Menu
                handleSubmit={handleSubmit}
                handleSubmitAluno={handleSubmitAluno}
                setTitle={setTitle}
                setCidade={setCidade}
                setCargahora={setCargahora}
                setData={setData}
                setHora={setHora}
                setDescription={setDescription}
                title={title}
                cidade={cidade}
                cargahora={cargahora}
                data={data}
                hora={hora}
                description={description}
                nome={nome}
                setNome={setNome}
                cpf={cpf}
                setCpf={setCpf}
                email={email}
                setEmail={setEmail}
                fetchTodosAlunos={fetchTodosAlunos} // Passar função para buscar alunos
                todosAlunos={todosAlunos} // Passar a lista de alunos
            />

            <div className='container content-cards'>
                {oficinas.map((item) => (
                    <Cards
                        key={item.id}
                        oficinaId={item.id}
                        id={item.id}
                        title={item.title}
                        prof={item.professor.first_name}
                        qtdAlunos={item.qtdAlunos}
                        data={item.date_of_realization}
                        description={item.description}
                        hora={item.workload}
                        onEdit={handleEditOficina}
                        todosAlunos={todosAlunos}
                        fetchTodosAlunos={fetchTodosAlunos}
                        onDelete={handleDeleteOficina}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
