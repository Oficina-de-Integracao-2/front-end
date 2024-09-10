import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import edit from '../../Images/edit.png';
import sair from '../../Images/sair.png';
import logo from '../../Images/ELLP 1.png';

function Header({ professor, editProfessor, setEditProfessor, handleEditProfessor }) {
    return (
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
    );
}

export default Header;
