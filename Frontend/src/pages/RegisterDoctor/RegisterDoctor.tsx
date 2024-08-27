import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ErrorType } from "../../types/ErrorType";

const RegisterDoctor = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [cpf, setCpf] = useState("");
  const [professionalIdCard, setProfessionalIdCard] = useState("");
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
  "flex flex-col justify-center mx-[2.5%] w-[80%] md:w-[35%] lg:w-[22.3%] text-start";
  const labelStyle = "mb-[1%] text-start text-[1.1em]";
  const selectStyle =
    "text-[#333333] w-[99%] p-2 rounded-md bg-[#00000015]" +
    " mb-[5%] text-[1em] focus:outline-none";
  const inputStyle =
    "w-full p-2 rounded-md text-[#333333] bg-[#00000015] mb-[5%] text-[1em] focus:outline-none";

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

    const formData = new FormData();
    formData.append('name', name);
    formData.append('cpf', cpf);
    formData.append('crm', professionalIdCard);
    formData.append('email', email);
    formData.append('age', calculateAge(dateOfBirth).toString());
    formData.append('gender', gender);
    formData.append('maritalStatus', maritalStatus);
    formData.append('address', `${address},${addressNumber}`);
    formData.append('phone', phone);
    formData.append('photo', 'sem');
    formData.append('password', password);

    if(selectedFile){
      formData.append('file', selectedFile);
    }else{
      const emptyBlob = new Blob([], { type: 'application/octet-stream' });
      const emptyFile = new File([emptyBlob], 'empty-file.txt', { type: 'text/plain' });
      formData.append('file', emptyFile);
    }

    try {
      const response = await auth.registerDoctor(formData);
      if(response.id !== undefined){
          navigate("/");
      }
    } catch (error) {
        alert((error as ErrorType).detail);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[95vh]">
      <img className="mt-[3%] w-[70px] md:w-[100px]" src="Logo.png"></img>
      <span className="text-[#035e89] text-2xl md:text-4xl">Cadastre-se e ajude na causa</span>
      <form className="w-full text-center mt-[8%] md:mt-[3%]" onSubmit={handleRegister} encType="multipart/form-data" style={{ width: "100%" }}>
        <div className="flex flex-wrap items-center justify-center">
          <div className={formRow}>
            <label className={labelStyle} htmlFor="name">Nome completo:</label>
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
            <label className={labelStyle} htmlFor="email">Email:</label>
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
            <label className={labelStyle} htmlFor="dateOfBirth">Data de nascimento:</label>
            <input
              className={inputStyle}
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="phone">Telefone:</label>
            <input
              className={inputStyle}
              type="tel"
              id="phone"
              name="phone"
              placeholder="8199546165"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="maritalStatus">Estado civil:</label>
            <select
              className={selectStyle}
              id="maritalStatus"
              name="maritalStatus"
              onChange={(e) => setMaritalStatus(e.target.value)}
              required
            >
              <option value="S">Solteiro</option>
              <option value="C">Casado</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div className={formRow}>
            <label className={labelStyle}>Sexo:</label>
            <div className="flex w-[80%]">
              <input
                className={inputStyle}
                type="radio"
                id="sexoM"
                name="gender"
                value="M"
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label className={labelStyle} htmlFor="sexoM">M</label>
              <input
                className={inputStyle}
                type="radio"
                id="sexoF"
                name="gender"
                value="F"
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label className={labelStyle} htmlFor="sexoF">F</label>
            </div>
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="cpf">CPF:</label>
            <input
              className={inputStyle}
              type="text"
              id="cpf"
              name="cpf"
              placeholder="11111111111"
              pattern="\S.*"
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="professionalIdCard">Identificação Profissional (CRM/COREN):</label>
            <input
              className={inputStyle}
              type="text"
              id="professionalIdCard"
              name="professionalIdCard"
              pattern="\S.*"
              onChange={(e) => setProfessionalIdCard(e.target.value)}
              required
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="address">Endereço:</label>
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
            <label className={labelStyle} htmlFor="addressNumber">Número:</label>
            <input
              className={inputStyle}
              type="text"
              id="addressNumber"
              name="addressNumber"
              placeholder="Número da sua residência"
              pattern="\S.*"
              onChange={(e) => setAddressNumber(e.target.value)}
              required
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle}>Foto:</label>
            <input
              className={inputStyle} type="file" accept="image/" onChange={handleFileChange} />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="password">Senha:</label>
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
          className="bg-[#b80e14] rounded-lg w-[23%] text-white p-[8px] border-none cursor-pointer mt-5 mb-5 hover:bg-[#b80e14a4] lg:w-[10%] md:w-[12%]" 
          type="submit">Cadastrar</button>
        <p className="mb-5">
          Já tem uma conta? <Link className="text-[#b80e14] hover:text-[#b80e14a4]" to="/login">Conecte-se</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterDoctor;
