import "../Register/Register.css"

const Register = () => {

    return (
        <div className="cadastro-container">
            <h1>Cadastro</h1>
            <form>
            <label htmlFor="nome">Nome Completo:</label>
                <input type="text" id="nome" name="nome" required/>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required/>

                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                <input type="date" id="dataNascimento" name="dataNascimento" required/>

                <label htmlFor="telefone">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" required/>

                <div className="sexo">
                    <label>Sexo:</label>
                    <input type="radio" id="sexoM" name="sexo" value="M" required/>
                    <label htmlFor="sexoM">M</label>
                    <input type="radio" id="sexoF" name="sexo" value="F" required/>
                    <label htmlFor="sexoF">F</label>
                </div>

                <label htmlFor="estadoCivil">Estado Civil:</label>
                <select id="estadoCivil" name="estadoCivil" required>
                    <option value="C">Casado</option>
                    <option value="S">Solteiro</option>
                    <option value="Outros">Outros</option>
                </select>

                <label htmlFor="cpf">CPF:</label>
                <input type="text" id="cpf" name="cpf" required/>

                <label htmlFor="crm">CRM:</label>
                <input type="text" id="vrm" name="crm" required/>

                <label htmlFor="endereco">Endereço:</label>
                <input type="text" id="endereco" name="endereco" required/>

                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" name="senha" required/>

                <button type="submit">Cadastrar</button>
            </form>
        </div> 
    )
}

export default Register;