import React from 'react'
import { Link } from 'react-router-dom';
import './Login.scss'

import logo from '../../Images/ELLP 1.png'

function Login() {
    return (
        <div className='container'>
            <div className='box'>
                <img src={logo} alt="logo ellp"/>
                <h3>Autenticação</h3>
                <input placeholder='E-mail' type="text"/>
                <input placeholder='Senha' type="text"/>
                <button className='button'>Login</button>
                <Link to="/cadastro">
                    <button>Cadastro</button>
                </Link>
            </div>
        </div>
    )
}

export default Login