import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const NavbarDonor = () => {
  const auth = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = (e: any) => {
    e.preventDefault();
    auth.signout();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const linkStyle = "p-1 text-[1em] mx-5 text-black hover:text-[#b80e14] filter drop-shadow-sm opacity-90";
  const linkStyleModal = "flex p-1 text-black hover:text-[#b80e14] filter drop-shadow-sm opacity-90";

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex box-border w-full justify-between items-center p-[10px] mb-[1%]">
      <div className="flex items-center cursor-pointer">
        <Link className="text-[#b80e14]" to="/">
          <div className="flex items-center align-center">
            <img className="w-[45px] md:w-[45px]" src="/Logo.png" alt="Logo" />
          </div>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={toggleModal}
          className="text-[#b80e14] p-2 rounded-[50%] shadow-md"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex items-center">
        <Link className={`${linkStyle} ${isActive('/') || isActive('/home-donor') ? 'border-b-[3px] border-[#b80e14]' : ''}`} to="/">Início</Link>
        <Link className={`${linkStyle} ${isActive('/bloodcenters') ? 'border-b-[3px] border-[#b80e14]' : ''}`} to="/bloodcenters">Hemocentros</Link>
        <Link className={`${linkStyle} ${isActive('/scheduling-donation') ? 'border-b-[3px] border-[#b80e14]' : ''}`} to="/scheduling-donation">Agendamento e Doações</Link>
        <Link className={`${linkStyle} ${isActive('/feedback') ? 'border-b-[3px] border-[#b80e14]' : ''}`} to="/feedback">Feedback</Link>
        <Link className={`${linkStyle} ${isActive('/profile') ? 'border-b-[3px] border-[#b80e14]' : ''}`} to="/profile">Perfil</Link>
        <Link className="p-1 text-[1em] ml-5 text-black hover:text-[#b80e14] filter drop-shadow-sm opacity-90" onClick={handleLogout} to="/">Sair</Link>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-end mr-4 z-50">
          <div className="absolute top-12 bg-white text-[#0a747c] p-6 rounded-lg shadow-lg w-[50%] md:w-[25%] lg:w-[23%] ">
            <button
              onClick={toggleModal}
              className="float-right text-black font-bold"
            >
              &times;
            </button>
            <div>
              <Link className={linkStyleModal} to="/">Início</Link>
              <Link className={linkStyleModal} to="/bloodcenters">Hemocentros</Link>
              <Link className={linkStyleModal} to="/scheduling-donation">Agendamento e Doações</Link>
              <Link className={linkStyleModal} to="/feedback">Feedback</Link>
              <Link className={linkStyleModal} to="/profile">Perfil</Link>
              <Link className={linkStyleModal} onClick={handleLogout} to="/">Sair</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarDonor;
