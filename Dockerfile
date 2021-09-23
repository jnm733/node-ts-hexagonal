#Multi Stage para compilación
FROM node:14 as builder

#Seteamos el directorio donde se alojará la app
WORKDIR /usr/src/app

#Copiamos archivos de dependencias al contenedor
COPY package*.json ./
COPY tsconfig*.json ./

#Ejecutamos comando para la instalación de las dependencias de desarrollo
RUN npm install

#Copiamos archivos locales al contenedor
COPY . ./

#Compilamos
RUN npm run build



#Partimos de imagen Node 14 como base
FROM node:14

#Etiquetas personalizadas para la imagen
LABEL maintainer="jl.navarro@motor.es"
LABEL application="motor-services"
LABEL description="Services App for Motor.es"
LABEL version="1.0"

#Seteamos el directorio donde se alojará la app
WORKDIR /usr/src/app

#Copiamos archivos de dependencias al contenedor
COPY package*.json ./

#Ejecutamos comando para la instalación de las dependencias de producción
RUN npm install --production

#Copiamos archivos al contenedor
COPY --from=builder /usr/src/app/dist/ ./dist/
COPY --from=builder /usr/src/app/.env ./.env

#Comando para el deploy de la app
CMD [ "npm", "run", "start" ]