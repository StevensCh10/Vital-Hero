import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ErrorType } from "../../types/ErrorType";
import Footer from "../../components/Footer/Footer";
import {
  calculateMaxDate,
  calculateMinDate,
  handleCpfChange,
  handlePhoneChange,
  validateCPF,
} from "../../utils/functions";
import { CiSaveDown1 } from "react-icons/ci";

const Register = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("C");
  const [gender, setGender] = useState("");
  const [cpf, setCpf] = useState("");
  const [bloodType, setBloodType] = useState("A+");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    } else {
      return age;
    }
  };

  const formRow =
    "flex justify-center w-[90%] text-sm md:text-base";
  const labelStyle = "w-[25%] text-end mr-8 p-2";
  const selectStyle =
    "flex text-[#333333] w-[60%] md:w-full p-2 rounded-md border border-black-100" +
    " mb-[4%] focus:outline-none";
  const inputStyle =
    "w-[60%] md:w-full p-2 rounded-md text-[#333333] border border-black-100 mb-[4%] focus:outline-none";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!actCpf(cpf)){
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("cpf", cpf);
    formData.append("email", email);
    formData.append("age", calculateAge(dateOfBirth).toString());
    formData.append("gender", gender);
    formData.append("maritalStatus", maritalStatus);
    formData.append("address", `${address},${addressNumber}`);
    formData.append("phone", phone);
    formData.append("photo", "sem");
    formData.append("password", password);
    formData.append("bloodType", bloodType);

    if (selectedFile) {
      formData.append("file", selectedFile);
    } else {
      const emptyBlob = new Blob([], { type: "application/octet-stream" });
      const emptyFile = new File([emptyBlob], "empty-file.txt", {
        type: "text/plain",
      });
      formData.append("file", emptyFile);
    }

    await auth
      .register(formData)
      .then(() => navigate("/"))
      .catch((e) => {
        alert((e as ErrorType).detail);
      });
  };

  const minDate = calculateMinDate(69);
  const maxDate = calculateMaxDate(18);

  const actCpf = (cpf: string) => {
    if (validateCPF(cpf)) {
      setCpf(cpf);
      return true;
    }
    alert("Cpf inálido");
    return false;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img className="my-[3%] w-[70px] md:w-[80px]" src="Logo.png"></img>
      <div className="flex items-center w-[80%] h-[8vh]"
      style={{ background: 'linear-gradient(to right, #49052E, #b80e14)' }}>
        <span className="text-white ml-[4%] text-md md:text-xl">
          Cadastro de usuário
        </span>
      </div>
      <form
        className="flex flex-col items-center justify-center rounded-md w-[82%] py-[4%] mb-[10%] md:mb-[5%] shadow-custom4"
        onSubmit={handleRegister}
        encType="multipart/form-data"
      >
        <div className="flex flex-wrap items-center justify-center">
          <div className={formRow}>
            <label className={labelStyle} htmlFor="name">
              Nome completo
            </label>
            <input
              className={inputStyle}
              type="text"
              id="name"
              name="name"
              placeholder="Nome completo"
              pattern="\S.*"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="email">
              Email
            </label>
            <input
              className={inputStyle}
              type="email"
              id="email"
              name="email"
              placeholder="exemplo@hotmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="dateOfBirth">
              Data de nascimento
            </label>
            <input
              className={inputStyle}
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={(e) => setDateOfBirth(e.target.value)}
              min={minDate}
              max={maxDate}
              required
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="phone">
              Telefone
            </label>
            <input
              className={inputStyle}
              type="tel"
              id="phone"
              name="phone"
              placeholder="(81) 9 9954-6165"
              onChange={(e) => {
                  var value = handlePhoneChange(e);
                  setPhone(value as string);
                }
              }
              maxLength={16}
              required
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="maritalStatus">
              Estado civil
            </label>
            <select
              className={selectStyle}
              id="maritalStatus"
              name="maritalStatus"
              onChange={(e) => setMaritalStatus(e.target.value)}
              required
            >
              <option  disabled selected>Selecione seu estado civil</option>
              <option value="Solteiro">Solteiro</option>
              <option value="Casado">Casado</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="gender">
              Sexo
            </label>
            <select
              className={selectStyle}
              id="gender"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option  disabled selected>Selecione seu sexo de nascença</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="cpf">
              CPF
            </label>
            <input
              className={inputStyle}
              type="text"
              id="cpf"
              name="cpf"
              placeholder="12365415873"
              onChange={(e) => {
                  var value = handleCpfChange(e);
                  setCpf(value as string);
                }
              }
              maxLength={14}
              required
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="bloodType">
              Tipo sanguíneo
            </label>
            <select
              className={selectStyle}
              id="bloodType"
              name="bloodType"
              onChange={(e) => setBloodType(e.target.value)}
              required
            >
              <option  disabled selected>Selecione seu tipo sanguíneo</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="dontKnow">Não sei</option>
            </select>
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="address">
              Endereço
            </label>
            <input
              className={inputStyle}
              type="text"
              id="address"
              name="address"
              placeholder="Nome da rua"
              pattern="\S.*"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="addressNumber">
              Número
            </label>
            <input
              className={inputStyle}
              type="text"
              id="addressNumber"
              name="addressNumber"
              placeholder="Número da sua residência"
              pattern="\S.*"
              onChange={(e) => setAddressNumber(e.target.value)}
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle}>Foto</label>
            <input
              className={inputStyle}
              type="file"
              accept="image/"
              onChange={handleFileChange}
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="password">
              Senha
            </label>
            <input
              className={inputStyle}
              type="password"
              id="password"
              name="password"
              placeholder="Sua senha"
              pattern="\S.*"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
        className="shadow-custom5 hover:bg-[#b80e14] rounded-lg w-[36%] text-black hover:text-white p-[8px] border-none cursor-pointer mt-3 mb-8 md:w-[12%]"
        type="submit"
        >
          <span className="flex items-center justify-center text-sm md:text-lg">Cadastrar<CiSaveDown1 className="ml-2" size={20} /></span>
        </button>
        <p>
          Já tem uma conta? {" "}
          <Link className="text-[#b80e14] hover:text-[#b80e14a4]" to="/login">
            Conecte-se
          </Link>
        </p>
      </form>
      <div className="fixed bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Register;
