import NavbarBloodcenter from "../../../components/NavbarBloodcenter/NavbarBloodcenter";
import { Scheduling as SchedulingType } from "../../../types/Scheduling";
import Scheduling from "../../../components/Scheduling/Scheduling";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { DonationForm } from "../../../types/DonationForm";
import { BloodCenter } from "../../../types/BloodCenter";
import { useContext, useState, useEffect } from "react";
import { Screening } from "../../../types/Screening";
import { BiDonateBlood } from "react-icons/bi";
import { MdBloodtype } from "react-icons/md";
import { GiLifeTap } from "react-icons/gi";
import "./HomeBloodcenter.css";

const HomeBloodcenter = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as BloodCenter;
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


    return (
    <>
    
      <div className="home-container">
        <NavbarBloodcenter />

        <div className="home-content">
            <div className="info-bloodcenter">
              <p>Nome: {user?.name}</p>
              <p>Email: {user?.email}</p>
              <p>Endereço: {user?.address}</p>
              <p>Ponto de referência: {user!.referencePoint}</p>
              <p>Telefone: {user?.phone}</p>
            </div>
        </div>  
      </div>
    </>
  )
}

export default HomeBloodcenter;
