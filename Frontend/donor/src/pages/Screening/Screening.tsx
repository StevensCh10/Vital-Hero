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
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default Screening;
