import { useContext, useEffect, useState } from "react";
import NavbarDoctor from "../../../components/NavbarDoctor/NavbarDoctor";
import "./ValidateScreening.css";
import { Screening } from "../../../types/Screening";
import { Donor } from "../../../types/Donor";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const ValidateScreening = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [donor, setDonor] = useState<Donor>(
    localStorage.getItem("donor") !== null
      ? JSON.parse(localStorage.getItem("donor")!)
      : null
  );
  const [screening, setScreening] = useState<Screening>(
    localStorage.getItem("validateScreening") !== null
      ? JSON.parse(localStorage.getItem("validateScreening")!)
      : null
  );
  const [q1, setQ1] = useState(screening?.q1);
  const [q2, setQ2] = useState(screening?.q2);
  const [q3, setQ3] = useState(screening?.q3);
  const [q4, setQ4] = useState(screening?.q4);
  const [q5, setQ5] = useState(screening?.q5);
  const [q6, setQ6] = useState(screening?.q6);
  const [q7, setQ7] = useState(screening?.q7);
  const [q8, setQ8] = useState(screening?.q8);
  const [q9, setQ9] = useState(screening?.q9);
  const [q10, setQ10] = useState(screening?.q10);
  const [q11, setQ11] = useState(screening?.q11);
  const [q12, setQ12] = useState(screening?.q12);
  const [q13, setQ13] = useState(screening?.q13);
  const [q14, setQ14] = useState(screening?.q14);
  const [q15, setQ15] = useState(screening?.q15);
  const [q16, setQ16] = useState(screening?.q16);
  const [q17, setQ17] = useState(screening?.q17);
  const [q18, setQ18] = useState(screening?.q18);
  const [q19, setQ19] = useState(screening?.q19);
  const [q20, setQ20] = useState(screening?.q20);
  const [q21, setQ21] = useState(screening?.q21);
  const [q22, setQ22] = useState(screening?.q22);
  const [q23, setQ23] = useState(screening?.q23);
  const [q24, setQ24] = useState(screening?.q24);

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
              <input type="text" id="q1" name="q1" value={q1} readOnly />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q2">
                Tem alergia? A que? Quando foi a ultima crise? Faz tratamento?
                Qual?
              </label>
              <input type="text" id="q2" name="q2" value={q2} readOnly />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q3">
                Já foi operado? Quando? De que? Precisou tomar sangue?
              </label>
              <input type="text" id="q3" name="q3" value={q3} readOnly />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q4">
                Tomou alguma vacina recente? Qual?
              </label>
              <input type="text" id="q4" name="q4" value={q4} readOnly />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q5">
                Tem ou teve convulsões? Quando?
              </label>
              <input type="text" id="q5" name="q5" value={q5} readOnly />
            </div>
            <div className="form-row">
              <label htmlFor="q6">Teve febre nas últimas duas semanas?</label>
              <input id="q6" name="q6" value={q6} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q7">
                Teve algum resfriado ou sintomas de gripe recentemente?
              </label>
              <input id="q7" name="q7" value={q7} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q8">
                Viajou para fora do país nos últimos seis meses?
              </label>
              <input id="q8" name="q8" value={q8} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q9">Já teve hepatite?</label>
              <input id="q9" name="q9" value={q9} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q10">Já teve malária?</label>
              <input id="q10" name="q10" value={q10} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q11">Já teve câncer?</label>
              <input id="q11" name="q11" value={q11} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q12">
                Já teve um ataque cardíaco ou derrame?
              </label>
              <input id="q12" name="q12" value={q12} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q13">
                está grávida ou amamentando atualmente?
              </label>
              <input id="q13" name="q13" value={q13} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q14">
                Já teve uma transfusão de sangue nos últimos doze meses?
              </label>
              <input id="q14" name="q14" value={q14} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q15">
                Já teve uma reação alérgica grave a um medicamento?
              </label>
              <input id="q15" name="q15" value={q15} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q16">Já foi diagnosticado com HIV ou AIDS?</label>
              <input id="q16" name="q16" value={q16} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q17">
                Já teve um diagnóstico de doença sexualmente transmissível
                (DST)?
              </label>
              <input id="q17" name="q17" value={q17} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q18">Já teve tuberculose?</label>
              <input id="q18" name="q18" value={q18} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q19">Já teve uma convulsão ou epilepsia?</label>
              <input id="q19" name="q19" value={q19} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q20">
                Já teve uma doença autoimune, como lúpus ou artrite reumatoide?
              </label>
              <input id="q20" name="q20" value={q20} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q21">
                Já teve um transplante de órgão ou medula óssea?
              </label>
              <input id="q21" name="q21" value={q21} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q22">
                Já teve um distúrbio de coagulação do sangue, como hemofilia?
              </label>
              <input id="q22" name="q22" value={q22} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q23">Já usou drogas intravenosas?</label>
              <input id="q23" name="q23" value={q23} readOnly></input>
            </div>
            <div className="form-row">
              <label htmlFor="q24">
                Já recebeu uma vacinação nas últimas quatro semanas?
              </label>
              <input id="q24" name="q24" value={q24} readOnly></input>
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
