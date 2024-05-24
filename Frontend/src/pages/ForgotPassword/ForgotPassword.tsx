import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './ForgotPassword.css'
import { ErrorType } from "../../types/ErrorType";

const ForgotPassword = () => {
    const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  //const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await auth.sendEmailForgotPassword(email);;
        if(response !== undefined){
            navigate("/");
        }
      } catch (error) {
          alert((error as ErrorType).detail);
          //navigate("/");
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="forgot-password-init">
            <p style={{marginBottom: "0"}}><img src="esqueceu-senha.png"></img></p>
            <p style={{marginBottom: "3%", fontSize: "20px"}}>Problema ao entrar?</p>
            <p style={{marginTop: "0", fontSize: "15px", opacity: "0.7"}}>Informe o seu email e enviaremos um link para você voltar a acessar a sua conta.</p>
        </div>
        <form onSubmit={handleLogin} className="forgot-password-form">
          <label>Email:</label>
          <input
            style={{ marginBottom: "3%" }}
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Enviar link para login</button>
        </form>

        <p className="new-account-link">
          <Link to="/register">Criar nova conta</Link>
          <Link to="/login">Voltar ao login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
