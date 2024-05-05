import { useContext, useState } from "react";
import NavbarDoctor from "../../../components/NavbarDoctor/NavbarDoctor";
import "./ValidateScreening.css";
import { Screening } from "../../../types/Screening";
import { Donor } from "../../../types/Donor";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const ValidateScreening = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [donor, setDonor] = useState<Donor>(
    localStorage.getItem("donor") !== null
      ? JSON.parse(localStorage.getItem("donor")!)
      : null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [screening, setScreening] = useState<Screening>(
    localStorage.getItem("validateScreening") !== null
      ? JSON.parse(localStorage.getItem("validateScreening")!)
      : null
  );

  const handleFit = () => {
    auth.validateScreening(screening.id!, auth.user?.id!);
    localStorage.removeItem("validateScreening");
    localStorage.removeItem("donor");
    navigate("/screenings")
  };

  const handleUnfit = () => {

  };

  const formatMaritalStatus = (status: string) => {
    if (status === "S") {
      return "Solteiro(a)";
    }
    return "Casado(a)";
  };

  return (
    <div className="validate-screening-container">
      <NavbarDoctor />
      <div className="screening-content">
        <span>Validação de Triagem</span>
        <p style={{ fontSize: "1.13em" }}>
          Doador: {donor.name}, {donor.age} anos,{" "}
          {formatMaritalStatus(donor.maritalStatus!)}.
        </p>
        <form>
          <div className="form-screening">
            <div className="form-row">
              <label className="label-screening" htmlFor="q1">
                Já doou sangue? Há quanto tempo? Sentiu-se mal?
              </label>
              <input type="text" id="q1" name="q1" value={screening.q1} readOnly />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q2">
                Tem alergia? A que? Quando foi a ultima crise? Faz tratamento?
                Qual?
              </label>
              <input type="text" id="q2" name="q2" value={screening.q2} readOnly />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q3">
                Já foi operado? Quando? De que? Precisou tomar sangue?
              </label>
              <input type="text" id="q3" name="q3" value={screening.q3} readOnly />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q4">
                Tomou alguma vacina recente? Qual?
              </label>
              <input type="text" id="q4" name="q4" value={screening.q4} readOnly />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q5">
                Tem ou teve convulsões? Quando?
              </label>
              <input type="text" id="q5" name="q5" value={screening.q5} readOnly />
            </div>
            <div className="form-row">
              <label htmlFor="q6">Teve febre nas últimas duas semanas?</label>
              <input id="q6" name="q6" value={screening.q6} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q7">
                Teve algum resfriado ou sintomas de gripe recentemente?
              </label>
              <input id="q7" name="q7" value={screening.q7} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q8">
                Viajou para fora do país nos últimos seis meses?
              </label>
              <input id="q8" name="q8" value={screening.q8} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q9">Já teve hepatite?</label>
              <input id="q9" name="q9" value={screening.q9} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q10">Já teve malária?</label>
              <input id="q10" name="q10" value={screening.q10} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q11">Já teve câncer?</label>
              <input id="q11" name="q11" value={screening.q11} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q12">
                Já teve um ataque cardíaco ou derrame?
              </label>
              <input id="q12" name="q12" value={screening.q12} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q13">
                está grávida ou amamentando atualmente?
              </label>
              <input id="q13" name="q13" value={screening.q13} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q14">
                Já teve uma transfusão de sangue nos últimos doze meses?
              </label>
              <input id="q14" name="q14" value={screening.q14} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q15">
                Já teve uma reação alérgica grave a um medicamento?
              </label>
              <input id="q15" name="q15" value={screening.q15} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q16">Já foi diagnosticado com HIV ou AIDS?</label>
              <input id="q16" name="q16" value={screening.q16} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q17">
                Já teve um diagnóstico de doença sexualmente transmissível
                (DST)?
              </label>
              <input id="q17" name="q17" value={screening.q17} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q18">Já teve tuberculose?</label>
              <input id="q18" name="q18" value={screening.q18} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q19">Já teve uma convulsão ou epilepsia?</label>
              <input id="q19" name="q19" value={screening.q19} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q20">
                Já teve uma doença autoimune, como lúpus ou artrite reumatoide?
              </label>
              <input id="q20" name="q20" value={screening.q20} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q21">
                Já teve um transplante de órgão ou medula óssea?
              </label>
              <input id="q21" name="q21" value={screening.q21} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q22">
                Já teve um distúrbio de coagulação do sangue, como hemofilia?
              </label>
              <input id="q22" name="q22" value={screening.q22} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q23">Já usou drogas intravenosas?</label>
              <input id="q23" name="q23" value={screening.q23} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q24">
                Já recebeu uma vacinação nas últimas quatro semanas?
              </label>
              <input id="q24" name="q24" value={screening.q24} readOnly></input>
            </div>
          </div>
          <div className="buttons">
            <button onClick={handleFit} className="button-fit">
              Apto
            </button>
            <button onClick={handleUnfit} className="button-unfit">
              Não Apto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ValidateScreening;
