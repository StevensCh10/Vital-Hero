// Função para validar CPF
export function validateCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');
  
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;
  
    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1+$/.test(cpf)) return false;
  
    // Função para calcular o dígito verificador
    const calcularDigito = (base: string, pesoInicial: number) => {
      let soma = 0;
      for (let i = 0; i < base.length; i++) {
        soma += parseInt(base[i]) * pesoInicial--;
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
  
    // Calcula o primeiro dígito verificador
    const primeiroDigito = calcularDigito(cpf.substring(0, 9), 10);
    if (primeiroDigito !== parseInt(cpf[9])) return false;
  
    // Calcula o segundo dígito verificador
    const segundoDigito = calcularDigito(cpf.substring(0, 10), 11);
    if (segundoDigito !== parseInt(cpf[10])) return false;
  
    return true;
  }
  
  export const calculateMinDate = (min: number) => {
    const today = new Date();
    const year = today.getFullYear() - min;
    const month = today.getMonth() + 1; 
    const day = today.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  export const calculateMaxDate = (max: number) => {
    const today = new Date();
    const year = today.getFullYear() - max;
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  export const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): String => {
    let input = e.target.value.replace(/\D/g, '');

    if (input.length > 11) {
      input = input.slice(0, 11);
    }

    let formattedPhone = input;
    if (input.length > 2) {
      formattedPhone = `(${input.slice(0, 2)}) ${input.slice(2, 3)} ${input.slice(3, 7)}`;
    }
    if (input.length > 7) {
      formattedPhone = `(${input.slice(0, 2)}) ${input.slice(2, 3)} ${input.slice(3, 7)}-${input.slice(7, 11)}`;
    }

    e.target.value = formattedPhone;
    return input;
  };


  export const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>): String => {
    let input = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número

    // Limita o valor a 11 dígitos
    if (input.length > 11) {
      input = input.slice(0, 11);
    }

    // Formata o CPF no padrão 111.111.111-11
    let formattedCpf = input;
    if (input.length > 3) {
      formattedCpf = `${input.slice(0, 3)}.${input.slice(3, 6)}`;
    }
    if (input.length > 6) {
      formattedCpf = `${input.slice(0, 3)}.${input.slice(3, 6)}.${input.slice(6, 9)}`;
    }
    if (input.length > 9) {
      formattedCpf = `${input.slice(0, 3)}.${input.slice(3, 6)}.${input.slice(6, 9)}-${input.slice(9, 11)}`;
    }

    // Define o valor formatado no campo e armazena apenas os números no estado
    e.target.value = formattedCpf;
    return input // Armazena apenas os números no estado
  };

  export const handleProfessionalIdCardChange = (e: React.ChangeEvent<HTMLInputElement>): string => {
    let input = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número

    // Limita o valor a 5 dígitos seguidos por 2 letras
    if (input.length > 5) {
      input = input.slice(0, 5);
    }

    // Formata o número para o formato 12345-PE
    let formattedIdCard = '';
    if (input.length > 0) {
      formattedIdCard += input; // Adiciona os números
    }
    if (input.length === 5) {
      formattedIdCard += '-'; // Adiciona o hífen após os 5 primeiros dígitos
    }
    if (input.length > 5) {
      formattedIdCard += input.slice(5, 7); // Adiciona as letras
    }

    return formattedIdCard; // Retorna o valor formatado
  };