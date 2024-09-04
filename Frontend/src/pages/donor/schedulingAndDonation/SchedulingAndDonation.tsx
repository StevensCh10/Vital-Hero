import { Scheduling as SchedulingType } from "../../../types/Scheduling";
import Scheduling from "../../../components/Scheduling/Scheduling";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import Navbar from "../../../components/NavbarDonor/NavbarDonor";
import { BloodCenter } from "../../../types/BloodCenter";
import { useContext, useEffect, useState } from "react";
import { Donation } from "../../../types/Donation";
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
  const [screenings, setScreenings] = useState<Screening[]>(() => {
    const storedScreenings = localStorage.getItem("screenings");
    return storedScreenings
      ? (JSON.parse(storedScreenings) as Screening[])
      : [];
  });
  const [selectedBloodcenter, setSelectedBloodcenter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  //const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [scheduling, setScheduling] = useState<SchedulingType | null>(() => {
    const savedScheduling = localStorage.getItem("scheduling");
    return savedScheduling ? JSON.parse(savedScheduling) : null;
  });

  const labelStyle = "mb-[0.5%] text-start text-[1.1em]";
  const selectStyle =
    "text-[#333333] p-2 rounded-md bg-[#00000015] mb-[1.5%] text-[1em]" +
    " text-center focus:outline-none w-[25%]";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultDateTimes = await auth.findAllSchedulings();
        setSchedulingsBloodcenter(resultDateTimes);
        const resultDonations = await auth.findDonations(auth.user!.id);
        setDonations(resultDonations);
        const resultScreenings = await auth.findScreening(user!.id);
        localStorage.setItem("screenings", JSON.stringify(resultScreenings));
        setScreenings(resultScreenings);
        if (user.scheduling === null) {
          if (scheduling !== null) {
            setScheduling(null);
            localStorage.setItem("scheduling", "");
          }
        }
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
    await auth.toSchedule(user!.id, parseInt(selectedHour))
      .then(() => window.location.reload())  
      .catch(e => console.error(e));
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
    <div className="flex flex-col items-center min-h-[97vh]">
      <Navbar />
      <nav className="flex box-border items-center justify-center mt-[1%] w-full ">
        <div className="flex items-center mx-[2%]">
          <button
            className={`text-[#035e89] text-center py-1 px-2  cursor-pointer text-[1.1em]
                hover:text-white hover:rounded-md hover:shadow-custom hover:bg-[#035e89] ${
                  activeButtonLeft === true
                    ? "text-white bg-[#035e89] rounded-md shadow-custom"
                    : ""
                }`}
            onClick={handleClickLeft}
          >
            Agendamento
          </button>
        </div>
        <label className={labelStyle}>|</label>
        <div className="flex items-center mx-[2%]">
          <button
            className={`text-[#035e89] text-center py-1 px-2  cursor-pointer text-[1.1em]
                hover:text-white hover:rounded-md hover:shadow-custom hover:bg-[#035e89] ${
                  activeButtonRight === true
                    ? "text-white bg-[#035e89] rounded-md shadow-custom"
                    : ""
                }`}
            onClick={handleClickRight}
          >
            Últimas doações
          </button>
        </div>
      </nav>
      <div className="flex flex-row w-[90%] items-center justify-start min-h-[70vh]">
        {activeButtonRight ? (
          <div className="flex text-center items-center justify-center w-full">
            {donations.length !== 0 ? (
              donations.slice(0, 10).map((donation) => (
                <div key={donation.id} className="mx-[2%] mt-[2%] rounded-md p-[1%] w-[22%] shadow-custom">
                  <h3 className="m-0 text-[1.1em] mb-[3px]" >
                    {
                      bloodcenters!.find(
                        (center) =>
                          center.id === donation.scheduling.bloodcenter
                      )?.name
                    }
                  </h3>
                  <p className="m-0 opacity-90 mb-[3px]">
                    {
                      bloodcenters.find(
                        (center) =>
                          center.id === donation.scheduling.bloodcenter
                      )?.address
                    }
                  </p>
                  <p className="m-0 opacity-90">
                    {dateFormat(new Date(donation.scheduling.dateTime))} -{" "}
                    {hourFormat(new Date(donation.scheduling.dateTime))}
                  </p>
                </div>
              ))
            ) : (
              <h2 className="text-[1.2em]">
                Você ainda não realizou nenhuma doação!
              </h2>
            )}
          </div>
        ) : (
          <div className="w-full">
            <div className="w-full text-center">
              {scheduling === null ? (
                <div id="section-scheduling-dontations">
                  <div className="flex flex-col">
                    {donationForm === null && screenings.length === 0 && (
                      <h2 className="text-[1.2em]">
                        *É necessário preencher o formulário de doação e a
                        triagem para marcar um agendamento*
                      </h2>
                    )}
                    {donationForm === null && screenings.length !== 0 && (
                      <h2 className="text-[1.2em]">
                        *É necessário preencher o formulário de doação para
                        marcar um agendamento*
                      </h2>
                    )}
                    {donationForm !== null && screenings.length === 0 && (
                      <h2 className="text-[1.2em]">
                        *É necessário preencher a triagem para marcar um
                        agendamento*
                      </h2>
                    )}
                    {donationForm !== null &&
                      screenings.length !== 0 &&
                      screenings[0] &&
                      screenings[0].doctor === null && (
                        <h2 className="text-[1.2em]">
                          *Sua triagem está em processo de validação. Após a
                          validação informaremos se você está apto para fazer a
                          doação*
                        </h2>
                      )}
                  </div>
                  {donationForm !== null &&
                    screenings.length !== 0 &&
                    screenings[0] &&
                    screenings[0].doctor !== null && (
                      <div className="flex flex-col mb-0">
                        <span className= "text-[#035e89] mb-6 text-2xl md:text-3xl">
                          Marque um agendamento e faça sua parte
                        </span>
                        <form
                          className="flex flex-col items-center justify-center p-[2%] md:mb-[2%]"
                          onSubmit={handleSubmit}
                        >
                          <label className={labelStyle} htmlFor="bloodcenter">Hemocentro</label>
                          <select
                            className={selectStyle}
                            id="bloodcenter"
                            name="bloodcenter"
                            value={selectedBloodcenter}
                            onChange={handleChangeBloodcenter}
                          >
                            <option key="">Escolha um Hemocentro</option>
                            {bloodcenters.map((bloodcenter) => (
                              <option
                                key={bloodcenter.id}
                                value={bloodcenter.id}
                              >
                                {`${bloodcenter.name} - ${bloodcenter.address}`}
                              </option>
                            ))}
                          </select>
                          <label className={labelStyle} htmlFor="date">Data</label>
                          <select
                            className={selectStyle}
                            id="date"
                            name="date"
                            value={selectedDate}
                            onChange={handleChangeDate}
                          >
                            <option key="">Escolha uma Data</option>
                            {auxSchedulings.map((scheduling) => (
                              <option
                                key={scheduling.id}
                                value={dateFormat(
                                  new Date(scheduling.dateTime)
                                )}
                              >
                                {dateFormat(new Date(scheduling.dateTime))}
                              </option>
                            ))}
                          </select>
                          <label className={labelStyle} htmlFor="hour">Hora</label>
                          <select
                            className={selectStyle}
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
                                <option
                                  key={scheduling.id}
                                  value={scheduling.id}
                                >
                                  {hourFormat(new Date(scheduling.dateTime))}
                                </option>
                              ))}
                          </select>
                          <button 
                            className="bg-[#b80e14] rounded-md text-white p-[8px] border border-none cursor-pointer mt-[2%] mb-[4%] w-[25%] md:w-[10%] md:mb-0 hover:bg-[#eb1118af]"
                            type="submit"
                          >
                            Agendar
                          </button>
                        </form>
                      </div>
                    )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Scheduling />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulingAndDonation;
