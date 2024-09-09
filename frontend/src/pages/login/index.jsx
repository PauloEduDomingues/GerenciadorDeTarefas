import './styles.css'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth/useAuth'
import { toast } from 'react-toastify';

export function Login() {

  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event) => {

    event.preventDefault();

    try{

      await auth.signIn(email, password);
      toast.success('Login efetuado com sucesso!')

      return <Navigate to="/tasks" />

    }catch(error){

      const message = error.response.data.message
      toast.error(message)

    }
  }

  if(!auth.signed) {
    return (
      <form onSubmit={onSubmit} className='form-login'>
        <div className='form-login-content'>
          <h1>Login</h1>
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
          <input type='submit' value='Enviar' />
          <Link to="/register">Registrar-se</Link>
        </div>
      </form>
    )

  } else {
    return <Navigate to="/tasks" />
  }

}
