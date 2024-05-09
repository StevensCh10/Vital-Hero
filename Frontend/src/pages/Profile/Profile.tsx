import NavbarDoctor from "../../components/NavbarDoctor/NavbarDoctor";
import NavbarDonor from "../../components/NavbarDonor/NavbarDonor";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Doctor } from "../../types/Doctor";
import { Donor } from "../../types/Donor";
import "./Profile.css";

const Profile = () => {
  const auth = useContext(AuthContext);
  const user: Donor | Doctor = auth.user!.role === "DONOR" ? auth.user! as Donor : auth.user! as Doctor;
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [age, setAge] = useState(0);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [bloodType, setBloodType] = useState("");
  const role = user.role;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(role === "DONOR"){
          setBloodType((user as Donor).bloodType!)
        }
        setCpf(user!.cpf!);
        setAge(user!.age!);
        setName(user!.name!);
        setPhone(user!.phone!);
        setEmail(user!.email!);
        setAddress(user!.address!);

        if(user!.photo !== "sem" && user!.photo !== null){
          const response = await fetch(`https://vital-hero.onrender.com/donor/img/${user!.photo}`);
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setPhotoURL(imageUrl);
        }else{
          setPhotoURL("Logo.png");
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, [auth]);

  const handleAtt = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    user!.phone = phone;
    user!.address = address;

    await auth.updateDonor(user! as Donor);
    window.location.reload();
  };

  const formatCPF = (auxCpf: string) => {
    auxCpf = auxCpf
      .replace(/\D/g, "")
      .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    return auxCpf;
  };

  const formatPhone = (phone: string) => {
    phone = phone
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
    return phone;
  };

  return (
    <div className="profile-container">
      {role === "DOCTOR" ? (
        <NavbarDoctor />
      ) : (
        <NavbarDonor />
      )}
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-image">
            <img src={photoURL} alt="Foto do usuário" />
          </div>
        </div>
        <form onSubmit={handleAtt} className="profile-form">
          <div className="profile-info">
            <input
              type="name"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly
            />
            <input
              type="cpf"
              id="cpf"
              name="cpf"
              value={formatCPF(cpf)}
              onChange={(e) => setCpf(e.target.value)}
              readOnly
            />
            <input
              type="age"
              id="age"
              name="age"
              value={`${age} anos`}
              onChange={(e) => setAge(parseInt(e.target.value))}
              style={{ width: "33%", marginRight: "2%" }}
              readOnly
              required
            />
            <input
              id="number"
              name="number"
              value={formatPhone(phone)}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: "55%" }}
              required
            />
            {role === "DONOR" &&  (user as Donor).bloodType !== "Não sei" && (
              <input
                id="bloodType"
                name="bloodType"
                value={`Tipo sanguíneo: ${bloodType}`}
                onChange={(e) => setEmail(e.target.value)}
                readOnly
                required
              />
            )}
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly
              required
            />
            <input
              type="address"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
