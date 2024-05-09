import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "./Register.css";

const Register = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [cpf, setCpf] = useState("");
  const [bloodType, setBloodType] = useState("");
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };

  const whatGender = () => {
    if (gender === "M") {
      setGender("Masculino");
    }
    setGender("Feminino");
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    whatGender();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('cpf', cpf);
    formData.append('email', email);
    formData.append('age', calculateAge(dateOfBirth).toString());
    formData.append('gender', gender);
    formData.append('maritalStatus', maritalStatus);
    formData.append('address', `${address},${addressNumber}`);
    formData.append('phone', phone);
    formData.append('photo', 'sem');
    formData.append('password', password);
    formData.append('bloodType', bloodType);

    if(selectedFile){
      formData.append('file', selectedFile);
    }else{
      const emptyBlob = new Blob([], { type: 'application/octet-stream' });
      const emptyFile = new File([emptyBlob], 'empty-file.txt', { type: 'text/plain' });
      formData.append('file', emptyFile);
    }

    auth.register(formData);
    navigate("/");
  };

  return (
    <div className="register-container">
      <img src="Logo.png"></img>
      <span style={{ color: "#035e89" }}>Cadastre-se e salve vidas.</span>
      <form onSubmit={handleRegister} encType="multipart/form-data" style={{ width: "100%" }}>
        <div className="form-register">
          <div className="form-row">
            <label htmlFor="name">Nome Completo:</label>
            <input
              type="text"
              id="name"
              name="name"
              pattern="\S.*"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="dateOfBirth">Data de Nascimento:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="phone">Telefone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="maritalStatus">Estado Civil:</label>
            <select
              id="maritalStatus"
              name="maritalStatus"
              onChange={(e) => setMaritalStatus(e.target.value)}
              required
            >
              <option value="C">Casado</option>
              <option value="S">Solteiro</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div className="form-row">
            <label>Sexo:</label>
            <div className="gender">
              <input
                type="radio"
                id="sexoM"
                name="gender"
                value="M"
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label htmlFor="sexoM">M</label>
              <input
                type="radio"
                id="sexoF"
                name="gender"
                value="F"
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label htmlFor="sexoF">F</label>
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              pattern="\S.*"
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="bloodType">Tipo sanguíneo:</label>
            <select
              id="bloodType"
              name="bloodType"
              onChange={(e) => setBloodType(e.target.value)}
              required
            >
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
          <div className="form-row">
            <label htmlFor="address">Endereço:</label>
            <input
              type="text"
              id="address"
              name="address"
              pattern="\S.*"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="addressNumber">Número:</label>
            <input
              type="text"
              id="addressNumber"
              name="addressNumber"
              pattern="\S.*"
              onChange={(e) => setAddressNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label>Foto:</label>
            <input type="file" accept="image/" onChange={handleFileChange} />
          </div>
          <div className="form-row">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              pattern="\S.*"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">Cadastrar</button>
        <p className="signup-link" style={{ marginBottom: "1.7%" }}>
          Já tem uma conta? <Link to="/login">Conecte-se</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
