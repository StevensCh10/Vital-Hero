import { FaAlignJustify } from "react-icons/fa6";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import customStylesLeft from "./CustomStylesLeft";
import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import Modal from "react-modal";

const NavbarBloodcenter = () => {
    const auth = useContext(AuthContext);
    const [showLeftOptions, setShowLeftOptions] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [isModalLeftOpen, setIsModalLeftOpen] = useState(false);

    const toggleLeftOptions = (e: any) => {
      const buttonRect = e.currentTarget.getBoundingClientRect();
      setModalPosition({ top: buttonRect.bottom + window.scrollY, left: buttonRect.left + window.scrollX });
      setShowLeftOptions(!showLeftOptions);
      setIsModalLeftOpen(!isModalLeftOpen);
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
            <div className="modal-item"><img onClick={handleLogout} style={{width: "45px", height: "45px", cursor: "pointer"}} src="/sair.png"></img></div>
        </div>
      </nav>
    );
}

export default NavbarBloodcenter;