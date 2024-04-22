import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Donation } from "../../types/Donation";
import Navbar from "../../components/NavbarDonor/NavbarDonor";
import { BloodCenter } from "../../types/BloodCenter";
import './Donations.css'
import { Scheduling as SchedulingType } from "../../types/Scheduling";
import Scheduling from "../../components/Scheduling/Scheduling";

const Donations = () => {
  const auth = useContext(AuthContext);

  const [activeButtonLeft, setActiveButtonLeft] = useState(false);
  const [activeButtonRight, setActiveButtonRight] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [scheduling] = useState<SchedulingType>(
    localStorage.getItem('scheduling') !== null ?
    JSON.parse(localStorage.getItem('scheduling')!) : undefined
  );
  const [bloodcenters, setBloodcenters] = useState<BloodCenter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultDonations = await auth.findDonations(auth.user!.id);
        setDonations(resultDonations);
        
        const bloodcentersFromLocalStorage = localStorage.getItem('bloodcenters');
        if (bloodcentersFromLocalStorage !== null) {
          const bloodcentersObject = JSON.parse(bloodcentersFromLocalStorage);
            setBloodcenters(bloodcentersObject);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, []);

  const dateFormat = (dateTime: Date) => {
    const [year, month, day] = dateTime.toISOString().split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  }

  const hourFormat = (dateTime: Date) => {
    const hour = dateTime.getHours().toString().padStart(2, '0');
    const minute = dateTime.getMinutes().toString().padStart(2, '0');
    //const second = dateTime.getSeconds().toString().padStart(2, '0');
  
    return `${hour}:${minute}`;
  };

  const handleClickLeft = () => {
    setActiveButtonLeft(true);
    setActiveButtonRight(false);
  }

  const handleClickRight = () => {
    setActiveButtonRight(true);
    setActiveButtonLeft(false);
  }

  return (
    <>
      <div className="donations-container">
        <Navbar />
        <nav className="navbar-donations">
          <div className="left">
            <button className={`button-options ${activeButtonLeft === true ? "active" : ""}`}
              onClick={handleClickLeft}>
              Agendamento
            </button>
          </div>
          <label style={{fontSize: "20px", color: "black"}}>|</label>
          <div className="right">
            <button className={`button-options ${activeButtonRight === true ? "active" : ""}`}
              onClick={handleClickRight}>
              Últimas doações
            </button>
          </div>
        </nav>
        <div className="info-container">
        {activeButtonRight ? (
          <div className="donations-info">
            {donations.length !== 0 ? (
              donations.slice(0, 10).map(donation => (
                <div key={donation.id} className="with-content-box">
                  <h3>{bloodcenters.find(center => center.id === donation.scheduling.bloodcenter)?.name}</h3>
                  <p className="address-info">{bloodcenters.find(center => center.id === donation.scheduling.bloodcenter)?.address}</p>
                  <p className="date-info">{dateFormat(new Date(donation.scheduling.dateTime))} - {hourFormat(new Date(donation.scheduling.dateTime))}</p>
                </div>
              ))
            ) : (
              <div>
                Você ainda não realizou nenhuma doação
              </div>
            )}
          </div>
        ) : (
          <div style={{width: "100%"}}>
            <div className="scheduling-info">
              {scheduling == null ? (
                  <div className="no-scheduling">
                    <h2>Você não tem nenhuma doação agendada!</h2>
                    <p> <img src="triste.png"></img></p>
                  </div>
                ) : (
                  <Scheduling />
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Donations;
