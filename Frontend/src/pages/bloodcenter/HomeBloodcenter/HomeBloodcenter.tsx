import NavbarBloodcenter from "../../../components/NavbarBloodcenter/NavbarBloodcenter";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const HomeBloodcenter = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      
    };
    fetchData();
  }, [auth]);


  return (
    <div className="flex flex-col items-center m-0">
      <NavbarBloodcenter />
      <div className="flex flex-row w-screen min-h-[91.7vh]">

        <div className="flex flex-col items-center bg-[#156289d9] w-[20%] min-h-[89vh] text-center">
          <img className="my-10 w-[10vw]" src="/equipe-medica.png"></img>
          <button className="w-full text-white p-[10px] hover:bg-[#156289b7] hover:text-white">Agendamento de Doadores</button>
          <button className="w-full text-white p-[10px] hover:bg-[#156289b7] hover:text-white">Gerenciar Agendamentos</button>
        </div>
        <div className="w-[80%]">
          
        </div>
      </div>
    </div>
  );
};

export default HomeBloodcenter;
