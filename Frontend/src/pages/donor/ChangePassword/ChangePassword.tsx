import Navbar from "../../../components/NavbarDonor/NavbarDonor";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Donor } from "../../../types/Donor";
import Footer from "../../../components/Footer/Footer";
import { RiLockPasswordLine } from "react-icons/ri";

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
    "w-[40%]";
  const labelStyle = "w-[25%] text-end mr-8 p-2";
  const inputStyle =
    "w-[60%] md:w-full p-2 rounded-md text-[#333333] border border-black-100 mb-[4%] focus:outline-none";

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
      <div className="flex flex-col w-full items-center justify-center mt-[3%] min-h-[87vh] lg:min-h-[89.6vh] xl:min-h-[79vh]">
      <div className="flex items-center w-[80%] h-[8vh]"
          style={{ background: 'linear-gradient(to right, #49052E, #b80e14)' }}>
            <span className="text-white ml-[4%] text-md md:text-xl">
              Alterar senha
            </span>
          </div>
        <form className="flex flex-col items-center justify-center rounded-md w-[82%] py-[4%] mb-[10%] md:mb-[5%] shadow-custom4" onSubmit={handleSubmit}>
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
            className="shadow-custom5 hover:bg-[#b80e14] rounded-lg w-[23%] text-black hover:text-white p-[8px] border-none cursor-pointer mt-3 md:w-[11%]"
            type="submit"
            >
              <span className="flex items-center justify-center">Alterar<RiLockPasswordLine className="ml-2" size={20} /></span>
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
