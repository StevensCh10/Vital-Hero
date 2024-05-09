import { FaAlignJustify, FaUserLarge } from "react-icons/fa6";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import customStylesRight from "./CustomStylesRight";
import customStylesLeft from "./CustomStylesLeft";
import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import Modal from "react-modal";

const NavbarDoctor = () => {
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
            <div className="modal-item"><img src="/formulario.png"></img><Link to="/screenings">Triagens</Link></div>
            <div className="modal-item"><img src="/Logo.png"></img><Link to="/">Home</Link></div>
            <div className="modal-item">
              <div className="line">
                <fieldset>

                </fieldset>
              </div>
            </div>
            <div className="modal-item"><img src="/feedback.png"></img><Link to="/feedback">Feedback</Link></div>
          </Modal>
          
        </div>
        <div className="navbar-center-home">
          <Link to="/" style={{color: "rgb(184, 14, 20)"}}>
            <div className="logo-container-home">
              <h1 className="logo-text">Vital</h1>
              <img src="/Logo.png" alt="Logo" className="logo-image" />
              <h1 className="logo-text">Hero</h1>
            </div>
          </Link>
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
            <div className="modal-item"><img src="/sair.png"></img><Link onClick={handleLogout} to="/">Sair</Link></div>
          </Modal>
        </div>
      </nav>
    );
}

export default NavbarDoctor;