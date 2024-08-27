import { Screening as ScreeningType } from "../../../types/Screening";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../../components/NavbarDonor/NavbarDonor";
import { Donor } from "../../../types/Donor";
import { useNavigate } from "react-router-dom";

const Screening = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as Donor;
  const navigate = useNavigate();
  const screenings = JSON.parse(
    localStorage.getItem("screenings") ?? "[]"
  ) as ScreeningType[];

  const formRow =
    "flex flex-col justify-center mx-[2.5%] w-[80%] md:w-[35%] lg:w-[22.3%]";
  const labelStyle = "mb-[1%] text-start text-[1.1em]";
  const selectStyle =
    "text-[#333333] w-full p-2 rounded-md bg-[#00000015]" +
    " mb-[5%] text-[1em] focus:outline-none";

  const [q1, setQ1] = useState(screenings[0]?.q1);
  const [q2, setQ2] = useState(screenings[0]?.q2);
  const [q3, setQ3] = useState(screenings[0]?.q3);
  const [q4, setQ4] = useState(screenings[0]?.q4);
  const [q5, setQ5] = useState(screenings[0]?.q5);
  const [q6, setQ6] = useState(screenings[0]?.q6);
  const [q7, setQ7] = useState(screenings[0]?.q7);
  const [q8, setQ8] = useState(screenings[0]?.q8);
  const [q9, setQ9] = useState(screenings[0]?.q9);
  const [q10, setQ10] = useState(screenings[0]?.q10);
  const [q11, setQ11] = useState(screenings[0]?.q11);
  const [q12, setQ12] = useState(screenings[0]?.q12);
  const [q13, setQ13] = useState(screenings[0]?.q13);
  const [q14, setQ14] = useState(screenings[0]?.q14);
  const [q15, setQ15] = useState(screenings[0]?.q15);
  const [q16, setQ16] = useState(screenings[0]?.q16);
  const [q17, setQ17] = useState(screenings[0]?.q17);
  const [q18, setQ18] = useState(screenings[0]?.q18);
  const [q19, setQ19] = useState(screenings[0]?.q19);
  const [q20, setQ20] = useState(screenings[0]?.q20);
  const [q21, setQ21] = useState(screenings[0]?.q21);
  const [q22, setQ22] = useState(screenings[0]?.q22);
  const [q23, setQ23] = useState(screenings[0]?.q23);
  const [q24, setQ24] = useState(screenings[0]?.q24);
  const donorid: Donor = { id: auth.user!.id! };

  useEffect(() => {
    const fetchData = async () => {
      //console.log(screenings);
    };
    fetchData();
  }, []);

  const handleAddScreening = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.gender === "M") {
      setQ13("Não é mulher");
    }

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
      q13: user.gender === "M" ? "Não é mulher" : q13,
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

  const handleAttScreening = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateScreening = {
      id: screenings[0].id,
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
      q13: q13,
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

    await auth.updateScreening(updateScreening);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full text-center">
      <Navbar />
      <div className="flex flex-col w-full items-center justify-center mt-[3%]">
        {screenings.length !== 0 ? (
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-[40%] m-0 mb-[5%] mt-[2%] md:w-[25%]">
              <div className="w-[40%]">
                <img className="w-full" src="triagem-de-saude.png"></img>
              </div>
              <div className="w-[60%]">
                <span className="text-[1em] md:text-[1.2em]">
                  Informações abaixo da sua última triagem.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-[40%] m-0 mb-[5%] mt-[2%] md:w-[25%]">
              <div className="w-[40%]">
                <img className="w-full" src="triagem-de-saude.png"></img>
              </div>
              <div className="w-[60%]">
                <span className="text-[1em] md:text-[1.2em]">
                  Preencha as informações abaixo.
                </span>
              </div>
            </div>
          </div>
        )}
        {screenings.length !== 0 ? (
          <div>
            <span className="flex justify-center mb-6 text-[#035e89] text-2xl md:text-4xl">
              Triagem
            </span>
            <form
              className="flex flex-col items-center justify-center p-[2%] md:mb-[2%]"
              onSubmit={handleAttScreening}
            >
              <div className="flex flex-wrap items-center justify-center">
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
                    <option>{q1}</option>
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
                    <option>{q2}</option>
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
                    <option>{q3}</option>
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
                    <option>{q4}</option>
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
                    <option>{q5}</option>
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
                    <option>{q6}</option>
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
                    <option>{q7}</option>
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
                    <option>{q8}</option>
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
                    <option>{q9}</option>
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
                    <option>{q10}</option>
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
                    <option>{q11}</option>
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
                    <option>{q12}</option>
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </div>
                {user.gender === "F" && (
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
                      <option>{q13}</option>
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
                    <option>{q14}</option>
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
                    <option>{q15}</option>
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
                    <option>{q16}</option>
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
                    <option>{q17}</option>
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
                    <option>{q18}</option>
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
                    <option>{q19}</option>
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </div>
                <div className={formRow}>
                  <label className={labelStyle} htmlFor="q20">
                    Já teve uma doença autoimune, como lúpus ou artrite
                    reumatoide?
                  </label>
                  <select
                    className={selectStyle}
                    id="q20"
                    name="q20"
                    required
                    onChange={(e) => setQ20(e.target.value)}
                  >
                    <option>{q20}</option>
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
                    <option>{q21}</option>
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </div>
                <div className={formRow}>
                  <label className={labelStyle} htmlFor="q22">
                    Já teve um distúrbio de coagulação do sangue, como
                    hemofilia?
                  </label>
                  <select
                    className={selectStyle}
                    id="q22"
                    name="q22"
                    required
                    onChange={(e) => setQ22(e.target.value)}
                  >
                    <option>{q22}</option>
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
                    <option>{q23}</option>
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </div>
                <div className={formRow}>
                  <label className={labelStyle} htmlFor="q24">
                    Já recebeu uma vacinação nas últimas quatro semanas?
                  </label>
                  <select
                    className={selectStyle}
                    id="q24"
                    name="q24"
                    required
                    onChange={(e) => setQ24(e.target.value)}
                  >
                    <option>{q24}</option>
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </div>
              </div>
              <button
                className="bg-[#b80e14] rounded-md text-white p-[10px] border border-none cursor-pointer mt-[3%] mb-[4%] w-[25%] md:w-[10%] md:mb-0 hover:bg-[#eb1118af]"
                type="submit"
              >
                Atualizar
              </button>
            </form>
          </div>
        ) : (
          <div>
            <span className="flex justify-center mb-6 text-[#035e89] text-2xl md:text-4xl">
              Triagem
            </span>
            <form
              className="flex flex-col items-center justify-center p-[2%] md:mb-[2%]"
              onSubmit={handleAddScreening}
            >
              <div className="flex flex-wrap items-center justify-center">
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
                    <option>{q1}</option>
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
                    <option>{q2}</option>
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
                    <option>{q3}</option>
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
                    <option>{q4}</option>
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
                    <option>{q5}</option>
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
                {user.gender === "F" && (
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
                    Tem alguma doença autoimune, como lúpus ou artrite
                    reumatoide?
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
                    Já teve um distúrbio de coagulação do sangue, como
                    hemofilia?
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
                className="bg-[#b80e14] rounded-md text-white p-[10px] border border-none cursor-pointer mt-[3%] mb-[4%] w-[25%] md:w-[10%] md:mb-0 hover:bg-[#eb1118af]"
                type="submit"
              >
                Salvar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Screening;
