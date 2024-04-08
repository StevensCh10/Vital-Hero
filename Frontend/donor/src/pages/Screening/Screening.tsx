import { Screening as ScreeningType } from "../../types/Screening";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext, useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Screening.css";

const Screening = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;

  const [screenings, setScreenings] = useState<ScreeningType[]>([]);
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
  const [q13, setQ13] = useState("");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const screeningsFromLocalStorage =localStorage.getItem("screenings");
        if (screeningsFromLocalStorage !== null) {
          const screeningsObject = JSON.parse(screeningsFromLocalStorage);
          setScreenings(screeningsObject);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddScreening = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const screening: ScreeningType = {
      donor: user!.id,
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
      q24: q24 
    }

    await auth.addScreening(screening);
    window.location.reload;
  }

  return (
    <div className="screening-container">
      <Navbar />
      <div>
        <div className="info-page-screening-form">
          <div className="image">
            <img src="triagem-de-saude.png"></img>
          </div>
          <div className="text">
            <span>Preencha as informações abaixo.</span>
          </div>
        </div>
      </div>
      <div className="screening-content">
        <span>Triagem</span>
        <form onSubmit={handleAddScreening}>
          {screenings === null || screenings.length === 0 ? (
            <div className="form-screening">
              <div className="form-row">
                <label className="label-screening" htmlFor="q1">
                Já doou sangue? Há quanto tempo? Sentiu-se mal?
                </label>
                <input type="text" id="q1" name="q1" required onChange={(e) => setQ1(e.target.value)} />
              </div>
              <div className="form-row">
                <label className="label-screening" htmlFor="q2">
                Tem alergia? A que? Quando foi a ultima crise? Faz tratamento? Qual?
                </label>
                <input type="text" id="q2" name="q2" required onChange={(e) => setQ2(e.target.value)} />
              </div>
              <div className="form-row">
                <label className="label-screening" htmlFor="q3">
                Já foi operado? Quando? De que? Precisou tomar sangue?
                </label>
                <input type="text" id="q3" name="q3" required onChange={(e) => setQ3(e.target.value)} />
              </div>
              <div className="form-row">
                <label className="label-screening" htmlFor="q4">
                Tomou alguma vacina recente? Qual?
                </label>
                <input type="text" id="q4" name="q4" required onChange={(e) => setQ4(e.target.value)} />
              </div>
              <div className="form-row">
                <label className="label-screening" htmlFor="q5">
                Tem ou teve convulsões? Quando?
                </label>
                <input type="text" id="q5" name="q5" required onChange={(e) => setQ5(e.target.value)} />
              </div>
              <div className="form-row">
                  <label htmlFor="q6">
                    Teve febre nas últimas duas semanas?
                  </label>
                  <select
                    id="q6"
                    name="q6"
                    required onChange={(e) => setQ6(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q7">
                  Teve algum resfriado ou sintomas de gripe recentemente?
                  </label>
                  <select
                    id="q7"
                    name="q7"
                    required onChange={(e) => setQ7(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q8">
                  Viajou para fora do país nos últimos seis meses?
                  </label>
                  <select
                    id="q8"
                    name="q8"
                    required onChange={(e) => setQ8(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q9">
                  Já teve hepatite?
                  </label>
                  <select
                    id="q9"
                    name="q9"
                    required onChange={(e) => setQ9(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q10">
                  Já teve malária?
                  </label>
                  <select
                    id="q10"
                    name="q10"
                    required onChange={(e) => setQ10(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q11">
                  Já teve câncer?
                  </label>
                  <select
                    id="q11"
                    name="q11"
                    required onChange={(e) => setQ11(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q12">
                  Já teve um ataque cardíaco ou derrame?
                  </label>
                  <select
                    id="q12"
                    name="q12"
                    required onChange={(e) => setQ12(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q13">
                  está grávida ou amamentando atualmente?
                  </label>
                  <select
                    id="q13"
                    name="q13"
                    required onChange={(e) => setQ13(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q14">
                  Já teve uma transfusão de sangue nos últimos doze meses?
                  </label>
                  <select
                    id="q14"
                    name="q14"
                    required onChange={(e) => setQ14(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q15">
                  Já teve uma reação alérgica grave a um medicamento?
                  </label>
                  <select
                    id="q15"
                    name="q15"
                    required onChange={(e) => setQ15(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q16">
                  Já foi diagnosticado com HIV ou AIDS?
                  </label>
                  <select
                    id="q16"
                    name="q16"
                    required onChange={(e) => setQ16(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q17">
                  Já teve um diagnóstico de doença sexualmente transmissível (DST)?
                  </label>
                  <select
                    id="q17"
                    name="q17"
                    required onChange={(e) => setQ17(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q18">
                  Já teve tuberculose?
                  </label>
                  <select
                    id="q18"
                    name="q18"
                    required onChange={(e) => setQ18(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q19">
                  Já teve uma convulsão ou epilepsia?
                  </label>
                  <select
                    id="q19"
                    name="q19"
                    required onChange={(e) => setQ19(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q20">
                  Já teve uma doença autoimune, como lúpus ou artrite reumatoide?
                  </label>
                  <select
                    id="q20"
                    name="q20"
                    required onChange={(e) => setQ20(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q21">
                  Já teve um transplante de órgão ou medula óssea?
                  </label>
                  <select
                    id="q21"
                    name="q21"
                    required onChange={(e) => setQ21(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q22">
                  Já teve um distúrbio de coagulação do sangue, como hemofilia?
                  </label>
                  <select
                    id="q22"
                    name="q22"
                    required onChange={(e) => setQ22(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q23">
                  Já usou drogas intravenosas?
                  </label>
                  <select
                    id="q23"
                    name="q23"
                    required onChange={(e) => setQ23(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="q24">
                  Já recebeu uma vacinação nas últimas quatro semanas?
                  </label>
                  <select
                    id="q24"
                    name="q24"
                    required onChange={(e) => setQ24(e.target.value)}
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
            </div>
          ) : (
            <div className="form-screening">
            <div className="form-row">
              <label className="label-screening" htmlFor="q1">
              Já doou sangue? Há quanto tempo? Sentiu-se mal?
              </label>
              <input type="text" id="q1" name="q1" required onChange={(e) => setQ1(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q2">
              Tem alergia? A que? Quando foi a ultima crise? Faz tratamento? Qual?
              </label>
              <input type="text" id="q2" name="q2" required onChange={(e) => setQ2(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q3">
              Já foi operado? Quando? De que? Precisou tomar sangue?
              </label>
              <input type="text" id="q3" name="q3" required onChange={(e) => setQ3(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q4">
              Tomou alguma vacina recente? Qual?
              </label>
              <input type="text" id="q4" name="q4" required onChange={(e) => setQ4(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q5">
              Tem ou teve convulsões? Quando?
              </label>
              <input type="text" id="q5" name="q5" required onChange={(e) => setQ5(e.target.value)} />
            </div>
            <div className="form-row">
                <label htmlFor="q6">
                  Teve febre nas últimas duas semanas?
                </label>
                <select
                  id="q6"
                  name="q6"
                  required onChange={(e) => setQ6(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q7">
                Teve algum resfriado ou sintomas de gripe recentemente?
                </label>
                <select
                  id="q7"
                  name="q7"
                  required onChange={(e) => setQ7(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q8">
                Viajou para fora do país nos últimos seis meses?
                </label>
                <select
                  id="q8"
                  name="q8"
                  required onChange={(e) => setQ8(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q9">
                Já teve hepatite?
                </label>
                <select
                  id="q9"
                  name="q9"
                  required onChange={(e) => setQ9(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q10">
                Já teve malária?
                </label>
                <select
                  id="q10"
                  name="q10"
                  required onChange={(e) => setQ10(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q11">
                Já teve câncer?
                </label>
                <select
                  id="q11"
                  name="q11"
                  required onChange={(e) => setQ11(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q12">
                Já teve um ataque cardíaco ou derrame?
                </label>
                <select
                  id="q12"
                  name="q12"
                  required onChange={(e) => setQ12(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q13">
                está grávida ou amamentando atualmente?
                </label>
                <select
                  id="q13"
                  name="q13"
                  required onChange={(e) => setQ13(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q14">
                Já teve uma transfusão de sangue nos últimos doze meses?
                </label>
                <select
                  id="q14"
                  name="q14"
                  required onChange={(e) => setQ14(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q15">
                Já teve uma reação alérgica grave a um medicamento?
                </label>
                <select
                  id="q15"
                  name="q15"
                  required onChange={(e) => setQ15(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q16">
                Já foi diagnosticado com HIV ou AIDS?
                </label>
                <select
                  id="q16"
                  name="q16"
                  required onChange={(e) => setQ16(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q17">
                Já teve um diagnóstico de doença sexualmente transmissível (DST)?
                </label>
                <select
                  id="q17"
                  name="q17"
                  required onChange={(e) => setQ17(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q18">
                Já teve tuberculose?
                </label>
                <select
                  id="q18"
                  name="q18"
                  required onChange={(e) => setQ18(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q19">
                Já teve uma convulsão ou epilepsia?
                </label>
                <select
                  id="q19"
                  name="q19"
                  required onChange={(e) => setQ19(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q20">
                Já teve uma doença autoimune, como lúpus ou artrite reumatoide?
                </label>
                <select
                  id="q20"
                  name="q20"
                  required onChange={(e) => setQ20(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q21">
                Já teve um transplante de órgão ou medula óssea?
                </label>
                <select
                  id="q21"
                  name="q21"
                  required onChange={(e) => setQ21(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q22">
                Já teve um distúrbio de coagulação do sangue, como hemofilia?
                </label>
                <select
                  id="q22"
                  name="q22"
                  required onChange={(e) => setQ22(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q23">
                Já usou drogas intravenosas?
                </label>
                <select
                  id="q23"
                  name="q23"
                  required onChange={(e) => setQ23(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="q24">
                Já recebeu uma vacinação nas últimas quatro semanas?
                </label>
                <select
                  id="q24"
                  name="q24"
                  required onChange={(e) => setQ24(e.target.value)}
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
          </div>
          )}
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default Screening;
