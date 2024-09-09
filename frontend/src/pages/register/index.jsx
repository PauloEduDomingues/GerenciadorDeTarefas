import { useState } from 'react'
import './styles.css'
import { api } from '../../lib/api'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onSubmit = async (event) => {
    
    event.preventDefault()

    if (password !== confirmPassword){
      toast.error('As senhas devem ser iguais!')
      return;
    }

    try{

      await api.post('/api/register', {

        name,
        email,
        password,

      })

      toast.success('Conta criada, por favor faça login')
      navigate('/login')

    }catch(error){

      const message = error.response.data.message
      toast.error(JSON.stringify(message))

    }

  }

  return (
    <form onSubmit={onSubmit} className='form-register'>
      <div className='form-register-content'>
        <h1>Cadastro</h1>
        <div>
          <label>Nome:</label>
          <input 
            onChange={(event) => setName(event.target.value)}
            type='text'
            placeholder='Seu nome' 
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            onChange={(event) => setEmail(event.target.value)}
            type='email' 
            placeholder='Seu email' 
            required 
          />
        </div>
        <div>
          <label>Senha:</label>
          <input 
            onChange={(event) => setPassword(event.target.value)}
            type='password' 
            placeholder='Sua senha' 
            required 
          />
        </div>
        <div>
          <label>Confirmar senha:</label>
          <input 
            onChange={(event) => setConfirmPassword(event.target.value)}
            type='password'
            placeholder='Confirmar senha' 
            required 
          />
        </div>
        <input type='submit' value='Enviar' />
        <Link to="/login">Login</Link>
      </div>
    </form>
  )

}
