import NavbarBloodcenter from "../../components/NavbarBloodcenter/NavbarBloodcenter";
import { Scheduling as SchedulingType } from "../../types/Scheduling";
import Scheduling from "../../components/Scheduling/Scheduling";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext, useState, useEffect } from "react";
import { DonationForm } from "../../types/DonationForm";
import { BloodCenter } from "../../types/BloodCenter";
import { Screening } from "../../types/Screening";
import { BiDonateBlood } from "react-icons/bi";
import { MdBloodtype } from "react-icons/md";
import { GiLifeTap } from "react-icons/gi";
import "./HomeBloodcenter.css";

const HomeBloodcenter = () => {
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
        <NavbarBloodcenter />

        
      </div>
    </>
  )
}

export default HomeBloodcenter;
