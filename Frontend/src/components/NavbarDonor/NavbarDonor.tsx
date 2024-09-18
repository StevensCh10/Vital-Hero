import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const NavbarDonor = () => {
  const auth = useContext(AuthContext);

  const linkStyle = "text-[1em] mx-5 text-[#092f41] hover:text-[#035e89]";

  const handleLogout = (e: any) => {
    e.preventDefault();
    auth.signout();
  };

  return (
    <nav className="flex box-border w-full justify-between items-center p-[10px] mb-[1%]">
      <div className="flex items-center cursor-pointer">
        <Link className="text-[#b80e14]" to="/">
          <div className="flex items-center align-center">
            <img className="w-[45px] md:w-[45px]" src="/Logo.png" alt="Logo" />
          </div>
        </Link>
      </div>
      <div className="flex items-center">
        <Link className={linkStyle} to="/">Início</Link>
        <Link className={linkStyle} to="/bloodcenters">Hemocentros</Link>
        <Link className={linkStyle} to="/scheduling-donation">Agendamento e Doações</Link>
        <Link className={linkStyle} to="/feedback">Feedback</Link>
        <Link className={linkStyle} to="/profile">Perfil</Link>
        <Link className={`${linkStyle} mx-0 ml-5`} onClick={handleLogout} to="/">Sair</Link>
      </div>
    </nav>
  );
};

export default NavbarDonor;
