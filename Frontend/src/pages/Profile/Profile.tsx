import NavbarDoctor from "../../components/NavbarDoctor/NavbarDoctor";
import NavbarDonor from "../../components/NavbarDonor/NavbarDonor";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Doctor } from "../../types/Doctor";
import { Donor } from "../../types/Donor";
import Footer from "../../components/Footer/Footer";
import { CiSaveDown1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = useContext(AuthContext);
  const user: Donor | Doctor =
    auth.user!.role === "DONOR"
      ? (auth.user! as Donor)
      : (auth.user! as Doctor);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [crm, setCrm] = useState("");
  const [bloodType, setBloodType] = useState("");
  const role = user.role;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === "DONOR") {
          setBloodType((user as Donor).bloodType!);
        } else if (role === "DOCTOR") {
          setCrm((user as Doctor).crm!);
        }
        setAge(user!.age!);
        setName(user!.name!);
        setPhone(user!.phone!);
        setEmail(user!.email!);
        setAddress(user!.address!);

        if (user!.photo !== "sem" && user!.photo !== null) {
          const response = await fetch(
            `https://vital-hero.onrender.com/donor/img/${user!.photo}`
          );
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setPhotoURL(imageUrl);
        } else {
          setPhotoURL("Logo.png");
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, [auth]);

  const inputStyle =
    "w-[90%] p-2 rounded-md text-[#333333] border border-black-100 mb-[3%] text-center text-[1em] focus:outline-none";

  const handleAtt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    user!.phone = phone;
    user!.address = address;

    await auth.updateDonor(user! as Donor);
    window.location.reload();
  };

  const formatPhone = (phone: string) => {
    phone = phone
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
    return phone;
  };

  return (
    <div className="flex flex-col items-center m-0">
      {role === "DOCTOR" ? <NavbarDoctor /> : <NavbarDonor />}
      <div className="flex flex-col items-center justify-center min-h-[84vh] w-[86%] text-[0.9em] md:w-full md:text-base">
        {photoURL === "Logo.png" ? (
          <img
            className="w-[75px] mb-[1%] md:w-[100px]"
            src={photoURL}
            alt="Foto do usuário"
          />
        ) : (
          <img
            className="w-[75px] mb-[3%] md:w-[100px]"
            src={photoURL}
            alt="Foto do usuário"
          />
        )}
        <form className="text-center w-full max-w-[400px]" onSubmit={handleAtt}>
          <div>
            <input
              className={inputStyle}
              type="name"
              id="name"
              name="name"
              value={name}
              readOnly
            />
            <input
              className="w-[33%] mr-[2%] p-2 rounded-md text-[#333333] border border-black-100 mb-[3%] text-center text-[1em] focus:outline-none"
              type="age"
              id="age"
              name="age"
              value={`${age} anos`}
              onChange={(e) => setAge(parseInt(e.target.value))}
              readOnly
              required
            />
            <input
              className="w-[55%] p-2 rounded-md text-[#333333] border border-black-100 mb-[3%] text-center text-[1em] focus:outline-none"
              id="number"
              name="number"
              value={formatPhone(phone)}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {role === "DONOR" && (user as Donor).bloodType !== "Não sei" && (
              <input
                className={inputStyle}
                id="bloodType"
                name="bloodType"
                value={`Tipo sanguíneo: ${bloodType}`}
                readOnly
                required
              />
            )}
            <input
              className={inputStyle}
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly
              required
            />
            <input
              className={inputStyle}
              type="address"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {role === "DOCTOR" && (
              <input
                className={inputStyle}
                type="professionalIdCard"
                id="professionalIdCard"
                name="professionalIdCard"
                value={crm}
                readOnly
              />
            )}
            <button className="w-[40%] rounded-md text-center focus:outline-none hover:text-[#b80e14]"
            onClick={() => navigate("/change-password")}>
              Alterar senha
            </button>
          </div>
          <button
            className="shadow-custom5 hover:bg-[#b80e14] rounded-lg w-[25%] text-black hover:text-white p-[8px] border-none cursor-pointer mt-3 md:mt-8 mb-5 md:w-[22%]"
            type="submit"
          >
            <span className="flex items-center justify-center">Salvar<CiSaveDown1 className="ml-2" size={20} /></span>
          </button>
        </form>
      </div>
      <div className="bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
