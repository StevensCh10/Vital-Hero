import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { BloodCenter } from "../../../types/BloodCenter";
import { Scheduling } from "../../../types/Scheduling";
import customStyles from "./CustomStyles.ts";
import { Donor } from "../../../types/Donor";
import Modal from "react-modal";

const DonorsSchedule = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as BloodCenter;
  const [schedulingsBloodcenter, setSchedulingsBloodcenter] = useState<
    Scheduling[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allScheduledDonors, setAllScheduledDonors] = useState<Donor[]>([]);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const resultSchedulings = await auth.findSchedulingsByBloodcenter(
        user.id
      );
      const resultAllScheduledDonors = await auth.allScheduledDonors();
      setSchedulingsBloodcenter(resultSchedulings);
      setAllScheduledDonors(resultAllScheduledDonors);
    };
    fetchData();
  }, [auth]);

  const dateFormat = (dateTime: Date) => {
    const [year, month, day] = dateTime.toISOString().split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  const hourFormat = (dateTime: Date) => {
    const hour = dateTime.getHours().toString().padStart(2, "0");
    const minute = dateTime.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}h`;
  };

  interface DateMap {
    [date: string]: {
      [hour: string]: string;
    };
  }

  const dateMap: DateMap = {};

  schedulingsBloodcenter.forEach((scheduling) => {
    const idSched = scheduling.id.toString();
    const date = dateFormat(new Date(scheduling.dateTime));
    const hour = hourFormat(new Date(scheduling.dateTime));

    if (!dateMap[date]) {
      dateMap[date] = {};
    }

    dateMap[date][hour] = idSched;
  });

  const toggleModal = (date: string, hour: string) => {
    setIsModalOpen(!isModalOpen);
    setSelectedHour(hour);
    setSelectedDate(date);
  };

  const handleDonationFinalize = () => {
    const idDonorDonated: number[] = [];
    const idDonorNotDonated: number[] = [];
    const schedulingId = Number(dateMap[selectedDate][selectedHour]);

    const scheduledDonors = allScheduledDonors.filter(
      (donor) => donor.scheduling!.id === schedulingId
    );

    scheduledDonors.forEach((donor) => {
      const checkbox = document.getElementById(
        `checkbox-${donor.id}`
      ) as HTMLInputElement;
      if (checkbox) {
        if (checkbox.checked) {
          idDonorNotDonated.push(donor.id);
        } else {
          idDonorDonated.push(donor.id);
        }
      }
    });

    auth.donationMade(idDonorDonated, idDonorNotDonated);
    window.location.reload();
  };
  return (
    <div className="flex flex-col justify-center items-center justify-between rounded-md text-center mb-[3%] bg-[#f8f8f8]">
      <div style={{ marginTop: "1%" }}>
        <span>Agendamentos </span>
        <button className="btn-add-scheduling">Adicionar</button>
      </div>
      <div className="schedulings">
        {Object.keys(dateMap).map((date) => (
          <div className="info" key={date}>
            <label style={{ fontWeight: "bold", marginBottom: "5%" }}>
              Data: {date}
            </label>
            <ul>
              {Object.keys(dateMap[date]).map((hour) => (
                <div key={hour}>
                  <li onClick={() => toggleModal(date, hour)}>{hour}</li>
                  <Modal
                    style={{
                      overlay: { ...customStyles.overlay },
                      content: {
                        ...customStyles.content,
                      },
                    }}
                    isOpen={
                      isModalOpen &&
                      selectedHour === hour &&
                      selectedDate === date
                    }
                    onRequestClose={() => toggleModal(date, hour)}
                    ariaHideApp={false}
                  >
                    <div className="tabela">
                      <div className="linha">
                        <div className="celula">Nome do Paciente</div>
                        <div className="celula">Não doou</div>
                      </div>
                      {isModalOpen && (
                        <>
                          {allScheduledDonors.filter(
                            (donor) =>
                              donor.scheduling!.id ===
                              Number(dateMap[date][hour])
                          ).length !== 0 &&
                          hourFormat(
                            new Date(
                              schedulingsBloodcenter.find(
                                (sched) =>
                                  sched.id === Number(dateMap[date][hour])
                              )?.dateTime!
                            )
                          ) === selectedHour ? (
                            allScheduledDonors
                              .filter(
                                (donor) =>
                                  donor.scheduling!.id ===
                                  Number(dateMap[date][hour])
                              )
                              .map((donor) => (
                                <div className="linha" key={donor.id}>
                                  <div className="celula">{donor.name}</div>
                                  <div
                                    className="celula"
                                    style={{
                                      textAlign: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <input
                                      id={`checkbox-${donor.id}`}
                                      style={{ width: "20px", height: "16px" }}
                                      type="checkbox"
                                    ></input>
                                  </div>
                                </div>
                              ))
                          ) : (
                            <div
                              className="linha"
                              style={{
                                position: "absolute",
                                textAlign: "center",
                                marginTop: "5%",
                                fontSize: "1.1em",
                              }}
                            >
                              Sem pacientes agendados
                            </div>
                          )}
                          <div className="donation-finalize">
                            <button onClick={handleDonationFinalize}>
                              Finalizar doação
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </Modal>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorsSchedule;
