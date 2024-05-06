# Estágio de construção
FROM maven:3.8.3-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn package -DskipTests

# Estágio de execução
FROM openjdk:17-jdk-slim

WORKDIR /app

EXPOSE 8080

COPY --from=build /app/target/*.jar app.jar

# Configurar variáveis de ambiente para o MySQL
#ENV MYSQL_DATABASE=vitalheromanagement
#ENV MYSQL_USER=root
#ENV MYSQL_PASSWORD=root
#ENV MYSQL_ROOT_PASSWORD=root

ENTRYPOINT ["java", "-jar", "app.jar"]
