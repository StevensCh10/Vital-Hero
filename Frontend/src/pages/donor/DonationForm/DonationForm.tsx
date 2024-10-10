import { useContext, useEffect, useState } from "react";
import Navbar from "../../../components/NavbarDonor/NavbarDonor";
import { DonationForm as DonationFormType } from "../../../types/DonationForm";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { Donor } from "../../../types/Donor";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "../../../types/ErrorType";
import Footer from "../../../components/Footer/Footer";
import { calculateMaxDate, calculateMinDate } from "../../../utils/functions";
import { CiSaveDown1 } from "react-icons/ci";
import { GiConfirmed } from "react-icons/gi";

const DonationForm = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const donationFormAux = JSON.parse(
    localStorage.getItem("donationForm")! ?? {}
  ) as DonationFormType;

  const formRow =
    "flex justify-center w-[90%]";
  const labelStyle = "w-[25%] text-end mr-8 p-2";
  const selectStyle =
    "flex text-[#333333] w-[60%] md:w-full p-2 rounded-md border border-black-100" +
    " mb-[4%] focus:outline-none";
  const inputStyle =
    "w-[60%] md:w-full p-2 rounded-md text-[#333333] border border-black-100 mb-[4%] focus:outline-none";

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
    <div className="flex flex-col items-center justify-center min-h-screen text-sm md:text-lg"> 
      <Navbar />
      {donationFormAux === null ? (
        <div className="flex flex-col w-full items-center justify-center mt-[3%] min-h-[87vh] lg:min-h-[89.6vh] xl:min-h-[79vh]">
          <div className="flex items-center w-[80%] h-[8vh]"
          style={{ background: 'linear-gradient(to right, #49052E, #b80e14)' }}>
            <span className="text-white ml-[4%] text-md md:text-xl">
              Formulário de doação
            </span>
          </div>
          <form
            className="flex flex-col items-center justify-center rounded-md w-[82%] py-[4%] mb-[10%] md:mb-[5%] shadow-custom4"
            onSubmit={handleAddDonationForm}
          >
            <div className="flex flex-wrap items-center justify-center">
              <div className={formRow}>
                <label className={labelStyle} htmlFor="fatherName">
                  Nome do Pai
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
                  Nome da Mãe
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
                  Contato de emergência
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
                  Naturalidade
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
                  Número do RG
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
                  Orgão Expedidor
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
                  Data de expedição
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
                  Escolaridade
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
                  Profissão
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
                  Trabalho atual
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
                  Nome do Pai
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
                  Nome da Mãe
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
                  Contato de emergência
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
                  Naturalidade
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
                  Número do RG
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
                  Orgão Expedidor
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
                  Data de expedição
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
                  Escolaridade
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
                  Profissão
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
                  Trabalho atual
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
                className="hover:bg-black shadow-custom5 text-black rounded-lg pointer-events-none mt-[4%] text-[1em] w-[20%] p-[6px] md:p-[10px] 
                  md:text-base md:w-[15%] lg:w-[10%]"
              >
                <span className="flex items-center justify-center opacity-60">Atualizar <CiSaveDown1 className="ml-2" size={20} /></span>
              </button>
              <button
              className="shadow-custom5 hover:bg-[#b80e14] rounded-lg w-[23%] text-black hover:text-white p-[8px] border-none cursor-pointer mt-3 mb-5 md:w-[10%]"
              type="submit"
              >
                <span className="flex items-center justify-center">Confirmar<GiConfirmed className="ml-2" size={20} /></span>
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
