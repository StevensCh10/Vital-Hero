import { Scheduling as SchedulingType } from "../../../types/Scheduling";
import Scheduling from "../../../components/Scheduling/Scheduling";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import Navbar from "../../../components/NavbarDonor/NavbarDonor";
import { BloodCenter } from "../../../types/BloodCenter";
import { useContext, useEffect, useState } from "react";
import { Donation } from "../../../types/Donation";
import "./SchedulingAndDonation.css";
import { Donor } from "../../../types/Donor";
import { DonationForm } from "../../../types/DonationForm";
import { Screening } from "../../../types/Screening";

const SchedulingAndDonation = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as Donor;
  const [activeButtonLeft, setActiveButtonLeft] = useState(true);
  const [activeButtonRight, setActiveButtonRight] = useState(false);
  const bloodcenters = JSON.parse(
    localStorage.getItem("bloodcenters")! ?? []
  ) as BloodCenter[];
  const [schedulingsBloodcenter, setSchedulingsBloodcenter] = useState<
    SchedulingType[]
  >([]);
  const donationForm = JSON.parse(
    localStorage.getItem("donationForm")! ?? {}
  ) as DonationForm;
  const screenings = JSON.parse(
    localStorage.getItem("screenings")! ?? []
  ) as Screening[];
  const [selectedBloodcenter, setSelectedBloodcenter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  //const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const scheduling =
    localStorage.getItem("scheduling") !== null
      ? JSON.parse(localStorage.getItem("scheduling")!)
      : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultDateTimes = await auth.findAllSchedulings();
        setSchedulingsBloodcenter(resultDateTimes);
        const resultDonations = await auth.findDonations(auth.user!.id);
        setDonations(resultDonations);
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, []);

  const dateFormat = (dateTime: Date) => {
    const [year, month, day] = dateTime.toISOString().split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  const hourFormat = (dateTime: Date) => {
    const hour = dateTime.getHours().toString().padStart(2, "0");
    const minute = dateTime.getMinutes().toString().padStart(2, "0");
    //const second = dateTime.getSeconds().toString().padStart(2, '0');

    return `${hour}:${minute}`;
  };

  const handleChangeBloodcenter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBloodcenter(e.target.value);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleChangeHour = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHour(e.target.value);
  };

  const handleClickLeft = () => {
    setActiveButtonLeft(true);
    setActiveButtonRight(false);
  };

  const handleClickRight = () => {
    setActiveButtonRight(true);
    setActiveButtonLeft(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      auth.toSchedule(user!.id, parseInt(selectedHour));
      localStorage.setItem("scheduling", JSON.stringify(schedulingsBloodcenter.find(s => s.id === Number(selectedHour))));
      await auth.findDonorById(user!.id).then(() => {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const uniqueDate = new Set();
  const auxSchedulings = schedulingsBloodcenter
    .filter(
      (scheduling) => scheduling.bloodcenter === parseInt(selectedBloodcenter)
    )
    .filter((scheduling) => {
      let date = new Date(scheduling.dateTime);
      const dataFormatada = dateFormat(date);
      if (uniqueDate.has(dataFormatada)) {
        return false;
      }
      uniqueDate.add(dataFormatada);
      return true;
    });

  return (
    <>
      <div className="donations-container">
        <Navbar />
        <nav className="navbar-donations">
          <div className="left">
            <button
              className={`button-options ${
                activeButtonLeft === true ? "active" : ""
              }`}
              onClick={handleClickLeft}
            >
              Agendamento
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
              Últimas doações
            </button>
          </div>
        </nav>
        <div className="info-container">
          {activeButtonRight ? (
            <div className="donations-info">
              {donations.length !== 0 ? (
                donations.slice(0, 10).map((donation) => (
                  <div key={donation.id} className="with-content-box">
                    <h3>
                      {
                        bloodcenters!.find(
                          (center) =>
                            center.id === donation.scheduling.bloodcenter
                        )?.name
                      }
                    </h3>
                    <p className="address-info">
                      {
                        bloodcenters.find(
                          (center) =>
                            center.id === donation.scheduling.bloodcenter
                        )?.address
                      }
                    </p>
                    <p className="date-info">
                      {dateFormat(new Date(donation.scheduling.dateTime))} -{" "}
                      {hourFormat(new Date(donation.scheduling.dateTime))}
                    </p>
                  </div>
                ))
              ) : (
                <div className="no-scheduling">
                  <h2>Você ainda não realizou nenhuma doação!</h2>
                  <p>
                    {" "}
                    <img src="triste.png"></img>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              <div className="scheduling-info">
                {scheduling === null ? (
                  <div
                    className="form-scheduling-dontations-container"
                    id="section-scheduling-dontations"
                  >
                    <div>
                      <div className="title-form-scheduling-dontations ">
                        <span>Marque um agendamento e faça sua parte</span>
                        {donationForm === null && screenings.length === 0 && (
                          <label className="alert">
                            *É necessário preencher o formulário de doação e a
                            triagem para marcar um agendamento*
                          </label>
                        )}
                        {donationForm === null && screenings.length !== 0 && (
                          <label className="alert">
                            *É necessário preencher o formulário de doação para
                            marcar um agendamento*
                          </label>
                        )}
                        {donationForm !== null && screenings.length === 0 && (
                          <label className="alert">
                            *É necessário preencher a triagem para marcar um
                            agendamento*
                          </label>
                        )}
                        {donationForm !== null &&
                          screenings.length !== 0 &&
                          screenings[0] &&
                          screenings[0].doctor === null && (
                            <label className="alert">
                              *Sua triagem está em processo de validação. Após a
                              validação informaremos se você está apto para
                              fazer a doação*
                            </label>
                          )}
                      </div>
                      <form
                        onSubmit={handleSubmit}
                        className="form-scheduling-dontations"
                      >
                        <label htmlFor="bloodcenter">Hemocentro</label>
                        <select
                          id="bloodcenter"
                          name="bloodcenter"
                          value={selectedBloodcenter}
                          onChange={handleChangeBloodcenter}
                        >
                          <option key="">Escolha um Hemocentro</option>
                          {bloodcenters.map((bloodcenter) => (
                            <option key={bloodcenter.id} value={bloodcenter.id}>
                              {`${bloodcenter.name} - ${bloodcenter.address}`}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="date">Data</label>
                        <select
                          id="date"
                          name="date"
                          value={selectedDate}
                          onChange={handleChangeDate}
                        >
                          <option key="">Escolha uma Data</option>
                          {auxSchedulings.map((scheduling) => (
                            <option
                              key={scheduling.id}
                              value={dateFormat(new Date(scheduling.dateTime))}
                            >
                              {dateFormat(new Date(scheduling.dateTime))}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="hour">Hora</label>
                        <select
                          id="hour"
                          name="hour"
                          value={selectedHour}
                          onChange={handleChangeHour}
                        >
                          <option value="">Escolha uma Hora</option>
                          {schedulingsBloodcenter
                            .filter(
                              (scheduling) =>
                                scheduling.bloodcenter ===
                                  parseInt(selectedBloodcenter) &&
                                dateFormat(new Date(scheduling.dateTime)) ===
                                  selectedDate
                            )
                            .map((scheduling) => (
                              <option key={scheduling.id} value={scheduling.id}>
                                {hourFormat(new Date(scheduling.dateTime))}
                              </option>
                            ))}
                        </select>
                        {donationForm !== null &&
                          screenings.length !== 0 &&
                          screenings[0] &&
                          screenings[0].doctor !== null ? (
                          <button type="submit" className="schedule">
                            Agendar
                          </button>
                        ) : (
                          <button
                            disabled
                            type="submit"
                            className="schedule"
                            style={{
                              pointerEvents: "none",
                              backgroundColor: "rgba(184, 14, 20, 0.459)",
                            }}
                          >
                            Agendar
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                ) : (
                  <div style={{margin: "5% 0 5% 0"}}>
                    <Scheduling />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SchedulingAndDonation;
