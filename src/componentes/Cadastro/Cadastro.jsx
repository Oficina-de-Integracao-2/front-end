import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.scss'
import axios from '../../api/axios'

import logo from '../../Images/ELLP 1.png'
const LOGIN_URL = 'api/professor/'


function Cadastro() {

    const errRef = useRef()
    const [username, setUser] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [last_name, setLast_name] = useState('')
    const [password, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [sucess, setSucess] = useState(false)

    useEffect(() => {
        setErrMsg('')
    }, [username, password, first_name, email, cpf, last_name])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                { username: username, first_name: first_name, last_name: last_name, is_superuser: false, email: email, cpf: cpf, password: password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data))
            // console.log(JSON.stringify(response))

            setUser('')
            setFirst_name('')
            setEmail('')
            setPwd('')
            setLast_name('')
            setCpf('')
            setSucess(true)
        } catch (error) {
            if (!error?.response) {
                setErrMsg('no server response',)
                console.log('error', error)
            } else if (error.response?.status === 400) {
                setErrMsg('preencha todos os campos corretamente')
            } else if (error.response?.status === 401) {
                setErrMsg('unaythorized')
            } else {
                setErrMsg('Login failed')
            }
        }
    }

    return (
        <div className='container'>
            <div className='box'>
                <form onSubmit={handleSubmit}>
                    <img src={logo} alt="logo ellp" className='logo ellp' />
                    <h3>Cadastro</h3>
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                    <input
                        placeholder='Nome de usuario'
                        type="text"
                        onChange={(e) => setUser(e.target.value)}
                        value={username}
                        required />
                    <input
                        placeholder='Primeiro nome'
                        type="text"
                        onChange={(e) => setFirst_name(e.target.value)}
                        value={first_name}
                        required />
                    <input
                        placeholder='Ultimo nome'
                        type="text"
                        onChange={(e) => setLast_name(e.target.value)}
                        value={last_name}
                        required />
                    <input
                        placeholder='E-mail'
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required />
                    <input
                        placeholder='CPF'
                        type="text"
                        onChange={(e) => setCpf(e.target.value)}
                        value={cpf}
                        required />
                    <input
                        placeholder='Senha'
                        type="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={password}
                        required />
                    <button className='button'>Cadastrar</button>
                    <Link to="/">
                        <button>Login</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Cadastro