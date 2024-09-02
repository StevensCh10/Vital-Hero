import { useContext, useEffect, useState } from "react";
import { BloodCenter } from "../../types/BloodCenter";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Scheduling as SchedulingType } from "../../types/Scheduling";
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
      localStorage.removeItem('scheduling');
      window.location.reload();
    });

  };

  const titleStyle = "text-[#1a3744] text-justify text-[1em] md:text-[1.3em] w-full";
  const infoStyle = "text-[#0000008c] text-start w-full";

  return (
    <div className="flex flex-col items-center justify-center my-[10%] md:my-[5%] w-[80%] md:w-[55%] lg:w-[45%] xl:w-[30%]">
      <div className="rounded-lg p-[14%] shadow-xl text-center w-full">
        <h3 className="text-[0.7em] md:text-[0.9em] mb-[4%]">*Sobre sua doação*</h3>
        <h3 className="text-[1.6em] my-[10%] font-semibold text-[#1a3744] md:text-[1.8em]">{bloodcenterInfo?.name}</h3>
        <p className={titleStyle}>Endereço</p>
        <p className={infoStyle}>{bloodcenterInfo?.address}</p>
        <p className={titleStyle}>Data</p>
        <p className={infoStyle}>
          {scheduling?.dateTime && dateFormat(new Date(scheduling.dateTime))}
        </p>
        <p className={titleStyle}>Hora</p>
        <p className={infoStyle}>
          {scheduling?.dateTime && hourFormat(new Date(scheduling.dateTime))}
        </p>
        <p className={titleStyle}>Nº para contato</p>
        <p className={infoStyle}>{formatPhone(bloodcenterInfo!.phone)}</p>
        <p className={titleStyle}>Ponto de referência</p>
        <p className={infoStyle}>{bloodcenterInfo?.referencePoint}</p>
        <button 
          className="bg-[#b80e14] rounded-md text-white p-[8px] border border-none cursor-pointer mt-[20%] w-[56%] text-[0.9em] md:w-[50%] md:text-[1.1em] md:mb-0 hover:bg-[#eb1118af]" 
          onClick={handleClick}
        >
          Desagendar
        </button>
      </div>
    </div>
  );
};

export default Scheduling;
