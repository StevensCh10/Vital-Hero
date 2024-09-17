import { useContext, useEffect, useState } from "react";
import Navbar from "../../../components/NavbarDonor/NavbarDonor";
import { DonationForm as DonationFormType } from "../../../types/DonationForm";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { Donor } from "../../../types/Donor";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "../../../types/ErrorType";
import Footer from "../../../components/Footer/Footer";
import { calculateMaxDate, calculateMinDate } from "../../../utils/functions";

const DonationForm = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const donationFormAux = JSON.parse(
    localStorage.getItem("donationForm")! ?? {}
  ) as DonationFormType;

  const formRow =
    "flex flex-col justify-center mx-[2.5%] w-[80%] md:w-[35%] lg:w-[22.3%]";
  const labelStyle = "mb-[1%] text-start text-[1.1em]";
  const selectStyle =
    "text-[#333333] w-full p-2 rounded-md bg-[#00000015]" +
    " mb-[5%] text-[1em] focus:outline-none";
  const inputStyle =
    "w-full p-2 rounded-md text-[#333333] bg-[#00000015] mb-[5%] text-[1em] focus:outline-none";

  const [q1, setQ1] = useState(donationFormAux?.q1);
  const [q2, setQ2] = useState(donationFormAux?.q2);
  const [q3, setQ3] = useState(donationFormAux?.q3);
  const [q4, setQ4] = useState(donationFormAux?.q4);
  const [q5, setQ5] = useState(donationFormAux?.q5);
  const [q6, setQ6] = useState(donationFormAux?.q6);
  const [q7, setQ7] = useState<string>(donationFormAux?.q7);
  const [q8, setQ8] = useState(donationFormAux?.q8);
  const [q9, setQ9] = useState(donationFormAux?.q9);
  const [q10, setQ10] = useState(donationFormAux?.q10);
  const donorid: Donor = { id: auth.user!.id! };

  const [originalValues, setOriginalValues] = useState({
    q3,
    q9,
    q10,
  });
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setOriginalValues({ q3, q9, q10 });
  }, []);

  useEffect(() => {
    if (
      q3 !== originalValues.q3 ||
      q9 !== originalValues.q9 ||
      q10 !== originalValues.q10
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [q3, q9, q10, originalValues]);

  const handleAddDonationForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const donationForm: DonationFormType = {
      donor: donorid,
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
    };

    await auth
      .addDonationForm(donationForm)
      .then(() => navigate("/screening"))
      .catch((e) => alert((e as ErrorType).detail));
  };

  const handleUpdateDonationForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const donationForm: DonationFormType = {
      id: donationFormAux.id,
      donor: donorid,
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
    };

    await auth
      .updateDonationForm(donationForm)
      .then(() => navigate("/screening"))
      .catch((e) => alert((e as ErrorType).detail));
  };

  const minDate = calculateMinDate(64);
  const maxDate = calculateMaxDate(5);

  return (
    <div className="flex flex-col items-center justify-center w-full text-center">
      <Navbar />
      {donationFormAux === null ? (
        <div className="flex flex-col w-full items-center justify-center mt-[3%] min-h-[87vh] lg:min-h-[89.6vh] xl:min-h-[79vh]">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-[40%] m-0 mb-[5%] mt-[2%] md:w-[25%]">
              <div className="w-[40%]">
                <img className="w-full" src="formulario-de-registro.png"></img>
              </div>
              <div className="w-[60%]">
                <span className="text-[1em] md:text-[1.2em]">
                  Preencha as informações abaixo.
                </span>
              </div>
            </div>
          </div>
          <span className="flex justify-center mb-6 text-[#035e89] text-2xl md:text-4xl">
            Formulário de Doação
          </span>
          <form
            className="flex flex-col items-center justify-center p-[2%] md:mb-[2%]"
            onSubmit={handleAddDonationForm}
          >
            <div className="flex flex-wrap items-center justify-center">
              <div className={formRow}>
                <label className={labelStyle} htmlFor="fatherName">
                  Nome do Pai:
                </label>
                <input
                  className={inputStyle}
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  pattern="\S.*"
                  required
                  onChange={(e) => setQ1(e.target.value)}
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="motherName">
                  Nome da Mãe:
                </label>
                <input
                  className={inputStyle}
                  type="text"
                  id="motherName"
                  name="motherName"
                  pattern="\S.*"
                  required
                  onChange={(e) => setQ2(e.target.value)}
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="emergencyPhone">
                  Número para contato de emergência:
                </label>
                <input
                  className={inputStyle}
                  type="text"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  placeholder="Ex: 8199546165"
                  pattern="\S.*"
                  required
                  onChange={(e) => setQ3(e.target.value)}
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="naturalness">
                  Naturalidade:
                </label>
                <select
                  className={selectStyle}
                  id="naturalness"
                  name="naturalness"
                  required
                  onChange={(e) => setQ4(e.target.value)}
                >
                  <option value="">Selecione a naturalidade</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="rgNumber">
                  Número do RG:
                </label>
                <input
                  className={inputStyle}
                  type="text"
                  id="rgNumber"
                  name="rgNumber"
                  pattern="\S.*"
                  min={7}
                  max={9}
                  required
                  onChange={(e) => setQ5(e.target.value)}
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="issuingBody">
                  Orgão Expedidor:
                </label>
                <select
                  className={selectStyle}
                  id="issuingBody"
                  name="issuingBody"
                  onChange={(e) => setQ6(e.target.value)}
                  required
                >
                  <option>Selecione o orgão emissor</option>
                  <option value="SSP">SSP</option>
                  <option value="DETRAN">DETRAN</option>
                  <option value="IFP">IFP</option>
                  <option value="IGP">IGP</option>
                  <option value="PC">PC</option>
                  <option value="SDS">SDS</option>
                  <option value="SEJUSP">SEJUSP</option>
                  <option value="SESP">SESP</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="shippingDate">
                  Data de expedição:
                </label>
                <input
                  className={inputStyle}
                  type="date"
                  id="shippingDate"
                  name="shippingDate"
                  onChange={(e) => setQ7(e.target.value)}
                  min={minDate}
                  max={maxDate}
                  required
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="education">
                  Escolaridade:
                </label>
                <select
                  className={selectStyle}
                  id="education"
                  name="education"
                  required
                  onChange={(e) => setQ8(e.target.value)}
                >
                  <option value="">Selecione a escolaridade</option>
                  <option value="Ensino Médio Completo">
                    Ensino Médio Completo
                  </option>
                  <option value="Ensino Médio Incompleto">
                    Ensino Médio Incompleto
                  </option>
                  <option value="Ensino Superior Completo">
                    Ensino Superior Completo
                  </option>
                  <option value="Ensino Superior Incompleto">
                    Ensino Superior Incompleto
                  </option>
                  <option value="Pós-graduação">Pós-graduação</option>
                  <option value="Mestrado">Mestrado</option>
                  <option value="Doutorado">Doutorado</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="profession">
                  Profissão:
                </label>
                <input
                  className={inputStyle}
                  type="text"
                  id="profession"
                  name="profession"
                  pattern="\S.*"
                  required
                  onChange={(e) => setQ9(e.target.value)}
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="currentJob">
                  Trabalho atual:
                </label>
                <input
                  className={inputStyle}
                  type="text"
                  id="currentJob"
                  name="currentJob"
                  pattern="\S.*"
                  required
                  onChange={(e) => setQ10(e.target.value)}
                />
              </div>
            </div>
            <button
              className="bg-[#b80e14] rounded-md text-white p-[10px] border border-none cursor-pointer mt-[3%] mb-[4%] w-[25%] md:w-[10%] md:mb-0 hover:bg-[#eb1118af]"
              type="submit"
            >
              Salvar
            </button>
          </form>
          <div className="bottom-0">
            <Footer />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center justify-center mt-[3%] min-h-[87vh] lg:min-h-[89.6vh] xl:min-h-[79vh]">
          <span className="flex justify-center mb-6 text-[#035e89] text-2xl md:text-4xl">
            Formulário de Doação
          </span>
          <form
            className="flex flex-col items-center justify-center p-[2%] md:mb-[2%]"
            onSubmit={handleUpdateDonationForm}
          >
            <div className="flex flex-wrap items-center justify-center">
              <div className={formRow}>
                <label className={labelStyle} htmlFor="fatherName">
                  Nome do Pai:
                </label>
                <input
                  className={inputStyle}
                  defaultValue={q1}
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  readOnly
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="motherName">
                  Nome da Mãe:
                </label>
                <input
                  className={inputStyle}
                  defaultValue={q2}
                  type="text"
                  id="motherName"
                  name="motherName"
                  readOnly
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="emergencyPhone">
                  Número para contato de emergência:
                </label>
                <input
                  className={inputStyle}
                  type="text"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  pattern="\S.*"
                  value={q3}
                  required
                  onChange={(e) => setQ3(e.target.value)}
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="naturalness">
                  Naturalidade:
                </label>
                <input
                  className={inputStyle}
                  id="naturalness"
                  defaultValue={q4}
                  name="naturalness"
                  required
                  readOnly
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="rgNumber">
                  Número do RG:
                </label>
                <input
                  className={inputStyle}
                  defaultValue={q5}
                  type="text"
                  id="rgNumber"
                  name="rgNumber"
                  readOnly
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="issuingBody">
                  Orgão Expedidor:
                </label>
                <input
                  className={inputStyle}
                  defaultValue={q6}
                  type="text"
                  id="issuingBody"
                  name="issuingBody"
                  readOnly
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="shippingDate">
                  Data de expedição:
                </label>
                <input
                  className={inputStyle}
                  defaultValue={q6}
                  id="shippingDate"
                  name="shippingDate"
                  required
                  readOnly
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="education">
                  Escolaridade:
                </label>
                <select
                  className={selectStyle}
                  id="education"
                  defaultValue={q8}
                  name="education"
                  required
                >
                  <option value="">Selecione a escolaridade</option>
                  <option value="Ensino Médio Completo">
                    Ensino Médio Completo
                  </option>
                  <option value="Ensino Médio Incompleto">
                    Ensino Médio Incompleto
                  </option>
                  <option value="Ensino Superior Completo">
                    Ensino Superior Completo
                  </option>
                  <option value="Ensino Superior Incompleto">
                    Ensino Superior Incompleto
                  </option>
                  <option value="Pós-graduação">Pós-graduação</option>
                  <option value="Mestrado">Mestrado</option>
                  <option value="Doutorado">Doutorado</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="profession">
                  Profissão:
                </label>
                <input
                  className={inputStyle}
                  defaultValue={q9}
                  type="text"
                  id="profession"
                  name="profession"
                  required
                />
              </div>
              <div className={formRow}>
                <label className={labelStyle} htmlFor="currentJob">
                  Trabalho atual:
                </label>
                <input
                  className={inputStyle}
                  defaultValue={q10}
                  type="text"
                  id="currentJob"
                  name="currentJob"
                  required
                />
              </div>
            </div>
            <div className="flex w-[18%] items-center justify-between mt-[4%]">
              <button
                disabled={!isChanged}
                className={`rounded-md text-white p-[10px] border border-none mt-[3%] 
                  mb-[4%]  w-[25%] md:w-[40%] md:mb-0 ${
                    !isChanged
                      ? "bg-[#b80e1475] pointer-events-none"
                      : "bg-[#b80e14] hover:bg-[#eb1118af] cursor-pointer"
                  }`}
                type="submit"
              >
                Atualizar
              </button>
              <button
                className="bg-[#b80e14] hover:bg-[#eb1118af] cursor-pointer rounded-md text-white p-[10px] border border-none mt-[3%] 
                  mb-[4%] w-[25%] md:w-[42%] md:mb-0"
                type="submit"
                onClick={() => navigate("/screening")}
              >
                Confirmar
              </button>
            </div>
          </form>
          <div className="bottom-0">
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationForm;
