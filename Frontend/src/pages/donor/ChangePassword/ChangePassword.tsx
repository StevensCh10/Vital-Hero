import Navbar from "../../../components/NavbarDonor/NavbarDonor";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Donor } from "../../../types/Donor";
import Footer from "../../../components/Footer/Footer";

const ChangePassword = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as Donor;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);

  const formRow =
    "flex flex-col justify-center mx-[2.5%] w-[87%] md:w-[35%] lg:w-[25%]";
  const labelStyle = "mb-[1%] text-start text-[1.1em]";
  const inputStyle =
    "w-full p-2 rounded-md text-[#333333] bg-[#00000015] mb-[3%] text-[1em] focus:outline-none";

  useEffect(() => {
    if (newPassword !== "" && confirmPassword !== "") {
      setPasswordsMatch(passwordsMatch) //Só pra dizer que estou usando ele, depois mudar
      setPasswordsMatch(newPassword === confirmPassword);
    }
  }, [newPassword, confirmPassword]);

  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
  };

  const handleChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPasswordRef.current!.value !== confirmPasswordRef.current!.value) {
      confirmPasswordRef.current!.focus();
    } else {
      await auth.updateDonor(user!).then(() => window.location.reload());
      setPasswordChanged(true);
      setNewPassword("");
      setConfirmPassword("");
      setOldPassword("");
    }
  };

  return (
    <div className="flex flex-col items-center m-0">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[84.1vh] w-[86%] text-[0.9em] md:w-full md:text-base">
        <span className="text-[#035e89] text-2xl md:text-4xl">
          Alterar Senha
        </span>
        <form className="flex flex-col items-center justify-center w-full text-center mt-[8%] md:mt-[3%]" onSubmit={handleSubmit}>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="oldPassword">Senha Atual:</label>
            <input
              className={inputStyle}
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={handleChangeOldPassword}
              ref={oldPasswordRef}
              required
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="newPassword">Nova Senha:</label>
            <input
              className={inputStyle}
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleChangeNewPassword}
              required
              ref={newPasswordRef}
            />
          </div>
          <div className={formRow}>
            <label className={labelStyle} htmlFor="confirmPassword">Confirmar Nova Senha:</label>
            <input
              className={inputStyle}
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              required
              ref={confirmPasswordRef}
            />
          </div>
          <button 
            className="bg-[#b80e14] rounded-lg w-[35%] text-white p-[8px] border-none cursor-pointer mt-3 mb-5 hover:bg-[#b80e14a4] md:w-[20%] lg:w-[10%]" 
            type="submit"
          >
            Alterar Senha
          </button>
          {passwordChanged && <p>Senha alterada com sucesso!</p>}
        </form>
      </div>
      <div className="bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default ChangePassword;
