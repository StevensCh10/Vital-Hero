import Footer from "../../components/Footer/Footer";
import NavbarBloodcenter from "../../components/NavbarBloodcenter/NavbarBloodcenter";
import NavbarDoctor from "../../components/NavbarDoctor/NavbarDoctor";
import NavbarDonor from "../../components/NavbarDonor/NavbarDonor";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext, useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const Feedback = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const [feedback, setFeedback] = useState("");

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();

    auth.sendFeedback(user?.id!, feedback);
    alert("Seu feedback foi enviado com sucesso, obrigado!");
    window.location.reload();
  };

  function isEmptyOrWhitespace(str: string): boolean {
    return !str || str.trim().length === 0;
  }

  return (
    <div className="flex flex-col items-center m-0">
      {user?.role === "DONOR" ? (
        <NavbarDonor />
      ) : (
        <div className="w-full">
          {user?.role === "DOCTOR" ? <NavbarDoctor /> : <NavbarBloodcenter />}
        </div>
      )}
      <div className="flex flex-col justify-center items-center min-h-[89vh] xl:min-h-[84.1vh]">
        <div className="flex items-center w-[80%] h-[8vh] mt-[3%]"
        style={{ background: 'linear-gradient(to right, #49052E, #b80e14)' }}>
          <span className="text-white ml-[4%] text-md md:text-lg">
            Compartilhe conosco! 🚀
          </span>
        </div>

        <form
          className="flex flex-col items-center justify-center rounded-md w-[82%] py-[4%] md:mb-[2%] shadow-custom4"
          onSubmit={handleSendFeedback}
        >
          <div className="hidden md:flex justify-center items-center text-center md:w-[90%]">
            <p className="text-[1em] md:text-[1.2em] lg:text-[1.3em] text-center">
              💬 Sua opinião é essencial! Se teve uma experiência positiva ou
              sugestões de melhoria, adoraríamos ouvi-lo(a). Seu feedback nos
              ajuda a crescer e a melhorar continuamente.
            </p>
          </div>

          <div className="flex justify-center items-center text-start md:w-[70%] block md:hidden">
            <p className="text-[1em] text-center">
              💬 Seu feedback nos ajuda a crescer e a melhorar continuamente.
            </p>
          </div>
          <textarea
            className="flex text-left items-center justify-center mt-[3%] p-[2%] rounded-md resize-none focus:outline-none 
              text-[1em] h-[135px] md:text-base w-[85%] md:h-[150px] border border-black-100"
            placeholder="Conte sua experiência..."
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          {isEmptyOrWhitespace(feedback) ? (
            <button
              disabled
              className="shadow-custom5 text-black rounded-lg pointer-events-none mt-[4%] text-[1em] w-[28%] p-[6px] md:p-[10px] 
              md:text-base md:w-[15%] lg:w-[10%]"
            >
              <span className="flex items-center justify-center opacity-60">Enviar <IoArrowForwardCircleOutline className="ml-3" size={22} /></span>
            </button>
          ) : (
            <button
              className="text-[1em] shadow-custom5 rounded-lg text-black hover:text-white cursor-pointer mt-[4%] text-[0.7em] w-[28%] p-[6px] md:p-[10px] 
              md:text-base md:w-[15%] lg:w-[10%] hover:bg-[#b80e14]"
            >
              <span className="flex items-center justify-center">Enviar <IoArrowForwardCircleOutline className="ml-3" size={22} /></span>
            </button>
          )}
        </form>
      </div>
      <div className="bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Feedback;
