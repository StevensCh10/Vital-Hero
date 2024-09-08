import Footer from "../../components/Footer/Footer";
import NavbarBloodcenter from "../../components/NavbarBloodcenter/NavbarBloodcenter";
import NavbarDoctor from "../../components/NavbarDoctor/NavbarDoctor";
import NavbarDonor from "../../components/NavbarDonor/NavbarDonor";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext, useState } from "react";

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
        <div className="hidden md:flex justify-center items-center text-start w-[80%] md:w-[70%]">
          <p className="text-[1em] md:text-[1.2em] lg:text-[1.3em] text-center">
            💬 Sua opinião é essencial! Se teve uma experiência positiva ou
            sugestões de melhoria, adoraríamos ouvi-lo(a). Seu feedback nos
            ajuda a crescer e a melhorar continuamente. Compartilhe conosco! 🚀
          </p>
        </div>

        <div className="flex justify-center items-center text-start w-[80%] md:w-[70%] block md:hidden">
          <p className="text-[1em] text-center">
            💬 Seu feedback nos ajuda a crescer e a melhorar continuamente.
            Compartilhe conosco! 🚀
          </p>
        </div>

        <form
          className="flex flex-col justify-center items-center mt-[2%] w-[80%] md:w-[70%]"
          onSubmit={handleSendFeedback}
        >
          <textarea
            className="flex text-left items-center justify-center bg-[#00000015] p-[2%] rounded-md resize-none focus:outline-none 
              text-[1em] w-full h-[85px] md:text-base md:w-[95%] md:h-[150px]"
            placeholder="Conte sua experiência..."
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          {isEmptyOrWhitespace(feedback) ? (
            <button
              disabled
              className="bg-[#b80e1475] rounded-lg text-white pointer-events-none mt-[4%] text-[1em] w-[20%] p-[6px] md:p-[10px] 
              md:text-base md:w-[15%] lg:w-[10%]"
            >
              Enviar
            </button>
          ) : (
            <button
              className="bg-[#b80e14] rounded-lg text-white cursor-pointer mt-[4%] text-[0.7em] w-[20%] p-[6px] md:p-[10px] 
              md:text-base md:w-[15%] lg:w-[10%] hover:bg-[#b80e14a4]"
            >
              Enviar
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
