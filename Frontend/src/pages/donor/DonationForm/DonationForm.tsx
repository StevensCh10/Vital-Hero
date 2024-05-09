import { useContext, useEffect, useState } from "react";
import Navbar from "../../../components/NavbarDonor/NavbarDonor";
import "./DonationForm.css";
import { DonationForm as DonationFormType } from "../../../types/DonationForm";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { Donor } from "../../../types/Donor";

const DonationForm = () => {
  const auth = useContext(AuthContext);
  const donationFormAux = JSON.parse(localStorage.getItem('donationForm')! ?? {}) as DonationFormType; 

  const [q1, setQ1] = useState(donationFormAux?.q1);
  const [q2, setQ2] = useState(donationFormAux?.q2);
  const [q3, setQ3] = useState(donationFormAux?.q3);
  const [q4, setQ4] = useState(donationFormAux?.q4);
  const [q5, setQ5] = useState(donationFormAux?.q5);
  const [q6, setQ6] = useState(donationFormAux?.q6);
  const [q7, setQ7] = useState(donationFormAux?.q7);
  const [q8, setQ8] = useState(donationFormAux?.q8);
  const [q9, setQ9] = useState(donationFormAux?.q9);
  const [q10, setQ10] = useState(donationFormAux?.q10);
  const [q11, setQ11] = useState(donationFormAux?.q11);
  const donorid: Donor ={id: auth.user!.id!}

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
      
    };
    fetchData();
  }, [auth]);

  const handleAddDonationForm = async(e: React.FormEvent<HTMLFormElement>) => {
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
      q11: q11
    }

    await auth.addDonationForm(donationForm);
    window.location.reload();
  }

  const handleUpdateDonationForm = async(e: React.FormEvent<HTMLFormElement>) => {
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
      q11: q11
    }

    await auth.updateDonationForm(donationForm);
    window.location.reload();
  }

  return (
    <div className="donation-form-container">
      <Navbar />
      {donationFormAux === null ? (
        <div className="donation-form-content">
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
          <span>Formulário de Doação</span>
          <form onSubmit={handleAddDonationForm}>
            <div className="form-donation">
              <div className="form-row">
                <label htmlFor="fatherName">
                  Nome do Pai:
                </label>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  pattern="\S.*"
                  required onChange={(e) => setQ1(e.target.value)}
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
                  pattern="\S.*"
                  required onChange={(e) => setQ2(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="emergencyPhone">
                  Número para contato de emergência:
                </label>
                <input
                  type="text"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  placeholder="Ex: 8199546165"
                  pattern="\S.*"
                  required onChange={(e) => setQ3(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="naturalness">
                  Naturalidade:
                </label>
                <select
                  id="naturalness"
                  name="naturalness"
                  required onChange={(e) => setQ4(e.target.value)}
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
                <select id="document" name="document" required onChange={(e) => setQ5(e.target.value)}>
                  <option value="">Selecione o tipo de documento</option>
                  <option value="RG">RG</option>
                  <option value="CPF">CPF</option>
                  <option value="CNH">CNH</option>
                  <option value="Passaporte">Passaporte</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="documentNumber">
                  Número do documento:
                </label>
                <input
                  type="text"
                  id="documentNumber"
                  name="documentNumber"
                  pattern="\S.*"
                  required onChange={(e) => setQ6(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="UF">
                  UF:
                </label>
                <select
                  id="UF"
                  name="UF"
                  required onChange={(e) => setQ7(e.target.value)}
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
                <label htmlFor="issuingBody">
                  Orgão Expedidor:
                </label>
                <input
                  type="text"
                  id="issuingBody"
                  name="issuingBody"
                  placeholder="Ex: SDS"
                  pattern="\S.*"
                  required onChange={(e) => setQ8(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="education">
                  Escolaridade:
                </label>
                <select
                  id="education"
                  name="education"
                  required onChange={(e) => setQ9(e.target.value)}
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
                  type="text"
                  id="profession"
                  name="profession"
                  pattern="\S.*"
                  required onChange={(e) => setQ10(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="currentJob">
                  Trabalho atual:
                </label>
                <input
                  type="text"
                  id="currentJob"
                  name="currentJob"
                  pattern="\S.*"
                  required onChange={(e) => setQ11(e.target.value)}
                />
              </div>
            </div>
            <button type="submit">
              Salvar
            </button>
          </form>
        </div>
      ) : (
        <div className="donation-form-content">
          <span>Formulário de Doação</span>
          <form onSubmit={handleUpdateDonationForm}>
            <div className="form-donation">
              <div className="form-row">
                <label htmlFor="fatherName">
                  Nome do Pai:
                </label>
                <input
                  defaultValue={q1}
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
                  defaultValue={q2}
                  type="text"
                  id="motherName"
                  name="motherName"
                  readOnly
                />
              </div>
              <div className="form-row">
                <label htmlFor="emergencyPhone">
                  Número para contato de emergência:
                </label>
                <input
                  type="text"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  pattern="\S.*"
                  value={q3}
                  required onChange={(e) => setQ3(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="naturalness">
                  Naturalidade:
                </label>
                <input
                  id="naturalness"
                  defaultValue={q4}
                  name="naturalness"
                  required
                  readOnly
                />
              </div>
              <div className="form-row">
                <label htmlFor="document">
                  Documento:
                </label>
                <input
                  id="document"
                  name="document"
                  defaultValue={q5}
                  required
                  readOnly
                />
              </div>
              <div className="form-row">
                <label htmlFor="estadoCivil">
                  Número do documento:
                </label>
                <input
                  defaultValue={q6}
                  type="text"
                  id="estadoCivil"
                  name="estadoCivil"
                  readOnly
                />
              </div>
              <div className="form-row">
                <label htmlFor="UF">
                  UF:
                </label>
                <input
                  defaultValue={q7}
                  id="UF"
                  name="UF"
                  required
                  readOnly
                />
              </div>
              <div className="form-row">
                <label htmlFor="issuingBody">
                  Orgão Expedidor:
                </label>
                <input
                  defaultValue={q8}
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
                  defaultValue={q9}
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
                  defaultValue={q10}
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
                  defaultValue={q11}
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
