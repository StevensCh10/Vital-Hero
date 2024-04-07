import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext"
import { BloodCenter } from "../../types/BloodCenter";
import { BiDonateBlood } from "react-icons/bi";
import { MdBloodtype } from "react-icons/md";
import { GiLifeTap } from "react-icons/gi";
import Navbar from "../../components/Navbar/Navbar";
import { Scheduling as SchedulingType } from "../../types/Scheduling";
import { Screening } from "../../types/Screening";
import { DonationForm } from "../../types/DonationForm";
import Scheduling from "../../components/Scheduling/Scheduling";
import "./Home.css"

const Home = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const [bloodcenters, setBloodCenters] = useState<BloodCenter[]>([]);
  const [schedulingsBloodcenter, setSchedulingsBloodcenter] = useState<SchedulingType[]>([]);
  const [donationForm, setDonationForm] = useState<DonationForm>(null as unknown as DonationForm);
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [selectedBloodcenter, setSelectedBloodcenter] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultBloodcenters = await auth.findAllBloodCenters();
        const resultDateTimes = await auth.findAllSchedulings();
        const resultDonationForm = await auth.findDonationForm(user!.id);
        const resultScreenings = await auth.findScreening(user!.id);
        setSchedulingsBloodcenter(resultDateTimes);
        setBloodCenters(resultBloodcenters);
        localStorage.setItem('bloodcenters', JSON.stringify(resultBloodcenters));
        setDonationForm(resultDonationForm);
        localStorage.setItem('donationForm', JSON.stringify(resultDonationForm));
        setScreenings(resultScreenings);
        localStorage.setItem('screenings', JSON.stringify(resultScreenings));

        if(user!.scheduling !== null){
          const resultScheduling = await auth.findSchedulingById(user!.scheduling);
          localStorage.setItem('scheduling', JSON.stringify(resultScheduling));
        }

        setLoading(false);
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    fetchData();
  }, [auth]);

  const handleChangeBloodcenter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBloodcenter(e.target.value);
  };
  
  const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };
  
  const handleChangeHour = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHour(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.toSchedule(user!.id, parseInt(selectedHour));
    user!.scheduling = parseInt(selectedHour);
    await auth.findDonorById(user!.id).then(() => {
      localStorage.setItem('user', JSON.stringify(user));
      window.location.reload();
    });
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

  const uniqueDate = new Set();
  const auxSchedulings = schedulingsBloodcenter.
    filter(scheduling => scheduling.bloodcenter === parseInt(selectedBloodcenter))
    .filter(scheduling => {
      let date = new Date(scheduling.dateTime)
      const dataFormatada = dateFormat(date);
      if (uniqueDate.has(dataFormatada)) {
        return false;
      }
      uniqueDate.add(dataFormatada);
      return true;
    });

    return (
    <>
    
      <div className="home-container">
        <Navbar />

        <div className="be-to-hero">
          <div className="text">
            <span>Faça sua doação e seja um <b>HERÓI</b></span>
          </div>
          <div className="image">
            <img src="hero.jpeg"></img>
          </div>

        </div>

        <span style={{color: "#035e89"}}>Critérios para doação</span>
        <div className="criteria-donation-container">
          <div className="criteria-donation">
            <ul>
              <p>Idade:</p>
                <li>Entre 16 e 69 anos.</li>
                <li>Menores de 18 anos precisam do consentimento do responsável legal.</li>
                <li>Pessoas entre 60 e 69 anos devem ter doado sangue antes dos 60 anos.</li>
              <p>Documento de Identificação:</p>
                <li>Apresentar documento com foto emitido por órgão oficial.</li>
                <li>Documentos digitais com foto são aceitos.</li>
              <p>Peso:</p>
                <li>Pesar no mínimo 50 kg.</li>
              <p>Descanso:</p>
                <li>Ter dormido pelo menos 6 horas nas últimas 24 horas.</li>
              <p>Alimentação:</p>
                <li>Estar alimentado, evitando alimentos gordurosos 3 horas antes da doação.</li>
                <li>Após o almoço, aguardar 2 horas antes de doar.</li>
            </ul>
          </div>
          <div className="image">
            <img src="/pensando.png" className=""></img>
          </div>
        </div>

        <div className="container">
          <div className="content red-dark">
            <BiDonateBlood size={60} style={{marginBottom: '3%', color: "rgba(184, 14, 20, 0.750)"}}/>
            <label>O seu sangue pode salvar até quatro vidas</label>
          </div>
          <div className="content red">
            <MdBloodtype size={60} style={{marginBottom: '3%', color: "rgba(184, 14, 20, 0.750)"}}/>
            <label>Um ato simples, um impacto imenso.</label>
          </div>
          <div className="content red-dark">
            <GiLifeTap size={60} style={{marginBottom: '3%', color: "rgba(184, 14, 20, 0.750)"}}/>
            <label>Faça a vida fluir nas veias de quem precisa.</label>
          </div>
          <div className="content red">
            <MdBloodtype size={60} style={{marginBottom: '3%', color: "rgba(184, 14, 20, 0.750)"}}/>
            <label>Cada doação conta. Faça a sua parte.</label>
          </div>
        </div>

        <fieldset>
          <legend>SOBRE A DOAÇÃO DE SANGUE</legend>
        </fieldset>
        <div className="about-donation">
          <div className="image">
            <img src="blood_donation.png"></img>
          </div>
          <div>
            <p>A doação de sangue é um gesto essencial que pode salvar vidas. É um processo simples e seguro, onde uma única doação pode fazer toda a diferença para pacientes em situações críticas, como cirurgias, tratamentos de câncer, complicações durante o parto e acidentes graves.</p>
            <p>Qualquer pessoa saudável, entre 18 e 69 anos, pode doar sangue após passar por uma triagem. A doação é rápida e indolor, e o sangue doado é testado, processado e armazenado adequadamente para uso em emergências médicas.</p>
            <p>Além de salvar vidas, a doação de sangue traz uma sensação de realização e satisfação para os doadores, sabendo que estão ajudando a comunidade e fazendo uma diferença positiva na vida de outras pessoas.</p>
            <p>Junte-se à causa da doação de sangue e seja parte dessa corrente de solidariedade e esperança. Sua doação pode ser a luz no fim do túnel para alguém que precisa desesperadamente de sangue. Lembre-se: uma única doação pode fazer toda a diferença.</p>
          </div>
        </div>

        <div className="form-home-container" id="section-home">
          {user!.scheduling === null ? (
            <div style={{padding: "2%", backgroundColor: "#f9f9f9", marginBottom: "5%"}}>
              <div className="title-form-home">
                <p>Marque um agendamento e faça sua parte</p>
                {donationForm === null && screenings.length === 0 ? (
                  <label className="alert">
                  (É necessario preencher o formulário de doação
                  e a triagem para marcar um agendamento)
                  </label>
                ) : null}
                {donationForm === null ? (
                  <label className="alert">
                    (É necessario preencher o formulário de doação para marcar um agendamento)
                  </label>
                ) : null}
                {screenings.length === 0  ? (
                  <label className="alert">
                    (É necessario preencher a triagem para marcar um agendamento)
                  </label>
                ) : null}
              </div>
              <form onSubmit={handleSubmit} className="form-home">
                <label htmlFor="bloodcenter">Hemocentro</label>
                <select id="bloodcenter" name="bloodcenter" value={selectedBloodcenter} onChange={handleChangeBloodcenter}>
                  <option key="">Escolha um Hemocentro</option>
                  {bloodcenters.map(bloodcenter => (
                    <option key={bloodcenter.id} value={bloodcenter.id}>
                      {`${bloodcenter.name} - ${bloodcenter.address}`}
                    </option>
                  ))}
                </select>
                <label htmlFor="date">Data</label>
                <select id="date" name="date" value={selectedDate} onChange={handleChangeDate}>
                  <option key="">Escolha uma Data</option>
                  {auxSchedulings
                    .map(scheduling => (   
                      <option key={scheduling.id} value={dateFormat(new Date(scheduling.dateTime))}>
                        {dateFormat(new Date(scheduling.dateTime))}
                      </option>
                    )
                  )}
                </select>
                <label htmlFor="hour">Hora</label>
                <select id="hour" name="hour" value={selectedHour} onChange={handleChangeHour}>
                  <option value="">Escolha uma Hora</option>
                {schedulingsBloodcenter
                    .filter(scheduling => scheduling.bloodcenter === parseInt(selectedBloodcenter) 
                        && dateFormat(new Date(scheduling.dateTime)) === selectedDate)
                    .map(scheduling => (
                      <option key={scheduling.id} value={scheduling.id}>
                        {hourFormat(new Date(scheduling.dateTime))}
                      </option>
                    )
                )}
                </select>
                <button type="submit" className="schedule">Agendar</button>
              </form> 
            </div>
          ) : (
            <div className="sched-info" id="section-home">
              {!loading && (
                  <Scheduling />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
