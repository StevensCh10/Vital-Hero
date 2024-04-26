import NavbarBloodcenter from "../../../components/NavbarBloodcenter/NavbarBloodcenter";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { Scheduling } from "../../../types/Scheduling";
import { Donor } from "../../../types/Donor";
import './Schedules.css'

const Schedules = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const [selectedScheduling, setSelectedScheduling] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<Scheduling[]>([]);
  const [sheduledDonors, setScheduledDonors] = useState<Donor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultSchedules = await auth.findSchedulingsByBloodcenter(user?.id!);
        const resultScheduleDonors = await auth.allScheduledDonors();
        setSchedules(resultSchedules);
        setScheduledDonors(resultScheduleDonors);
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
    return `${hour}:${minute}h`;
  };

  const toggleSelected = (centerId: string) => {
    setSelectedScheduling((prevId) => (prevId === centerId ? null : centerId));
  };

  return (
    <div className="schedules-container">
      <NavbarBloodcenter />
      <div className="scheduling-info">
        {schedules.map((sched) => (
          <div
            key={sched.id}
            id={sched?.id.toString()}
            className={`scheduling-box ${
              selectedScheduling === sched.id.toString() ? "selected" : ""
            }`}
          >
            <div style={{ display: "flex", width: "100%" }}>
              <div className="topics">
                <p>
                  <span>Data: </span> <label>{dateFormat(new Date(sched.dateTime))}</label>
                </p>
                <p>
                  <span>Hora: </span> <label>{hourFormat(new Date(sched.dateTime))}</label>
                </p>
              </div>
            </div>

            <div className="arrow-container">
              {!selectedScheduling || selectedScheduling !== sched.id.toString() ? (
                <>
                  <label
                    className="more-info"
                    onClick={() => toggleSelected(sched.id.toString())}
                  >
                    Pessoas agendadas
                  </label>
                  <IoIosArrowDown
                    className="arrow"
                    onClick={() => toggleSelected(sched.id.toString())}
                  />
                </>
              ) : (
                <>
                  <label
                    className="more-info"
                    onClick={() => toggleSelected(sched.id.toString())}
                  >
                    Pessoas agendadas
                  </label>
                  <IoIosArrowUp
                    className="arrow"
                    onClick={() => toggleSelected(sched.id.toString())}
                  />
                </>
              )}
            </div>
            {selectedScheduling === sched.id.toString() && (
              <div style={{ backgroundColor: " #f8f8f8" }}>
                {sheduledDonors.find((donor) => donor.scheduling === sched.id) ? (
                  <div className="types-container">
                    <p>donor.name</p>
                  </div>
                ) : (
                  <div className="types-container">
                    <p>Sem doadores agendados!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedules;
