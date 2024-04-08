import { useEffect} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Screening.css";
//import { AuthContext } from "../../contexts/Auth/AuthContext";
//import { Screening as ScreeningType } from "../../types/Screening";

const Screening = () => {
  //const auth = useContext(AuthContext);
  //const user = auth.user;

  //const [screenings, setScreenings] = useState<ScreeningType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const screeningsFromLocalStorage =localStorage.getItem("screenings");
        if (screeningsFromLocalStorage !== null) {
          //const screeningsObject = JSON.parse(screeningsFromLocalStorage);
          //setScreenings(screeningsObject);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, []);

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
        <form>
          <div className="form-screening">
            <div className="form-row">
              <label className="label-screening" htmlFor="q1">
              Já doou sangue? Há quanto tempo? Sentiu-se mal?
              </label>
              <input type="text" id="q1" name="q1" required />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q2">
              Tem alergia? A que? Quando foi a ultima crise? Faz tratamento? Qual?
              </label>
              <input type="text" id="q2" name="q2" required />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q3">
              Já foi operado? Quando? De que? Precisou tomar sangue?
              </label>
              <input type="text" id="q3" name="q3" required />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q4">
              Tomou alguma vacina recente? Qual?
              </label>
              <input type="text" id="q4" name="q4" required />
            </div>
            <div className="form-row">
              <label className="label-screening" htmlFor="q5">
              Tem ou teve convulsões? Quando?
              </label>
              <input type="text" id="q5" name="q5" required />
            </div>
            <div className="form-row">
                <label htmlFor="q6">
                  Teve febre nas últimas duas semanas?
                </label>
                <select
                  id="q6"
                  name="q6"
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                >
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default Screening;
