import NavbarDonor from "../../../components/NavbarDonor/NavbarDonor";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BiDonateBlood } from "react-icons/bi";
import { ButtonHTMLAttributes, useContext, useEffect, useState } from "react";
import { MdBloodtype } from "react-icons/md";
import { Donor } from "../../../types/Donor";
import { GiLifeTap } from "react-icons/gi";
import { DonationForm } from "../../../types/DonationForm";
import { Screening } from "../../../types/Screening";

const HomeDonor = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as Donor;

  const liStyle = "m-0 mx-[3%] opacity-9 text-[0.9em] md:text-lg "
  const pStyle = "m-0 mb-[0.25%] mt-[2%] font-semibold text-md md:text-lg"

  const [donationForm, setDonationForm] = useState<DonationForm>();
  const [screenings, setScreenings] = useState<Screening[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultBloodcenters = await auth.findAllBloodCenters();
        const resultDonationForm = await auth.findDonationForm(user!.id);
        const resultScreenings = await auth.findScreening(user!.id);
        localStorage.setItem('bloodcenters', JSON.stringify(resultBloodcenters));
        localStorage.setItem('donationForm', JSON.stringify(resultDonationForm));
        setDonationForm(resultDonationForm);
        localStorage.setItem('screenings', JSON.stringify(resultScreenings));
        setScreenings(resultScreenings);

        if(user!.scheduling !== null){
          const resultScheduling = await auth.findSchedulingById(user!.scheduling!);
          localStorage.setItem('scheduling', JSON.stringify(resultScheduling));
        }
        
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const goDonation = () => {
     
      if(donationForm === null){
        navigate("/donation-form")
      }else if(screenings.length === 0 || screenings[0] === null){
        navigate("/screening")
      }else{
        navigate("/scheduling-donation")
      }
  }

    return (
    <>
      <div className="flex flex-col items-center m-0 min-h-[96vh]">
        <NavbarDonor />

        <div className="flex w-[20em] text-center justify-center items-center mb-[4%] mt-[2%]">
          <div className="w-[30%]">
            <span className="text-[1em] md:text-[1.2em]">Faça sua doação e seja um <b className="text-[#b80e14]">HERÓI</b></span>
          </div>
          <div className="w-[40%]">
            <img className="w-full" src="hero.jpeg"></img>
          </div>
        </div>

        <span className= "text-[#035e89] mb-6 text-2xl md:text-4xl">Critérios para doação</span>
        <div className="flex bg-[#f8f8f8] w-full pb-[3%] md:mb-[3%] px-2">
          <div className="ml-[2vw] w-full md:w-[80vw]">
            <ul className="list-disc list-inside">
              <p className={pStyle}>Idade:</p>
                <li className={liStyle}>Entre 18 e 69 anos.</li>
                <li className={liStyle}>Menores de 18 anos precisam do consentimento do responsável legal.</li>
                <li className={liStyle}>Pessoas entre 60 e 69 anos devem ter doado sangue antes dos 60 anos.</li>
              <p className={pStyle}>Documento de Identificação:</p>
                <li className={liStyle}>Apresentar documento com foto emitido por órgão oficial.</li>
                <li className={liStyle}>Documentos digitais com foto são aceitos.</li>
              <p className={pStyle}>Peso:</p>
                <li className={liStyle}>Pesar no mínimo 50 kg.</li>
              <p className={pStyle}>Descanso:</p>
                <li className={liStyle}>Ter dormido pelo menos 6 horas nas últimas 24 horas.</li>
              <p className={pStyle}>Alimentação:</p>
                <li className={liStyle}>Estar alimentado, evitando alimentos gordurosos 3 horas antes da doação.</li>
                <li className={liStyle}>Após o almoço, aguardar 2 horas antes de doar.</li>
            </ul>
          </div>
          <div className="hidden lg:flex items-center justify-start w-[28vw]">
            <img className="w-[9vw] h-5/6" src="/pensando.png"></img>
          </div>
        </div>

        <div className="flex flex-row m-0 w-full">
          <div className="flex flex-col items-center justify-center box-border w-full h-[200px] md:h-[260px]">
            <BiDonateBlood size={60} className="mb-[3%] text-[#b80e14bf]"/>
            <label className="w-[90%] text-center text-[#1a3744d3] lg:text-[1.6em] md:text-[1.1em] text-[0.71em]">O seu sangue pode salvar até quatro vidas</label>
          </div>
          <div className="flex flex-col items-center justify-center box-border w-full h-[200px] md:h-[260px]">
            <MdBloodtype size={60} className="mb-[3%] text-[#b80e14bf]"/>
            <label className="w-[90%] text-center text-[#1a3744d3] lg:text-[1.6em] md:text-[1.1em] text-[0.71em]">Um ato simples, um impacto imenso.</label>
          </div>
          <div className="flex flex-col items-center justify-center box-border w-full h-[200px] md:h-[260px]">
            <GiLifeTap size={60} className="mb-[3%] text-[#b80e14bf]"/>
            <label className="w-[90%] text-center text-[#1a3744d3] lg:text-[1.6em] md:text-[1.1em] text-[0.71em]">Faça a vida fluir nas veias de quem precisa.</label>
          </div>
          <div className="flex flex-col items-center justify-center box-border w-full h-[200px] md:h-[260px]">
            <MdBloodtype size={60} className="mb-[3%] text-[#b80e14bf]"/>
            <label className="w-[90%] text-center text-[#1a3744d3] lg:text-[1.6em] md:text-[1.1em] text-[0.71em]">Cada doação conta. Faça a sua parte.</label>
          </div>
        </div>
        <fieldset className="hidden md:block border-t border-t-[#00000046] border-0 block text-center mt-[5%] mb-[3%] w-full">
          <legend className="px-[1.5%] font-semibold text-[#b80e14]">SOBRE A DOAÇÃO DE SANGUE</legend>
        </fieldset>

        <div className="hidden md:flex w-full mb-[3%]">
          <div className="w-[80vw]">
            <img className="w-[20vw] h-5/6" src="blood_donation.png"></img>
          </div>
          <div className="px-5">
            <p className="opacity-95 text-[1.1em]">A doação de sangue é um gesto essencial que pode salvar vidas. É um processo simples e seguro, onde uma única doação pode fazer toda a diferença para pacientes em situações críticas, como cirurgias, tratamentos de câncer, complicações durante o parto e acidentes graves.</p>
            <p className="opacity-95 text-[1.1em]">Qualquer pessoa saudável, entre 18 e 69 anos, pode doar sangue após passar por uma triagem. A doação é rápida e indolor, e o sangue doado é testado, processado e armazenado adequadamente para uso em emergências médicas.</p>
            <p className="opacity-95 text-[1.1em]">Além de salvar vidas, a doação de sangue traz uma sensação de realização e satisfação para os doadores, sabendo que estão ajudando a comunidade e fazendo uma diferença positiva na vida de outras pessoas.</p>
            <p className="opacity-95 text-[1.1em]">Junte-se à causa da doação de sangue e seja parte dessa corrente de solidariedade e esperança. Sua doação pode ser a luz no fim do túnel para alguém que precisa desesperadamente de sangue. Lembre-se: uma única doação pode fazer toda a diferença.</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full mb-[3%] bg-[#f8f8f8f8] p-[1.5%] mt-5 md:mt-4 pb-4">
          {user.scheduling === null ? (
            <div>
              <span className="flex justify-center mb-6 text-[#035e89]  text-2xl md:text-4xl">Faça sua doação</span>
              <div className="w-full px-5">
                <p className="opacity-95 text-md md:text-lg mb-4"><label className="font-semibold">Sua doação é essencial.</label> Antes de clicar no botão abaixo, reserve um momento, pois é necessário preencher o formulário de doação e a triagem.
                  Isso garante a segurança de todos. Juntos, podemos fazer a diferença. <label className="font-semibold">Faça sua parte agora!</label></p>
              </div>
                <div className="flex justify-center">
                  <button className="text-white cursor-pointer text-center mt-[2%] bg-[#b80e14] rounded-lg p-[10px] border-none 
                                    w-[22%] md:w-[10%] hover:bg-[#eb1118ad] "
                   onClick={goDonation}>Começar</button>
                </div>
            </div>  
          ) : (
            <label className="text-[1.1em]">Você já fez seu agendamento, pra verificar detalhes <Link className="text-[#b80e14] text-[1.2em]" to={"/scheduling-donation"}>clique aqui</Link></label>
          )}
        </div>
      </div>
    </>
  )
}

export default HomeDonor;