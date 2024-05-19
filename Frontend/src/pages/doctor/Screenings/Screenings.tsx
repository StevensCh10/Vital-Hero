import NavbarDoctor from "../../../components/NavbarDoctor/NavbarDoctor";
import { useContext, useEffect, useState } from "react";
import './Screenings.css'
import { Screening } from "../../../types/Screening";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { Donor } from "../../../types/Donor";
import { useNavigate } from "react-router-dom";

const Screenings = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
  const [activeButtonLeft, setActiveButtonLeft] = useState(false);
  const [activeButtonRight, setActiveButtonRight] = useState(true);
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [allDonorScreenings, setAllDonorScreenings] = useState<Donor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultScreenings = await auth.findAllScreenings();
        setScreenings(resultScreenings);
        const resulAllScheduled = await auth.allDonorsScreenings();
        setAllDonorScreenings(resulAllScheduled);
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, []);
  
  const handleClickLeft = () => {
    setActiveButtonLeft(true);
    setActiveButtonRight(false);
  };

  const handleClickRight = () => {
    setActiveButtonRight(true);
    setActiveButtonLeft(false);
  };

  const handleValidateScreening = (screeningID: number) => {
    const validateScreening = screenings.find((s) => s.id === screeningID);
    localStorage.setItem('validateScreening', JSON.stringify(validateScreening));
    const donor = allDonorScreenings.find((d) => d.id === Number(validateScreening?.donor));
    localStorage.setItem('donor', JSON.stringify(donor));
    navigate("validate-screening");
  }

  const haveValidateScreenings = () => {
    const newArray = screenings.filter(s => s.doctor === null);
    if((newArray.length === 0)){
      return false;
    }
    return true;
  }

  return (
    <div className="screenings-container">
      <NavbarDoctor />
      <nav className="navbar-screenings">
        <div className="left">
          <button
            className={`button-options ${
              activeButtonLeft === true ? "active" : ""
            }`}
            onClick={handleClickLeft}
          >
            Triagens avaliadas
          </button>
        </div>
        <label style={{ fontSize: "20px", color: "black" }}>|</label>
        <div className="right">
          <button
            className={`button-options ${
              activeButtonRight === true ? "active" : ""
            }`}
            onClick={handleClickRight}
          >
            Triagens pendentes
          </button>
        </div>
      </nav>
      <div className="info-container">
        {activeButtonRight ? (
          <div className="screenings-info">
            {screenings.length !== 0 && haveValidateScreenings() ? (
              screenings.map(screening => (
                <div key={screening.id} className="with-content-box">
                  {allDonorScreenings.length !== 0 && (
                    <>
                      <h3>{allDonorScreenings.find(d => Number(screening.donor) === d.id)?.name}</h3>
                      <p className="age-info">{allDonorScreenings.find(d => Number(screening.donor) === d.id)?.age} anos</p>
                      <button onClick={(() => handleValidateScreening(screening.id!))}>Validar</button>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div style={{textAlign: "center"}}>
                Nenhuma triagem pendente para ser avaliada!
              </div>
            )}
          </div>
        ) : (
          <div style={{width: "100%"}}>
            <div className="scheduling-info">
              {screenings.length !== 0 && !screenings.find(screening => auth.user?.id === screening.doctor) ? (
                  <div className="no-scheduling">
                    <h2>Você ainda não avaliou nenhuma triagem!</h2>
                    <p> <img src="triste.png"></img></p>
                  </div>
                ) : (
                  <>
                    {screenings.map(screening => (
                      <div key={screening.id} className="with-content-box">
                        {allDonorScreenings.length !== 0 && (
                          <>
                            <h3>{allDonorScreenings.find(d => Number(screening.donor) === d.id)?.name}</h3>
                            <p className="age-info">{allDonorScreenings.find(d => Number(screening.donor) === d.id)?.age} anos</p>
                            <button style={{cursor: "auto", backgroundColor: "green"}} >Apto</button>
                          </>
                        )}
                      </div>
                    ))}
                  </>
              )}
            </div>
          </div>
        )}
        </div>
    </div>
  );
};

export default Screenings;
