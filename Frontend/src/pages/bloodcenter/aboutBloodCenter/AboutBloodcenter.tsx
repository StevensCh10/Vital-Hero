import { useContext } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { BloodCenter } from "../../../types/BloodCenter";

const AboutBloodcenter = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as BloodCenter;

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
  return (
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
  );
};

export default AboutBloodcenter;
