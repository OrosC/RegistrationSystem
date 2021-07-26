FROM openjdk:16-alpine3.13

WORKDIR /app

ENV PATH /react/app/node_modules/.bin:$PATH

# install app dependencies
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src

CMD ["./mvnw", "spring-boot:run"]