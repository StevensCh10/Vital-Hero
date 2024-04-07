import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css"

const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
        if(email && password){
            const isLogged = await auth.signin(email, password);
            if(isLogged){
                navigate("/")
            }else{
                //POSSO FAZER O QUE EU QUISER AQUI PRA AVISAR AO USUÁRIO 
            }
        }
    }

    return (
      <div className="login-container">
        <h1>Vital <img src="caminho-da-imagem/logo.png" alt="" /> Hero</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" onChange={e => setEmail(e.target.value)} required/>

          <label htmlFor="password">Senha:</label>
          <div className="password-container">
            <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} required/>
            <span className="toggle-password"></span>
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    )
  }
  
  export default Login
  