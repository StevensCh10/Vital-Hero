import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext"
import "../Home/Home.css"

const Home = () => {
  const auth = useContext(AuthContext);
  const [showLeftOptions, setShowLeftOptions] = useState(false);
  const [showRightProfileMenu, setShowRightProfileMenu] = useState(false);

  const toggleLeftOptions = () => {
    setShowLeftOptions(!showLeftOptions);
  };

  const toggleRightProfileMenu = () => {
    setShowRightProfileMenu(!showRightProfileMenu);
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-left">
          <button className="round-button" onClick={toggleLeftOptions}>
            {/* Ícone de opções */}
          </button>
          {showLeftOptions && (
            <div className="options-menu left">
              {/* Opções do menu */}
            </div>
          )}
        </div>
        <div className="navbar-center">
          <h1>Vital <img src="caminho-da-imagem/logo.png" alt="Logo" /> Hero</h1>
        </div>
        <div className="navbar-right">
          <button className="round-button" onClick={toggleRightProfileMenu}>
            {/* Ícone de perfil */}
          </button>
          {showRightProfileMenu && (
            <div className="profile-menu right">
              {/* Opções do menu de perfil */}
            </div>
          )}
        </div>
      </nav>

      <div className="content red-dark">
        {/* Conteúdo do primeiro espaço */}
      </div>
      <div className="content red">
        {/* Conteúdo do segundo espaço */}
      </div>
      <div className="content red-dark">
        {/* Conteúdo do terceiro espaço */}
      </div>
    </div>
  )
}

export default Home
