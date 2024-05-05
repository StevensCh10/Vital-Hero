# Estágio de construção
FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/vitalhero.application-0.0.1-SNAPSHOT.jar vitalhero.application.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","vitalhero.application.jar"]

#WORKDIR /app

#COPY pom.xml .
#RUN mvn dependency:go-offline

#COPY src ./src
#RUN mvn package -DskipTests

# Estágio de execução
#FROM openjdk:17-jdk-slim

#WORKDIR /app

#EXPOSE 8080

#COPY --from=build /app/target/*.jar app.jar

# Configurar variáveis de ambiente para o MySQL
#ENV MYSQL_DATABASE=vitalheromanagement
#ENV MYSQL_USER=root
#ENV MYSQL_PASSWORD=root
#ENV MYSQL_ROOT_PASSWORD=root

#ENTRYPOINT ["java", "-jar", "app.jar"]
