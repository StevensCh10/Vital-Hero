import NavbarBloodcenter from "../../components/NavbarBloodcenter/NavbarBloodcenter";
import NavbarDoctor from "../../components/NavbarDoctor/NavbarDoctor";
import NavbarDonor from "../../components/NavbarDonor/NavbarDonor";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext, useState } from "react";
import "./Feedback.css";

const Feedback = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const [feedback, setFeedback] = useState("");

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();

    auth.sendFeedback(user?.id!, feedback)
    alert("Seu feedback foi enviado com sucesso, obrigado!");
    window.location.reload();
  }

  return (
    <div className="feedback-container">
      {user?.role === "DONOR" ? (
        <NavbarDonor />
      ) : (
        <div style={{width: "100%"}}>
          {user?.role === "DOCTOR" ? <NavbarDoctor /> : <NavbarBloodcenter />}
        </div>
      )}

      <div className="incentive">
        <p style={{fontSize: "1.3em"}}>
        💬 Sua opinião é essencial! Se teve uma experiência positiva ou sugestões de melhoria, 
        adoraríamos ouvi-lo(a). Seu feedback nos ajuda a crescer e a melhorar continuamente. Compartilhe conosco! 🚀
        </p>
      </div>

      <form onSubmit={handleSendFeedback}>
        <textarea placeholder="Conte sua experiência..." onChange={((e) => setFeedback(e.target.value))}></textarea>
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default Feedback;
