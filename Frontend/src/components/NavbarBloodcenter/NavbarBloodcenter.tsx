import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext } from "react"
import { Link } from "react-router-dom";

const NavbarBloodcenter = () => {
    const auth = useContext(AuthContext);

    const handleLogout = (e: any) => {
      e.preventDefault();
      auth.signout();
    }

    return(
      <nav className="flex box-border w-full justify-between items-center py-[6px] w-screen px-[3%] bg-[#156289b7] shadow-lg">
        <div className="flex items-center cursor-pointer">
          <Link to="/">
            <div className="flex items-center align-center">
              <img className="p-0 m-0 w-[40px] md:w-[44px]" src="/Logo.png" alt="Logo"/>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
            <div>
              <img className="w-[40px] h-[40px] cursor-pointer" onClick={handleLogout} src="/sair.png"></img>
            </div>
        </div>
      </nav>
    );
}

export default NavbarBloodcenter;