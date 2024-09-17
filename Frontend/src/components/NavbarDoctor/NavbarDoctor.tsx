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

    const btnStyle =
    "flex rounded-[50%] w-[45px] p-[10px] h-[45px] text-[#035e89] cursor-pointer shadow-custom items-center justify-center hover:bg-[#035e89] hover:text-white";
    const modalItemStyle = "flex items-center justify-start m-[4%] text-[17px] w-[90%]";
    const modalImgStyle = "mr-[10px] w-[30px]";
    const linkStyle = "text-[#092f41] hover:text-[#035e89]"

    return(
      <nav className="flex box-border w-full justify-between items-center p-[10px] mb-[1%]">
        <div className="flex items-center">
          <button
            className={`${btnStyle} ${
              isModalLeftOpen ? "bg-[#035e89] text-white" : ""
            }`}
            onClick={toggleLeftOptions}
          >
            <FaAlignJustify size={22} />
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
            <div className={modalItemStyle}>
              <img className={modalImgStyle}  src="/formulario.png"></img>
              <Link className={linkStyle} to="/screenings">Triagens</Link>
            </div>
            <div className={modalItemStyle}>
              <img className={modalImgStyle}  src="/Logo.png"></img>
              <Link className={linkStyle} to="/">Início</Link>
            </div>
            <div className={modalItemStyle}>
              <div className="flex justify-center items-center w-full h-0">
                <fieldset className="w-[100%] border-t border-black/30 border-l-0 border-r-0 border-b-0 block"></fieldset>
              </div>
            </div>
            <div className={modalItemStyle}>
              <img className={modalImgStyle}  src="/feedback.png"></img>
              <Link className={linkStyle} to="/feedback">Feedback</Link>
            </div>
          </Modal>
        </div>
        <div className="flex items-center cursor-pointer">
          <Link className="text-[#b80e14]" to="/">
            <div className="flex items-center align-center">
              <h1 className="text-4xl mr-[2%] md:text-5xl">Vital</h1>
              <img className="w-[45px] md:w-[60px]" src="/Logo.png" alt="Logo"/>
              <h1 className="text-4xl md:text-5xl">Hero</h1>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <button
            className={`${btnStyle} ${
              isModalRightOpen ? "bg-[#035e89] text-white" : ""
            }`}
            onClick={toggleRightOptions}
          >
            <FaUserLarge size={22} />
          </button>
          <Modal
            style={{
              overlay: { ...customStylesRight.overlay },
              content: {
                  ...customStylesRight.content,
                  top: modalPosition.top + 20,
                  left: modalPosition.left,
              },
            }}
            isOpen={showRightOptions}
            onRequestClose={toggleRightOptions}
            ariaHideApp={false}
          >
            <div className={modalItemStyle}>
              <img className={modalImgStyle} src="/perfil.png"></img>
              <Link className={linkStyle} to="/profile">Perfil</Link>
            </div>
            <div className={modalItemStyle}>
              <img className={modalImgStyle} src="/sair.png"></img>
              <Link className={linkStyle} onClick={handleLogout} to="/">
                Sair
              </Link>
            </div>
          </Modal>
        </div>
      </nav>
    );
}

export default NavbarDoctor;