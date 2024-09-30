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
import { ErrorType } from "../../../types/ErrorType";
import Footer from "../../../components/Footer/Footer";
import Loading from "../../../components/Loading/Loading";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiSmileySad } from "react-icons/pi";
import { FaRegFileArchive } from "react-icons/fa";
import { FaHeartPulse } from "react-icons/fa6";
import { PiListMagnifyingGlassLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

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
  const [screening, setScreening] = useState<Screening>(() => {
    const storedScreening = localStorage.getItem("screening");
    return storedScreening
      ? (JSON.parse(storedScreening) as Screening)
      : ({} as Screening);
  });
  const [selectedBloodcenter, setSelectedBloodcenter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [scheduling, setScheduling] = useState<SchedulingType | null>(() => {
    const savedScheduling = localStorage.getItem("scheduling");
    return savedScheduling ? JSON.parse(savedScheduling) : null;
  });
  const navigate = useNavigate();

  const labelStyle = "mb-[0.5%] text-[1.1em]";
  const selectStyle =
    "text-[#333333] bg-white p-2 rounded-md border mb-[1.5%] text-[1em]" +
    " text-center focus:outline-none w-[30%]";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultDateTimes = await auth.findAllSchedulings();
        setSchedulingsBloodcenter(resultDateTimes);
        const resultDonations = await auth.findDonations(auth.user!.id);
        setDonations(resultDonations);
        const resultScreening = await auth.findScreening(user!.id);
        localStorage.setItem("screening", JSON.stringify(resultScreening));
        setScreening(resultScreening);
        if (user.scheduling === null) {
          if (scheduling !== null) {
            setScheduling(null);
            localStorage.setItem("scheduling", "");
          }
        }
      } catch (error) {
        console.error("Erro: ", (error as ErrorType).detail);
      }
      setLoading(false);
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
    await auth
      .toSchedule(user!.id, parseInt(selectedHour))
      .then(() => window.location.reload())
      .catch((e) => console.error(e));
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center min-h-[97vh]">
      <Navbar />
      <nav className="flex box-border items-center justify-center mt-[1%] w-full ">
        <div className="flex items-center mx-[2%]">
          <button
            className={`text-black text-center py-1 px-2  cursor-pointer text-[1.1em]
                hover:text-white hover:rounded-md hover:shadow-custom hover:bg-black ${
                  activeButtonLeft === true
                    ? "text-white bg-black rounded-md shadow-custom"
                    : ""
                }`}
            onClick={handleClickLeft}
          >
            Agendamento
          </button>
        </div>
        <label className="text-start text-[1.1em]">|</label>
        <div className="flex items-center mx-[2%]">
          <button
            className={`text-black text-center py-1 px-2  cursor-pointer text-[1.1em]
                hover:text-white hover:rounded-md hover:shadow-custom hover:bg-black ${
                  activeButtonRight === true
                    ? "text-white bg-black rounded-md shadow-custom"
                    : ""
                }`}
            onClick={handleClickRight}
          >
            Últimas doações
          </button>
        </div>
      </nav>
      <div className="flex flex-row w-[90%] items-center justify-start min-h-[85vh] xl:min-h-[77.95vh]">
        {activeButtonRight ? (
          <div className="flex text-center items-center justify-center w-full">
            {donations.length !== 0 ? (
              donations.slice(0, 10).map((donation) => (
                <div
                  key={donation.id}
                  className="mx-[2%] mt-[2%] rounded-md p-[1%] w-[22%] shadow-custom"
                >
                  <h3 className="m-0 text-[1.1em] mb-[3px]">
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
              <div className="flex flex-col items-center justify-center h-[45vh] w-[32vw] text-[1.2em] p-4 rounded-md shadow-custom2">
                <PiSmileySad className="mb-[8%] opacity-70" size={85} color="red"/>
                <span>Você ainda não realizou nenhuma doação</span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full">
            <div className="w-full text-center">
              {scheduling === null ? (
                <div id="section-scheduling-dontations">
                  <div className="flex flex-col items-center justify-center">
                    {donationForm === null && screening === null && (
                      <div className="flex flex-col items-center justify-center h-[45vh] w-[32vw] text-[1.2em] p-4 rounded-md shadow-custom2">
                        <FaHeartPulse className="mb-[5%] opacity-70" size={85} color="red"/>
                        <div>
                          É necessário preencher o <label className="font-semibold">Formulário de doação</label> e a
                          <label className="font-semibold"> Triagem</label> para marcar um agendamento
                        </div>
                        <button
                          className="hover:bg-black shadow-custom5 rounded-lg text-black hover:text-white cursor-pointer mt-[9%] mb-[3%] text-[0.7em] w-[20%] p-[6px] md:p-[10px] 
                          md:text-base md:w-[15%] lg:w-[30%] hover:bg-[#b80e14]"
                          onClick={() => navigate("/donation-form")}
                        >
                          <span className="flex items-center justify-center">Preencher <FaRegFileArchive className="ml-2" size={20} /></span>
                        </button>
                      </div>
                    )}
                    {donationForm === null && screening !== null && (
                      <div className="flex flex-col items-center justify-center h-[45vh] w-[32vw] text-[1.2em] p-4 rounded-md shadow-custom2">
                        <FaHeartPulse className="mb-[5%] opacity-70" size={85} color="red"/>
                        <div>
                          É necessário preencher o <label className="font-semibold">Formulário de doação</label>
                          para marcar um agendamento
                        </div>
                        <button
                          className="hover:bg-black shadow-custom5 rounded-lg text-black hover:text-white cursor-pointer mt-[9%] mb-[3%] text-[0.7em] w-[20%] p-[6px] md:p-[10px] 
                            md:text-base md:w-[15%] lg:w-[30%] hover:bg-[#b80e14]"
                          onClick={() => navigate("/donation-form")}
                        >
                          <span className="flex items-center justify-center">Preencher <FaRegFileArchive className="ml-2" size={20} /></span>
                        </button>
                      </div>
                    )}
                    {donationForm !== null && screening === null && (
                      <div className="flex flex-col items-center justify-center h-[45vh] w-[32vw] text-[1.2em] p-4 rounded-md shadow-custom2">
                        <FaHeartPulse className="mb-[5%] opacity-70" size={85} color="red"/>
                        <div>
                          É necessário preencher a<label className="font-semibold"> Triagem</label> para marcar um agendamento
                        </div>
                        <button
                          className="hover:bg-black shadow-custom5 rounded-lg text-black hover:text-white cursor-pointer mt-[9%] mb-[3%] text-[0.7em] w-[20%] p-[6px] md:p-[10px] 
                            md:text-base md:w-[15%] lg:w-[30%] hover:bg-[#b80e14]"
                          onClick={() => navigate("/screening")}
                        >
                          <span className="flex items-center justify-center">Preencher <FaRegFileArchive className="ml-2" size={20} /></span>
                        </button>
                      </div>
                    )}
                    {donationForm !== null &&
                      screening !== null &&
                      screening.doctor === null && (
                        <div className="flex flex-col items-center justify-center h-[45vh] w-[32vw] text-[1.2em] p-4 rounded-md shadow-custom2">
                          <PiListMagnifyingGlassLight className="mb-[5%] opacity-70" size={85} color="red"/>
                          <div>
                            Sua triagem está em processo de <label className="font-semibold">validação</label>. Após a
                            validação informaremos se você está apto para fazer a doação
                          </div>
                        </div>
                      )}
                  </div>
                  {donationForm !== null &&
                    screening !== null &&
                    screening.doctor !== null && (
                      <div className="flex flex-col items-center mb-0">
                        <div className="flex items-center w-[80%] h-[8vh]"
                        style={{ background: 'linear-gradient(to right, #49052E, #b80e14)' }}>
                          <span className="text-white ml-[4%] text-md md:text-lg">
                            Marque um agendamento e faça sua parte
                          </span>
                        </div>
                        <form
                          className="flex flex-col rounded-md w-[82%] py-[4%] md:mb-[2%] shadow-custom4"
                          onSubmit={handleSubmit}
                        >
                          <div>
                            <label className={`${labelStyle} mr-[4.5%]`} htmlFor="bloodcenter">
                              Hemocentro:
                            </label>
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
                          </div>

                          <div>
                            <label className={`${labelStyle} mr-[11%]`} htmlFor="date">
                              Data:
                            </label>
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
                          </div>

                          <div>
                            <label className={`${labelStyle} mr-[11%]`} htmlFor="hour">
                              Hora:
                            </label>
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
                          </div>
                          <button
                            className="relative flex items-center justify-center ml-[82%] bg-white rounded-md text-black p-[8px] shadow-custom cursor-pointer mt-[2%] w-[45%] md:w-[14%] md:mb-0 hover:bg-black hover:text-white"
                            type="submit"
                          >
                            <span className="flex items-center justify-center">Agendar <IoMdCheckmarkCircleOutline className="ml-2" size={24} /></span>
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
      <div className="bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default SchedulingAndDonation;
