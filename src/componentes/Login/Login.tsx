import React from 'react'
import './Login.scss'

import logo from '../../Images/ELLP 1.png'

function Login() {
    return (
        <div className='container'>
            <div className='box'>
                <img src={logo} alt="logo ellp" />
                <h3>Autenticação</h3>
                <input placeholder='E-mail' type="text" />
                <input placeholder='Senha' type="text" />
                <button className='button'>Login</button>
                <button>Cadastro</button>
            </div>
        </div>
    )
}

export default Login