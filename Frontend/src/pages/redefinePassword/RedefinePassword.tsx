import { Link, useLocation, useNavigate } from "react-router-dom";
import "./RedefinePassword.css";
import { useState, useRef, useEffect, useContext } from "react"; // Adicionei useRef para as referências dos inputs
import { AuthContext } from "../../contexts/Auth/AuthContext";

const RedefinePassword = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false); // Adicionei o estado para acompanhar se a senha foi alterada com sucesso
  const newPasswordRef = useRef<HTMLInputElement>(null); // Referência para o input de nova senha
  const confirmPasswordRef = useRef<HTMLInputElement>(null); // Referência para o input de confirmação de senha
  const [id, setId] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("id");
    if (userId) {
      setId(userId);
    }
  }, [location]);

  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setNewPassword("");
      setConfirmPassword("");
      return;
    }
    auth.updatePassword(Number(id), newPassword);
    setPasswordChanged(true);
    alert("Senha alterada com sucesso!");
    navigate("/");
  };

  return (
    <div className="redefine-password-container">
      <div className="navbar-center-home" style={{ marginTop: "2%" }}>
        <Link to="/" style={{ color: "rgb(184, 14, 20)" }}>
          <div className="logo-container-home">
            <h1 className="logo-text">Vital</h1>
            <img src="/Logo.png" alt="Logo" className="logo-image" />
            <h1 className="logo-text">Hero</h1>
          </div>
        </Link>
      </div>
      <div
        style={{ minHeight: "71.5vh", textAlign: "center", marginTop: "5%" }}
      >
        <span>Redefinir Senha</span>
        <div className="change-password-content">
          <form onSubmit={handleSubmit} className="change-password-form">
            <label htmlFor="newPassword">Nova Senha:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleChangeNewPassword}
              required
              ref={newPasswordRef}
            />

            <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              required
              ref={confirmPasswordRef}
              className={
                newPassword !== confirmPassword && confirmPassword !== ""
                  ? "error"
                  : ""
              }
            />
            <button type="submit">Alterar Senha</button>
            {passwordChanged && <p>Senha alterada com sucesso!</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RedefinePassword;
