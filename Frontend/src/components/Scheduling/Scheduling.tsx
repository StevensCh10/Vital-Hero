import { useContext, useEffect, useState } from "react";
import { BloodCenter } from "../../types/BloodCenter";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Scheduling as SchedulingType } from "../../types/Scheduling";
import "./Scheduling.css";
import { Donor } from "../../types/Donor";

const Scheduling = () => {
    const auth = useContext(AuthContext);
    const user = auth.user as Donor;
  const [bloodcenters] = useState<BloodCenter[]>(
    localStorage.getItem("bloodcenters") !== null
      ? JSON.parse(localStorage.getItem("bloodcenters")!)
      : []
  );
  const [scheduling] = useState<SchedulingType>(
    localStorage.getItem("scheduling") !== null
      ? JSON.parse(localStorage.getItem("scheduling")!)
      : null
  );
  const [bloodcenterInfo] = useState<BloodCenter | undefined>(
    bloodcenters.find((bd) => bd.id === scheduling?.bloodcenter)
      ? bloodcenters.find((bd) => bd.id === scheduling.bloodcenter)
      : undefined
  );
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    //const second = dateTime.getSeconds().toString().padStart(2, "0");

    return `${hour}:${minute}`;
  };

  const formatPhone = (phone: string) => {
    phone = phone
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");

    if (phone.length === 8) {
      phone = phone.replace(/^(\d{4})(\d{4})$/, "$1-$2");
    }
    return phone;
  };

  const handleClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    auth.unSchedule(user!.id); 
    user!.scheduling = null;
    await auth.findDonorById(user!.id).then(() => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.removeItem('scheduling');
      window.location.reload();
    });

  };

  return (
    <div className="sched-info">
      <div className="scheduled">
        <h3 className="about">Sobre sua doação</h3>
        <h3 className="bloodcenter-name">{bloodcenterInfo?.name}</h3>
        <p className="title">Endereço</p>
        <p className="info">{bloodcenterInfo?.address}</p>
        <p className="title">Data</p>
        <p className="info">
          {scheduling?.dateTime && dateFormat(new Date(scheduling.dateTime))}
        </p>
        <p className="title">Hora</p>
        <p className="info">
          {scheduling?.dateTime && hourFormat(new Date(scheduling.dateTime))}
        </p>
        <p className="title">Nº para contato</p>
        <p className="info">{formatPhone(bloodcenterInfo!.phone)}</p>
        <p className="title">Ponto de referência</p>
        <p className="info">{bloodcenterInfo?.referencePoint}</p>
        <button className="btn" onClick={handleClick}>
          Desagendar
        </button>
      </div>
    </div>
  );
};

export default Scheduling;
