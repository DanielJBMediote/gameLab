FROM node:14

# CREATE DIRECTORY
WORKDIR /api

# COPY ROOT DIRECTORY
COPY ./api/ ./
COPY ./api/package.json ./

# INSTALL DEPENDENCES
# RUN npm i -g @adonisjs/cli --silent
RUN npm install --silent

