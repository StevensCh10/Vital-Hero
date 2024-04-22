import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import "./Profile.css";
import Navbar from "../../components/NavbarDonor/NavbarDonor";

const Profile = () => {
  const auth = useContext(AuthContext);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [age, setAge] = useState(0);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setName(auth.user!.name!);
        setCpf(auth.user!.cpf!);
        setAge(auth.user!.age!);
        setPhone(auth.user!.phone!);
        setEmail(auth.user!.email!);
        setAddress(auth.user!.address!);

        const response = await fetch(`http://localhost:8080/donor/img/${auth.user!.photo}`);
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setPhotoURL(imageUrl);
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, [auth]);

  const handleAtt = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    auth.user!.phone = phone;
    auth.user!.address = address;

    await auth.updateDonor(auth.user!);
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
      <Navbar />
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-image">
            {/* Substitua a imagem pelo avatar do usuário */}
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
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              style={{ width: "15%", marginRight: "20%" }}
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
