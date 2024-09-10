import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';

function Menu({ handleSubmit, handleSubmitAluno, setTitle, setCidade, setCargahora, setData, setHora, setDescription, title, cidade, cargahora, data, hora, description, nome, setNome, cpf, setCpf, email, setEmail }) {
    const [oficinas, setOficinas] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [selectedOficina, setSelectedOficina] = useState('');
    const [selectedAluno, setSelectedAluno] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        // Fetch oficinas and alunos when the component mounts
        const fetchOficinas = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/oficina/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setOficinas(response.data);
            } catch (error) {
                console.error('Erro ao buscar oficinas:', error);
            }
        };

        const fetchAlunos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/aluno/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setAlunos(response.data);
            } catch (error) {
                console.error('Erro ao buscar alunos:', error);
            }
        };

        fetchOficinas();
        fetchAlunos();
    }, [token]);

    const handleGenerateCertificate = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/certificate/generate/${selectedAluno}/${selectedOficina}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                responseType: 'blob' // Recebe o PDF como Blob
            });

            // Cria um Blob a partir da resposta do PDF
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

            // Cria uma URL para o Blob e abre em uma nova aba
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl); // Abre o PDF em uma nova aba

        } catch (error) {
            console.error('Erro ao gerar certificado:', error);
            alert('Erro ao gerar certificado. Tente novamente.');
        }
    };

    return (
        <div className='menu container'>
            <Popup trigger={<a href="#">Criar oficina</a>} modal nested>
                {close => (
                    <div className="modal">
                        <div className="header"><h2>Cadastrar Oficina</h2></div>
                        <div className="content">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Título"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Cidade"
                                    value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Carga Horária"
                                    value={cargahora}
                                    onChange={(e) => setCargahora(e.target.value)}
                                />
                                <input
                                    type="date"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                />
                                <input
                                    type="time"
                                    value={hora}
                                    onChange={(e) => setHora(e.target.value)}
                                />
                                <textarea
                                    placeholder="Descrição"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <button type="submit">Criar</button>
                            </form>
                        </div>
                    </div>
                )}
            </Popup>

            <Popup trigger={<a href="#">Gerar Certificado</a>} modal nested>
                {close => (
                    <div className="modal">
                        <div className="header"><h2>Gerar Certificado</h2></div>
                        <div className="content">
                            <form className='forms-presenca' onSubmit={handleGenerateCertificate}>
                                <select value={selectedOficina} onChange={(e) => setSelectedOficina(e.target.value)} required>
                                    <option value="">Selecione a Oficina</option>
                                    {oficinas.map(oficina => (
                                        <option key={oficina.id} value={oficina.id}>{oficina.title}</option>
                                    ))}
                                </select>
                                <select value={selectedAluno} onChange={(e) => setSelectedAluno(e.target.value)} required>
                                    <option value="">Selecione o Aluno</option>
                                    {alunos.map(aluno => (
                                        <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                                    ))}
                                </select>
                                <button type="submit">Gerar Certificado</button>
                            </form>
                        </div>
                    </div>
                )}
            </Popup>

            <Popup trigger={<a href="#">Cadastrar Aluno</a>} modal nested>
                {close => (
                    <div className="modal">
                        <div className="header"><h2>Cadastrar Aluno</h2></div>
                        <div className="content">
                            <form onSubmit={handleSubmitAluno}>
                                <input
                                    type="text"
                                    placeholder='Nome'
                                    onChange={(e) => setNome(e.target.value)}
                                    value={nome}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder='CPF'
                                    onChange={(e) => setCpf(e.target.value)}
                                    value={cpf}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                                <input type="submit" value="Cadastrar" className='btn-submit' />
                            </form>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
}

export default Menu;
