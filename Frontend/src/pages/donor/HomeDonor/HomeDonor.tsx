import NavbarDonor from "../../../components/NavbarDonor/NavbarDonor";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BiDonateBlood } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { MdBloodtype } from "react-icons/md";
import { Donor } from "../../../types/Donor";
import { GiLifeTap } from "react-icons/gi";
import { DonationForm } from "../../../types/DonationForm";
import { Screening } from "../../../types/Screening";
import Loading from "../../../components/Loading/Loading";
import Footer from "../../../components/Footer/Footer";
import { GiClick } from "react-icons/gi";
import { BiDonateHeart } from "react-icons/bi";
import { LuHeartHandshake } from "react-icons/lu";
import { FaRegFileArchive } from "react-icons/fa";

const HomeDonor = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as Donor;
  const navigate = useNavigate();

  const titleStyle =
    "text-[#b80e14] opacity-75 mt-[5%] mb-[5%] text-xl md:text-[1.1em] ";
  const subtitleStyle =
    "my-[2%] mx-[5%]  text-black opacity-70 text-[1em] md:text-[1em]";

  const [screening, setScreening] = useState<Screening>();
  const [donationForm, setDonationForm] = useState<DonationForm>();
  const [loading, setLoading] = useState(true);

  interface Card {
    title: string;
    subtitles: string[];
  }

  const [selectedIndex, setSelectedIndex] = useState(0); // Index do card selecionado
  const cards: Card[] = [
    {
      title: "Idade",
      subtitles: [
        "Entre 18 e 69 anos.",
        "Menores de 18 anos precisam do consentimento do responsável legal.",
        "Pessoas entre 60 e 69 anos devem ter doado sangue antes dos 60" +
          " anos.",
      ],
    },
    {
      title: "Identificação",
      subtitles: [
        "Apresentar documento com foto emitido por órgão oficial.",
        "Documentos digitais com foto são aceitos.",
      ],
    },
    { title: "Peso", subtitles: ["Pesar no mínimo 50 kg."] },
    {
      title: "Alimentação e Descanso",
      subtitles: [
        "Ter dormido pelo menos 6 horas nas últimas 24 horas.",
        "Estar alimentado, evitando alimentos gordurosos 3 horas antes da" +
          " doação.",
        "Após o almoço, aguardar 2 horas antes de doar.",
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("bloodcenters")) {
          const resultBloodcenters = await auth.findAllBloodCenters();
          localStorage.setItem("bloodcenters", JSON.stringify(resultBloodcenters));
        }
        if (!localStorage.getItem("donationForm")) {
          const resultDonationForm = await auth.findDonationForm(user.id!);
          localStorage.setItem("donationForm", JSON.stringify(resultDonationForm));
          setDonationForm(resultDonationForm);
        }
        if (!localStorage.getItem("screening")) {
          const resultScreening = await auth.findScreening(user.id!);
          localStorage.setItem("screening", JSON.stringify(resultScreening));
          setScreening(resultScreening);
        }
        if (user!.scheduling !== null) {
          const resultScheduling = await auth.findSchedulingById(
            user?.scheduling!.id
          );
          localStorage.setItem("scheduling", JSON.stringify(resultScheduling));
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (index: any) => {
    setSelectedIndex(index);
  };

  const visibleCards = [0, 1, 2, 3];

  if (loading) {
    return <Loading />;
  }

  const renderIndicators = () => {
    return (
      <div className="flex justify-center mt-4 space-x-2">
        {cards.map((_, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)} // Atualiza o índice ao clicar no pontinho
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-500 ${
              selectedIndex === index ? "bg-black opacity-70" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center m-0 min-h-[96vh]">
      <NavbarDonor />

      <div className="flex w-[20em] text-center justify-center items-center mb-[5%] mt-[2%]">
        <div className="w-[30%]">
          <span className="text-[1em] md:text-[1.2em]">
            Faça sua doação e seja um <b className="text-[#b80e14]">HERÓI</b>
          </span>
        </div>
        <div className="w-[40%]">
          <img className="w-full" src="hero.jpeg"></img>
        </div>
      </div>

      <span className="text-black opacity-75 mb-6 text-3xl">
        Critérios para doação
      </span>
      <div className="hidden lg:flex flex-col items-center justify-center w-full h-full ">
        <div className="relative flex w-full max-w-10xl overflow-hidden justify-center items-center h-[50vh]">
          <div className="flex transition-transform duration-1000 ease-in-out space-x-10">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`cursor-pointer flex-shrink-0 w-64 h-64 transition-transform duration-1000 ease-in-out transform ${
                  visibleCards.includes(index)
                    ? selectedIndex === index
                      ? "scale-110"
                      : "scale-90"
                    : "scale-0"
                } ${
                  selectedIndex === index ? "shadow-custom" : "shadow-custom1"
                } rounded-lg font-semibold`}
                style={{
                  display: visibleCards.includes(index) ? "block" : "none",
                }}
              >
                <div className="flex flex-col items-center w-full h-full">
                  <p className={titleStyle}>{card.title}</p>
                  {card.subtitles.map((subtitle) => (
                    <div key={subtitle} className="flex flex-col w-full ">
                      <p className={subtitleStyle}>{subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {renderIndicators()}
      </div>
      
      <div className="flex lg:hidden items-center justify-center w-full h-full mt-5">
        <div className="flex w-full justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-[80%] place-items-center mx-auto">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className="w-64 h-64 shadow-custom mb-10"
              >
                <div className="flex flex-col items-center w-full h-full">
                  <p className={titleStyle}>{card.title}</p>
                  {card.subtitles.map((subtitle) => (
                    <div key={subtitle} className="flex flex-col w-full ">
                      <p className={subtitleStyle}>{subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="text-black opacity-75 mb-[4%] text-3xl mt-[6%]">
        Como doar?
      </span>
      <div className="hidden md:flex items-center justify-center w-full h-full relative">
        <div className="w-72 h-72 relative">
          <div className="absolute shadow-md flex items-center justify-center top-14 left-0 rounded-full w-20 h-20 text-4xl border border-2 border-black transform translate-x-[-40%] translate-y-[-40%]">
            1
          </div>
          <div className="flex w-72 h-72 rounded-full shadow-custom bg-white relative">
            <div className="flex flex-col w-full h-full items-center justify-center">
              <img className="w-20" src="/formulario-de-registro.png"></img>
              <p className="opacity-70">Preencha o fomulário de doação</p>
              <p className="opacity-70">e o formulário de triagem.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-between w-full xl:w-[90%] h-full relative">
        <img className="absolute md:right-[26%] lg:right-[21%] md:w-[46%] lg:w-[56%] xl:right-60" src="/heart.png"></img>
        <div className="w-72 h-72 relative">
          <div className="absolute shadow-md flex items-center justify-center top-14 left-0 rounded-full w-20 h-20 text-4xl border border-2 border-black transform translate-x-[-40%] translate-y-[-40%]">
            2
          </div>
          <div className="flex w-72 h-72 rounded-full shadow-custom bg-white relative">
            <div className="flex flex-col w-full h-full items-center justify-center">
              <img className="w-20" src="/agenda.png"></img>
              <p className="opacity-70">Esolha o hemocentro, dia, hora e</p>
              <p className="opacity-70">marque seu agendamento.</p>
            </div>
          </div>
        </div>
        <div className="w-72 h-72 relative">
          <div className="absolute shadow-md flex items-center justify-center top-14 left-0 rounded-full w-20 h-20 text-4xl border border-2 border-black transform translate-x-[-40%] translate-y-[-40%]">
            3
          </div>
          <div className="flex w-72 h-72 rounded-full shadow-custom bg-white relative">
            <div className="flex flex-col w-full h-full items-center justify-center">
              <img className="w-20" src="/doacao-de-sangue.png"></img>
              <p className="opacity-70">Compareça ao hemocentro na</p>
              <p className="opacity-70">data e hora agendada.</p>
            </div>
          </div>
        </div>
      </div>
      {/* TELA XS até MD */}
      <div className="block xs:flex md:hidden flex flex-col">
        <div className="flex items-center justify-center w-full h-full relative mb-8">
          <div className="w-72 h-72 relative">
            <div className="absolute shadow-md flex items-center justify-center top-14 left-0 rounded-full w-20 h-20 text-4xl border border-2 border-black transform translate-x-[-40%] translate-y-[-40%]">
              1
            </div>
            <div className="flex w-72 h-72 rounded-full shadow-custom bg-white relative">
              <div className="flex flex-col w-full h-full items-center justify-center">
                <img className="w-20" src="/formulario-de-registro.png"></img>
                <p className="opacity-70">Preencha o fomulário de doação</p>
                <p className="opacity-70">e o formulário de triagem.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-full relative mb-8">
          <div className="w-72 h-72 relative">
            <div className="absolute shadow-md flex items-center justify-center top-14 left-0 rounded-full w-20 h-20 text-4xl border border-2 border-black transform translate-x-[-40%] translate-y-[-40%]">
              2
            </div>
            <div className="flex w-72 h-72 rounded-full shadow-custom bg-white relative">
              <div className="flex flex-col w-full h-full items-center justify-center">
                <img className="w-20" src="/agenda.png"></img>
                <p className="opacity-70">Esolha o hemocentro, dia, hora e</p>
                <p className="opacity-70">marque seu agendamento.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-full relative">
          <div className="w-72 h-72 relative">
            <div className="absolute shadow-md flex items-center justify-center top-14 left-0 rounded-full w-20 h-20 text-4xl border border-2 border-black transform translate-x-[-40%] translate-y-[-40%]">
              3
            </div>
            <div className="flex w-72 h-72 rounded-full shadow-custom bg-white relative">
              <div className="flex flex-col w-full h-full items-center justify-center">
                <img className="w-20" src="/doacao-de-sangue.png"></img>
                <p className="opacity-70">Compareça ao hemocentro na</p>
                <p className="opacity-70">data e hora agendada.</p>
              </div>
            </div>
          </div>
        </div>  
      </div>      

      <div className="flex flex-row m-0 w-full my-[5%]">
        <div className="flex flex-col items-center justify-center box-border w-full h-[200px] md:h-[260px]">
          <BiDonateBlood size={60} className="mb-[3%] text-[#b80e14bf] filter drop-shadow-xl" />
          <label className="w-[90%] text-center opacity-70 lg:text-[1.4em] md:text-[1.1em] text-[0.71em]">
            O seu sangue pode salvar até quatro vidas
          </label>
        </div>
        <div className="flex flex-col items-center justify-center box-border w-full h-[200px] md:h-[260px]">
          <MdBloodtype size={60} className="mb-[3%] text-[#b80e14bf] filter drop-shadow-xl" />
          <label className="w-[90%] text-center opacity-70 lg:text-[1.4em] md:text-[1.1em] text-[0.71em]">
            Um ato simples, um impacto imenso.
          </label>
        </div>
        <div className="flex flex-col items-center justify-center box-border w-full h-[200px] md:h-[260px]">
          <GiLifeTap size={60} className="mb-[3%] text-[#b80e14bf] filter drop-shadow-xl" />
          <label className="w-[90%] text-center opacity-70 lg:text-[1.4em] md:text-[1.1em] text-[0.71em]">
            Faça a vida fluir nas veias de quem precisa.
          </label>
        </div>
        <div className="flex flex-col items-center justify-center box-border w-full h-[200px] md:h-[260px]">
          <LuHeartHandshake size={60} className="mb-[3%] text-[#b80e14bf] filter drop-shadow-xl" />
          <label className="w-[90%] text-center opacity-70 lg:text-[1.4em] md:text-[1.1em] text-[0.71em]">
            Cada doação conta. Faça a sua parte.
          </label>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full mb-[3%] p-[1.5%] mt-5 md:mt-4 pb-4">
        {donationForm === null && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center w-[80%] h-[8vh]"
            style={{ background: 'linear-gradient(to right, #49052E, #b80e14)' }}>
              <span className="text-white ml-[4%] text-md md:text-xl">
                Faça sua doação
              </span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md w-[82%] py-[4%] md:mb-[2%] shadow-custom4">
              <div className="md:flex justify-center items-center text-center w-[90%]">
                <p className="opacity-95 text-sm md:text-lg mb-4">
                  <label className="font-semibold text-[1.1em]">Sua doação é essencial.</label>{" "}
                  Antes de clicar no botão abaixo, reserve um momento, pois é
                  necessário preencher o formulário de doação e a triagem. Isso
                  garante a segurança de todos. Juntos, podemos fazer a diferença.{" "}
                  <label className="font-semibold text-[1.1em]">Faça sua parte agora!</label>
                </p>
              </div>
              <button
              className="hover:bg-black shadow-custom5 rounded-lg text-black hover:text-white cursor-pointer mt-[4%] text-sm w-[31%] p-[6px] md:p-[10px] 
                md:text-base md:w-[25%] lg:w-[13%] hover:bg-[#b80e14]"
              onClick={() => navigate("/donation-form")}
              >
               <span className="flex items-center justify-center">Começar <BiDonateHeart className="ml-2" size={22} /></span>
              </button>
            </div>
          </div>
        )}
        {donationForm !== null && screening === null && (
          <button
          className="hover:bg-black shadow-custom5 rounded-lg text-black hover:text-white cursor-pointer mb-[2%] text-[0.7em] w-[20%] p-[6px] md:p-[10px] 
            md:text-base md:w-[15%] lg:w-[18%] hover:bg-[#b80e14]"
          onClick={() => navigate("/screening")}
          >
            <span className="flex items-center justify-center">Preencher Triagem<FaRegFileArchive className="ml-2" size={20} /></span>
          </button>
        )}
        {donationForm !== null && screening !== null && (
          <div className="flex flex-col items-center justify-center rounded-lg text-center w-[70%] md:w-full xl:w-[47%]">
            <label className="text-[1.2em]">
              Você já fez seu agendamento, para verificar detalhes
            </label>
            <Link className="flex mt-[5%] text-black font-semibold hover:bg-[#b80e14] hover:text-white text-[1.2em] text-center rounded-md p-2 shadow-custom" to="/scheduling-donation">
              Clique aqui
              <GiClick className="ml-3" size={24}/>
            </Link>
          </div>
        )}
      </div>

      <fieldset className="hidden md:block border-t border-t-[#00000046] border-0 block text-center mt-[5%] mb-[3%] w-full">
        <legend className="px-[1.5%] font-semibold text-[#b80e14]">
          SOBRE A DOAÇÃO DE SANGUE
        </legend>
      </fieldset>

      <div className="hidden md:flex w-full items-center mb-[5%]">
        <div className="w-full lg:w-[80vw]">
          <img className=" lg:w-[20vw] lg:h-5/6 h-[30vh]" src="blood_donation.png"></img>
        </div>
        <div className="px-5 opacity-95 text-lg">
          <p>
            A doação de sangue é um gesto essencial que pode salvar vidas. É um
            processo simples e seguro, onde uma única doação pode fazer toda a
            diferença para pacientes em situações críticas, como cirurgias,
            tratamentos de câncer, complicações durante o parto e acidentes
            graves.
          </p>
          <p>
            Qualquer pessoa saudável, entre 18 e 69 anos, pode doar sangue após
            passar por uma triagem. A doação é rápida e indolor, e o sangue
            doado é testado, processado e armazenado adequadamente para uso em
            emergências médicas.
          </p>
          <p>
            Além de salvar vidas, a doação de sangue traz uma sensação de
            realização e satisfação para os doadores, sabendo que estão ajudando
            a comunidade e fazendo uma diferença positiva na vida de outras
            pessoas.
          </p>
          <p>
            Junte-se à causa da doação de sangue e seja parte dessa corrente de
            solidariedade e esperança. Sua doação pode ser a luz no fim do túnel
            para alguém que precisa desesperadamente de sangue. Lembre-se: uma
            única doação pode fazer toda a diferença.
          </p>
        </div>
      </div>
      <div className="bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default HomeDonor;
