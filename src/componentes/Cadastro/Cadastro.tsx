import React from 'react'
import { Link } from 'react-router-dom';
import './Cadastro.scss'


import logo from '../../Images/ELLP 1.png'

function Cadastro() {
    return (
        <div className='container'>
            <div className='box'>
                <img src={logo} alt="logo ellp" />
                <h3>Cadastro</h3>
                <input placeholder='E-mail' type="text" />
                <input placeholder='Senha' type="text" />
                <input placeholder='CPF' type="text" />
                <input placeholder='Titulação' type="text" />
                <input placeholder='Data de Admissão' type="text" />
                <input placeholder='Senha' type="text" />
                <button className='button'>Cadastrar</button>
                <Link to="/">
                    <button>Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Cadastro