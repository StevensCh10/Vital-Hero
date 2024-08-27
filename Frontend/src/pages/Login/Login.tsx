import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ErrorType } from "../../types/ErrorType";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      try{
        const isLogged = await auth.signin(email, password);
        if (isLogged) {
          navigate("/");
        }
      }catch(error){
        alert((error as ErrorType).detail);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[97vh]">
      <div className="flex flex-col items-center w-[340px] bg-white rounded-[20px] pt-[3%] pb-[3%]">
        <div className="w-[100%] flex flex-row justify-center mb-[1%] text-[#b80e14] mb-[8%]">
          <h1 className="flex text-5xl m-0 text-center items-center mr-1">Vital</h1>
          <img src="/Logo.png" alt="Logo" className="w-[60px] h-[65px]" />
          <h1 className="flex text-5xl m-0 text-center items-center">Hero</h1>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col items-center text-start w-full">
          <label className="w-[69%] mb-[1%] text-lg" >Email:</label>
          <input
            className="w-[70%] p-2.5 box-border mb-[3%] rounded-[5px] bg-[#00000015] text-base focus:outline-none focus:border-[#1a3744]"
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="w-[69%] mb-[1%] text-lg">Senha:</label>
          <input
            className="w-[70%] p-2.5 box-border mb-[1%] rounded-[5px] bg-[#00000015] text-base focus:outline-none focus:border-[#1a3744]"
            placeholder="Senha"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="mt-0 mb-5">
            <Link className="text-[#b80e14] hover:text-[#b80e14a4]" to="/forgot-password">Esqueceu a senha?</Link>
          </p>

          <button type="submit" className="bg-[#b80e14] rounded-lg w-[30%] text-white p-[8px] border-none cursor-pointer mb-5 hover:bg-[#b80e14a4]">
            Entrar
          </button>
        </form>

        <p className="w-[80%] text-center">
          Não tem uma conta? <Link className="text-[#b80e14] hover:text-[#b80e14a4]" to="/register">Cadastre-se</Link>
        </p>

        <p className="mt-[3%] font-[13px] w-[80%] text-center opacity-80">
          É da área de saúde e deseja colaborar conosco? <Link className="text-[#b80e14] hover:text-[#b80e14a4]" to="/register-doctor">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
