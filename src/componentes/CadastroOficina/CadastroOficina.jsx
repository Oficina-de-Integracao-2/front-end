import React,{ useRef, useState, useEffect, useContext } from 'react';
import './CadastroOficina.scss'
import axios from '../../api/axios'

const OFICINA_URL = 'api/oficina/'

function CadastroOficina() {

  const errRef = useRef()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [sucess, setSucess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    let tokenn = localStorage.getItem("token")

    try {

      console.log('token', tokenn)
      console.log('title', title)
      console.log('description', description)

      const response = await axios.post(
        OFICINA_URL,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenn}`
          }
        }
      );

      setSucess(true)
      setTitle('')
      setDescription('')

    } catch (error) {
      if (!error?.response) {
        setErrMsg('no server response',)
        console.log('error', error)
      } else if (error.response?.status === 400) {
        setErrMsg('missing title or description')
      } else if (error.response?.status === 401) {
        setErrMsg('unaythorized')
      } else {
        setErrMsg('failed')
      }
      errRef.current.focus();
    }

  }

  return (
    <div className='section-cadastro'>
      <h1>Cadastro de Oficina</h1>
      { sucess ? <h4>cadastro realizado</h4> : '  '}
      <form onSubmit={handleSubmit}>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
        <input
          placeholder='Titulo'
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required />
        <input
          placeholder='Descrição'
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required />
        <button className='button'>Cadastrar</button>
      </form>
    </div>
  )
}

export default CadastroOficina