import NavbarBloodcenter from "../../../components/NavbarBloodcenter/NavbarBloodcenter";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { BloodCenter } from "../../../types/BloodCenter";
import { useContext, useState, useEffect } from "react";
import { Scheduling } from "../../../types/Scheduling";
import { Donor } from "../../../types/Donor.ts";
import customStyles from './CustomStyles.ts'
import Modal from "react-modal";
import "./HomeBloodcenter.css";

const HomeBloodcenter = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as BloodCenter;
  const [schedulingsBloodcenter, setSchedulingsBloodcenter] = useState<
    Scheduling[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allScheduledDonors, setAllScheduledDonors] = useState<Donor[]>([]);
  const [selectedHour, setSelectedHour] = useState("");

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

  const formatPhone = (phone: string) => {
    phone = phone
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
    return phone;
  };

  const openingHours = (bloodcenter: string) => {
    if (bloodcenter === "Hemope") {
      return "07:15h - 18:30h";
    } else if (bloodcenter === "Hemato") {
      return "07:00h - 18:00h";
    } else {
      return "08:00h - 18:00h";
    }
  };

  const dateFormat = (dateTime: Date) => {
    const [year, month, day] = dateTime.toISOString().split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  }

  const hourFormat = (dateTime: Date) => {
    const hour = dateTime.getHours().toString().padStart(2, '0');
    const minute = dateTime.getMinutes().toString().padStart(2, '0');
    //const second = dateTime.getSeconds().toString().padStart(2, '0');
    return `${hour}:${minute}h`;
  };

  interface DateMap {
    [date: string]: {
      [hour: string]: string;
    };
  }
  
  const dateMap: DateMap = {};

  schedulingsBloodcenter.forEach(scheduling => {
    const idSched = scheduling.id.toString(); // Converta para string se necessário
    const date = dateFormat(new Date(scheduling.dateTime));
    const hour = hourFormat(new Date(scheduling.dateTime));
  
    // Verifique se a entrada para esta data já existe no dateMap
    if (!dateMap[date]) {
      // Se não existir, inicialize a entrada para esta data com um objeto vazio
      dateMap[date] = {};
    }
  
    // Adicione o idSched para esta data e hora específica
    dateMap[date][hour] = idSched;
  });

  const toggleModal = (hour: string) => {
    setIsModalOpen(!isModalOpen);
    setSelectedHour(hour);
  };

  /*
  const handleDonationFinalize = (result: Donor[]) => {
    const uncheckedDonorIds: any = [];

  // Iterar sobre todos os doadores agendados para a data e hora específicas
  result.forEach(donor => {
    const checkbox = document.getElementById(`checkbox-${donor.id}`) as HTMLInputElement;
    if (checkbox && !checkbox.checked) {
      // Adicionar o ID do doador à matriz de IDs não marcados
      uncheckedDonorIds.push(donor.id);
    }
    
    // Agora você tem os IDs de todos os doadores cujas caixas de seleção não estão marcadas
    //console.log(uncheckedDonorIds);
  }
});*/
  

  return (
    <div className="home-container">
      <NavbarBloodcenter />
      <div className="add-scheduling">
        <div style={{marginTop: "1%"}}>
          <span>Agendamentos </span>
          <button className="btn-add-scheduling">Adicionar</button>
        </div>
        <div className="schedulings">
          {Object.keys(dateMap).map(date => (
            <div className="info">
              <label style={{fontWeight: "bold", marginBottom: "5%"}}>Data: {date}</label>
              <ul>
                {Object.keys(dateMap[date]).map(hour => (
                  <>
                    <li onClick={() => toggleModal(hour)}>{hour}</li>
                    <Modal
                      style={{
                        overlay: { ...customStyles.overlay },
                        content: {
                          ...customStyles.content,
                        },
                      }}
                      isOpen={isModalOpen && selectedHour === hour}
                      onRequestClose={() => toggleModal(hour)}
                      ariaHideApp={false}
                      >
                      <div className="tabela">
                        <div className="linha">
                          <div className="celula">Nome do Paciente</div>
                          <div className="celula">Não doou</div>
                          
                        </div>
                        {isModalOpen && (
                          <>
                            {(allScheduledDonors.filter(donor => donor.scheduling! === schedulingsBloodcenter.find(sched => sched.id === Number(dateMap[date][hour]))?.id).length !== 0) && 
                            (hourFormat(new Date(schedulingsBloodcenter.find(sched => sched.id === Number(dateMap[date][hour]))?.dateTime!)) === selectedHour) ? (
                              allScheduledDonors.filter(donor => donor.scheduling! === schedulingsBloodcenter.find(sched => sched.id === Number(dateMap[date][hour]))?.id).map(donor => (
                                <div className="linha">
                                  <div className="celula">{donor.name}</div> 
                                    <div className="celula" style={{textAlign: "center", width: "100%"}}><input style={{width: "20px", height: "16px"}} type="checkbox"></input></div>
                                    <div className="donation-finalize">
                                      <button>Finalizar doação</button>
                                    </div>                      
                                </div>
                              ))
                            ) : (
                              <div className="linha" style={{position: "absolute", textAlign: "center", marginTop: "5%", fontSize: "1.1em"}}>
                                Sem pacientes agendados
                              </div>
                            )}
                          </>    
                        )}   
                      </div>
                    </Modal>
                  </>
                ))}
              </ul>
            </div>
          ))}      
        </div>
      </div>
      <div className="home-content">
        <h3 className="bloodcenter-title">{user.name.toUpperCase()}</h3>
        <div style={{ display: "flex", width: "100%" }}>
          <div className="topics-bloodcenter">
            <p>
              <span>Endereço:</span> <label>{user.address}</label>
            </p>
            <p>
              <span>Horário de funcionamento:</span>{" "}
              <label>{openingHours(user.name)}</label>
            </p>
            <p>
              <span>Telefone:</span> <label>{formatPhone(user.phone)}</label>
            </p>
            <p>
              <span>Email:</span> <label>{user.email}</label>
            </p>
            <p>
              <span>Ponto de referência:</span>{" "}
              <label>{user.referencePoint}</label>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBloodcenter;