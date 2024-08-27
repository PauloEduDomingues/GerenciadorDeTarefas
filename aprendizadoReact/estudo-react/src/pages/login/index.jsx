import { useState } from 'react'
import './styles.css'
import { api } from '../../lib/api'
import { Link, useNavigate } from 'react-router-dom'


export function Login() {
  const navigate = useNavigate()
  // useEffect(() => {
  //   fetch("http://localhost:3333/api/auth", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: "edu@gmail.com",
  //       password: "123"
  //     }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   }).then((response)=>{
  //     return response.json()
  //   }).then((response)=>{
  //     console.log(response)
  //   })
  // }, []);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event) => {
    
    event.preventDefault()

    try{

      const response = await api.post('/api/auth', {
        email,
        password
      })

      navigate('/tasks')

    }catch(error){
      console.log(error)
    }

  }

  return (
    <form onSubmit={onSubmit} className='form-login'>
      <div className='form-login-content'>
        <h1>Login</h1>
        <div>
          <label>Email:</label>
          <input 
            onChange={(event)=>{setEmail(event.target.value)}} 
            type='email' 
            placeholder='Seu email' 
            required 
          />
        </div>
        <div>
          <label>Senha:</label>
          <input 
            onChange={(event)=>{setPassword(event.target.value)}} 
            type='password' 
            placeholder='Sua senha' 
            required 
          />
        </div>
        <input type='submit' value='Enviar' />
        <Link to="/tasks">Registrar-se</Link>
      </div>
    </form>
  )

}
