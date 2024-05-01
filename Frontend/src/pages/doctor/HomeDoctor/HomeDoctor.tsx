import NavbarDoctor from "../../../components/NavbarDoctor/NavbarDoctor";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useContext, useEffect } from "react";
import { Doctor } from "../../../types/Doctor";
import "./HomeDoctor.css";

const HomeDoctor = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as Doctor;

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, [auth]);

  return (
    <>
      <div className="home-container">
        <NavbarDoctor />
        <span>Seja bem vindo, {user.name}!</span>
        <div className="doctor-content">
          <div className="doc-left">
            <img src="tnx-doctor.png"></img>
          </div>
          <div className="doc-right">
            <p>
              Agradecemos imensamente por se juntar a nós nesta nobre missão de
              salvar vidas através da doação de sangue. Sua dedicação e
              expertise são inestimáveis e fazem toda a diferença.
            </p>
            <p>
              Ao validar as triagens dos potenciais doadores, você está
              desempenhando um papel vital na garantia da segurança e eficácia
              do processo de doação. Cada avaliação que você realiza não só
              ajuda a identificar os doadores aptos, mas também contribui para a
              saúde e bem-estar daqueles que receberão essas doações.
            </p>
            <p>
              Saiba que sua presença aqui não apenas beneficia os doadores e
              receptores, mas também fortalece nossa comunidade, unindo-nos em
              prol de uma causa maior.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeDoctor;
