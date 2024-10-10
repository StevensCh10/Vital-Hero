import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ErrorType } from "../../types/ErrorType";
import Footer from "../../components/Footer/Footer";
import { CiLink } from "react-icons/ci";

const ForgotPassword = () => {
    const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  //const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      try {
        await auth.sendEmailForgotPassword(email);
        alert("E-mail enviado com sucesso!");
        navigate("/");
      } catch (error) {
        alert((error as ErrorType).detail);
        //navigate("/");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-[90%] xl:w-[32%] py-[1.5%] shadow-custom rounded-lg">
        <div className="flex flex-col items-center text-center w-[69%] mb-[5%]">
            <p className="mb-0"><img className="w-[100px]" src="esqueceu-senha.png"></img></p>
            <p className="mb-[3%] text-[20px]">Problema ao entrar?</p>
            <p className="mt-0 text-[15px] opacity-70">Informe o seu email e enviaremos um link para você voltar a acessar a sua conta.</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col items-center text-start w-full">
          <label className="w-[70%] mb-[1%] text-[18px]">Email:</label>
          <input
            className="w-[70%] p-[10px] box-border mb-[1%] rounded-md bg-[#00000015] mb-[3%] focus:outline-none"
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
          className="shadow-custom5 hover:bg-[#b80e14] rounded-lg xm:w-[23%] text-black hover:text-white p-[8px] border-none cursor-pointer mt-3 mb-6 md:w-[33%]"
          type="submit"
          >
            <span className="flex items-center justify-center">Enviar link <CiLink className="ml-2" size={22}/></span>
          </button>
        </form>

        <p className="flex flex-row justify-between w-[85%] my-[5%]">
          <Link className="hover:bg-black hover:text-white p-2 rounded-md" to="/register">Criar nova conta</Link>
          <Link className="hover:bg-black hover:text-white p-2 rounded-md" to="/login">Voltar ao login</Link>
        </p>
      </div>
      <div className="fixed bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default ForgotPassword;
