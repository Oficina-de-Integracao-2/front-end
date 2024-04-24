import { Link } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider'
import axios from '../../api/axios'
import CadastroOficina from '../CadastroOficina/CadastroOficina';


import './Login.scss'
import logo from '../../Images/ELLP 1.png'


const LOGIN_URL = 'api/login/'

function Login() {
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef()
    const errRef = useRef()

    const [username, setUser] = useState('')
    const [password, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [sucess, setSucess] = useState('')

    useEffect(() => {
      userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                { username: username, password: password },
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data))
            // console.log(JSON.stringify(response))
            const acessToken = response?.data?.acessToken
            localStorage.setItem("token", JSON.stringify(response?.data.access));

            setAuth({username, password, acessToken})
            setUser('')
            setPwd('')
            setSucess(true)
        } catch (error) {
            if(!error?.response){
                setErrMsg('no server response', )
                console.log('error', error)
            }else if(error.response?.status === 400) {
                setErrMsg('missing username or password')
            }else if( error.response?.status === 401) {
                setErrMsg('unaythorized')
            }else {
                setErrMsg('Login failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {sucess ? (
                <CadastroOficina />
            ) : (
                <div className='container'>
                    <div className='box'>
                        <img src={logo} alt="logo ellp" />
                        <h3>Autenticação</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                placeholder='Nome de Usuário'
                                id='username'
                                ref={userRef}
                                onChange={(e) => setUser(e.target.value)}
                                type="text"
                                value={username}
                                required />
                            <input
                                placeholder='Senha'
                                id='password'
                                type="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={password}
                                required />
                            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                            <button className='button'>Login</button>
                            <Link to={'/cadastro'}>
                                <button>Cadastro</button>
                            </Link>
                        </form>

                    </div>
                </div>

            )}
        </>
    )
}

export default Login