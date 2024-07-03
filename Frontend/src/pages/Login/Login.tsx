import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { ErrorType } from "../../types/ErrorType";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      try{
        const isLogged = await auth.signin(email, password);
        console.log(isLogged)
        if (isLogged) {
          navigate("/");
        }
      }catch(error){
        alert((error as ErrorType).detail);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo-container">
          <h1 className="logo-text">Vital</h1>
          <img src="/Logo.png" alt="Logo" className="logo-image-login" />
          <h1 className="logo-text">Hero</h1>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <label>Email:</label>
          <input
          style={{marginBottom: "3%"}}
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha:</label>
          <input
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          ></span>

          <p className="forgot-password">
            <Link to="/forgot-password">Esqueceu a senha?</Link>
          </p>

          <button type="submit">
            Entrar
          </button>
        </form>

        <p className="signup-link">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>

        <p className="signup-link-doctor">
          É da área de saúde e deseja colaborar conosco? <Link to="/register-doctor">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
