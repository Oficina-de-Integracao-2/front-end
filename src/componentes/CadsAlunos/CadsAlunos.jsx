import React from 'react'
import Popup from 'reactjs-popup';
import './CadsAlunos.scss'


import trash from '../../assets/Frame.png';
import edit from '../../assets/Page-1.png';

function CadsAlunos(props) {
  return (
    <div className='cards-alunos'>
      <div className='content-alunos'>
        <p>{props.nome}</p>
        <p>{props.email}</p>
      </div>

      <div>
        <Popup
          trigger={<img src={trash} alt='excluir aluno' />}
          modal
          nested
        >
          {close => (
            <div className="modal">
              <div className="header"><h2>Deseja realmente excluir este aluno ?</h2></div>
              <div className="content">
                <div className='content-buttons'>
                  <button>Sim</button>
                  <button onClick={() => close()} className='btn-no'>Não</button>
                </div>
              </div>
            </div>
          )}
        </Popup>
        <img src={edit} alt='excluir aluno' />
      </div>
    </div>
  )
}

export default CadsAlunos