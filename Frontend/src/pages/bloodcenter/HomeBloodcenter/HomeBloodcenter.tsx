import NavbarBloodcenter from "../../../components/NavbarBloodcenter/NavbarBloodcenter";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { BloodCenter } from "../../../types/BloodCenter";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const HomeBloodcenter = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as BloodCenter;

  useEffect(() => {
    const fetchData = async () => {
      
    };
    fetchData();
  }, [auth]);


  return (
    <div className="flex flex-col items-center m-0 min-h-[96vh]">
      <NavbarBloodcenter />
      <div className="flex flex-row w-screen ">

        <div className="flex flex-col items-center bg-[#156289d9] w-[20%] min-h-[89vh] text-center">
          <img className="my-10 w-[10vw]" src="/equipe-medica.png"></img>
          <Link className="w-full text-white p-[10px] hover:bg-[#156289b7] hover:text-white" to="/">Agendamento de Doadores</Link>
          <Link className="w-full text-white p-[10px] hover:bg-[#156289b7] hover:text-white" to="/">Gerenciar Agendamentos</Link>
        </div>
        <div className="w-[80%]">
          
        </div>
      </div>
    </div>
  );
};

export default HomeBloodcenter;
