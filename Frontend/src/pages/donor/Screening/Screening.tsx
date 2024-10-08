import { Screening as ScreeningType } from "../../../types/Screening";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useContext, useState } from "react";
import Navbar from "../../../components/NavbarDonor/NavbarDonor";
import { Donor } from "../../../types/Donor";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import { CiSaveDown1 } from "react-icons/ci";

const Screening = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as Donor;
  const navigate = useNavigate();

  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [q6, setQ6] = useState("");
  const [q7, setQ7] = useState("");
  const [q8, setQ8] = useState("");
  const [q9, setQ9] = useState("");
  const [q10, setQ10] = useState("");
  const [q11, setQ11] = useState("");
  const [q12, setQ12] = useState("");
  const [q13, setQ13] = useState("Não é mulher");
  const [q14, setQ14] = useState("");
  const [q15, setQ15] = useState("");
  const [q16, setQ16] = useState("");
  const [q17, setQ17] = useState("");
  const [q18, setQ18] = useState("");
  const [q19, setQ19] = useState("");
  const [q20, setQ20] = useState("");
  const [q21, setQ21] = useState("");
  const [q22, setQ22] = useState("");
  const [q23, setQ23] = useState("");
  const [q24, setQ24] = useState("");
  const donorid: Donor = { id: auth.user!.id! };

  const handleAddScreening = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const screening: ScreeningType = {
      donor: donorid,
      doctor: null,
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
      q5: q5,
      q6: q6,
      q7: q7,
      q8: q8,
      q9: q9,
      q10: q10,
      q11: q11,
      q12: q12,
      q13: user.gender === "Masculino" ? "Não é mulher" : q13,
      q14: q14,
      q15: q15,
      q16: q16,
      q17: q17,
      q18: q18,
      q19: q19,
      q20: q20,
      q21: q21,
      q22: q22,
      q23: q23,
      q24: q24,
    };

    await auth.addScreening(screening);
    navigate("/scheduling-donation");
  };

  const formRow =
    "flex flex-col justify-center items-center w-[90%]";
  const labelStyle = "w-[100%] text-center mr-8 p-2";
  const selectStyle =
    "flex text-[#333333] w-[90%] md:w-full p-2 rounded-md border border-black-100" +
    " mb-[4%] focus:outline-none";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-sm md:text-lg"> 
      <Navbar />
      <div className="flex flex-col w-full items-center justify-center mt-[3%]">
          <div className="flex items-center w-[80%] h-[8vh]"
          style={{ background: 'linear-gradient(to right, #49052E, #b80e14)' }}>
            <span className="text-white ml-[4%] text-md md:text-xl">
              Triagem
            </span>
          </div>
          <form
            className="flex flex-col items-center justify-center rounded-md w-[82%] py-[4%] mb-[10%] md:mb-[5%] shadow-custom4"
            onSubmit={handleAddScreening}
          >
            <div className="flex flex-col items-center justify-center w-full">
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q1">
                  Foi operado recentemente?
                </label>
                <select
                  className={selectStyle}
                  id="q1"
                  name="q1"
                  required
                  onChange={(e) => setQ1(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q2">
                  Teve reação alérgica recentemente?
                </label>
                <select
                  className={selectStyle}
                  id="q2"
                  name="q2"
                  required
                  onChange={(e) => setQ2(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q3">
                  Foi vacinado recentemente?
                </label>
                <select
                  className={selectStyle}
                  id="q3"
                  name="q3"
                  required
                  onChange={(e) => setQ3(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q4">
                  Teve convulsões recentemente?
                </label>
                <select
                  className={selectStyle}
                  id="q4"
                  name="q4"
                  required
                  onChange={(e) => setQ4(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q5">
                  Pesa mais que 50kg?
                </label>
                <select
                  className={selectStyle}
                  id="q5"
                  name="q5"
                  required
                  onChange={(e) => setQ5(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q6">
                  Teve febre nas últimas duas semanas?
                </label>
                <select
                  className={selectStyle}
                  id="q6"
                  name="q6"
                  required
                  onChange={(e) => setQ6(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q7">
                  Teve algum resfriado ou sintomas de gripe recentemente?
                </label>
                <select
                  className={selectStyle}
                  id="q7"
                  name="q7"
                  required
                  onChange={(e) => setQ7(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q8">
                  Viajou para fora do país nos últimos seis meses?
                </label>
                <select
                  className={selectStyle}
                  id="q8"
                  name="q8"
                  required
                  onChange={(e) => setQ8(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q9">
                  Já teve hepatite?
                </label>
                <select
                  className={selectStyle}
                  id="q9"
                  name="q9"
                  required
                  onChange={(e) => setQ9(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q10">
                  Já teve malária?
                </label>
                <select
                  className={selectStyle}
                  id="q10"
                  name="q10"
                  required
                  onChange={(e) => setQ10(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q11">
                  Já teve câncer?
                </label>
                <select
                  className={selectStyle}
                  id="q11"
                  name="q11"
                  required
                  onChange={(e) => setQ11(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q12">
                  Já teve um ataque cardíaco ou derrame?
                </label>
                <select
                  className={selectStyle}
                  id="q12"
                  name="q12"
                  required
                  onChange={(e) => setQ12(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              {user.gender === "Feminino" && (
                <div className={formRow}>
                  <label className={labelStyle} htmlFor="q13">
                    Está grávida ou amamentando atualmente?
                  </label>
                  <select
                    className={selectStyle}
                    id="q13"
                    name="q13"
                    required
                    onChange={(e) => setQ13(e.target.value)}
                  >
                    <option></option>
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </div>
              )}
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q14">
                  Já teve uma transfusão de sangue nos últimos doze meses?
                </label>
                <select
                  className={selectStyle}
                  id="q14"
                  name="q14"
                  required
                  onChange={(e) => setQ14(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q15">
                  Já teve uma reação alérgica grave a um medicamento?
                </label>
                <select
                  className={selectStyle}
                  id="q15"
                  name="q15"
                  required
                  onChange={(e) => setQ15(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q16">
                  Já foi diagnosticado com HIV ou AIDS?
                </label>
                <select
                  className={selectStyle}
                  id="q16"
                  name="q16"
                  required
                  onChange={(e) => setQ16(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q17">
                  Já teve um diagnóstico de doença sexualmente transmissível
                  (DST)?
                </label>
                <select
                  className={selectStyle}
                  id="q17"
                  name="q17"
                  required
                  onChange={(e) => setQ17(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q18">
                  Já teve tuberculose?
                </label>
                <select
                  className={selectStyle}
                  id="q18"
                  name="q18"
                  required
                  onChange={(e) => setQ18(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q19">
                  Já teve uma convulsão ou epilepsia?
                </label>
                <select
                  className={selectStyle}
                  id="q19"
                  name="q19"
                  required
                  onChange={(e) => setQ19(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q20">
                  Tem alguma doença autoimune, como lúpus ou artrite reumatoide?
                </label>
                <select
                  className={selectStyle}
                  id="q20"
                  name="q20"
                  required
                  onChange={(e) => setQ20(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q21">
                  Já teve um transplante de órgão ou medula óssea?
                </label>
                <select
                  className={selectStyle}
                  id="q21"
                  name="q21"
                  required
                  onChange={(e) => setQ21(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q22">
                  Já teve um distúrbio de coagulação do sangue, como hemofilia?
                </label>
                <select
                  className={selectStyle}
                  id="q22"
                  name="q22"
                  required
                  onChange={(e) => setQ22(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q23">
                  Já usou drogas intravenosas?
                </label>
                <select
                  className={selectStyle}
                  id="q23"
                  name="q23"
                  required
                  onChange={(e) => setQ23(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="q24">
                  Recebeu uma vacinação nas últimas quatro semanas?
                </label>
                <select
                  className={selectStyle}
                  id="q24"
                  name="q24"
                  required
                  onChange={(e) => setQ24(e.target.value)}
                >
                  <option></option>
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>
            </div>
            <button
            className="shadow-custom5 hover:bg-[#b80e14] rounded-lg w-[23%] text-black hover:text-white p-[8px] border-none cursor-pointer mt-3 md:w-[10%]"
            type="submit"
            >
              <span className="flex items-center justify-center">Salvar<CiSaveDown1 className="ml-2" size={20} /></span>
            </button>
          </form>
          <div className="bottom-0">
            <Footer />
          </div>
      </div>
    </div>
  );
};

export default Screening;
