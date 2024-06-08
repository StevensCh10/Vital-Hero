# Trabalho de Conclusão de Curso

Título: VitalHero: Uma aplicação web para incentivar a doação de sangue <br>
Aluno: Stevens Wendell Marinho Chaves <br>
Orientador: [Iago Richard Rodrigues Silva](https://github.com/iagorichard) <br>

## Descrição do Projeto
O Vital Hero é um projeto fullstack desenvolvido com o objetivo de facilitar e incentivar a doação regular de sangue. Utilizando tecnologias modernas como React (com TypeScript) para o frontend e Spring Boot (Java) para o backend, estamos construindo uma plataforma que permitirá aos usuários acessar informações vitais sobre doação de sangue, como estoques sanguíneos de hemocentros, agendar doações e muito mais.

## Principais Tecnologias Utilizadas:

### Backend:
  - Java
  - Spring Boot
  - Spring Actuator
  - Spring Validation
  - Spring Devtools
  - Spring Email
  - PostgreSQL
  - Quartz
  - Commons lang
  - Hibernate
  - Flyway
  - Lombok
  - jpa

### Frontend:  
  - Typescript
  - React + vite
  - React-datepicker
  - React-dom
  - React-icons
  - React-modal
  - React-router-dom
  - React-leaflet
  - Axios

## Funcionalidades Planejadas:
  - Visualização do estoque sanguíneo de hemocentros.
  - Agendamento de doações de sangue.
  - Notificões automáticas para lembretes de doação.
  - Perfis de usuário para acompanhamento do histórico de doações.
  - E muito mais!

## Como Utilizar a Aplicação:
Para utilizar o projeto, é necessário executar separadamente o frontend e o backend. Siga as instruções abaixo:

### Frontend:
1. Navegue até a pasta frontend.
2. Execute o comando npm install para instalar as dependências.
3. Execute o comando npm run dev para iniciar o servidor de desenvolvimento.

### Backend:
1. Navegue até a pasta backend.
2. Execute o comando ./mvn spring-boot:run para iniciar o servidor backend.
3. Certifique-se de configurar corretamente as variáveis de ambiente e conexões de banco de dados conforme necessário na pasta /src/main/resources/application.properties.
