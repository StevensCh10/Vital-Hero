import { FaAlignJustify, FaUserLarge } from "react-icons/fa6";
import customStylesLeft from "./CustomStylesLeft";
import customStylesRight from "./CustomStylesRight";
import { useContext, useState } from "react"
import Modal from "react-modal";
import './Navbar.css'
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

const Navbar = () => {
    const auth = useContext(AuthContext);
    const [showLeftOptions, setShowLeftOptions] = useState(false);
    const [showRightOptions, setShowRightOptions] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [isModalLeftOpen, setIsModalLeftOpen] = useState(false);
    const [isModalRightOpen, setIsModalRightOpen] = useState(false);

    const toggleLeftOptions = (e: any) => {
      const buttonRect = e.currentTarget.getBoundingClientRect();
      setModalPosition({ top: buttonRect.bottom + window.scrollY, left: buttonRect.left + window.scrollX });
      setShowLeftOptions(!showLeftOptions);
      setIsModalLeftOpen(!isModalLeftOpen);
    };

    const toggleRightOptions = (e: any) => {
      const buttonRect = e.currentTarget.getBoundingClientRect();
      //const modalLeft = buttonRect.right - 270;
      setModalPosition({ top: buttonRect.bottom + window.scrollY, left: buttonRect.left - window.scrollX - 119});
      setShowRightOptions(!showRightOptions);
      setIsModalRightOpen(!isModalRightOpen);
    };

    const handleLogout = (e: any) => {
      e.preventDefault();
      auth.signout();
    }

    return(
        <nav className="navbar">
        <div className="navbar-left">
          <button  className={`round-button ${isModalLeftOpen ? 'active' : ''}`} onClick={toggleLeftOptions}>
            <FaAlignJustify size={22} className="icon"/>
          </button>
          <Modal
            style={{
              overlay: { ...customStylesLeft.overlay },
              content: {
                  ...customStylesLeft.content,
                  top: modalPosition.top + 20,
                  left: modalPosition.left,
              },
            }}
            isOpen={showLeftOptions}
            onRequestClose={toggleLeftOptions}
            ariaHideApp={false}
          >
            <div className="modal-item"><img src="/formulario.png"></img><Link to="/donation-form">Formulário de doação</Link></div>
            <div className="modal-item"><img src="/medico.png"></img><Link to="/screening">Triagem</Link></div>
            <div className="modal-item"><img src="/cruz-vermelha.png"></img><Link to="/#section-home">Agendar Doação</Link></div>
            <div className="modal-item"><img src="/hospital.png"></img><Link to="/bloodcenters">Hemocentros</Link></div>
            <div className="modal-item"><img src="/blood-donation.png"></img><Link to="/donations">Doações</Link></div>
            <div className="modal-item">
              <div className="line">
                <fieldset>

                </fieldset>
              </div>
            </div>
            <div className="modal-item"><img src="/feedback.png"></img><Link to="/">Feedback</Link></div>
            <div className="modal-item"><img src="/etapa.png"></img><Link to="/">Etapas no processo de doação</Link></div>
            <div className="modal-item"><img src="/informacoes.png"></img><Link to="/">Mais informações</Link></div>
          </Modal>
          
        </div>
        <div className="navbar-center-home">
          <div className="logo-container-home">
            <h1 className="logo-text">Vital</h1>
            <img src="/Logo.png" alt="Logo" className="logo-image" />
            <h1 className="logo-text">Hero</h1>
          </div>
        </div>
        <div className="navbar-right">
          <button className={`round-button ${isModalRightOpen ? 'active' : ''}`} onClick={toggleRightOptions}>
            <FaUserLarge size={22} className="icon"/>
          </button>
          <Modal
            style={{
              overlay: { ...customStylesRight.overlay },
              content: {
                  ...customStylesRight.content,
                  top: modalPosition.top + 20, // Manter top dinâmico
                  left: modalPosition.left, // Manter left dinâmico
              },
            }}
            isOpen={showRightOptions}
            onRequestClose={toggleRightOptions}
            ariaHideApp={false}
          >
            <div className="modal-item"><img src="/perfil.png"></img><Link to="/profile">Perfil</Link></div>
            <div className="modal-item"><img src="/senha.png"></img><Link to="/change-password">Alterar Senha</Link></div>
            <div className="modal-item"><img src="/sair.png"></img><Link onClick={handleLogout} to="/">Sair</Link></div>
          </Modal>
        </div>
      </nav>
    );
}

export default Navbar