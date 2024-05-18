import NavbarDonor from "../../../components/NavbarDonor/NavbarDonor";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiDonateBlood } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { MdBloodtype } from "react-icons/md";
import { Donor } from "../../../types/Donor";
import { GiLifeTap } from "react-icons/gi";
import "./HomeDonor.css";
import { DonationForm } from "../../../types/DonationForm";
import { Screening } from "../../../types/Screening";

const HomeDonor = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as Donor;

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
    return (
    <>
      <div className="home-container">
        <NavbarDonor />

        <div className="be-to-hero">
          <div className="text">
            <span>Faça sua doação e seja um <b>HERÓI</b></span>
          </div>
          <div className="image">
            <img src="hero.jpeg"></img>
          </div>
        </div>

        <span style={{color: "#035e89"}}>Critérios para doação</span>
        <div className="criteria-donation-container">
          <div className="criteria-donation">
            <ul>
              <p>Idade:</p>
                <li>Entre 18 e 69 anos.</li>
                <li>Menores de 18 anos precisam do consentimento do responsável legal.</li>
                <li>Pessoas entre 60 e 69 anos devem ter doado sangue antes dos 60 anos.</li>
              <p>Documento de Identificação:</p>
                <li>Apresentar documento com foto emitido por órgão oficial.</li>
                <li>Documentos digitais com foto são aceitos.</li>
              <p>Peso:</p>
                <li>Pesar no mínimo 50 kg.</li>
              <p>Descanso:</p>
                <li>Ter dormido pelo menos 6 horas nas últimas 24 horas.</li>
              <p>Alimentação:</p>
                <li>Estar alimentado, evitando alimentos gordurosos 3 horas antes da doação.</li>
                <li>Após o almoço, aguardar 2 horas antes de doar.</li>
            </ul>
          </div>
          <div className="image">
            <img src="/pensando.png" className=""></img>
          </div>
        </div>

        <div className="container">
          <div className="content red-dark">
            <BiDonateBlood size={60} style={{marginBottom: '3%', color: "rgba(184, 14, 20, 0.750)"}}/>
            <label>O seu sangue pode salvar até quatro vidas</label>
          </div>
          <div className="content red">
            <MdBloodtype size={60} style={{marginBottom: '3%', color: "rgba(184, 14, 20, 0.750)"}}/>
            <label>Um ato simples, um impacto imenso.</label>
          </div>
          <div className="content red-dark">
            <GiLifeTap size={60} style={{marginBottom: '3%', color: "rgba(184, 14, 20, 0.750)"}}/>
            <label>Faça a vida fluir nas veias de quem precisa.</label>
          </div>
          <div className="content red">
            <MdBloodtype size={60} style={{marginBottom: '3%', color: "rgba(184, 14, 20, 0.750)"}}/>
            <label>Cada doação conta. Faça a sua parte.</label>
          </div>
        </div>

        <fieldset>
          <legend>SOBRE A DOAÇÃO DE SANGUE</legend>
        </fieldset>
        <div className="about-donation">
          <div className="image">
            <img src="blood_donation.png"></img>
          </div>
          <div>
            <p>A doação de sangue é um gesto essencial que pode salvar vidas. É um processo simples e seguro, onde uma única doação pode fazer toda a diferença para pacientes em situações críticas, como cirurgias, tratamentos de câncer, complicações durante o parto e acidentes graves.</p>
            <p>Qualquer pessoa saudável, entre 18 e 69 anos, pode doar sangue após passar por uma triagem. A doação é rápida e indolor, e o sangue doado é testado, processado e armazenado adequadamente para uso em emergências médicas.</p>
            <p>Além de salvar vidas, a doação de sangue traz uma sensação de realização e satisfação para os doadores, sabendo que estão ajudando a comunidade e fazendo uma diferença positiva na vida de outras pessoas.</p>
            <p>Junte-se à causa da doação de sangue e seja parte dessa corrente de solidariedade e esperança. Sua doação pode ser a luz no fim do túnel para alguém que precisa desesperadamente de sangue. Lembre-se: uma única doação pode fazer toda a diferença.</p>
          </div>
        </div>
        <span style={{color: "#035e89"}}>Faça sua doação</span>
        <div className="go-schedule">
          <div style={{width: "90%"}}>
            <p><label style={{fontWeight: "500"}}>Sua doação é essencial.</label> Antes de clicar no botão abaixo, reserve um momento, pois é necessário preencher o formulário de doação e a triagem.
              Isso garante a segurança de todos. Juntos, podemos fazer a diferença. <label style={{fontWeight: "500"}}>Faça sua parte agora!</label></p>
          </div>
          <button onClick={(() =>{ 
            {console.log(screenings.length)}
            if(donationForm === null){
              navigate("/donation-form")
            }else if(screenings.length === 0 || screenings[0] === null){
              navigate("/screening")
            }else{
              navigate("/scheduling-donation")
            }
          })}>Começar</button>
        </div>
      </div>
    </>
  )
}

export default HomeDonor;
