FROM node:14

RUN apt-get update

#Create api directory
WORKDIR /web

ENV PATH ./web/node_modules/.bin:$PATH

COPY ./web/package.json ./
COPY ./web/package-lock.json ./

RUN npm install react-scripts@3.4.0 --silent

RUN npm install --slinet

COPY ./web/ ./

RUN npx browserslist --update-db

EXPOSE 3000