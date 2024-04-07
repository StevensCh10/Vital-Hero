import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./DonationForm.css";
import { DonationForm as DonationFormType } from "../../types/DonationForm";
import { AuthContext } from "../../contexts/Auth/AuthContext";

const DonationForm = () => {
  const auth = useContext(AuthContext);
  const [donationFormAux, setDonationFormAux] = useState<DonationFormType>({
    id: 0,
    donor: 0,
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
  });

  const estadosBrasileiros = [
    { sigla: "AC", nome: "Acre" },
    { sigla: "AL", nome: "Alagoas" },
    { sigla: "AP", nome: "Amapá" },
    { sigla: "AM", nome: "Amazonas" },
    { sigla: "BA", nome: "Bahia" },
    { sigla: "CE", nome: "Ceará" },
    { sigla: "DF", nome: "Distrito Federal" },
    { sigla: "ES", nome: "Espírito Santo" },
    { sigla: "GO", nome: "Goiás" },
    { sigla: "MA", nome: "Maranhão" },
    { sigla: "MT", nome: "Mato Grosso" },
    { sigla: "MS", nome: "Mato Grosso do Sul" },
    { sigla: "MG", nome: "Minas Gerais" },
    { sigla: "PA", nome: "Pará" },
    { sigla: "PB", nome: "Paraíba" },
    { sigla: "PR", nome: "Paraná" },
    { sigla: "PE", nome: "Pernambuco" },
    { sigla: "PI", nome: "Piauí" },
    { sigla: "RJ", nome: "Rio de Janeiro" },
    { sigla: "RN", nome: "Rio Grande do Norte" },
    { sigla: "RS", nome: "Rio Grande do Sul" },
    { sigla: "RO", nome: "Rondônia" },
    { sigla: "RR", nome: "Roraima" },
    { sigla: "SC", nome: "Santa Catarina" },
    { sigla: "SP", nome: "São Paulo" },
    { sigla: "SE", nome: "Sergipe" },
    { sigla: "TO", nome: "Tocantins" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donationFormFromLocalStorage = localStorage.getItem('donationForm');
        if (donationFormFromLocalStorage !== null) {
          const donationFormObject = JSON.parse(donationFormFromLocalStorage);
          setDonationFormAux(donationFormObject);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, [auth]);

  return (
    <div className="donation-form-container">
      <Navbar />
      <div className="info-container">
        <div className="info-page-donation-form">
          <div className="image">
            <img src="formulario-de-registro.png"></img>
          </div>
          <div className="text">
            <span>Preencha as informações abaixo.</span>
          </div>
        </div>
      </div>
      {donationFormAux === null ? (
        <div className="donation-form-content">
          <span>Formulário de Doação</span>
          <form>
            <div className="form-donation-no-info">
              <div className="form-row">
                <label htmlFor="fatherName">
                  Nome do Pai:
                </label>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="motherName">
                  Nome da Mãe:
                </label>
                <input
                  type="text"
                  id="motherName"
                  name="motherName"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="naturalness">
                  Naturalidade:
                </label>
                <select
                  id="naturalness"
                  name="naturalness"
                  required
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
              <div className="form-row">
                <label htmlFor="document">
                  Documento:
                </label>
                <select id="document" name="document" required>
                  <option value="">Selecione o tipo de documento</option>
                  <option value="RG">RG</option>
                  <option value="CPF">CPF</option>
                  <option value="CNH">CNH</option>
                  <option value="Passaporte">Passaporte</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="UF">
                  UF:
                </label>
                <select
                  id="UF"
                  name="UF"
                  required
                >
                  <option value="">Selecione a UF</option>
                  {estadosBrasileiros.map((estado) => (
                    <option key={estado.sigla} value={estado.sigla}>
                      {estado.sigla}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="UF">
                  UF:
                </label>
                <select
                  id="UF"
                  name="UF"
                  required
                >
                  <option value="">Selecione a UF</option>
                  {estadosBrasileiros.map((estado) => (
                    <option key={estado.sigla} value={estado.sigla}>
                      {estado.sigla}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="estadoCivil">
                  Número do documento:
                </label>
                <input
                  type="text"
                  id="estadoCivil"
                  name="estadoCivil"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="issuingBody">
                  Orgão Expedidor:
                </label>
                <input
                  type="text"
                  id="issuingBody"
                  name="issuingBody"
                  placeholder="Ex: SDS"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="education">
                  Escolaridade:
                </label>
                <select
                  id="education"
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

                <label htmlFor="profession">
                  Profissão:
                </label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  required
                />
              </div>
              <div className="form-row"></div>
            </div>
            <div className="form-row">
              <label htmlFor="currentJob">
                Trabalho atual:
              </label>
              <input
                type="text"
                id="currentJob"
                name="currentJob"
                required
              />
            </div>
            <button type="submit">
              Salvar
            </button>
          </form>
        </div>
      ) : (
        <div className="donation-form-content">
          <span>Formulário de Doação</span>
          <form>
            <div className="form-donation">
              <div className="form-row">
                <label htmlFor="fatherName">
                  Nome do Pai:
                </label>
                <input
                  defaultValue={donationFormAux.q1}
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  readOnly
                />
              </div>
              <div className="form-row">
                <label htmlFor="motherName">
                  Nome da Mãe:
                </label>
                <input
                  defaultValue={donationFormAux.q2}
                  type="text"
                  id="motherName"
                  name="motherName"
                  readOnly
                />
              </div>
              <div className="form-row">
                <label htmlFor="naturalness">
                  Naturalidade:
                </label>
                <input
                  id="naturalness"
                  defaultValue={donationFormAux.q3}
                  name="naturalness"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="document">
                  Documento:
                </label>
                <input
                  id="document"
                  name="document"
                  defaultValue={donationFormAux.q4}
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="UF">
                  UF:
                </label>
                <input
                  defaultValue={donationFormAux.q5}
                  id="UF"
                  name="UF"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="estadoCivil">
                  Número do documento:
                </label>
                <input
                  defaultValue={donationFormAux.q6}
                  type="text"
                  id="estadoCivil"
                  name="estadoCivil"
                  readOnly
                />
              </div>
              <div className="form-row">
                <label htmlFor="issuingBody">
                  Orgão Expedidor:
                </label>
                <input
                  defaultValue={donationFormAux.q7}
                  type="text"
                  id="issuingBody"
                  name="issuingBody"
                  placeholder="Ex: SDS"
                  readOnly
                />
              </div>
              <div className="form-row">
                <label htmlFor="education">
                  Escolaridade:
                </label>
                <select
                  id="education"
                  defaultValue={donationFormAux.q8}
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
              <div className="form-row">
                <label htmlFor="profession">
                  Profissão:
                </label>
                <input
                  defaultValue={donationFormAux.q9}
                  type="text"
                  id="profession"
                  name="profession"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="currentJob">
                  Trabalho atual:
                </label>
                <input
                  defaultValue={donationFormAux.q10}
                  type="text"
                  id="currentJob"
                  name="currentJob"
                  required
                />
              </div>
            </div>
            <button type="submit">
              Atualizar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DonationForm;
