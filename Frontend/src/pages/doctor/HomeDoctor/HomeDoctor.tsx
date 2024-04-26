import NavbarDoctor from "../../../components/NavbarDoctor/NavbarDoctor";
import { Scheduling as SchedulingType } from "../../../types/Scheduling";
import Scheduling from "../../../components/Scheduling/Scheduling";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { DonationForm } from "../../../types/DonationForm";
import { useContext, useState, useEffect } from "react";
import { BloodCenter } from "../../../types/BloodCenter";
import { Screening } from "../../../types/Screening";
import { Doctor } from "../../../types/Doctor";
import { BiDonateBlood } from "react-icons/bi";
import { MdBloodtype } from "react-icons/md";
import { GiLifeTap } from "react-icons/gi";
import "./HomeDoctor.css"

const HomeDoctor = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as Doctor;

  useEffect(() => {
    const fetchData = async () => {
      try {
        
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    fetchData();
  }, [auth]);


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

    return (
    <>
    
      <div className="home-container">
        <NavbarDoctor />

      </div>
    </>
  )
}

export default HomeDoctor;
