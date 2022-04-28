#Multi Stage para compilación
FROM --platform=linux/amd64 node:16 as builder

#Seteamos el directorio donde se alojará la app
WORKDIR /usr/src/app

#Copiamos archivos locales al contenedor
COPY . ./

#Ejecutamos comando para la instalación de las dependencias de desarrollo
RUN npm install

#Compilamos
RUN npm run build

#Instalamos dependencias de producción
RUN rm -rf ./node_modules
RUN npm install --production


#Partimos de imagen Node 16 como base
FROM --platform=linux/amd64 node:16

#Etiquetas personalizadas para la imagen
LABEL maintainer="jl.navarro@motor.es"
LABEL application="motor-services"
LABEL description="Services App for Motor.es"
LABEL version="1.0"

#Seteamos el directorio donde se alojará la app
WORKDIR /usr/src/app

#Copiamos archivos de dependencias al contenedor
COPY package*.json ./

#Cambiamos ruta de los workspaces
RUN sed -i 's/\.\/src\/\*/\.\/dist\/\*/g' ./package*.json

#Copiamos archivos al contenedor
COPY --from=builder /usr/src/app/dist/ ./dist/
COPY --from=builder /usr/src/app/node_modules/ ./node_modules
